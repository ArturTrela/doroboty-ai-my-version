import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { JobCard } from "@/features/jobs/job-card";
import { getPublishedJobs } from "@/features/jobs/queries";
import { cn } from "@/lib/utils";

const categories = [
  {
    slug: "build",
    label: "Build",
    description: "Tworzysz modele, systemy i produkty wykorzystujące AI.",
  },
  {
    slug: "apply",
    label: "Apply",
    description: "Używasz AI, żeby lepiej wykonywać swoją właściwą pracę.",
  },
  {
    slug: "lead",
    label: "Lead",
    description: "Prowadzisz zmianę, decyzje i zespoły w świecie AI.",
  },
] as const;

export default async function HomePage() {
  const latestJobs = (await getPublishedJobs({ page: 1 })).slice(0, 4);

  return (
    <>
      <section className="border-b bg-muted/25">
        <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:px-8 lg:py-24">
          <div>
            <Badge variant="secondary" className="px-3 py-1 text-xs">
              Practice over theory
            </Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Praca dla ludzi, którzy dowożą z AI.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Wyselekcjonowane role, w których AI jest częścią odpowiedzialności, decyzji i wyniku
              pracy — nie dopiskiem w employer brandingu.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/oferty" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
                Zobacz oferty <ArrowRight />
              </Link>
              <Link
                href="/metodologia"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-5")}
              >
                Jak wybieramy role
              </Link>
            </div>
          </div>
          <aside className="self-end rounded-xl border bg-background p-6 shadow-sm lg:p-8">
            <CheckCircle2 className="size-6 text-primary" />
            <p className="mt-5 text-sm font-semibold">Nie szukamy operatorów narzędzi</p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Szukamy ról dla osób, które potrafią znaleźć wartościowe zastosowanie AI, wdrożyć je i
              połączyć z mierzalnym efektem.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 py-16 lg:px-8 lg:py-20">
        <p className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
          Trzy sposoby pracy z AI
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Build. Apply. Lead.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {categories.map((category, index) => (
            <article key={category.slug} className="rounded-xl border bg-card p-6 shadow-xs">
              <span className="text-xs font-medium text-muted-foreground">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{category.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                href={`/oferty?category=${category.slug}`}
              >
                Przeglądaj role <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/25">
        <div className="mx-auto max-w-[1360px] px-5 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
                Aktualne role
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Najnowsze oferty
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              href="/oferty"
            >
              Wszystkie oferty <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 border-t">
            {latestJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
