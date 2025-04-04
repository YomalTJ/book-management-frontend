"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book, UpdateBookDto } from "../../../types/book";
import { bookService } from "../../../services/bookService";
import { useAuth } from "../../../context/AuthContext";
import { BookForm } from "../../../components/books/BookForm";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function EditBookPage() {
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

  const handleUpdateBook = async (bookData: UpdateBookDto) => {
    try {
      await bookService.updateBook(id as string, bookData);
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
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
        href={`/books/${id}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-1" />
        Back to Book Details
      </Link>

      <h1 className="text-3xl font-bold mb-8">Edit Book</h1>
      <BookForm
        initialData={book}
        onSubmit={handleUpdateBook}
        isEditing={true}
      />
    </div>
  );
}
