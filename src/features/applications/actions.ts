"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  applicationDraftSchema,
  applicationSchema,
  employerStageSchema,
} from "@/features/applications/schema";
import { requireProfile } from "@/features/auth/session";
import { after } from "next/server";
import { readCvDocumentText } from "@/features/candidates/cv-text.server";
import {
  candidateSourceSchema,
  candidateMatchSources,
  sameCvSource,
  type CandidateSource,
} from "./sources";
import { assessApplication } from "@/features/matching/assess.server";
import { captureAnalytics } from "@/features/analytics/server";
import { z } from "zod";

export type ApplicationActionState = { ok: boolean; message: string };
export type EmployerStageActionState = { ok: boolean; message: string };

export async function submitApplication(
  _previous: ApplicationActionState,
  formData: FormData,
): Promise<ApplicationActionState> {
  const { client, user, profile } = await requireProfile(["candidate"]);
  const parsed = applicationSchema.safeParse({
    jobId: formData.get("jobId"),
    variant: formData.get("variant"),
    answer: formData.get("answer"),
    candidateNotes: formData.get("candidateNotes") || "",
    aiGenerationId: formData.get("aiGenerationId") || "",
    confirmed: formData.get("confirmed"),
    selectedExperienceIds: formData.getAll("selectedExperienceIds"),
    selectedWorkSampleIds: formData.getAll("selectedWorkSampleIds"),
  });
  if (!parsed.success)
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Sprawdź formularz." };

  const { data: job, error: jobError } = await client
    .from("jobs")
    .select(
      "id, company_id, publication_status, expiry_at, title, summary, description, locations, remote_status, seniority, contract_type, salary_min, salary_max, salary_currency, salary_period, salary_kind, company:companies(name)",
    )
    .eq("id", parsed.data.jobId)
    .eq("publication_status", "published")
    .single();
  if (jobError || !job) return { ok: false, message: "Ta oferta nie jest już dostępna." };
  if (job.expiry_at && new Date(job.expiry_at).getTime() <= Date.now())
    return { ok: false, message: "Termin aplikowania minął. Twój szkic pozostaje zapisany." };

  const [organizationResult, candidateResult, experiencesResult, samplesResult, documentResult] =
    await Promise.all([
      client.from("organizations").select("id").eq("company_id", job.company_id).single(),
      client.from("candidate_profiles").select("*").eq("user_id", user.id).single(),
      client
        .from("candidate_experiences")
        .select("id, title, company_name, description, measurable_outcome")
        .eq("user_id", user.id)
        .in(
          "id",
          parsed.data.selectedExperienceIds.length
            ? parsed.data.selectedExperienceIds
            : ["00000000-0000-0000-0000-000000000000"],
        ),
      client
        .from("candidate_work_samples")
        .select("id, title, url, context, outcome")
        .eq("user_id", user.id)
        .in(
          "id",
          parsed.data.selectedWorkSampleIds.length
            ? parsed.data.selectedWorkSampleIds
            : ["00000000-0000-0000-0000-000000000000"],
        ),
      client
        .from("candidate_documents")
        .select("file_name, storage_path, uploaded_at, size_bytes")
        .eq("user_id", user.id)
        .maybeSingle(),
    ]);
  if (organizationResult.error || !organizationResult.data)
    return { ok: false, message: "Oferta nie ma aktywnej organizacji." };
  if (candidateResult.error) return { ok: false, message: "Najpierw uzupełnij profil kandydata." };
  if (
    experiencesResult.error ||
    samplesResult.error ||
    documentResult.error ||
    (experiencesResult.data?.length ?? 0) !== parsed.data.selectedExperienceIds.length ||
    (samplesResult.data?.length ?? 0) !== parsed.data.selectedWorkSampleIds.length
  ) {
    return {
      ok: false,
      message: "Profil lub wybrane materiały zmieniły się. Sprawdź je i spróbuj ponownie.",
    };
  }

  let sharedSource: CandidateSource;
  if (parsed.data.aiGenerationId) {
    const { data: generation } = await client
      .from("ai_generations")
      .select("id, source_payload")
      .eq("id", parsed.data.aiGenerationId)
      .eq("requested_by", user.id)
      .eq("job_id", parsed.data.jobId)
      .eq("purpose", "candidate_answer")
      .eq("status", "succeeded")
      .maybeSingle();
    if (!generation)
      return {
        ok: false,
        message: "Szkic AI wygasł. Wygeneruj go ponownie lub wróć do swoich dopisków.",
      };
    const stored = candidateSourceSchema.safeParse(generation.source_payload);
    const document = documentResult.data;
    const currentCv = document
      ? {
          fileName: document.file_name,
          storagePath: document.storage_path,
          uploadedAt: document.uploaded_at,
          sizeBytes: document.size_bytes,
        }
      : null;
    if (
      !stored.success ||
      stored.data.candidateNotes !== parsed.data.candidateNotes ||
      !sameCvSource(stored.data.cvSnapshot, currentCv)
    )
      return {
        ok: false,
        message:
          "CV lub dopiski zmieniły się od przygotowania szkicu. Wygeneruj aplikację ponownie, aby użyć ich także w Match Score.",
      };
    sharedSource = stored.data;
  } else {
    const cv = await readCvDocumentText(client, user.id, documentResult.data);
    sharedSource = candidateSourceSchema.parse({
      candidateNotes: parsed.data.answer,
      cvText: cv.status === "available" ? cv.text : null,
      cvReadStatus: cv.status,
      cvSnapshot: cv.snapshot,
    });
  }

  const company = job.company as unknown as { name: string } | { name: string }[];
  const sourceSnapshot = {
    capturedAt: new Date().toISOString(),
    sourceVersion: "cv-and-notes-v2",
    sourceGenerationId: parsed.data.aiGenerationId || null,
    job: {
      id: job.id,
      title: job.title,
      summary: job.summary,
      description: job.description,
      company: Array.isArray(company) ? company[0]?.name : company?.name,
      locations: job.locations,
      remoteStatus: job.remote_status,
      seniority: job.seniority,
      contract: job.contract_type,
      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      salaryCurrency: job.salary_currency,
    },
    profile: {
      displayName: profile.display_name,
      headline: candidateResult.data.headline,
      bio: candidateResult.data.bio,
      city: candidateResult.data.city,
      experience_years: candidateResult.data.experience_years,
      language_background: candidateResult.data.language_background,
    },
    experiences: experiencesResult.data ?? [],
    workSamples: samplesResult.data ?? [],
    cv: sharedSource.cvSnapshot,
  };
  const evidenceIds = [
    ...(experiencesResult.data ?? []).map((item) => item.id),
    ...(samplesResult.data ?? []).map((item) => item.id),
  ];
  const matchSources = candidateMatchSources(sharedSource);
  const { data: applicationId, error } = await client.rpc("submit_hybrid_application", {
    target_job_id: parsed.data.jobId,
    target_variant: parsed.data.variant,
    final_answer: parsed.data.answer,
    target_generation_id: parsed.data.aiGenerationId || null,
    source_snapshot: sourceSnapshot,
    source_evidence_ids: evidenceIds,
    match_sources: matchSources,
  });
  if (error?.code === "23505") return { ok: false, message: "Masz już aplikację na tę ofertę." };
  if (error) return { ok: false, message: "Nie udało się wysłać aplikacji. Spróbuj ponownie." };
  after(() => assessApplication(client, user.id, applicationId));
  await client
    .from("application_drafts")
    .delete()
    .eq("candidate_id", user.id)
    .eq("job_id", parsed.data.jobId);
  await captureAnalytics(user.id, {
    event: "application_submitted",
    properties: {
      jobId: parsed.data.jobId,
      variant: parsed.data.variant,
      usedAi: Boolean(parsed.data.aiGenerationId),
    },
  });
  if (parsed.data.aiGenerationId)
    await captureAnalytics(user.id, {
      event: "ai_generation_approved",
      properties: { jobId: parsed.data.jobId, purpose: "candidate_answer" },
    });
  if (parsed.data.variant === "one_click") {
    await captureAnalytics(user.id, {
      event: "one_click_used",
      properties: { jobId: parsed.data.jobId },
    });
  }
  redirect(`/app/aplikacje/${applicationId}/wyslano`);
}

export async function saveApplicationDraft(input: unknown): Promise<{ ok: boolean }> {
  const parsed = applicationDraftSchema.safeParse(input);
  if (!parsed.success) return { ok: false };
  const { client, user } = await requireProfile(["candidate"]);
  const { data: submitted } = await client
    .from("applications")
    .select("id")
    .eq("candidate_id", user.id)
    .eq("job_id", parsed.data.jobId)
    .maybeSingle();
  if (submitted) return { ok: false };
  const { error } = await client.from("application_drafts").upsert(
    {
      candidate_id: user.id,
      job_id: parsed.data.jobId,
      answer: parsed.data.answer,
      experience_notes: parsed.data.candidateNotes.slice(0, 11000),
      selected_experience_ids: parsed.data.selectedExperienceIds,
      selected_work_sample_ids: parsed.data.selectedWorkSampleIds,
      ai_generation_id: parsed.data.aiGenerationId || null,
      current_step: parsed.data.currentStep,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "candidate_id,job_id" },
  );
  if (!error)
    await captureAnalytics(user.id, {
      event: "application_draft_saved",
      properties: { jobId: parsed.data.jobId, step: parsed.data.currentStep },
    });
  return { ok: !error };
}

export async function discardApplicationDraft(formData: FormData) {
  const { client, user } = await requireProfile(["candidate"]);
  const parsed = z.uuid().safeParse(formData.get("jobId"));
  if (!parsed.success) return;
  const jobId = parsed.data;
  await client.from("application_drafts").delete().eq("candidate_id", user.id).eq("job_id", jobId);
  revalidatePath("/aplikuj");
}

export async function withdrawApplication(formData: FormData) {
  const { client, user } = await requireProfile(["candidate"]);
  const parsed = z.uuid().safeParse(formData.get("applicationId"));
  if (!parsed.success) return;
  const applicationId = parsed.data;
  const { data: application } = await client
    .from("applications")
    .select("job_id")
    .eq("id", applicationId)
    .eq("candidate_id", user.id)
    .maybeSingle();
  const { error } = await client.rpc("withdraw_application", {
    target_application_id: applicationId,
  });
  if (error) throw new Error("Nie udało się wycofać aplikacji.");
  if (application)
    await captureAnalytics(user.id, {
      event: "application_withdrawn",
      properties: { jobId: application.job_id },
    });
  revalidatePath("/app/aplikacje");
  revalidatePath(`/app/aplikacje/${applicationId}`);
}

export async function recordEmployerStage(
  _previous: EmployerStageActionState,
  formData: FormData,
): Promise<EmployerStageActionState> {
  const { client } = await requireProfile(["employer", "operator"]);
  const parsed = employerStageSchema.safeParse({
    applicationId: formData.get("applicationId"),
    stage: formData.get("stage"),
    note: formData.get("note") || undefined,
  });
  if (!parsed.success) return { ok: false, message: "Nieprawidłowa zmiana etapu." };

  const { data: application, error: readError } = await client
    .from("applications")
    .select("id, organization_id, job_id")
    .eq("id", parsed.data.applicationId)
    .single();
  if (readError || !application) return { ok: false, message: "Brak dostępu do aplikacji." };

  const { error } = await client.rpc("record_application_stage", {
    target_application_id: application.id,
    next_stage: parsed.data.stage,
    event_note: parsed.data.note || null,
  });
  if (error) return { ok: false, message: "Nie udało się zapisać etapu aplikacji." };
  await captureAnalytics(application.organization_id, {
    event: "employer_reviewed",
    properties: { jobId: application.job_id, stage: parsed.data.stage },
  });
  revalidatePath("/app/kandydaci");
  revalidatePath(`/app/kandydaci/${application.id}`);
  return { ok: true, message: "Etap aplikacji został zapisany." };
}
