import { restoreCandidateSources } from "@/features/applications/sources";
import type { Metadata } from "next";
import { JobDescription } from "@/features/jobs/job-description";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { ApplicationForm } from "@/features/applications/application-form";
import { requireProfile } from "@/features/auth/session";
import { getPublishedJob } from "@/features/jobs/queries";
import { buttonVariants } from "@/components/ui/button";
import {
  contractLabels,
  formatSalary,
  remoteLabels,
  seniorityLabels,
  isJobExpired,
} from "@/features/jobs/presentation";

export const metadata: Metadata = { title: "Aplikuj", robots: { index: false, follow: false } };

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const job = await getPublishedJob((await params).slug);
  if (!job) notFound();
  const { client, user } = await requireProfile(["candidate"]);
  if (isJobExpired(job.expiryAt))
    return (
      <section className="mx-auto max-w-2xl p-[var(--gui-space-l)]">
        <h1>Termin aplikowania minął</h1>
        <p className="mt-[var(--gui-space-m)]">
          Ta oferta nie przyjmuje już aplikacji. Zapisany szkic pozostaje na Twoim koncie.
        </p>
        <Link className={`${buttonVariants()} mt-[var(--gui-space-m)]`} href="/oferty">
          Zobacz aktualne oferty
        </Link>
      </section>
    );
  const [documentResult, draftResult, existingResult] = await Promise.all([
    client
      .from("candidate_documents")
      .select("file_name, storage_path, size_bytes, uploaded_at")
      .eq("user_id", user.id)
      .maybeSingle(),
    client
      .from("application_drafts")
      .select("*")
      .eq("candidate_id", user.id)
      .eq("job_id", job.id)
      .maybeSingle(),
    client
      .from("applications")
      .select("id")
      .eq("candidate_id", user.id)
      .eq("job_id", job.id)
      .maybeSingle(),
  ]);
  if (documentResult.error || draftResult.error || existingResult.error)
    throw new Error("Nie udało się wczytać aplikacji. Spróbuj ponownie.");
  const document = documentResult.data;
  const draft = draftResult.data;
  const existing = existingResult.data;
  if (existing) {
    return (
      <section className="mx-auto max-w-2xl px-[var(--gui-space-m)] py-[var(--gui-space-xxl)]">
        <div className="rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
          <h1>Aplikacja jest już wysłana</h1>
          <p className="mt-[var(--gui-space-s)] text-muted-foreground">
            Na tę ofertę można wysłać tylko jedną aplikację. Jej aktualny stan znajdziesz na koncie.
          </p>
          <Link
            className={`${buttonVariants()} mt-[var(--gui-space-l)]`}
            href={`/app/aplikacje/${existing.id}`}
          >
            Zobacz aplikację
          </Link>
        </div>
      </section>
    );
  }
  const variant = document ? "one_click" : "long_form";
  const cvDownloadUrl = document
    ? (await client.storage.from("candidate-cv").createSignedUrl(document.storage_path, 600)).data
        ?.signedUrl
    : undefined;
  let generationSource: unknown;
  if (draft?.ai_generation_id) {
    const { data: generation } = await client
      .from("ai_generations")
      .select("source_payload")
      .eq("id", draft.ai_generation_id)
      .eq("requested_by", user.id)
      .eq("job_id", job.id)
      .eq("purpose", "candidate_answer")
      .maybeSingle();
    generationSource = generation?.source_payload;
  }

  const currentCv = document
    ? {
        fileName: document.file_name,
        storagePath: document.storage_path,
        sizeBytes: document.size_bytes,
        uploadedAt: document.uploaded_at,
      }
    : null;
  const restoredSources = restoreCandidateSources(draft, generationSource, currentCv);
  return (
    <section className="mx-auto grid max-w-7xl gap-[var(--gui-space-l)] px-[var(--gui-space-m)] py-[var(--gui-space-xl)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-[var(--gui-space-l)] lg:py-[var(--gui-space-xxl)]">
      <aside className="h-fit lg:sticky lg:top-6">
        <h1 className="mt-[var(--gui-space-s)] text-3xl font-semibold tracking-[var(--gui-tracking-s)] sm:text-4xl">
          {job.title}
        </h1>
        <p className="mt-[var(--gui-space-s)] font-medium text-[var(--gui-link)]">
          {job.company.name}
        </p>
        <p className="mt-[var(--gui-space-m)] text-base text-muted-foreground">{job.summary}</p>
        <dl className="mt-[var(--gui-space-l)] grid gap-[var(--gui-space-s)] rounded-xl bg-card p-[var(--gui-space-m)] text-sm shadow-[var(--gui-shadow-m)] sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <dt className="font-medium">Miejsce i tryb</dt>
            <dd className="mt-[var(--gui-space-xxs)] flex gap-[var(--gui-space-xs)] text-muted-foreground">
              <MapPin className="size-4" /> {job.locations.join(" / ")} ·{" "}
              {remoteLabels[job.remoteStatus]}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Poziom i umowa</dt>
            <dd className="mt-[var(--gui-space-xxs)] flex gap-[var(--gui-space-xs)] text-muted-foreground">
              <BriefcaseBusiness className="size-4" /> {seniorityLabels[job.seniority]} ·{" "}
              {contractLabels[job.contract]}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Wynagrodzenie</dt>
            <dd className="mt-[var(--gui-space-xxs)] text-muted-foreground">{formatSalary(job)}</dd>
          </div>
        </dl>
        <details className="mt-[var(--gui-space-l)] rounded-xl bg-muted/50 p-[var(--gui-space-m)]">
          <summary className="cursor-pointer">
            <h2 className="inline">Pełny opis roli</h2>
          </summary>
          <div className="mt-[var(--gui-space-m)]">
            <JobDescription description={job.description} compact />
          </div>
        </details>
      </aside>
      <div>
        <ApplicationForm
          jobId={job.id}
          variant={variant}
          initialAnswer={restoredSources.answer}
          initialCandidateNotes={restoredSources.candidateNotes}
          initialSourceChanged={restoredSources.sourceChanged}
          initialGenerationId={draft?.ai_generation_id ?? undefined}
          cvFileName={document?.file_name}
          cvDownloadUrl={cvDownloadUrl}
          profileHref={`/app/profil?next=${encodeURIComponent(`/aplikuj/${job.slug}`)}#cv`}
          draftUpdatedAt={draft?.updated_at}
        />
      </div>
    </section>
  );
}
