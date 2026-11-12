import type { MouseEvent } from "react";

import type { Book } from "../types";
import { Button } from "./Button";
import { Rating } from "./Rating";
import { StatusBadge } from "./StatusBadge";

type BookCardProps = {
  book: Book;
  onEdit: (book: Book, opener: HTMLButtonElement) => void;
  onDelete: (book: Book, opener: HTMLButtonElement) => void;
};

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <li>
      <article className="flex h-full flex-col gap-3 rounded-lg border border-line bg-surface p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-fg">{book.title}</h2>
          <p className="text-sm text-muted">{book.author}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={book.status} />
          <Rating rating={book.rating} />
        </div>

        {book.notes && <p className="text-sm text-fg">{book.notes}</p>}

        <div className="mt-auto flex gap-2 pt-2">
          <Button
            size="sm"
            aria-label={`Edit ${book.title}`}
            onClick={(event: MouseEvent<HTMLButtonElement>) =>
              onEdit(book, event.currentTarget)
            }
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            aria-label={`Delete ${book.title}`}
            onClick={(event: MouseEvent<HTMLButtonElement>) =>
              onDelete(book, event.currentTarget)
            }
          >
            Delete
          </Button>
        </div>
      </article>
    </li>
  );
}
