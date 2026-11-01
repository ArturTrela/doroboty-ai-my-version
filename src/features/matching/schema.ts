import { z } from "zod";

export const MATCH_VERSION = "evidence-hybrid-v1";
export const MINIMUM_COVERAGE = 0.7;
export const criterionSchema = z
  .object({
    id: z.string().regex(/^[a-zA-Z0-9_-]{1,40}$/),
    text: z.string().trim().min(3).max(300),
    weight: z.number().int().min(1).max(3),
    required: z.boolean(),
    sourceQuote: z.string().trim().min(3).max(1000),
  })
  .strict();
export const criteriaSchema = z
  .array(criterionSchema)
  .min(1)
  .max(12)
  .refine(
    (items) =>
      new Set(items.map((item) => item.id)).size === items.length &&
      new Set(items.map((item) => item.text.toLocaleLowerCase("pl"))).size === items.length,
    "Kryteria muszą być różne.",
  );
export const criteriaOutputSchema = z.object({ criteria: criteriaSchema }).strict();
export const matchSourceSchema = z
  .object({
    id: z.string().min(1).max(80),
    label: z.string().min(1).max(160),
    text: z.string().trim().min(3).max(30000),
  })
  .strict();
export const matchSourcesSchema = z
  .array(matchSourceSchema)
  .max(22)
  .refine((items) => new Set(items.map((item) => item.id)).size === items.length);
export const assessmentSchema = z
  .object({
    criterionId: z.string().min(1).max(40),
    assessment: z.enum(["met", "partial", "not_met", "unknown"]),
    reason: z.string().trim().min(3).max(1200),
    evidence: z
      .array(
        z
          .object({
            sourceId: z.string().min(1).max(80),
            quote: z.string().trim().min(3).max(1000),
          })
          .strict(),
      )
      .max(4),
  })
  .strict();
export const candidateSummarySchema = z
  .object({
    text: z.string().trim().min(20).max(500),
    evidence: z
      .array(
        z
          .object({
            sourceId: z.string().min(1).max(80),
            quote: z.string().trim().min(3).max(1000),
          })
          .strict(),
      )
      .min(1)
      .max(4),
  })
  .strict();
export const assessmentsOutputSchema = z
  .object({
    assessments: z.array(assessmentSchema).min(1).max(12),
    summary: candidateSummarySchema.optional(),
  })
  .strict();
export type MatchCriterion = z.infer<typeof criterionSchema>;
export type MatchSource = z.infer<typeof matchSourceSchema>;
export type Assessment = z.infer<typeof assessmentSchema>;
export const evaluatedCriterionSchema = criterionSchema.extend({
  assessment: assessmentSchema.shape.assessment,
  reason: assessmentSchema.shape.reason,
  evidence: z
    .array(z.object({ sourceId: z.string(), label: z.string(), quote: z.string() }))
    .max(4),
});
export const matchDetailsSchema = z
  .object({
    criteria: z.array(evaluatedCriterionSchema).min(1).max(12),
    coverage: z.number().min(0).max(1),
    minimumCoverage: z.number().min(0).max(1),
    provider: z.string(),
    model: z.string(),
    promptVersion: z.string(),
  })
  .passthrough();
