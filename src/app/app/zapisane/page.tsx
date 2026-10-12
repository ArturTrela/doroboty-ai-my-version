import Link from "next/link";
import { Bookmark } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { requireProfile } from "@/features/auth/session";
import { toggleSavedJob } from "@/features/jobs/candidate-job-actions";

export const dynamic = "force-dynamic";

export default async function SavedJobsPage() {
  const { client, user } = await requireProfile(["candidate"]);
  const { data, error } = await client
    .from("saved_jobs")
    .select(
      "job_id, saved_at, job:jobs(id, slug, title, summary, publication_status, company:companies(name))",
    )
    .eq("candidate_id", user.id)
    .order("saved_at", { ascending: false });
  if (error) throw new Error("Nie udało się wczytać zapisanych ofert.");
  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Zapisane oferty</h1>
          <p>Role, do których chcesz wrócić.</p>
        </div>
        <Link className={buttonVariants({ variant: "outline" })} href="/oferty">
          Przeglądaj oferty
        </Link>
      </div>
      {(data ?? []).length === 0 ? (
        <div className="empty-state">
          <Bookmark />
          <h2>Nie masz zapisanych ofert</h2>
          <p>Zapisz interesującą rolę na jej stronie.</p>
        </div>
      ) : (
        <div className="grid gap-[var(--gui-space-m)]">
          {(data ?? []).map((saved) => {
            const job = Array.isArray(saved.job) ? saved.job[0] : saved.job;
            const company = job && (Array.isArray(job.company) ? job.company[0] : job.company);
            const active = job?.publication_status === "published";
            return (
              <article key={saved.job_id} className="rounded-xl bg-card p-[var(--gui-space-m)]">
                <div className="flex flex-wrap items-start justify-between gap-[var(--gui-space-m)]">
                  <div>
                    <h2>{job?.title ?? "Oferta archiwalna"}</h2>
                    <p className="mt-[var(--gui-space-xxs)] text-sm text-muted-foreground">
                      {company?.name}
                      {!active && " · oferta nieaktywna"}
                    </p>
                  </div>
                  <form action={toggleSavedJob}>
                    <input type="hidden" name="jobId" value={saved.job_id} />
                    <input type="hidden" name="slug" value={job?.slug ?? ""} />
                    <button className={buttonVariants({ variant: "ghost", size: "sm" })}>
                      Usuń
                    </button>
                  </form>
                </div>
                {job?.summary && (
                  <p className="mt-[var(--gui-space-s)] text-muted-foreground">{job.summary}</p>
                )}
                {active && (
                  <Link className="text-link mt-[var(--gui-space-m)]" href={`/oferty/${job.slug}`}>
                    Zobacz ofertę
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
