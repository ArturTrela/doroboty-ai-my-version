import { z } from "zod";

export const experienceLevel = z.enum(["none", "theory", "contributed", "independent"]);
export type ExperienceLevel = z.infer<typeof experienceLevel>;
export const experienceLabels: Record<ExperienceLevel, string> = {
  none: "Brak doświadczenia",
  theory: "Teoria",
  contributed: "Współtworzenie",
  independent: "Samodzielnie",
};
export const skillLabels = {
  "product-delivery": "Prowadzenie produktu od discovery do wdrożenia",
  "product-research": "Badania użytkowników i analiza danych",
  "ai-pilot": "Pilotaż i pomiar efektów rozwiązań AI",
  evaluation: "Ewaluacja systemów AI",
  "python-api": "Python i integracja API",
  production: "Utrzymanie usług produkcyjnych",
  "design-research": "Badania i testy z użytkownikami",
  "design-prototyping": "Prototypowanie przepływów i interfejsów",
  "design-system": "Figma i praca z design systemem",
  "process-mapping": "Mapowanie procesów i wyjątków",
  "automation-tools": "Automatyzacja w n8n lub Make",
  webhooks: "Podstawy API, webhooków i JSON",
  "b2b-growth": "Growth i marketing produktu B2B",
  "growth-experiments": "Projektowanie eksperymentów growth",
  "funnel-analysis": "Analityka lejka i CRM",
  "ml-python-sql": "Python i SQL w projektach ML",
  "ml-validation": "Walidacja modeli i analiza błędów",
  "ml-monitoring": "Monitorowanie modeli po wdrożeniu",
} as const;
export const skillId = z.enum(Object.keys(skillLabels) as (keyof typeof skillLabels)[]);
export type SkillId = z.infer<typeof skillId>;
export const experienceChoices = z.partialRecord(skillId, experienceLevel);
export type ExperienceChoices = z.infer<typeof experienceChoices>;
export const experienceSnapshot = z
  .array(
    z.object({
      skill: skillId,
      expected: experienceLevel,
      declared: experienceLevel.optional(),
    }),
  )
  .max(3);

const offerSkills: Partial<Record<string, readonly SkillId[]>> = {
  "20000000-0000-4000-8000-000000000001": ["product-delivery", "product-research", "ai-pilot"],
  "20000000-0000-4000-8000-000000000002": ["evaluation", "python-api", "production"],
  "20000000-0000-4000-8000-000000000003": [
    "design-research",
    "design-prototyping",
    "design-system",
  ],
  "20000000-0000-4000-8000-000000000004": ["process-mapping", "automation-tools", "webhooks"],
  "20000000-0000-4000-8000-000000000005": ["b2b-growth", "growth-experiments", "funnel-analysis"],
  "20000000-0000-4000-8000-000000000006": ["ml-python-sql", "ml-validation", "ml-monitoring"],
};

export function skillsForOffer(offerId: string | undefined): readonly SkillId[] {
  return offerId ? (offerSkills[offerId] ?? []) : [];
}

export function expectedLevel(choices: ExperienceChoices | undefined, skill: SkillId) {
  return choices?.[skill] ?? "independent";
}
