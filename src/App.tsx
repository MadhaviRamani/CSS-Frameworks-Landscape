import { useCallback, useRef, useState } from "react";
import Container from "react-bootstrap/Container";

import { filterBooks } from "./books";
import { AppToast, type ToastMessage } from "./components/AppToast";
import { BookFormDialog } from "./components/BookFormDialog";
import { BookGrid } from "./components/BookGrid";
import { ConfirmDeleteDialog } from "./components/ConfirmDeleteDialog";
import { EmptyState } from "./components/EmptyState";
import { Header } from "./components/Header";
import { Toolbar } from "./components/Toolbar";
import type { Book, NewBook, StatusFilter } from "./types";
import { useBooks } from "./useBooks";

type FormState = { show: boolean; book: Book | null; session: number };
type DeleteState = { show: boolean; book: Book | null; deleted: boolean };

export default function App() {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<FormState>({
    show: false,
    book: null,
    session: 0,
  });
  const [del, setDel] = useState<DeleteState>({
    show: false,
    book: null,
    deleted: false,
  });
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const addButtonRef = useRef<HTMLButtonElement>(null);

  const visibleBooks = filterBooks(books, { status, query });

  function showToast(text: string) {
    setToast({ id: Date.now(), text });
  }
  const closeToast = useCallback(() => setToast(null), []);

  function openForm(book: Book | null) {
    setForm((current) => ({ show: true, book, session: current.session + 1 }));
  }

  function closeForm() {
    setForm((current) => ({ ...current, show: false }));
  }

  function handleSave(values: NewBook) {
    if (form.book) {
      updateBook(form.book.id, values);
      showToast("Book updated");
    } else {
      addBook(values);
      showToast("Book added");
    }
    closeForm();
  }

  function handleConfirmDelete() {
    if (!del.book) return;
    deleteBook(del.book.id);
    setDel((current) => ({ ...current, show: false, deleted: true }));
    showToast("Book deleted");
  }

  function handleDeleteExited() {
    // The deleted card's button is gone, so move the focus to "Add book".
    if (del.deleted) addButtonRef.current?.focus();
    setDel({ show: false, book: null, deleted: false });
  }

  return (
    <Container className="py-4">
      <Header addButtonRef={addButtonRef} onAdd={() => openForm(null)} />

      <main>
        <Toolbar
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
        />

        {visibleBooks.length > 0 ? (
          <BookGrid
            books={visibleBooks}
            onEdit={openForm}
            onDelete={(book) => setDel({ show: true, book, deleted: false })}
          />
        ) : (
          <EmptyState />
        )}
      </main>

      <BookFormDialog
        key={form.session}
        show={form.show}
        book={form.book}
        onSave={handleSave}
        onClose={closeForm}
      />

      <ConfirmDeleteDialog
        show={del.show}
        bookTitle={del.book?.title ?? ""}
        deleted={del.deleted}
        onConfirm={handleConfirmDelete}
        onClose={() => setDel((current) => ({ ...current, show: false }))}
        onExited={handleDeleteExited}
      />

      <AppToast message={toast} onClose={closeToast} />
    </Container>
  );
}
