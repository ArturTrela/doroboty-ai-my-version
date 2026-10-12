import { describe, expect, it } from "vitest";
import { containsPii, parseAnalyticsEvent } from "@/features/analytics/contract";

const id = "10000000-0000-4000-8000-000000000001";

describe("analytics contract", () => {
  it("accepts only the typed event properties", () => {
    expect(
      parseAnalyticsEvent({ event: "job_viewed", properties: { jobId: id, category: "build" } }),
    ).not.toBeNull();
    expect(
      parseAnalyticsEvent({
        event: "job_viewed",
        properties: { jobId: id, category: "build", title: "secret" },
      }),
    ).toBeNull();
    expect(
      parseAnalyticsEvent({
        event: "application_draft_saved",
        properties: { jobId: id, step: 3 },
      }),
    ).not.toBeNull();
    expect(
      parseAnalyticsEvent({
        event: "candidate_profile_updated",
        properties: { section: "profile", email: "secret@example.com" },
      }),
    ).toBeNull();
  });

  it("rejects PII and query-bearing URLs recursively", () => {
    expect(containsPii({ email: "person@example.com" })).toBe(true);
    expect(containsPii({ nested: { value: "person@example.com" } })).toBe(true);
    expect(containsPii({ target: "https://example.com/path?token=secret" })).toBe(true);
    expect(containsPii({ jobId: id, category: "lead" })).toBe(false);
  });
});
