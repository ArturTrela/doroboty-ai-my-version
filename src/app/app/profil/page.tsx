import {
  CandidateProfileForm,
  CandidateCvForm,
  ExperienceForm,
  WorkSampleForm,
  CandidateItemActions,
} from "@/features/candidates/profile-forms";
import Link from "next/link";
import { Eye } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { requireProfile } from "@/features/auth/session";
import { getSupabaseConfig } from "@/lib/env";
import { safeReturnPath } from "@/features/auth/return-path";
import {
  candidateExperiencesEnabled,
  candidateWorkSamplesEnabled,
} from "@/features/candidates/features";

export const dynamic = "force-dynamic";

export default async function CandidateProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (!getSupabaseConfig().configured) return null;
  const { client, user, profile } = await requireProfile(["candidate"]);
  const requestedNext = (await searchParams).next;
  const next = safeReturnPath(requestedNext);
  const [candidateResult, experiencesResult, samplesResult, documentResult] = await Promise.all([
    client.from("candidate_profiles").select("*").eq("user_id", user.id).single(),
    client
      .from("candidate_experiences")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    client
      .from("candidate_work_samples")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    client.from("candidate_documents").select("*").eq("user_id", user.id).maybeSingle(),
  ]);
  if (candidateResult.error) throw new Error("Nie udało się wczytać profilu.");

  const document = documentResult.data;
  const experiences = experiencesResult.data ?? [];
  const samples = samplesResult.data ?? [];
  const candidate = candidateResult.data;
  const signedUrl = document
    ? (await client.storage.from("candidate-cv").createSignedUrl(document.storage_path, 600)).data
        ?.signedUrl
    : undefined;

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Twój profil</h1>
        </div>
        <Link className={buttonVariants({ variant: "outline" })} href="/app/profil/podglad">
          <Eye /> Podgląd dla pracodawcy
        </Link>
      </div>
      <div className="grid gap-[var(--gui-space-l)]">
        {requestedNext && (
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/app/onboarding?next=${encodeURIComponent(next)}`}
          >
            Sprawdź gotowość i wróć do aplikowania
          </Link>
        )}
        <section id="cv">
          <CandidateCvForm
            document={
              document
                ? {
                    fileName: document.file_name,
                    sizeBytes: document.size_bytes,
                    uploadedAt: document.uploaded_at,
                    downloadUrl: signedUrl,
                  }
                : undefined
            }
          />
        </section>
        <section id="dane">
          <CandidateProfileForm profile={{ ...candidate, ...profile }} />
        </section>
        {candidateExperiencesEnabled && (
          <section
            id="doswiadczenie"
            className="rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-[var(--gui-space-s)]">
              <div>
                <h2>Doświadczenie</h2>
                <p className="mt-[var(--gui-space-xxs)] text-sm text-muted-foreground">
                  Ustaw kolejność, w której pokazujesz swoje dowody pracy.
                </p>
              </div>
            </div>
            {experiences.length === 0 ? (
              <p className="mt-[var(--gui-space-m)] text-muted-foreground">
                Dodaj pierwsze doświadczenie, aby profil był gotowy do aplikowania.
              </p>
            ) : (
              <div className="mt-[var(--gui-space-m)] grid gap-[var(--gui-space-s)]">
                {experiences.map((item, index) => (
                  <details key={item.id} className="rounded-lg bg-secondary p-[var(--gui-space-m)]">
                    <summary className="cursor-pointer font-ui font-medium">
                      {item.title} · {item.company_name}
                    </summary>
                    <div className="mt-[var(--gui-space-m)]">
                      <CandidateItemActions
                        id={item.id}
                        kind="experience"
                        first={index === 0}
                        last={index === experiences.length - 1}
                      />
                      <ExperienceForm item={item} />
                    </div>
                  </details>
                ))}
              </div>
            )}
            <div className="mt-[var(--gui-space-m)]">
              <ExperienceForm />
            </div>
          </section>
        )}
        {candidateWorkSamplesEnabled && (
          <section
            id="portfolio"
            className="rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]"
          >
            <h2>Próbki pracy</h2>
            <p className="mt-[var(--gui-space-xxs)] text-sm text-muted-foreground">
              Linki i wyniki, które możesz dołączyć do konkretnej aplikacji.
            </p>
            {samples.length === 0 ? (
              <p className="mt-[var(--gui-space-m)] text-muted-foreground">
                Nie masz jeszcze próbek pracy.
              </p>
            ) : (
              <div className="mt-[var(--gui-space-m)] grid gap-[var(--gui-space-s)]">
                {samples.map((item, index) => (
                  <details key={item.id} className="rounded-lg bg-secondary p-[var(--gui-space-m)]">
                    <summary className="cursor-pointer font-ui font-medium">{item.title}</summary>
                    <div className="mt-[var(--gui-space-m)]">
                      <CandidateItemActions
                        id={item.id}
                        kind="work_sample"
                        first={index === 0}
                        last={index === samples.length - 1}
                      />
                      <WorkSampleForm item={item} />
                    </div>
                  </details>
                ))}
              </div>
            )}
            <div className="mt-[var(--gui-space-m)]">
              <WorkSampleForm />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
