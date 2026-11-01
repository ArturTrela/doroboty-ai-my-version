import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { generateAiText } from "@/features/ai/provider";
import { criteriaSchema, matchSourcesSchema } from "./schema";
import { calculateMatch, parseAssessments, parseCandidateSummary } from "./scoring";

export async function assessApplication(
  client: SupabaseClient,
  userId: string,
  applicationId: string,
) {
  const { data: claim, error } = await client.rpc("claim_match_assessment", {
    target_application_id: applicationId,
    worker_secret: process.env.MATCH_SCORE_WORKER_SECRET ?? "",
  });
  if (error || !claim) return;
  const components = claim.components as Record<string, unknown>;
  let status: "completed" | "insufficient" | "failed" = "failed";
  let score: number | null = null;
  let details: Record<string, unknown> = { ...components, reasonCode: "assessment_failed" };
  try {
    const criteria = criteriaSchema.parse(components.criteria);
    const sources = matchSourcesSchema.parse(claim.sources);
    const result = await generateAiText({
      purpose: "match_assessment",
      subjectId: userId,
      source: { criteria, sources },
    });
    const assessments = parseAssessments(result.text, criteria, sources);
    const calculated = calculateMatch(criteria, assessments, sources);
    const summaryValue = (JSON.parse(result.text) as { summary?: unknown }).summary;
    const summary = summaryValue ? parseCandidateSummary(summaryValue, sources) : null;
    score = calculated.score;
    status = score === null ? "insufficient" : "completed";
    details = {
      ...components,
      ...calculated,
      candidateSummary: summary?.text ?? null,
      summaryEvidence: summary?.evidence ?? [],
      reasonCode: null,
      provider: result.provider,
      model: result.model,
      promptVersion: result.promptVersion,
      latencyMs: result.latencyMs,
      inputTokens: result.inputTokens ?? null,
      outputTokens: result.outputTokens ?? null,
      estimatedCostUsd: result.estimatedCostUsd ?? null,
    };
  } catch (error) {
    details.failureType =
      error instanceof Error && /^MATCH_[A-Z_]+$/.test(error.message)
        ? error.message
        : error instanceof Error
          ? error.name
          : "UNKNOWN";
    // No private source content or upstream error text enters logs or public summaries.
  }
  const { error: saveError } = await client.rpc("complete_match_assessment", {
    target_score_id: claim.scoreId,
    worker_secret: process.env.MATCH_SCORE_WORKER_SECRET ?? "",
    target_run_id: claim.runId,
    result_status: status,
    result_score: score,
    result_components: details,
  });
  if (saveError) console.error("MATCH_RESULT_SAVE_FAILED");
}
