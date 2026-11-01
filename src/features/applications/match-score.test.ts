import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
vi.mock("./match-score-progress", () => ({ MatchScoreProgress: () => null }));
import { MatchScore, matchScoreTone, savedCandidateSummary } from "./match-score-view";
import { latestMatchScore, formatMatchScore } from "./match-score";
const saved = {
  id: "score",
  score: 0.625,
  version: "evidence-hybrid-v1",
  status: "completed",
  calculated_at: "2026-11-01T10:00:00Z",
  components: {
    coverage: 0.8,
    candidateSummary:
      "Prowadziła discovery i wdrożyła produkt AI. Warto omówić doświadczenie w produktach B2B.",
    criteria: [
      {
        reason: "Internal assessment detail",
        evidence: [{ quote: "Private assessment quotation" }],
      },
    ],
  },
};
describe("simple saved Match Score", () => {
  it("shows one score and a short saved summary without analysis or technical detail", () => {
    const html = renderToStaticMarkup(createElement(MatchScore, { scores: [saved] }));
    expect(html).toContain("62,5");
    expect(html).toContain(saved.components.candidateSummary);
    expect(html).toContain('data-match-score-tone="yellow"');
    for (const text of [
      "Kompletność",
      "Uzasadnienia",
      "Jak liczymy",
      "Wersja:",
      "Internal assessment detail",
      "Private assessment quotation",
      "Tryb testowy",
      "Wymagania konieczne",
    ])
      expect(html).not.toContain(text);
  });
  it("keeps compact scores free of repeated candidate summaries", () => {
    const html = renderToStaticMarkup(
      createElement(MatchScore, { compact: true, scores: [saved] }),
    );
    expect(html).toContain("62,5");
    expect(html).not.toContain(saved.components.candidateSummary);
    expect(savedCandidateSummary([saved])).toBe(saved.components.candidateSummary);
  });
  it.each([
    [0, "red"],
    [0.3999, "red"],
    [0.4, "orange"],
    [0.5999, "orange"],
    [0.6, "yellow"],
    [0.7999, "yellow"],
    [0.8, "green"],
    [1, "green"],
    [null, "neutral"],
    [undefined, "neutral"],
  ] as const)("maps %s to %s", (score, tone) => expect(matchScoreTone(score)).toBe(tone));
  it("distinguishes zero, pending and absent scores without showing internal thresholds", () => {
    expect(formatMatchScore(0)).toMatch(/0\s?%/);
    expect(latestMatchScore([{ ...saved, score: 0 }])?.score).toBe(0);
    expect(latestMatchScore([])).toBeNull();
    expect(renderToStaticMarkup(createElement(MatchScore, { scores: [] }))).toContain(
      "Brak wyniku",
    );
    const pending = {
      ...saved,
      id: "new",
      score: null,
      status: "pending",
      calculated_at: "2026-11-02T10:00:00Z",
    };
    expect(latestMatchScore([saved, pending])).toEqual(pending);
    expect(renderToStaticMarkup(createElement(MatchScore, { scores: [pending] }))).toContain(
      "Obliczanie…",
    );
    for (const score of [NaN, Infinity, -1, 1.1])
      expect(latestMatchScore([{ ...saved, score }])).toBeNull();
  });
});

it("does not present historical word similarity as a candidate CV Match Score", () => {
  const html = renderToStaticMarkup(
    createElement(MatchScore, { scores: [{ ...saved, version: "token-jaccard-v1", score: 0.95 }] }),
  );
  expect(html).toContain("Brak wyniku");
  expect(html).not.toContain("95%");
});
