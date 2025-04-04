export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

export interface UpdateBookDto {
  title?: string;
  author?: string;
  genre?: string;
  publicationYear?: number;
}
