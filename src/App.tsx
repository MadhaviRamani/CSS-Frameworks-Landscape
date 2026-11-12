import { useCallback, useRef, useState } from "react";

import { filterBooks } from "./books";
import { BookFormDialog } from "./components/BookFormDialog";
import { BookGrid } from "./components/BookGrid";
import { ConfirmDeleteDialog } from "./components/ConfirmDeleteDialog";
import { EmptyState } from "./components/EmptyState";
import { Header } from "./components/Header";
import { Toast, type ToastMessage } from "./components/Toast";
import { Toolbar } from "./components/Toolbar";
import type { Book, NewBook, StatusFilter } from "./types";
import { useBooks } from "./useBooks";

type FormState = { open: boolean; book: Book | null; session: number };

export default function App() {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<FormState>({
    open: false,
    book: null,
    session: 0,
  });
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const visibleBooks = filterBooks(books, { status, query });

  function showToast(text: string) {
    setToast({ id: Date.now(), text });
  }
  const dismissToast = useCallback(() => setToast(null), []);

  function openForm(book: Book | null, opener: HTMLElement | null) {
    returnFocusRef.current = opener;
    setForm((current) => ({ open: true, book, session: current.session + 1 }));
  }

  function closeForm() {
    setForm((current) => ({ ...current, open: false }));
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

  function openDelete(book: Book, opener: HTMLElement) {
    returnFocusRef.current = opener;
    setDeleting(book);
  }

  function handleConfirmDelete() {
    if (!deleting) return;
    deleteBook(deleting.id);
    // The card and its Delete button are gone, so return focus to "Add book".
    returnFocusRef.current = addButtonRef.current;
    setDeleting(null);
    showToast("Book deleted");
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-24 sm:px-6">
      <Header
        addButtonRef={addButtonRef}
        onAdd={() => openForm(null, addButtonRef.current)}
      />

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
            onEdit={(book, opener) => openForm(book, opener)}
            onDelete={openDelete}
          />
        ) : (
          <EmptyState />
        )}
      </main>

      <BookFormDialog
        key={form.session}
        open={form.open}
        book={form.book}
        onSave={handleSave}
        onClose={closeForm}
        returnFocusRef={returnFocusRef}
      />

      <ConfirmDeleteDialog
        open={deleting !== null}
        bookTitle={deleting?.title ?? ""}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleting(null)}
        returnFocusRef={returnFocusRef}
      />

      <Toast message={toast} onDismiss={dismissToast} />
    </div>
  );
}
