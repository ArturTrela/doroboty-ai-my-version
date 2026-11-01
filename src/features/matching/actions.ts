"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { requireProfile } from "@/features/auth/session";
import { generateAiText } from "@/features/ai/provider";
import { criteriaSchema } from "./schema";
import { parseCriteria } from "./scoring";
import { assessApplication } from "./assess.server";

const jobSnapshotSchema = z
  .object({ title: z.string(), summary: z.string(), description: z.string() })
  .strict();
export async function suggestMatchCriteria(input: unknown) {
  const jobId = z.uuid().parse(input);
  const { client, user, profile } = await requireProfile(["employer", "operator"]);
  const { data: job, error } = await client
    .from("jobs")
    .select("title, summary, description, company_id")
    .eq("id", jobId)
    .single();
  if (error || !job) return { ok: false as const, message: "Nie masz dostępu do tej oferty." };
  const { data: organization } = await client
    .from("organizations")
    .select("id")
    .eq("company_id", job.company_id)
    .single();
  const { data: membership } = organization
    ? await client
        .from("organization_memberships")
        .select("user_id")
        .eq("organization_id", organization.id)
        .eq("user_id", user.id)
        .maybeSingle()
    : { data: null };
  if (profile.role !== "operator" && !membership)
    return { ok: false as const, message: "Nie masz dostępu do tej oferty." };
  const jobSnapshot = { title: job.title, summary: job.summary, description: job.description };
  try {
    const result = await generateAiText({
      purpose: "match_criteria",
      subjectId: user.id,
      source: jobSnapshot,
    });
    return {
      ok: true as const,
      criteria: parseCriteria(result.text, `${job.title} ${job.summary} ${job.description}`),
      jobSnapshot,
      fixture: result.provider === "deterministic",
    };
  } catch {
    return {
      ok: false as const,
      message: "Nie udało się przygotować kryteriów. Spróbuj ponownie.",
    };
  }
}
export async function approveMatchCriteria(input: unknown) {
  const parsed = z
    .object({ jobId: z.uuid(), jobSnapshot: jobSnapshotSchema, criteria: criteriaSchema })
    .safeParse(input);
  if (!parsed.success)
    return { ok: false, message: "Sprawdź kryteria, ich wagi i wymagania konieczne." };
  const { client } = await requireProfile(["employer", "operator"]);
  const { error } = await client.rpc("approve_match_rubric", {
    target_job_id: parsed.data.jobId,
    expected_job: parsed.data.jobSnapshot,
    target_criteria: parsed.data.criteria,
  });
  if (error)
    return {
      ok: false,
      message: "Oferta zmieniła się lub kryteria są nieprawidłowe. Wygeneruj je ponownie.",
    };
  revalidatePath(`/app/oferty/${parsed.data.jobId}`);
  return { ok: true, message: "Kryteria zatwierdzone. Będą stosowane do nowych aplikacji." };
}
export async function retryMatchAssessment(input: unknown) {
  const applicationId = z.uuid().parse(input);
  const { client, user } = await requireProfile(["candidate"]);
  // The database lease also verifies ownership, terminal status and the three-attempt limit.
  after(() => assessApplication(client, user.id, applicationId));
}
