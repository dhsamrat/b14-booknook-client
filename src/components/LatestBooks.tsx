
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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LatestBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/latest-books`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch latest books.");
        }

        const data: Book[] = await res.json();

        const formattedBooks = data.map((book) => {
          const totalCopies = Number(book.totalCopies) || 0;

          return {
            ...book,
            totalCopies,
            availableCopies:
              book.availableCopies == null
                ? totalCopies
                : Number(book.availableCopies),
          };
        });

        setBooks(formattedBooks);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load latest books."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  return (
    <section className="bg-[#faf9f6] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-9 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
            Recently Added
          </p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Latest Books
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Explore the newest additions to our BookNook collection.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Empty */}
        {!loading && !error && books.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center">
            <p className="text-3xl">📚</p>
            <h3 className="mt-3 text-lg font-semibold text-gray-800">
              No Books Available
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              New books will appear here when they are added.
            </p>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:gap-7">
            {books.map((book) => {
              const availableCopies = book.availableCopies ?? book.totalCopies;
              const isAvailable = availableCopies > 0;

              return (
                <div
                  key={book._id}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Book Image */}
                  <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-56">
                    {book.image ? (
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl">
                        📚
                      </div>
                    )}
                  </div>

                  {/* Book Information */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div>
                      <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                        {book.category}
                      </span>

                      <h3 className="mt-3 text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                        {book.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        By {book.author}
                      </p>

                      {/* Copies Information */}
                      <div className="mt-4 space-y-2 rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Total Copies</span>
                          <span className="font-semibold text-gray-900">
                            {book.totalCopies}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Available Copies</span>
                          <span
                            className={`font-semibold ${
                              isAvailable ? "text-green-700" : "text-red-600"
                            }`}
                          >
                            {availableCopies}
                          </span>
                        </div>

                        <div className="border-t border-gray-200 pt-2">
                          <span
                            className={`text-xs font-semibold ${
                              isAvailable ? "text-green-700" : "text-red-600"
                            }`}
                          >
                            {isAvailable
                              ? "Available for Borrow"
                              : "Currently Unavailable"}
                          </span>
                        </div>
                      </div>

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
        )}

        {/* View All Books */}
        {!loading && !error && books.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/all-books"
              className="inline-block rounded-lg border border-gray-900 px-7 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              View All Books
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
