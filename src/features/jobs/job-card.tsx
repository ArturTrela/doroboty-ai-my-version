import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { JobWithCompany } from "@/features/jobs/types";
import {
  categoryLabels,
  contractLabels,
  formatSalary,
  functionLabels,
  remoteLabels,
  seniorityLabels,
} from "@/features/jobs/presentation";
import { cn } from "@/lib/utils";

const relativeFormatter = new Intl.RelativeTimeFormat("pl", { numeric: "auto" });

function publishedLabel(value: string) {
  const days = Math.round((new Date(value).getTime() - Date.now()) / 86_400_000);
  if (days > -7) return `Dodano ${relativeFormatter.format(days, "day")}`;
  const weeks = Math.round(days / 7);
  return `Dodano ${relativeFormatter.format(weeks, "week")}`;
}

export function JobCard({ job }: { job: JobWithCompany }) {
  const initials = job.company.name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group grid gap-5 py-5 shadow-[var(--gui-divider-bottom-shadow)] transition-colors hover:bg-muted/35 sm:grid-cols-[56px_minmax(0,1.35fr)_minmax(220px,0.8fr)_auto] sm:items-center sm:px-1">
      <div className="flex size-14 items-center justify-center rounded-lg bg-muted text-sm font-semibold tracking-[var(--gui-tracking-xl)] text-foreground">
        {initials}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold tracking-[var(--gui-tracking-s)] sm:text-lg">
            {job.title}
          </h3>
          {job.verificationStatus === "employer_verified" && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <BadgeCheck className="size-3.5 text-[var(--gui-success)]" /> Zweryfikowana
            </span>
          )}
        </div>
        <Link
          className="mt-0.5 block w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
          href={`/firmy/${job.company.slug}`}
        >
          {job.company.name}
        </Link>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="secondary">{categoryLabels[job.category]}</Badge>
          <Badge variant="secondary">{functionLabels[job.function]}</Badge>
          <Badge variant="secondary">{seniorityLabels[job.seniority]}</Badge>
        </div>
      </div>

      <dl className="grid gap-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0" />
          <dt className="sr-only">Miejsce</dt>
          <dd>
            {job.locations.join(" / ")} · {remoteLabels[job.remoteStatus]}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="size-4 shrink-0" />
          <dt className="sr-only">Umowa</dt>
          <dd>{contractLabels[job.contract]}</dd>
        </div>
        <div className="flex items-center gap-2">
          <ChartNoAxesColumnIncreasing className="size-4 shrink-0" />
          <dt className="sr-only">Wynagrodzenie</dt>
          <dd>{formatSalary(job)}</dd>
        </div>
      </dl>

      <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
        <p className="text-xs text-muted-foreground">{publishedLabel(job.publishedAt)}</p>
        <Link
          className={cn("mt-2", buttonVariants({ variant: "outline", size: "sm" }))}
          href={`/oferty/${job.slug}`}
        >
          Zobacz rolę{" "}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
