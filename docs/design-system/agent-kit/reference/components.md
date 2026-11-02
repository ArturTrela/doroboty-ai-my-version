# DoRoboty.ai — dokumentacja systemu interfejsu

**v1 · 2 listopada 2026 · dokumentacja dla designerów · do oceny**

Aktualna rodzina ekranów: plakatowy job board, papierowe tło, białe powierzchnie z cienkim konturem, duże zaokrąglenia, różowe działania i nagłówki Geist Serif. Dokument opisuje istniejący prototyp: listing i pełną stronę oferty. Nie jest specyfikacją nieznanej biblioteki ani deklaracją gotowości produkcyjnej.

## Jak korzystać

Wybierz rodzinę w indeksie. Karta pokazuje przeznaczenie, anatomię, warianty, cechy konfigurowalne, style, wymiary, typografię, zachowanie, praktyki, dostępność i źródła. Każdy numer S prowadzi do zachowanego zrzutu; A wskazuje uzupełniającą adnotację z aktualnej implementacji. Nazwy rodzin C01–C22 są **nazwami roboczymi dokumentacji**, a nie nazwami istniejących komponentów w narzędziu projektowym.

### Legenda dowodów

| Oznaczenie | Znaczenie |
| --- | --- |
| **[P] Potwierdzone** | Widoczne na wskazanym obrazie albo jawnie określone we wskazanej adnotacji. Obraz dowodzi wyglądu; zachowanie opisujemy z zaobserwowanej interakcji lub źródła A. |
| **[S] Szacunek z obrazu** | Przybliżenie z bitmapy. W tej wersji nie ustalamy tokenów przez próbkowanie bitmap; dokładne liczby pochodzą z A01–A06. |
| **[R] Rekomendacja** | Proponowana zasada, model konfiguracji lub cel. Nie jest zatwierdzonym standardem zespołu. |
| **[?] Do potwierdzenia** | Konkretna luka albo decyzja projektowa bez wystarczającego dowodu. |
| **[T] Do testu we wdrożeniu** | Test zachowania, technologii asystującej albo warunków nieweryfikowanych w tym opracowaniu. |

Typy cech w kartach są **proponowanym modelem dla designerów [R]**. Same pokazane wartości są [P]. To nie publiczne API. „Brak ustalonej wartości domyślnej” oznacza brak specyfikacji systemowej; nie odbiera materiałom statusu dowodu wyglądu.

## Zakres i źródła

**Pokrycie: 19/19 zebranych zrzutów, 2 ekrany produktowe, 22 rodziny.** Przeanalizowano również aktualne deklaracje stylów i zachowań A01–A06. Zakres obejmuje 24 przykładowe oferty, 2 strony wyników, filtry, zapisanie, brak wyników/danych, długi tytuł, nieprawidłowy adres, okna oraz focus. Nie obejmuje konta, edytora oferty, realnej aplikacji, zaplecza, trybu ciemnego, kompletnej biblioteki ikon ani wszystkich kombinacji stanów.

Baza implementacji: commit `6f1cd9e6980f40546d80732e228f39d2ad89fc3a`. Dokumentacja nie zmienia aplikacji. Wcześniejsze zrzuty bez Serif, małe promienie oraz dawny modal szczegółów są historią i nie definiują tej wersji.

### Materiały wizualne

| ID | Materiał i stan | Viewport CSS | Rodzaj zrzutu |
| --- | --- | --- | --- |
| <a id="s01"></a>[S01](evidence/S01.jpg) | Listing — wszystkie oferty, desktop | 1280×720 | Pełna strona |
| <a id="s02"></a>[S02](evidence/S02.jpg) | Listing — wszystkie oferty, mobile | 390×844 | Pełna strona |
| <a id="s03"></a>[S03](evidence/S03.jpg) | Pełna oferta — desktop | 1280×720 | Pełna strona |
| <a id="s04"></a>[S04](evidence/S04.jpg) | Pełna oferta — mobile | 390×844 | Pełna strona |
| <a id="s05"></a>[S05](evidence/S05.jpg) | Wybrana kategoria, checkbox i aktywny filtr | 1280×720 | Pełna strona |
| <a id="s06"></a>[S06](evidence/S06.jpg) | Brak wyników wyszukiwania | 1280×720 | Pełna strona |
| <a id="s07"></a>[S07](evidence/S07.jpg) | Zapisana karta i komunikat potwierdzenia | 1280×720 | Pełna strona |
| <a id="s08"></a>[S08](evidence/S08.jpg) | Pusta lista zapisanych ofert | 1280×720 | Pełna strona |
| <a id="s09"></a>[S09](evidence/S09.jpg) | Mobilne filtry — górna część i wybrany checkbox | 390×844 | Viewport |
| <a id="s10"></a>[S10](evidence/S10.jpg) | Okno informacji o demonstracji | 1280×720 | Viewport |
| <a id="s11"></a>[S11](evidence/S11.jpg) | Okno aplikowania w demonstracji | 1280×720 | Viewport |
| <a id="s12"></a>[S12](evidence/S12.jpg) | Nieprawidłowy adres oferty | 1280×720 | Viewport |
| <a id="s13"></a>[S13](evidence/S13.jpg) | Długi tytuł i inicjały firmy — mobile | 390×844 | Pełna strona |
| <a id="s14"></a>[S14](evidence/S14.jpg) | Brak wynagrodzenia — mobile | 390×844 | Pełna strona |
| <a id="s15"></a>[S15](evidence/S15.jpg) | Focus klawiatury — pole lokalizacji | 1280×720 | Viewport |
| <a id="s16"></a>[S16](evidence/S16.jpg) | Mobilne filtry — pole wynagrodzenia i dolna akcja | 390×844 | Viewport |
| <a id="s18"></a>[S18](evidence/S18.jpg) | Druga strona wyników i niedostępna następna strona | 1280×720 | Pełna strona |
| <a id="s19"></a>[S19](evidence/S19.jpg) | Profil firmy i ilustracja po przewinięciu | 1280×720 | Viewport |
| <a id="s20"></a>[S20](evidence/S20.jpg) | Potwierdzenie zapisu — rzeczywisty viewport | 1280×720 | Viewport |

Rozmiary viewportów pochodzą z pomiaru przeglądarki, a nie szerokości bitmap. Zrzuty „pełna strona” obejmują treść poniżej ekranu; stałe elementy, np. toast, mogą w takim eksporcie trafić na dół całej bitmapy. Rzeczywistą pozycję toastu pokazuje S20. S03/S04 wykonano przed doładowaniem ilustracji firmy przy przewinięciu — jej widoczny wariant potwierdza S19. Materiały pozostawiono bez retuszu.

### Uzupełniające adnotacje

| ID | Materiał | Co potwierdza |
| --- | --- | --- |
| <a id="a01"></a>A01 | `dist/assets/tokens.css` | Istniejące nazwy zmiennych, kolory, promienie i rodziny fontów. |
| <a id="a02"></a>A02 | `dist/assets/styles.css` | Dokładne reguły listingu, formularzy, stanów, dialogów i breakpointów. |
| <a id="a03"></a>A03 | `dist/assets/offer.css` | Reguły strony oferty, panelu, treści i profilu firmy. |
| <a id="a04"></a>A04 | `dist/assets/ui.js` | Anatomia wspólnej karty, format wynagrodzenia, inicjały i linki do oferty. |
| <a id="a05"></a>A05 | `dist/index.html`, `dist/assets/app.js` | Etykiety, wartości filtrów, stan początkowy demonstracji, wyszukiwanie, paginacja, zapis i walidacja. |
| <a id="a06"></a>A06 | `dist/oferta.html`, `dist/assets/offer.js` | Sekcje roli, warianty braku danych, udostępnianie, powrót i ograniczenia aplikowania. |

Pliki A znajdują się w istniejącym projekcie `sites/doroboty-poster-listing`, obok katalogu dokumentacji w tej samej przestrzeni rozmowy. Manifest dowodów zawiera metadane obrazów, a `evidence/source-revisions.json` — sumy kontrolne czytanych plików. Kod aplikacji nie jest dołączonym fundamentem komponentów.

## Indeks i zależności

| Rodzina — nazwa robocza | Decyzja projektowa / karta |
| --- | --- |
| [C01 · Przyciski i linki działań](#c01) | Wybierz różowy przycisk dla głównej akcji zadania, biały z obrysem dla działania uzupełniającego, tekstowy dla cichej czynności. |
| [C02 · Pole tekstowe i liczbowe](#c02) | Pole tekstowe służy zapytaniu, liczbowe dolnej granicy widełek. |
| [C03 · Select lokalizacji i sortowania](#c03) | Używaj dla jednego wyboru z zamkniętej listy. |
| [C04 · Checkbox i grupa wyboru](#c04) | Wybieraj dla niezależnych warunków lub kilku wartości w jednej grupie. |
| [C05 · Selektor kategorii](#c05) | Służy do zmiany obszaru ofert w tym samym zbiorze. |
| [C06 · Chip aktywnego filtra](#c06) | Pokazuje zastosowane kryterium i pozwala je pojedynczo usunąć. |
| [C07 · Etykiety faktów, umiejętności i liczniki](#c07) | Używaj dla informacji, nie działania: płaca, kompetencje, kategoria obiektu, liczba wyników. |
| [C08 · Identyfikacja firmy i profil skrócony](#c08) | Łączy znak z nazwą organizacji. |
| [C09 · Karta oferty i powtarzany zbiór](#c09) | Wybieraj do porównywania tekstowych ofert. |
| [C10 · Paginacja](#c10) | Pozwala przechodzić między częściami zbioru. |
| [C11 · Nagłówek globalny](#c11) | Utrzymuje tożsamość oraz przejście do ofert i zapisanych. |
| [C12 · Stopka](#c12) | Kończy stronę i utrzymuje informację o demonstracji. |
| [C13 · Nawigacja kontekstowa](#c13) | Wybierz powrót do wyników przy zmianie strony, a kotwice przy poruszaniu się wewnątrz opisu. |
| [C14 · Pasek wyszukiwania](#c14) | Łączy frazę i lokalizację w jedno wyszukanie. |
| [C15 · Panel filtrów](#c15) | Stosuj do niezależnego doprecyzowania listingu. |
| [C16 · Wejście z ilustracją](#c16) | Używaj raz do orientacji na początku listingu. |
| [C17 · Pusty wynik i odzyskanie kontekstu](#c17) | Używaj, gdy nie ma elementów do pokazania, z powodem i działaniem naprawczym. |
| [C18 · Dialog informacyjny i filtry mobilne](#c18) | Wybieraj dla krótkiej informacji lub tymczasowego mobilnego zadania filtracji. |
| [C19 · Toast i komunikat statusu](#c19) | Potwierdza krótką, zakończoną czynność bez zatrzymywania zadania. |
| [C20 · Nagłówek pełnej oferty](#c20) | Służy natychmiastowemu rozpoznaniu roli i firmy. |
| [C21 · Panel warunków i działań](#c21) | Grupuje fakty potrzebne do decyzji i następny krok. |
| [C22 · Sekcja treści, benefity i proces](#c22) | Porządkuje dłuższą lekturę oferty. |

**Zależności [R, mapa dokumentacyjna]:** pasek wyszukiwania = pole + select + przycisk. Panel filtrów = checkboxy + pole liczbowe + działanie czyszczenia; mobilnie znajduje się w dialogu. Karta oferty = identyfikacja firmy + tytuł/link + fakty + etykiety + zapis. Panel warunków = wynagrodzenie + lista faktów + przyciski. Lista „Może też Cię zainteresować” ponownie używa karty oferty; nie tworzy odrębnej rodziny karty.

<a id="foundations"></a>
## Fundamenty i zasady wspólne

**Notacja:** 28/400 oznacza 28 CSS px i weight 400; interlinia 1.12 jest mnożnikiem, r24 oznacza promień 24 px. Padding 11×17 to pion / poziom; zapis czterech wartości zachowuje kolejność CSS: góra, prawo, dół, lewo.

### Kierunek

**[P, S01–S04; A01–A03]** Nagłówki są szeryfowe; tekst roboczy pozostaje bezszeryfowy. Kontur ma przeważnie 1 CSS px. Wynagrodzenie dostaje jasny róż, działanie — intensywniejszy róż, wybór filtra — ciemne wypełnienie. Białe powierzchnie odcinają się od papieru. Ilustracja nie powtarza się w każdej ofercie. Żółty występuje w ilustracji i niektórych znakach firm.

**[R]** Najpierw uczyń czytelnymi stanowisko, firmę i warunki. Używaj ekspresji na wejściu, a powtarzane fakty układaj stabilnie. Nie interpretuj różowego wynagrodzenia jako przycisku. Nie dodawaj ocen, rabatów czy presji czasu na podstawie podobieństwa do marketplace'u.

### Kolory — istniejące zmienne [P, A01]

| Rola | Istniejąca nazwa | Wartość | Zastosowanie widoczne w materiale |
| --- | --- | --- | --- |
| Papier | `--paper` | `#f4f4f0` | Tło stron, część wnętrza dialogu, neutralne oznaczenia. |
| Powierzchnia | `--surface` | `#ffffff` | Karty, nagłówek, formularze, panel działań. |
| Tusz | `--ink` | `#181818` | Nagłówki, tekst, obrys, wybrany filtr. |
| Tekst pomocniczy | `--muted` | `#5e5a5c` | Metadane, opisy, nazwy faktów. |
| Podział | `--line` | `#d8d5d1` | Wewnętrzne separatory i obrysy nieinteraktywnych tagów. |
| Działanie | `--action` | `#ff90e8` | Główne CTA, akcent wejścia i zapisanej zakładki. |
| Hover działania | `--action-hover` | `#ffacef` | Hover przycisku głównego, opisany w A02. |
| Wyróżniony fakt | `--fact` | `#ffe0f7` | Wynagrodzenie, wybrane tła pomocnicze. |
| Żółty | `--yellow` | `#ffe45b` | Ilustracja, znaki LL/PP/PZ w przykładach. |
| Hover karty | `--surface-hover` | `#fffefa` | Subtelna zmiana głównej powierzchni karty, A02. |

Wybranie używa `--ink` i bieli, nie osobnego tokenu „selected”. Błąd, ostrzeżenie i sukces nie mają w A01 osobnych kolorów semantycznych **[?]**. Nie dopisujemy ich jako istniejących tokenów. Wszystkie materiały pokazują tryb jasny; ciemny pozostaje poza zakresem.

### Geometria, kontur, ikony [P, A01–A03]

| Element | Potwierdzona wartość | Nazwa / granica zastosowania |
| --- | --- | --- |
| Mniejszy promień | 10 px | `--radius-small`: tagi, chipy i część liczników. |
| Domyślny promień | 18 px | `--radius`: przyciski, panel filtrów, część małych powierzchni. |
| Większy promień | 24 px | `--radius-large`: karta, search, dialog, nagłówek oferty i panel warunków. |
| Pastylka | 999 px | Wartość lokalna: wynagrodzenie, kategoria i umiejętności na pełnej ofercie. Nie jest nazwaną zmienną. |
| Wyjątki | 3 / 5 / 8 / 14 / 16 px | Lokalnie: sygnet i kreski, checkbox, podkreślenie wejścia, niektóre znaki i opisy. Nie są automatycznie skalą tokenów. |
| Obrys | Zwykle 1 px, bez offsetowego cienia | `--ink` dla głównych granic; `--line` dla podziałów. |
| Focus | Obrys 3 px, odsunięcie 4 px | Reguła `:focus-visible`, A02; widoczna w S15/S16. Nie zaokrągla każdej kontrolki identycznie. |
| Ikony | Bazowy viewBox 24×24; obrys 1.65; różne wymiary 12–28 px | A04 zawiera ograniczony zestaw liniowych symboli. To nie pełna zewnętrzna biblioteka. |

**[R]** Zachowuj rodzinę trzech głównych promieni, lecz lokalne wyjątki dokumentuj jawnie. Nie nazywaj każdego odstępu tokenem: A01 nie zawiera skali spacingu. Często powtarzają się 6, 8, 12, 16, 20, 24, 28, 32 i 36 px, ale to deklaracje lokalne A02/A03.

### Typografia [P, A01–A03]

`--font-heading`: **Geist Serif, Regular 400**, lokalny plik `GeistSerif-Regular.woff2`, bez syntetycznego pogrubienia. Dotyczy wszystkich H1–H6. `--font`: **Arial, Helvetica, system-ui, sans-serif** — to stos fontów dla treści, nie Geist Sans. Wartości 600/650/700 niżej są deklaracjami CSS; nie dowodzą osobnych plików fontu.

| Rola i selektor | Desktop bazowy | Mobile | Interlinia / tracking | Źródło / uwaga |
| --- | --- | --- | --- | --- |
| Wejście listingu `.intro-copy h1` | 72 px / 400 | 43 px / 400 przy ≤600 | 1.02 / −2.5 px; mobile 1.04 / −2 px | S01/S02, A02. Progi pośrednie: 58 px ≤1100; 52 px ≤850. |
| Tytuł karty `.job-title` | 28 px / 400 | 26 px / 400 przy ≤600 | 1.12 / −0.5 px; mobile 1.13 / −0.4 px | A02: 26 px dla 851–1100; ponownie 28 px dla 601–850. Nie ujednolicono tego w dokumentacji. |
| Tytuł pełnej oferty `.offer-hero h1` | 64 px / 400 | 47 px / 400 przy ≤700 | 1.04 / −2 px; mobile 1.06 / −1.5 px | A03: 54 px ≤1100; 46 px dla 701–850. |
| Nagłówek wyników | 32 px / 400 | 30 px / 400 | 1.2 / −1 lub −0.8 px | A02. |
| Sekcja opisu oferty H2 | 36 px / 400 | 33 px / 400 ≤700 | 1.12 / −1 lub −0.7 px | A03; 32 px w paśmie 701–850. |
| Podtytuł opisu H3 | 27 px / 400 | 26 px / 400 | 1.2 / −0.6 px bazowo | A03. Benefity mają własny H3 24 px; etapy rekrutacji 25 px. |
| Lead oferty | Arial 21 px | 20 px ≤700 | 1.5 / −0.2 px | A03; 19 px dla 701–850. |
| Akapit / lista oferty | Arial 15 px | 15 px ≤700 | 1.85 akapit; 1.8 lista; mobile 1.8 | A03; 14 px dla 701–850. |
| Tytuł firmy na karcie | Arial 12 px / 500 | 11 px | 1.5 | A02; nie jest nagłówkiem H. |
| Fakty karty | Arial 13 px | 12 px | 1.5 | A02. |
| Główny przycisk | Arial 14 px / 600 | Zależny od kontekstu: 12–14 px | Dziedziczona 1.5 | A02/A03. Nie ma jednego mobilnego rozmiaru. |
| Opisy i metadane | Arial 9–13 px | 9–12 px | 1.5–1.75 zależnie od roli | Dokładne wartości w kartach. **[R]** Rozważyć zwiększenie najdrobniejszych tekstów. |

Nie ustanowiono nazwanych stylów typu „Heading/L”. Nazwy ról powyżej są dokumentacyjnymi opisami. Nie ma potwierdzonych wariantów kursywy, innych wag Serif, RTL ani innego języka UI niż polski z angielskimi nazwami zawodów i umiejętności.

### Układ i responsywność [P, A02/A03]

| Warunek | Co rzeczywiście zmienia implementacja |
| --- | --- |
| Bazowo >1100 px | Kontener `min(1280px, 100% − 80px)`; listing: filtry 245 px, odstęp do wyników 32 px. Oferta: kolumna boczna 350 px i gap 28 px. |
| ≥1600 px | Kontener dostaje max-width 1340 px, ale nadal działa jego bazowe `width:min(1280px, …)`. Sama deklaracja max-width nie rozszerza go ponad 1280 px. |
| ≤1100 px | Marginesy kontenera po 24 px; filtry 218 px i gap 24 px; boczny panel oferty 310 px. |
| ≤850 px | Filtry listingu znikają z kolumny; pojawia się otwarcie dialogu. Panel oferty nadal boczny, 285 px. |
| ≤700 px — oferta | Kolejność: tytuł → warunki i działania → opis → firma. Panel przestaje być sticky. |
| ≤600 px — wspólne / listing | Marginesy po 18 px, header 72 px, ukryte środkowe menu; karty jednokolumnowe z dolnym pasem; kategorie przewijane poziomo. |

To progi zapisane w kodzie, nie ustalone przez analizę dwóch bitmap. Pokazano aktualne viewporty 1280×720 i 390×844. Szersze stany, 320 CSS px, zoom 200/400%, zmienione odstępy tekstu i długie tłumaczenia pozostają **[T]**. Istniejący zapis wcześniejszych testów 650/1422 px nie zastępuje pełnego testu reflow.

<a id="accessibility"></a>
## Dostępność — wspólne odniesienia

**[R] Cel: WCAG 2.2 AA dla webu.** Nie jest to deklaracja zgodności prototypu. Zdjęcia ekranów, liczby CSS i wcześniejsze smoke testy nie zastępują audytu. W tym opracowaniu obejrzano focus, przełączenia i otwarte dialogi; nie przeprowadzono testu czytnikiem ekranu.

### A11y-1 · Kolor i czytelność

[WCAG 1.4.3, AA](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): co najmniej 4.5:1 dla zwykłego tekstu; 3:1 dla dużego, czyli od 18 pt regular lub 14 pt bold. Są wyjątki m.in. dla logotypów i tekstu nieaktywnych kontrolek. [1.4.11, AA](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) dotyczy informacji potrzebnej do rozpoznania kontrolki/stanu wobec sąsiednich kolorów; nie nakazuje obrysu każdej kontrolki.

Obliczenia własne z dokładnych kolorów A01: liniowa luminancja sRGB i `(Ljaśniejsze+0.05)/(Lciemniejsze+0.05)`. Brak próbkowania antyaliasowanych pikseli. Wyniki dotyczą par, nie całego komponentu, przezroczystych stanów ani zgodności produktu.

| Para | Stosunek, zaokrąglony wyłącznie do prezentacji | Wniosek projektowy |
| --- | --- | --- |
| `--ink` / biel | 17.76:1 | [P, obliczenie] Dobra baza dla tekstu i obrysu. |
| `--muted` / biel | 6.79:1 | [P] Przekracza 4.5:1 w stanie pełnej opacity. |
| `--muted` / papier | 6.16:1 | [P] Jak wyżej; nie potwierdza czytelności tekstu 9 px. |
| `--ink` / róż działania | 8.80:1 | [P] Zachowuj ciemną etykietę CTA. |
| Biel / róż działania | 2.02:1 | [P] Nie wystarcza dla zwykłego ani dużego tekstu według 1.4.3. |
| `--ink` / róż faktu | 14.59:1 | [P] Wyraźne wynagrodzenie. |
| `--muted` / róż faktu | 5.58:1 | [P] Pomocniczy tekst zachowuje próg 4.5:1. |
| `--line` / biel | 1.46:1 | [P] Linia dekoracyjna nie jest równoznaczna z obrysem kontrolki. Nie używaj jej jako jedynego potrzebnego sygnału interakcji. |

### A11y-2 · Cele, klawiatura i focus

[2.5.8, AA](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) wymaga celu 24×24 CSS px lub spełnionego wyjątku: odstępy, równoważny cel, tekst inline, niezmieniona kontrolka przeglądarki, niezbędność. Dla małych celów wyjątek odstępu bada okręgi średnicy 24 px; sam rozmiar ikonki nie wystarcza. Zaokrąglony cel również wymaga oceny, czy mieści kwadrat 24×24. **[R]** Dla częstych działań na telefonie preferować obszar co najmniej 44×44; nie przedstawiać tego jako minimum AA.

[Zestaw kryteriów WCAG](https://www.w3.org/WAI/WCAG22/quickref/): 2.1.1 i 2.1.2 (A) — klawiatura bez pułapki; 2.4.7 (AA) — widoczny focus. [2.4.11, AA](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) wymaga, by focus nie był całkowicie zasłonięty treścią autora. **[T]** Sprawdzić dialog, sticky panel, chipy i poziomy rząd kategorii. APG jest wskazówką interakcji, a nie normatywnym kryterium WCAG.

### A11y-3 · Struktura i treść

[WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/): 1.1.1 (A) — alternatywy grafik; 1.3.1/1.3.2 (A) — relacje i kolejność; 2.4.6 (AA) — opisowe nagłówki/etykiety; 3.3.1/3.3.2 (A) i 3.3.3 (AA) — rozpoznanie błędu, instrukcje i wskazówki naprawy; 4.1.2 (A) — nazwa, rola i wartość. **[T]** Zweryfikować drzewo dostępności oraz odczyt PL/EN. Nie ukrywać istotnych warunków w samej ilustracji lub ikonie.

### A11y-4 · Reflow i komunikaty

[1.4.10, AA](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html): dla pionowej treści ocenia się szerokość równoważną 320 CSS px, z wyjątkiem treści wymagającej układu dwuwymiarowego. [4.1.3, AA](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html): statusy powinny być programowo dostępne bez przenoszenia na nie focusu. **[T]** Przetestować zoom, etykiety, liczbę wyników i toast w technologiach asystujących; obraz nie dowodzi odczytu `aria-live`.


<a id="c01"></a>
## C01 · Przyciski i linki działań

### Przeznaczenie i wybór

[R] Wybierz różowy przycisk dla głównej akcji zadania, biały z obrysem dla działania uzupełniającego, tekstowy dla cichej czynności. Nawigację realizuje link, nawet gdy wygląda jak przycisk. Ikona bez etykiety jest wariantem oszczędzającym miejsce, a nie domyślnym sposobem oznaczania głównej akcji.

### Anatomia i części

[P] 1. Obszar interakcji [wymagany]. 2. Etykieta tekstowa albo ikona z nazwą dostępną [wymagane alternatywnie]. 3. Ikona kierunku/zakładki [opcjonalna, S01/S03]. 4. Licznik [tylko w działaniach na zapisanych, C11].

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Hierarchia | Primary: różowy + ciemny tekst | Wyszukanie, aplikowanie demo; S01/S03 |
| Hierarchia | Secondary: biel + obrys | Zapisz, powrót, firma; S03/S11 |
| Forma | Tekst / ikona | Wyczyść, udostępnij, zamknij; S05/S10 |
| Stan | Default; opisany hover; focus; zapisany; disabled tylko w paginacji | S15/S20/S18; A02. Loading/pressed chwilowy nie pokazane. |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Etykieta / ikona | tekst / symbol | Zależne od akcji | Brak jednej wartości domyślnej |
| Hierarchia | wybór | primary / secondary / text / icon | Nazwy robocze [R] |
| Stan zapisu | logiczny | niezapisana / zapisana | Początkowo nie, A05/A06; parametry nawigacji mogą przekazać wybór |
| Cel | odsyłacz lub działanie | strona, sekcja, dialog, zmiana stanu | Zgodny z faktyczną funkcją |

### Tokeny i style

[P] `--action`, `--action-hover`, `--surface`, `--ink`, `--fact`; r18 dla `.button`, r10 dla zakładki. Bez cienia; bazowy przycisk ma obrys 1 px, a wariant tekstowy i zakładka nie mają obrysu [A01/A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Bazowe minimum wysokości 44 px; padding 11×17 px i gap 12 px. Search 52 px desktop / 42 px mobile. Oferta 50 px w panelu. Zamknięcie dialogu 36×36 px; zakładka 32×32 desktop / minimum 44×44 mobile. To różne konteksty, nie jedna skala S/M/L [A02/A03].

### Typografia

[P] Arial 14/600 bazowo; search mobile 12, link karty 12/600 desktop i 11/600 mobile; ikony zwykle 16–20 px. Nagłówkowego Serif nie przenosi się na etykiety przycisków [A02/A03].

### Zachowanie, treści i lokalizacja

[P, A05/A06; S11/S20] Zapis zmienia stan i pokazuje toast. Aplikuj otwiera informację demo, nie formularz ani wysyłkę. Brak asynchronicznego loadingu. Długie etykiety mogą zwiększać wysokość; część lokalnych kontrolek ma `nowrap`. RTL [?].

### Zalecane i niewskazane praktyki

Zalecane: „Wyczyść” usuwa kryteria; „Zobacz ofertę” jest linkiem. Niewskazane: różowa pastylka płacy udaje CTA albo sama strzałka zastępuje „Aplikuj”. [R] Zachowuje to przewidywalność celu.

### Dostępność

[T] A11y-1/2/3; [APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) i [Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/). Działanie: Enter/Spacja; link: Enter. Obecny zapis zmienia nazwę razem z `aria-pressed`; model stałej nazwy toggle albo zwykłej zmiennej akcji wymaga decyzji [?]. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01, S03, S10, S11, S15, S18, S20; A02 `.button`, `.save-button`, `.detail-button`; A05/A06.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S03](evidence/S03.jpg), [S10](evidence/S10.jpg), [S11](evidence/S11.jpg), [S15](evidence/S15.jpg), [S18](evidence/S18.jpg), [S20](evidence/S20.jpg).

**[?] Luki:** Loading, błąd działania, ikona+wyłącznie-tooltip i destructive nie zostały pokazane. Nie ustanawiać ich przez analogię do primary.


<a id="c02"></a>
## C02 · Pole tekstowe i liczbowe

### Przeznaczenie i wybór

[R] Pole tekstowe służy zapytaniu, liczbowe dolnej granicy widełek. Dla zamkniętego zbioru lokalizacji wybierz C03, a dla niezależnego warunku C04.

### Anatomia i części

[P] 1. Powiązana etykieta [wymagana w źródle; dla search wizualnie ukryta]. 2. Wartość / placeholder. 3. Lupa i przycisk czyszczenia [search]. 4. Jednostka „zł / mies.” i wskazówka [pole płacy].

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Typ | Search: pusty / wpisany | Lupa, tekst, pojawiający się krzyżyk; S01/S06 |
| Typ | Number: pusty / 18000 | Jednostka i opis; S01/S16 |
| Stan | Focus | Czarny obrys; S16 |
| Stan | Błąd liczby | Opisany natywny `reportValidity`; brak zachowanego widoku błędu, A05 |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Wartość | tekst albo liczba | q; salary | Start pusty, A05 |
| Placeholder | tekst | „Stanowisko, firma lub umiejętność”; „np. 12 000” | Podany w A05 |
| Liczba | ograniczenie | min 0, max 100000, step 1 | To ograniczenia demonstracji, nie ustalony standard płac |
| Pomoc / jednostka | tekst | dolna granica; zł / mies. | Nie są wpisywaną wartością |

### Tokeny i style

[P] Biel/transparentne wnętrze, `--ink`, `--muted`, r18 pola płacy; obrys rodzica search r24. Focus: wspólny obrys 3 px [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Search: 52 px wysokości, lewy padding 49 px desktop; mobile 46 px i 37 px. Liczba: 41 px wysokości, padding lewy 12 px; label nad nią z odstępem 8 px. Nie wyprowadzać wymiaru hit area z samej cyfry [A02].

### Typografia

[P] Arial: search 14 px desktop / 12 mobile; liczba 13; label płacy 11–12, wskazówka 10–11. Unit 10 px. Interlinia bazowa 1.5 [A02].

### Zachowanie, treści i lokalizacja

[P, A05] Samo pisanie q nie filtruje; submit to robi. Krzyżyk czyści q i od razu aktualizuje wynik. Poprawna liczba filtruje na input; puste = brak progu. Dotyczy dolnej, nie górnej granicy widełek. Walidacja jest natywna. Komunikaty błędu i RTL [?].

### Zalecane i niewskazane praktyki

Zalecane: label „Dolna granica widełek od” i osobna jednostka. Niewskazane: placeholder jako jedyna etykieta albo „od 18000” bez wyjaśnienia, którego końca widełek dotyczy filtr [R].

### Dostępność

[T] A11y-2/3/4: label powiązany z kontrolką, opis i błąd czytane razem z polem; naprawa liczby bez utraty wartości. Test przy klawiaturze ekranowej, zoomie i wpisie spoza zakresu. Nie oceniano natywnego dymka błędu. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01, S06, S16; A02 `.search-field input`, `.salary-input`; A05 HTML oraz listenery input/change.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S06](evidence/S06.jpg), [S16](evidence/S16.jpg).

**[?] Luki:** Nie pokazano custom error, sukcesu pola, walidacji serwerowej, readonly poza fallbackiem udostępniania ani limitu długości UI. q jest obcinane do 200 znaków w A05 — to zachowanie prototypu.


<a id="c03"></a>
## C03 · Select lokalizacji i sortowania

### Przeznaczenie i wybór

[R] Używaj dla jednego wyboru z zamkniętej listy. Checkboxy C04 obsługują wielokrotny wybór. Nie przedstawiaj natywnego selecta jako autorskiego comboboxa z wyszukiwaniem.

### Anatomia i części

[P] 1. Powiązana, wizualnie ukryta etykieta. 2. Wybrana opcja. 3. Strzałka. 4. Pin [tylko lokalizacja]. Lista rozwijana należy do przeglądarki.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Kontekst | Lokalizacja | Wspólna ramka search i separator; S01 |
| Kontekst | Sortowanie | Bez osobnej ramki, przy wynikach; S05 |
| Stan | Początkowy / zmieniony / focus | Cała Polska, Najnowsze / Najwyższe widełki; S01/S05/S15 |
| Stan | Otwarty | Natywny wygląd listy nie został utrwalony |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Opcje lokalizacji | lista tekstów | Cała Polska, Warszawa, Kraków, Wrocław, Poznań, Gdańsk, Łódź | Pierwsza opcja na starcie A05 |
| Opcje sortowania | lista | Najnowsze / Najwyższe widełki / Firma A–Z | Najnowsze na starcie A05 |
| Wybrana wartość | pojedynczy wybór | Jedna opcja naraz | Lista nie jest zbiorem tagów |
| Ikona | pin / chevron | Zależna od kontekstu | Brak konfigurowalnego API |

### Tokeny i style

[P] `--ink`, `--muted`, separator `--line`. Chevron to tło SVG; samo pole ma `appearance:none`, lista pozostaje natywna [A02/A05]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Lokalizacja: slot 250 px w bazowym search, wysokość 52; mobile wysokość 42. Sort: max-width 200 px desktop / 170 mobile, padding 8px 26px 8px 4px bazowo [A02].

### Typografia

[P] Arial 14 px lokalizacja bazowo / 12 mobile; sort 12 / 11; interlinia dziedziczona. To tekst roboczy, bez Serif [A02].

### Zachowanie, treści i lokalizacja

[P, A05] Lokalizacja stosowana po „Szukaj ofert”; sort zmienia wyniki od razu i wraca na pierwszą stronę. Sort płacowy porównuje dolne granice, braki są na końcu. Nie pokazano zdalnego pobierania opcji ani błędu.

### Zalecane i niewskazane praktyki

Zalecane: zachowaj pełne znaczenie „Najwyższe widełki”, doprecyzuj w razie potrzeby dolną granicę. Niewskazane: dodawanie wyszukiwarki w select bez odrębnej specyfikacji comboboxa [R].

### Dostępność

[T] A11y-2/3: natywna klawiatura selecta, czytelna nazwa „Sortuj oferty” i wybrana opcja. Widok nie dowodzi zachowania na iOS/Android. Dla obecnej natywnej kontrolki nie narzucamy wzorca autorskiego APG combobox. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01, S05, S15; A02 `.location-field select`, `.sort-field select`; A05.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S05](evidence/S05.jpg), [S15](evidence/S15.jpg).

**[?] Luki:** Brak projektu natywnej otwartej listy na innych platformach; brak wariantu wielokrotnego, wyszukiwalnego i disabled w użyciu.


<a id="c04"></a>
## C04 · Checkbox i grupa wyboru

### Przeznaczenie i wybór

[R] Wybieraj dla niezależnych warunków lub kilku wartości w jednej grupie. Kategoria C05 jest pojedynczym wyborem; nie utożsamiaj jej z tą rodziną.

### Anatomia i części

[P] 1. Kwadrat z obrysem i znacznikiem. 2. Etykieta klikalnego wiersza. 3. Liczba pasujących ofert [tylko tryb pracy]. 4. Nagłówek grupy; label grupuje pokrewne wartości.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Stan | Niezaznaczony | Białe wnętrze; S01 |
| Stan | Zaznaczony | Ciemne wnętrze i jasny znacznik; S05/S09 |
| Kontekst | Desktop / dialog mobile | Gęstszy / wyższy wiersz; S01/S09 |
| Semantyka | Dwa stany | Brak pokazanego indeterminate lub zbiorczego zaznaczania |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Etykieta | tekst | Zdalnie, Senior, B2B, Tylko oferty z widełkami itd. | Wszystkie niezaznaczone na czystym starcie A05 |
| Wybór | logiczny | tak / nie | W grupie można kilka wartości |
| Licznik | liczba opcjonalna | 12, 5, 0 itd. | Tylko zaobserwowane grupy z liczbą |
| Grupa | zestaw | tryb, doświadczenie, forma, widełki | Wartości jawnie podane w A05 |

### Tokeny i style

[P] `--surface`, `--muted` obrys; po wyborze `--ink` i biały check. Zaokrąglenie lokalne 5 px; nie r10 [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Sam kwadrat 17×17 px. Wiersz etykiety minimum 32 px desktop i 39 px mobile; gap 10 px. Licznik jest wyrównany do prawej. To pole wraz z etykietą, nie sam kwadrat, stanowi cel do zmierzenia [A02].

### Typografia

[P] Arial 13 px desktop / 15 mobile; grupa 13/650 lub 15/650; licznik 11 px. Checkbox widełek ma lokalnie 12/14 px [A02].

### Zachowanie, treści i lokalizacja

[P, A05; S05/S09] Wybór aktualizuje wyniki od razu. OR wewnątrz grupy, AND między grupami. Licznik trybu liczony z pominięciem bieżącego wyboru trybu. Zamknięcie mobilnego panelu nie cofa zaznaczenia. RTL [?].

### Zalecane i niewskazane praktyki

Zalecane: klikany label z jasnym tekstem „Tylko oferty z widełkami”. Niewskazane: sam różowy kwadrat bez znaku wyboru albo licznik udający trzeci stan [R].

### Dostępność

[T] A11y-2/3; [APG Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/): Spacja zmienia wybór, nazwa i stan są dostępne, grupa ma nazwę. Zweryfikować obszar aktywny całego labela; grafika 17 px sama nie dowodzi naruszenia ani spełnienia 2.5.8. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01, S05, S09, S16; A02 `.filter-group`, końcowa reguła wyglądu input; A05.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S05](evidence/S05.jpg), [S09](evidence/S09.jpg), [S16](evidence/S16.jpg).

**[?] Luki:** Indeterminate, disabled i error nie pokazane. Nie ma potwierdzonego zbiorczego „Zaznacz wszystko”.


<a id="c05"></a>
## C05 · Selektor kategorii

### Przeznaczenie i wybór

[R] Służy do zmiany obszaru ofert w tym samym zbiorze. Nie jest nawigacją do strony firmy ani zestawem zakładek z panelami treści.

### Anatomia i części

[P] 1. Kontener przycisku. 2. Nazwa kategorii. 3. Wyjaśnienie [Build/Apply/Lead na szerokim widoku]. 4. Liczba wyników. Wyjaśnienie jest ukrywane na mobile, nie usuwane z modelu treści.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Wybór | Wszystkie / Build / Apply / Lead | Jeden aktywny wariant; S01/S05 |
| Stan | Wybrany / niewybrany | Ciemny / transparentny, cienki obrys; S05 |
| Układ | Cztery kolumny / poziomy rząd | Pełniejsze opisy / krótkie etykiety; S01/S02 |
| Kombinacja | Build + Zdalnie | Licznik Build 5 i wynik 5; S05 |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Kategoria | wybór pojedynczy | all / Build / Apply / Lead | all na czystym starcie A05 |
| Opis | tekst | Twórz AI / Wdrażaj AI / Wyznaczaj kierunek | Obserwowany, nie ogólny slot API |
| Licznik | liczba | 0…24 w danych przykładowych | Wyliczany, nie maksymalny limit systemu |
| Wybranie | logiczny | Jeden aktywny przycisk | `aria-pressed` w A05 |

### Tokeny i style

[P] `--ink` + biel dla wybrania; papier dla reszty, obrys 1 px, r18; hover niewybranego biel [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Desktop grid 1.1fr / 1fr / 1fr / 1fr, gap 12 px, min-height 56, padding 12×18. Mobile flex z overflow-x, gap 7, min-height 44, padding 10×12; końcowy element może być częściowo widoczny [A02].

### Typografia

[P] Arial: nazwa 14–15 px, opis 11, licznik 12. Mobile nazwy 11–12, licznik 10. Bez Serif; to kontrolki [A02].

### Zachowanie, treści i lokalizacja

[P, A05] Zmiana natychmiast filtruje i zeruje stronę paginacji. Liczniki kategorii uwzględniają inne filtry, ale ignorują wybraną kategorię. Stan z zerowym licznikiem nie jest automatycznie disabled. RTL i odkrywalność przewijania [?].

### Zalecane i niewskazane praktyki

Zalecane: wybranie czernią i czytelny licznik. Niewskazane: nazywanie widocznej formy „tabs” i dodanie ról tab/tabpanel bez odpowiadającej im interakcji [R].

### Dostępność

[T] A11y-2/3/4; obecnie przyciski przełączające, nie APG Tabs. [?] Rozważyć model pojedynczego wyboru według [APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) dopiero po decyzji; wtedy konsekwentnie wdrożyć klawiaturę. Tab nie może gubić elementu poza przewijanym rzędem. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01, S02, S05, S06; A02 `.category-tabs`, `.category-tab`; A05.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S02](evidence/S02.jpg), [S05](evidence/S05.jpg), [S06](evidence/S06.jpg).

**[?] Luki:** Brak projektu piątej kategorii, dłuższych tłumaczeń i dynamicznego doładowania. Przyciski nie mają dedykowanego loadingu.


<a id="c06"></a>
## C06 · Chip aktywnego filtra

### Przeznaczenie i wybór

[R] Pokazuje zastosowane kryterium i pozwala je pojedynczo usunąć. Nie używaj go dla nieinteraktywnych umiejętności C07 ani jako głównego wyboru kategorii C05.

### Anatomia i części

[P] 1. Tekst kryterium. 2. Ikona ×. 3. Wspólny obszar przycisku. Kategoria jest osobnym selektorem; nie pojawia się automatycznie jako taki chip.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Treść | Fraza / miasto / tryb / poziom / umowa / płaca / widełki | S05/S06/S16 i opis A05 |
| Obecność | Brak filtrów / co najmniej jeden | Rząd ukryty / widoczny; S01/S05 |
| Układ | Jeden / kilka wierszy | Zawijanie bez limitu liczby w źródle |
| Stan | Default / opisany hover | Focus jako wspólna reguła; brak stanu wybranego |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Etykieta | tekst | „Zdalnie”, „Od 18 000 zł”, cytowane zapytanie | Wynika z wartości |
| Rodzaj / wartość | cecha + wartość | q, city, mode, level, contract, minSalary, salaryOnly | Nazwy techniczne A05, nie zatwierdzone propsy biblioteki |
| Usunięcie | akcja | Czyści tylko wskazany filtr | Brak domyślnego chipa |
| Ikona | stała × w przykładach | 12 px | Nie potwierdzono innej ikony |

### Tokeny i style

[P] Biel, obrys `--ink` 1 px, r10; hover `--fact` [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Min-height 32 px, padding 5×8, gap do ikony 8, odstęp między chipami 8. Mobile min-height 31, padding 5×7 i gap grupy 6. Szerokość wynika z etykiety [A02].

### Typografia

[P] Arial 11 px desktop / 10 mobile, regular. Długie kryterium nie ma specyfikowanego skracania ani limitu projektowego [A02/A05].

### Zachowanie, treści i lokalizacja

[P, A05] Kliknięcie całego chipa usuwa kryterium, aktualizuje kontrolkę źródłową i wraca na stronę 1. Nie ma osobnego kliknięcia w tekst jako nawigacji. Zmiana liczby wyników jest statusem. RTL [?].

### Zalecane i niewskazane praktyki

Zalecane: „Usuń filtr: Zdalnie” jako opis celu. Niewskazane: sama nazwa „Zdalnie” dla dwóch niezależnych interakcji lub tag umiejętności z mylącym krzyżykiem [R].

### Dostępność

[T] A11y-2/3/4 i APG Button z C01. Po usunięciu element znika; sprawdzić logiczne miejsce focusu i ogłoszenie nowej liczby wyników. Zaokrąglenie i niski tekst wymagają pomiaru celu. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S05, S06, S08, S16; A02 `.active-filters`, `.filter-chip`; A05 `activeFilters` i `data-remove`.

**Materiały do otwarcia:** [S05](evidence/S05.jpg), [S06](evidence/S06.jpg), [S08](evidence/S08.jpg), [S16](evidence/S16.jpg).

**[?] Luki:** Brak długiego chipa z przewijaniem i udokumentowanej polityki focusu po usunięciu. Nie projektowano stanów błędu/loading.


<a id="c07"></a>
## C07 · Etykiety faktów, umiejętności i liczniki

### Przeznaczenie i wybór

[R] Używaj dla informacji, nie działania: płaca, kompetencje, kategoria obiektu, liczba wyników. Wizualnie podobna pastylka nie oznacza tej samej semantyki co C05 lub C06.

### Anatomia i części

[P] 1. Wartość. 2. Tło/obrys zależny od roli. 3. Podpis jednostki/umowy [wynagrodzenie, wymagany kontekst]. 4. Opcjonalna etykieta nagłówkowa w panelu. Ikony faktów należą do wiersza metadanych, nie każdej pastylki.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Rola | Wynagrodzenie | Jasny róż i mocniejszy tekst; S01/S03 |
| Rola | Umiejętność / kategoria obiektu / licznik | Delikatny obrys, papier/biel; S01/S03 |
| Brak danych | Nie podano wynagrodzenia | Zwykły tekst zamiast pustej pastylki; S14 |
| Rozmiar | Karta / pełny panel | Inna skala, ta sama informacja; S01/S03 |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Kwota | liczby + waluta | min–max zł | Brak domyślnych kwot |
| Podstawa | tekst warunków | B2B netto + VAT / UoP brutto / Zlecenie brutto; miesięcznie | Zależne od danych A04 |
| Tagi | lista tekstów | W fixture 2–3; bez udokumentowanego maksimum | Zawijane |
| Licznik | liczba | 0, 1, 24 itd. | Zakres danych, nie wariant wielkości API |

### Tokeny i style

[P] Płaca: `--fact` + `--ink`, r999. Tagi kart: biel, `--line`, r10. Kategorie na ofercie: papier, obrys ink, r999. Liczniki wyników r10, nie jednolicie r999 [A02/A03]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Płaca karty padding 5px 15px 5px 8px; mobile 4px 13px 4px 6px. Tagi: 2×6 px, gap 6; mobile 1×5 i gap 5. Duża płaca panelu padding 8×13. Wartości nie są klikalne [A02/A03].

### Typografia

[P] Płaca karty Arial 15/600, line 1.45, tracking −0.25; mobile 13/600, 1.35, −0.1. Panel 24/600 desktop i 25 mobile. Tagi 11 / 10. Opis warunków 10 px w karcie, 12 w panelu [A02/A03].

### Zachowanie, treści i lokalizacja

[P, A04] Format pl-PL, półpauza między kwotami, „zł”; 8000 w danych przykładowych występuje bez separatora. Warunki i okres pozostają przy liczbie. Brak płacy nie oznacza 0. Loading i wybór: nie dotyczy statycznej etykiety.

### Zalecane i niewskazane praktyki

Zalecane: kwota wraz z „B2B · netto + VAT / mies.”. Niewskazane: sama kwota, czarny wybrany wygląd filtra dla tagu lub biała etykieta na różu działania [R; A11y-1].

### Dostępność

[T] A11y-1/3: relacje kwota–waluta–umowa–okres czytane łącznie, kolejność logiczna. Nie polegać na kolorze do odróżnienia brutto/netto. Brak klawiatury: nie dotyczy nieinteraktywnej etykiety. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01–S04, S14; A02 `.salary-tag`, `.salary-description`, `.job-tags`; A03 `.offer-pay`; A04.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S04](evidence/S04.jpg), [S14](evidence/S14.jpg).

**[?] Luki:** Nie pokazano dwóch umów/różnych walut w jednej ofercie, siedmiu tagów ani długiej wielomiejskiej lokalizacji. To scenariusze do uzupełnienia, nie istniejące warianty.


<a id="c08"></a>
## C08 · Identyfikacja firmy i profil skrócony

### Przeznaczenie i wybór

[R] Łączy znak z nazwą organizacji. Mały wariant pomaga porównywać role; rozwinięty profil daje kontekst po warunkach oferty. Ilustracja platformy nie zastępuje tożsamości pracodawcy.

### Anatomia i części

[P] 1. Znak tekstowy lub inicjały [wymagany fallback]. 2. Nazwa [wymagana w użyciu]. 3. Metadane/kategoria [zależne od kontekstu]. 4. Opis, informacja demo i link do ofert [tylko rozwinięty profil]. 5. Ilustracja platformy [w profilu, zależna od szerokości i załadowania].

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Kontekst | Karta / header oferty / profil | Mały znak / wiersz / panel opisowy; S01/S03/S19 |
| Znak | FS, LL, ko, n., PP itd. | Róż, żółty, papier albo ciemny; S01 |
| Fallback | Brak podanego logo tekstowego | Inicjały z pierwszych dwóch słów; PP w S13 |
| Treść | Długa nazwa | Zawijanie w headerze; skrót z wielokropkiem tylko w nawigacji, S13 |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Znak | tekst | Podany skrót albo wyliczone inicjały | Wyliczany, nie stała ikona |
| Nazwa | tekst | Forma Studio / długi przykład PP | Bez limitu projektowego |
| Ton | wybór | pink / yellow / white / ink | Wartości danych przykładowych A04; nie znaczenie statusu firmy |
| Rozwinięcie | zestaw opcjonalny | opis, link, ilustracja | Zależy od kontekstu; brak publicznego API |

### Tokeny i style

[P] Obrys ink 1 px. Kolor znaku: `--fact`, `--yellow`, `--paper`, `--ink` z bielą. Profil: biel, r24. Znak ma lokalne promienie: r18 / 16 / 14 zależnie od miejsca [A02/A03]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Karta: znak 43×43, mobile 35×35. Header oferty 60×60 bazowo i 47×47 przy ≤850. Profil 55×55, mobile 47×47; padding profilu 30×36 bazowo / 25×23 mobile. Ilustracja 180×145 bazowo, 120×120 ≤1100, ukryta 701–850, 90×100 ≤700 [A02/A03].

### Typografia

[P] Znak Arial 17/700 w karcie / 14 mobile. Nazwa w headerze Arial 16/600. Nazwa profilu H2 Geist Serif 34/400 i 31 mobile. Opis Arial 14/1.8 lub 13 mobile [A02/A03].

### Zachowanie, treści i lokalizacja

[P, A04/A06; S19] Nazwa w headerze prowadzi do sekcji firmy. „Oferty tej firmy” otwiera wyszukiwanie nazwy. Znak w przykładach jest tekstem, nie potwierdzonym komponentem obrazu logo. Firma i jej opis są fikcyjne. RTL [?].

### Zalecane i niewskazane praktyki

Zalecane: pełna nazwa obok PP i wyjaśnienie profilu demo. Niewskazane: duża pusta okładka przy braku logo lub zastąpienie inicjałów postacią platformy [R].

### Dostępność

[T] A11y-3: nazwa firmy musi wystarczyć bez odczytywania liter logo. W źródle znak jest dekoracyjny, a ilustracja profilu ma pusty alt. Właściwy opis dla prawdziwego logo wymaga kontekstu, nie automatycznego powtórzenia nazwy. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01, S03, S13, S19; A02 `.company-logo`; A03 `.offer-identity`, `.offer-employer`; A04/A06.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S03](evidence/S03.jpg), [S13](evidence/S13.jpg), [S19](evidence/S19.jpg).

**[?] Luki:** Prawdziwe logotypy SVG/raster i ich stany błędu nie są pokazane. S03/S04 mogą mieć pustą strefę obrazu przed lazy-load; widoczny obraz potwierdza S19.


<a id="c09"></a>
## C09 · Karta oferty i powtarzany zbiór

### Przeznaczenie i wybór

[R] Wybieraj do porównywania tekstowych ofert. Używa tej samej anatomii w wynikach, zapisanych i podobnych rolach. Nie zamieniaj jej w galerię okładek bez uzasadnienia treścią.

### Anatomia i części

[P] 1. C08 znak. 2. Firma i kategoria. 3. Tytuł-link [wymagany]. 4. Miasto, tryb, poziom. 5. C07 umiejętności. 6. Data i C01 zapis. 7. Płaca z warunkami albo jawny brak. 8. Link „Zobacz ofertę”.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Kontekst | Listing / podobne oferty / zapisane | Ta sama karta; S01/S03/S07 |
| Szerokość | Trzy kolumny / część główna + dolny pas | Separacja wynagrodzenia zmienia oś; S01/S02 |
| Treść | Krótki / długi tytuł; płaca / brak; znak / inicjały | S01/S02/S14; brak osobnych limitów znaków |
| Stan | Niezapisana / zapisana; opisany hover | S07/S20; brak loadingu/skeletona |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Obiekt oferty | zestaw danych | tytuł, firma, warunki, tagi, data, ID | Bez domyślnego obiektu |
| Płaca | para liczb albo brak | Warunki zależą od umowy | Brak nie może zmieniać tytułu ani fałszować kwoty |
| Zapis | logiczny | false / true | C01, stan wizyty |
| Link | adres | Pełna oferta z odpowiednim ID | Tytuł i CTA mają ten sam cel |

### Tokeny i style

[P] Biel, obrys ink 1 px, r24; biały panel płacy z własnym podziałem; hover głównej powierzchni `--surface-hover`. Zależności C01/C07/C08 [A02/A04]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Listing bazowy: 66px / minmax(0,1fr) / 236px. Podobne oferty: 75px / elastyczna / 270px. Karta mobile: 50px / elastyczna, pas płacy przez oba pola. Główny padding 22px 20px 23px 16px, mobile 18px 15px 18px 13px. Gap zbioru 14 / 13 px. Wysokość rośnie z tytułem, nie jest stała [A02/A03].

### Typografia

[P] Tytuł według skali fundamentów: Geist Serif 28/400 desktop i 26 mobile. Firma 12/11 Arial; fakty 13/12; tagi 11/10; data 10 px ukryta mobile. Link CTA 12/11, 600 [A02].

### Zachowanie, treści i lokalizacja

[P, A04–A06] Tytuł i CTA otwierają pełną stronę, zapis jest oddzielnym przyciskiem. Cała powierzchnia nie ma jednego nadrzędnego linku. Tytuły zawijają się w całości. W podobnych rolach są trzy przykłady, a wynik demo ma 12 na stronę — to nie pojemność rodziny.

### Zalecane i niewskazane praktyki

Zalecane: długi tytuł zwiększa kartę, fakty zachowują miejsca. Niewskazane: mniejszy font tylko w jednej długiej ofercie, obcięcie nazwy roli albo zagnieżdżenie przycisku zapisu w linku całej karty [R].

### Dostępność

[T] A11y-1/2/3/4: h3 w listach, nazwa linku zgodna z rolą, oddzielny dostępny zapis, kolejność na mobile. Odczyt statusu i długich metadanych wymaga czytnika. Dane w 390 px nie dowodzą reflow 320 px. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01–S05, S07, S14, S18–S20; A02 `.job-card`, `.job-main`, `.job-side`; A03 podobne; A04 `jobCard`.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S05](evidence/S05.jpg), [S07](evidence/S07.jpg), [S14](evidence/S14.jpg), [S18](evidence/S18.jpg), [S20](evidence/S20.jpg).

**[?] Luki:** Skala 26→28→26 na pośrednich progach pozostaje otwartą decyzją. Nie pokazano błędu pobrania karty, wygasłej oferty, wielu miast i setek rekordów.


<a id="c10"></a>
## C10 · Paginacja

### Przeznaczenie i wybór

[R] Pozwala przechodzić między częściami zbioru. Nie używaj jej jako procesu etapowego; rekrutacja w C22 jest informacyjną listą kroków.

### Anatomia i części

[P] 1. Podsumowanie zakresu. 2. Poprzednia. 3. Numery stron. 4. Następna. Bieżący numer i niedostępny kierunek są odrębnymi stanami.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Strona | 1 z 2 | Poprzednia disabled, 1 ciemna; S01 |
| Strona | 2 z 2 | Następna disabled, 2 ciemna; S18 |
| Wynik | Jedna strona / zero | Obie strzałki disabled / paginacja ukryta; S05/S06 |
| Szerokość | Wspólny wiersz / podsumowanie nad przyciskami | S01/S02 |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Strona | liczba | 1 / 2 w danych | Start 1, chyba że URL A05 |
| Liczba wyników | liczba | 24, 5, 0 itd. | Wyliczana |
| Rozmiar porcji | liczba | 12 w demonstracji | Jawnie A05; nie zatwierdzona zmienna design systemu |
| Disabled | logiczny | Na granicy zbioru | Nie to samo co wybranie |

### Tokeny i style

[P] Biel/papier, obrys ink 1 px, r18; bieżąca strona ink + biel; disabled opacity 0.45 ze wspólnej reguły [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Przycisk min-width 36 i height 36 px, gap 8, margines nad grupą 26. Mobile 33×33, gap 6 i margines 23; podsumowanie zajmuje cały pierwszy wiersz [A02].

### Typografia

[P] Arial 12 px numery i 11 podsumowanie desktop; mobile 11 / 10. Ikony 16 px [A02].

### Zachowanie, treści i lokalizacja

[P, A05] Przejście zmienia porcję i ustawia wynik jako punkt powrotu/focusu. Filtry i sort zerują stronę. Zero wyników usuwa całą nawigację. Brak skracania długiej listy numerów w specyfikacji.

### Zalecane i niewskazane praktyki

Zalecane: „13–24 z 24” i dostępna nazwa kierunku. Niewskazane: pokazanie 0–0 z 0 z aktywną następną stroną albo użycie ciemnego tła dla disabled [R].

### Dostępność

[T] A11y-2/3: nazwany region nawigacji, numer bieżący programowo oznaczony, disabled pomijany przy aktywacji. Sprawdzić focus po wymianie przycisków i realne cele zaokrąglonych kontrolek. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01, S02, S05, S06, S18; A02 `.pagination`, `.page-button`; A05 render i data-page.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S02](evidence/S02.jpg), [S05](evidence/S05.jpg), [S06](evidence/S06.jpg), [S18](evidence/S18.jpg).

**[?] Luki:** Wiele dziesiątek stron, wielokropek, skok do strony oraz infinite scroll nie są pokazane.


<a id="c11"></a>
## C11 · Nagłówek globalny

### Przeznaczenie i wybór

[R] Utrzymuje tożsamość oraz przejście do ofert i zapisanych. Nie powtarzaj w nim nagłówka marketingowego ani tytułu bieżącej roli.

### Anatomia i części

[P] 1. Wordmark-link z różowym sygnetem. 2. Środkowa nawigacja [desktop]. 3. Zapisane z ikoną i liczbą. Na mobile menu środkowe znika, marka i zapisane pozostają.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Kontekst | Listing | Zapisane jest przełącznikiem filtra; S01/S08 |
| Kontekst | Oferta | Zapisane przenosi do listingu zapisanych; S03 |
| Szerokość | 80 px header desktop / 72 mobile | S01/S02 |
| Stan | Aktywne „Oferty pracy”; zapisane 0/1 i tryb wybrany | S01/S07/S08 |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Marka | tekst + sygnet | DoRoboty.ai | Bez alternatywnego brandu w źródle |
| Nawigacja | lista | Oferty pracy, O DoRoboty.ai | Środek ukryty ≤600 |
| Zapisane | liczba i działanie | 0 / 1 itd. | Start 0 bez przekazanego wyboru A05/A06 |
| Aktywny link | wskazanie | Oferty pracy | Pozostaje wskazany także na ofercie |

### Tokeny i style

[P] Biała powierzchnia, dolny kontur ink 1 px. Aktywny link ma różowe podkreślenie 5 px, r3. Przycisk zapisanych r18, jego aktywny stan ink + biel [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Wysokość 80/72 px, główne odstępy 32 px desktop / 15 mobile. Zapisane padding 10×13 i gap 10; mobile bez ramki w niewybranym stanie. Szerokość całej zawartości wg kontenera [A02].

### Typografia

[P] Wordmark Arial 28/760, tracking −1.7, mobile 25/−1.5; to styl tekstowego znaku, nie nagłówek H. Menu 14 px, zapisane 14/12, licznik 11/10 [A02].

### Zachowanie, treści i lokalizacja

[P, A05/A06] Marka wraca do listingu. Otwieranie „O DoRoboty.ai” jest dialogiem. Mobile nie ma pokazanej szuflady menu ani hamburgera. Zapis nie oznacza konta ani trwałej synchronizacji.

### Zalecane i niewskazane praktyki

Zalecane: liczba opisuje zapisane, podkreślenie wskazuje obszar. Niewskazane: dodanie awatara/logowania jako istniejącego wariantu lub wymienne traktowanie nawigacji i przełącznika zapisanych [R].

### Dostępność

[T] A11y-2/3: landmark header/nav, link marki z jednoznaczną nazwą, widoczna etykieta zapisu. Porównać semantykę obu kontekstów. Sprawdzić skip-link i kolejność Tab. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01–S04, S07, S08; A02 `.header-inner`, `.wordmark`, `.saved-nav`; A05/A06.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S04](evidence/S04.jpg), [S07](evidence/S07.jpg), [S08](evidence/S08.jpg).

**[?] Luki:** Wariant mobilnego pełnego menu, użytkownik zalogowany i aktywne inne sekcje nie są pokazane.


<a id="c12"></a>
## C12 · Stopka

### Przeznaczenie i wybór

[R] Kończy stronę i utrzymuje informację o demonstracji. Nie zastępuje panelu aplikowania ani menu głównego.

### Anatomia i części

[P] 1. Wordmark-link. 2. Tekst o fikcyjnych ofertach i firmach. 3. „O tej stronie” z symbolem kierunku. Bez kolumn marketingowych w dostarczonym zakresie.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Szerokość | Wiersz / zawijanie | Informacja przeniesiona pod markę i link mobile; S01/S02 |
| Kontekst | Listing / oferta | Te same części; S01/S03 |
| Stan | Spoczynkowy, linki działań | Brak osobnego wyboru lub disabled |
| Treść | Informacja demo | Nie jest stopką prawną produkcyjnego serwisu |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Marka | tekst | DoRoboty.ai | Pokazana stała |
| Opis | tekst | Wszystkie oferty i firmy przykładowe | Wymagany kontekst demo w tej wersji |
| Link informacji | działanie | O tej stronie | Otwiera istniejący dialog |
| Pozycja | układ | Po treści strony | Nie jest fixed |

### Tokeny i style

[P] Biel, górny kontur ink 1 px; tekst pomocniczy muted. Brak własnego promienia na pełnej szerokości strony [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Padding pionowy 28 px desktop / 24 mobile; gap 30 / 18. Opis ma auto lewy margines na szerokim widoku, mobile order 3 i szerokość całego wiersza [A02].

### Typografia

[P] Wordmark stopki 23 px desktop / 24 mobile. Opis 10 / 9 Arial, link 11 / 10. [R] Najdrobniejszą informację warto powiększyć; WCAG nie podaje jednego minimalnego rozmiaru fontu.

### Zachowanie, treści i lokalizacja

[P, A05/A06] Marka nawiguje, „O tej stronie” otwiera opis demonstracji. Błędy i loading: nie dotyczy statycznej kompozycji. Lokalizacja poza PL i linki prawne [?].

### Zalecane i niewskazane praktyki

Zalecane: czytelnie zachować status demo. Niewskazane: publikowanie tej treści jako kompletnej polityki prywatności lub dodawanie nieistniejących linków do regulaminów [R].

### Dostępność

[T] A11y-1/2/3/4: landmark contentinfo, link/działanie z nazwą, czytelność informacji po powiększeniu. Sam poprawny kontrast nie rozstrzyga wygody czytania 9 px. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01–S04 i S18, dolne części; A02 `.site-footer`, `.footer-inner`; A05/A06.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S04](evidence/S04.jpg), [S18](evidence/S18.jpg).

**[?] Luki:** Nie ma specyfikacji stopki produkcyjnej, wersji prawnej, wielojęzycznej ani z sekcjami organizacji.


<a id="c13"></a>
## C13 · Nawigacja kontekstowa

### Przeznaczenie i wybór

[R] Wybierz powrót do wyników przy zmianie strony, a kotwice przy poruszaniu się wewnątrz opisu. Podobny wygląd linków nie oznacza wspólnego „tab panelu”.

### Anatomia i części

[P] Powrót: strzałka + etykieta + opcjonalny tekst firmy po prawej. Sekcje: rząd czterech linków, dolny separator i podkreślenie pierwszej pozycji. To dwa udokumentowane podwzorce tej rodziny.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Cel | Wróć do ofert | Zmiana strony i kontekst wyników; S03 |
| Cel | O roli / Wymagania / Co oferujemy / Rekrutacja | Kotwice; S03/S04 |
| Treść | Długa firma w pasku powrotu | Prawa nazwa może mieć wielokropek; S13 |
| Stan | Podkreślona pierwsza pozycja | W kodzie statyczne `:first-child`, nie śledzenie scrolla |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Cel linku | adres / kotwica | listing / #role itd. | Rzeczywisty cel A06 |
| Etykiety sekcji | lista tekstów | Cztery pokazane | Brak standardu dla dowolnej liczby |
| Nazwa firmy | tekst opcjonalny | Forma Studio / długi przykład | Nie jest breadcrumb z wielu poziomów |
| Bieżąca sekcja | stan | Brak dynamicznego modelu | [?] Decyzja o śledzeniu pozycji |

### Tokeny i style

[P] Ink/muted; podkreślenie action 4 px, separator ink 1 px. Nie ma osobnego tokenu active-section [A03]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Powrót: font 13/12, min-height 36, ikona 17, gap 9. Sekcje: gap 30 px, padding poziomy 36 i pionowy linków 20; mobile gap 24, padding poziomy 23, linki 19. Rząd ma overflow-x [A03].

### Typografia

[P] Arial 12 px linki sekcji / 11 mobile. Powrót 13/12. Długi prawy tekst firmy jest elipsowany, ale główna nazwa i rola pozostają pełne [A03].

### Zachowanie, treści i lokalizacja

[P, A06] Powrót przenosi dostępne parametry listingu i przekazany wybór zapisu. Kotwice przewijają do sekcji; underline „O roli” pozostaje na pierwszym linku. Nie jest to dowód wybranej sekcji. RTL [?].

### Zalecane i niewskazane praktyki

Zalecane: nazywać rząd „Sekcje oferty”. Niewskazane: dokumentować zmianę podkreślenia przy scrollu jako gotową funkcję albo ukryć pełny tytuł roli pod wielokropkiem paska [R].

### Dostępność

[T] A11y-2/3/4 i [APG Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/). [APG Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) jest odniesieniem dla prawdziwej hierarchicznej ścieżki; obecny pojedynczy powrót nie dowodzi takiej struktury. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S03, S04, S13; A03 `.offer-breadcrumb`, `.offer-section-nav`; A06.

**Materiały do otwarcia:** [S03](evidence/S03.jpg), [S04](evidence/S04.jpg), [S13](evidence/S13.jpg).

**[?] Luki:** Bieżąca sekcja i jej semantyka do potwierdzenia. Nie pokazano wielopoziomowych breadcrumbs ani zwijanego spisu treści.


<a id="c14"></a>
## C14 · Pasek wyszukiwania

### Przeznaczenie i wybór

[R] Łączy frazę i lokalizację w jedno wyszukanie. Dla wielu warunków używaj panelu C15; nie umieszczaj wszystkich filtrów w jednym rosnącym polu.

### Anatomia i części

[P] 1. C02 pole z lupą i opcjonalnym czyszczeniem. 2. C03 lokalizacja z pinem i chevronem. 3. C01 różowy submit. 4. Wspólny obrys i separator.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Szerokość | Jeden wiersz / dwa rzędy | Search u góry, lokalizacja i submit pod nim na mobile; S01/S02 |
| Treść | Pusta / zapytanie | Krzyżyk w wpisanym polu; S06 |
| Stan | Focus lokalizacji / wartość | S15; brak całego paska w loadingu |
| Wynik | 24 / zero | Ten sam formularz, różny wynik C17 |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Fraza | tekst | stanowisko, firma, umiejętność | Pusta na starcie A05 |
| Lokalizacja | pojedynczy wybór | C03 | Cała Polska na starcie |
| Submit | działanie | Szukaj ofert | Jedna wspólna akcja |
| Zawartość | kompozycja | Pole + select + CTA | Nie dowód konfigurowalnego slot API |

### Tokeny i style

[P] Powierzchnia white, obrys ink 1 px, r24; CTA r18; separator line [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Grid bazowy: elastyczna fraza / 250 px / 180 px, padding zewnętrzny 7. Odstęp do kategorii: margin-bottom 28. Mobile: elastyczna / 125 px, pole frazy przez oba pola, padding 5, margin-bottom 18. Wnętrze i odstęp od następnego komponentu to różne reguły [A02].

### Typografia

[P] Arial 14 desktop; mobile 12. Submit 600; placeholder muted. Widoczne etykiety pól są zastąpione opisowymi placeholderami, ale istnieją osobne ukryte labele [A05].

### Zachowanie, treści i lokalizacja

[P, A05] Enter/submit stosuje frazę i miasto; kasowanie frazy działa od razu. Formularz nie wysyła żądania do realnej bazy. Wynik i aktywne chipy są poza obrysem paska. Błąd sieci nie został pokazany.

### Zalecane i niewskazane praktyki

Zalecane: zachować jeden submit i czytelny pin lokalizacji. Niewskazane: obietnica filtrowania już przy każdym znaku, skoro aktualne zachowanie wymaga wyszukania [R].

### Dostępność

[T] A11y-2/3/4: landmark search, powiązane labele, kolejność pola → lokalizacja → przycisk; sprawdzić, czy focus ring nie jest obcięty przez ramkę i jak odczytywane są wyniki. Dowód S15 jest jednym stanem, nie pełnym testem. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01, S02, S06, S15; A02 `.search-form`; A05 formularz i submit.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S02](evidence/S02.jpg), [S06](evidence/S06.jpg), [S15](evidence/S15.jpg).

**[?] Luki:** Brak autouzupełniania, sugestii, historii i trybu loading. Nie zakładać, że to istniejące warianty.


<a id="c15"></a>
## C15 · Panel filtrów

### Przeznaczenie i wybór

[R] Stosuj do niezależnego doprecyzowania listingu. Na szerokim ekranie wspiera porównywanie; na wąskim otwierany osobno, zamiast zajmować całą górę wyników.

### Anatomia i części

[P] 1. Nagłówek „Po Twojemu” i Wyczyść [desktop]. 2. Grupy C04: tryb, doświadczenie, umowa. 3. C02 dolna granica płacy. 4. C04 widełki. Mobile: C18 z tytułem, × i dolnym przyciskiem; ten sam zestaw filtrów.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Kontekst | Kolumna | Widoczna po lewej; S01 |
| Kontekst | Dialog | Otwarcie „Filtry”, licznik aktywnych i „Pokaż N ofert”; S09/S16 |
| Stan | Start / wybór / kilka kryteriów | S01/S05/S16 |
| Kombinacja | Zdalnie + min 18000 | Mobilny przycisk pokazuje 5 ofert; S16 |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Grupy | zestaw | cztery obszary oraz widełki | Wartości w A05 |
| Liczba aktywnych | liczba | chipy + wybrana kategoria | Wyliczana; nie liczba zaznaczonych kwadratów tylko w panelu |
| Reset | działanie | Czyści kryteria i tryb zapisanych | Zachowuje sortowanie, A05 |
| Pokaż N | tekst + działanie | Bieżąca liczba wyników | Zamyka dialog, nie zatwierdza osobnego draftu |

### Tokeny i style

[P] Biel, obrys ink 1 px, r18 na kolumnie; separator line pomiędzy grupami. W dialogu zewnętrzna ramka panelu znika [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Kolumna 245 px, przy ≤1100: 218; przy ≤850 zastąpiona wywołaniem dialogu. Nagłówek padding 20, grupa 22px 20px 20px. Mobile grupy padding 24, sticky header i footer dialogu; footer uwzględnia dolny safe area [A02].

### Typografia

[P] Tytuł kolumny Geist Serif 24/400. Nazwy grup Arial 13/650 desktop i 15/650 mobile. Reszta wg C02/C04. Przycisk Filtry ma 12 px albo 11 na mobile [A02].

### Zachowanie, treści i lokalizacja

[P, A05; S09/S16] Zmiany od razu aktualizują wynik w tle. × i Escape nie anulują zmian. Reset nie resetuje sortowania. Brak oczekiwania na backend i stanu sieciowego. „Pokaż” jest trafniejsze niż „Zastosuj” dla tego modelu.

### Zalecane i niewskazane praktyki

Zalecane: przywróć widoczne kryteria jako chipy i pozwól usuwać je pojedynczo. Niewskazane: przedstawianie zamknięcia jako Anuluj przy zachowaniu zmian albo dodanie nowych grup bez obsługi pustego wyniku [R].

### Dostępność

[T] A11y-2/3/4 plus C18: nazwy grup, kolejność, focus przy otwarciu/zamknięciu i przewijanie do płacy bez przykrywania pola stopką. Licznik wyników wymaga sprawdzenia czytnikiem. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01, S05, S09, S16; A02 `.filter-panel`, `.filter-group`, `.filter-dialog`; A05.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S05](evidence/S05.jpg), [S09](evidence/S09.jpg), [S16](evidence/S16.jpg).

**[?] Luki:** Brak osobnego draftu i przycisku czyszczenia wewnątrz mobilnej wersji nagłówka. [?] Czy przyszły produkt ma zachować natychmiastowy model, czy zatwierdzany?


<a id="c16"></a>
## C16 · Wejście z ilustracją

### Przeznaczenie i wybór

[R] Używaj raz do orientacji na początku listingu. Na stronie oceny konkretnej roli wybierz nagłówek C20, a nie drugi marketingowy hero.

### Anatomia i części

[P] 1. Jedno H1, dwa wiersze. 2. Różowe podkreślenie fragmentu. 3. Krótki opis. 4. Autorska scena dwóch postaci. Search C14 i kategorie C05 są sąsiadującymi komponentami, nie tekstem ilustracji.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Szerokość | Układ tekst / duża scena | S01 |
| Szerokość | Pełny tytuł + opis / mała scena | S02 |
| Treść | Dobra robota. Z AI w środku. | Tylko ta treść została pokazana |
| Stan | Statyczny | Brak wersji ładowania, karuzeli lub wideo |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Tytuł / wyróżnienie | tekst + fragment | Drugi wiersz podkreślony | Bez systemowego limitu znaków |
| Opis | tekst | Dwa krótkie zdania | Nie wbudowany w bitmapę |
| Ilustracja | obraz | Ludzie z laptopem i kartą | Jedna autorska scena, nie ogólna biblioteka |
| Alt | tekst | Opis dwóch pracujących postaci na listingu | A05, nie dowód odczytu |

### Tokeny i style

[P] Papier, ink, podkreślenie action o lokalnym r8, obrót −1°. Ilustracja: czarny kontur, róż, żółty, przezroczystość. Nie dodaje własnej ramki [A02, S01]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Grid 1.15fr / .85fr; min-height 250, gap 40, padding 20×0. Scena height 220, max-width 490. Mobile grid: elastyczna /128px, gap13, padding 27px 0 21px; obraz 128×110, tytuł na obu kolumnach [A02].

### Typografia

[P] H1 Geist Serif 72/400, 1.02, −2.5 desktop; 43/400, 1.04, −2 mobile. Opis Arial 15/1.6 desktop i 12/1.6 mobile. Dodatkowe progi w fundamentach [A02].

### Zachowanie, treści i lokalizacja

[P] Bez interakcji wewnątrz obrazu. Jego zadaniem jest charakter, a nie przenoszenie warunków pracy. Długi H1 i inny obraz nie są pokazane. Lokalizacja i RTL [?].

### Zalecane i niewskazane praktyki

Zalecane: scenę z aktywnością i wolną przestrzeń wokół tekstu. Niewskazane: umieszczanie frazy wyszukiwania w grafice lub powtarzanie postaci w każdej karcie [R].

### Dostępność

[T] A11y-1/3/4: H1 jako tekst, kontrast poza różowym podkreśleniem też wystarczający, sensowna alternatywa obrazu. Ocenę alt trzeba odróżnić od dekoracyjnego obrazu w profilu C08. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S01/S02; A02 `.intro-grid`, `.intro-copy`, `.people-art`; A05.

**Materiały do otwarcia:** [S01](evidence/S01.jpg), [S02](evidence/S02.jpg).

**[?] Luki:** Nie ma wariantów tematycznych postaci, trybu ciemnego, alternatywnego wycięcia ani potwierdzonych zasad dla nowych ilustracji.


<a id="c17"></a>
## C17 · Pusty wynik i odzyskanie kontekstu

### Przeznaczenie i wybór

[R] Używaj, gdy nie ma elementów do pokazania, z powodem i działaniem naprawczym. Brak płacy w pojedynczej karcie jest etykietą C07, nie pustym stanem całej listy.

### Anatomia i części

[P] 1. Znak w różowym kole. 2. Nagłówek. 3. Wyjaśnienie. 4. Główne działanie. 5. Kontekst wyników / zapisanych / błędnego adresu definiuje tekst. Nie ma rysunkowej postaci w tych przykładach.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Powód | Zero wyników | „Tym razem nic tu nie ma.”, reset; S06 |
| Powód | Brak zapisanych | „Zapisz coś dla siebie.”, powrót; S08 |
| Powód | Nieznany adres oferty | „Nie ma tu takiej oferty.”, listing; S12 |
| Powód | Zapisane nie pasują do filtrów | Opisany w A05; brak osobnego utrwalonego zrzutu |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Powód | wybór | results / saved / invalid-offer | Nazwy robocze [R] |
| Tytuł / opis / CTA | tekst | Różne w każdym powodzie | Brak jednego domyślnego komunikatu |
| Ikona | symbol | Lupa w utrwalonych przykładach | Nie dowód pełnej biblioteki stanów |
| Kryteria | kontekst | Wciąż widoczne chipy i filtry | Nie znikają przy 0 |

### Tokeny i style

[P] Biel, obrys ink 1 px; empty wyników r18, nieprawidłowa oferta r24; koło fact + ink. Przycisk primary C01 [A02/A03]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Wyniki: padding65×25, koło63×63, opis max410; mobile padding44×20. Nieznana oferta: max850, padding65×25 i własne marginesy; mobile45×23. Nie ustanawiać jednej stałej wysokości [A02/A03].

### Typografia

[P] Wyniki: Geist Serif H3 26/400, mobile24; opis Arial14/13. Invalid: H1 48/400, mobile39; opis15/14. Różny poziom H wynika z kontekstu strony [A02/A03].

### Zachowanie, treści i lokalizacja

[P, A05/A06] Reset wyników wraca do wszystkich i czyści kryteria; powrót z invalid prowadzi do listingu. To nie błąd serwera i nie potwierdzenie braku ofert na całym rynku. Loading/sukces: nie dotyczy tych powodów.

### Zalecane i niewskazane praktyki

Zalecane: zachować kryteria nad pustym wynikiem i konkretną drogę powrotu. Niewskazane: „Błąd 500” dla zera wyników albo samotny rysunek bez objaśnienia [R].

### Dostępność

[T] A11y-2/3/4: logiczny nagłówek, dostępne CTA, ogłoszenie zmiany liczby wyników, rozsądne przeniesienie focusu. Sam obraz nie dowodzi ogłoszenia stanu. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S06, S08, S12; A02 `.empty-state`; A03 `.offer-not-found`; A05/A06.

**Materiały do otwarcia:** [S06](evidence/S06.jpg), [S08](evidence/S08.jpg), [S12](evidence/S12.jpg).

**[?] Luki:** Awaria sieci, brak uprawnień, wygasła oferta i błąd publikacji nie są pokazane. Nie rozszerzać tej rodziny na nie bez osobnej treści.


<a id="c18"></a>
## C18 · Dialog informacyjny i filtry mobilne

### Przeznaczenie i wybór

[R] Wybieraj dla krótkiej informacji lub tymczasowego mobilnego zadania filtracji. Czytanie całej roli odbywa się na stronie C20–C22; dawny modal oferty jest wycofany z bieżącej kompozycji.

### Anatomia i części

[P] 1. Backdrop. 2. Zaokrąglona powierzchnia. 3. H2 i ×. 4. Treść. 5. Akcja zamknięcia/powrotu lub dolne Pokaż. Wariant filtrów ma przewijane wnętrze, sticky header/footer; zwykły ma treść i CTA.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Cel | O DoRoboty.ai | Opis i trzy obszary, S10 |
| Cel | Aplikowanie demo | Uczciwe ograniczenie i kontekst roli, S11 |
| Cel | Filtry | Pełny ekran mobilny, S09/S16 |
| Cel | Link do skopiowania | Fallback opisany w A06; nie został wywołany do osobnego zrzutu |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Tytuł / treść | tekst lub kompozycja | Zależne od celu | Brak jednego domyślnego tytułu |
| Otwarcie | logiczny | open / closed | Start zamknięty A05/A06 |
| Rozmiar | kontekst | 580px max / pełny mobilny | Nie publiczne warianty rozmiaru API |
| Zamknięcie | działanie | ×, odpowiednie CTA, Escape | Brak potwierdzonego kliknięcia w backdrop jako zamknięcia |

### Tokeny i style

[P] R24, obrys ink1 na zwykłym dialogu, papier we wnętrzu i biel nagłówka. Backdrop `rgba(24,24,24,.6)`; brak cienia [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Info width min(580px,100%−36px); max-height calc(100dvh−48px). Nagłówek i treść padding25. Mobile padding22×20. Filtry width/height100%, max-height100dvh, r24 i bez obrysu zewnętrznego, footer padding15×24 z safe area [A02].

### Typografia

[P] H2 Geist Serif24/400, line1.2, tracking−.7; mobile23. Treść Arial15/1.7, mobile14. Etykiety filtrów wg C04. Akcje C01.

### Zachowanie, treści i lokalizacja

[P, A05/A06] Natywne showModal/close i Escape. „Aplikuj” tylko wyjaśnia ograniczenie demo. Filtry zmieniają wynik przed zamknięciem. Fallback udostępniania ma readonly input i zaznaczenie adresu. Błąd/ładowanie: brak widoków.

### Zalecane i niewskazane praktyki

Zalecane: podać kontekst roli w oknie aplikowania demo. Niewskazane: udawać wysłanie CV lub traktować zamknięcie mobilnych filtrów jak rollback [R].

### Dostępność

[T] A11y-2/3/4; [APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): focus wewnątrz, Tab/Shift+Tab w obrębie, Escape zamyka, powrót do wywołania lub logicznego następcy. Zweryfikować inert tła, nazwę, mały viewport i czytnik. Natywny element nie dowodzi całej zgodności. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S09/S10/S11/S16; A02 dialog i filter-dialog; A05/A06 HTML oraz obsługa otwarcia.

**Materiały do otwarcia:** [S09](evidence/S09.jpg), [S10](evidence/S10.jpg), [S11](evidence/S11.jpg), [S16](evidence/S16.jpg).

**[?] Luki:** Brak projektu destructive confirm, nested dialog, błędu formularza i loadingu. Fallback udostępniania jest opisany, ale nie potwierdzony obrazem.


<a id="c19"></a>
## C19 · Toast i komunikat statusu

### Przeznaczenie i wybór

[R] Potwierdza krótką, zakończoną czynność bez zatrzymywania zadania. Dla informacji wymagającej decyzji użyj C18; dla pustego zbioru C17.

### Anatomia i części

[P] 1. Ciemny, zwarty kontener. 2. Jedno zdanie. Brak ikony, przycisku zamknięcia i akcji cofnięcia w utrwalonych przykładach.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Treść | Zapisano / usunięto | S07/S20 i S08 |
| Treść | Skopiowany link | Jawnie opisany w A06; brak nowego zrzutu tej treści |
| Kontekst | Listing / oferta | Ta sama rodzina; różne sformułowanie zapisu A05/A06 |
| Stan | Widoczny / ukryty | Znika po czasie; nie jest listą powiadomień |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Wiadomość | tekst | Potwierdzenie czynności | Brak domyślnego komunikatu |
| Widoczność | logiczny | true / false | Start ukryty |
| Czas | liczba | 2800 ms w A05/A06 | Implementacyjna wartość, nie zatwierdzona polityka systemu |
| Priorytet | status | Nieprzerywający | Brak error/alert wariantu |

### Tokeny i style

[P] Ink i biel, kontur ink1, r18. Nie ma osobnego zielonego koloru sukcesu [A02]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Fixed: środek poziomy, bottom24 px; padding12×18; max-width calc(100%−36px). Mobile bottom18 i tekst może się zawijać. S20 pokazuje viewport, podczas gdy pełne S07 lokuje fixed na dole bitmapy [A02].

### Typografia

[P] Arial13 px desktop i11 mobile, regular, line1.5. Nie jest H ani etykietą akcji [A02].

### Zachowanie, treści i lokalizacja

[P, A05/A06] Kolejna wiadomość zastępuje poprzednią i restartuje timer. Nie ma widocznego archiwum ani cofania. `role=status`, polite są zapisane w HTML; to nie potwierdzenie odczytu czytnikiem.

### Zalecane i niewskazane praktyki

Zalecane: „Zapisano ofertę…” po rzeczywistej zmianie, dodatkowo widoczny stan zakładki. Niewskazane: toast jako jedyny nośnik krytycznego błędu albo „Wysłano aplikację” w demonstracji [R].

### Dostępność

[T] A11y-1/4, zwłaszcza 4.1.3 AA: ogłoszenie bez zabierania focusu. Sprawdzić czas czytania i zasłanianie akcji. 2800 ms nie jest automatycznie gwarancją dostępności ani samoistnym wynikiem testu czasu. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S07/S08/S20; A02 `.toast`; A05/A06 `notify`.

**Materiały do otwarcia:** [S07](evidence/S07.jpg), [S08](evidence/S08.jpg), [S20](evidence/S20.jpg).

**[?] Luki:** Brak wariantu trwałego, krytycznego błędu, wielu komunikatów, undo i potwierdzonej polityki czasu. Rozważyć spójne brzmienie zapisu w obu kontekstach.


<a id="c20"></a>
## C20 · Nagłówek pełnej oferty

### Przeznaczenie i wybór

[R] Służy natychmiastowemu rozpoznaniu roli i firmy. Nie jest marketingowym wejściem C16 i nie zastępuje warunków C21.

### Anatomia i części

[P] 1. C08 znak, nazwa-link i data. 2. C07 kategoria. 3. Jedno H1 z pełną nazwą roli. 4. Fakty z ikonami: miasto, tryb, poziom. 5. Umiejętności. 6. Drobny opis i udostępnienie pod separatorem.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Treść | Krótki / bardzo długi tytuł | S03/S13; wysokość rośnie |
| Znak | Podany / inicjały | S03/S13 |
| Szerokość | Desktop / mobile | Pełne fakty, zmiana rozmiaru i zawijanie; S03/S04 |
| Kategoria | Build / Apply / Lead | Dane A06; S03 pokazuje Apply |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Rola / firma | teksty | Z wybranej oferty | Brak stałej wartości domyślnej; ID musi istnieć |
| Data | tekst względny | Dzisiaj, dni temu | Dane przykładowe, nie aktualny rynek |
| Fakty / tagi | zestaw | Miasto, tryb, poziom i umiejętności | Nie dopowiadać brakujących danych |
| Udostępnij | działanie | Kopia czystego adresu | Bez filtrów i zapisanych z nawigacji A06 |

### Tokeny i style

[P] Biel, ink1, r24. Tagi i kategoria mają r999. Separator line; ikony muted; żadna duża ilustracja za tytułem [A03]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Padding32px 36px 0 bazowo, mobile24px 23px 0. H1 odstępy30px 0 24px; mobile25px 0 22px. Fakty gap22 desktop /12×18 mobile. Rząd tagów margin22px 0 30px. Długie słowa i nazwy muszą się zawijać [A03].

### Typografia

[P] Geist Serif H1:64/400,1.04,−2px; mobile47/400,1.06,−1.5px. Firma Arial16/600, data11, fakty14/12, tagi12/11. Podpis i share11/10. Progi w fundamentach.

### Zachowanie, treści i lokalizacja

[P, A06] Nazwa firmy przewija do jej sekcji; udostępnij próbuje kopiować URL, a przy niedostępności schowka otwiera fallback C18. Nagłówek nie uruchamia aplikacji. Dla nieznanego ID używany jest C17 zamiast pustego H1.

### Zalecane i niewskazane praktyki

Zalecane: pełny długi tytuł jak w S13 i warunki poza ozdobną narracją. Niewskazane: osobne zmniejszanie fontu długiej roli, zastąpienie nazwy firmy ilustracją albo wklejenie hero z listingu [R].

### Dostępność

[T] A11y-2/3/4: jeden główny H1, nazwa firmy i dostępny share; brak utraty pełnej treści przy zoomie. Potwierdzenie kopiowania to status C19. Tekst „AI” i mieszane nazwy zawodów wymagają odczytu PL/EN do oceny. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S03/S04/S13; A03 `.offer-hero`, `.offer-key-facts`; A06.

**Materiały do otwarcia:** [S03](evidence/S03.jpg), [S04](evidence/S04.jpg), [S13](evidence/S13.jpg).

**[?] Luki:** Nie pokazano wielu umów, pracodawcy bez nazwy, ogłoszenia zamkniętego i tłumaczonej wersji. Brak stanu ładowania roli.


<a id="c21"></a>
## C21 · Panel warunków i działań

### Przeznaczenie i wybór

[R] Grupuje fakty potrzebne do decyzji i następny krok. Na desktopie wspiera długą lekturę, na mobile powinien wystąpić przed opisem, nie po profilu firmy.

### Anatomia i części

[P] 1. Etykieta wynagrodzenia. 2. Kwota C07 lub brak. 3. Jednostka i umowa. 4. Lista par nazwa–wartość: forma, tryb, lokalizacja, poziom. 5. Primary Aplikuj, secondary Zapisz. 6. Ograniczenie demo. Drobny napis pod panelem jest sąsiadem, nie warunkiem zatrudnienia.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Układ | Boczny sticky / w treści statyczny | S03/S04, potwierdzone A03 |
| Płaca | Kwota / brak | S03/S14 |
| Zapis | Nie / tak | Model A06 i C01 |
| Aplikowanie | Demonstracyjne | S11; nie pokazano prawdziwego zewnętrznego formularza |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Warunki | zestaw faktów | Zgodne z danymi tej oferty | Bez domyślnych wartości |
| Kwota | liczby lub brak | Jak C07 | Warunki muszą być przy liczbie |
| Tryb panelu | zależny od szerokości | Sticky >700 / static ≤700 | Nie wybór ręczny w obecnym UI |
| Akcje | zestaw | Aplikuj + Zapisz | Aplikuj ma ograniczenie demo |

### Tokeny i style

[P] Biel, obrys ink1, r24; płaca fact; pierwsze CTA action, zapis surface/fact po wyborze. Podział pod płacą ink [A03]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Kolumna350px bazowo,310≤1100,285≤850. Sticky top24; mobile kolejność po headerze i brak sticky. Płaca padding28×26; lista24×26; akcje0 26px 24px. Mobile płaca23×23 i lista w2 kolumnach; przyciski50px wysokości [A03].

### Typografia

[P] Płaca Arial24/600,−.7px; mobile25. Opis12; nazwy/wartości faktów12 bazowo i mobile11/13. Przyciski14/600, informacja demo10. Nie używa H dla każdej wartości [A03].

### Zachowanie, treści i lokalizacja

[P, A06] Zapis jest lokalnym stanem wizyty. Aplikuj otwiera informację o ograniczeniu. Sticky kończy się w granicach gridu oferty; nie jest paskiem fixed nad stopką. Brak faktycznej wysyłki i statusu „zaaplikowano”.

### Zalecane i niewskazane praktyki

Zalecane: jawny brak wynagrodzenia i umowa przy podanych widełkach. Niewskazane: CTA oznaczające wysyłkę bez działającej ścieżki lub brak adnotacji demo [R].

### Dostępność

[T] A11y-1/2/3/4: lista definicyjna dla faktów, zachowana kolejność mobilna, niezasłonięty focus, możliwość przeczytania panelu w niskim oknie. Dotychczasowy smoke test sticky nie jest pełnym testem 2.4.11. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S03/S04/S11/S14/S19; A03 `.offer-sidebar`, `.offer-action-card`; A06.

**Materiały do otwarcia:** [S03](evidence/S03.jpg), [S04](evidence/S04.jpg), [S11](evidence/S11.jpg), [S14](evidence/S14.jpg), [S19](evidence/S19.jpg).

**[?] Luki:** Wysokie panele z wieloma miastami/umowami, 320 px i poziomy telefon wymagają testu. Nie pokazano fixed CTA mobile ani prawdziwej aplikacji.


<a id="c22"></a>
## C22 · Sekcja treści, benefity i proces

### Przeznaczenie i wybór

[R] Porządkuje dłuższą lekturę oferty. Wariant dobieraj do informacji: akapit dla opisu, lista dla obowiązków, kafle bez ramek dla korzyści, numerowana sekwencja dla przebiegu rozmów. Nie jest to interaktywny stepper.

### Anatomia i części

[P] 1. H2 sekcji. 2. Lead/akapit lub lista. 3. H3 podsekcji [opcjonalny]. 4. Szary blok „Przyda się też” [wariant callout]. 5. Korzyści: ikona, H3, opis. 6. Proces: numer kołowy, H3, opis. Sekcje dzieli separator; zawierają się w jednym białym panelu.

### Warianty, stany i macierz obserwacji

| Oś | Pokazany wariant / stan | Zastosowanie, dowód i granica |
| --- | --- | --- |
| Treść | Opis / lista / callout | S03/S04 |
| Treść | Benefity w 2 kolumnach / pojedynczo | S03/S04 |
| Treść | Proces 01–03 | Statyczna uporządkowana lista; S03 |
| Zakończenie | H2 + opis + CTA demo | Na końcu czytania; ponownie używa C01 |

[P] Powyższe wiersze stanowią macierz rzeczywistych współwystąpień lub jawnych opisów. Nie tworzą pełnego iloczynu kombinacji.

### Właściwości i atrybuty

| Cecha | Typ roboczy [R] | Wartości / zakres [P] | Domyślność, efekt i zależność |
| --- | --- | --- | --- |
| Nagłówek / treść | teksty | Zależne od roli i kategorii | Brak domyślnej długości |
| Rodzaj bloku | wybór roboczy | paragraph / list / callout / benefits / process | [R] Nazwy dokumentacyjne, nie API |
| Elementy | lista | 3 etapy, 4 korzyści w przykładzie | Nie są limitami systemowymi |
| Ikona / numer | symbol lub porządek | Zależne od rodzaju | Nie status ukończenia |

### Tokeny i style

[P] Biały panel z ink1 i r24; wewnątrz separator line, callout papier z r18. Numery z cienkim konturem i papierem. Tekst muted, tytuły ink [A03]. Wszystkie dane dotyczą trybu jasnego.

### Wymiary, odległości i układ

[P, deklaracje CSS, nie pomiar bitmapy] Kolumna czytania: padding34×36; mobile28px 23px 30px. Następna sekcja: margin-top34 i padding-top32, mobile29/28. Lista gap15 i wcięcie23/20. Benefity gap30×28, przy ≤850 pojedyncza kolumna. Numer39×39 desktop /34×34 mobile, gap18/14 [A03].

### Typografia

[P] H2 36/400 desktop,33 mobile; H3 27/400 lub26 mobile; benefity24, proces25. Lead21/1.5, mobile20; akapit15/1.85, mobile15/1.8. Wszystkie H są Geist Serif; akapity Arial. Nie zakładać jednego H3 dla każdego podwariantu.

### Zachowanie, treści i lokalizacja

[P, A06] Statyczna treść przewijana i kotwice C13. Nie ma akordeonu, rozwijania list ani oznaczania zakończonych etapów. Opisy procesów i pracodawców są fikcyjną treścią demonstracji. RTL i edytor treści [?].

### Zalecane i niewskazane praktyki

Zalecane: oddzielne wymagania i obowiązki, etapy jako kolejność rozmów. Niewskazane: klikalne kółka 01–03 bez funkcji, nadmiar ramek wokół każdego zdania albo mniejszy font tylko dla dłuższego akapitu [R].

### Dostępność

[T] A11y-1/3/4: hierarchia H1→H2→H3, semantyczne listy, logiczna kolejność benefitów po zmianie kolumn. Numery nie mogą być jedynym opisem etapu. Ikony dekoracyjne nie powinny powtarzać całego tekstu. Test przy nadpisaniu odstępów i zoomie. Cel proponowany: WCAG 2.2 AA; zasady i wyjątki opisuje sekcja [Dostępność](#accessibility).

### Źródła i otwarte kwestie

**Podstawa:** S03/S04, opis i dolne sekcje; A03 `.offer-section`, `.offer-benefits`, `.offer-process`; A06.

**Materiały do otwarcia:** [S03](evidence/S03.jpg), [S04](evidence/S04.jpg).

**[?] Luki:** Nie ma potwierdzonego rich-text API, tabel w opisie, multimediów, rozwijania treści, timeline ze stanem aktywnym ani limitu długości. Pozostawić jako luki.

<a id="review"></a>
## Pokrycie, rozbieżności i decyzje do oceny

### Macierz pokrycia

| Rodziny | Pokryte osie i kombinacje | Co nie zostało dowiedzione |
| --- | --- | --- |
| C01–C04 — kontrolki | primary/secondary/text/icon; search/number; lokalizacja/sort; zaznaczony checkbox, focus liczby i selecta | Loading, custom error i disabled dla każdej kontrolki; pełna obsługa technologii asystujących. |
| C05–C07 — wybór i informacje | All/Build/Apply/Lead, liczba 0, ciemne wybranie, aktywne kryterium, płaca/tag/licznik, brak płacy | Nie każda wartość w każdym rozmiarze i stanie; siedem tagów, dwa kontrakty. |
| C08–C10 — tożsamość i wyniki | Cztery tła znaków, inicjały, długa firma; listing/related; zapis; długi tytuł; dwie strony i niedostępne kierunki | Prawdziwy obraz logo, wygaśnięcie roli, bardzo duża liczba stron. |
| C11–C16 — nawigacja i wyszukiwanie | Header/footer desktop/mobile, powrót i kotwice, pasek dwu-/jednorzędowy, filtry w kolumnie/dialogu, skompaktowana ilustracja | Mobilne pełne menu, draft filtrów, dynamiczna bieżąca sekcja, RTL. |
| C17–C19 — informowanie | Zero wyników, brak zapisanych, błędny adres; info/demo/mobile filter dialog; zapisany toast | Awaria serwera, alert krytyczny, fallback kopiowania jako obraz, pełny focus cycle/czytnik. |
| C20–C22 — strona roli | Krótki/długi tytuł, pełne/brakujące warunki, boczny/static panel, akapit/lista/callout/benefity/proces | Realna rekrutacja, formularz wysyłki, podwójne umowy, edytor rich text i media. |

Warianty opisane tylko w A01–A06 są wyraźnie odróżnione od utrwalonych obrazów. Wszystkie rozpoznane rodziny mają karty. Wszystkie 19 zrzutów przejrzano; nie jest to dowód pokrycia całego produktu. Brak zrzutu stanu nie oznacza automatycznie, że implementacja go nie obsługuje.

### Zarejestrowane rozbieżności — bez zmiany strony

| Temat | Obserwacja [P] | Decyzja / rekomendacja |
| --- | --- | --- |
| Starszy kierunek | Początkowy skill opisywał małe promienie i neutralne sans; późniejsza uwaga użytkownika zmieniła je na większe i Geist Serif dla H. | Aktualne S01–S04 i A01–A03 mają pierwszeństwo. Nie przywracać starych zasad przez samą nazwę skilla. |
| Skala tytułu karty | 28 px >1100; 26 px przy 851–1100; 28 px przy 601–850; 26 px ≤600. | [?] Czy pośrednia zmiana ma być świadomym kontraktem? [R] Ewentualne uproszczenie dopiero jako osobna decyzja. |
| Promienie | Główne 10/18/24, ale istnieją lokalne 3/5/8/14/16/999. | [R] Nazwać wyjątki lub je ujednolicić po ocenie. Dokumentacja nie przerabia ich na fikcyjne tokeny. |
| Sekcje roli | Kreska znajduje się na pierwszym linku niezależnie od kotwicy i scrolla. | [?] Zachować prostą nawigację bez wskaźnika bieżącego stanu czy wdrożyć rzeczywiste wskazanie? |
| Zapis | Aktualny opis akcji zmienia się wraz z aria-pressed. Header listingu jest przełącznikiem; na ofercie prowadzi do innej strony. | [?] Ustalić docelowy model semantyczny zapisu według C01, nie tylko wygląd zakładki. |
| Mobilne filtry | Zmiany obowiązują od razu, × i Escape ich nie cofają. Reset jest dostępny w desktopowej główce, która w dialogu znika. | [?] Czy zachować ten model? [R] Jeżeli powstanie draft, dodać odrębne znaczenie zastosowania i anulowania. |
| Drobny tekst | Pomocnicze informacje miejscami mają 9–11 px. Matematyczny kontrast części par jest dobry. | [R] Rozważyć większe metadane/stopkę; kontrast nie rozstrzyga wygody czytania. Brak minimalnej wielkości fontu nie oznacza komfortu. |
| Prawdziwe aplikowanie | Różowy przycisk otwiera informację o fikcyjnej ofercie. | [?] Przed realnym produktem osobno zaprojektować i zweryfikować ścieżkę aplikacji oraz jej błędy. Nie dokumentować jej jako istniejącej. |
| Stany produkcyjne | Brak pokazanego loadingu, awarii API, potwierdzonej palety error/warning i trybu ciemnego. | [?] Uzupełniać tylko zgodnie z potrzebą produktu. Nie doprojektowywać w tym wydaniu jako stanu źródłowego. |

### Lista testów przed uznaniem systemu za gotowy do wdrożenia

**[T]** Czytnik ekranu: nazwy i stany zapisu, grup filtrów, selectów, statusów, kolejność treści oferty. Klawiatura: widoczny focus, pełne cykle dialogów, usuwanie chipa, wymiana paginacji, poziomy rząd kategorii. Widoki: 320 CSS px, powiększenie 200/400%, niski viewport i nadpisane odstępy tekstu. Cele: rzeczywiste obszary labeli, ikon i zaokrąglonych przycisków wraz z wyjątkami 2.5.8. Dane: dwa kontrakty, brak logo graficznego, wiele lokalizacji, bardzo długie tłumaczenia. To lista dalszych testów, nie raport ich zaliczenia.

## Status wersji i przekazanie

**v1 — pełna dokumentacja dla designerów, do oceny.** Obejmuje fundamenty, 22 karty, macierze wariantów, materiały źródłowe i konkretne luki. Nie zmieniono projektu strony, nie wyeksportowano dokumentacji do narzędzia projektowego i nie przygotowano pakietu implementacyjnego dla agenta. Kolejna wersja może uwzględnić uwagi do nazw rodzin, szczegółowości i decyzji z powyższej tabeli.

