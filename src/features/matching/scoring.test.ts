import { describe, expect, it } from "vitest";
import { calculateMatch, parseAssessments, parseCriteria, parseCandidateSummary } from "./scoring";
import { criteriaSchema, type MatchCriterion, type MatchSource, type Assessment } from "./schema";

const criteria: MatchCriterion[] = [
  { id: "c1", text: "Wdrożenie AI", weight: 3, required: true, sourceQuote: "Wdrożenie AI" },
  { id: "c2", text: "Discovery", weight: 2, required: false, sourceQuote: "Discovery" },
  { id: "c3", text: "Certyfikat", weight: 1, required: true, sourceQuote: "Certyfikat" },
];
const sources: MatchSource[] = [
  {
    id: "cv",
    label: "CV",
    text: "Wdrożyłam model do produkcji. Uczestniczyłam w badaniach. Nie posiadam certyfikatu.",
  },
];
const assessments: Assessment[] = [
  {
    criterionId: "c1",
    assessment: "met",
    reason: "Opis wdrożenia produkcyjnego.",
    evidence: [{ sourceId: "cv", quote: "Wdrożyłam model do produkcji." }],
  },
  {
    criterionId: "c2",
    assessment: "partial",
    reason: "Nie podano zakresu samodzielności.",
    evidence: [{ sourceId: "cv", quote: "Uczestniczyłam w badaniach." }],
  },
  {
    criterionId: "c3",
    assessment: "not_met",
    reason: "Kandydatka deklaruje brak certyfikatu.",
    evidence: [{ sourceId: "cv", quote: "Nie posiadam certyfikatu." }],
  },
];
const unknown = (item: Assessment): Assessment => ({
  ...item,
  assessment: "unknown",
  reason: "Brak informacji w materiałach.",
  evidence: [],
});

describe("evidence-based weighted matching", () => {
  it("computes scores in code, with canonical employer weights and explicit negative evidence", () => {
    const result = calculateMatch(criteria, assessments, sources);
    expect(result.score).toBe(0.6667);
    expect(result.coverage).toBe(1);
    expect(result.criteria[0].evidence[0].label).toBe("CV");
    expect(result.criteria[2].required).toBe(true);
  });
  it("reports weighted coverage separately and excludes unknown from the assessed denominator", () => {
    const result = calculateMatch(
      criteria,
      [assessments[0], assessments[1], unknown(assessments[2])],
      sources,
    );
    expect(result.score).toBe(0.8);
    expect(result.coverage).toBeCloseTo(5 / 6);
    expect(result.criteria[2].assessment).toBe("unknown");
  });
  it("suppresses a misleading high score when too much information is unknown", () => {
    const result = calculateMatch(
      criteria,
      [assessments[0], unknown(assessments[1]), unknown(assessments[2])],
      sources,
    );
    expect(result.score).toBeNull();
    expect(result.coverage).toBe(0.5);
  });
  it("distinguishes an explicit zero from no assessable evidence", () => {
    expect(calculateMatch(criteria.slice(2), assessments.slice(2), sources).score).toBe(0);
    expect(calculateMatch(criteria, assessments.map(unknown), []).score).toBeNull();
    expect(calculateMatch(criteria, assessments.map(unknown), []).coverage).toBe(0);
  });
  it("is stable across assessment ordering and preserves criterion order", () => {
    expect(calculateMatch(criteria, [...assessments].reverse(), sources)).toEqual(
      calculateMatch(criteria, assessments, sources),
    );
  });
  it.each(["met", "partial", "not_met"] as const)("requires evidence for %s", (assessment) => {
    const value = [{ ...assessments[0], assessment, evidence: [] }];
    expect(() =>
      parseAssessments(JSON.stringify({ assessments: value }), criteria.slice(0, 1), sources),
    ).toThrow("MATCH_EVIDENCE_REQUIRED");
  });
  it("rejects invented quotes, source IDs and quotations from the job instead of CV", () => {
    for (const evidence of [
      [{ sourceId: "cv", quote: "Mam 10 lat doświadczenia" }],
      [{ sourceId: "job", quote: "Wdrożenie AI" }],
    ])
      expect(() =>
        parseAssessments(
          JSON.stringify({ assessments: [{ ...assessments[0], evidence }] }),
          criteria.slice(0, 1),
          sources,
        ),
      ).toThrow("MATCH_UNGROUNDED_EVIDENCE");
  });
  it("allows PDF whitespace differences without accepting a fabricated passage", () => {
    expect(
      parseAssessments(JSON.stringify({ assessments: [assessments[0]] }), criteria.slice(0, 1), [
        { ...sources[0], text: "Wdrożyłam model\n do produkcji." },
      ]),
    ).toHaveLength(1);
  });
  it("rejects missing, extra and duplicate criterion results", () => {
    for (const values of [
      assessments.slice(1),
      [...assessments, assessments[0]],
      [assessments[0], assessments[0], assessments[2]],
      [assessments[0], assessments[1], { ...assessments[2], criterionId: "invented" }],
    ]) {
      expect(() =>
        parseAssessments(JSON.stringify({ assessments: values }), criteria, sources),
      ).toThrow("MATCH_CRITERIA_MISMATCH");
    }
  });
  it("rejects an overall model score, changed weights and unknown with evidence", () => {
    expect(() =>
      parseAssessments(JSON.stringify({ assessments, score: 99 }), criteria, sources),
    ).toThrow();
    expect(() =>
      parseAssessments(
        JSON.stringify({ assessments: [{ ...assessments[0], weight: 100 }] }),
        criteria.slice(0, 1),
        sources,
      ),
    ).toThrow();
    expect(() =>
      parseAssessments(
        JSON.stringify({ assessments: [{ ...assessments[0], assessment: "unknown" }] }),
        criteria.slice(0, 1),
        sources,
      ),
    ).toThrow("MATCH_EVIDENCE_REQUIRED");
  });
  it("validates criteria before approval and ties them to the actual job text", () => {
    expect(
      parseCriteria(JSON.stringify({ criteria }), "Wdrożenie AI Discovery Certyfikat"),
    ).toEqual(criteria);
    expect(() => parseCriteria(JSON.stringify({ criteria }), "Inna oferta")).toThrow(
      "MATCH_UNGROUNDED_CRITERIA",
    );
    expect(criteriaSchema.safeParse([{ ...criteria[0], weight: 20 }]).success).toBe(false);
    expect(criteriaSchema.safeParse([criteria[0], criteria[0]]).success).toBe(false);
    expect(criteriaSchema.safeParse([]).success).toBe(false);
  });
});

it("includes rather than hides an unresolved required criterion in the result", () => {
  const result = calculateMatch(
    criteria,
    [assessments[0], assessments[1], unknown(assessments[2])],
    sources,
  );
  expect(
    result.criteria
      .filter((item) => item.required && item.assessment !== "met")
      .map((item) => item.id),
  ).toEqual(["c3"]);
});

it("accepts grounded candidate summaries and rejects invented supporting quotes", () => {
  const summary = {
    text: "Wdrożyła model do produkcji i uczestniczyła w badaniach użytkowników.",
    evidence: [{ sourceId: "cv", quote: "Wdrożyłam model do produkcji." }],
  };
  expect(parseCandidateSummary(summary, sources)).toEqual(summary);
  expect(() =>
    parseCandidateSummary(
      { ...summary, evidence: [{ sourceId: "cv", quote: "Zarządzałam zespołem 20 osób." }] },
      sources,
    ),
  ).toThrow("MATCH_UNGROUNDED_SUMMARY");
  expect(() => parseCandidateSummary({ ...summary, evidence: [] }, sources)).toThrow();
});
