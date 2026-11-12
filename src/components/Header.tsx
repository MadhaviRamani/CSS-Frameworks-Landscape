import type { Ref } from "react";
import Button from "react-bootstrap/Button";

import type { ColorMode } from "../useColorMode";
import { ColorModeToggle } from "./ColorModeToggle";

type HeaderProps = {
  onAdd: () => void;
  addButtonRef: Ref<HTMLButtonElement>;
  colorMode: ColorMode;
  onToggleColorMode: () => void;
};

export function Header({
  onAdd,
  addButtonRef,
  colorMode,
  onToggleColorMode,
}: HeaderProps) {
  return (
    <header className="d-flex align-items-center justify-content-between gap-3 mb-4">
      <h1 className="h2 mb-0">Reading List</h1>
      <div className="d-flex gap-2">
        <ColorModeToggle mode={colorMode} onToggle={onToggleColorMode} />
        <Button variant="primary" onClick={onAdd} ref={addButtonRef}>
          <span aria-hidden="true">+</span> Add book
        </Button>
      </div>
    </header>
  );
}
