import {
  assessmentsOutputSchema,
  criteriaOutputSchema,
  criteriaSchema,
  candidateSummarySchema,
  MINIMUM_COVERAGE,
  type MatchCriterion,
  type MatchSource,
  type Assessment,
} from "./schema";

function normalize(value: string) {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}
export function parseCriteria(text: string, jobText: string): MatchCriterion[] {
  const { criteria } = criteriaOutputSchema.parse(JSON.parse(text));
  if (criteria.some((item) => !normalize(jobText).includes(normalize(item.sourceQuote))))
    throw new Error("MATCH_UNGROUNDED_CRITERIA");
  return criteria;
}
export function parseAssessments(
  text: string,
  criteria: MatchCriterion[],
  sources: MatchSource[],
): Assessment[] {
  criteriaSchema.parse(criteria);
  const { assessments } = assessmentsOutputSchema.parse(JSON.parse(text));
  if (
    assessments.length !== criteria.length ||
    new Set(assessments.map((item) => item.criterionId)).size !== criteria.length ||
    assessments.some((item) => !criteria.some((criterion) => criterion.id === item.criterionId))
  )
    throw new Error("MATCH_CRITERIA_MISMATCH");
  for (const item of assessments) {
    if ((item.assessment === "unknown") !== (item.evidence.length === 0))
      throw new Error("MATCH_EVIDENCE_REQUIRED");
    for (const evidence of item.evidence) {
      const source = sources.find((entry) => entry.id === evidence.sourceId);
      if (!source || !normalize(source.text).includes(normalize(evidence.quote)))
        throw new Error("MATCH_UNGROUNDED_EVIDENCE");
    }
  }
  return assessments;
}
export function calculateMatch(
  criteria: MatchCriterion[],
  assessments: Assessment[],
  sources: MatchSource[],
) {
  // Validate the complete correspondence even when called independently of an AI provider.
  const validated = parseAssessments(JSON.stringify({ assessments }), criteria, sources);
  let assessedWeight = 0;
  let points = 0;
  const totalWeight = criteria.reduce((sum, item) => sum + item.weight, 0);
  const evaluated = criteria.map((criterion) => {
    const item = validated.find((entry) => entry.criterionId === criterion.id)!;
    if (item.assessment !== "unknown") {
      assessedWeight += criterion.weight;
      points += criterion.weight * { met: 1, partial: 0.5, not_met: 0 }[item.assessment];
    }
    return {
      ...criterion,
      assessment: item.assessment,
      reason: item.reason,
      evidence: item.evidence.map((entry) => ({
        ...entry,
        label: sources.find((source) => source.id === entry.sourceId)!.label,
      })),
    };
  });
  const coverage = assessedWeight / totalWeight;
  return {
    score:
      coverage >= MINIMUM_COVERAGE ? Math.round((points / assessedWeight) * 10000) / 10000 : null,
    coverage,
    minimumCoverage: MINIMUM_COVERAGE,
    criteria: evaluated,
  };
}

export function parseCandidateSummary(value: unknown, sources: MatchSource[]) {
  const summary = candidateSummarySchema.parse(value);
  for (const citation of summary.evidence) {
    const source = sources.find((item) => item.id === citation.sourceId);
    if (!source || !normalize(source.text).includes(normalize(citation.quote)))
      throw new Error("MATCH_UNGROUNDED_SUMMARY");
  }
  return summary;
}
