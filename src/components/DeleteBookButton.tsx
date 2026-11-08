// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"




// import React from 'react';
// import { Button } from "./ui/button";

// const DeletDetailsDialo = () => {
//     return (
//         <div>
//             <AlertDialog>
//   <AlertDialogTrigger render={<Button variant="outline" />}>
//     Show Dialog
//   </AlertDialogTrigger>
//   <AlertDialogContent>
//     <AlertDialogHeader>
//       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//       <AlertDialogDescription>
//         This action cannot be undone. This will permanently delete your account
//         from our servers.
//       </AlertDialogDescription>
//     </AlertDialogHeader>
//     <AlertDialogFooter>
//       <AlertDialogCancel>Cancel</AlertDialogCancel>
//       <AlertDialogAction>Continue</AlertDialogAction>
//     </AlertDialogFooter>
//   </AlertDialogContent>
// </AlertDialog>
//         </div>
//     );
// };

// export default DeletDetailsDialo;






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

  // Delete Book API
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const res = await fetch(
        `http://localhost:5000/all-book/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Book deleted successfully!");

        router.push("/all-books");
        router.refresh();
      } else {
        toast.error("Book not found!");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong!");
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
