import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

/** Classes defined in src/index.css from the shared tokens. */
const STATUS_CLASS: Record<Status, string> = {
  "want-to-read": "status-want",
  reading: "status-reading",
  done: "status-done",
};

type StatusBadgeProps = {
  status: Status;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge rounded-pill ${STATUS_CLASS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
