import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplicationForm } from "@/features/applications/application-form";
import { requireProfile } from "@/features/auth/session";
import { getPublishedJob } from "@/features/jobs/queries";

export const metadata: Metadata = { title: "Aplikuj", robots: { index: false, follow: false } };

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const job = await getPublishedJob((await params).slug);
  if (!job) notFound();
  const { client, user } = await requireProfile(["candidate"]);
  const [{ data: candidate }, { count: experienceCount }, flowAssignment, aiAssignment] =
    await Promise.all([
      client.from("candidate_profiles").select("headline, bio").eq("user_id", user.id).single(),
      client
        .from("candidate_experiences")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      client.rpc("assign_experiment", { target_surface: "application_flow" }),
      client.rpc("assign_experiment", { target_surface: "candidate_answer" }),
    ]);
  const profileReady = Boolean(candidate?.headline && candidate?.bio && (experienceCount ?? 0) > 0);
  if (flowAssignment.error || aiAssignment.error)
    throw new Error("Nie udało się przydzielić wariantu eksperymentu.");
  const flow = flowAssignment.data as { id: string; variant: "long_form" | "one_click" };
  const ai = aiAssignment.data as { id: string; variant: "manual" | "ai_draft" };
  const variant = flow.variant === "one_click" && profileReady ? "one_click" : "long_form";
  const initialAnswer =
    variant === "one_click"
      ? `${candidate?.headline}. ${candidate?.bio} Chcę podczas rozmowy pokazać konkretne decyzje i wyniki.`
      : "";

  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:px-8 lg:py-20">
      <div>
        <p className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
          Aplikujesz na
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{job.title}</h1>
        <p className="mt-3 font-medium text-primary">{job.company.name}</p>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{job.summary}</p>
        {!profileReady && (
          <div className="mt-6 rounded-lg border bg-muted/40 p-4">
            <strong className="font-medium">Uzupełnij profil</strong>
            <p className="mt-2 text-sm text-muted-foreground">
              One-click będzie dostępny po dodaniu opisu i doświadczenia.
            </p>
            <Link
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              href="/app/profil"
            >
              Przejdź do profilu
            </Link>
          </div>
        )}
      </div>
      <ApplicationForm
        jobId={job.id}
        profileReady={profileReady}
        variant={variant}
        allowAi={ai.variant === "ai_draft"}
        assignmentIds={[...(flow.variant === variant ? [flow.id] : []), ai.id]}
        initialAnswer={initialAnswer}
      />
    </section>
  );
}
