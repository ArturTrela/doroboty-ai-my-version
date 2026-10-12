import { CompanyLogoImage } from "@/features/jobs/company-logo-image";
import { companyInitials, companyLogoUrl } from "@/features/jobs/company-logos";
import type { Company } from "@/features/jobs/types";
import { cn } from "@/lib/utils";

export function CompanyLogo({
  company,
  size = "default",
}: {
  company: Pick<Company, "name" | "slug" | "logoUrl">;
  size?: "default" | "large";
}) {
  const src = companyLogoUrl(company);
  const dimension = size === "large" ? 80 : 56;
  const initials = companyInitials(company.name);

  return (
    <span
      aria-hidden="true"
      data-company-logo={company.slug}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-sm font-semibold tracking-[var(--gui-tracking-xl)] text-foreground",
        size === "large" ? "size-20" : "size-14",
      )}
    >
      {src ? <CompanyLogoImage src={src} dimension={dimension} initials={initials} /> : initials}
    </span>
  );
}
