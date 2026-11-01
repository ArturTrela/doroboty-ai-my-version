"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { Check, FileText, Sparkles, Trash2 } from "lucide-react";
import {
  discardApplicationDraft,
  saveApplicationDraft,
  submitApplication,
  type ApplicationActionState,
} from "@/features/applications/actions";
import { generateCandidateDraft } from "@/features/ai/actions";
import { AiThinkingIndicator } from "@/features/ai/ai-thinking-indicator";
import { captureBrowserAnalytics } from "@/features/analytics/client-event";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ApplicationActionState = { ok: false, message: "" };

export function ApplicationForm({
  jobId,
  variant,
  initialAnswer,
  initialCandidateNotes = "",
  initialSourceChanged = false,
  initialGenerationId,
  cvFileName,
  cvDownloadUrl,
  profileHref,
  draftUpdatedAt,
}: {
  jobId: string;
  variant: "long_form" | "one_click";
  initialAnswer: string;
  initialCandidateNotes?: string;
  initialSourceChanged?: boolean;
  initialGenerationId?: string;
  cvFileName?: string;
  cvDownloadUrl?: string;
  profileHref: string;
  draftUpdatedAt?: string;
}) {
  const [state, action, pending] = useActionState(submitApplication, initialState);
  const [candidateNotes, setCandidateNotes] = useState(initialCandidateNotes);
  const [sourceChanged, setSourceChanged] = useState(initialSourceChanged);
  const [answer, setAnswer] = useState(initialAnswer);
  const [generationId, setGenerationId] = useState(initialGenerationId ?? "");
  const [confirmed, setConfirmed] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [saveState, setSaveState] = useState(draftUpdatedAt ? "Szkic przywrócony" : "");
  const started = useRef(false);
  const saving = useRef<Promise<unknown>>(Promise.resolve());
  const discarding = useRef(false);
  const currentStep = answer.trim().length < 40 ? 1 : 2;

  useEffect(() => {
    void captureBrowserAnalytics({
      event: "candidate_profile_readiness",
      properties: { ready: Boolean(cvFileName) },
    });
  }, [cvFileName]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (discarding.current) return;
      setSaveState("Zapisuję szkic…");
      const payload = {
        jobId,
        answer,
        candidateNotes: generationId ? candidateNotes : answer,
        selectedExperienceIds: [],
        selectedWorkSampleIds: [],
        aiGenerationId: generationId,
        currentStep,
      };
      saving.current = saving.current.then(async () => {
        if (discarding.current) return;
        try {
          const result = await saveApplicationDraft(payload);
          if (!discarding.current)
            setSaveState(
              result.ok ? "Szkic zapisany" : "Nie udało się zapisać szkicu. Sprawdź połączenie.",
            );
        } catch {
          setSaveState("Nie udało się zapisać szkicu. Zachowaj tekst i sprawdź połączenie.");
        }
      });
    }, 800);
    return () => window.clearTimeout(timeout);
  }, [answer, candidateNotes, currentStep, generationId, jobId]);

  function trackStart() {
    if (started.current) return;
    started.current = true;
    void captureBrowserAnalytics({ event: "application_started", properties: { jobId, variant } });
  }

  async function draftWithAi() {
    setAiBusy(true);
    setAiMessage("");
    setConfirmed(false);
    const sourceNotes = generationId ? candidateNotes : answer;
    setCandidateNotes(sourceNotes);
    try {
      const result = await generateCandidateDraft({ jobId, candidateNotes: sourceNotes });
      setAiMessage(result.message);
      if (result.ok && result.text && result.generationId) {
        discarding.current = false;
        setAnswer(result.text);
        setGenerationId(result.generationId);
        setSourceChanged(false);
      }
    } catch {
      setAiMessage(
        "Nie udało się połączyć z asystentem. Twój tekst został zachowany; spróbuj ponownie.",
      );
    } finally {
      setAiBusy(false);
    }
  }

  async function discardDraft() {
    if (!window.confirm("Usunąć zapisany szkic tej aplikacji?")) return;
    discarding.current = true;
    await saving.current;
    const data = new FormData();
    data.set("jobId", jobId);
    await discardApplicationDraft(data);
    setAnswer("");
    setCandidateNotes("");
    setSourceChanged(false);
    setGenerationId("");
    setConfirmed(false);
    setAiMessage("");
    setSaveState("Szkic usunięty");
  }

  return (
    <form action={action} onFocusCapture={trackStart} className="grid gap-[var(--gui-space-m)]">
      <input type="hidden" name="jobId" value={jobId} />
      <input type="hidden" name="variant" value={variant} />
      <input type="hidden" name="aiGenerationId" value={generationId} />
      <input type="hidden" name="candidateNotes" value={generationId ? candidateNotes : answer} />

      <section className="flex flex-wrap items-center justify-between gap-[var(--gui-space-m)] rounded-xl bg-card p-[var(--gui-space-m)] shadow-[var(--gui-shadow-m)]">
        <div className="flex min-w-0 items-start gap-[var(--gui-space-s)]">
          <FileText className="mt-[var(--gui-space-xxs)] size-5 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <h2 className="font-ui text-base font-medium">Twoje CV</h2>
            <p className="mt-[var(--gui-space-xxs)] break-all text-sm text-muted-foreground">
              {cvFileName ?? "Nie masz jeszcze CV w profilu."}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-[var(--gui-space-m)] text-sm">
          {cvDownloadUrl && (
            <a className="text-link" href={cvDownloadUrl} target="_blank" rel="noreferrer">
              Otwórz CV
            </a>
          )}
          <Link className="text-link" href={profileHref}>
            {cvFileName ? "Zmień CV" : "Dodaj CV"}
          </Link>
        </div>
      </section>

      <section className="rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
        <Label htmlFor="answer" className="text-lg">
          Twoja aplikacja
        </Label>
        <p id="answer-help" className="mt-[var(--gui-space-xs)] text-sm text-muted-foreground">
          {generationId
            ? "Sprawdź i popraw gotową aplikację przed wysłaniem."
            : "Dopisz fakty, których nie ma w CV, albo napisz aplikację samodzielnie. CV i dopiski wykorzystamy do przygotowania aplikacji oraz Match Score."}
        </p>
        <Textarea
          className="mt-[var(--gui-space-m)]"
          id="answer"
          name="answer"
          rows={11}
          minLength={40}
          maxLength={5000}
          required
          aria-describedby="answer-help"
          readOnly={aiBusy || pending}
          value={answer}
          onChange={(event) => {
            discarding.current = false;
            setAnswer(event.target.value);
            setConfirmed(false);
            if (!generationId) setCandidateNotes(event.target.value);
          }}
          placeholder="Np. W CV nie wspomniałem o projekcie, w którym…"
        />
        <div className="mt-[var(--gui-space-s)] flex flex-wrap items-center justify-between gap-[var(--gui-space-s)] text-xs text-muted-foreground">
          <span role="status">{saveState || "Szkic zapisuje się automatycznie"}</span>
          <span>{answer.length}/5000 znaków</span>
        </div>
        <div className="mt-[var(--gui-space-m)] flex flex-wrap items-center gap-[var(--gui-space-s)]">
          <Button
            type="button"
            variant="outline"
            onClick={draftWithAi}
            aria-busy={aiBusy}
            disabled={
              aiBusy ||
              pending ||
              (!cvFileName && (generationId ? candidateNotes : answer).trim().length < 20)
            }
          >
            <Sparkles />{" "}
            {aiBusy
              ? "Przygotowuję…"
              : generationId
                ? "Wygeneruj ponownie"
                : "Pomóż mi napisać aplikację"}
          </Button>
          {generationId && (
            <Button
              type="button"
              variant="ghost"
              disabled={aiBusy || pending}
              onClick={() => {
                setAnswer(candidateNotes);
                setSourceChanged(false);
                setGenerationId("");
                setConfirmed(false);
                setAiMessage(
                  "Przywrócono Twoje dopiski. Możesz je zmienić i ponownie przygotować aplikację.",
                );
              }}
            >
              Edytuj dopiski
            </Button>
          )}
        </div>
        <p className="mt-[var(--gui-space-s)] text-xs text-muted-foreground">
          {generationId
            ? "„Edytuj dopiski” odrzuci bieżący szkic i przywróci Twój tekst."
            : "Asystent wykorzysta CV i Twoje dopiski. Sprawdź fakty przed wysłaniem."}
        </p>
        {aiBusy ? (
          <AiThinkingIndicator>AI układa Twoją aplikację…</AiThinkingIndicator>
        ) : aiMessage ? (
          <p role="status" className="mt-[var(--gui-space-s)] text-sm">
            {aiMessage}
          </p>
        ) : null}
      </section>

      <section className="rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]">
        <p className="text-sm text-muted-foreground">
          Pracodawca otrzyma tę aplikację{cvFileName ? " i wskazane CV" : ""}. Dopiero po wysłaniu
          będzie mógł je zobaczyć. Otrzyma też Match Score i krótkie podsumowanie przygotowane na
          podstawie CV i Twoich dopisków.
        </p>
        <label className="mt-[var(--gui-space-m)] flex items-start gap-[var(--gui-space-xs)] text-sm">
          <Checkbox
            name="confirmed"
            value="yes"
            required
            checked={confirmed}
            onCheckedChange={(checked) => {
              setConfirmed(Boolean(checked));
              if (checked)
                void captureBrowserAnalytics({
                  event: "application_reviewed",
                  properties: { jobId, usedAi: Boolean(generationId) },
                });
            }}
          />
          <span>
            Sprawdziłem / sprawdziłam treść i chcę wysłać aplikację{cvFileName ? " wraz z CV" : ""}.
          </span>
        </label>
        {sourceChanged && (
          <p role="status" className="mt-[var(--gui-space-m)] text-sm">
            CV lub dopiski zmieniły się od przygotowania szkicu. Wygeneruj aplikację ponownie, aby
            użyć tych samych źródeł także w Match Score.
          </p>
        )}
        {state.message && (
          <p role="alert" className="error-message mt-[var(--gui-space-m)]">
            {state.message}
          </p>
        )}
        <div className="mt-[var(--gui-space-m)] flex flex-wrap items-center gap-[var(--gui-space-s)]">
          <Button
            type="submit"
            size="lg"
            disabled={
              pending ||
              aiBusy ||
              !confirmed ||
              sourceChanged ||
              answer.trim().length < 40 ||
              answer.length > 5000
            }
          >
            {pending ? (
              "Wysyłam…"
            ) : (
              <>
                <Check /> Wyślij aplikację
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={discardDraft}
            disabled={pending || aiBusy}
          >
            <Trash2 /> Usuń szkic
          </Button>
        </div>
      </section>
    </form>
  );
}
