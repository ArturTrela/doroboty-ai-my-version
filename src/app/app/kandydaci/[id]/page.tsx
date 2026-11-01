import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, Download, FileText, MapPin, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MatchScore } from "@/features/applications/match-score-view";
import { buttonVariants } from "@/components/ui/button";
import { CandidateStageActions } from "@/features/applications/candidate-stage-actions";
import {
  applicationStageLabel,
  applicationStatusClass,
  applicationStatusLabel,
} from "@/features/applications/presentation";
import { requireProfile } from "@/features/auth/session";
import { getSupabaseConfig } from "@/lib/env";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type CandidateSnapshot = {
  cv?: { fileName: string; storagePath: string; uploadedAt: string; sizeBytes?: number };
  profile?: {
    displayName?: string;
    headline?: string;
    bio?: string;
    city?: string;
    experience_years?: number;
    language_background?: string;
  };
  experiences?: {
    id?: string;
    title: string;
    company_name: string;
    description?: string;
    measurable_outcome?: string;
  }[];
  workSamples?: {
    id?: string;
    title: string;
    url?: string;
    context: string;
    outcome: string;
  }[];
};

export default async function CandidatePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!getSupabaseConfig().configured) return null;
  const { client } = await requireProfile(["employer", "operator"]);
  const { id } = await params;
  const { data: application, error } = await client
    .from("applications")
    .select(
      "id, candidate_id, status, variant, answer, source_snapshot, submitted_at, scores:fit_scores(id, score, version, calculated_at, status, components, attempts, processing_started_at), job:jobs(id, title, slug), events:application_stage_events(id, stage, occurred_at, note)",
    )
    .eq("id", id)
    .maybeSingle();
  if (error || !application) notFound();

  const snapshot = application.source_snapshot as CandidateSnapshot;
  const job = Array.isArray(application.job) ? application.job[0] : application.job;
  const events = [...(application.events ?? [])].sort(
    (left, right) => new Date(left.occurred_at).getTime() - new Date(right.occurred_at).getTime(),
  );
  const document = snapshot.cv
    ? {
        file_name: snapshot.cv.fileName,
        storage_path: snapshot.cv.storagePath,
        size_bytes: snapshot.cv.sizeBytes ?? 0,
        uploaded_at: snapshot.cv.uploadedAt,
      }
    : null;
  const signedUrl = document
    ? (await client.storage.from("candidate-cv").createSignedUrl(document.storage_path, 600)).data
        ?.signedUrl
    : undefined;

  return (
    <div>
      <Link
        href={job?.id ? `/app/kandydaci?job=${job.id}` : "/app/kandydaci"}
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <ArrowLeft className="size-4" /> Wróć do kandydatów
      </Link>
      <div className="page-heading mt-5">
        <div>
          <p className="mb-2 flex items-center gap-2 font-ui text-sm text-muted-foreground">
            <BriefcaseBusiness className="size-4" /> {job?.title ?? "Oferta"}
          </p>
          <h1>{snapshot.profile?.displayName || "Kandydat / kandydatka"}</h1>
          <p>{snapshot.profile?.headline || "Profil kandydata"}</p>
        </div>
        <Badge className={applicationStatusClass(application.status)}>
          {applicationStatusLabel(application.status)}
        </Badge>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <div className="grid h-fit min-w-0 gap-6">
          <section className="rounded-xl bg-card p-6 shadow-[var(--gui-shadow-m)]">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {snapshot.profile?.city ? (
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" /> {snapshot.profile.city}
                </span>
              ) : null}
              {(snapshot.profile?.experience_years ?? 0) > 0 ? (
                <span className="flex items-center gap-1.5">
                  <UserRound className="size-4" /> {snapshot.profile?.experience_years} lat
                  doświadczenia
                </span>
              ) : null}
            </div>
            {snapshot.profile?.bio ? <p className="mt-4 text-lg">{snapshot.profile.bio}</p> : null}
            <div className="mt-6 pt-5 shadow-[var(--gui-divider-top-shadow)]">
              <h2 className="text-xl">Odpowiedź na ofertę</h2>
              <p className="mt-3 whitespace-pre-wrap text-lg leading-relaxed">
                {application.answer}
              </p>
            </div>
          </section>

          <MatchScore scores={application.scores} applicationId={application.id} />

          {Boolean(snapshot.experiences?.length) && (
            <section>
              <h2>Doświadczenie</h2>
              <div className="mt-4 grid gap-3">
                {(snapshot.experiences ?? []).map((experience, index) => (
                  <article key={experience.id ?? index} className="rounded-xl bg-card p-5">
                    <h3 className="font-ui font-semibold">
                      {experience.title} · {experience.company_name}
                    </h3>
                    {experience.description ? (
                      <p className="mt-2">{experience.description}</p>
                    ) : null}
                    {experience.measurable_outcome ? (
                      <p className="mt-3 rounded-lg bg-secondary p-3">
                        <strong>Efekt:</strong> {experience.measurable_outcome}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          )}

          {(snapshot.workSamples ?? []).length ? (
            <section>
              <h2>Próbki pracy</h2>
              <div className="mt-4 grid gap-3">
                {(snapshot.workSamples ?? []).map((sample, index) => (
                  <article key={sample.id ?? index} className="rounded-xl bg-card p-5">
                    <h3 className="font-ui font-semibold">{sample.title}</h3>
                    <p className="mt-2">{sample.context}</p>
                    <p className="mt-3 rounded-lg bg-secondary p-3">
                      <strong>Wynik:</strong> {sample.outcome}
                    </p>
                    {sample.url ? (
                      <a className="text-link mt-3 inline-block" href={sample.url} target="_blank">
                        Otwórz materiał
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside aria-label="CV i historia procesu" className="grid h-fit gap-6">
          <section className="rounded-xl bg-card p-5 shadow-[var(--gui-shadow-m)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl">CV</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Prywatny dokument udostępniony z aplikacją.
                </p>
              </div>
              <FileText className="size-5" />
            </div>
            {signedUrl && document ? (
              <>
                <div className="mt-4 grid min-h-48 place-items-center rounded-lg bg-secondary p-6 text-center">
                  <div>
                    <FileText className="mx-auto size-10 text-muted-foreground" />
                    <strong className="mt-4 block font-ui text-sm">{document.file_name}</strong>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      PDF · {(document.size_bytes / 1024).toFixed(0)} KB · dodano{" "}
                      {new Intl.DateTimeFormat("pl-PL").format(new Date(document.uploaded_at))}
                    </span>
                  </div>
                </div>
                <a
                  className={cn("mt-4 w-full", buttonVariants({ variant: "outline", size: "sm" }))}
                  href={signedUrl}
                  target="_blank"
                >
                  <Download className="size-4" /> Otwórz CV w nowej karcie
                </a>
              </>
            ) : (
              <div className="empty-state mt-4 py-8">
                <p>Ta osoba nie dołączyła jeszcze CV.</p>
              </div>
            )}
          </section>

          <section className="rounded-xl bg-card p-5">
            <h2 className="text-xl">Historia procesu</h2>
            <ol className="mt-4 grid gap-3">
              {events.map((event) => (
                <li key={event.id} className="pl-4 shadow-[var(--gui-accent-bar-shadow)]">
                  <strong className="font-ui text-sm">{applicationStageLabel(event.stage)}</strong>
                  <p className="text-sm text-muted-foreground">
                    {new Intl.DateTimeFormat("pl-PL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(event.occurred_at))}
                  </p>
                  {event.note ? <p className="mt-1 text-sm">{event.note}</p> : null}
                </li>
              ))}
            </ol>
            <CandidateStageActions
              applicationId={application.id}
              status={application.status}
              lastStage={events.at(-1)?.stage}
            />
          </section>
        </aside>
      </div>
    </div>
  );
}
