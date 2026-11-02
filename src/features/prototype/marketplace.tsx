import { Link, useParams, useSearchParams } from "react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, MapPin, BriefcaseBusiness, Bookmark, List, Map } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/form-select";
import { CompanyLogo } from "@/features/jobs/company-logo";
import { JobCard } from "@/features/jobs/job-card";
import { JobDescription } from "@/features/jobs/job-description";
import { filterJobs, parseJobFilters } from "@/features/jobs/filters";
import { paginateJobs, jobListingHref } from "@/features/jobs/pagination";
import {
  categoryLabels,
  functionLabels,
  remoteLabels,
  seniorityLabels,
  contractLabels,
  formatSalary,
} from "@/features/jobs/presentation";
import type { JobWithCompany } from "@/features/jobs/types";
import { usePrototype } from "./store";
import { currentPerson, publishedJobs } from "./model";
import { Empty, NotFound } from "./shell";

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
  const map = params.get("view") === "map";
  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = new URLSearchParams();
    for (const [key, value] of data) if (typeof value === "string" && value) next.set(key, value);
    if (map) next.set("view", "map");
    setParams(next);
  }
  return (
    <section className="prototype-section">
      <h1 className="mb-8">Oferty pracy z AI</h1>
      <form key={params.toString()} onSubmit={search} className="mb-7 space-y-4">
        <div className="flex gap-3">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Szukaj ofert</span>
            <Input
              name="query"
              defaultValue={filters.query}
              placeholder="Stanowisko lub firma"
              maxLength={100}
            />
          </label>
          <Button type="submit">Szukaj</Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {(
            [
              ["category", "Kategoria", categoryLabels],
              ["function", "Funkcja", functionLabels],
              ["remote", "Tryb pracy", remoteLabels],
              ["seniority", "Poziom", seniorityLabels],
              ["contract", "Umowa", contractLabels],
            ] as const
          ).map(([name, label, options]) => (
            <label key={name} className="field">
              <span>{label}</span>
              <FormSelect
                name={name}
                ariaLabel={label}
                defaultValue={filters[name] ?? ""}
                options={[
                  { value: "", label: "Wszystkie" },
                  ...Object.entries(options).map(([value, label]) => ({ value, label })),
                ]}
              />
            </label>
          ))}
          <label className="field">
            <span>Lokalizacja</span>
            <Input
              name="location"
              defaultValue={filters.location}
              maxLength={80}
              placeholder="Miasto"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/oferty" className="text-[var(--gui-link)]">
            Wyczyść filtry
          </Link>
          <div className="flex gap-2">
            <Link
              aria-label="Lista ofert"
              aria-current={!map ? "page" : undefined}
              className={buttonVariants({ variant: map ? "ghost" : "outline", size: "sm" })}
              to={jobListingHref(filters, 1, "list")}
            >
              <List />
              Lista
            </Link>
            <Link
              aria-label="Mapa ofert"
              aria-current={map ? "page" : undefined}
              className={buttonVariants({ variant: map ? "outline" : "ghost", size: "sm" })}
              to={jobListingHref(filters, 1, "map")}
            >
              <Map />
              Mapa
            </Link>
          </div>
        </div>
      </form>
      <p role="status" className="mb-4 text-sm text-muted-foreground">
        Liczba ofert: {jobs.length}
      </p>
      {!jobs.length ? (
        <Empty>Brak ofert spełniających kryteria. Zmień filtry.</Empty>
      ) : map ? (
        <LocalMap jobs={jobs} />
      ) : (
        <>
          {pagination.items.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={
                person?.role === "candidate"
                  ? state.saved.some((x) => x.candidateId === person.id && x.jobId === job.id)
                  : undefined
              }
            />
          ))}
          <nav aria-label="Strony ofert" className="mt-6 flex flex-wrap gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                to={jobListingHref(filters, page)}
                aria-current={pagination.page === page ? "page" : undefined}
                className={buttonVariants({
                  variant: pagination.page === page ? "default" : "outline",
                  size: "sm",
                })}
              >
                {page}
              </Link>
            ))}
          </nav>
        </>
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
  const applyPath = `/aplikuj/${job.slug}`;
  return (
    <article>
      <header className="bg-muted/30 shadow-[var(--gui-divider-bottom-shadow)]">
        <div className="prototype-section">
          <Link
            to="/oferty"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowLeft className="size-4" />
            Wszystkie oferty
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            <Badge variant="secondary">{categoryLabels[job.category]}</Badge>
            <Badge variant="secondary">{seniorityLabels[job.seniority]}</Badge>
          </div>
          <h1 className="mt-5">{job.title}</h1>
          <Link
            to={`/firmy/${job.company.slug}`}
            className="mt-5 flex items-center gap-3 text-[var(--gui-link)]"
          >
            <CompanyLogo company={job.company} />
            {job.company.name}
          </Link>
          <div className="my-6 flex flex-wrap gap-5 text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="size-4" />
              {job.locations.join(" / ")} · {remoteLabels[job.remoteStatus]}
            </span>
            <span className="flex items-center gap-2">
              <BriefcaseBusiness className="size-4" />
              {contractLabels[job.contract]}
            </span>
            <strong>{formatSalary(job)}</strong>
          </div>
          <div className="flex flex-wrap gap-3">
            {person?.role !== "employer" && person?.role !== "operator" && (
              <Link
                to={
                  submitted
                    ? `/app/aplikacje/${submitted.id}`
                    : person
                      ? applyPath
                      : `/auth/sign-in?next=${encodeURIComponent(applyPath)}`
                }
                className={buttonVariants()}
              >
                {submitted ? "Zobacz swoją aplikację" : "Aplikuj"}
              </Link>
            )}
            {person?.role === "candidate" && (
              <Button
                variant="outline"
                onClick={() => run({ type: "toggle_saved", jobId: job.id })}
              >
                <Bookmark />
                {saved ? "Usuń z zapisanych" : "Zapisz ofertę"}
              </Button>
            )}
          </div>
        </div>
      </header>
      <div className="prototype-section max-w-4xl">
        <h2 className="mb-6 text-2xl">O roli</h2>
        <JobDescription description={job.description} />
      </div>
    </article>
  );
}
export function CompanyPage() {
  const { slug } = useParams();
  const { state } = usePrototype();
  const company = state.companies.find((x) => x.slug === slug);
  if (!company) return <NotFound />;
  return (
    <section className="prototype-section">
      <CompanyLogo company={company} size="large" />
      <h1 className="mt-6">{company.name}</h1>
      <p className="my-4 text-muted-foreground">
        {company.location} · {company.sizeLabel}
      </p>
      <p className="max-w-3xl">{company.description}</p>
      <h2 className="mt-10 mb-5 text-2xl">Oferty firmy</h2>
      {publishedJobs(state)
        .filter((x) => x.companyId === company.id)
        .map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
    </section>
  );
}
