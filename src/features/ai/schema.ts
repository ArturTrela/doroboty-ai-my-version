import { z } from "zod";

export const aiJobIdSchema = z.uuid();
export const candidateDraftRequestSchema = z
  .object({
    jobId: z.uuid(),
    experienceIds: z.array(z.uuid()).max(20),
    workSampleIds: z.array(z.uuid()).max(20),
  })
  .refine((value) => value.experienceIds.length + value.workSampleIds.length > 0);
export const jobDraftSchema = z.object({ jobId: z.uuid() });
export const jobBriefSchema = z.object({
  jobId: z.uuid(),
  sourceText: z.string().trim().min(40, "Brief powinien mieć co najmniej 40 znaków.").max(10_000),
  decisionCriteria: z
    .string()
    .transform((value) =>
      value
        .split("\n")
        .map((item) => item.replace(/^[-•]\s*/, "").trim())
        .filter(Boolean),
    )
    .pipe(
      z
        .array(z.string().min(3).max(300))
        .min(1, "Dodaj co najmniej jedno kryterium decyzji.")
        .max(12),
    ),
});
export const jobDraftApprovalSchema = z.object({
  jobId: z.uuid(),
  generationId: z.uuid(),
  title: z.string().trim().min(2).max(160),
  summary: z.string().trim().min(20).max(300),
  description: z.string().trim().min(50).max(30000),
});
