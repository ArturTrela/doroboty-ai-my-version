import { describe, expect, it } from "vitest";
import { safeReturnPath } from "./return-path";

describe("candidate return path", () => {
  it("preserves the intended application through onboarding", () => {
    expect(safeReturnPath("/app/onboarding?next=%2Faplikuj%2Fai-product-manager")).toBe(
      "/app/onboarding?next=%2Faplikuj%2Fai-product-manager",
    );
  });
  it("rejects external and backslash-normalized redirects", () => {
    for (const value of [
      "https://example.com",
      "//example.com",
      "/\\example.com",
      "/\n/evil",
      undefined,
    ]) {
      expect(safeReturnPath(value)).toBe("/app");
    }
  });
});
