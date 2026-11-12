import type { Ref } from "react";

import { Button } from "./Button";

type HeaderProps = {
  onAdd: () => void;
  addButtonRef: Ref<HTMLButtonElement>;
};

export function Header({ onAdd, addButtonRef }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <h1 className="text-2xl font-bold text-fg sm:text-3xl">Reading List</h1>
      <Button variant="primary" onClick={onAdd} ref={addButtonRef}>
        <span aria-hidden="true">+</span> Add book
      </Button>
    </header>
  );
}
