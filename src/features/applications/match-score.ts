export type SavedMatchScore = {
  id: string;
  score: number;
  version: string;
  calculated_at: string;
};

export function latestMatchScore(scores: SavedMatchScore[] | null | undefined) {
  return (
    (scores ?? [])
      .filter(
        (item) =>
          Number.isFinite(item.score) &&
          item.score >= 0 &&
          item.score <= 1 &&
          Number.isFinite(Date.parse(item.calculated_at)),
      )
      .toSorted(
        (a, b) =>
          Date.parse(b.calculated_at) - Date.parse(a.calculated_at) || b.id.localeCompare(a.id),
      )[0] ?? null
  );
}

export function formatMatchScore(value: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);
}
