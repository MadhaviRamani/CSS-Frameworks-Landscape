import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import { STATUS_LABELS } from "../books";
import type { Status, StatusFilter } from "../types";

type ToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  status: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
};

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.keys(STATUS_LABELS) as Status[]).map((value) => ({
    value,
    label: STATUS_LABELS[value],
  })),
];

export function Toolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
}: ToolbarProps) {
  return (
    <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-md-between gap-3 mb-4">
      <Form.Group controlId="search">
        <Form.Label>Search by title</Form.Label>
        <Form.Control
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="e.g. Dune"
        />
      </Form.Group>

      <fieldset>
        <legend className="form-label fs-6 mb-2">Status</legend>
        <ToggleButtonGroup
          type="radio"
          name="status-filter"
          value={status}
          onChange={(value: StatusFilter) => onStatusChange(value)}
          className="flex-wrap"
        >
          {FILTERS.map((filter) => (
            <ToggleButton
              key={filter.value}
              id={`filter-${filter.value}`}
              value={filter.value}
              variant="outline-primary"
            >
              {filter.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </fieldset>
    </div>
  );
}
