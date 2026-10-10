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
});
