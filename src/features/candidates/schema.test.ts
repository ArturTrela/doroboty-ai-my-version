import { describe, expect, it } from "vitest";
import { candidateProfileSchema, workSampleSchema } from "@/features/candidates/schema";

describe("candidate evidence schemas", () => {
  it("accepts a complete candidate profile", () => {
    expect(
      candidateProfileSchema.safeParse({
        firstName: "Anna",
        lastName: "Kowalska",
        headline: "Senior Product Manager",
        bio: "Prowadzę produkty B2B od discovery do mierzalnego wdrożenia.",
        city: "Warszawa",
        experienceYears: "8",
        preferredFunctions: ["product"],
        preferredCategories: ["build"],
        preferredSeniority: ["senior"],
        preferredLocations: ["Warszawa"],
        preferredRemote: ["hybrid"],
        preferredContracts: ["employment"],
        salaryExpectationMin: "18000",
        salaryExpectationCurrency: "PLN",
      }).success,
    ).toBe(true);
  });

  it("rejects unsafe work sample links", () => {
    expect(
      workSampleSchema.safeParse({
        title: "Automatyzacja onboardingu",
        url: "http://example.com",
        context: "Zespół tracił kilka godzin tygodniowo na ręczną pracę.",
        outcome: "Czas spadł o 35 procent.",
      }).success,
    ).toBe(false);
  });
});
