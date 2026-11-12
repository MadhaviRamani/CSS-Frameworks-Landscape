import { useEffect } from "react";

export type ToastMessage = {
  id: number;
  text: string;
};

type ToastProps = {
  message: ToastMessage | null;
  onDismiss: () => void;
};

const TOAST_DURATION_MS = 3000;

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDismiss, TOAST_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  // The live region is always rendered, so screen readers announce new text.
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      {message && (
        <p className="rounded-md bg-toast px-4 py-3 text-sm font-medium text-on-toast shadow-lg">
          {message.text}
        </p>
      )}
    </div>
  );
}
