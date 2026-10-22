import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { MatchScore } from "@/features/applications/match-score-view";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { WithdrawApplicationForm } from "@/features/applications/withdraw-form";
import {
  applicationStageLabel,
  applicationStatusClass,
  applicationStatusDescription,
  applicationStatusLabel,
} from "@/features/applications/presentation";
import { requireProfile } from "@/features/auth/session";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Snapshot = {
  capturedAt?: string;
  job?: { title?: string; company?: string; summary?: string; description?: string };
  profile?: { displayName?: string; headline?: string; bio?: string; city?: string };
  experiences?: Array<{
    id: string;
    title: string;
    company_name: string;
    description: string;
    measurable_outcome?: string;
  }>;
  workSamples?: Array<{
    id: string;
    title: string;
    url?: string;
    context: string;
    outcome: string;
  }>;
  cv?: { fileName?: string; uploadedAt?: string; storagePath?: string } | null;
};

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { client, user } = await requireProfile(["candidate"]);
  const { id } = await params;
  const { data: application, error } = await client
    .from("applications")
    .select(
      "id, status, variant, answer, source_snapshot, submitted_at, updated_at, answer_generation_id, scores:fit_scores(id, score, version, calculated_at), job:jobs(title, slug, company:companies(name)), events:application_stage_events(id, stage, occurred_at)",
    )
    .eq("id", id)
    .eq("candidate_id", user.id)
    .maybeSingle();
  if (error || !application) notFound();
  const snapshot = application.source_snapshot as Snapshot;
  const job = Array.isArray(application.job) ? application.job[0] : application.job;
  const company = job && (Array.isArray(job.company) ? job.company[0] : job.company);
  const title = snapshot.job?.title ?? job?.title ?? "Oferta";
  const events = [...(application.events ?? [])].sort((a, b) =>
    a.occurred_at.localeCompare(b.occurred_at),
  );
  const canWithdraw = !["withdrawn", "rejected", "hired"].includes(application.status);
  const cvUrl = snapshot.cv?.storagePath
    ? (await client.storage.from("candidate-cv").createSignedUrl(snapshot.cv.storagePath, 600)).data
        ?.signedUrl
    : undefined;
  return (
    <div className="mx-auto max-w-4xl">
      <Link className="text-link mb-[var(--gui-space-m)]" href="/app/aplikacje">
        <ArrowLeft /> Wszystkie aplikacje
      </Link>
      <div className="page-heading">
        <div>
          <h1>{title}</h1>
          <p>
            {snapshot.job?.company ?? company?.name ?? "Firma"} · wysłano{" "}
            {new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(
              new Date(application.submitted_at),
            )}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-[var(--gui-space-s)] py-[var(--gui-space-xxs)] text-xs font-medium",
            applicationStatusClass(application.status),
          )}
        >
          {applicationStatusLabel(application.status)}
        </span>
      </div>
      <div className="mb-[var(--gui-space-l)]">
        <MatchScore scores={application.scores} />
      </div>
      <section className="rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
        <h2>Co dzieje się teraz</h2>
        <p className="mt-[var(--gui-space-xs)] text-muted-foreground">
          {applicationStatusDescription(application.status)}
        </p>
      </section>
      <section className="mt-[var(--gui-space-l)] rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
        <h2>Historia procesu</h2>
        <ol className="mt-[var(--gui-space-m)] grid gap-[var(--gui-space-m)]">
          {events.map((event, index) => (
            <li key={event.id} className="flex gap-[var(--gui-space-s)]">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs">
                {index + 1}
              </span>
              <div>
                <strong className="font-medium">{applicationStageLabel(event.stage)}</strong>
                <p className="mt-[var(--gui-space-xxs)] text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("pl-PL", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(event.occurred_at))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-[var(--gui-space-l)] rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
        <div className="flex flex-wrap items-center justify-between gap-[var(--gui-space-s)]">
          <h2>Wysłana odpowiedź</h2>
          <Badge variant="secondary">
            {application.answer_generation_id ? "Szkic AI po akceptacji" : "Tekst własny"}
          </Badge>
        </div>
        <p className="mt-[var(--gui-space-m)] whitespace-pre-wrap text-muted-foreground">
          {application.answer}
        </p>
      </section>
      <section className="mt-[var(--gui-space-l)] rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
        <h2>Profil przekazany pracodawcy</h2>
        <p className="mt-[var(--gui-space-s)] font-medium">{snapshot.profile?.displayName}</p>
        <p className="mt-[var(--gui-space-xs)]">
          {snapshot.profile?.headline} · {snapshot.profile?.city}
        </p>
        <p className="mt-[var(--gui-space-xs)] whitespace-pre-wrap text-muted-foreground">
          {snapshot.profile?.bio}
        </p>
      </section>
      <section className="mt-[var(--gui-space-l)] rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
        <h2>Przekazane doświadczenie</h2>
        <div className="mt-[var(--gui-space-m)] grid gap-[var(--gui-space-s)]">
          {(snapshot.experiences ?? []).map((item) => (
            <article key={item.id} className="rounded-lg bg-secondary p-[var(--gui-space-m)]">
              <h3 className="font-medium">
                {item.title} · {item.company_name}
              </h3>
              <p className="mt-[var(--gui-space-xs)] text-sm text-muted-foreground">
                {item.description}
              </p>
              {item.measurable_outcome && (
                <p className="mt-[var(--gui-space-xs)] text-sm">
                  <strong>Efekt:</strong> {item.measurable_outcome}
                </p>
              )}
            </article>
          ))}
          {(snapshot.workSamples ?? []).map((item) => (
            <article key={item.id} className="rounded-lg bg-secondary p-[var(--gui-space-m)]">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-[var(--gui-space-xs)] text-sm text-muted-foreground">
                {item.context}
              </p>
              <p className="mt-[var(--gui-space-xs)] text-sm">
                <strong>Wynik:</strong> {item.outcome}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-[var(--gui-space-l)] rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
        <h2 className="flex items-center gap-[var(--gui-space-xs)]">
          <FileText /> CV
        </h2>
        <p className="mt-[var(--gui-space-xs)] text-sm text-muted-foreground">
          {snapshot.cv?.fileName
            ? `${snapshot.cv.fileName} — wersja dostępna w chwili wysłania.`
            : "Do aplikacji nie zapisano informacji o CV."}
        </p>
        {cvUrl && (
          <a
            className="text-link mt-[var(--gui-space-s)]"
            href={cvUrl}
            target="_blank"
            rel="noreferrer"
          >
            Otwórz wysłane CV
          </a>
        )}
      </section>
      {snapshot.job?.description && (
        <details className="mt-[var(--gui-space-l)] rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
          <summary className="cursor-pointer font-medium">Oferta w chwili aplikowania</summary>
          <p className="mt-[var(--gui-space-s)]">{snapshot.job.summary}</p>
          <p className="mt-[var(--gui-space-s)] whitespace-pre-wrap text-muted-foreground">
            {snapshot.job.description}
          </p>
        </details>
      )}
      <div className="mt-[var(--gui-space-l)] flex flex-wrap gap-[var(--gui-space-s)]">
        {job?.slug && (
          <Link className={buttonVariants({ variant: "outline" })} href={`/oferty/${job.slug}`}>
            Zobacz ofertę
          </Link>
        )}
        {canWithdraw && <WithdrawApplicationForm applicationId={application.id} />}
      </div>
    </div>
  );
}
