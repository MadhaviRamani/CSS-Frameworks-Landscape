import { useEffect, useId, useRef, type ReactNode, type RefObject } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  /** The element that gets the focus back after the dialog closed. */
  returnFocusRef: RefObject<HTMLElement | null>;
  children: ReactNode;
};

/**
 * A native `<dialog>` opened with `showModal()`. The browser traps the focus,
 * makes the page behind it inert and puts the focus on the first control.
 */
export function Modal({
  open,
  title,
  onClose,
  returnFocusRef,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
      returnFocusRef.current?.focus();
    }
  }, [open, returnFocusRef]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        // Escape: let React state close the dialog.
        event.preventDefault();
        onClose();
      }}
      className="m-auto w-full max-w-md rounded-lg border border-line bg-surface p-0 text-fg shadow-xl"
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 id={titleId} className="text-lg font-semibold">
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  );
}
