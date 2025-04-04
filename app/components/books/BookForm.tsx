"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Book, CreateBookDto } from "../../types/book";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: CreateBookDto) => Promise<void>;
  isEditing?: boolean;
}

export const BookForm: React.FC<BookFormProps> = ({
  initialData,
  onSubmit,
  isEditing = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [genre, setGenre] = useState(initialData?.genre || "");
  const [publicationYear, setPublicationYear] = useState(
    initialData?.publicationYear?.toString() || ""
  );

  const [errors, setErrors] = useState<{
    title?: string;
    author?: string;
    genre?: string;
    publicationYear?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setGenre(initialData.genre);
      setPublicationYear(initialData.publicationYear.toString());
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: {
      title?: string;
      author?: string;
      genre?: string;
      publicationYear?: string;
    } = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!author.trim()) newErrors.author = "Author is required";
    if (!genre.trim()) newErrors.genre = "Genre is required";
    if (!publicationYear.trim())
      newErrors.publicationYear = "Publication year is required";
    else {
      const year = parseInt(publicationYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1000 || year > currentYear + 5) {
        newErrors.publicationYear = "Please enter a valid year";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit({
        title,
        author,
        genre,
        publicationYear: parseInt(publicationYear),
      });

      router.push("/books");
    } catch (error: any) {
      setErrors({
        general:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Book" : "Add New Book"}
      </h2>

      {errors.general && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Title"
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            required
          />

          <Input
            label="Author"
            id="author"
            name="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={errors.author}
            required
          />

          <Input
            label="Genre"
            id="genre"
            name="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            error={errors.genre}
            required
          />

          <Input
            label="Publication Year"
            id="publicationYear"
            name="publicationYear"
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            error={errors.publicationYear}
            required
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            {isEditing ? "Update Book" : "Add Book"}
          </Button>
        </div>
      </form>
    </div>
  );
};
