import { describe, expect, it } from "vitest";
import { jobListingHref, paginateJobs, paginationNumbers } from "@/features/jobs/pagination";

describe("job listing pagination", () => {
  const jobs = Array.from({ length: 106 }, (_, index) => index + 1);
  it("splits the complete result set without gaps or duplicates", () => {
    const pages = Array.from({ length: 6 }, (_, index) => paginateJobs(jobs, index + 1));
    expect(pages.map((page) => page.items.length)).toEqual([20, 20, 20, 20, 20, 6]);
    expect(pages.flatMap((page) => page.items)).toEqual(jobs);
    expect(pages[1]).toMatchObject({ page: 2, total: 106, totalPages: 6, start: 21, end: 40 });
    expect(pages[5]).toMatchObject({ start: 101, end: 106 });
  });
  it("clamps missing pages and treats empty/single-page results safely", () => {
    expect(paginateJobs(jobs, 100).page).toBe(6);
    expect(paginateJobs(jobs, -5).page).toBe(1);
    expect(paginateJobs(jobs, Number.NaN).page).toBe(1);
    expect(paginateJobs([], 5)).toEqual({
      items: [],
      page: 1,
      total: 0,
      totalPages: 1,
      start: 0,
      end: 0,
    });
    expect(paginateJobs(jobs.slice(0, 20), 1).totalPages).toBe(1);
  });
  it("keeps every validated filter and encodes text safely", () => {
    const filters = {
      page: 3,
      query: "AI & data",
      category: "build",
      function: "data",
      remote: "hybrid",
      seniority: "senior",
      contract: "b2b",
      location: "Łódź",
    } as const;
    const href = new URL(jobListingHref(filters, 2), "https://example.invalid");
    expect(Object.fromEntries(href.searchParams)).toEqual({ ...filters, page: "2" });
    expect(
      new URL(jobListingHref(filters), "https://example.invalid").searchParams.has("page"),
    ).toBe(false);
    expect(jobListingHref({ page: 6 })).toBe("/oferty");
  });
  it("drops page when switching to the full filtered map", () => {
    expect(jobListingHref({ page: 4, category: "lead" }, 4, "map")).toBe(
      "/oferty?category=lead&view=map",
    );
  });
  it("keeps page numbers compact with current page and both endpoints", () => {
    expect(paginationNumbers(2, 6)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(paginationNumbers(1, 20)).toEqual([1, 2, 3, 4, 5, "ellipsis", 20]);
    expect(paginationNumbers(10, 20)).toEqual([1, "ellipsis", 9, 10, 11, "ellipsis", 20]);
    expect(paginationNumbers(20, 20)).toEqual([1, "ellipsis", 16, 17, 18, 19, 20]);
  });
});
