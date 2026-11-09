
"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
availableCopies?: number | null;
};

type Props = {
  book: Book;
};

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

const EditDetailsDialog = ({ book }: Props) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    category: book.category,
    image: book.image,
    description: book.description,
    totalCopies: String(book.totalCopies),
  });

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const totalCopies = Number(formData.totalCopies);

    // Validate total copies
    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be a positive whole number.");
      return;
    }

    // Validate required fields
    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.image.trim() ||
      !formData.description.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Borrow functionality এখনো তৈরি হয়নি।
    // তাই সব copies available থাকবে।
    const updatedData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      image: formData.image.trim(),
      description: formData.description.trim(),
      totalCopies,
      availableCopies: totalCopies,
    };

    try {
      setIsUpdating(true);

      const response = await fetch(
        `http://localhost:5000/all-books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update book."
        );
      }

      if (result.matchedCount === 0) {
        throw new Error("Book not found. Please refresh the page.");
      }

      toast.success("Book updated successfully!");

      setOpen(false);

      // Server থেকে updated book details load করবে
      router.refresh();

    } catch (error) {
      console.error("Book update error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isUpdating) {
          setOpen(value);
        }
      }}
    >
      {/* Edit Button */}
      <DialogTrigger
  type="button"
  className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-6 py-3.5 text-sm font-bold text-amber-800 transition hover:bg-amber-100"
>
  <Pencil size={10} />
  Edit Book Details
</DialogTrigger>

      {/* Edit Dialog */}
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-[#faf9f6] sm:max-w-2xl">

        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 sm:text-2xl">
            Edit Book Details
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-500">
            Update your book information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 pt-3"
        >

          {/* Book Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Book Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
            />
          </div>

          {/* Author */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Author
            </label>

            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Image URL
            </label>

            <input
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
            />
          </div>

          {/* Total Copies */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Total Copies
            </label>

            <input
              name="totalCopies"
              type="number"
              min="1"
              step="1"
              value={formData.totalCopies}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
            />

            <p className="mt-2 text-xs text-gray-500">
              Available Copies:{" "}
              {Number(formData.totalCopies) > 0
                ? Number(formData.totalCopies)
                : 0}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              All copies are currently available because borrowing has not been implemented yet.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row">

            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isUpdating}
              className="w-full rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "Updating..." : "Update Book"}
            </button>

          </div>

        </form>

      </DialogContent>
    </Dialog>
  );
};

export default EditDetailsDialog;
