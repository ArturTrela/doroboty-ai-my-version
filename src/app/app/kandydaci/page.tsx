import Link from "next/link";
import { ArrowRight, UserRoundSearch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MatchScore, savedCandidateSummary } from "@/features/applications/match-score-view";
import { buttonVariants } from "@/components/ui/button";
import { FormSelect } from "@/components/ui/form-select";
import {
  applicationStatusClass,
  applicationStatusLabel,
} from "@/features/applications/presentation";
import { requireProfile } from "@/features/auth/session";
import { getSupabaseConfig } from "@/lib/env";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statuses = ["submitted", "in_review", "interview", "continued", "rejected", "hired"] as const;

export default async function EmployerInboxPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; job?: string }>;
}) {
  if (!getSupabaseConfig().configured) return null;
  const { client } = await requireProfile(["employer", "operator"]);
  const params = await searchParams;
  const status = statuses.includes(params.status as (typeof statuses)[number])
    ? params.status
    : undefined;

  const { data: jobs, error: jobsError } = await client
    .from("jobs")
    .select("id, title")
    .order("title");
  if (jobsError) throw new Error("Nie udało się wczytać ofert do filtra.");
  const selectedJob = (jobs ?? []).some((job) => job.id === params.job) ? params.job : undefined;

  let query = client
    .from("applications")
    .select(
      "id, status, variant, answer, source_snapshot, submitted_at, job_id, scores:fit_scores(id, score, version, calculated_at, status, components, attempts, processing_started_at), job:jobs(title, slug), events:application_stage_events(stage, occurred_at, note)",
    )
    .order("submitted_at", { ascending: false });
  if (status) query = query.eq("status", status);
  if (selectedJob) query = query.eq("job_id", selectedJob);
  const { data, error } = await query;
  if (error) throw new Error("Nie udało się wczytać aplikacji pracodawcy.");

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Kandydaci</h1>
        </div>
      </div>
      <form className="mb-6 grid gap-3 rounded-xl bg-secondary p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
        <label className="font-ui text-sm font-medium">
          Ogłoszenie
          <FormSelect
            className="mt-1"
            name="job"
            ariaLabel="Filtruj po ogłoszeniu"
            defaultValue={selectedJob ?? ""}
            options={[
              { value: "", label: "Wszystkie ogłoszenia" },
              ...(jobs ?? []).map((job) => ({ value: job.id, label: job.title })),
            ]}
          />
        </label>
        <label className="font-ui text-sm font-medium">
          Status
          <FormSelect
            className="mt-1"
            name="status"
            ariaLabel="Filtruj po statusie"
            defaultValue={status ?? ""}
            options={[
              { value: "", label: "Wszystkie statusy" },
              ...statuses.map((item) => ({ value: item, label: applicationStatusLabel(item) })),
            ]}
          />
        </label>
        <button className={buttonVariants({ size: "sm" })} type="submit">
          Filtruj kandydatów
        </button>
      </form>
      {(data ?? []).length === 0 ? (
        <div className="empty-state">
          <UserRoundSearch className="mx-auto mb-3 size-8 text-muted-foreground" />
          <h2>Brak aplikacji dla tych filtrów</h2>
          <p>Zmień ogłoszenie albo status, aby zobaczyć pozostałych kandydatów.</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {(data ?? []).map((application) => {
            const job = Array.isArray(application.job) ? application.job[0] : application.job;
            const snapshot = application.source_snapshot as {
              profile?: { displayName?: string; headline?: string };
              experiences?: {
                title: string;
                company_name: string;
                measurable_outcome?: string;
              }[];
            };
            return (
              <article
                key={application.id}
                className="rounded-xl bg-card p-6 shadow-[var(--gui-shadow-m)]"
              >
                <div className="grid items-start gap-[var(--gui-space-m)] sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="min-w-0">
                    <h2 className="font-ui text-lg font-semibold">
                      <Link className="hover:underline" href={`/app/kandydaci/${application.id}`}>
                        {snapshot.profile?.displayName || "Kandydat / kandydatka"}
                      </Link>
                    </h2>
                    <p className="mt-[var(--gui-space-xxs)] text-sm text-muted-foreground">
                      {snapshot.profile?.headline || job?.title}
                    </p>
                    {!selectedJob && snapshot.profile?.headline !== job?.title && (
                      <p className="mt-[var(--gui-space-xxs)] text-xs text-muted-foreground">
                        {job?.title}
                      </p>
                    )}
                  </div>
                  <div className="w-fit min-w-40">
                    <MatchScore compact scores={application.scores} />
                  </div>
                </div>
                <p className="mt-[var(--gui-space-m)] text-xs font-medium text-muted-foreground">
                  Podsumowanie AI
                </p>
                <p className="mt-[var(--gui-space-xs)] line-clamp-3 max-w-3xl text-sm leading-relaxed">
                  {savedCandidateSummary(application.scores) ??
                    "Podsumowanie nie jest jeszcze dostępne."}
                </p>
                <div className="mt-[var(--gui-space-m)] flex flex-wrap items-center justify-between gap-[var(--gui-space-s)]">
                  <Badge className={applicationStatusClass(application.status)}>
                    {applicationStatusLabel(application.status)}
                  </Badge>
                  <Link
                    className={cn("text-link text-sm")}
                    href={`/app/kandydaci/${application.id}`}
                  >
                    Profil i CV <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
