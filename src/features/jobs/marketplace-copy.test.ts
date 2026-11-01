import { describe, expect, it } from "vitest";
import { marketplaceCopy } from "./marketplace-copy";
import { parseJobDescription } from "./description";

describe("varied synthetic descriptions", () => {
  const copies = Array.from({ length: 100 }, (_, i) =>
    marketplaceCopy({
      id: "a2000000-0000-4000-8000-" + String(i + 1).padStart(12, "0"),
      title: "AI Product Manager",
      category: "lead",
      function: "product",
      seniority: "senior",
      company_name: "Firma " + i,
      location: "Warszawa",
    }),
  );
  it("has five length/structure variants and natural recruiting copy", () => {
    expect(new Set(copies.map((copy) => copy.variant)).size).toBe(5);
    expect(new Set(copies.map((copy) => copy.description)).size).toBe(100);
    const lengths = copies.map((copy) => copy.description.length);
    expect(Math.max(...lengths)).toBeGreaterThan(Math.min(...lengths) * 3);
    expect(Math.max(...lengths)).toBeLessThan(30000);
    for (const copy of copies) {
      expect(copy.description).not.toMatch(/fikcyjn|syntetyczn|nie rzeczywista rekrutacja/i);
      expect(parseJobDescription(copy.description).some((block) => block.type === "heading")).toBe(
        true,
      );
      expect(copy.description).not.toContain("match_score");
    }
  });
  it("rejects original/unrelated records and unsupported taxonomy", () => {
    const job = {
      id: "a2000000-0000-4000-8000-000000000001",
      title: "Test",
      category: "build",
      function: "engineering",
      seniority: "mid",
      company_name: "Test",
      location: "Łódź",
    };
    expect(() => marketplaceCopy({ ...job, id: "00000000-0000-0000-0000-000000000001" })).toThrow();
    expect(() => marketplaceCopy({ ...job, function: "unrecognized" })).toThrow();
    expect(marketplaceCopy(job).description).toContain("własny komponent");
    expect(marketplaceCopy({ ...job, category: "apply" }).description).toContain(
      "jednego kroku pracy",
    );
  });
});
