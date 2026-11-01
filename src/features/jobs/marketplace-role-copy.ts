export const companyContexts = [
  "Porządkujemy obieg dokumentów rozliczeniowych. Nasi użytkownicy muszą znaleźć źródło rozbieżności, zanim zamkną miesiąc, więc przy każdej podpowiedzi potrzebują dostępu do dokumentu.",
  "Rozwijamy narzędzia dla operatorów transportowych. Zlecenia zmieniają się w ciągu dnia, a dyspozytorzy muszą szybko ustalić, co wymaga ich uwagi i komu przekazać sprawę.",
  "Pracujemy nad produktami dla zespołów edukacyjnych. Pomagamy uporządkować materiały i sprawdzać, czy uczestnicy potrafią wykorzystać je w praktyce.",
  "Budujemy zaplecze cyfrowe dla handlu. Łączymy informacje o produktach, zamówieniach i zwrotach, które dotąd były rozproszone między kilkoma systemami.",
  "Projektujemy narzędzia dla zespołów pracujących z danymi o zużyciu energii. Surowy odczyt musi przejść kontrolę jakości, zanim stanie się podstawą raportu lub rekomendacji.",
  "Tworzymy oprogramowanie dla usług finansowych. Zespoły obsługi szukają odpowiedzi w dokumentach i potrzebują wiedzieć, czy korzystają z aktualnej wersji procedury.",
  "Wspieramy koordynację dostaw i pracę magazynów. Rozwijamy produkt obok działających procesów, których nie można po prostu zatrzymać na czas wdrożenia.",
  "Pomagamy organizatorom szkoleń korzystać z danych o nauce. Zależy nam na połączeniu zachowania w produkcie z postępem uczestnika, a nie samą liczbą otwarć lekcji.",
  "Automatyzujemy przepływ informacji w sklepach internetowych. Najwięcej uwagi poświęcamy wyjątkom: zmianie zamówienia, nietypowemu zwrotowi i brakującej informacji o produkcie.",
  "Rozwijamy oprogramowanie dla zespołów energetycznych. Użytkownicy łączą dane pomiarowe z dokumentacją techniczną i muszą rozumieć ograniczenia automatycznej analizy.",
  "Przygotowujemy narzędzia do analizy danych finansowych. W raporcie równie ważne jak wynik są definicja metryki, okres i możliwość powrotu do źródła.",
  "Budujemy produkty dla zespołów zarządzających łańcuchem dostaw. Praca zaczyna się od poznania lokalnego procesu, bo ten sam status w dwóch magazynach może oznaczać coś innego.",
  "Pomagamy zespołom szkoleniowym ograniczyć ręczną administrację. Automatyzacje mają działać także wtedy, gdy uczestnik zmieni grupę lub prowadzący poprawi plan zajęć.",
  "Rozwijamy platformę dla operacji handlowych. Zespół pracuje nad wspólnymi usługami, które mają obsługiwać kilka produktów i dawać się diagnozować bez zgadywania.",
  "Łączymy analitykę z codzienną pracą zespołów energii. Pomagamy zauważać nietypowe odczyty i sprawdzać ich przyczyny przed przekazaniem informacji dalej.",
  "Tworzymy produkty finansowe we współpracy z zespołami klienta. Pracujemy w krótkich przyrostach, ale każda zmiana wymaga uzgodnienia sposobu sprawdzenia i odbioru.",
  "Rozwijamy oprogramowanie wspierające procesy logistyczne. Część pracy odbywa się blisko zespołów operacyjnych, które mają mało czasu na testowanie nowych narzędzi.",
  "Projektujemy doświadczenia dla produktów edukacyjnych. Prowadzący i uczestnicy korzystają z tych samych materiałów w innym celu, dlatego nie zawsze potrzebują tego samego interfejsu.",
  "Pracujemy nad narzędziami dla e-commerce. Łączymy jakość katalogu, obsługę zamówień i komunikację z klientem, zamiast traktować te obszary jak niezależne kanały.",
  "Pomagamy zespołom energetycznym pracować z rozproszoną wiedzą. Dokumentacja bywa aktualizowana niezależnie od systemów pomiarowych i trzeba umieć rozpoznać sprzeczność.",
  "Budujemy narzędzia dla zespołów finansowych, które pracują na wielu źródłach danych. Najpierw porządkujemy definicje i dostęp, dopiero potem automatyzujemy analizę.",
  "Wspieramy zespoły obsługujące transport i dostawy. W produkcie ważny jest szybki powrót do ręcznej obsługi, gdy integracja nie zwróci wyniku na czas.",
  "Pracujemy z organizatorami programów edukacyjnych. Łączymy badania potrzeb z małymi wdrożeniami, które można sprawdzić podczas rzeczywistej pracy ze szkoleniem.",
  "Rozwijamy produkty dla handlu, opierając decyzje na obserwacji użytkowników i danych. Badamy również przypadki, w których rekomendacja nie pomaga albo wprowadza w błąd.",
  "Przygotowujemy narzędzia dla organizacji z sektora energii. Zespoły techniczne i biznesowe wspólnie ustalają zakres pilota oraz warunki jego dalszego utrzymania.",
];

export const roleContexts = [
  {
    project: "wybór jednego procesu do usprawnienia i sprawdzenie prototypu z jego użytkownikami",
    duties: [
      "Rozmowy z użytkownikami i analiza obecnego przebiegu pracy.",
      "Ustalenie priorytetów, zakresu eksperymentu i kryteriów odbioru.",
      "Porównanie wyniku pilota z punktem odniesienia oraz rekomendacja dalszych prac.",
    ],
    needs: [
      "Łączysz obserwacje użytkowników z danymi o korzystaniu z produktu.",
      "Potrafisz wyjaśnić kompromis między zakresem, kosztem i jakością rozwiązania.",
    ],
    detail:
      "Nie zakładamy, że odpowiedzią na każdą potrzebę jest nowa funkcja AI. Czasem trzeba zmienić formularz, uporządkować uprawnienia lub usunąć zbędny krok. Decyzję o rozszerzeniu pilota podejmujemy po sprawdzeniu, czy rozwiązanie jest używane i komu faktycznie oszczędza pracę.",
  },
  {
    project: "wyszukiwanie odpowiedzi w dokumentacji z cytowaniem źródeł i zestawem testów jakości",
    duties: [
      "Przygotowanie dokumentów, wyszukiwania i kontekstu przekazywanego do modelu.",
      "Integracja API, walidacja odpowiedzi, limity czasu i obsługa błędów dostawcy.",
      "Analiza nietrafionych odpowiedzi oraz pomiar opóźnień i kosztu.",
    ],
    needs: [
      "Pracujesz w Pythonie lub TypeScripcie i umiesz integrować API.",
      "Rozumiesz podstawy wyszukiwania w dokumentach i oceny odpowiedzi na oddzielnym zbiorze przykładów.",
    ],
    detail:
      "Testy obejmują pytania bez odpowiedzi w źródłach, sprzeczne wersje dokumentu i brak uprawnień do części materiałów. Samo wskazanie źródła nie wystarczy: sprawdzamy też, czy odpowiedź rzeczywiście z niego wynika. Użytkownik musi móc rozpoznać, kiedy system potrzebuje dodatkowych informacji.",
  },
  {
    project:
      "przeprojektowanie momentu, w którym użytkownik sprawdza, poprawia lub odrzuca sugestię AI",
    duties: [
      "Rozpisanie przepływu, stanów błędów i ręcznej ścieżki wykonania zadania.",
      "Prototypowanie zachowania produktu i prowadzenie testów użyteczności.",
      "Przygotowanie komponentów, treści i przeglądu wdrożenia z inżynierami.",
    ],
    needs: [
      "Pracujesz w Figmie i umiesz pokazać tok decyzji w projekcie.",
      "Uwzględniasz dostępność, treści oraz sytuacje inne niż poprawne zakończenie zadania.",
    ],
    detail:
      "W pierwszym badaniu chcemy zrozumieć, w którym momencie człowiek potrzebuje więcej kontekstu, a w którym nadmiar informacji przeszkadza. Prototyp obejmie również oczekiwanie na wynik, poprawkę i powrót do pracy po odrzuceniu podpowiedzi. Końcowe ekrany są tylko częścią rezultatu.",
  },
  {
    project: "skrócenie ręcznego przekazywania zgłoszeń między operacjami a obsługą klienta",
    duties: [
      "Mapa procesu obejmująca wyjątki, źródła danych i osoby podejmujące decyzję.",
      "Mała automatyzacja w n8n lub Make z możliwością ręcznej obsługi.",
      "Instrukcja dla zespołu, testowe uruchomienie i poprawki po pierwszych dniach pracy.",
    ],
    needs: [
      "Znasz arkusze i podstawy narzędzi automatyzacji.",
      "Rozumiesz webhooki oraz JSON i potrafisz opisać problem osobie technicznej.",
    ],
    detail:
      "Najpierw sprawdzimy, ile czasu zajmuje krok procesu i gdzie najczęściej brakuje informacji. Po uruchomieniu porównamy czas obsługi oraz liczbę poprawek. Jeśli automatyzacja przeniesie pracę na inny zespół, uwzględnimy to w ocenie wyniku zamiast traktować lokalną oszczędność jako sukces.",
  },
  {
    project: "porównanie modelu predykcyjnego z obecną regułą biznesową na danych kontrolnych",
    duties: [
      "Sprawdzenie jakości danych, etykiet i podziału zbiorów.",
      "Przygotowanie prostej metody porównawczej i powtarzalnego eksperymentu.",
      "Analiza błędów w segmentach oraz omówienie wyniku z produktem.",
    ],
    needs: [
      "Korzystasz z Pythona, SQL i bibliotek do analizy danych.",
      "Rozumiesz walidację, wyciek informacji i różnicę między korelacją a dowodem przyczynowym.",
    ],
    detail:
      "Wynik jednej zbiorczej metryki nie rozstrzygnie o wdrożeniu. Sprawdzimy, kto ponosi koszt pomyłki i czy model działa podobnie w różnych rodzajach przypadków. Jeśli danych jest za mało lub etykiety są niespójne, wynikiem eksperymentu może być plan uzupełnienia materiału.",
  },
  {
    project:
      "sprawdzenie, które komunikaty i kanały prowadzą do kwalifikowanych rozmów z klientami",
    duties: [
      "Wybór segmentu i hipotezy dotyczącej komunikacji.",
      "Przygotowanie testów kanałów i materiałów we współpracy ze sprzedażą.",
      "Analiza lejka wraz z jakością kontaktów i dalszym przebiegiem rozmów.",
    ],
    needs: [
      "Rozumiesz eksperymenty marketingowe i analitykę lejka.",
      "Umiesz redagować komunikację oraz ustalić ze sprzedażą definicję kwalifikowanego kontaktu.",
    ],
    detail:
      "Uwzględniamy czas procesu zakupowego i nie ogłaszamy zwycięzcy testu po kilku zapisach. Chcemy sprawdzić, czy obietnica w komunikacji odpowiada temu, co klient zastaje w produkcie. Materiały przygotowane z pomocą AI przechodzą redakcyjną weryfikację przed publikacją.",
  },
  {
    project: "uporządkowanie monitorowania jakości, kosztu i opóźnień wspólnej usługi modeli",
    duties: [
      "Rozwój kontraktów usługi, limitów i konfiguracji środowisk.",
      "Metryki, logi i alerty pomagające rozpoznać przyczynę problemu.",
      "Automatyzacja wdrożenia i powrotu do poprzedniej wersji.",
    ],
    needs: [
      "Rozumiesz utrzymanie usług, kontenery i integracje API.",
      "Potrafisz diagnozować problem na podstawie logów i metryk.",
    ],
    detail:
      "Z usługi korzysta kilka funkcji produktu, więc zmiana konfiguracji musi być przewidywalna dla zespołów. W pierwszym etapie odtworzymy scenariusze niedostępności dostawcy i przekroczenia limitu kosztu. Ustalimy, które zdarzenia wymagają interwencji, a które można obsłużyć automatycznie.",
  },
  {
    project:
      "zbadanie, kiedy użytkownicy przestają ufać automatycznej rekomendacji i co robią dalej",
    duties: [
      "Dobór uczestników i przygotowanie scenariusza badania.",
      "Rozmowy, obserwacje pracy oraz testy prototypów.",
      "Synteza z odwołaniem do materiału źródłowego i omówienie wniosków z zespołem.",
    ],
    needs: [
      "Potrafisz zadawać pytania bez sugerowania odpowiedzi.",
      "Odróżniasz obserwację, interpretację i deklarację uczestnika.",
    ],
    detail:
      "Nie zaczynamy od pytania, czy ludzie lubią AI. Interesują nas konkretne zadania i sytuacje: czego nie potrafili sprawdzić, co poprawili i dlaczego wrócili do starego sposobu pracy. W raporcie pokażemy także przypadki przeczące głównej interpretacji i granice zebranych danych.",
  },
  {
    project: "uporządkowanie definicji metryk i przygotowanie wiarygodnego zbioru do eksperymentu",
    duties: [
      "Modelowanie danych i uzgadnianie znaczenia pól z ich właścicielami.",
      "Testy transformacji, kompletności i świeżości danych.",
      "Dokumentacja modeli oraz wsparcie analityków korzystających z nich w raportach.",
    ],
    needs: [
      "Swobodnie pracujesz w SQL i rozumiesz transformacje danych.",
      "Umiesz znaleźć źródło rozbieżności między raportami i wyjaśnić przyjętą definicję.",
    ],
    detail:
      "Pierwszy zestaw obejmie zdarzenia produktu i rezultat procesu operacyjnego. Sprawdzimy klucze łączenia, duplikaty i różnice w czasie zapisu. Zamiast poprawiać każdy raport osobno, chcemy ustalić wspólną definicję oraz test, który wykryje ponowne pojawienie się problemu.",
  },
  {
    project: "wybranie procesu do pilota i uzgodnienie właścicieli zmiany z dwoma działami",
    duties: [
      "Rozpoznanie obecnego sposobu pracy i gotowości zespołu do zmiany.",
      "Ustalenie zakresu pilota, zależności, ryzyk i odpowiedzialności.",
      "Wsparcie wdrożenia oraz zebranie wyników i informacji o adopcji.",
    ],
    needs: [
      "Potrafisz prowadzić ustalenia z osobami o różnych potrzebach.",
      "Rozpisujesz proces i rozróżniasz problem narzędzia od problemu organizacji pracy.",
    ],
    detail:
      "Wdrożenie obejmuje nie tylko narzędzie, lecz także dostęp do danych, instrukcje i czas zespołu na naukę. Sponsor zatwierdza zmianę zakresu oraz dodatkowy budżet. Nie oczekujemy obietnicy pełnej automatyzacji: plan powinien wskazywać także przypadki pozostające po stronie człowieka.",
  },
  {
    project:
      "ustalenie, na którym etapie użytkownicy porzucają nowy produkt i jakie są możliwe przyczyny",
    duties: [
      "Kontrola poprawności zdarzeń i definicji lejka.",
      "Analiza ścieżek i segmentów oraz porównanie kohort.",
      "Przygotowanie rekomendacji i omówienie niepewności z zespołem produktu.",
    ],
    needs: [
      "Pracujesz z SQL i rozumiesz metryki produktu.",
      "Umiesz sprawdzić jakość pomiaru przed interpretacją zmiany wskaźnika.",
    ],
    detail:
      "Przejdziemy od zbiorczego lejka do konkretnych ścieżek i przykładów użycia. Rozważymy kilka wyjaśnień spadku, w tym zmianę składu użytkowników i błąd instrumentacji. Raport ma pomóc wybrać następny krok, a nie tylko pokazać efektowny wykres.",
  },
  {
    project: "opracowanie zasad tworzenia i redakcyjnej weryfikacji treści wspomaganych przez AI",
    duties: [
      "Rozpoznanie potrzeb odbiorców i przegląd istniejących materiałów.",
      "Przygotowanie briefów, przykładów i kryteriów oceny tekstu.",
      "Redakcja oraz sprawdzenie, czy publikacja pomaga w zadaniu odbiorcy.",
    ],
    needs: [
      "Umiesz pisać, redagować i sprawdzać twierdzenia w źródłach.",
      "Potrafisz przełożyć cel komunikacji na konkretny brief i plan treści.",
    ],
    detail:
      "Ustalimy, które informacje wymagają potwierdzenia przez eksperta i kto zatwierdza publikację. Przetestujemy zasady na niewielkiej serii materiałów, mierząc również czas poprawek. Sama liczba wygenerowanych tekstów nie będzie kryterium oceny pracy.",
  },
  {
    project: "przygotowanie powtarzalnego przetwarzania danych i wdrożenia niewielkiego modelu",
    duties: [
      "Wersjonowanie danych, kodu i artefaktów eksperymentu.",
      "Integracja predykcji z produktem i testy ścieżki wdrożenia.",
      "Monitorowanie danych wejściowych oraz przygotowanie wycofania wersji.",
    ],
    needs: [
      "Pracujesz w Pythonie i SQL oraz rozumiesz walidację modeli.",
      "Znasz Git i podstawy testowania kodu, który będzie utrzymywany przez zespół.",
    ],
    detail:
      "Eksperyment powinien dać się odtworzyć bez ręcznego odgadywania ustawień. Po wdrożeniu sprawdzimy jakość danych wejściowych, opóźnienie i zachowanie przy brakujących wartościach. Dobór modelu jest jednym z etapów; potrzebujemy także czytelnego sposobu utrzymania całego rozwiązania.",
  },
  {
    project: "połączenie dwóch API z kolejką zadań, obsługą błędów i ręczną ścieżką awaryjną",
    duties: [
      "Opis kontraktów integracji i mapowania danych.",
      "Obsługa ponowień, duplikatów i niepełnych odpowiedzi.",
      "Testy, logi i instrukcja diagnozowania problemów po wdrożeniu.",
    ],
    needs: [
      "Programujesz w Pythonie lub TypeScripcie i korzystasz z API.",
      "Rozumiesz uwierzytelnianie, limity zapytań i skutki ponownego wykonania zadania.",
    ],
    detail:
      "Najtrudniejsza część zwykle zaczyna się po poprawnym wykonaniu pierwszego scenariusza. Sprawdzimy, co dzieje się po przekroczeniu limitu, zmianie formatu danych i częściowym zapisaniu zadania. Użytkownik powinien wiedzieć, czy może bezpiecznie ponowić operację.",
  },
  {
    project:
      "zaprojektowanie dialogu, który pomaga zakończyć zadanie i potrafi przekazać je człowiekowi",
    duties: [
      "Opis intencji, kontekstu i brakujących informacji w rozmowie.",
      "Projekt odpowiedzi, doprecyzowań oraz komunikatów o błędach.",
      "Testowanie dialogów z użytkownikami i analiza miejsc przerwania rozmowy.",
    ],
    needs: [
      "Piszesz zrozumiałe treści i umiesz projektować przebieg rozmowy.",
      "Potrafisz ocenić dialog także pod kątem wykonania zadania, a nie tylko płynności odpowiedzi.",
    ],
    detail:
      "Pracujemy nad sytuacjami, w których użytkownik zmienia zdanie, podaje sprzeczne informacje lub potrzebuje innego rodzaju pomocy. Projekt obejmie przekazanie sprawy człowiekowi wraz z potrzebnym kontekstem. Nie chcemy zmuszać odbiorcy do rozpoczynania wszystkiego od nowa.",
  },
  {
    project: "doprowadzenie ograniczonego pilota do odbioru przez właściciela procesu",
    duties: [
      "Uzgodnienie zakresu, zależności i kryteriów odbioru.",
      "Koordynacja pracy produktu, inżynierii i użytkowników pilota.",
      "Prowadzenie przeglądów ryzyk oraz przygotowanie przekazania do utrzymania.",
    ],
    needs: [
      "Umiesz porządkować ustalenia, terminy i odpowiedzialność.",
      "Rozpoznajesz zależność blokującą wdrożenie i komunikujesz jej konsekwencje.",
    ],
    detail:
      "Plan wdrożenia powinien uwzględniać dostęp do danych, czas użytkowników i gotowość wsparcia. Decyzja o odbiorze należy do właściciela procesu, więc kryteria uzgadniamy przed rozpoczęciem prac. Przy zmianie zakresu pokażemy wpływ na termin i koszt zamiast dopisywać zadania bez końca.",
  },
  {
    project: "ustalenie kolejności prac i warunków akceptacji pierwszego przyrostu produktu",
    duties: [
      "Porządkowanie zgłoszeń i potrzeb wspólnie z produktem.",
      "Opis scenariuszy, wyjątków i warunków akceptacji.",
      "Wsparcie odbioru przyrostu i zebranie informacji z użytkowania.",
    ],
    needs: [
      "Potrafisz zamienić ogólne oczekiwanie na sprawdzalny zakres pracy.",
      "Umiesz omawiać priorytety i zależności z zespołem technicznym.",
    ],
    detail:
      "Nie oczekujemy najdłuższego backlogu. Potrzebujemy jasności, co robimy teraz, co czeka i dlaczego. Pierwszy przyrost powinien pozwolić sprawdzić ważne założenie bez budowy całego procesu. Po odbiorze wrócimy do użytkowników, żeby zobaczyć, czy efekt odpowiadał oczekiwaniom.",
  },
  {
    project:
      "automatyzacja jednego scenariusza komunikacji z możliwością pomiaru i wycofania zmiany",
    duties: [
      "Dobór segmentu, zdarzeń uruchamiających i reguł wykluczenia.",
      "Konfiguracja komunikacji i testy na przygotowanych kontach.",
      "Analiza reakcji oraz kontrola poprawności danych przekazywanych między narzędziami.",
    ],
    needs: [
      "Znasz narzędzie automatyzacji marketingu lub CRM.",
      "Rozumiesz segmentację, zdarzenia i potrzebę sprawdzenia komunikacji przed wysyłką.",
    ],
    detail:
      "Zanim uruchomimy scenariusz, sprawdzimy zgodność reguł kontaktu i sytuacje brzegowe: zmianę segmentu, opóźnione zdarzenie czy zakończenie współpracy. Ocenimy nie tylko reakcję na wiadomość, lecz także dalsze zachowanie w produkcie. Plan musi zawierać prosty sposób zatrzymania wysyłki.",
  },
  {
    project:
      "budowa testów regresji wykrywających odpowiedzi poprawne językowo, ale błędne merytorycznie",
    duties: [
      "Przygotowanie przypadków testowych z ekspertami domenowymi.",
      "Automatyzacja testów i analiza rozbieżności między ocenami.",
      "Raportowanie regresji po zmianie modelu, promptu lub źródła danych.",
    ],
    needs: [
      "Potrafisz opisać odtwarzalny błąd i ustalić oczekiwany rezultat.",
      "Znasz podstawy automatyzacji testów oraz oceny jakości odpowiedzi modeli.",
    ],
    detail:
      "Testy mają obejmować brakujące informacje, sprzeczne dokumenty i pytania poza zakresem systemu. Wspólnie ustalimy, które błędy blokują wdrożenie, a które wymagają dodatkowego przeglądu. Zestaw kontrolny musi pozostać niezależny od przykładów używanych podczas poprawiania rozwiązania.",
  },
  {
    project: "przygotowanie raportu łączącego wynik operacyjny z jakością danych źródłowych",
    duties: [
      "Uzgodnienie definicji miar z osobami podejmującymi decyzję.",
      "Budowa zestawień w SQL i czytelnego raportu BI.",
      "Sprawdzenie rozbieżności, braków oraz przyczyn zmian wskaźnika.",
    ],
    needs: [
      "Pracujesz w SQL i narzędziu BI oraz sprawdzasz pochodzenie danych.",
      "Umiesz opisać, do jakiej decyzji służy raport i czego nie da się z niego wywnioskować.",
    ],
    detail:
      "Najpierw przejdziemy przez decyzję, którą zespół ma podjąć na podstawie raportu. Sprawdzimy zakres danych, moment ich aktualizacji i wpływ brakujących rekordów. Chcemy uniknąć sytuacji, w której dwie osoby patrzą na tę samą nazwę metryki, ale rozumieją ją inaczej.",
  },
];
