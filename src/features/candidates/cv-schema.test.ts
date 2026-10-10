import { describe, expect, it } from "vitest";
import { candidateCvSchema } from "@/features/candidates/schema";

describe("candidateCvSchema", () => {
  it("accepts a small PDF", () => {
    expect(
      candidateCvSchema.safeParse({ cv: new File(["pdf"], "cv.pdf", { type: "application/pdf" }) })
        .success,
    ).toBe(true);
  });

  it("rejects other file types", () => {
    expect(
      candidateCvSchema.safeParse({ cv: new File(["text"], "cv.txt", { type: "text/plain" }) })
        .success,
    ).toBe(false);
  });
});
