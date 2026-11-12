const MAX_RATING = 5;

type RatingProps = {
  rating: number | null;
};

export function Rating({ rating }: RatingProps) {
  if (rating === null) {
    return <span className="text-sm text-muted">Not rated</span>;
  }

  return (
    <span className="text-sm">
      <span aria-hidden="true" className="tracking-wider text-star">
        {"★".repeat(rating)}
        <span className="text-line">{"★".repeat(MAX_RATING - rating)}</span>
      </span>
      <span className="sr-only">
        {rating} of {MAX_RATING} stars
      </span>
    </span>
  );
}
