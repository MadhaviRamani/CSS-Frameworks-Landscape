import { STATUS_LABELS } from "../books";
import type { Status, StatusFilter } from "../types";
import { inputClass } from "./Field";

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
    <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-1 md:w-72">
        <label htmlFor="search" className="text-sm font-medium text-fg">
          Search by title
        </label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="e.g. Dune"
          className={inputClass}
        />
      </div>

      <fieldset>
        <legend className="mb-1 text-sm font-medium text-fg">Status</legend>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <label
              key={filter.value}
              className="cursor-pointer rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-fg hover:bg-page has-checked:border-primary has-checked:bg-primary has-checked:text-on-primary has-focus-visible:ring-2 has-focus-visible:ring-focus has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-page"
            >
              <input
                type="radio"
                name="status-filter"
                value={filter.value}
                checked={status === filter.value}
                onChange={() => onStatusChange(filter.value)}
                className="sr-only"
              />
              {filter.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
