import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CompanyLogo } from "@/features/jobs/company-logo";
import {
  companyInitials,
  companyLogoUrl,
  generatedCompanyLogos,
} from "@/features/jobs/company-logos";

describe("company logos", () => {
  it("provides a unique transparent PNG for each of the 25 marketplace companies", () => {
    const sql = readFileSync(
      new URL("../../../supabase/marketplace-fixtures.sql", import.meta.url),
      "utf8",
    );
    const logos = Object.entries(generatedCompanyLogos);
    expect(logos).toHaveLength(25);
    expect(new Set(logos.map(([, path]) => path)).size).toBe(25);
    for (const [slug, path] of logos) {
      expect(sql).toContain(`'${slug.replace(/^demo-/, "")}'`);
      const bytes = readFileSync(new URL(`../../../public${path}`, import.meta.url));
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      // PNG IHDR color type 6 is RGBA; keep alpha in the original deliverable.
      expect(bytes[25]).toBe(6);
    }
  });

  it("prefers an existing custom logo and leaves unrelated companies alone", () => {
    expect(
      companyLogoUrl({ slug: "demo-kobalt-labs", logoUrl: "https://example.invalid/logo.png" }),
    ).toBe("https://example.invalid/logo.png");
    expect(companyLogoUrl({ slug: "demo-kobalt-labs", logoUrl: "/own-logo.png" })).toBe(
      "/own-logo.png",
    );
    expect(companyLogoUrl({ slug: "demo-kobalt-labs" })).toBe(
      generatedCompanyLogos["demo-kobalt-labs"],
    );
    expect(companyLogoUrl({ slug: "brightlabs" })).toBeUndefined();
    expect(companyLogoUrl({ slug: "constructor" })).toBeUndefined();
    expect(companyLogoUrl({ slug: "brightlabs", logoUrl: "javascript:alert(1)" })).toBeUndefined();
    expect(
      companyLogoUrl({ slug: "brightlabs", logoUrl: "//external.invalid/logo.png" }),
    ).toBeUndefined();
  });

  it("renders optimized, dimensioned local marks in server HTML and initials otherwise", () => {
    const html = renderToStaticMarkup(
      createElement(CompanyLogo, { company: { name: "Kobalt Labs", slug: "demo-kobalt-labs" } }),
    );
    expect(html).toContain("/_next/image?");
    expect(html).toContain("demo-kobalt-labs-v1.png");
    expect(html).toContain('width="56"');
    expect(html).toContain('height="56"');
    expect(html).toContain('alt=""');
    const fallback = renderToStaticMarkup(
      createElement(CompanyLogo, { company: { name: "BrightLabs", slug: "brightlabs" } }),
    );
    expect(fallback).not.toContain("<img");
    expect(fallback).toContain(">B</span>");
  });

  it("uses safe initials for whitespace, multi-word and empty names", () => {
    expect(companyInitials(" Kobalt   Labs ")).toBe("KL");
    expect(companyInitials("One Two Three")).toBe("OT");
    expect(companyInitials("")).toBe("");
  });
});
