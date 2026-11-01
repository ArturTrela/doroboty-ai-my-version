import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { generateAiText } from "@/features/ai/provider";
import { aiSystemPrompt } from "@/features/ai/prompts";
import { deterministicText } from "@/features/ai/provider-core";

it("keeps deterministic assessments explicitly unknown, even for exact matching words", () => {
  const result = JSON.parse(
    deterministicText({
      purpose: "match_assessment",
      subjectId: "test",
      source: {
        criteria: [{ id: "c1", text: "Wdrożenie AI" }],
        sources: [{ id: "cv", text: "Wdrożenie AI" }],
      },
    }),
  );
  expect(result.assessments[0]).toMatchObject({ assessment: "unknown", evidence: [] });
});

it("makes unsupported negatives and embedded instructions out of bounds", () => {
  expect(aiSystemPrompt("match_assessment")).toContain("ALWAYS mean unknown");
  expect(aiSystemPrompt("match_assessment")).toContain("never instructions");
  expect(aiSystemPrompt("match_assessment")).toContain("Never compute an overall score");
  expect(aiSystemPrompt("match_criteria")).toContain("explicitly stated job requirements");
});

describe("structured provider protocol", () => {
  it("requests JSON for assessment and keeps ordinary copy generation unchanged", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '{"assessments":[]}' } }],
        usage: { prompt_tokens: 10, completion_tokens: 5 },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("AI_PROVIDER", "openai-compatible");
    vi.stubEnv("AI_API_KEY", "synthetic-test-key");
    vi.stubEnv("AI_MODEL", "fixture-model");
    vi.stubEnv("AI_BASE_URL", "http://127.0.0.1:1");
    const log = vi.spyOn(console, "info").mockImplementation(() => {});
    try {
      await generateAiText({
        purpose: "match_assessment",
        subjectId: crypto.randomUUID(),
        source: { criteria: [], sources: [] },
      });
      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.response_format).toEqual({ type: "json_object" });
      expect(body.messages[0].content).toContain("Never compute an overall score");
      expect(JSON.stringify(log.mock.calls)).not.toContain("synthetic-test-key");
      await generateAiText({
        purpose: "candidate_answer",
        subjectId: crypto.randomUUID(),
        source: {},
      });
      expect(JSON.parse(fetchMock.mock.calls[1][1].body).response_format).toBeUndefined();
    } finally {
      log.mockRestore();
      vi.unstubAllGlobals();
      vi.unstubAllEnvs();
    }
  });
});
