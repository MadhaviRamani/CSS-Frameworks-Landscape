export function EmptyState() {
  return (
    <div className="text-center border rounded bg-body-tertiary py-5 px-3">
      <p className="h5">No books found</p>
      <p className="text-body-secondary mb-0">
        No books match your search or filter. Try another title or status.
      </p>
    </div>
  );
}
