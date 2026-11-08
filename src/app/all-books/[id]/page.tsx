
import Link from "next/link";
import Image from "next/image";
import EditDetailsDialog from "@/components/EditDetailsDialog";
import DeleteBookButton from "@/components/DeleteBookButton";

import {
  ArrowLeft,
  BookOpen,
  Library,
  Bookmark,
  CheckCircle2,
  XCircle,
  UserRound,
  Sparkles,
} from "lucide-react";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies?: number | null;
  addedBy?: {
    name: string;
  };
};

type BookDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const BookDetailsPage = async ({
  params,
}: BookDetailsPageProps) => {
  const { id } = await params;

  let book: Book | null = null;
  let error = "";

  try {
    const res = await fetch(
      `http://localhost:5000/all-books/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        res.status === 404
          ? "This book does not exist in our collection."
          : "Unable to load book details."
      );
    }

    book = await res.json();
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Something went wrong.";
  }

  // Book Not Found
  if (!book || error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5">
        <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
            📚
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Book Not Found
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error || "This book does not exist in our collection."}
          </p>

          <Link
            href="/all-books"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            <ArrowLeft size={17} />
            Back to All Books
          </Link>

        </div>
      </main>
    );
  }

  // Normalize Copies Data
  const parsedTotalCopies = Number(book.totalCopies);

  const totalCopies = Number.isFinite(parsedTotalCopies)
    ? parsedTotalCopies
    : 0;

  const parsedAvailableCopies = Number(book.availableCopies);

  const availableCopies =
    book.availableCopies === undefined ||
    book.availableCopies === null ||
    !Number.isFinite(parsedAvailableCopies)
      ? totalCopies
      : parsedAvailableCopies;

  // Availability Status
  const isAvailable = availableCopies > 0;

  // Normalized Book Data
  const normalizedBook: Book = {
    ...book,
    totalCopies,
    availableCopies,
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-8 sm:px-6 sm:py-12">

      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">

          <Link
            href="/"
            className="transition hover:text-amber-700"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/all-books"
            className="transition hover:text-amber-700"
          >
            All Books
          </Link>

          <span>/</span>

          <span className="font-medium text-gray-900">
            Book Details
          </span>

        </div>

        {/* Main Book Details */}
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="grid md:grid-cols-2">

            {/* Left: Book Cover */}
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#eee9df] via-[#f7f3eb] to-[#e8dfd0] p-8 sm:p-12 md:min-h-[650px]">

              <div className="absolute left-8 top-8 flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
                <Sparkles size={14} className="text-amber-600" />
                BookNook Collection
              </div>

              <div className="relative z-10 w-full max-w-[310px] transition duration-500 hover:-translate-y-2 hover:rotate-1">

                <div className="absolute -right-3 top-3 h-full w-full rounded-r-xl bg-[#c8bba6] shadow-lg" />

                <div className="relative overflow-hidden rounded-md shadow-2xl">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={500}
                    height={700}
                    priority
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>

              </div>

              <div className="absolute bottom-7 left-0 right-0 text-center text-xs font-medium tracking-[0.2em] text-gray-500">
                DISCOVER · READ · GROW
              </div>

            </div>

            {/* Right: Book Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">

              {/* Edit and Delete Buttons */}
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <EditDetailsDialog book={normalizedBook} />

                <DeleteBookButton
                  bookId={normalizedBook._id.toString()}
                />

              </div>

              {/* Category and Availability */}
              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-full bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                  {book.category}
                </span>

                {isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                    <CheckCircle2 size={14} />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
                    <XCircle size={14} />
                    Out of Stock
                  </span>
                )}

              </div>

              {/* Title */}
              <h1 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {book.title}
              </h1>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                  <UserRound size={21} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Written by
                  </p>

                  <p className="mt-0.5 font-semibold text-gray-800">
                    {book.author}
                  </p>
                </div>

              </div>

              <div className="my-8 border-t border-gray-100" />

              {/* Description */}
              <div>

                <div className="flex items-center gap-2">
                  <BookOpen size={19} className="text-amber-700" />

                  <h2 className="text-lg font-bold text-gray-900">
                    About This Book
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
                  {book.description}
                </p>

              </div>

              {/* Book Statistics */}
              <div className="mt-9 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-gray-100 bg-[#faf9f6] p-4 sm:p-5">

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                    <Library size={20} />
                  </div>

                  <p className="text-xs font-medium text-gray-500 sm:text-sm">
                    Total Copies
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-gray-900">
                    {totalCopies}
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-100 bg-[#faf9f6] p-4 sm:p-5">

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <Bookmark size={20} />
                  </div>

                  <p className="text-xs font-medium text-gray-500 sm:text-sm">
                    Available Copies
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-gray-900">
                    {availableCopies}
                  </p>

                </div>

              </div>

              {/* Borrow Button */}
              <div className="mt-8">

                {isAvailable ? (
                  <Link
                    href={`/all-books/${book._id}/borrow`}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-gray-900/10 transition hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-amber-700/20"
                  >
                    <BookOpen size={19} />
                    Borrow This Book
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl bg-gray-200 px-6 py-4 text-sm font-bold text-gray-500"
                  >
                    <XCircle size={19} />
                    Currently Unavailable
                  </button>
                )}

              </div>

              {/* Added By */}
              {book.addedBy?.name && (
                <p className="mt-5 text-center text-xs text-gray-400">
                  Added to BookNook by{" "}
                  <span className="font-semibold text-gray-600">
                    {book.addedBy.name}
                  </span>
                </p>
              )}

            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:px-8">

          <div>
            <h3 className="font-bold text-gray-900">
              Looking for more books?
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Explore our collection and find your next favorite read.
            </p>
          </div>

          <Link
            href="/all-books"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            <ArrowLeft size={16} />
            Explore All Books
          </Link>

        </div>

      </div>
    </main>
  );
};

export default BookDetailsPage;
