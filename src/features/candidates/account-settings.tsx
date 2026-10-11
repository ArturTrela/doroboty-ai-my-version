"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Download, KeyRound, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  cancelAccountDeletion,
  requestAccountDeletion,
  changeCandidateEmail,
  type CandidateActionState,
} from "@/features/candidates/actions";

const initialState: CandidateActionState = { ok: false, message: "" };

export function CandidateAccountSettings({
  email,
  deletionPending,
}: {
  email: string;
  deletionPending: boolean;
}) {
  const [emailState, emailAction, emailPending] = useActionState(
    changeCandidateEmail,
    initialState,
  );
  const [requestState, requestAction, requesting] = useActionState(
    requestAccountDeletion,
    initialState,
  );
  const [cancelState, cancelAction, cancelling] = useActionState(
    cancelAccountDeletion,
    initialState,
  );
  const state = cancelState.message ? cancelState : requestState;
  return (
    <section className="settings-section">
      <div>
        <h2>Konto i dane</h2>
        <p>Zalogowano jako {email}. Eksport zawiera profil, aplikacje i historię procesu.</p>
      </div>
      <div className="grid justify-items-start gap-[var(--gui-space-s)]">
        <form action={emailAction} className="form-stack w-full max-w-xl">
          <h3>Zmień adres e-mail</h3>
          <Label htmlFor="account-email">Nowy adres e-mail</Label>
          <Input id="account-email" name="email" type="email" autoComplete="email" required />
          <Label htmlFor="email-password">Aktualne hasło</Label>
          <Input
            id="email-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <Button type="submit" variant="outline" disabled={emailPending}>
            Potwierdź zmianę e-maila
          </Button>
          {emailState.message && (
            <p role={emailState.ok ? "status" : "alert"}>{emailState.message}</p>
          )}
        </form>
        <a className={buttonVariants({ variant: "outline" })} href="/api/account/export" download>
          <Download /> Pobierz moje dane
        </a>
        <Link className={buttonVariants({ variant: "outline" })} href="/auth/forgot-password">
          <KeyRound /> Zmień hasło
        </Link>
        {deletionPending ? (
          <form action={cancelAction}>
            <Button type="submit" variant="outline" disabled={cancelling}>
              {cancelling ? "Anuluję…" : "Anuluj usunięcie konta"}
            </Button>
          </form>
        ) : (
          <form
            action={requestAction}
            onSubmit={(event) => {
              if (!window.confirm("Złożyć prośbę o usunięcie konta i prywatnych danych?"))
                event.preventDefault();
            }}
          >
            <Label htmlFor="deletion-password">Potwierdź hasło przed usunięciem konta</Label>
            <Input
              id="deletion-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="my-[var(--gui-space-s)]"
            />
            <Button type="submit" variant="destructive" disabled={requesting}>
              <Trash2 /> {requesting ? "Zapisuję…" : "Poproś o usunięcie konta"}
            </Button>
          </form>
        )}
        {state.message && (
          <p
            role={state.ok ? "status" : "alert"}
            className={state.ok ? "text-sm" : "error-message"}
          >
            {state.message}
          </p>
        )}
        <p className="max-w-xl text-xs text-muted-foreground">
          Prośbę realizuje operator po potwierdzeniu tożsamości. Do tego czasu możesz ją anulować.
          Prywatny profil i CV są usuwane po weryfikacji; niezbędny zapis procesu może zostać
          zanonimizowany zgodnie z polityką retencji.
        </p>
      </div>
    </section>
  );
}
