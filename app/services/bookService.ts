import api from "./api";
import { Book, CreateBookDto, UpdateBookDto } from "../types/book";

export const bookService = {
  getAllBooks: async (): Promise<Book[]> => {
    const response = await api.get<Book[]>("/books");
    return response.data;
  },

  getBookById: async (id: string): Promise<Book> => {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  createBook: async (bookData: CreateBookDto): Promise<Book> => {
    const response = await api.post<Book>("/books", bookData);
    return response.data;
  },

  updateBook: async (id: string, bookData: UpdateBookDto): Promise<Book> => {
    const response = await api.put<Book>(`/books/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};
