import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
vi.mock("server-only", () => ({}));
vi.mock("@/features/ai/provider", () => ({ generateAiText: vi.fn() }));
import { generateAiText } from "@/features/ai/provider";
import { assessApplication } from "./assess.server";
const criterion = {
  id: "c1",
  text: "Wdrożenie produkcyjne",
  weight: 3,
  required: true,
  sourceQuote: "Wdrożenie produkcyjne",
};
const claim = {
  scoreId: "score",
  runId: "lease",
  components: { rubricId: "rubric", criteria: [criterion] },
  sources: [{ id: "cv", label: "CV", text: "Wdrożyłem model do produkcji." }],
};
const output = {
  provider: "openai-compatible",
  model: "test-model",
  promptVersion: "evidence-hybrid-v1",
  latencyMs: 12,
  text: JSON.stringify({
    summary: {
      text: "Wdrożył model do produkcji i ma doświadczenie we wdrożeniach AI.",
      evidence: [{ sourceId: "cv", quote: "Wdrożyłem model do produkcji." }],
    },
    assessments: [
      {
        criterionId: "c1",
        assessment: "met",
        reason: "Opisano wdrożenie.",
        evidence: [{ sourceId: "cv", quote: "Wdrożyłem model do produkcji." }],
      },
    ],
  }),
};
beforeEach(() => vi.clearAllMocks());
function database(value: unknown = claim) {
  const rpc = vi
    .fn()
    .mockResolvedValueOnce({ data: value, error: null })
    .mockResolvedValue({ data: true, error: null });
  return { rpc, client: { rpc } as unknown as SupabaseClient };
}
describe("assessment worker", () => {
  it("sends only snapshotted sources, computes score and saves the claimed version", async () => {
    vi.mocked(generateAiText).mockResolvedValue(output);
    const { client, rpc } = database();
    await assessApplication(client, "candidate", "application");
    expect(generateAiText).toHaveBeenCalledWith({
      purpose: "match_assessment",
      subjectId: "candidate",
      source: { criteria: [criterion], sources: claim.sources },
    });
    expect(rpc).toHaveBeenLastCalledWith(
      "complete_match_assessment",
      expect.objectContaining({
        target_score_id: "score",
        target_run_id: "lease",
        result_status: "completed",
        result_score: 1,
        result_components: expect.objectContaining({
          rubricId: "rubric",
          provider: "openai-compatible",
          coverage: 1,
          candidateSummary: "Wdrożył model do produkcji i ma doświadczenie we wdrożeniach AI.",
        }),
      }),
    );
  });
  it("does not invoke AI when another worker owns the lease or the actor has no access", async () => {
    const { client, rpc } = database(null);
    await assessApplication(client, "candidate", "application");
    expect(generateAiText).not.toHaveBeenCalled();
    expect(rpc).toHaveBeenCalledTimes(1);
  });
  it.each(["outage", "invalid JSON", "fabricated evidence"])(
    "saves a recoverable failure for %s without falling back to keyword matching",
    async (mode) => {
      if (mode === "outage")
        vi.mocked(generateAiText).mockRejectedValue(new Error("secret upstream text"));
      else
        vi.mocked(generateAiText).mockResolvedValue({
          ...output,
          text:
            mode === "invalid JSON"
              ? "bad"
              : output.text.replace("Wdrożyłem model do produkcji.", "Invented experience"),
        });
      const { client, rpc } = database();
      await assessApplication(client, "candidate", "application");
      expect(rpc).toHaveBeenLastCalledWith(
        "complete_match_assessment",
        expect.objectContaining({
          result_status: "failed",
          result_score: null,
          result_components: expect.objectContaining({
            ...claim.components,
            reasonCode: "assessment_failed",
          }),
        }),
      );
    },
  );
});
