import { z } from "zod";
import type { MatchSource } from "@/features/matching/schema";

export const cvSnapshotSchema = z.object({
  fileName: z.string(),
  storagePath: z.string(),
  uploadedAt: z.string(),
  sizeBytes: z.number().nonnegative(),
});
export type CvSnapshot = z.infer<typeof cvSnapshotSchema>;
export const candidateSourceSchema = z
  .object({
    candidateNotes: z.string().trim().max(11000),
    cvText: z.string().min(20).max(30000).nullable(),
    cvReadStatus: z.enum(["available", "missing", "unreadable"]),
    cvSnapshot: cvSnapshotSchema.nullable(),
  })
  .superRefine((source, context) => {
    if (
      (source.cvReadStatus === "available" && (!source.cvText || !source.cvSnapshot)) ||
      (source.cvReadStatus !== "available" && source.cvText !== null) ||
      (source.cvReadStatus === "missing" && source.cvSnapshot !== null) ||
      (source.cvReadStatus === "unreadable" && !source.cvSnapshot)
    )
      context.addIssue({ code: "custom", message: "Inconsistent CV source" });
  });
export type CandidateSource = z.infer<typeof candidateSourceSchema>;

export function mergeCandidateNotes(...values: (string | undefined | null)[]) {
  return [
    ...new Set(
      values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)),
    ),
  ].join("\n\n");
}
export function restoreCandidateSources(
  draft: { answer?: string; experience_notes?: string; ai_generation_id?: string | null } | null,
  generationSource?: unknown,
  currentCv?: CvSnapshot | null,
) {
  const source = generationSource as { candidateNotes?: unknown } | undefined;
  const original = typeof source?.candidateNotes === "string" ? source.candidateNotes : "";
  const candidateNotes = draft?.ai_generation_id
    ? mergeCandidateNotes(original, draft.experience_notes)
    : mergeCandidateNotes(draft?.answer, draft?.experience_notes);
  const savedSource = candidateSourceSchema.safeParse(generationSource);
  return {
    candidateNotes,
    answer: draft?.ai_generation_id ? (draft.answer ?? "") : candidateNotes,
    sourceChanged: Boolean(
      draft?.ai_generation_id &&
      (!savedSource.success ||
        candidateNotes !== original.trim() ||
        (currentCv !== undefined &&
          savedSource.success &&
          !sameCvSource(savedSource.data.cvSnapshot, currentCv))),
    ),
  };
}
export function sameCvSource(saved: CvSnapshot | null, current: CvSnapshot | null) {
  return saved === null || current === null
    ? saved === current
    : saved.storagePath === current.storagePath &&
        saved.uploadedAt === current.uploadedAt &&
        saved.sizeBytes === current.sizeBytes;
}
export function candidateMatchSources(source: CandidateSource): MatchSource[] {
  const validated = candidateSourceSchema.parse(source);
  const sources: MatchSource[] = [];
  if (validated.candidateNotes.length >= 3)
    sources.push({ id: "notes", label: "Dopiski kandydata", text: validated.candidateNotes });
  if (validated.cvText) sources.push({ id: "cv", label: "CV", text: validated.cvText });
  return sources;
}
