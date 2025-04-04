"use client";

import React from "react";
import Link from "next/link";
import { Book } from "../../types/book";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      onDelete(book.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {book.title}
        </h3>
        <div className="text-gray-600 text-sm space-y-1">
          <p>
            <span className="font-medium">Author:</span> {book.author}
          </p>
          <p>
            <span className="font-medium">Genre:</span> {book.genre}
          </p>
          <p>
            <span className="font-medium">Year:</span> {book.publicationYear}
          </p>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Link
            href={`/books/${book.id}`}
            className="text-blue-600 hover:text-blue-800 flex items-center"
            title="View details"
          >
            <FaEye className="mr-1" />
            <span>View</span>
          </Link>
          <Link
            href={`/books/${book.id}/edit`}
            className="text-yellow-600 hover:text-yellow-800 flex items-center"
            title="Edit book"
          >
            <FaEdit className="mr-1" />
            <span>Edit</span>
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 flex items-center"
            title="Delete book"
          >
            <FaTrash className="mr-1" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
