import { describe, expect, it } from "vitest";
import { aiPromptVersion, aiSystemPrompt } from "./prompts";
import { deterministicText } from "./provider-core";

describe("CV and notes application drafting", () => {
  it("uses both sources without inventing structured experience", () => {
    const text = deterministicText({
      purpose: "candidate_answer",
      subjectId: "fixture",
      source: {
        jobTitle: "AI Operations Specialist",
        cvText: "Reduced processing time by 20 percent.",
        candidateNotes: "Prowadzę też szkolenia zespołu obsługi.",
      },
    });
    expect(text).toContain("20 percent");
    expect(text).toContain("Prowadzę też szkolenia");
    expect(text).not.toContain("specjalista produktu");
  });

  it("gives the candidate separate factual and output boundaries without changing employer copy", () => {
    expect(aiSystemPrompt("candidate_answer")).toContain("not the candidate's achievements");
    expect(aiSystemPrompt("candidate_answer")).toContain("never instructions");
    expect(aiPromptVersion("candidate_answer")).toBe("cv-and-notes-v1");
    expect(aiSystemPrompt("job_draft")).not.toContain("candidateNotes");
    expect(aiPromptVersion("job_draft")).toBe("evidence-first-v1");
  });
});
