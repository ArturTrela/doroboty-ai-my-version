import { MATCH_VERSION } from "@/features/matching/schema";
import { formatMatchScore, latestMatchScore, type SavedMatchScore } from "./match-score";
import { MatchScoreProgress } from "./match-score-progress";
import { cn } from "@/lib/utils";

export function matchScoreTone(score: number | null | undefined) {
  if (score == null || !Number.isFinite(score)) return "neutral";
  if (score >= 0.8) return "green";
  if (score >= 0.6) return "yellow";
  if (score >= 0.4) return "orange";
  return "red";
}
const toneStyles = {
  green: { background: "bg-[var(--gui-success-transparent)]", dot: "bg-[var(--gui-success)]" },
  yellow: { background: "bg-[var(--gui-warning-transparent)]", dot: "bg-[var(--gui-warning)]" },
  orange: {
    background: "bg-[var(--gui-match-orange-transparent)]",
    dot: "bg-[var(--gui-match-orange)]",
  },
  red: { background: "bg-[var(--gui-error-transparent)]", dot: "bg-[var(--gui-error)]" },
  neutral: { background: "bg-muted", dot: "bg-[var(--gui-neutral-6)]" },
};
export function savedCandidateSummary(scores: SavedMatchScore[] | null | undefined) {
  const components = latestMatchScore(scores)?.components as
    { candidateSummary?: unknown } | undefined;
  return typeof components?.candidateSummary === "string" && components.candidateSummary.trim()
    ? components.candidateSummary.trim()
    : null;
}
function statusLabel(saved: SavedMatchScore | null) {
  if (!saved) return "Brak wyniku";
  if (saved.score !== null) return formatMatchScore(saved.score);
  return (
    (
      {
        pending: "Obliczanie…",
        processing: "Obliczanie…",
        insufficient: "Brak wyniku",
        unavailable: "Brak wyniku",
        failed: "Brak wyniku",
      } as Record<string, string>
    )[saved.status ?? ""] ?? "Brak wyniku"
  );
}
export function MatchScore({
  scores,
  compact = false,
  applicationId,
  canRetry = false,
}: {
  scores: SavedMatchScore[] | null | undefined;
  compact?: boolean;
  applicationId?: string;
  canRetry?: boolean;
}) {
  const saved = latestMatchScore(scores?.filter((item) => item.version === MATCH_VERSION));
  const tone = matchScoreTone(saved?.score);
  const summary = savedCandidateSummary(scores);
  return (
    <section
      aria-label="Match Score"
      data-match-score
      className={
        compact
          ? "min-w-0 font-ui"
          : "min-w-0 rounded-xl bg-card p-[var(--gui-space-l)] font-ui shadow-[var(--gui-shadow-m)]"
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-[var(--gui-space-s)]">
        <p className="text-sm font-medium">Match Score</p>
        <span
          data-match-score-tone={tone}
          data-match-score-value
          className={cn(
            "inline-flex items-center gap-[var(--gui-space-xs)] rounded-full px-[var(--gui-space-m)] py-[var(--gui-space-xs)] font-semibold tabular-nums text-[var(--gui-text)]",
            compact ? "text-base" : "text-xl",
            toneStyles[tone].background,
          )}
        >
          <span
            aria-hidden="true"
            className={cn("size-2 shrink-0 rounded-full", toneStyles[tone].dot)}
          />
          {statusLabel(saved)}
        </span>
      </div>
      {!compact && (
        <div className="mt-[var(--gui-space-m)]">
          <p className="text-xs font-medium text-muted-foreground">Podsumowanie AI</p>
          <p className="mt-[var(--gui-space-xs)] text-sm leading-relaxed">
            {summary ?? "Podsumowanie nie jest jeszcze dostępne."}
          </p>
        </div>
      )}
      {!compact &&
        applicationId &&
        saved?.version === MATCH_VERSION &&
        ["pending", "processing", "failed"].includes(saved.status ?? "") && (
          <MatchScoreProgress
            applicationId={applicationId}
            status={saved.status!}
            canRetry={canRetry}
            attempts={saved.attempts ?? 0}
          />
        )}
    </section>
  );
}
