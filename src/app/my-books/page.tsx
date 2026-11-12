
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import EditDetailsDialog from "@/components/EditDetailsDialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image?: string;
  description?: string;
  totalCopies: number;
  availableCopies: number;
  addedBy?: {
    name?: string;
    email?: string;
  };
};

export default function MyBooksPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Redirect if user is not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?callbackURL=/my-books");
    }
  }, [isPending, session, router]);

  // Fetch books added by the logged-in user
  useEffect(() => {
    if (isPending || !session?.user?.email) return;

    let active = true;

    const fetchMyBooks = async () => {
      try {
        setLoading(true);
        setError("");

       const token = await getTokenFromClient();

if (!token) {
  throw new Error("Authentication token not found. Please login again.");
}

const response = await fetch(`${API_URL}/all-books`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  cache: "no-store",
});

        if (!response.ok) {
          throw new Error("Failed to load your books.");
        }

        const result = await response.json();

        const allBooks: Book[] = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

        const userEmail = session.user.email
          .toLowerCase()
          .trim();

        const myBooks = allBooks.filter(
          (book) =>
            book.addedBy?.email?.toLowerCase().trim() === userEmail
        );

        if (active) {
          setBooks(myBooks);
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load your books.";

        if (active) {
          setError(message);
          toast.error(message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchMyBooks();

    return () => {
      active = false;
    };
  }, [isPending, session]);

  // Delete book
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
const token = await getTokenFromClient();

if (!token) {
  throw new Error("Authentication token not found. Please login again.");
}

const response = await fetch(
  `${API_URL}/all-books/${encodeURIComponent(id)}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  }
);

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete book."
        );
      }

      // Remove deleted book from UI
      setBooks((previous) =>
        previous.filter((book) => book._id !== id)
      );

      toast.success("Book deleted successfully!");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to delete book.";

      setError(message);
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

          <p className="text-sm font-medium text-gray-600">
            Loading your books...
          </p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
              Your Collection
            </p>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              My Books
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Manage the books you have added to BookNook.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 sm:w-auto sm:px-6"
          >
            + Add New Book
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 sm:p-4">
            {error}
          </p>
        )}

        {/* Empty State */}
        {books.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center shadow-sm sm:px-8 sm:py-16">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
              📚
            </div>

            <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
              You Haven&apos;t Added Any Books
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
              Your collection is currently empty. Add your first book to the library.
            </p>

            <Link
              href="/add-book"
              className="mt-6 inline-flex rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Add a Book
            </Link>
          </div>
        ) : (
          <>
            {/* Book Count */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600 sm:text-base">
                Your books:{" "}
                <span className="font-bold text-gray-900">
                  {books.length}
                </span>
              </p>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:gap-7">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Book Image */}
                  <div className="h-52 overflow-hidden bg-gray-100 sm:h-56">
                    <Image
                      src={book.image || "/placeholder-book.png"}
                      alt={book.title || "Book cover"}
                      width={400}
                      height={300}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Book Information */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div>
                      <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                        {book.category}
                      </span>

                      <h2 className="mt-3 wrap-break-word text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                        {book.title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-600">
                        By {book.author}
                      </p>

                      {/* Copies Information */}
                      <div className="mt-4 space-y-2 rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-gray-600">
                            Total Copies
                          </span>

                          <span className="font-semibold text-gray-900">
                            {book.totalCopies}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-gray-600">
                            Available Copies
                          </span>

                          <span className="font-semibold text-green-700">
                            {book.availableCopies}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
                      <EditDetailsDialog
                        book={{
                          ...book,
                          image: book.image || "",
                          description: book.description || "",
                        }}
                       onUpdated={(updatedBook) => {
  setBooks((previous) =>
    previous.map((item) =>
      item._id === book._id
        ? {
            ...item,
            ...updatedBook,
            availableCopies:
              updatedBook.availableCopies ?? item.availableCopies,
          }
        : item
    )
  );
}}
                      />

                      <button
                        type="button"
                        onClick={() => handleDelete(book._id)}
                        disabled={deletingId === book._id}
                        className="rounded-xl bg-red-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === book._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
