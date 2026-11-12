export function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-line bg-surface px-4 py-12 text-center">
      <p className="text-lg font-semibold text-fg">No books found</p>
      <p className="mt-1 text-sm text-muted">
        No books match your search or filter. Try another title or status.
      </p>
    </div>
  );
}
