"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSelect } from "@/components/ui/form-select";
import { suggestMatchCriteria, approveMatchCriteria } from "./actions";
import type { MatchCriterion } from "./schema";

type JobSnapshot = { title: string; summary: string; description: string };
export function MatchCriteriaEditor({
  jobId,
  approved,
}: {
  jobId: string;
  approved: { version: number; criteria: MatchCriterion[]; current: boolean } | null;
}) {
  const [criteria, setCriteria] = useState<MatchCriterion[] | null>(null);
  const [snapshot, setSnapshot] = useState<JobSnapshot | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  function change(index: number, changes: Partial<MatchCriterion>) {
    setCriteria((items) => items!.map((item, i) => (i === index ? { ...item, ...changes } : item)));
  }
  async function suggest() {
    setBusy(true);
    setMessage("");
    try {
      const result = await suggestMatchCriteria(jobId);
      if (result.ok) {
        setCriteria(result.criteria);
        setSnapshot(result.jobSnapshot);
        if (result.fixture)
          setMessage("Propozycja gotowa. Sprawdź wymagania przed zatwierdzeniem.");
      } else setMessage(result.message);
    } catch {
      setMessage("Nie udało się wczytać propozycji. Spróbuj ponownie.");
    } finally {
      setBusy(false);
    }
  }
  async function approve() {
    setBusy(true);
    try {
      const result = await approveMatchCriteria({ jobId, jobSnapshot: snapshot, criteria });
      setMessage(result.message);
      if (result.ok) {
        setCriteria(null);
        setSnapshot(null);
      }
    } catch {
      setMessage("Nie udało się zapisać kryteriów. Spróbuj ponownie.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      aria-label="Kryteria Match Score"
      className="rounded-xl bg-card p-[var(--gui-space-l)] shadow-[var(--gui-shadow-m)]"
    >
      <h2>Kryteria Match Score</h2>
      <p className="mt-[var(--gui-space-s)] text-sm text-muted-foreground">
        {approved
          ? approved.current
            ? `Zatwierdzona wersja ${approved.version}.`
            : "Oferta zmieniła się. Zatwierdź nowe kryteria, aby oceniać kolejne aplikacje."
          : "Zatwierdź kryteria, aby nowe aplikacje otrzymywały ocenę dopasowania."}{" "}
        Waga 1–3 określa wpływ na wynik. Kryteria służą obliczaniu Match Score.
      </p>
      {!criteria && approved && (
        <ul className="mt-[var(--gui-space-m)] grid gap-[var(--gui-space-s)]">
          {approved.criteria.map((item) => (
            <li key={item.id} className="text-sm">
              {item.text} · waga {item.weight}
              {item.required ? " · konieczne" : ""}
            </li>
          ))}
        </ul>
      )}
      <Button
        type="button"
        variant="outline"
        className="mt-[var(--gui-space-m)]"
        disabled={busy}
        onClick={suggest}
      >
        {busy ? "Przetwarzam…" : "Zaproponuj kryteria z oferty"}
      </Button>
      {criteria && (
        <div className="mt-[var(--gui-space-l)] grid gap-[var(--gui-space-l)]">
          {criteria.map((item, index) => (
            <div key={item.id} className="grid gap-[var(--gui-space-s)]">
              <Label htmlFor={`criterion-${item.id}`}>Kryterium {index + 1}</Label>
              <Textarea
                id={`criterion-${item.id}`}
                value={item.text}
                maxLength={300}
                minLength={3}
                disabled={busy}
                onChange={(event) => change(index, { text: event.target.value })}
              />
              <blockquote className="text-sm text-muted-foreground">
                Z oferty: „{item.sourceQuote}”
              </blockquote>
              <Label htmlFor={`weight-${item.id}`}>Waga kryterium {index + 1}</Label>
              <FormSelect
                id={`weight-${item.id}`}
                ariaLabel={`Waga kryterium ${index + 1}`}
                value={String(item.weight)}
                disabled={busy}
                onValueChange={(value) => change(index, { weight: Number(value) })}
                options={[1, 2, 3].map((value) => ({ value: String(value), label: String(value) }))}
              />
              <label className="flex items-center gap-[var(--gui-space-xs)] text-sm">
                <Checkbox
                  checked={item.required}
                  disabled={busy}
                  onCheckedChange={(value) => change(index, { required: Boolean(value) })}
                />
                Wymaganie konieczne
              </label>
              {criteria.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-fit"
                  disabled={busy}
                  onClick={() => setCriteria(criteria.filter((entry) => entry.id !== item.id))}
                >
                  Usuń kryterium {index + 1}
                </Button>
              )}
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Sprawdź, czy kryteria wynikają z oferty. Zatwierdzenie dotyczy nowych aplikacji;
            wcześniejsze oceny pozostaną bez zmian.
          </p>
          <Button onClick={approve} disabled={busy}>
            Zatwierdź kryteria oceny
          </Button>
        </div>
      )}
      {message && (
        <p role="status" className="mt-[var(--gui-space-m)] text-sm">
          {message}
        </p>
      )}
    </section>
  );
}
