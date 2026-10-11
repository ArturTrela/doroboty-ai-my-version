import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Bookmark, BriefcaseBusiness, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ClientAnalyticsEvent } from "@/features/analytics/client-event";
import { getPublishedJob } from "@/features/jobs/queries";
import {
  categoryLabels,
  contractLabels,
  formatSalary,
  jobJsonLd,
  remoteLabels,
  seniorityLabels,
} from "@/features/jobs/presentation";
import { cn } from "@/lib/utils";
import { getSupabaseConfig } from "@/lib/env";
import { serverClient } from "@/lib/supabase/server";
import { toggleSavedJob } from "@/features/jobs/candidate-job-actions";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getPublishedJob((await params).slug);
  if (!job) notFound();
  return {
    title: `${job.title} — ${job.company.name}`,
    description: job.summary,
    alternates: { canonical: `/oferty/${job.slug}` },
  };
}

export default async function JobPage({ params }: Props) {
  const job = await getPublishedJob((await params).slug);
  if (!job) notFound();
  const jsonLd = jobJsonLd(job);
  let role: "candidate" | "employer" | "operator" | null = null;
  let saved = false;
  if (getSupabaseConfig().configured) {
    const client = await serverClient();
    const {
      data: { user },
    } = await client.auth.getUser();
    if (user) {
      const [{ data: profile }, { data: savedJob }] = await Promise.all([
        client.from("profiles").select("role").eq("id", user.id).maybeSingle(),
        client
          .from("saved_jobs")
          .select("job_id")
          .eq("candidate_id", user.id)
          .eq("job_id", job.id)
          .maybeSingle(),
      ]);
      role = (profile?.role as typeof role) ?? null;
      saved = Boolean(savedJob);
    }
  }

  return (
    <article>
      <ClientAnalyticsEvent
        payload={{ event: "job_viewed", properties: { jobId: job.id, category: job.category } }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="bg-muted/30 shadow-[var(--gui-divider-bottom-shadow)]">
        <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            href="/oferty"
          >
            <ArrowLeft className="size-4" /> Wszystkie oferty
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            <Badge variant="secondary">{categoryLabels[job.category]}</Badge>
            {job.verificationStatus === "employer_verified" && (
              <Badge variant="outline">
                <BadgeCheck /> Zweryfikowana przez firmę
              </Badge>
            )}
          </div>
          <h1 className="mt-5 text-4xl leading-tight font-semibold tracking-[var(--gui-tracking-s)] sm:text-5xl">
            {job.title}
          </h1>
          <Link
            className="mt-4 inline-block text-lg font-medium text-[var(--gui-link)] hover:underline"
            href={`/firmy/${job.company.slug}`}
          >
            {job.company.name}
          </Link>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {job.summary}
          </p>
        </div>
      </header>
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 lg:grid-cols-[1fr_300px] lg:px-8 lg:py-16">
        <div>
          <h2 className="text-2xl font-semibold">O roli</h2>
          <div className="mt-5 max-w-2xl space-y-5 text-base leading-7 text-muted-foreground">
            {job.description.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 rounded-xl bg-muted/40 p-6">
            <h2 className="text-xl font-semibold">Chcesz aplikować?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {role === "candidate"
                ? "Przygotuj odpowiedź na podstawie swojego profilu i wybierz doświadczenia, które chcesz pokazać."
                : role
                  ? "Aplikacje są dostępne z konta kandydata."
                  : "Zaloguj się lub utwórz konto, a po autoryzacji wrócisz do tej oferty."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {role === "candidate" ? (
                <>
                  <Link href={`/aplikuj/${job.slug}`} className={buttonVariants({ size: "lg" })}>
                    Aplikuj
                  </Link>
                  <form action={toggleSavedJob}>
                    <input type="hidden" name="jobId" value={job.id} />
                    <input type="hidden" name="slug" value={job.slug} />
                    <button
                      type="submit"
                      className={buttonVariants({ variant: "outline", size: "lg" })}
                    >
                      <Bookmark className={cn("size-4", saved && "fill-current")} />
                      {saved ? "Usuń z zapisanych" : "Zapisz ofertę"}
                    </button>
                  </form>
                </>
              ) : !role ? (
                <>
                  <Link
                    href={`/auth/sign-in?next=${encodeURIComponent(`/aplikuj/${job.slug}`)}`}
                    className={buttonVariants({ size: "lg" })}
                  >
                    Zaloguj się i aplikuj
                  </Link>
                  <Link
                    href={`/auth/sign-up?next=${encodeURIComponent(`/aplikuj/${job.slug}`)}`}
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                  >
                    Załóż konto
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <aside className="h-fit rounded-xl bg-card p-5 shadow-[var(--gui-shadow-m)]">
          <h2 className="text-lg font-semibold">Konkrety</h2>
          <dl className="mt-5 grid gap-5 text-sm">
            <div>
              <dt className="font-medium">Miejsce</dt>
              <dd className="mt-1 flex gap-2 text-muted-foreground">
                <MapPin className="size-4 shrink-0" /> {job.locations.join(" / ")} ·{" "}
                {remoteLabels[job.remoteStatus]}
              </dd>
            </div>
            <div>
              <dt className="font-medium">Poziom</dt>
              <dd className="mt-1 text-muted-foreground">{seniorityLabels[job.seniority]}</dd>
            </div>
            <div>
              <dt className="font-medium">Umowa</dt>
              <dd className="mt-1 flex gap-2 text-muted-foreground">
                <BriefcaseBusiness className="size-4 shrink-0" /> {contractLabels[job.contract]}
              </dd>
            </div>
            <div>
              <dt className="font-medium">Wynagrodzenie</dt>
              <dd className="mt-1 text-muted-foreground">{formatSalary(job)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
