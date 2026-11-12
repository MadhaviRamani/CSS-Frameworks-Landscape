import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type ConfirmDeleteDialogProps = {
  show: boolean;
  bookTitle: string;
  /** `true` after the book was deleted: its Delete button is gone. */
  deleted: boolean;
  onConfirm: () => void;
  onClose: () => void;
  /** Called after the dialog has closed. */
  onExited: () => void;
};

export function ConfirmDeleteDialog({
  show,
  bookTitle,
  deleted,
  onConfirm,
  onClose,
  onExited,
}: ConfirmDeleteDialogProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      onExited={onExited}
      restoreFocus={!deleted}
      aria-labelledby="delete-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="delete-title">Delete book?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you really want to delete <strong>{bookTitle}</strong>? This cannot
        be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose} autoFocus>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
