const MAX_RATING = 5;

type RatingProps = {
  rating: number | null;
};

export function Rating({ rating }: RatingProps) {
  if (rating === null) {
    return <span className="small text-body-secondary">Not rated</span>;
  }

  return (
    <span className="small">
      <span aria-hidden="true">
        <span className="text-warning">{"★".repeat(rating)}</span>
        <span className="text-body-tertiary">
          {"★".repeat(MAX_RATING - rating)}
        </span>
      </span>
      <span className="visually-hidden">
        {rating} of {MAX_RATING} stars
      </span>
    </span>
  );
}
