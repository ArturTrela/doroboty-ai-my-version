import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { requireProfile } from "@/features/auth/session";
import { safeReturnPath } from "@/features/auth/return-path";
import { ClientAnalyticsEvent } from "@/features/analytics/client-event";

export const dynamic = "force-dynamic";

export default async function CandidateOnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { client, user, profile } = await requireProfile(["candidate"]);
  const [{ data: candidate }, { count: experienceCount }, { data: document }] = await Promise.all([
    client.from("candidate_profiles").select("headline, bio, city").eq("user_id", user.id).single(),
    client
      .from("candidate_experiences")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
    client.from("candidate_documents").select("user_id").eq("user_id", user.id).maybeSingle(),
  ]);
  const query = await searchParams;
  const requested = query.next ?? "/app";
  const next = safeReturnPath(requested);
  const steps = [
    {
      label: "Konto utworzone",
      done: Boolean(profile.first_name && profile.last_name),
      href: "/app/profil#dane",
    },
    {
      label: "Podstawowy profil",
      done: Boolean(candidate?.headline && candidate?.bio && candidate?.city),
      href: "/app/profil#dane",
    },
    {
      label: "Pierwsze doświadczenie",
      done: (experienceCount ?? 0) > 0,
      href: "/app/profil#doswiadczenie",
    },
    { label: "CV", done: Boolean(document), href: "/app/profil#cv" },
  ];
  const complete = steps.every((step) => step.done);
  return (
    <div className="mx-auto max-w-2xl">
      <ClientAnalyticsEvent
        payload={{
          event: "candidate_onboarding_viewed",
          properties: { completedSteps: steps.filter((step) => step.done).length },
        }}
      />
      <div className="page-heading">
        <div>
          <h1>Przygotuj profil</h1>
          <p>Możesz przerwać i wrócić później — zapisane dane nie znikną.</p>
        </div>
      </div>
      <ol className="grid gap-[var(--gui-space-s)]">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="flex items-center justify-between gap-[var(--gui-space-m)] rounded-xl bg-card p-[var(--gui-space-m)]"
          >
            <span className="flex items-center gap-[var(--gui-space-s)]">
              {step.done ? (
                <CheckCircle2 className="text-[var(--gui-success)]" />
              ) : (
                <Circle className="text-muted-foreground" />
              )}
              <span>
                <span className="block text-xs text-muted-foreground">Krok {index + 1}</span>
                <strong>{step.label}</strong>
              </span>
            </span>
            <Link
              className="text-link"
              href={step.href.replace("#", `?next=${encodeURIComponent(next)}#`)}
            >
              {step.done ? "Sprawdź" : "Uzupełnij"}
            </Link>
          </li>
        ))}
      </ol>
      <div className="mt-[var(--gui-space-l)] flex flex-wrap gap-[var(--gui-space-s)]">
        <Link
          className={buttonVariants()}
          href={
            complete
              ? next
              : (steps
                  .find((step) => !step.done)
                  ?.href.replace("#", `?next=${encodeURIComponent(next)}#`) ?? next)
          }
        >
          {complete ? "Przejdź dalej" : "Kontynuuj konfigurację"}
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/app">
          Zrobię to później
        </Link>
      </div>
    </div>
  );
}
