"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookForm } from "../../components/books/BookForm";
import { bookService } from "../../services/bookService";
import { CreateBookDto } from "../../types/book";
import { useAuth } from "../../context/AuthContext";

export default function AddBookPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleAddBook = async (bookData: CreateBookDto) => {
    try {
      await bookService.createBook(bookData);
    } catch (error) {
      console.error("Error adding book:", error);
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

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Book</h1>
      <BookForm onSubmit={handleAddBook} />
    </div>
  );
}
