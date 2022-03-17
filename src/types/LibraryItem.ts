import { Category } from "types/Category";

interface Base {
  _id: string;
  category: Category;
  isBorrowable: boolean;
  title: string;
  type: BookType | MediaType;
  borrowDate?: string;
  borrower?: string;
}

export enum BookType {
  BOOK = "book",
  REFERENCE_BOOK = "reference_book",
}
export enum MediaType {
  AUDIO_BOOK = "audio_book",
  DVD = "dvd",
}

export interface Book extends Base {
  author: string;
  pages: number;
}

export interface Media extends Base {
  runTimeMinutes: number;
}

export type LibraryItem = Base & (Media | Book);
