
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

interface DeleteBookButtonProps {
  bookId: string;
}

const DeleteBookButton = ({
  bookId,
}: DeleteBookButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const res = await fetch(
        `${API_URL}/all-books/${encodeURIComponent(bookId)}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete book");
      }

      toast.success("Book deleted successfully!");

      router.push("/all-books");
      router.refresh();

    } catch (error) {
      console.error("Delete Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-6 py-3.5 text-sm font-bold text-red-800 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 size={18} />

      {isDeleting ? "Deleting..." : "Delete Book"}
    </button>
  );
};

export default DeleteBookButton;
