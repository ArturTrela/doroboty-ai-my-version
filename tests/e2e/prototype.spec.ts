import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { initialState } from "../../src/features/prototype/model";
import { STORAGE_KEY } from "../../src/features/prototype/storage";
async function choose(page: Page, name: string) {
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: `Wejdź jako ${name}`, exact: true }).click();
}
async function application(page: Page) {
  await choose(page, "Anna Kowalska");
  await page.goto("/#/aplikuj/ai-product-manager");
  await page
    .getByLabel("Dlaczego pasujesz do tej roli?")
    .fill(
      "Zaprojektowałam proces automatyzacji i przeprowadziłam badania użytkowników. Wynik: krótszy czas obsługi zgłoszeń o 30%.",
    );
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Wyślij aplikację", exact: true }).click();
}

test("published job → saved offer/draft → submitted application → employer decision survives reload", async ({
  page,
}) => {
  const external: string[] = [];
  const errors: string[] = [];
  page.on("request", (r) => {
    if (
      !r.url().startsWith("http://127.0.0.1:3106") &&
      !r.url().startsWith("data:") &&
      !r.url().startsWith("blob:")
    )
      external.push(r.url());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await choose(page, "Karolina Wiśniewska");
  await page.getByRole("link", { name: "Dodaj ofertę", exact: true }).click();
  await page.getByLabel("Nazwa stanowiska").fill("Product Designer do automatyzacji");
  await page
    .getByLabel("Brief — kogo szukasz i do jakiego zadania?")
    .fill("Szukamy osoby do badań z klientami, prototypowania i wdrażania automatyzacji obsługi.");
  await page.getByRole("button", { name: "Przygotuj opis z AI" }).click();
  await page.getByRole("button", { name: "Użyj propozycji" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Opublikuj ofertę" }).click();
  await expect(
    page.getByRole("link", { name: "Product Designer do automatyzacji", exact: true }),
  ).toBeVisible();
  await choose(page, "Anna Kowalska");
  await page.goto("/#/oferty");
  await page.getByLabel("Szukaj ofert", { exact: true }).fill("Product Designer do automatyzacji");
  await page.getByRole("button", { name: "Szukaj", exact: true }).click();
  await page.reload();
  await page.getByRole("link", { name: "Product Designer do automatyzacji", exact: true }).click();
  await page.getByRole("button", { name: "Zapisz ofertę", exact: true }).click();
  await page.getByRole("link", { name: "Aplikuj", exact: true }).click();
  await page
    .getByLabel("Twoje notatki do aplikacji (opcjonalnie)")
    .fill("Notatki źródłowe tylko dla kandydata.");
  await page.getByRole("button", { name: "Przygotuj propozycję z AI" }).click();
  await page.getByRole("button", { name: "Użyj propozycji" }).click();
  await page.getByRole("button", { name: "Zapisz szkic" }).click();
  await page.reload();
  await expect(page.getByLabel("Twoje notatki do aplikacji (opcjonalnie)")).toHaveValue(
    "Notatki źródłowe tylko dla kandydata.",
  );
  await page
    .getByLabel("Dlaczego pasujesz do tej roli?")
    .fill(
      "Przeprowadziłam badania z użytkownikami i wdrożyłam automatyzację. Czas obsługi skrócił się o 30%.",
    );
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Wyślij aplikację", exact: true }).click();
  await expect(page.getByText("Aplikacja została wysłana.", { exact: false })).toBeVisible();
  await page.reload();
  await page.getByRole("link", { name: "Product Designer do automatyzacji", exact: true }).click();
  const candidateUrl = page.url();
  await expect(page.getByText("Match Score: 84%", { exact: true })).toBeVisible();
  await choose(page, "Karolina Wiśniewska");
  await page.getByRole("link", { name: "Kandydaci", exact: true }).click();
  await page.getByRole("link", { name: "Anna Kowalska", exact: true }).click();
  await expect(
    page.getByText("Notatki źródłowe tylko dla kandydata.", { exact: true }),
  ).toHaveCount(0);
  await page
    .getByLabel("Notatka rekrutacyjna (widoczna pracodawcy)")
    .fill("Notatka pracodawcy — tylko panel firmy.");
  await page.getByRole("button", { name: "W przeglądzie", exact: true }).click();
  for (const label of ["Zaproszenie na rozmowę", "Pierwsza rozmowa odbyta", "Kolejny etap"])
    await page.getByRole("button", { name: label, exact: true }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Zatrudnienie", exact: true })).toBeVisible();
  await choose(page, "Anna Kowalska");
  await page.goto(candidateUrl);
  await expect(page.getByText("Kolejny etap", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Notatka pracodawcy — tylko panel firmy.", { exact: true }),
  ).toHaveCount(0);
  await page.screenshot({ path: "artifacts/candidate-desktop.png", fullPage: true });
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("another company cannot see or change a candidate application", async ({ page }) => {
  await choose(page, "Tomasz Zieliński");
  await page.goto("/#/app/kandydaci");
  await expect(page.getByRole("link", { name: "Marek Nowak", exact: true })).toHaveCount(0);
  await page.goto("/#/app/kandydaci/application-example");
  await expect(page.getByRole("heading", { name: "Nie znaleziono strony" })).toBeVisible();
});
test("candidate withdrawal is confirmed and terminal", async ({ page }) => {
  await application(page);
  await page.getByRole("link", { name: "AI Product Manager", exact: true }).click();
  await page.getByRole("button", { name: "Wycofaj aplikację", exact: true }).click();
  await page.getByRole("button", { name: "Anuluj", exact: true }).click();
  await expect(page.getByRole("button", { name: "Wycofaj aplikację", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Wycofaj aplikację", exact: true }).click();
  await page.getByRole("button", { name: "Potwierdź wycofanie", exact: true }).click();
  await page.reload();
  await expect(page.getByText("Wycofana", { exact: true })).toBeVisible();
});
test("profile changes do not rewrite a submitted application snapshot", async ({ page }) => {
  await application(page);
  await page.goto("/#/app/profil");
  await page.getByLabel("Imię i nazwisko").fill("Nowa Anna");
  await page.getByRole("button", { name: "Zapisz profil", exact: true }).click();
  await page.goto("/#/app/aplikacje");
  await page.getByRole("link", { name: "AI Product Manager", exact: true }).click();
  await expect(page.locator("main")).toContainText("Anna Kowalska");
});
test("invalid import preserves state, valid import replaces state, reset asks for confirmation", async ({
  page,
}) => {
  await choose(page, "Anna Kowalska");
  await page.goto("/#/app/settings");
  const before = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  await page.getByLabel("Importuj plik scenariusza").setInputFiles({
    name: "invalid.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"version":99}'),
  });
  await page.getByRole("button", { name: "Importuj", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Nieprawidłowy plik");
  expect(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBe(before);
  const imported = initialState();
  imported.activePersonId = "candidate-anna";
  imported.people[0].name = "Zaimportowana Anna";
  await page.getByLabel("Importuj plik scenariusza").setInputFiles({
    name: "scenario.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(imported)),
  });
  await page.getByRole("button", { name: "Importuj", exact: true }).click();
  await expect(page.getByText("Zaimportowana Anna", { exact: true }).first()).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Eksportuj dane" }).click();
  expect((await download).suggestedFilename()).toBe("doroboty-scenariusz.json");
  await page.getByRole("button", { name: "Resetuj scenariusz", exact: true }).click();
  await page.getByRole("button", { name: "Anuluj", exact: true }).click();
  await expect(page.getByText("Zaimportowana Anna", { exact: true }).first()).toBeVisible();
  await page.getByRole("button", { name: "Resetuj scenariusz", exact: true }).click();
  await page.getByRole("button", { name: "Resetuj", exact: true }).click();
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).activePersonId,
      STORAGE_KEY,
    ),
  ).toBe(null);
});
test("unreadable save stays untouched while the user works in memory", async ({ page }) => {
  await page.goto("/");
  await page.evaluate((key) => localStorage.setItem(key, '{"version":999}'), STORAGE_KEY);
  await page.reload();
  await expect(page.getByRole("status")).toContainText("nie zostaną nadpisane");
  await choose(page, "Anna Kowalska");
  expect(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBe(
    '{"version":999}',
  );
  await page.goto("/#/app/settings");
  await expect(page.getByRole("button", { name: "Pobierz poprzedni zapis" })).toBeVisible();
});
test("storage denial keeps the app usable and offers export", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, "setItem", {
      value() {
        throw new Error("Storage denied");
      },
    });
  });
  await choose(page, "Anna Kowalska");
  await expect(page.getByRole("status")).toContainText("Wyeksportuj");
  await page.goto("/#/app/profil");
  await expect(page.getByLabel("Imię i nazwisko")).toHaveValue("Anna Kowalska");
});
test("map, hash deep links and unknown records work without external requests", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (r.url().startsWith("https://")) external.push(r.url());
  });
  await page.goto("/#/oferty?view=map");
  await page
    .getByRole("region", { name: "Mapa ofert w Polsce" })
    .getByRole("button")
    .first()
    .click();
  await page.getByRole("link", { name: "Zobacz rolę", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.screenshot({ path: "artifacts/job-desktop.png", fullPage: true });
  expect(external).toEqual([]);
  await page.goto("/#/oferty/missing");
  await expect(page.getByRole("heading", { name: "Nie znaleziono strony" })).toBeVisible();
});
test("mobile navigation, light/dark appearance and keyboard person selection", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/#/auth/sign-in");
  const anna = page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true });
  await anna.focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Otwórz menu" }).click();
  await page.getByRole("link", { name: "Profil", exact: true }).click();
  await expect(page.getByLabel("Imię i nazwisko")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "artifacts/profile-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Otwórz menu" }).click();
  await page.getByRole("link", { name: "Ustawienia", exact: true }).click();
  await page.getByRole("combobox", { name: "Motyw" }).click();
  await page.getByRole("option", { name: "Ciemny", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.screenshot({ path: "artifacts/settings-mobile-dark.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
test("core screens have no serious accessibility violations", async ({ page }) => {
  await page.goto("/#/oferty");
  let results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations).toEqual([]);
  await choose(page, "Anna Kowalska");
  await page.goto("/#/app/profil");
  results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("public home and filters reflow at 320px with no external requests", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Praca dla ludzi");
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/#/oferty");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "artifacts/jobs-mobile.png", fullPage: true });
});
