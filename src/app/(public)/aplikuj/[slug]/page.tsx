import type { Metadata } from "next";
import { JobDescription } from "@/features/jobs/job-description";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, BriefcaseBusiness, MapPin } from "lucide-react";
import { ApplicationForm } from "@/features/applications/application-form";
import { requireProfile } from "@/features/auth/session";
import { getPublishedJob } from "@/features/jobs/queries";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { candidateWorkSamplesEnabled } from "@/features/candidates/features";
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
  const { client, user, profile } = await requireProfile(["candidate"]);
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
  const [
    { data: candidate },
    { data: experiences },
    { data: samples },
    { data: document },
    { data: draft },
    { data: existing },
  ] = await Promise.all([
    client
      .from("candidate_profiles")
      .select("headline, bio, city, experience_years, language_background")
      .eq("user_id", user.id)
      .single(),
    client
      .from("candidate_experiences")
      .select("id, title, company_name, description, measurable_outcome")
      .eq("user_id", user.id)
      .order("sort_order"),
    client
      .from("candidate_work_samples")
      .select("id, title, url, context, outcome")
      .eq("user_id", user.id)
      .order("sort_order"),
    client.from("candidate_documents").select("file_name").eq("user_id", user.id).maybeSingle(),
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
  const profileReady = Boolean(
    candidate?.headline && candidate?.bio && (experiences ?? []).length > 0,
  );
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
  const variant = profileReady ? "one_click" : "long_form";
  const suggestedAnswer =
    variant === "one_click"
      ? `${candidate?.headline}. ${candidate?.bio} Chcę podczas rozmowy pokazać konkretne decyzje i wyniki.`
      : "";
  const initialAnswer = draft?.answer ?? suggestedAnswer;
  const defaultExperienceIds = draft
    ? draft.selected_experience_ids
    : (experiences ?? []).slice(0, 1).map((item) => item.id);

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
          {job.verificationStatus === "employer_verified" && (
            <div>
              <dt className="sr-only">Weryfikacja</dt>
              <dd>
                <Badge variant="outline">
                  <BadgeCheck /> Zweryfikowana przez firmę
                </Badge>
              </dd>
            </div>
          )}
        </dl>
        <div className="mt-[var(--gui-space-l)] rounded-xl bg-muted/50 p-[var(--gui-space-m)]">
          <h2>Pełny opis roli</h2>
          <div className="mt-[var(--gui-space-m)]">
            <JobDescription description={job.description} compact />
          </div>
        </div>
        {!profileReady && (
          <div className="mt-[var(--gui-space-l)] rounded-lg bg-muted/40 p-[var(--gui-space-m)]">
            <strong className="font-medium">Uzupełnij profil</strong>
            <p className="mt-[var(--gui-space-xs)] text-sm text-muted-foreground">
              One-click będzie dostępny po dodaniu opisu i doświadczenia.
            </p>
            <Link
              className="mt-[var(--gui-space-s)] inline-block text-sm font-medium text-[var(--gui-link)] hover:underline"
              href="/app/profil"
            >
              Przejdź do profilu
            </Link>
          </div>
        )}
      </aside>
      <div>
        <ApplicationForm
          jobId={job.id}
          profileReady={profileReady}
          variant={variant}
          initialAnswer={initialAnswer}
          profileSummary={{
            displayName: profile.display_name ?? "",
            headline: candidate?.headline ?? "",
            bio: candidate?.bio ?? "",
            city: candidate?.city ?? "",
            years: candidate?.experience_years ?? 0,
            language: candidate?.language_background ?? "",
          }}
          experiences={(experiences ?? []).map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.company_name,
            description: item.description,
            outcome: item.measurable_outcome,
          }))}
          workSamples={(candidateWorkSamplesEnabled ? (samples ?? []) : []).map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.context,
            url: item.url,
            outcome: item.outcome,
          }))}
          initialExperienceIds={defaultExperienceIds}
          initialWorkSampleIds={
            candidateWorkSamplesEnabled ? (draft?.selected_work_sample_ids ?? []) : []
          }
          initialGenerationId={draft?.ai_generation_id ?? undefined}
          cvFileName={document?.file_name}
          draftUpdatedAt={draft?.updated_at}
        />
      </div>
    </section>
  );
}
