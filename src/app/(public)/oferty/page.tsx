import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronsUpDown, List, Map } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { JobCard } from "@/features/jobs/job-card";
import { JobFiltersForm } from "@/features/jobs/job-filters";
import { JobMap } from "@/features/jobs/job-map";
import { hasIndexableFilters, parseJobFilters, type SearchParams } from "@/features/jobs/filters";
import { getPublishedJobs } from "@/features/jobs/queries";
import { cn } from "@/lib/utils";

type Props = { searchParams: Promise<SearchParams> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const filters = parseJobFilters(await searchParams);
  return {
    title: "Oferty pracy z AI",
    description: "Role Build, Apply i Lead dla ludzi, którzy dowożą z AI.",
    robots: hasIndexableFilters(filters) ? { index: false, follow: true } : undefined,
    alternates: { canonical: "/oferty" },
  };
}

export default async function JobsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = parseJobFilters(params);
  const jobs = await getPublishedJobs(filters);
  const view =
    (Array.isArray(params.view) ? params.view[0] : params.view) === "map" ? "map" : "list";
  const viewHref = (nextView: "list" | "map") => {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (key === "view" || value === undefined) continue;
      for (const item of Array.isArray(value) ? value : [value]) query.append(key, item);
    }
    if (nextView === "map") query.set("view", "map");
    const suffix = query.toString();
    return suffix ? `/oferty?${suffix}` : "/oferty";
  };

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
        <JobFiltersForm filters={filters} view={view} />
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
            href={viewHref("list")}
          >
            <List className="size-4" /> Lista
          </Link>
          <Link
            aria-current={view === "map" ? "page" : undefined}
            className={cn(
              buttonVariants({ variant: view === "map" ? "secondary" : "ghost", size: "sm" }),
            )}
            href={viewHref("map")}
          >
            <Map className="size-4" /> Mapa
          </Link>
        </div>
      </div>
      {jobs.length > 0 ? (
        view === "map" ? (
          <JobMap jobs={jobs} />
        ) : (
          <div className="mt-3 shadow-[var(--gui-divider-top-shadow)]">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )
      ) : (
        <div className="mt-6 rounded-lg bg-muted/30 p-10 text-center">
          <h2 className="text-xl font-semibold">Brak ofert dla tych filtrów</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Wyczyść część kryteriów i spróbuj ponownie.
          </p>
          <Link
            className="mt-5 inline-block text-sm font-medium text-[var(--gui-link)] hover:underline"
            href="/oferty"
          >
            Pokaż wszystkie oferty
          </Link>
        </div>
      )}
    </section>
  );
}
