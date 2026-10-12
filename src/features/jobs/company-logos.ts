import type { Company } from "@/features/jobs/types";

// Generated defaults belong only to the optional synthetic marketplace companies.
export const generatedCompanyLogos: Readonly<Record<string, string>> = {
  "demo-kobalt-labs": "/company-logos/demo-kobalt-labs-v1.png",
  "demo-orbita-cloud": "/company-logos/demo-orbita-cloud-v1.png",
  "demo-splot-data": "/company-logos/demo-splot-data-v1.png",
  "demo-iskra-systems": "/company-logos/demo-iskra-systems-v1.png",
  "demo-pryzmat-studio": "/company-logos/demo-pryzmat-studio-v1.png",
  "demo-foton-works": "/company-logos/demo-foton-works-v1.png",
  "demo-latarnia-digital": "/company-logos/demo-latarnia-digital-v1.png",
  "demo-mewa-analytics": "/company-logos/demo-mewa-analytics-v1.png",
  "demo-neon-flow": "/company-logos/demo-neon-flow-v1.png",
  "demo-wektor-ai": "/company-logos/demo-wektor-ai-v1.png",
  "demo-bursztyn-tech": "/company-logos/demo-bursztyn-tech-v1.png",
  "demo-mozaika-products": "/company-logos/demo-mozaika-products-v1.png",
  "demo-kompas-automation": "/company-logos/demo-kompas-automation-v1.png",
  "demo-zorza-platform": "/company-logos/demo-zorza-platform-v1.png",
  "demo-puls-insights": "/company-logos/demo-puls-insights-v1.png",
  "demo-tandem-software": "/company-logos/demo-tandem-software-v1.png",
  "demo-szlak-robotics": "/company-logos/demo-szlak-robotics-v1.png",
  "demo-zefir-design": "/company-logos/demo-zefir-design-v1.png",
  "demo-rytm-commerce": "/company-logos/demo-rytm-commerce-v1.png",
  "demo-most-intelligence": "/company-logos/demo-most-intelligence-v1.png",
  "demo-lumen-tools": "/company-logos/demo-lumen-tools-v1.png",
  "demo-echo-operations": "/company-logos/demo-echo-operations-v1.png",
  "demo-atlas-discovery": "/company-logos/demo-atlas-discovery-v1.png",
  "demo-delta-research": "/company-logos/demo-delta-research-v1.png",
  "demo-punkt-solutions": "/company-logos/demo-punkt-solutions-v1.png",
};

export function companyLogoUrl(company: Pick<Company, "slug" | "logoUrl">) {
  const custom = company.logoUrl?.trim();
  if (custom && (/^https?:\/\//i.test(custom) || /^\/(?!\/)/.test(custom))) return custom;
  return Object.hasOwn(generatedCompanyLogos, company.slug)
    ? generatedCompanyLogos[company.slug]
    : undefined;
}

export function companyInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
