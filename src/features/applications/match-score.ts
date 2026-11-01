import { MATCH_VERSION } from "@/features/matching/schema";
export type SavedMatchScore = {
  id: string;
  score: number | null;
  version: string;
  calculated_at: string;
  status?: string;
  components?: unknown;
  attempts?: number;
  processing_started_at?: string | null;
};
export function latestMatchScore(scores: SavedMatchScore[] | null | undefined) {
  return (
    (scores ?? [])
      .filter(
        (item) =>
          Number.isFinite(Date.parse(item.calculated_at)) &&
          (item.score !== null
            ? Number.isFinite(item.score) && item.score >= 0 && item.score <= 1
            : item.version === MATCH_VERSION &&
              ["pending", "processing", "insufficient", "unavailable", "failed"].includes(
                item.status ?? "",
              )),
      )
      .toSorted(
        (a, b) =>
          Date.parse(b.calculated_at) - Date.parse(a.calculated_at) || b.id.localeCompare(a.id),
      )[0] ?? null
  );
}
export function formatMatchScore(value: number) {
  return new Intl.NumberFormat("pl-PL", { style: "percent", maximumFractionDigits: 1 }).format(
    value,
  );
}
