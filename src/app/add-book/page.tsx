
"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BookPlus,
  BookOpen,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
type BookCategory =
  | "Fiction"
  | "Science"
  | "History"
  | "Kids"
  | "Others";

export default function AddBookPage() {
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction" as BookCategory,
    image: "",
    description: "",
    totalCopies: "1",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (isPending) {
      setError("Please wait. Checking your login status...");
      return;
    }

    if (!session?.user?.email) {
      setError("Please login before adding a book.");
      return;
    }

    const totalCopies = Number(formData.totalCopies);

    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      setError("Total copies must be a positive whole number.");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.image.trim() ||
      !formData.description.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const bookData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      image: formData.image.trim(),
      description: formData.description.trim(),
      totalCopies,
      availableCopies: totalCopies,

      addedBy: {
        name: session.user.name || "",
        email: session.user.email,
      },
    };

    
try {
  setLoading(true);

  // Get JWT token from Better Auth
  const token = await getTokenFromClient();

  if (!token) {
    throw new Error("Authentication token not found. Please login again.");
  }

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await fetch(`${API_URL}/add-book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add book.");
  }

  setSuccess("Book added successfully!");

  setFormData({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: "1",
  });
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Something went wrong."
  );
} finally {
  setLoading(false);
}

  };

  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-3xl">

        {/* Page Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <BookPlus className="h-7 w-7" />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-sm">
            BookNook Library
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add a New Book
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
            Share your favorite books with readers and help our library grow.
          </p>
        </div>

        {/* Form Card */}
        <Card className="overflow-hidden rounded-2xl border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/70 px-5 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Book Information
                </CardTitle>

                <CardDescription className="mt-1 text-sm">
                  Fill in the details below to add a book.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title and Author */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Book Title *</Label>

                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author Name *</Label>

                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              {/* Category and Copies */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Book Category *</Label>

                  <Select
                    value={formData.category}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        category: value as BookCategory,
                      }));

                      setError("");
                      setSuccess("");
                    }}
                  >
                    <SelectTrigger id="category" className="h-11 w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Kids">Kids</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalCopies">Total Copies *</Label>

                  <Input
                    id="totalCopies"
                    type="number"
                    name="totalCopies"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    required
                    className="h-11"
                  />

                  <p className="text-xs text-gray-500">
                    All copies will initially be available.
                  </p>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image">Book Cover Image URL *</Label>

                <Input
                  id="image"
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/book-cover.jpg"
                  required
                  className="h-11"
                />

                <p className="text-xs text-gray-500">
                  Paste a valid image URL for the book cover.
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Book Description *</Label>

                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short description about this book..."
                  required
                  rows={5}
                  className="min-h-32 resize-y"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{success}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="border-t border-gray-100 pt-5">
                <Button
                  type="submit"
                  disabled={loading || isPending}
                  className="h-12 w-full rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800 sm:text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <BookPlus className="mr-2 h-4 w-4" />
                      Add Book to Library
                    </>
                  )}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-gray-500">
          Every book you add helps someone discover a new story.
        </p>

      </div>
    </main>
  );
}
