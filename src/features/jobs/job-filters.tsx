import Link from "next/link";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  FileText,
  Grid2X2,
  RotateCcw,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { JobFilters } from "@/features/jobs/types";
import {
  categoryLabels,
  contractLabels,
  functionLabels,
  remoteLabels,
  seniorityLabels,
} from "@/features/jobs/presentation";

const filterIcons = {
  category: Grid2X2,
  function: Building2,
  remote: BriefcaseBusiness,
  seniority: BarChart3,
  contract: FileText,
} as const;

export function JobFiltersForm({ filters }: { filters: JobFilters }) {
  return (
    <form className="pb-6 shadow-[var(--gui-divider-bottom-shadow)]" action="/oferty">
      <div className="flex rounded-lg bg-background p-1 shadow-[var(--gui-edge-shadow)] focus-within:shadow-[var(--gui-control-focus-shadow)]">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Szukaj</span>
          <Search
            aria-hidden="true"
            className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="h-12 border-0 bg-transparent pr-3 pl-12 text-base shadow-none focus-visible:border-transparent focus-visible:ring-0"
            name="query"
            defaultValue={filters.query}
            placeholder="Szukaj po stanowisku, firmie lub słowach kluczowych..."
          />
        </label>
        <Button aria-label="Szukaj / Filtruj" className="h-12 px-6 text-sm sm:px-9" type="submit">
          Szukaj
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto]">
        <FilterSelect
          name="category"
          label="Kategoria"
          value={filters.category}
          options={categoryLabels}
        />
        <FilterSelect
          name="function"
          label="Funkcja"
          value={filters.function}
          options={functionLabels}
        />
        <FilterSelect
          name="remote"
          label="Tryb pracy"
          value={filters.remote}
          options={remoteLabels}
        />
        <FilterSelect
          name="seniority"
          label="Poziom"
          value={filters.seniority}
          options={seniorityLabels}
        />
        <FilterSelect
          name="contract"
          label="Umowa"
          value={filters.contract}
          options={contractLabels}
        />
        <Link
          className="inline-flex h-14 items-center justify-center gap-2 px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:col-span-2 lg:col-span-1"
          href="/oferty"
        >
          <RotateCcw className="size-4" />
          Wyczyść
        </Link>
      </div>
    </form>
  );
}

function FilterSelect({
  name,
  label,
  value,
  options,
}: {
  name: keyof typeof filterIcons;
  label: string;
  value?: string;
  options: Record<string, string>;
}) {
  const Icon = filterIcons[name];

  return (
    <label className="relative flex h-14 items-center gap-3 rounded-lg bg-[var(--gui-control)] px-3 shadow-[var(--gui-control-shadow)] transition-[background-color,box-shadow] focus-within:shadow-[var(--gui-control-focus-shadow)] hover:shadow-[var(--gui-control-hover-shadow)]">
      <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] leading-4 text-muted-foreground">{label}</span>
        <select
          className="block w-full appearance-none bg-transparent pr-5 text-sm font-medium outline-none"
          name={name}
          defaultValue={value ?? ""}
        >
          <option value="">Wszystkie</option>
          {Object.entries(options).map(([optionValue, optionLabel]) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>
      </span>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 bottom-[14px] size-3.5 text-muted-foreground"
      />
    </label>
  );
}
