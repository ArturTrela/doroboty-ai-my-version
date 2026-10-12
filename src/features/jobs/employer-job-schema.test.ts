import { describe, expect, it } from "vitest";
import { employerJobSchema } from "@/features/jobs/employer-job-schema";

const valid = {
  slug: "ai-product-manager",
  title: "AI Product Manager",
  summary: "Prowadź wdrożenia AI od odkrycia do mierzalnego wyniku.",
  description:
    "W tej roli poprowadzisz discovery, eksperymenty oraz bezpieczne wdrożenie produktu AI.",
  category: "lead",
  function: "product",
  remoteStatus: "hybrid",
  locations: "Warszawa, Kraków",
  seniority: "senior",
  contractType: "employment",
  salaryMin: "18000",
  salaryMax: "24000",
  salaryCurrency: "PLN",
  salaryPeriod: "month",
  salaryKind: "gross",
  expiryAt: "",
  sourceBrief: "",
  decisionCriteria: "",
};

describe("employerJobSchema", () => {
  it("normalizes comma-separated locations", () => {
    const result = employerJobSchema.parse(valid);
    expect(result.locations).toEqual(["Warszawa", "Kraków"]);
  });

  it("rejects incomplete salary ranges", () => {
    const result = employerJobSchema.safeParse({ ...valid, salaryMax: "" });
    expect(result.success).toBe(false);
  });

  it("accepts a source brief and normalizes decision criteria", () => {
    const result = employerJobSchema.parse({
      ...valid,
      sourceBrief:
        "Nowa osoba ma znaleźć wartościowy proces i dowieźć bezpieczne wdrożenie produkcyjne.",
      decisionCriteria: "- Trafność problemu\n- Jakość decyzji\n- Wynik wdrożenia",
    });
    expect(result.decisionCriteria).toEqual([
      "Trafność problemu",
      "Jakość decyzji",
      "Wynik wdrożenia",
    ]);
  });
});
