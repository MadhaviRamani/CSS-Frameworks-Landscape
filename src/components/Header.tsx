import type { Ref } from "react";
import Button from "react-bootstrap/Button";

type HeaderProps = {
  onAdd: () => void;
  addButtonRef: Ref<HTMLButtonElement>;
};

export function Header({ onAdd, addButtonRef }: HeaderProps) {
  return (
    <header className="d-flex align-items-center justify-content-between gap-3 mb-4">
      <h1 className="h2 mb-0">Reading List</h1>
      <Button variant="primary" onClick={onAdd} ref={addButtonRef}>
        <span aria-hidden="true">+</span> Add book
      </Button>
    </header>
  );
}
