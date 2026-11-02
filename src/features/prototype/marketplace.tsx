import { Link, useParams, useSearchParams } from "react-router";
import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  ChevronsUpDown,
  ArrowLeft,
  ArrowUpRight,
  Users,
  MapPin,
  BriefcaseBusiness,
  Bookmark,
  List,
  Map,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/features/jobs/company-logo";
import { JobCard } from "@/features/jobs/job-card";
import { JobFiltersForm } from "@/features/jobs/job-filters";
import { JobPagination } from "@/features/jobs/job-pagination";
import { JobDescription } from "@/features/jobs/job-description";
import { filterJobs, parseJobFilters } from "@/features/jobs/filters";
import { paginateJobs, jobListingHref } from "@/features/jobs/pagination";
import {
  categoryLabels,
  remoteLabels,
  seniorityLabels,
  contractLabels,
  formatSalary,
} from "@/features/jobs/presentation";
import type { JobWithCompany } from "@/features/jobs/types";
import { usePrototype } from "./store";
import { currentPerson, publishedJobs } from "./model";
import { NotFound } from "./shell";
import { cn } from "@/lib/utils";

function LocalMap({ jobs }: { jobs: JobWithCompany[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const job = jobs.find((x) => x.id === selected);
  const located = jobs.filter((x) => x.coordinates);
  const locationKey = (x: JobWithCompany) => x.locations[0].trim().toLocaleLowerCase("pl");
  const markers = located.filter(
    (x, index) => located.findIndex((other) => locationKey(other) === locationKey(x)) === index,
  );
  const locationCount = (x: JobWithCompany) =>
    located.filter((other) => locationKey(other) === locationKey(x)).length;
  return (
    <div className="prototype-map-layout">
      <div className="prototype-map" role="region" aria-label="Mapa ofert w Polsce">
        <svg viewBox="0 0 600 520" aria-hidden="true">
          <path
            d="M140 45 220 65 320 40 375 60 440 50 505 150 480 240 520 335 440 420 355 435 310 480 230 435 150 445 90 350 70 260 95 160Z"
            fill="var(--gui-surface-muted)"
            stroke="var(--gui-edge)"
            strokeWidth="2"
          />
        </svg>
        {markers.map((x) => (
          <Button
            key={x.id}
            className="prototype-map-pin"
            size="icon-sm"
            variant={selected === x.id ? "default" : "outline"}
            style={{
              left: `${((x.coordinates!.longitude - 14) / 11) * 80 + 10}%`,
              top: `${((55 - x.coordinates!.latitude) / 6) * 80 + 10}%`,
            }}
            aria-label={`${x.locations.join(" / ")}: ${locationCount(x)} ofert`}
            aria-pressed={selected === x.id}
            onClick={() => setSelected(x.id)}
          >
            {locationCount(x) > 1 ? locationCount(x) : <MapPin />}
          </Button>
        ))}
      </div>
      <div className="prototype-panel">
        {job ? (
          <>
            <h2>{job.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Oferty w tej lokalizacji: {locationCount(job)}
            </p>
            <p className="my-3">
              {job.company.name} · {job.locations.join(" / ")}
            </p>
            <Link to={`/oferty/${job.slug}`} className={buttonVariants({ variant: "outline" })}>
              Zobacz rolę
            </Link>
          </>
        ) : (
          <p>Wybierz znacznik, aby zobaczyć ofertę.</p>
        )}
        <ul className="mt-5 space-y-3">
          {jobs.map((x) => (
            <li key={x.id}>
              <Link className="text-[var(--gui-link)] underline" to={`/oferty/${x.slug}`}>
                {x.title} · {x.company.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export function JobsPage() {
  const { state } = usePrototype();
  const person = currentPerson(state);
  const [params, setParams] = useSearchParams();
  const filters = parseJobFilters(Object.fromEntries(params));
  const jobs = filterJobs(publishedJobs(state), filters);
  const pagination = paginateJobs(jobs, filters.page);
  const view = params.get("view") === "map" ? "map" : "list";
  const savedIds =
    person?.role === "candidate"
      ? new Set(state.saved.filter((x) => x.candidateId === person.id).map((x) => x.jobId))
      : undefined;
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = new URLSearchParams();
    for (const [key, value] of data) if (typeof value === "string" && value) next.set(key, value);
    if (filters.location) next.set("location", filters.location);
    setParams(next);
  }
  return (
    <section className="mx-auto max-w-[1360px] px-5 py-9 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[var(--gui-tracking-xl)] text-muted-foreground">
            Aktualne role
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[var(--gui-tracking-s)] sm:text-5xl">
            Oferty pracy z AI
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Role, w których AI zmienia sposób pracy i wynik — nie tylko opis stanowiska.
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <div>
            <strong className="block text-2xl font-semibold text-foreground">{jobs.length}</strong>
            <span className="text-muted-foreground">ofert</span>
          </div>
          <div className="h-11 w-px bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="size-4" />
            <span>
              Aktualizacja
              <strong className="block font-medium text-foreground">
                {new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(new Date())}
              </strong>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <JobFiltersForm key={params.toString()} filters={filters} view={view} onSubmit={search} />
      </div>
      <div className="mt-7 flex items-center justify-between gap-4 text-sm">
        <p className="font-semibold" role="status">
          {jobs.length === 1 ? "1 oferta" : `${jobs.length} ofert`}
        </p>
        <div className="flex items-center gap-2">
          <span className="mr-2 hidden items-center gap-2 text-muted-foreground sm:inline-flex">
            <ChevronsUpDown className="size-4" /> Sortuj: najnowsze
          </span>
          <Link
            aria-current={view === "list" ? "page" : undefined}
            className={cn(
              buttonVariants({ variant: view === "list" ? "secondary" : "ghost", size: "sm" }),
            )}
            to={jobListingHref(filters)}
          >
            <List className="size-4" /> Lista
          </Link>
          <Link
            aria-current={view === "map" ? "page" : undefined}
            className={cn(
              buttonVariants({ variant: view === "map" ? "secondary" : "ghost", size: "sm" }),
            )}
            to={jobListingHref(filters, 1, "map")}
          >
            <Map className="size-4" /> Mapa
          </Link>
        </div>
      </div>
      {jobs.length > 0 ? (
        view === "map" ? (
          <LocalMap jobs={jobs} />
        ) : (
          <>
            <div className="mt-3 shadow-[var(--gui-divider-top-shadow)]">
              {pagination.items.map((job) => (
                <JobCard key={job.id} job={job} saved={savedIds?.has(job.id)} />
              ))}
            </div>
            <JobPagination pagination={pagination} filters={filters} />
          </>
        )
      ) : (
        <div className="mt-6 rounded-lg bg-muted/30 p-10 text-center">
          <h2 className="text-xl font-semibold">Brak ofert dla tych filtrów</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Wyczyść część kryteriów i spróbuj ponownie.
          </p>
          <Link
            className="mt-5 inline-block text-sm font-medium text-[var(--gui-link)] hover:underline"
            to="/oferty"
          >
            Pokaż wszystkie oferty
          </Link>
        </div>
      )}
    </section>
  );
}

export function JobPage() {
  const { slug } = useParams();
  const { state, run } = usePrototype();
  const person = currentPerson(state);
  const job = publishedJobs(state).find((x) => x.slug === slug);
  if (!job) return <NotFound />;
  const saved = state.saved.some((x) => x.candidateId === person?.id && x.jobId === job.id);
  const submitted = state.applications.find(
    (x) => x.candidateId === person?.id && x.jobId === job.id,
  );
  return (
    <article>
      <header className="bg-muted/30 shadow-[var(--gui-divider-bottom-shadow)]">
        <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            to="/oferty"
          >
            <ArrowLeft className="size-4" /> Wszystkie oferty
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            <Badge variant="secondary">{categoryLabels[job.category]}</Badge>
          </div>
          <h1 className="mt-5 text-4xl leading-tight font-semibold tracking-[var(--gui-tracking-s)] sm:text-5xl">
            {job.title}
          </h1>
          <Link
            className="mt-4 inline-flex max-w-full items-center gap-[var(--gui-space-s)] text-lg font-medium text-[var(--gui-link)] hover:underline"
            to={`/firmy/${job.company.slug}`}
          >
            <CompanyLogo company={job.company} />
            <span className="min-w-0 break-words">{job.company.name}</span>
          </Link>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {job.summary}
          </p>
        </div>
      </header>
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 lg:grid-cols-[1fr_300px] lg:px-8 lg:py-16">
        <div>
          <h2 className="text-2xl font-semibold">O roli</h2>
          <div className="mt-5 max-w-2xl">
            <JobDescription description={job.description} />
          </div>
          <div className="mt-12 rounded-xl bg-muted/40 p-6">
            <h2 className="text-xl font-semibold">Chcesz aplikować?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {person?.role === "candidate"
                ? "Przygotuj odpowiedź na podstawie swojego CV i doświadczenia."
                : person
                  ? "Aplikacje są dostępne z profilu kandydata."
                  : "Wybierz profil kandydata, aby przygotować aplikację na tę ofertę."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {person?.role === "candidate" ? (
                <>
                  <Link
                    to={submitted ? `/app/aplikacje/${submitted.id}` : `/aplikuj/${job.slug}`}
                    className={buttonVariants({ size: "lg" })}
                  >
                    {submitted ? "Zobacz swoją aplikację" : "Aplikuj"}
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => run({ type: "toggle_saved", jobId: job.id })}
                  >
                    <Bookmark className={cn("size-4", saved && "fill-current")} />
                    {saved ? "Usuń z zapisanych" : "Zapisz ofertę"}
                  </Button>
                </>
              ) : !person ? (
                <Link
                  to={`/auth/sign-in?audience=candidate&next=${encodeURIComponent(`/aplikuj/${job.slug}`)}`}
                  className={buttonVariants({ size: "lg" })}
                >
                  Wybierz osobę i aplikuj
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        <aside className="h-fit rounded-xl bg-card p-5 shadow-[var(--gui-shadow-m)]">
          <h2 className="text-lg font-semibold">Konkrety</h2>
          <dl className="mt-5 grid gap-5 text-sm">
            <div>
              <dt className="font-medium">Miejsce</dt>
              <dd className="mt-1 flex gap-2 text-muted-foreground">
                <MapPin className="size-4 shrink-0" /> {job.locations.join(" / ")} ·{" "}
                {remoteLabels[job.remoteStatus]}
              </dd>
            </div>
            <div>
              <dt className="font-medium">Poziom</dt>
              <dd className="mt-1 text-muted-foreground">{seniorityLabels[job.seniority]}</dd>
            </div>
            <div>
              <dt className="font-medium">Umowa</dt>
              <dd className="mt-1 flex gap-2 text-muted-foreground">
                <BriefcaseBusiness className="size-4 shrink-0" /> {contractLabels[job.contract]}
              </dd>
            </div>
            <div>
              <dt className="font-medium">Wynagrodzenie</dt>
              <dd className="mt-1 text-muted-foreground">{formatSalary(job)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}

export function CompanyPage() {
  const { slug } = useParams();
  const { state } = usePrototype();
  const company = state.companies.find((x) => x.slug === slug);
  if (!company) return <NotFound />;
  const jobs = publishedJobs(state).filter((x) => x.companyId === company.id);
  return (
    <article className="mx-auto max-w-[1360px] px-5 py-14 lg:px-8 lg:py-20">
      <div className="grid gap-8 pb-12 shadow-[var(--gui-divider-bottom-shadow)] lg:grid-cols-[1fr_320px]">
        <div>
          <CompanyLogo company={company} size="large" />
          <h1 className="mt-3 text-4xl font-semibold tracking-[var(--gui-tracking-s)] sm:text-5xl">
            {company.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed">{company.summary}</p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {company.description}
          </p>
        </div>
        <dl className="h-fit rounded-xl bg-muted/35 p-6 text-sm">
          <div className="flex gap-2">
            <MapPin className="size-5" />
            <div>
              <dt className="font-medium">Lokalizacja</dt>
              <dd className="mt-1 text-muted-foreground">{company.location}</dd>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Users className="size-5" />
            <div>
              <dt className="font-medium">Wielkość</dt>
              <dd className="mt-1 text-muted-foreground">{company.sizeLabel}</dd>
            </div>
          </div>
          {/^https?:\/\//i.test(company.websiteUrl) && (
            <a
              className="mt-6 inline-flex items-center gap-2 font-medium text-[var(--gui-link)] hover:underline"
              href={company.websiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Strona firmy <ArrowUpRight className="size-4" />
            </a>
          )}
        </dl>
      </div>
      <section className="py-12">
        <h2 className="text-2xl font-semibold">Otwarte role</h2>
        {jobs.length > 0 ? (
          <div className="mt-7 shadow-[var(--gui-divider-top-shadow)]">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="mt-5 text-lg">Ta firma nie ma teraz aktywnych ofert.</p>
        )}
      </section>
    </article>
  );
}
