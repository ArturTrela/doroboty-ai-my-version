import { describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";

vi.mock("server-only", () => ({}));
import { extractCvText, readCandidateCvText } from "./cv-text.server";

function pdfWithText(text: string) {
  const stream = `BT /F1 12 Tf 72 740 Td (${text}) Tj ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let content = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(content.length);
    content += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = content.length;
  content += `xref\n0 6\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((n) => `${String(n).padStart(10, "0")} 00000 n \n`)
    .join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return new TextEncoder().encode(content);
}

describe("private CV text", () => {
  it("extracts source text from a real PDF without structured experience records", async () => {
    const text = await extractCvText(
      pdfWithText("Product Manager. Reduced processing time by 20 percent."),
    );
    expect(text).toContain("Reduced processing time by 20 percent.");
  });

  it("rejects empty, oversized, invalid and textless CVs", async () => {
    await expect(extractCvText(new Uint8Array())).rejects.toThrow();
    await expect(extractCvText(new Uint8Array(5 * 1024 * 1024 + 1))).rejects.toThrow();
    await expect(extractCvText(new TextEncoder().encode("not a PDF"))).rejects.toThrow();
    await expect(extractCvText(pdfWithText(""))).rejects.toThrow("CV_UNREADABLE");
  });

  it("checks candidate ownership before downloading private storage content", async () => {
    const download = vi.fn();
    const eq = vi.fn().mockReturnValue({
      maybeSingle: async () => ({
        data: { file_name: "cv.pdf", storage_path: "another-user/cv.pdf", size_bytes: 100 },
        error: null,
      }),
    });
    const client = {
      from: () => ({ select: () => ({ eq }) }),
      storage: { from: () => ({ download }) },
    } as unknown as SupabaseClient;
    await expect(readCandidateCvText(client, "current-user")).rejects.toThrow("CV_UNAVAILABLE");
    expect(eq).toHaveBeenCalledWith("user_id", "current-user");
    expect(download).not.toHaveBeenCalled();
  });
});
