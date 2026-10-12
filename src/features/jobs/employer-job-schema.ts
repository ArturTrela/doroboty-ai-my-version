import { z } from "zod";
import {
  contractTypes,
  jobCategories,
  jobFunctions,
  remoteStatuses,
  seniorityLevels,
} from "@/features/jobs/types";

const optionalNumber = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().int().positive().max(10_000_000).optional(),
);

export const employerJobSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Użyj małych liter, cyfr i myślników."),
    title: z.string().trim().min(2).max(160),
    summary: z.string().trim().min(20, "Podsumowanie musi mieć co najmniej 20 znaków.").max(300),
    description: z.string().trim().min(50, "Opis musi mieć co najmniej 50 znaków.").max(30_000),
    category: z.enum(jobCategories),
    function: z.enum(jobFunctions),
    remoteStatus: z.enum(remoteStatuses),
    locations: z
      .string()
      .transform((value) =>
        value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      )
      .pipe(z.array(z.string().min(2).max(120)).min(1, "Podaj co najmniej jedną lokalizację.")),
    seniority: z.enum(seniorityLevels),
    contractType: z.enum(contractTypes),
    salaryMin: optionalNumber,
    salaryMax: optionalNumber,
    salaryCurrency: z.enum(["PLN", "EUR"]).optional(),
    salaryPeriod: z.enum(["month", "year"]).optional(),
    salaryKind: z.enum(["gross", "net"]).optional(),
    expiryAt: z.union([z.literal(""), z.iso.date()]).optional(),
    sourceBrief: z
      .string()
      .trim()
      .max(10_000)
      .transform((value) => value || undefined)
      .optional(),
    decisionCriteria: z
      .string()
      .transform((value) =>
        value
          .split("\n")
          .map((item) => item.replace(/^[-•]\s*/, "").trim())
          .filter(Boolean),
      )
      .pipe(z.array(z.string().min(3).max(300)).max(12))
      .optional(),
  })
  .superRefine((value, context) => {
    const hasSalary = value.salaryMin !== undefined || value.salaryMax !== undefined;
    if (hasSalary && value.salaryMin !== undefined && value.salaryMax !== undefined) {
      if (value.salaryMin > value.salaryMax) {
        context.addIssue({
          code: "custom",
          path: ["salaryMax"],
          message: "Maksimum musi być większe od minimum.",
        });
      }
    } else if (hasSalary) {
      context.addIssue({ code: "custom", path: ["salaryMin"], message: "Podaj pełne widełki." });
    }
    if (value.sourceBrief && value.sourceBrief.length < 40) {
      context.addIssue({
        code: "custom",
        path: ["sourceBrief"],
        message: "Brief powinien mieć co najmniej 40 znaków.",
      });
    }
    if (value.sourceBrief && !value.decisionCriteria?.length) {
      context.addIssue({
        code: "custom",
        path: ["decisionCriteria"],
        message: "Do briefu dodaj co najmniej jedno kryterium decyzji.",
      });
    }
    if (!value.sourceBrief && value.decisionCriteria?.length) {
      context.addIssue({
        code: "custom",
        path: ["sourceBrief"],
        message: "Dodaj kontekst briefu albo usuń kryteria.",
      });
    }
  });

export type EmployerJobInput = z.infer<typeof employerJobSchema>;
