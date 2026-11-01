"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { retryMatchAssessment } from "@/features/matching/actions";

export function MatchScoreProgress({
  applicationId,
  status,
  canRetry,
  attempts,
}: {
  applicationId: string;
  status: string;
  canRetry: boolean;
  attempts: number;
}) {
  const router = useRouter();
  const [requested, setRequested] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const waiting = requested || status === "pending" || status === "processing";
  useEffect(() => {
    if (!waiting) return;
    let checks = 0;
    const interval = window.setInterval(() => {
      router.refresh();
      checks += 1;
      if (checks === 50 && canRetry) void retryMatchAssessment(applicationId).catch(() => {});
      if (checks >= 60) window.clearInterval(interval);
    }, 2500);
    // Recover a saved pending task after an interrupted submission response.
    if (status === "pending" && canRetry) void retryMatchAssessment(applicationId).catch(() => {});
    return () => window.clearInterval(interval);
  }, [applicationId, canRetry, router, status, waiting]);
  async function retry() {
    setBusy(true);
    setMessage("");
    try {
      await retryMatchAssessment(applicationId);
      setRequested(true);
      router.refresh();
      setMessage("Zlecono sprawdzenie oceny. Odśwież widok za chwilę.");
    } catch {
      setMessage("Nie udało się wznowić oceny. Spróbuj ponownie.");
    } finally {
      setBusy(false);
    }
  }
  if (!canRetry) return null;
  return (
    <div className="mt-[var(--gui-space-m)]">
      {attempts < 3 && (
        <Button type="button" size="sm" variant="outline" disabled={busy} onClick={retry}>
          {busy ? "Wznawiam…" : status === "failed" ? "Ponów ocenę" : "Sprawdź ponownie"}
        </Button>
      )}
      {status === "failed" && attempts >= 3 && (
        <p className="text-sm text-muted-foreground">
          Wyczerpano próby analizy. Aplikacja pozostaje wysłana.
        </p>
      )}
      {message && (
        <p role="status" className="mt-[var(--gui-space-s)] text-sm">
          {message}
        </p>
      )}
    </div>
  );
}
