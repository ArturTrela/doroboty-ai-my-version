import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router";
import { CheckCircle2, FileText } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { JobCard } from "@/features/jobs/job-card";
import { usePrototype } from "./store";
import {
  currentPerson,
  publishedJobs,
  nextStages,
  stageLabels,
  MIN_APPLICATION_ANSWER_LENGTH,
  type Application,
} from "./model";
import { PageTitle, Empty, NotFound, Notice } from "./shell";
import { CvAttachment } from "./cv-attachment";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
export function PersonPicker() {
  const { state, run } = usePrototype();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next");
  const audience = params.get("audience");
  const people =
    audience === "candidate" || audience === "employer"
      ? state.people.filter((person) => person.role === audience)
      : state.people;
  const safeNext = next && /^\/(?!\/)/.test(next) && !next.startsWith("/auth") ? next : null;
  return (
    <section className="prototype-section max-w-4xl">
      <h1>Wybierz osobę</h1>
      <p className="mt-4 mb-8 text-muted-foreground">
        Wybierz profil, z którego chcesz korzystać w prototypie. Hasło nie jest potrzebne.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {people.map((person) => (
          <article key={person.id} className="prototype-panel">
            <h2 className="text-xl">{person.name}</h2>
            <p className="my-4 text-muted-foreground">{person.headline}</p>
            <Button
              variant="outline"
              onClick={() => {
                run({ type: "select_person", id: person.id });
                navigate(
                  person.role === "candidate"
                    ? (safeNext ?? "/app")
                    : person.role === "employer"
                      ? "/app/oferty"
                      : "/app/case",
                );
              }}
            >
              Wejdź jako {person.name}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
export function RequireRole({
  role,
  children,
}: {
  role?: "candidate" | "employer" | "operator";
  children: ReactNode;
}) {
  const { state } = usePrototype();
  const person = currentPerson(state);
  if (!person) return <PersonPicker />;
  if (role && person.role !== role)
    return (
      <Empty>
        <p className="mb-4">
          Ten widok jest dostępny dla{" "}
          {role === "candidate" ? "kandydata" : role === "employer" ? "pracodawcy" : "prowadzącego"}
          .
        </p>
        <Link className={buttonVariants({ variant: "outline" })} to="/auth/sign-in">
          Zmień osobę
        </Link>
      </Empty>
    );
  return children;
}
export function WorkspaceHome() {
  const { state } = usePrototype();
  const person = currentPerson(state)!;
  if (person.role === "operator") return <Navigate to="/app/case" replace />;
  const candidate = person.role === "candidate";
  const applications = state.applications.filter((a) =>
    candidate ? a.candidateId === person.id : a.companyId === person.companyId,
  );
  return (
    <>
      <PageTitle>Witaj, {person.name.split(" ")[0]}</PageTitle>
      <div className="grid gap-5 sm:grid-cols-3">
        {[
          ["Aplikacje", applications.length],
          [
            candidate ? "Zapisane oferty" : "Twoje oferty",
            candidate
              ? state.saved.filter((x) => x.candidateId === person.id).length
              : state.jobs.filter((x) => x.companyId === person.companyId).length,
          ],
          [
            "W trakcie procesu",
            applications.filter((x) => !["rejected", "withdrawn", "hired"].includes(x.stage))
              .length,
          ],
        ].map(([label, value]) => (
          <div className="prototype-panel" key={label}>
            <p className="text-muted-foreground">{label}</p>
            <strong className="mt-3 block text-3xl">{value}</strong>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className={buttonVariants()} to={candidate ? "/oferty" : "/app/kandydaci"}>
          {candidate ? "Przeglądaj oferty" : "Przejrzyj kandydatów"}
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          to={candidate ? "/app/profil" : "/app/oferty"}
        >
          {candidate ? "Edytuj profil" : "Zarządzaj ofertami"}
        </Link>
      </div>
    </>
  );
}
export function ProfilePage({ preview = false }: { preview?: boolean }) {
  const { state, run } = usePrototype();
  const person = currentPerson(state)!;
  const [message, setMessage] = useState("");
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (
      run({
        type: "profile",
        value: {
          name: String(data.get("name")),
          headline: String(data.get("headline")),
          bio: String(data.get("bio")),
          location: String(data.get("location")),
        },
      })
    )
      setMessage("Profil został zapisany.");
  }
  return (
    <>
      <PageTitle
        action={
          <Link
            to={preview ? "/app/profil" : "/app/profil/podglad"}
            className={buttonVariants({ variant: "outline" })}
          >
            {preview ? "Edytuj profil" : "Podgląd profilu"}
          </Link>
        }
      >
        {preview ? person.name : "Twój profil"}
      </PageTitle>
      {preview ? (
        <div className="prototype-panel space-y-4">
          <h2>{person.headline}</h2>
          <p>{person.location}</p>
          <p>{person.bio}</p>
        </div>
      ) : (
        <form onSubmit={save} className="prototype-panel prototype-form">
          <Field label="Imię i nazwisko">
            <Input name="name" required maxLength={200} defaultValue={person.name} />
          </Field>
          <Field label="Nagłówek zawodowy">
            <Input name="headline" required maxLength={200} defaultValue={person.headline} />
          </Field>
          <Field label="Lokalizacja">
            <Input name="location" required maxLength={200} defaultValue={person.location} />
          </Field>
          <Field label="O mnie">
            <Textarea name="bio" maxLength={12000} defaultValue={person.bio} />
          </Field>
          <Button type="submit">Zapisz profil</Button>
          {message && <p role="status">{message}</p>}
        </form>
      )}
      <section className="prototype-panel mt-6">
        <h2 className="mb-4 flex items-center gap-2">
          <FileText className="size-5" />
          CV
        </h2>
        <CvAttachment candidateId={person.id} fallbackText={person.cv} />
      </section>
    </>
  );
}
export function SavedPage() {
  const { state } = usePrototype();
  const person = currentPerson(state)!;
  const jobs = publishedJobs(state).filter((job) =>
    state.saved.some((x) => x.candidateId === person.id && x.jobId === job.id),
  );
  return (
    <>
      <PageTitle>Zapisane oferty</PageTitle>
      {jobs.length ? (
        jobs.map((job) => <JobCard key={job.id} job={job} saved />)
      ) : (
        <Empty>
          <p className="mb-4">Nie masz jeszcze zapisanych ofert.</p>
          <Link className={buttonVariants({ variant: "outline" })} to="/oferty">
            Przeglądaj oferty
          </Link>
        </Empty>
      )}
    </>
  );
}
export function ApplyPage() {
  const { slug } = useParams();
  const { state, run } = usePrototype();
  const person = currentPerson(state)!;
  const navigate = useNavigate();
  const job = publishedJobs(state).find((x) => x.slug === slug);
  const draft = state.drafts.find((x) => x.jobId === job?.id && x.candidateId === person.id);
  const notes = draft?.notes ?? "";
  const generated = draft?.generated ?? "";
  const [answer, setAnswer] = useState(draft?.answer ?? "");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [attempted, setAttempted] = useState(false);
  const answerInput = useRef<HTMLTextAreaElement>(null);
  const answerLength = answer.trim().length;
  const answerInvalid = attempted && answerLength < MIN_APPLICATION_ANSWER_LENGTH;
  const consentInvalid = attempted && !consent;
  if (!job) return <NotFound />;
  const existing = state.applications.find(
    (x) => x.jobId === job.id && x.candidateId === person.id,
  );
  if (existing)
    return (
      <section className="prototype-section">
        <Notice>Aplikacja na tę ofertę została już wysłana.</Notice>
        <Link to={`/app/aplikacje/${existing.id}`} className={buttonVariants()}>
          Zobacz aplikację
        </Link>
      </section>
    );
  function submit(e: FormEvent) {
    e.preventDefault();
    setAttempted(true);
    if (answerLength < MIN_APPLICATION_ANSWER_LENGTH) {
      answerInput.current?.focus();
      return;
    }
    if (!consent) {
      document.getElementById("application-consent")?.focus();
      return;
    }
    if (run({ type: "submit", jobId: job!.id, notes, generated, answer, consent }))
      navigate("/app/aplikacje?wyslano=1");
  }
  return (
    <section className="prototype-section max-w-5xl">
      <Link className="text-[var(--gui-link)]" to={`/oferty/${job.slug}`}>
        Wróć do oferty
      </Link>
      <h1 className="mt-5">Aplikuj: {job.title}</h1>
      <p className="my-4 text-muted-foreground">
        {job.company.name} · {person.name}
      </p>
      <form noValidate onSubmit={submit} className="prototype-form mt-6">
        <section className="prototype-panel">
          <h2 className="mb-4">Twoje CV</h2>
          <CvAttachment candidateId={person.id} fallbackText={person.cv} />
        </section>
        <Field label="Dlaczego pasujesz do tej roli?">
          <Textarea
            ref={answerInput}
            required
            minLength={MIN_APPLICATION_ANSWER_LENGTH}
            maxLength={12000}
            aria-invalid={answerInvalid || undefined}
            aria-describedby="application-answer-help"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setConsent(false);
            }}
          />
        </Field>
        <p
          id="application-answer-help"
          role={answerInvalid ? "alert" : undefined}
          className={answerInvalid ? "error-message" : "text-sm text-muted-foreground"}
        >
          {answerInvalid
            ? `Odpowiedź jest za krótka. Wpisz co najmniej ${MIN_APPLICATION_ANSWER_LENGTH} znaków (obecnie: ${answerLength}).`
            : `Minimum ${MIN_APPLICATION_ANSWER_LENGTH} znaków. Obecnie: ${answerLength}.`}
        </p>
        <label className="flex items-start gap-3">
          <Checkbox
            id="application-consent"
            checked={consent}
            onCheckedChange={(v) => setConsent(v)}
            aria-invalid={consentInvalid || undefined}
            aria-describedby={consentInvalid ? "application-consent-error" : undefined}
            aria-label="Zatwierdzam treść i przesłanie aplikacji"
          />
          <span>
            Zatwierdzam treść aplikacji i przesłanie profilu oraz przykładowego CV pracodawcy.
          </span>
        </label>
        {consentInvalid && (
          <p id="application-consent-error" className="error-message" role="alert">
            Zatwierdź treść aplikacji i jej przesłanie pracodawcy.
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Wyślij aplikację</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (run({ type: "draft", jobId: job.id, notes, generated, answer }))
                setMessage("Szkic został zapisany.");
            }}
          >
            Zapisz szkic
          </Button>
        </div>
        {message && <p role="status">{message}</p>}
      </form>
    </section>
  );
}
function MatchScore({ application }: { application: Application }) {
  const color =
    application.score >= 80
      ? "var(--gui-success)"
      : application.score >= 60
        ? "var(--gui-warning)"
        : application.score >= 40
          ? "var(--gui-match-orange)"
          : "var(--gui-error)";
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold">
      <span className="size-2 rounded-full" style={{ background: color }} />
      Match Score: {application.score}%
    </span>
  );
}
export function ApplicationsPage({ employer = false }: { employer?: boolean }) {
  const { state } = usePrototype();
  const person = currentPerson(state)!;
  const [query, setQuery] = useState("");
  const [params] = useSearchParams();
  const applications = state.applications.filter(
    (x) =>
      (employer ? x.companyId === person.companyId : x.candidateId === person.id) &&
      `${x.candidateName} ${x.jobTitle}`
        .toLocaleLowerCase("pl")
        .includes(query.toLocaleLowerCase("pl")),
  );
  return (
    <>
      <PageTitle>{employer ? "Kandydaci" : "Moje aplikacje"}</PageTitle>
      {params.has("wyslano") && (
        <Notice>
          <CheckCircle2 className="inline size-5" /> Aplikacja została wysłana.
        </Notice>
      )}
      <Field label={employer ? "Szukaj kandydata lub oferty" : "Szukaj oferty"}>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} />
      </Field>
      <div className="mt-6 space-y-4">
        {applications.length ? (
          applications.map((a) => (
            <article className="prototype-panel" key={a.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Link
                    className="text-xl font-semibold text-[var(--gui-link)]"
                    to={`${employer ? "/app/kandydaci" : "/app/aplikacje"}/${a.id}`}
                  >
                    {employer ? a.candidateName : a.jobTitle}
                  </Link>
                  <p className="my-3 text-muted-foreground">
                    {employer
                      ? a.jobTitle
                      : state.companies.find((x) => x.id === a.companyId)?.name}
                  </p>
                  <p>{stageLabels[a.stage]}</p>
                </div>
                <MatchScore application={a} />
              </div>
              {employer && <p className="mt-4 text-muted-foreground">{a.summary}</p>}
            </article>
          ))
        ) : (
          <Empty>Brak aplikacji spełniających kryteria.</Empty>
        )}
      </div>
    </>
  );
}
export function ApplicationDetail({ employer = false }: { employer?: boolean }) {
  const { id } = useParams();
  const { state, run } = usePrototype();
  const person = currentPerson(state)!;
  const application = state.applications.find(
    (x) =>
      x.id === id && (employer ? x.companyId === person.companyId : x.candidateId === person.id),
  );
  const [note, setNote] = useState("");
  const [withdraw, setWithdraw] = useState(false);
  if (!application) return <NotFound />;
  return (
    <>
      <PageTitle>{employer ? application.candidateName : application.jobTitle}</PageTitle>
      <p className="mb-5 text-muted-foreground">
        {employer ? application.jobTitle : application.candidateName} ·{" "}
        {stageLabels[application.stage]}
      </p>
      <div className="prototype-panel">
        <MatchScore application={application} />
        <p className="mt-4">{application.summary}</p>
      </div>
      <section className="prototype-panel mt-5">
        <h2 className="mb-4">Przesłana aplikacja</h2>
        <p className="whitespace-pre-wrap">{application.answer}</p>
      </section>
      <section className="prototype-panel mt-5">
        <h2 className="mb-4">CV z momentu aplikowania</h2>
        <CvAttachment candidateId={application.candidateId} fallbackText={application.cv} />
      </section>
      <section className="prototype-panel mt-5">
        <h2 className="mb-4">Historia procesu</h2>
        <ol className="space-y-4">
          {application.events.map((event, i) => (
            <li key={i}>
              <strong>{stageLabels[event.stage]}</strong>
              <time className="ml-3 text-sm text-muted-foreground" dateTime={event.at}>
                {new Intl.DateTimeFormat("pl-PL", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(event.at))}
              </time>
              {employer && event.note && <p className="mt-2 whitespace-pre-wrap">{event.note}</p>}
            </li>
          ))}
        </ol>
      </section>
      {employer && nextStages[application.stage].length > 0 && (
        <section className="prototype-panel mt-5">
          <h2 className="mb-5">Następny krok</h2>
          <Field label="Notatka rekrutacyjna (widoczna pracodawcy)">
            <Textarea maxLength={12000} value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
          <div className="mt-5 flex flex-wrap gap-3">
            {nextStages[application.stage].map((stage) => (
              <Button
                key={stage}
                variant={stage === "rejected" ? "outline" : "default"}
                onClick={() => {
                  if (run({ type: "stage", applicationId: application.id, stage, note }))
                    setNote("");
                }}
              >
                {stageLabels[stage]}
              </Button>
            ))}
          </div>
        </section>
      )}
      {!employer && !["withdrawn", "rejected", "hired"].includes(application.stage) && (
        <div className="mt-6">
          {withdraw ? (
            <div className="prototype-panel">
              <p className="mb-4">Czy na pewno chcesz wycofać aplikację?</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="destructive"
                  onClick={() => run({ type: "withdraw", applicationId: application.id })}
                >
                  Potwierdź wycofanie
                </Button>
                <Button variant="outline" onClick={() => setWithdraw(false)}>
                  Anuluj
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setWithdraw(true)}>
              Wycofaj aplikację
            </Button>
          )}
        </div>
      )}
    </>
  );
}
