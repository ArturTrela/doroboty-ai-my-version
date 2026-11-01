import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { MatchScore } from "@/features/applications/match-score-view";
import { buttonVariants } from "@/components/ui/button";
import { requireProfile } from "@/features/auth/session";

export const dynamic = "force-dynamic";

export default async function ApplicationReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { client, user } = await requireProfile(["candidate"]);
  const { id } = await params;
  const { data } = await client
    .from("applications")
    .select(
      "id, submitted_at, scores:fit_scores(id, score, version, calculated_at, status, components, attempts, processing_started_at), job:jobs(title)",
    )
    .eq("id", id)
    .eq("candidate_id", user.id)
    .maybeSingle();
  if (!data) notFound();
  const job = Array.isArray(data.job) ? data.job[0] : data.job;
  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-card p-[var(--gui-space-l)] text-center shadow-[var(--gui-shadow-m)]">
      <CheckCircle2 className="mx-auto size-12 text-[var(--gui-success)]" />
      <h1 className="mt-[var(--gui-space-m)]">Aplikacja wysłana</h1>
      <p className="mt-[var(--gui-space-s)] text-muted-foreground">
        Twoje zgłoszenie na rolę {job?.title ?? "wybraną rolę"} zostało zapisane. Pracodawca może
        teraz zobaczyć odpowiedź, wybrane dowody i wskazane CV.
      </p>
      <p className="mt-[var(--gui-space-s)] text-sm text-muted-foreground">
        Na koncie zobaczysz kolejne zmiany statusu. Na tym etapie nie musisz nic robić.
      </p>
      <div className="mt-[var(--gui-space-l)] text-left">
        <MatchScore scores={data.scores} applicationId={data.id} canRetry />
      </div>
      <div className="mt-[var(--gui-space-l)] flex flex-wrap justify-center gap-[var(--gui-space-s)]">
        <Link className={buttonVariants()} href={`/app/aplikacje/${data.id}`}>
          Zobacz zgłoszenie
        </Link>
        <Link className={buttonVariants({ variant: "outline" })} href="/oferty">
          Wróć do ofert
        </Link>
      </div>
    </div>
  );
}
