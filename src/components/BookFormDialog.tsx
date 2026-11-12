import { useState, type FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { STATUS_LABELS } from "../books";
import type { Book, NewBook, Status } from "../types";

type BookFormDialogProps = {
  show: boolean;
  /** The book to edit, or `null` to add a new one. */
  book: Book | null;
  onSave: (book: NewBook) => void;
  onClose: () => void;
};

type Errors = { title?: string; author?: string };

const RATINGS = [1, 2, 3, 4, 5];

export function BookFormDialog({
  show,
  book,
  onSave,
  onClose,
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

  const heading = book ? "Edit book" : "Add book";

  return (
    <Modal show={show} onHide={onClose} aria-labelledby="book-form-title">
      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="book-form-title">{heading}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex flex-column gap-3">
          <Form.Group controlId="book-title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              isInvalid={Boolean(errors.title)}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="book-author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              isInvalid={Boolean(errors.author)}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.author}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="row g-3">
            <Form.Group controlId="book-status" className="col-sm-6">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(event) => setStatus(event.target.value as Status)}
              >
                {(Object.keys(STATUS_LABELS) as Status[]).map((value) => (
                  <option key={value} value={value}>
                    {STATUS_LABELS[value]}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="book-rating" className="col-sm-6">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                value={rating ?? ""}
                onChange={(event) =>
                  setRating(
                    event.target.value === "" ? null : Number(event.target.value)
                  )
                }
              >
                <option value="">Not rated</option>
                {RATINGS.map((value) => (
                  <option key={value} value={value}>
                    {value} {value === 1 ? "star" : "stars"}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <Form.Group controlId="book-notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
