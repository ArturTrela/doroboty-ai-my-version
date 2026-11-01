import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Heart,
  Inbox,
  Send,
  UserRound,
} from "lucide-react";
import { requireProfile } from "@/features/auth/session";
import { getSupabaseConfig } from "@/lib/env";
import { applicationStatusLabel } from "@/features/applications/presentation";

export const dynamic = "force-dynamic";

export default async function WorkspaceHome() {
  if (!getSupabaseConfig().configured) return null;
  const { client, user, profile } = await requireProfile();
  const isCandidate = profile.role === "candidate";
  const { count } = isCandidate
    ? await client
        .from("applications")
        .select("id", { count: "exact", head: true })
        .eq("candidate_id", user.id)
    : await client.from("applications").select("id", { count: "exact", head: true });
  const candidateData = isCandidate
    ? await Promise.all([
        client
          .from("candidate_profiles")
          .select("headline, bio, city")
          .eq("user_id", user.id)
          .single(),
        client
          .from("candidate_experiences")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        client
          .from("candidate_documents")
          .select("user_id", { count: "exact", head: true })
          .eq("user_id", user.id),
        client
          .from("saved_jobs")
          .select("job_id", { count: "exact", head: true })
          .eq("candidate_id", user.id),
        client
          .from("applications")
          .select("id, status, submitted_at, job:jobs(title)")
          .eq("candidate_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(3),
        client
          .from("application_drafts")
          .select("id, updated_at, job:jobs(title, slug)")
          .eq("candidate_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(5),
      ])
    : null;
  const hasCv = (candidateData?.[2].count ?? 0) > 0;

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Cześć{profile.display_name ? `, ${profile.display_name}` : ""}.</h1>
          <p>
            {isCandidate
              ? "Twoje CV, aplikacje i zapisane oferty."
              : "Podejmuj decyzje na podstawie źródłowego doświadczenia."}
          </p>
        </div>
      </div>
      <div className="grid gap-[var(--gui-space-m)] md:grid-cols-3">
        <DashboardCard
          icon={isCandidate ? UserRound : Inbox}
          title={isCandidate ? (hasCv ? "CV gotowe" : "Dodaj CV") : "Przejrzyj kandydatów"}
          body={
            isCandidate
              ? hasCv
                ? "CV z profilu dołączymy do Twojej aplikacji."
                : "Dodaj CV, z którego skorzystasz przy aplikowaniu."
              : `${count ?? 0} aplikacji jest dostępnych w Twojej organizacji.`
          }
          href={isCandidate ? "/app/profil#cv" : "/app/kandydaci"}
        />
        <DashboardCard
          icon={isCandidate ? Send : BriefcaseBusiness}
          title={isCandidate ? "Twoje aplikacje" : "Wyniki rozmów"}
          body={
            isCandidate
              ? `Masz ${count ?? 0} zapisanych aplikacji.`
              : "Zapisuj decyzję po pierwszej rozmowie i dalszy wynik."
          }
          href={isCandidate ? "/app/aplikacje" : "/app/kandydaci"}
        />
        {isCandidate && (
          <DashboardCard
            icon={Heart}
            title="Zapisane oferty"
            body={`Masz ${candidateData?.[3].count ?? 0} zapisanych ofert.`}
            href="/app/zapisane"
          />
        )}
        <DashboardCard
          icon={BriefcaseBusiness}
          title="Rynek DoRoboty.ai"
          body="Przeglądaj aktywne role Build, Apply i Lead."
          href="/oferty"
        />
      </div>
      {isCandidate && (
        <section className="mt-[var(--gui-space-l)] rounded-[var(--gui-radius-l)] bg-card p-[var(--gui-space-l)]">
          <h2>Szkice aplikacji</h2>
          {(candidateData?.[5].data ?? []).length ? (
            <ul className="mt-[var(--gui-space-m)] grid gap-[var(--gui-space-s)]">
              {(candidateData?.[5].data ?? []).map((draft) => {
                const job = Array.isArray(draft.job) ? draft.job[0] : draft.job;
                return (
                  <li key={draft.id}>
                    {job?.slug ? (
                      <Link className="text-link" href={`/aplikuj/${job.slug}`}>
                        Wznów aplikację: {job.title}
                      </Link>
                    ) : (
                      "Oferta nie jest już dostępna"
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-[var(--gui-space-m)] text-muted-foreground">
              Nie masz niedokończonych aplikacji.
            </p>
          )}
        </section>
      )}
      {isCandidate && (
        <section className="mt-[var(--gui-space-l)] rounded-[var(--gui-radius-l)] bg-card p-[var(--gui-space-l)]">
          <div className="flex items-center justify-between gap-[var(--gui-space-m)]">
            <h2>Ostatnia aktywność</h2>
            <Link className="text-link" href="/app/aplikacje">
              Wszystkie aplikacje
            </Link>
          </div>
          {(candidateData?.[4].data ?? []).length ? (
            <ul className="mt-[var(--gui-space-m)] grid gap-[var(--gui-space-s)]">
              {(candidateData?.[4].data ?? []).map((application) => {
                const job = Array.isArray(application.job) ? application.job[0] : application.job;
                return (
                  <li
                    key={application.id}
                    className="flex items-center gap-[var(--gui-space-s)] rounded-lg bg-secondary p-[var(--gui-space-s)]"
                  >
                    <CheckCircle2 className="size-5" />
                    <span>
                      <strong className="block">{job?.title ?? "Oferta"}</strong>
                      <span className="text-sm text-muted-foreground">
                        {applicationStatusLabel(application.status)}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-[var(--gui-space-m)] text-muted-foreground">
              Po wysłaniu pierwszej aplikacji zobaczysz tutaj jej status.
            </p>
          )}
        </section>
      )}
      {profile.role === "operator" && (
        <section className="mt-[var(--gui-space-l)] rounded-[var(--gui-radius-m)] bg-secondary p-[var(--gui-space-l)]">
          <h2>Stan środowiska</h2>
          <ul className="mt-[var(--gui-space-m)] grid gap-[var(--gui-space-xs)] font-ui text-sm sm:grid-cols-3">
            <li>
              <strong>Supabase:</strong> podłączony
            </li>
            <li>
              <strong>PostHog:</strong>{" "}
              {process.env.POSTHOG_PROJECT_KEY ? "podłączony" : "wyłączony — eventy są no-op"}
            </li>
            <li>
              <strong>AI:</strong>{" "}
              {process.env.AI_PROVIDER === "openai-compatible"
                ? process.env.AI_API_KEY
                  ? "dostawca zewnętrzny"
                  : "brak klucza — bezpieczny błąd"
                : "deterministyczny dostawca kursowy"}
            </li>
          </ul>
        </section>
      )}
    </div>
  );
}

function DashboardCard({
  icon: Icon,
  title,
  body,
  href,
}: {
  icon: typeof UserRound;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <article className="flex flex-col rounded-[var(--gui-radius-l)] bg-card p-[var(--gui-space-l)]">
      <span className="flex size-10 items-center justify-center rounded-[var(--gui-radius-s)] bg-secondary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-[var(--gui-space-m)]">{title}</h2>
      <p className="mt-[var(--gui-space-xs)] grow text-base text-muted-foreground">{body}</p>
      <Link className="text-link mt-[var(--gui-space-l)] font-medium" href={href}>
        Przejdź <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}
