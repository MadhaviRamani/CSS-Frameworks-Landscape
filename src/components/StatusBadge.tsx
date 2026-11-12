import Badge from "react-bootstrap/Badge";

import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

const STATUS_BG: Record<Status, { bg: string; text?: "dark" }> = {
  "want-to-read": { bg: "secondary" },
  reading: { bg: "warning", text: "dark" },
  done: { bg: "success" },
};

type StatusBadgeProps = {
  status: Status;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { bg, text } = STATUS_BG[status];
  return (
    <Badge pill bg={bg} text={text}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
