export type CopyJob = {
  id: string;
  title: string;
  category: string;
  function: string;
  seniority: string;
  company_name: string;
  location: string;
};

const projects = [
  "wybranie pierwszego zastosowania AI w procesie i ustalenie, czy warto je wdrażać",
  "wyszukiwanie odpowiedzi w dokumentacji z oceną trafności i cytowaniem źródeł",
  "zaprojektowanie interfejsu, w którym użytkownik może poprawić lub odrzucić sugestię AI",
  "skrócenie ręcznego przekazywania zgłoszeń między operacjami a obsługą klienta",
  "porównanie modelu predykcyjnego z obecną regułą biznesową na oddzielnym zbiorze testowym",
  "sprawdzenie, czy personalizacja komunikacji zwiększa liczbę kwalifikowanych rozmów",
  "uruchomienie monitorowania jakości, kosztu i opóźnień wspólnej usługi modeli",
  "zbadanie, kiedy użytkownicy przestają ufać automatycznej rekomendacji",
  "uporządkowanie definicji metryk i przygotowanie wiarygodnego zbioru do eksperymentu",
  "wybranie procesu do pilota i uzgodnienie właścicieli zmiany z dwoma działami",
  "ustalenie, na którym etapie użytkownicy porzucają nowy produkt",
  "opracowanie zasad tworzenia i redakcyjnej weryfikacji treści wspomaganych przez AI",
  "przygotowanie powtarzalnego pipeline'u danych i wdrożenia modelu",
  "połączenie dwóch API z kolejką zadań, obsługą błędów i ręczną ścieżką awaryjną",
  "zaprojektowanie dialogu, który oddaje rozmowę człowiekowi przy niepewnej odpowiedzi",
  "doprowadzenie ograniczonego pilota do odbioru przez właściciela procesu",
  "ustalenie kolejności prac i warunków akceptacji pierwszego przyrostu produktu",
  "automatyzacja jednego scenariusza komunikacji z możliwością wycofania zmiany",
  "budowa testów regresji, które wykrywają odpowiedzi poprawne językowo, ale błędne merytorycznie",
  "przygotowanie raportu łączącego wynik operacyjny z jakością danych źródłowych",
];

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

const skills: Record<string, string[]> = {
  product: [
    "Prowadzisz discovery i potrafisz odróżnić potrzebę użytkownika od zamówienia na funkcję.",
    "Ustalasz kryteria decyzji i dokumentujesz, co zmieniło się po eksperymencie.",
    "Rozmawiasz z inżynierami o koszcie, jakości i ograniczeniach rozwiązania.",
  ],
  engineering: [
    "Integrujesz API i budujesz obsługę błędów, testy oraz obserwowalność.",
    "Potrafisz utrzymać usługę po wdrożeniu, nie tylko pokazać działający prototyp.",
    "Oceniasz odpowiedzi modeli na przykładach i kontrolujesz koszt oraz opóźnienie.",
  ],
  data: [
    "Pracujesz z SQL i Pythonem oraz sprawdzasz jakość danych przed modelowaniem.",
    "Rozdzielasz dane treningowe, testowe i pomiar po wdrożeniu.",
    "Wyjaśniasz niepewność wyniku osobie, która podejmuje decyzję biznesową.",
  ],
  design: [
    "Projektujesz stany błędu, korekty i przekazania decyzji użytkownikowi.",
    "Prowadzisz badania i testy prototypów, a wnioski wiążesz z obserwacją.",
    "Potrafisz omówić własną decyzję projektową i jej konsekwencje.",
  ],
  marketing: [
    "Projektujesz eksperymenty komunikacyjne z mierzalnym celem i grupą odniesienia.",
    "Oceniasz jakość kontaktów i efekt kampanii, nie tylko liczbę kliknięć.",
    "Weryfikujesz treści generowane przez modele przed ich publikacją.",
  ],
  operations: [
    "Rozpisujesz przebieg procesu, wyjątki i odpowiedzialność za zmianę.",
    "Wdrażasz rozwiązanie z lokalnym zespołem i sprawdzasz jego rzeczywiste użycie.",
    "Potrafisz zatrzymać automatyzację, gdy pogarsza jakość lub przenosi koszt na inny zespół.",
  ],
};

const teamContexts = [
  "Pracujesz z właścicielem procesu i jednym inżynierem. Dostęp do danych uzgadniamy przed startem; nie zakładamy, że nowa osoba sama pozyska wszystkie zgody.",
  "Zespół łączy produkt, operacje i inżynierię. Część rozwiązań działa już u użytkowników, dlatego nowy pilot musi współistnieć ze starszym procesem.",
  "Do projektu przypisano analityka oraz przedstawiciela zespołu użytkowników. Decyzje zapisujemy w krótkich notatkach wraz z odrzuconymi opcjami.",
  "To mały zespół w fazie pilota. W pierwszym miesiącu ważniejsze od liczby wdrożonych funkcji będzie ustalenie, co umiemy wiarygodnie sprawdzić.",
  "Współpracujesz z dwoma działami o różnych potrzebach. Uzgodnienia dotyczące budżetu, bezpieczeństwa i dostępu do danych mają wskazanych właścicieli.",
];

export function marketplaceCopy(job: CopyJob) {
  if (!/^a2000000-0000-4000-8000-\d{12}$/.test(job.id))
    throw new Error("Reserved fixture job required");
  const number = Number(job.id.slice(-12));
  if (number < 1 || number > 100) throw new Error("Fixture number out of range");
  const variant = (number - 1) % 5;
  const project = projects[(number - 1) % projects.length];
  const expectations = skills[job.function];
  if (!expectations) throw new Error("Unknown fixture function");
  const mandate =
    job.category === "build"
      ? "Odpowiadasz za własny komponent, jego ewaluację i utrzymanie. Wybierasz implementację w ramach istniejącej usługi; zmiany architektury uzgadniasz z zespołem."
      : job.category === "lead"
        ? "Odpowiadasz za kolejność inicjatyw i kryteria ich oceny. Sponsor zatwierdza zwiększenie budżetu oraz zmianę zakresu; nie przekazujemy Ci nieograniczonego mandatu do reorganizacji firmy."
        : "Odpowiadasz za zmianę jednego kroku pracy i sprawdzenie adopcji w swoim zespole. Uzgodnienia między działami prowadzi właściciel procesu.";
  const expectationsText = expectations.map((item) => "- " + item).join("\n");
  const seniorityScope = (
    {
      junior:
        "Na poziomie junior pracujesz z opiekunem; wspólnie przeglądacie plan i decyzje przed wdrożeniem.",
      mid: "Samodzielnie prowadzisz uzgodniony zakres, a decyzje wykraczające poza projekt konsultujesz z właścicielem procesu.",
      senior:
        "Oczekujemy doświadczenia z utrzymaniem wdrożonego rozwiązania i umiejętności oceny kompromisów, nie wyłącznie budowy prototypu.",
      lead: "Koordynujesz pracę i uzgodnienia zespołu. Decyzje o zmianie budżetu i zobowiązaniach innych działów pozostają po stronie sponsora.",
    } as Record<string, string>
  )[job.seniority];
  if (!seniorityScope) throw new Error("Unknown fixture seniority");
  const responsibility = mandate + " " + seniorityScope;
  const sections: string[] = [];
  const section = (title: string, body: string) => sections.push("### " + title + "\n\n" + body);
  section(
    variant === 3 ? "Dlaczego szukamy tej osoby" : "O firmie",
    job.company_name +
      " rozwija zastosowania AI w codziennej pracy zespołów. Szukamy osoby na stanowisko " +
      job.title +
      "." +
      (variant === 0 ? " Punkt wyjścia to " + project + "." : ""),
  );
  if (variant === 0) {
    section("Zakres odpowiedzialności", responsibility);
    section("Oczekiwania", expectationsText);
    section(
      "Proces rekrutacji",
      "Krótka rozmowa o warunkach, potem omówienie jednego projektu. Przygotuj przykład swojej decyzji i wyniku; nie przesyłaj poufnych materiałów klienta.",
    );
  } else {
    section(
      "Pierwszy projekt",
      "Pierwsze zadanie to " +
        project +
        ". Zaczynamy od jednego zespołu w " +
        job.location +
        ", nie od wdrożenia w całej organizacji. Przed wyborem rozwiązania sprawdzimy punkt odniesienia, dostępność danych i przypadki, których nie warto automatyzować.",
    );
    section("Decyzje i odpowiedzialność", responsibility);
    if (variant !== 3)
      section(
        "Zakres odpowiedzialności",
        "- Uzgodnisz z właścicielem procesu problem oraz kryterium odbioru.\n- Przygotujesz mały eksperyment i opiszesz jego ograniczenia.\n- Sprawdzisz wynik z użytkownikami, a nie wyłącznie na przygotowanych przykładach.\n- Zostawisz zrozumiałą dokumentację i plan reakcji na błędy.",
      );
    section("Zespół i współpraca", teamContexts[(number - 1) % teamContexts.length]);
    section(
      "Oczekiwania",
      expectationsText +
        (variant >= 2
          ? "\n- Umiesz wskazać, za co odpowiadał ktoś inny i jakiego wyniku nie da się przypisać Twojej pracy.\n- Potrafisz pracować na przykładach zastępczych, jeśli materiały źródłowe są poufne."
          : ""),
    );
    if (variant >= 2) {
      section(
        "Pierwsze 90 dni",
        "1. W pierwszych dwóch tygodniach poznasz użytkowników, obecny proces i sposób pomiaru. Uzgodnisz dostęp do materiałów oraz warunki zatrzymania pilota.\n2. Do końca pierwszego miesiąca przygotujesz punkt odniesienia i prototyp dla ograniczonego scenariusza. Zapiszesz założenia, które wciąż wymagają sprawdzenia.\n3. W kolejnych tygodniach zbierzesz wyniki z małej grupy użytkowników. Na koniec wspólnie zdecydujemy, czy rozwiązanie rozwijać, zmienić, czy wyłączyć.",
      );
      section(
        "Jak mierzymy sukces",
        "Przed startem ustalimy jedną miarę efektu procesu oraz osobne wskaźniki jakości i kosztu. Liczba wygenerowanych odpowiedzi nie jest naszym celem. Porównamy wynik z obecną metodą, uwzględnimy ręczne poprawki i sprawdzimy, czy korzyść jednego zespołu nie oznacza dodatkowej pracy dla drugiego.",
      );
    }
    if (variant === 4) {
      section(
        "Dane i ograniczenia",
        "Materiały testowe są dostępne, ale dostęp do danych klientów wymaga zgody właściciela. Nie wklejamy danych poufnych do publicznych narzędzi. W ewaluacji rozdzielamy przykłady użyte przy budowie rozwiązania od zestawu kontrolnego.\n\nNie oczekujemy pełnej automatyzacji. Dla przypadków o wysokim ryzyku zostaje kontrola człowieka i możliwość powrotu do wcześniejszego procesu. Ocenimy też, co dzieje się przy niedostępności modelu, przekroczeniu kosztu lub zmianie danych wejściowych.",
      );
      section(
        "Co oferujemy",
        "W pilocie otrzymasz wsparcie właściciela procesu i czas na uporządkowanie pomiaru. Zakres pierwszego zadania jest ograniczony, a decyzja o jego rozszerzeniu zapadnie po przeglądzie wyników.\n\nWarunki finansowe, tryb pracy i forma współpracy są podane w panelu oferty. Nie obiecujemy swobody w obszarach, które zależą od innych działów. Możesz natomiast proponować zmianę metody i jasno wskazywać, kiedy problem nie wymaga użycia AI.",
      );
    }
    section(
      "Proces rekrutacji",
      variant === 1
        ? "Najpierw uzgodnimy warunki współpracy. Następnie porozmawiasz z osobą prowadzącą projekt o jednym przykładzie wcześniejszej pracy."
        : "1. Krótka rozmowa o oczekiwaniach i warunkach współpracy.\n2. Omówienie jednego projektu: kontekstu, Twojej odpowiedzialności, decyzji i rezultatu. Poufne pliki możesz zastąpić opisem.\n3. Rozmowa z zespołem o pierwszym zadaniu i granicach jego zakresu. Nie wymagamy bezpłatnej pracy nad rzeczywistym zadaniem klienta.",
    );
  }
  return {
    variant: ["compact", "standard", "detailed", "narrative", "extended"][variant],
    description: sections.join("\n\n"),
  };
}
