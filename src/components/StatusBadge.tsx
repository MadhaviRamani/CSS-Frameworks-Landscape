import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

const STATUS_CLASSES: Record<Status, string> = {
  "want-to-read": "bg-status-want text-on-status-want",
  reading: "bg-status-reading text-on-status-reading",
  done: "bg-status-done text-on-status-done",
};

type StatusBadgeProps = {
  status: Status;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASSES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
