import { z } from "zod";

export const accountIdentitySchema = z.object({
  password: z.string().min(1, "Podaj aktualne hasło."),
  email: z.email("Podaj poprawny adres e-mail.").optional(),
});

export const candidateProfileSchema = z.object({
  firstName: z.string().trim().min(1, "Podaj imię.").max(80),
  lastName: z.string().trim().min(1, "Podaj nazwisko.").max(120),
  headline: z.string().trim().min(5, "Opisz krótko swoją rolę.").max(160),
  bio: z.string().trim().min(20, "Napisz przynajmniej kilka zdań.").max(3000),
  city: z.string().trim().min(2).max(120),
  experienceYears: z.coerce.number().int().min(0).max(60),
  languageBackground: z.string().trim().max(120).optional(),
  preferredFunctions: z
    .array(z.enum(["product", "engineering", "data", "design", "marketing", "operations"]))
    .max(6),
  preferredCategories: z.array(z.enum(["build", "apply", "lead"])).max(3),
  preferredSeniority: z.array(z.enum(["junior", "mid", "senior", "lead"])).max(4),
  preferredLocations: z.array(z.string().trim().min(2).max(120)).max(10),
  preferredRemote: z.array(z.enum(["onsite", "hybrid", "remote"])).max(3),
  preferredContracts: z.array(z.enum(["employment", "b2b", "mandate"])).max(3),
  salaryExpectationMin: z.union([
    z.literal(""),
    z.coerce.number().int().positive().max(10_000_000),
  ]),
  salaryExpectationCurrency: z.enum(["PLN", "EUR"]).optional(),
});

export const experienceSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]).optional(),
  title: z.string().trim().min(2).max(160),
  companyName: z.string().trim().min(2).max(160),
  description: z.string().trim().min(20).max(5000),
  measurableOutcome: z.string().trim().max(1000).optional(),
});

export const workSampleSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]).optional(),
  title: z.string().trim().min(2).max(160),
  url: z.union([z.literal(""), z.url().startsWith("https://")]),
  context: z.string().trim().min(20).max(3000),
  outcome: z.string().trim().min(10).max(2000),
});

export const candidateItemActionSchema = z.object({
  id: z.uuid(),
  kind: z.enum(["experience", "work_sample"]),
  direction: z.enum(["up", "down"]).optional(),
});

export const candidateCvSchema = z.object({
  cv: z
    .instanceof(File, { message: "Wybierz plik PDF." })
    .refine((file) => file.type === "application/pdf", "CV musi być plikiem PDF.")
    .refine(
      (file) => file.size > 0 && file.size <= 5 * 1024 * 1024,
      "CV może mieć maksymalnie 5 MB.",
    ),
});
