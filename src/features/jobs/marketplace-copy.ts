import { companyContexts, roleContexts } from "./marketplace-role-copy.ts";

export type CopyJob = {
  id: string;
  title: string;
  category: string;
  function: string;
  seniority: string;
  company_name: string;
  location: string;
  remote_status?: string;
  contract_type?: string;
  salary_min?: number;
  salary_max?: number;
};

const stockFocus = [
  "discovery i planowanie produktu",
  "integracje modeli językowych i ewaluacje",
  "projektowanie kontroli i informacji zwrotnej",
  "automatyzacja procesów operacyjnych",
  "eksperymenty i analiza danych",
  "eksperymenty wzrostowe i pomiar konwersji",
  "niezawodność platformy i obserwowalność",
  "badania użytkowników i testowanie prototypów",
  "modelowanie danych i jakość raportowania",
  "adopcja AI i zarządzanie zmianą",
  "analiza zachowań i metryk produktowych",
  "strategia treści i weryfikacja jakości",
  "pipeline danych i wdrażanie modeli",
  "integracje API i automatyzacje",
  "projektowanie dialogów i obsługa błędów",
  "koordynacja wdrożeń i kryteria odbioru",
  "priorytetyzacja i walidacja potrzeb",
  "automatyzacja komunikacji i eksperymenty",
  "testy regresji i kontrola jakości odpowiedzi",
  "metryki biznesowe i wspieranie decyzji",
];

// Exact legacy supplement text, not a heuristic that could erase an edited fixture.
export function stockMarketplaceDescription(job: CopyJob) {
  const number = Number(job.id.slice(-12));
  const sector = ["finanse", "logistyka", "edukacja", "handel", "energia"][
    Math.floor((number - 1) / 4) % 5
  ];
  const focus = stockFocus[(number - 1) % 20];
  return [
    "O firmie\n" + job.company_name + " rozwija produkty dla sektora: " + sector + ".",
    "Zakres odpowiedzialności\nTwój obszar to " +
      focus +
      ". Będziesz współpracować z zespołem produktowym i operacyjnym, definiować kryteria sukcesu oraz sprawdzać rozwiązania z użytkownikami.",
    "Oczekiwania\nPokaż projekt, swoją odpowiedzialność i wynik. Liczą się jasna komunikacja, rozumienie ograniczeń AI i dobór metod do poziomu doświadczenia. Nie wymagamy znajomości wszystkich narzędzi.",
    "Pierwsze 90 dni\nPoznasz proces, wybierzesz jeden problem, przygotujesz prototyp i ocenę jakości. Wspólnie zdecydujemy o wdrożeniu na podstawie efektu, kosztu i ryzyka.",
    "Co oferujemy\nJawne widełki, czas na naukę, współpracę z ekspertami i wpływ na sposób pracy. Rekrutacja testowa obejmuje przegląd profilu oraz rozmowę o doświadczeniu.",
  ].join("\n\n");
}

const levelScopes: Record<string, string> = {
  junior:
    "Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.",
  mid: "Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.",
  senior:
    "Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.",
  lead: "Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.",
};

function workingTerms(job: CopyJob) {
  const modes: Record<string, string> = {
    onsite: "stacjonarnie",
    hybrid: "hybrydowo",
    remote: "zdalnie",
  };
  const contracts: Record<string, string> = {
    employment: "umowa o pracę",
    b2b: "B2B",
    mandate: "umowa zlecenie",
  };
  if (!job.remote_status || !job.contract_type || !job.salary_min || !job.salary_max)
    return (
      "Lokalizacja zespołu: " +
      job.location +
      ". Widełki, tryb pracy i forma współpracy są podane w panelu oferty."
    );
  return (
    job.location +
    " · " +
    modes[job.remote_status] +
    " · " +
    contracts[job.contract_type] +
    ". " +
    new Intl.NumberFormat("pl-PL").format(job.salary_min) +
    "–" +
    new Intl.NumberFormat("pl-PL").format(job.salary_max) +
    " zł " +
    (job.contract_type === "b2b" ? "netto" : "brutto") +
    " miesięcznie."
  );
}

export function marketplaceCopy(job: CopyJob) {
  if (!/^a2000000-0000-4000-8000-\d{12}$/.test(job.id))
    throw new Error("Reserved fixture job required");
  const number = Number(job.id.slice(-12));
  if (number < 1 || number > 100) throw new Error("Fixture number out of range");
  if (
    !["product", "engineering", "data", "design", "marketing", "operations"].includes(job.function)
  )
    throw new Error("Unknown fixture function");
  if (!["build", "apply", "lead"].includes(job.category))
    throw new Error("Unknown fixture category");
  const scope = levelScopes[job.seniority];
  if (!scope) throw new Error("Unknown fixture seniority");
  const roleIndex = (number - 1) % roleContexts.length;
  const companyIndex = Math.floor((number - 1) / 4);
  const levelIndex = ["junior", "mid", "senior", "lead"].indexOf(job.seniority);
  const variant = (roleIndex + companyIndex * 3 + levelIndex * 2) % 6;
  const role = roleContexts[roleIndex];
  const context = companyContexts[companyIndex];
  const terms = workingTerms(job);
  const bullets = (items: string[]) => items.map((item) => "- " + item).join("\n");
  const expectations =
    job.seniority === "junior"
      ? [
          role.needs[0],
          "Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.",
        ]
      : [
          ...role.needs,
          job.seniority === "mid"
            ? "Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik."
            : "Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.",
        ];
  const mandate =
    job.seniority === "junior"
      ? ""
      : job.category === "build"
        ? " Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami."
        : job.category === "apply"
          ? " Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu."
          : " Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.";
  const shortRecruiting =
    job.seniority === "junior"
      ? "Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna."
      : "Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.";
  const recruiting =
    shortRecruiting +
    " Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.";
  const parts: string[] = [];
  const section = (heading: string, body: string) => parts.push("### " + heading + "\n\n" + body);
  const opening = job.company_name + " szuka osoby na stanowisko " + job.title + ".";
  if (variant === 0) {
    parts.push(opening + " " + context);
    section("Zadania", bullets(role.duties));
    section("Na start", "Pierwszy temat: " + role.project + ". " + role.needs[0] + " " + scope);
    parts.push(terms + "\n\n" + shortRecruiting);
  } else if (variant === 1) {
    parts.push(opening + "\n\n" + context);
    section("Co będziesz robić", bullets(role.duties));
    section("Pierwszy projekt", "Zaczynamy od jednego zadania: " + role.project + ". " + scope);
    section("Czego potrzebujesz", bullets(expectations));
    section("Warunki", terms);
    section("Zanim dołączysz", recruiting);
  } else if (variant === 2) {
    parts.push(terms);
    section("Produkt i problem", context + "\n\n" + opening);
    section(
      "Pierwszy zakres pracy",
      role.project[0].toLocaleUpperCase("pl") +
        role.project.slice(1) +
        ".\n\n" +
        bullets(role.duties),
    );
    section("Jak sprawdzimy efekt", role.detail);
    section("Twoja odpowiedzialność", scope + mandate);
    section("Warsztat", bullets(expectations));
    section("Rozmowy z nami", recruiting);
  } else if (variant === 3) {
    parts.push(
      context +
        "\n\nW firmie " +
        job.company_name +
        " potrzebujemy osoby na stanowisko " +
        job.title +
        ". Pierwszym tematem będzie " +
        role.project +
        ".",
    );
    parts.push(role.detail);
    section("Jak wygląda praca", role.duties.join(" ") + "\n\n" + scope + mandate);
    parts.push(expectations.join(" "));
    section("Ustalenia i kolejny krok", terms + "\n\n" + recruiting);
  } else if (variant === 4) {
    section("Dlaczego otwieramy tę rolę", opening + "\n\n" + context);
    section(
      "Projekt, od którego zaczniesz",
      "Pierwszy temat to " + role.project + ".\n\n" + role.detail,
    );
    section("Codzienna praca", bullets(role.duties));
    section("Poziom i zakres decyzji", scope + mandate);
    section(
      "Pierwsze tygodnie",
      "1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.\n2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.\n3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.",
    );
    section("Doświadczenie i umiejętności", bullets(expectations));
    section(
      "Współpraca z zespołem",
      "Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.",
    );
    section(
      "Warunki i organizacja",
      terms +
        "\n\nSpotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.",
    );
    section("Przebieg rekrutacji", recruiting);
  } else {
    parts.push(
      "Na początek: " +
        role.project +
        ". To pierwszy projekt na stanowisku " +
        job.title +
        " w firmie " +
        job.company_name +
        ".",
    );
    section(
      "Od czego zaczniemy",
      "1. Poznanie procesu i przygotowanie punktu odniesienia.\n2. Ograniczony eksperyment i omówienie wyników.\n3. Decyzja o dalszych pracach wspólnie z zespołem.\n\n" +
        role.detail,
    );
    section("Co jest w Twoim zakresie", bullets(role.duties) + "\n\n" + scope);
    section("Dobra współpraca", expectations.join(" ") + "\n\n" + context);
    parts.push(terms + "\n\n" + shortRecruiting);
  }
  return {
    variant: ["compact", "classic", "technical", "narrative", "extended", "project-first"][variant],
    description: parts.join("\n\n"),
  };
}
