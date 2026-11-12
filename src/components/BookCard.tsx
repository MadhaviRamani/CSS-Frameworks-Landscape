import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import type { Book } from "../types";
import { Rating } from "./Rating";
import { StatusBadge } from "./StatusBadge";

type BookCardProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <Col as="li">
      <Card as="article" className="h-100 shadow-sm">
        <Card.Body className="d-flex flex-column gap-2">
          <div>
            <Card.Title as="h2" className="h5 mb-1">
              {book.title}
            </Card.Title>
            <Card.Subtitle className="text-body-secondary">
              {book.author}
            </Card.Subtitle>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            <StatusBadge status={book.status} />
            <Rating rating={book.rating} />
          </div>

          {book.notes && <Card.Text className="small">{book.notes}</Card.Text>}

          <div className="d-flex gap-2 mt-auto pt-2">
            <Button
              size="sm"
              variant="outline-secondary"
              aria-label={`Edit ${book.title}`}
              onClick={() => onEdit(book)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline-danger"
              aria-label={`Delete ${book.title}`}
              onClick={() => onDelete(book)}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
