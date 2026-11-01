import { describe, expect, it } from "vitest";
import {
  candidateMatchSources,
  candidateSourceSchema,
  mergeCandidateNotes,
  restoreCandidateSources,
  sameCvSource,
} from "./sources";
const cv = {
  fileName: "CV.pdf",
  storagePath: "candidate/version-1.pdf",
  uploadedAt: "2026-11-01T10:00:00Z",
  sizeBytes: 1200,
};
const source = {
  candidateNotes: "Prowadziłam warsztaty z zespołem i skróciłam obsługę o 20%.",
  cvText: "Product discovery and production AI deployment.",
  cvReadStatus: "available" as const,
  cvSnapshot: cv,
};
describe("shared candidate sources", () => {
  it("uses the saved CV and candidate-authored notes as the only matching inputs", () => {
    expect(candidateMatchSources(source)).toEqual([
      { id: "notes", label: "Dopiski kandydata", text: source.candidateNotes },
      { id: "cv", label: "CV", text: source.cvText },
    ]);
  });
  it("resumes an edited generated application without promoting its prose to source facts", () => {
    const restored = restoreCandidateSources(
      {
        answer: "Polished AI application, edited by candidate.",
        ai_generation_id: "generation",
        experience_notes: source.candidateNotes,
      },
      source,
    );
    expect(restored).toEqual({
      answer: "Polished AI application, edited by candidate.",
      candidateNotes: source.candidateNotes,
      sourceChanged: false,
    });
  });
  it("merges legacy extra notes and requires regeneration without losing the edited application", () => {
    const restored = restoreCandidateSources(
      {
        answer: "Edited generated text",
        ai_generation_id: "generation",
        experience_notes: "Prowadziłam także szkolenia.",
      },
      source,
    );
    expect(restored.candidateNotes).toBe(
      source.candidateNotes + "\n\nProwadziłam także szkolenia.",
    );
    expect(restored.answer).toBe("Edited generated text");
    expect(restored.sourceChanged).toBe(true);
  });
  it("merges manual legacy drafts into one editable source field, without duplicating notes", () => {
    expect(
      restoreCandidateSources({ answer: "Moje doświadczenie", experience_notes: "Mój projekt" })
        .answer,
    ).toBe("Moje doświadczenie\n\nMój projekt");
    expect(mergeCandidateNotes("  Dopiski  ", "Dopiski", "")).toBe("Dopiski");
    expect(mergeCandidateNotes("a".repeat(5000), "b".repeat(5000))).toHaveLength(10002);
  });
  it("does not use generated prose as notes when provenance is unavailable", () => {
    const restored = restoreCandidateSources({
      answer: "Generated prose",
      ai_generation_id: "missing-generation",
    });
    expect(restored.candidateNotes).toBe("");
    expect(restored.sourceChanged).toBe(true);
  });
  it("detects replaced, added and removed CVs while allowing a filename-only change", () => {
    expect(sameCvSource(cv, { ...cv, storagePath: "candidate/version-2.pdf" })).toBe(false);
    expect(sameCvSource(cv, null)).toBe(false);
    expect(sameCvSource(null, cv)).toBe(false);
    expect(sameCvSource(cv, { ...cv, fileName: "Renamed-CV.pdf" })).toBe(true);
    expect(sameCvSource(null, null)).toBe(true);
    expect(
      restoreCandidateSources(
        {
          answer: "Generated answer",
          ai_generation_id: "generation",
          experience_notes: source.candidateNotes,
        },
        source,
        null,
      ).sourceChanged,
    ).toBe(true);
  });
  it("does not turn an unreadable CV into evidence and rejects inconsistent saved sources", () => {
    expect(
      candidateMatchSources({ ...source, cvReadStatus: "unreadable", cvText: null }),
    ).toHaveLength(1);
    expect(candidateSourceSchema.safeParse({ ...source, cvSnapshot: null }).success).toBe(false);
    expect(candidateSourceSchema.safeParse({ ...source, cvReadStatus: "missing" }).success).toBe(
      false,
    );
  });
});
