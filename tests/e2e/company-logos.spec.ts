import { expect, test } from "@playwright/test";
import { generatedCompanyLogos } from "../../src/features/jobs/company-logos";

test("all generated company marks are delivered at a small optimized size", async ({ request }) => {
  for (const path of Object.values(generatedCompanyLogos)) {
    const original = await request.get(path);
    expect(original.ok(), path).toBe(true);
    expect(original.headers()["content-type"]).toContain("image/png");
    const optimized = await request.get(`/_next/image?url=${encodeURIComponent(path)}&w=128&q=75`, {
      headers: { accept: "image/webp" },
    });
    expect(optimized.ok(), path).toBe(true);
    expect(optimized.headers()["content-type"]).toContain("image/webp");
    expect((await optimized.body()).byteLength).toBeLessThan((await original.body()).byteLength);
  }
});
