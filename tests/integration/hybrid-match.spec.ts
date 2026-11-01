import { test, expect, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import AxeBuilder from "@axe-core/playwright";
import { LOCAL_TEST_PASSWORD } from "../../scripts/lib/local-database.ts";
import { calculateMatch } from "../../src/features/matching/scoring";
const api = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const jobId = "20000000-0000-4000-8000-000000000001";
async function login(page: Page, email: string, password = LOCAL_TEST_PASSWORD) {
  await page.goto("/auth/sign-in");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Hasło", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Zaloguj się", exact: true }).click();
  await expect(page).toHaveURL(/\/app$/);
}
async function fixture(email: string) {
  const client = createClient(api, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  expect(
    (await client.auth.signInWithPassword({ email, password: LOCAL_TEST_PASSWORD })).error,
  ).toBeNull();
  return client;
}
async function candidate() {
  const client = createClient(api, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const email = `match-${crypto.randomUUID()}@example.test`;
  const password = "Match-test-password-483!";
  const result = await client.auth.signUp({
    email,
    password,
    options: { data: { first_name: "Test", last_name: "Match" } },
  });
  expect(result.error).toBeNull();
  const id = result.data.user!.id;
  await client
    .from("candidate_profiles")
    .update({ headline: "Product Manager", bio: "Syntetyczne doświadczenie produktowe." })
    .eq("user_id", id);
  return { client, email, password, id };
}
test.beforeAll(() => {
  if (!["127.0.0.1", "localhost"].includes(new URL(api).hostname))
    throw new Error("Local integration only");
});

test("employer approves criteria; submitted experience is snapshotted and unknown stays distinct from zero", async ({
  page,
}, testInfo) => {
  await login(page, "employer@doroboty.local");
  await page.goto(`/app/oferty/${jobId}`);
  const editor = page.getByRole("region", { name: "Kryteria Match Score" });
  await editor.getByRole("button", { name: "Zaproponuj kryteria z oferty" }).click();
  await expect(editor.getByLabel("Kryterium 1", { exact: true })).toBeVisible();
  await editor.getByLabel("Kryterium 1", { exact: true }).fill("Samodzielne wdrożenie produktu AI");
  await editor.getByRole("checkbox", { name: "Wymaganie konieczne" }).check();
  await editor.getByRole("button", { name: "Zatwierdź kryteria oceny" }).click();
  await expect(editor.getByRole("status")).toContainText("Kryteria zatwierdzone");
  const employer = await fixture("employer@doroboty.local");
  const { data: rubrics } = await employer
    .from("job_match_rubrics")
    .select("criteria")
    .eq("job_id", jobId);
  expect(rubrics?.length).toBeGreaterThan(0);

  const person = await candidate();
  await page.getByRole("button", { name: "Wyloguj się", exact: true }).click();
  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await login(page, person.email, person.password);
  await page.goto("/aplikuj/ai-product-manager");
  await page
    .getByLabel("Twoja aplikacja", { exact: true })
    .fill("To tekst aplikacji. Nie powinien być źródłem informacji dla oceny dopasowania.");
  const notes =
    "Prowadziłam pilotaż produktu AI. Nie określam tu zakresu własnej odpowiedzialności.";
  await expect(
    page.getByLabel("Dodatkowe doświadczenie do oceny dopasowania (opcjonalnie)"),
  ).toHaveCount(0);
  await page.getByLabel("Twoja aplikacja", { exact: true }).fill(notes);
  await expect(page.getByRole("status").filter({ hasText: "Szkic zapisany" })).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Twoja aplikacja", { exact: true })).toHaveValue(notes);
  await page.getByRole("checkbox", { name: /Sprawdziłem/ }).check();
  await page.getByRole("button", { name: "Wyślij aplikację", exact: true }).click();
  await expect(page).toHaveURL(/\/wyslano$/);
  await expect(page.locator("[data-match-score-value]")).toHaveText("Brak wyniku", {
    timeout: 20000,
  });
  await expect(page.getByText(/Kompletność oceny|Uzasadnienia i braki informacji/)).toHaveCount(0);
  await expect(page.getByText("Podsumowanie AI", { exact: true })).toBeVisible();
  const applicationId = new URL(page.url()).pathname.split("/").at(-2)!;
  const { data: inputs } = await person.client
    .from("application_match_inputs")
    .select("sources")
    .eq("application_id", applicationId)
    .single();
  expect(inputs?.sources).toEqual([{ id: "notes", label: "Dopiski kandydata", text: notes }]);
  expect(
    (
      await employer
        .from("application_match_inputs")
        .select("sources")
        .eq("application_id", applicationId)
    ).data,
  ).toEqual([]);
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()).violations,
    ).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`hybrid-unknown-${width}.png`),
      fullPage: true,
    });
  }
});

test("both parties see the same weighted result, reasons and CV quotations; history remains unchanged", async ({
  page,
}, testInfo) => {
  const employer = await fixture("employer@doroboty.local");
  const { data: job } = await employer
    .from("jobs")
    .select("title, summary, description")
    .eq("id", jobId)
    .single();
  const criteria = [
    { id: "c1", text: "Wdrożenie produktu", weight: 3, required: true, sourceQuote: job!.title },
    {
      id: "c2",
      text: "Samodzielne discovery",
      weight: 1,
      required: true,
      sourceQuote: job!.summary.slice(0, 60),
    },
    {
      id: "c3",
      text: "Doświadczenie dodatkowe",
      weight: 1,
      required: false,
      sourceQuote: job!.title,
    },
  ];
  expect(
    (
      await employer.rpc("approve_match_rubric", {
        target_job_id: jobId,
        expected_job: job,
        target_criteria: criteria,
      })
    ).error,
  ).toBeNull();
  const person = await candidate();
  const sources = [
    { id: "cv", label: "CV", text: "Wdrożyłam produkt. Uczestniczyłam w badaniach." },
  ];
  const { data: applicationId, error } = await person.client.rpc("submit_hybrid_application", {
    target_job_id: jobId,
    target_variant: "long_form",
    final_answer: "Syntetyczna aplikacja testowa, której styl nie wpływa na wynik.",
    target_generation_id: null,
    source_snapshot: { job, profile: { displayName: "Test Match" } },
    source_evidence_ids: [],
    match_sources: sources,
  });
  expect(error).toBeNull();
  const { data: claim } = await person.client.rpc("claim_match_assessment", {
    target_application_id: applicationId,
    worker_secret: process.env.MATCH_SCORE_WORKER_SECRET,
  });
  const result = calculateMatch(
    criteria,
    [
      {
        criterionId: "c1",
        assessment: "met",
        reason: "Opisano własne wdrożenie.",
        evidence: [{ sourceId: "cv", quote: "Wdrożyłam produkt." }],
      },
      {
        criterionId: "c2",
        assessment: "partial",
        reason: "Nie podano samodzielności.",
        evidence: [{ sourceId: "cv", quote: "Uczestniczyłam w badaniach." }],
      },
      { criterionId: "c3", assessment: "unknown", reason: "Brak informacji w CV.", evidence: [] },
    ],
    sources,
  );
  expect(result.score).toBe(0.875);
  expect(
    (
      await person.client.rpc("complete_match_assessment", {
        target_score_id: claim.scoreId,
        worker_secret: process.env.MATCH_SCORE_WORKER_SECRET,
        target_run_id: claim.runId,
        result_status: "completed",
        result_score: result.score,
        result_components: {
          ...claim.components,
          ...result,
          candidateSummary:
            "Wdrożyła produkt i uczestniczyła w badaniach użytkowników. Warto omówić zakres samodzielności w discovery.",
          provider: "deterministic",
          model: "integration-fixture",
          promptVersion: "evidence-hybrid-v1",
        },
      })
    ).error,
  ).toBeNull();
  await login(page, person.email, person.password);
  for (const path of [
    `/app/aplikacje/${applicationId}/wyslano`,
    `/app/aplikacje/${applicationId}`,
  ]) {
    await page.goto(path);
    await expect(page.locator("[data-match-score-value]")).toContainText("87,5");
    await expect(page.getByText("Źródło: CV", { exact: true })).toHaveCount(0);
    await expect(
      page.getByText(
        "Wdrożyła produkt i uczestniczyła w badaniach użytkowników. Warto omówić zakres samodzielności w discovery.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(page.getByText(/Kompletność oceny|Uzasadnienia i braki informacji/)).toHaveCount(
      0,
    );
  }
  await page.goto("/app/aplikacje");
  await expect(page.locator("[data-match-score-value]")).toContainText("87,5");
  // A later approval does not change the already saved assessment.
  expect(
    (
      await employer.rpc("approve_match_rubric", {
        target_job_id: jobId,
        expected_job: job,
        target_criteria: [{ ...criteria[0], weight: 1 }],
      })
    ).error,
  ).toBeNull();
  await page.getByRole("button", { name: "Wyloguj się", exact: true }).click();
  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await login(page, "employer@doroboty.local");
  await page.goto(`/app/kandydaci/${applicationId}`);
  await expect(page.locator("[data-match-score-value]")).toContainText("87,5");
  await expect(
    page.getByText(
      "Wdrożyła produkt i uczestniczyła w badaniach użytkowników. Warto omówić zakres samodzielności w discovery.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(page.getByText("Nie podano samodzielności.", { exact: true })).toHaveCount(0);
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const mode of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme: mode });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      expect(
        (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()).violations,
      ).toEqual([]);
      await page.screenshot({
        path: testInfo.outputPath(`hybrid-evidence-${width}-${mode}.png`),
        fullPage: true,
      });
    }
  }
  const otherEmployer = await fixture("employer-other@doroboty.local");
  expect(
    (await otherEmployer.from("fit_scores").select("id").eq("application_id", applicationId)).data,
  ).toEqual([]);
});

test("application drafting and Match Score share original notes through regeneration, reload and edited output", async ({
  page,
}, testInfo) => {
  const person = await candidate();
  await login(page, person.email, person.password);
  await page.goto("/aplikuj/ai-product-manager");
  const notes =
    "Prowadziłam warsztaty discovery i wdrożyłam usprawnienie procesu, które skróciło czas obsługi o 20 procent.";
  const outputOnly =
    "Chętnie omówię swoje doświadczenie podczas rozmowy. To zredagowana wersja aplikacji po pracy z asystentem.";
  await expect(page.locator("textarea")).toHaveCount(1);
  await expect(page.getByText("Dodatkowe doświadczenie", { exact: true })).toHaveCount(0);
  await page.getByLabel("Twoja aplikacja", { exact: true }).fill(notes);
  await page.getByRole("button", { name: "Pomóż mi napisać aplikację", exact: true }).click();
  await expect(page.getByRole("button", { name: "Edytuj dopiski", exact: true })).toBeVisible();
  await page.getByLabel("Twoja aplikacja", { exact: true }).fill(outputOnly);
  await page.getByRole("button", { name: "Wygeneruj ponownie", exact: true }).click();
  await expect(page.getByLabel("Twoja aplikacja", { exact: true })).toHaveValue(/20 procent/);
  await expect(page.locator('input[name="candidateNotes"]')).toHaveValue(notes);
  await page.getByLabel("Twoja aplikacja", { exact: true }).fill(outputOnly);
  await expect(page.getByRole("status").filter({ hasText: "Szkic zapisany" })).toBeVisible();
  await expect
    .poll(async () => {
      const { data } = await person.client
        .from("application_drafts")
        .select("answer")
        .eq("candidate_id", person.id)
        .eq("job_id", jobId)
        .single();
      return data?.answer;
    })
    .toBe(outputOnly);
  await page.reload();
  await expect(page.getByLabel("Twoja aplikacja", { exact: true })).toHaveValue(outputOnly);
  await expect(page.locator('input[name="candidateNotes"]')).toHaveValue(notes);
  const generationId = await page.locator('input[name="aiGenerationId"]').inputValue();
  const { data: generation } = await person.client
    .from("ai_generations")
    .select("source_payload")
    .eq("id", generationId)
    .single();
  expect(generation?.source_payload).toMatchObject({
    candidateNotes: notes,
    cvSnapshot: null,
    cvText: null,
    cvReadStatus: "missing",
  });
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()).violations,
    ).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`shared-sources-${width}.png`),
      fullPage: true,
    });
  }
  await page.getByRole("checkbox", { name: /Sprawdziłem/ }).check();
  await page.getByRole("button", { name: "Wyślij aplikację", exact: true }).click();
  await expect(page).toHaveURL(/\/wyslano$/);
  const applicationId = new URL(page.url()).pathname.split("/").at(-2)!;
  const { data: input } = await person.client
    .from("application_match_inputs")
    .select("sources")
    .eq("application_id", applicationId)
    .single();
  expect(input?.sources).toEqual([{ id: "notes", label: "Dopiski kandydata", text: notes }]);
  expect(JSON.stringify(input?.sources)).not.toContain(outputOnly);
  const { data: submitted } = await person.client
    .from("applications")
    .select("source_snapshot, answer")
    .eq("id", applicationId)
    .single();
  expect(submitted?.answer).toBe(outputOnly);
  expect(submitted?.source_snapshot).toMatchObject({
    sourceVersion: "cv-and-notes-v2",
    sourceGenerationId: generationId,
  });
  expect(submitted?.source_snapshot).not.toHaveProperty("experienceNotes");
});

test("replacing the CV after drafting requires regeneration before submission", async ({
  page,
}) => {
  const person = await candidate();
  await login(page, person.email, person.password);
  await page.goto("/aplikuj/ai-product-manager");
  await page
    .getByLabel("Twoja aplikacja", { exact: true })
    .fill("Prowadziłam discovery produktu i wdrożyłam usprawnienie z zespołem inżynierów.");
  await page.getByRole("button", { name: "Pomóż mi napisać aplikację", exact: true }).click();
  await expect(page.getByRole("button", { name: "Edytuj dopiski", exact: true })).toBeVisible();
  const bytes = new TextEncoder().encode("%PDF-1.4 updated CV for source consistency check");
  const path = `${person.id}/${crypto.randomUUID()}.pdf`;
  expect(
    (
      await person.client.storage
        .from("candidate-cv")
        .upload(path, bytes, { contentType: "application/pdf" })
    ).error,
  ).toBeNull();
  expect(
    (
      await person.client.from("candidate_documents").upsert({
        user_id: person.id,
        storage_path: path,
        file_name: "CV.pdf",
        mime_type: "application/pdf",
        size_bytes: bytes.length,
      })
    ).error,
  ).toBeNull();
  await page.getByRole("checkbox", { name: /Sprawdziłem/ }).check();
  await page.getByRole("button", { name: "Wyślij aplikację", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("CV lub dopiski zmieniły się");
  expect(
    (await person.client.from("applications").select("id").eq("candidate_id", person.id)).data,
  ).toEqual([]);
});
