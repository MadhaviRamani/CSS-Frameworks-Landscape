import type { RefObject } from "react";

import { Button } from "./Button";
import { Modal } from "./Modal";

type ConfirmDeleteDialogProps = {
  open: boolean;
  bookTitle: string;
  onConfirm: () => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

export function ConfirmDeleteDialog({
  open,
  bookTitle,
  onConfirm,
  onClose,
  returnFocusRef,
}: ConfirmDeleteDialogProps) {
  return (
    <Modal
      open={open}
      title="Delete book?"
      onClose={onClose}
      returnFocusRef={returnFocusRef}
    >
      <p className="text-sm text-muted">
        Do you really want to delete{" "}
        <strong className="font-semibold text-fg">{bookTitle}</strong>? This
        cannot be undone.
      </p>
      {/* Cancel comes first, so it gets the focus when the dialog opens. */}
      <div className="flex justify-end gap-2 pt-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
