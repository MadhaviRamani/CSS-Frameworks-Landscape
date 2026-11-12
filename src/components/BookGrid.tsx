import type { Book } from "../types";
import { BookCard } from "./BookCard";

type BookGridProps = {
  books: Book[];
  onEdit: (book: Book, opener: HTMLButtonElement) => void;
  onDelete: (book: Book, opener: HTMLButtonElement) => void;
};

export function BookGrid({ books, onEdit, onDelete }: BookGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
