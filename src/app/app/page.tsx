import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Inbox, Send, UserRound } from "lucide-react";
import { requireProfile } from "@/features/auth/session";
import { getSupabaseConfig } from "@/lib/env";

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

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Cześć{profile.display_name ? `, ${profile.display_name}` : ""}.</h1>
          <p>
            {isCandidate
              ? "Pokaż konkretną pracę i aplikuj świadomie."
              : "Podejmuj decyzje na podstawie źródłowego doświadczenia."}
          </p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <DashboardCard
          icon={isCandidate ? UserRound : Inbox}
          title={isCandidate ? "Uzupełnij profil" : "Przejrzyj kandydatów"}
          body={
            isCandidate
              ? "Dodaj doświadczenia i ich mierzalne efekty."
              : `${count ?? 0} aplikacji jest dostępnych w Twojej organizacji.`
          }
          href={isCandidate ? "/app/profil" : "/app/kandydaci"}
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
        <DashboardCard
          icon={BriefcaseBusiness}
          title="Rynek DoRoboty.ai"
          body="Przeglądaj aktywne role Build, Apply i Lead."
          href="/oferty"
        />
      </div>
      {profile.role === "operator" && (
        <section className="mt-8 rounded-[var(--gui-radius-m)] bg-secondary p-[var(--gui-space-l)]">
          <h2>Stan środowiska</h2>
          <ul className="mt-4 grid gap-2 font-ui text-sm sm:grid-cols-3">
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
