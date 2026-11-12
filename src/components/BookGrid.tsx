import Row from "react-bootstrap/Row";

import type { Book } from "../types";
import { BookCard } from "./BookCard";

type BookGridProps = {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

export function BookGrid({ books, onEdit, onDelete }: BookGridProps) {
  return (
    <Row as="ul" xs={1} sm={2} lg={3} className="g-3 list-unstyled">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Row>
  );
}
