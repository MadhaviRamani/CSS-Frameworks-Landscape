import { useState, type FormEvent, type RefObject } from "react";

import { STATUS_LABELS } from "../books";
import type { Book, NewBook, Status } from "../types";
import { Button } from "./Button";
import { Field, inputClass } from "./Field";
import { Modal } from "./Modal";

type BookFormDialogProps = {
  open: boolean;
  /** The book to edit, or `null` to add a new one. */
  book: Book | null;
  onSave: (book: NewBook) => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

type Errors = { title?: string; author?: string };

const RATINGS = [1, 2, 3, 4, 5];

export function BookFormDialog({
  open,
  book,
  onSave,
  onClose,
  returnFocusRef,
}: BookFormDialogProps) {
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [status, setStatus] = useState<Status>(book?.status ?? "want-to-read");
  const [rating, setRating] = useState<number | null>(book?.rating ?? null);
  const [notes, setNotes] = useState(book?.notes ?? "");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const nextErrors: Errors = {};
    if (!trimmedTitle) nextErrors.title = "Please enter a title.";
    if (!trimmedAuthor) nextErrors.author = "Please enter an author.";
    setErrors(nextErrors);

    if (nextErrors.title || nextErrors.author) {
      const firstInvalid = nextErrors.title ? "book-title" : "book-author";
      event.currentTarget
        .querySelector<HTMLInputElement>(`#${firstInvalid}`)
        ?.focus();
      return;
    }

    onSave({
      title: trimmedTitle,
      author: trimmedAuthor,
      status,
      rating,
      notes: notes.trim(),
    });
  }

  return (
    <Modal
      open={open}
      title={book ? "Edit book" : "Add book"}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field id="book-title" label="Title" error={errors.title}>
          {(props) => (
            <input
              {...props}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className={inputClass}
            />
          )}
        </Field>

        <Field id="book-author" label="Author" error={errors.author}>
          {(props) => (
            <input
              {...props}
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
              className={inputClass}
            />
          )}
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="book-status" label="Status">
            {(props) => (
              <select
                {...props}
                value={status}
                onChange={(event) => setStatus(event.target.value as Status)}
                className={inputClass}
              >
                {(Object.keys(STATUS_LABELS) as Status[]).map((value) => (
                  <option key={value} value={value}>
                    {STATUS_LABELS[value]}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field id="book-rating" label="Rating">
            {(props) => (
              <select
                {...props}
                value={rating ?? ""}
                onChange={(event) =>
                  setRating(
                    event.target.value === "" ? null : Number(event.target.value)
                  )
                }
                className={inputClass}
              >
                <option value="">Not rated</option>
                {RATINGS.map((value) => (
                  <option key={value} value={value}>
                    {value} {value === 1 ? "star" : "stars"}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>

        <Field id="book-notes" label="Notes">
          {(props) => (
            <textarea
              {...props}
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className={inputClass}
            />
          )}
        </Field>

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
