"use client";

import { useActionState, useState } from "react";
import { Upload } from "lucide-react";
import {
  addExperience,
  addWorkSample,
  saveCandidateProfile,
  uploadCandidateCv,
  removeCandidateCv,
  type CandidateActionState,
} from "@/features/candidates/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: CandidateActionState = { ok: false, message: "" };

export function CandidateCvForm({
  document,
}: {
  document?: { fileName: string; sizeBytes: number; uploadedAt: string; downloadUrl?: string };
}) {
  const [selectedFile, setSelectedFile] = useState("");
  const [uploadState, uploadAction, uploading] = useActionState(uploadCandidateCv, initialState);
  const [removeState, removeAction, removing] = useActionState(removeCandidateCv, initialState);
  const state = removeState.message ? removeState : uploadState;
  return (
    <section className="rounded-xl bg-card p-6 shadow-[var(--gui-shadow-m)]">
      <p className="text-xs font-medium text-muted-foreground">DOKUMENT KANDYDATA</p>
      <h2 className="mt-2">Twoje CV</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Prywatny PDF do 5 MB. Plik nie jest publiczny ani automatycznie analizowany.
      </p>
      {document ? (
        <div className="mt-5 rounded-lg bg-muted/50 p-4">
          <strong className="block font-ui text-sm">{document.fileName}</strong>
          <span className="mt-1 block text-xs text-muted-foreground">
            {(document.sizeBytes / 1024 / 1024).toFixed(2)} MB · dodano{" "}
            {new Intl.DateTimeFormat("pl-PL").format(new Date(document.uploadedAt))}
          </span>
          <div className="mt-3 flex flex-wrap gap-3">
            {document.downloadUrl ? (
              <a className="text-link" href={document.downloadUrl} target="_blank" rel="noreferrer">
                Otwórz CV
              </a>
            ) : null}
            <form action={removeAction}>
              <Button variant="ghost" size="sm" type="submit" disabled={removing}>
                Usuń
              </Button>
            </form>
          </div>
        </div>
      ) : null}
      <form action={uploadAction} className="form-stack mt-4">
        <div className="field">
          <Label>{document ? "Podmień CV" : "Dodaj CV"}</Label>
          <label
            className={`${buttonVariants({ variant: "outline" })} relative w-fit cursor-pointer`}
          >
            <Upload className="size-4" /> Wybierz PDF
            <input
              className="absolute inset-0 cursor-pointer opacity-0"
              id="cv"
              name="cv"
              type="file"
              accept="application/pdf,.pdf"
              required
              onChange={(event) => setSelectedFile(event.target.files?.[0]?.name ?? "")}
            />
          </label>
          <span className="text-xs text-muted-foreground" aria-live="polite">
            {selectedFile || "Nie wybrano pliku"}
          </span>
        </div>
        <ActionMessage state={state} />
        <Button className="w-fit" type="submit" disabled={uploading}>
          {uploading ? "Wysyłam…" : document ? "Podmień plik" : "Dodaj CV"}
        </Button>
      </form>
    </section>
  );
}

export function CandidateProfileForm({
  profile,
}: {
  profile: Record<string, string | number | null>;
}) {
  const [state, action, pending] = useActionState(saveCandidateProfile, initialState);
  return (
    <form
      action={action}
      className="form-stack rounded-xl bg-card p-6 shadow-[var(--gui-shadow-m)]"
    >
      <h2>Profil kandydata</h2>
      <Field
        label="Imię lub nazwa zawodowa"
        name="displayName"
        defaultValue={String(profile.display_name ?? "")}
        required
      />
      <Field
        label="Nagłówek"
        name="headline"
        defaultValue={String(profile.headline ?? "")}
        required
      />
      <TextField label="O Tobie" name="bio" defaultValue={String(profile.bio ?? "")} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Miasto" name="city" defaultValue={String(profile.city ?? "")} required />
        <Field
          label="Lata doświadczenia"
          name="experienceYears"
          type="number"
          min="0"
          max="60"
          defaultValue={String(profile.experience_years ?? 0)}
          required
        />
      </div>
      <Field
        label="Kontekst językowy (opcjonalnie)"
        name="languageBackground"
        defaultValue={String(profile.language_background ?? "")}
      />
      <ActionMessage state={state} />
      <Button type="submit" disabled={pending}>
        {pending ? "Zapisuję…" : "Zapisz profil"}
      </Button>
    </form>
  );
}

export function ExperienceForm() {
  const [state, action, pending] = useActionState(addExperience, initialState);
  return (
    <form
      action={action}
      className="form-stack rounded-xl bg-card p-6 shadow-[var(--gui-shadow-m)]"
    >
      <h2>Dodaj doświadczenie</h2>
      <Field id="experience-title" label="Rola" name="title" required />
      <Field id="experience-company" label="Firma lub projekt" name="companyName" required />
      <TextField
        id="experience-description"
        label="Co zrobiłeś / zrobiłaś"
        name="description"
        required
      />
      <TextField
        id="experience-outcome"
        label="Mierzalny efekt (opcjonalnie)"
        name="measurableOutcome"
      />
      <ActionMessage state={state} />
      <Button type="submit" disabled={pending}>
        {pending ? "Dodaję…" : "Dodaj doświadczenie"}
      </Button>
    </form>
  );
}

export function WorkSampleForm() {
  const [state, action, pending] = useActionState(addWorkSample, initialState);
  return (
    <form
      action={action}
      className="form-stack rounded-xl bg-card p-6 shadow-[var(--gui-shadow-m)]"
    >
      <h2>Dodaj próbkę pracy</h2>
      <Field id="work-sample-title" label="Tytuł" name="title" required />
      <Field id="work-sample-url" label="Link HTTPS (opcjonalnie)" name="url" type="url" />
      <TextField id="work-sample-context" label="Kontekst" name="context" required />
      <TextField id="work-sample-outcome" label="Wynik" name="outcome" required />
      <ActionMessage state={state} />
      <Button type="submit" disabled={pending}>
        {pending ? "Dodaję…" : "Dodaj próbkę"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  id = name,
  ...props
}: React.ComponentProps<typeof Input> & { label: string; name: string }) {
  return (
    <div className="field">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} {...props} />
    </div>
  );
}

function TextField({
  label,
  name,
  id = name,
  ...props
}: React.ComponentProps<typeof Textarea> & { label: string; name: string }) {
  return (
    <div className="field">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} name={name} rows={5} {...props} />
    </div>
  );
}

function ActionMessage({ state }: { state: CandidateActionState }) {
  if (!state.message) return null;
  return (
    <p
      role={state.ok ? "status" : "alert"}
      className={state.ok ? "success-panel" : "error-message"}
    >
      {state.message}
    </p>
  );
}
