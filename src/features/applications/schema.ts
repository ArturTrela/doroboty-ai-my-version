import { z } from "zod";

export const applicationSchema = z
  .object({
    jobId: z.uuid(),
    variant: z.enum(["long_form", "one_click"]),
    answer: z.string().trim().min(40, "Napisz przynajmniej 40 znaków.").max(5000),
    aiGenerationId: z.union([z.literal(""), z.uuid()]).optional(),
    confirmed: z.literal("yes", { error: "Potwierdź, że chcesz wysłać aplikację." }),
    selectedExperienceIds: z.array(z.uuid()).max(20),
    selectedWorkSampleIds: z.array(z.uuid()).max(20),
  })
  .refine((value) => value.selectedExperienceIds.length + value.selectedWorkSampleIds.length > 0, {
    message: "Wybierz przynajmniej jedno doświadczenie lub próbkę pracy.",
    path: ["selectedExperienceIds"],
  });

export const applicationDraftSchema = z.object({
  jobId: z.uuid(),
  answer: z.string().max(5000),
  selectedExperienceIds: z.array(z.uuid()).max(20),
  selectedWorkSampleIds: z.array(z.uuid()).max(20),
  aiGenerationId: z.union([z.literal(""), z.uuid()]).optional(),
  currentStep: z.number().int().min(1).max(4),
});

export const employerStageSchema = z.object({
  applicationId: z.uuid(),
  stage: z.enum([
    "reviewed",
    "interview_invited",
    "first_conversation_held",
    "continued",
    "rejected",
    "hired",
  ]),
  note: z.string().trim().max(2000).optional(),
});
