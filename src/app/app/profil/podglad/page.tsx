import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { requireProfile } from "@/features/auth/session";

export const dynamic = "force-dynamic";

export default async function CandidateProfilePreviewPage() {
  const { client, user, profile } = await requireProfile(["candidate"]);
  const [{ data: candidate }, { data: experiences }, { data: samples }, { data: document }] =
    await Promise.all([
      client.from("candidate_profiles").select("*").eq("user_id", user.id).single(),
      client.from("candidate_experiences").select("*").eq("user_id", user.id).order("sort_order"),
      client.from("candidate_work_samples").select("*").eq("user_id", user.id).order("sort_order"),
      client
        .from("candidate_documents")
        .select("file_name, uploaded_at")
        .eq("user_id", user.id)
        .maybeSingle(),
    ]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="page-heading">
        <div>
          <Link className="text-link mb-[var(--gui-space-m)]" href="/app/profil">
            <ArrowLeft /> Wróć do edycji
          </Link>
          <h1>Podgląd profilu</h1>
          <p>
            Tak wygląda bieżący profil. Przy aplikowaniu wybierzesz doświadczenia i próbki pracy,
            które przekażemy pracodawcy. Wysłane zgłoszenia zachowują wersję z chwili wysłania.
          </p>
        </div>
      </div>
      <article className="grid gap-[var(--gui-space-l)] rounded-[var(--gui-radius-l)] bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
        <header>
          <h2 className="text-2xl">{profile.display_name ?? "Kandydat / kandydatka"}</h2>
          <p className="mt-[var(--gui-space-xs)] text-lg text-muted-foreground">
            {candidate?.headline || "Brak nagłówka zawodowego"}
          </p>
          <div className="mt-[var(--gui-space-m)] flex flex-wrap gap-[var(--gui-space-xs)]">
            {candidate?.city && <Badge variant="secondary">{candidate.city}</Badge>}
            <Badge variant="secondary">{candidate?.experience_years ?? 0} lat doświadczenia</Badge>
          </div>
        </header>
        <section>
          <h2>O mnie</h2>
          <p className="mt-[var(--gui-space-s)] text-muted-foreground">
            {candidate?.bio || "Brak opisu."}
          </p>
        </section>
        <section>
          <h2>Doświadczenie</h2>
          <div className="mt-[var(--gui-space-s)] grid gap-[var(--gui-space-s)]">
            {(experiences ?? []).map((item) => (
              <div key={item.id} className="rounded-lg bg-secondary p-[var(--gui-space-m)]">
                <h3 className="font-medium">
                  {item.title} · {item.company_name}
                </h3>
                <p className="mt-[var(--gui-space-xs)] text-muted-foreground">{item.description}</p>
                {item.measurable_outcome && (
                  <p className="mt-[var(--gui-space-xs)]">
                    <strong>Efekt:</strong> {item.measurable_outcome}
                  </p>
                )}
              </div>
            ))}
            {(experiences ?? []).length === 0 && (
              <p className="text-muted-foreground">Brak doświadczeń.</p>
            )}
          </div>
        </section>
        <section>
          <h2>Próbki pracy</h2>
          <div className="mt-[var(--gui-space-s)] grid gap-[var(--gui-space-s)]">
            {(samples ?? []).map((item) => (
              <div key={item.id} className="rounded-lg bg-secondary p-[var(--gui-space-m)]">
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-[var(--gui-space-xs)] text-muted-foreground">{item.context}</p>
                <p className="mt-[var(--gui-space-xs)]">
                  <strong>Wynik:</strong> {item.outcome}
                </p>
                {item.url && (
                  <a
                    className="text-link mt-[var(--gui-space-s)]"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Otwórz próbkę <ExternalLink />
                  </a>
                )}
              </div>
            ))}
            {(samples ?? []).length === 0 && (
              <p className="text-muted-foreground">Brak próbek pracy.</p>
            )}
          </div>
        </section>
        <section className="rounded-lg bg-muted p-[var(--gui-space-m)]">
          <h2 className="flex items-center gap-[var(--gui-space-xs)]">
            <FileText /> CV
          </h2>
          <p className="mt-[var(--gui-space-xs)] text-sm text-muted-foreground">
            {document
              ? `${document.file_name} — dostępne pracodawcy dopiero po wysłaniu aplikacji.`
              : "Nie dodano CV."}
          </p>
        </section>
      </article>
      <Link className={`${buttonVariants()} mt-[var(--gui-space-m)]`} href="/app/profil">
        Edytuj profil
      </Link>
    </div>
  );
}
