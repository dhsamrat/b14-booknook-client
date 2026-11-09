
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies?: number;
};

export default function AllBookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "http://localhost:5000/all-books",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch books.");
        }

        const data: Book[] = await res.json();

        // Normalize old and new book data
        const formattedBooks = data.map((book) => {
          const totalCopies = Number(book.totalCopies) || 0;

          const availableCopies =
            book.availableCopies === undefined ||
            book.availableCopies === null
              ? totalCopies
              : Number(book.availableCopies);

          return {
            ...book,
            totalCopies,
            availableCopies,
          };
        });

        console.log("All Books:", formattedBooks);

        setBooks(formattedBooks);

      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load books.";

        setError(message);

      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4">
        <div className="text-center">

          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

          <p className="text-sm font-medium text-gray-600">
            Loading books...
          </p>

        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-10">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
              Explore Our Collection
            </p>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              All Books
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Discover and explore all the books available in BookNook.
            </p>
          </div>

        </div>

        {/* Error Message */}
        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 sm:p-4">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!error && books.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center shadow-sm sm:px-8 sm:py-16">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
              📚
            </div>

            <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
              No Books Available
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
              There are currently no books in our collection.
            </p>

          </div>
        ) : (
          !error && (
            <>
              {/* Book Count */}
              <div className="mb-5 flex items-center justify-between">

                <p className="text-sm font-medium text-gray-600 sm:text-base">
                  Total Books:{" "}
                  <span className="font-bold text-gray-900">
                    {books.length}
                  </span>
                </p>

              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:gap-7">

                {books.map((book) => {
                  const availableCopies =
                    book.availableCopies ?? book.totalCopies;

                  const isAvailable = availableCopies > 0;

                  return (
                    <div
                      key={book._id}
                      className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                    >

                      {/* Book Image */}
                      <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-56">

                        <Image
                          src={book.image}
                          alt={book.title}
                          width={400}
                          height={300}
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

                          {/* Book Copies */}
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

                              <span
                                className={`font-semibold ${
                                  isAvailable
                                    ? "text-green-700"
                                    : "text-red-600"
                                }`}
                              >
                                {availableCopies}
                              </span>

                            </div>

                            {/* Availability Status */}
                            <div className="border-t border-gray-200 pt-2">

                              <span
                                className={`text-xs font-semibold ${
                                  isAvailable
                                    ? "text-green-700"
                                    : "text-red-600"
                                }`}
                              >
                                {isAvailable
                                  ? "Available for Borrow"
                                  : "Currently Unavailable"}
                              </span>

                            </div>

                          </div>

                          {/* Description */}
                          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                            {book.description}
                          </p>

                        </div>

                        {/* Details Button */}
                        <div className="mt-auto pt-5">

                          <Link
                            href={`/all-books/${book._id}`}
                            className="block w-full rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-700"
                          >
                            View Details
                          </Link>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>
            </>
          )
        )}

      </div>
    </main>
  );
}
