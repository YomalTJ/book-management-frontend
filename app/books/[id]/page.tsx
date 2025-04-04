"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book } from "../../types/book";
import { bookService } from "../../services/bookService";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../../components/common/Button";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    const fetchBook = async () => {
      try {
        const data = await bookService.getBookById(id as string);
        setBook(data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id, isAuthenticated, router]);

  const handleDeleteBook = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      await bookService.deleteBook(id as string);
      router.push("/books");
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-lg text-red-700">{error}</p>
            <button
              onClick={() => router.back()}
              className="mt-4 flex items-center text-red-700 hover:text-red-800"
            >
              <FaArrowLeft className="mr-1" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Book not found.</p>
        <Link
          href="/books"
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-1" />
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/books"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-1" />
        Back to Books
      </Link>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {book.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 font-medium">Author</p>
                <p className="text-xl text-gray-800">{book.author}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 font-medium">Genre</p>
                <p className="text-xl text-gray-800">{book.genre}</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 font-medium">
                  Publication Year
                </p>
                <p className="text-xl text-gray-800">{book.publicationYear}</p>
              </div>
              {book.createdAt && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 font-medium">Added on</p>
                  <p className="text-xl text-gray-800">
                    {new Date(book.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <Link href={`/books/${book.id}/edit`}>
              <Button variant="secondary" className="flex items-center">
                <FaEdit className="mr-2" />
                Edit Book
              </Button>
            </Link>
            <Button
              variant="danger"
              className="flex items-center"
              onClick={handleDeleteBook}
            >
              <FaTrash className="mr-2" />
              Delete Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
