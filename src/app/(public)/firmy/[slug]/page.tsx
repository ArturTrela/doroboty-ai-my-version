import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
import { JobCard } from "@/features/jobs/job-card";
import { CompanyLogo } from "@/features/jobs/company-logo";
import { organizationJsonLd } from "@/features/jobs/presentation";
import { getCompanyWithJobs } from "@/features/jobs/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getCompanyWithJobs((await params).slug);
  if (!result) notFound();
  return { title: result.company.name, description: result.company.summary };
}

export default async function CompanyPage({ params }: Props) {
  const result = await getCompanyWithJobs((await params).slug);
  if (!result) notFound();
  const { company, jobs } = result;

  return (
    <article className="mx-auto max-w-[1360px] px-5 py-14 lg:px-8 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(company)).replace(/</g, "\\u003c"),
        }}
      />
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
          <Link
            className="mt-6 inline-flex items-center gap-2 font-medium text-[var(--gui-link)] hover:underline"
            href={company.websiteUrl}
          >
            Strona firmy <ArrowUpRight className="size-4" />
          </Link>
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
