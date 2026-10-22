import { formatMatchScore, latestMatchScore, type SavedMatchScore } from "./match-score";

export function MatchScore({
  scores,
  compact = false,
}: {
  scores: SavedMatchScore[] | null | undefined;
  compact?: boolean;
}) {
  const saved = latestMatchScore(scores);
  return (
    <section
      aria-label="Match Score"
      data-match-score
      className={
        compact
          ? "mt-[var(--gui-space-m)] font-ui"
          : "rounded-xl bg-card p-[var(--gui-space-l)] font-ui shadow-[var(--gui-shadow-m)]"
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-[var(--gui-space-s)]">
        {compact ? <p className="text-sm font-medium">Match Score</p> : <h2>Match Score</h2>}
        <p
          data-match-score-value
          className={
            compact ? "text-base font-semibold tabular-nums" : "text-xl font-semibold tabular-nums"
          }
        >
          {saved ? formatMatchScore(saved.score) : "Brak wyniku"}
        </p>
      </div>
      <p className="mt-[var(--gui-space-xxs)] text-sm text-muted-foreground">
        Dopasowanie kandydata do roli
      </p>
      {!compact && (
        <>
          <p className="mt-[var(--gui-space-s)] text-sm text-muted-foreground">
            {saved
              ? "Wynik zapisany dla wysłanej aplikacji. Decyzję o kolejnym etapie podejmuje pracodawca."
              : "Dla tej aplikacji nie zapisano jeszcze wyniku."}
          </p>
          {saved && (
            <p className="mt-[var(--gui-space-s)] text-xs text-muted-foreground">
              Wersja: {saved.version} · obliczono{" "}
              {new Intl.DateTimeFormat("pl-PL", {
                dateStyle: "medium",
                timeZone: "Europe/Warsaw",
              }).format(new Date(saved.calculated_at))}
            </p>
          )}
        </>
      )}
    </section>
  );
}
