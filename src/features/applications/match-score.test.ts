import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { latestMatchScore, formatMatchScore } from "./match-score";
import { MatchScore } from "./match-score-view";

const saved = {
  id: "score-1",
  score: 0.325,
  version: "token-jaccard-v1",
  calculated_at: "2026-10-22T10:00:00Z",
};
describe("saved Match Score presentation", () => {
  it("selects the latest saved result without mutating or recalculating history", () => {
    const old = { ...saved, id: "old", score: 0.9, calculated_at: "2026-10-21T10:00:00Z" };
    const scores = [old, saved];
    expect(latestMatchScore(scores)).toEqual(saved);
    expect(scores).toEqual([old, saved]);
    expect(formatMatchScore(saved.score)).toMatch(/32,5\s?%/);
  });
  it("distinguishes zero from missing and rejects corrupt scores", () => {
    expect(latestMatchScore([{ ...saved, score: 0 }])?.score).toBe(0);
    expect(latestMatchScore([])).toBeNull();
    expect(latestMatchScore(null)).toBeNull();
    for (const score of [NaN, Infinity, -1, 1.01])
      expect(latestMatchScore([{ ...saved, score }])).toBeNull();
    expect(latestMatchScore([{ ...saved, calculated_at: "invalid" }])).toBeNull();
  });
  it("renders the user-requested label, saved percentage and neutral decision context", () => {
    const html = renderToStaticMarkup(createElement(MatchScore, { scores: [saved] }));
    expect(html).toContain("Match Score");
    expect(html).toContain("Dopasowanie kandydata do roli");
    expect(html).toContain("32,5");
    expect(html).toContain("Decyzję o kolejnym etapie podejmuje pracodawca");
    expect(html).toContain(saved.version);
    expect(html).not.toContain("podobieństwo tekst");
    expect(renderToStaticMarkup(createElement(MatchScore, { scores: [] }))).toContain(
      "Brak wyniku",
    );
    expect(
      renderToStaticMarkup(
        createElement(MatchScore, { compact: true, scores: [{ ...saved, score: 0 }] }),
      ),
    ).toMatch(/0\s?%/);
  });
});
