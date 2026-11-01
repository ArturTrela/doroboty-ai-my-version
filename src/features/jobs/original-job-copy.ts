// Public role descriptions; private recruiting briefs remain separate.
export const originalJobDescriptions: Record<string, string> = {
  "ai-product-manager": `W BrightLabs rozwijamy narzędzia dla zespołów finansowych i operacyjnych. Szukamy AI Product Managera, który poprowadzi wybrany obszar produktu: od rozmów z użytkownikami po sprawdzenie, czy wdrożenie ułatwiło im pracę. Będziesz współpracować z designerem, inżynierami i osobami prowadzącymi wdrożenia u klientów.

### Co będzie na Twoim biurku

Procesy naszych klientów nadal opierają się na arkuszach, wiadomościach i ręcznym sprawdzaniu dokumentów. Pomysłów na automatyzację jest więcej niż czasu na ich realizację. Twoim zadaniem będzie ustalić, które z nich warto sprawdzić i jaki zakres ma sens na początek.

- Poprowadzisz discovery i zbierzesz dane o obecnym sposobie pracy: czasie obsługi, poprawkach i wyjątkach.
- Z zespołem wybierzesz rozwiązanie, przygotujesz eksperyment i ustalisz kryteria odbioru.
- Uzgodnisz priorytety i zależności, a po wdrożeniu wrócisz do użytkowników z pytaniami o wynik.

### Na początek: jeden proces finansowy

W pierwszym kwartale poznasz klientów i wybierzesz z zespołem ograniczony scenariusz do pilota. Przygotujecie prototyp, sprawdzicie go z użytkownikami i porównacie wynik z punktem wyjścia. Na koniec przedstawisz rekomendację: co rozwijamy, co poprawiamy, z czego rezygnujemy. Nie każdy problem wymaga modelu językowego.

### Doświadczenie, z którego skorzystasz

Masz za sobą prowadzenie produktu cyfrowego od discovery do wdrożenia. Umiesz połączyć rozmowy z analizą danych i wyjaśnić, dlaczego ograniczasz zakres. Rozmawiasz z inżynierami o jakości, koszcie i ograniczeniach rozwiązania. Nie musisz samodzielnie trenować modeli. Przyda się znajomość produktów B2B i procesów operacyjnych.

### Ustalenia organizacyjne

Warszawa, praca hybrydowa, umowa o pracę: 22 000–29 000 zł brutto miesięcznie. Warsztaty i spotkania planujemy wspólnie. Priorytety uzgadniasz z osobą odpowiedzialną za obszar, a zobowiązania wobec klienta z zespołem wdrożeniowym.

Rekrutacja to rozmowa wstępna, omówienie jednego Twojego projektu i spotkanie z zespołem. Chcemy poznać decyzje i ich konsekwencje; poufne materiały możesz zastąpić opisem.`,

  "staff-ai-engineer": `### System, któremu można zaufać podczas pracy

Northstar Health rozwija oprogramowanie wspierające dokumentację i koordynację opieki. Personel medyczny pracuje pod presją czasu, na niepełnych danych i w kilku systemach jednocześnie. Sugestia modelu może oszczędzić czas, ale może też pominąć ważny fragment albo uzupełnić dokument informacją, której nie było w źródle. Potrzebujemy osoby, która pomoże zespołom rozpoznawać te sytuacje przed wdrożeniem i po nim.

Szukamy Staff AI Engineera do zespołu platformowego. Będziesz pracować z inżynierami produktu, osobami zajmującymi się danymi oraz ekspertami domenowymi. Twój obszar obejmuje rozwiązania wykorzystywane przez kilka funkcji produktu: wspólne integracje, ewaluacje i narzędzia potrzebne do utrzymania usług.

### Zakres techniczny

- Integracje modeli językowych: przygotowanie kontekstu, kontrakty API, walidacja wyników i obsługa niedostępności dostawcy.
- Zestawy ewaluacyjne opracowywane z ekspertami. Analiza pominięć, nieuprawnionych uzupełnień i odpowiedzi opartych na niewłaściwym źródle.
- Pomiar czasu odpowiedzi, kosztu i zmian jakości po aktualizacji modelu, promptu lub danych wejściowych.
- Mechanizmy zatwierdzania i korekty przez użytkownika oraz możliwość powrotu do wcześniejszej ścieżki obsługi.
- Przeglądy architektury i kodu, wsparcie innych inżynierów i dokumentowanie ograniczeń rozwiązania.

Nie kończysz pracy na działającym prototypie. Uczestniczysz we wdrożeniu, diagnozowaniu incydentów i usuwaniu ich przyczyn. Jednocześnie nie odpowiadasz samodzielnie za decyzje o zastosowaniu klinicznym ani dopuszczeniu funkcji do użycia.

### Pierwszy obszar: jakość dokumentacji

Zaczniesz od poznania przepływu danych, sposobu pracy personelu i istniejących testów. Z zespołem wybierzesz powtarzającą się klasę błędów, uzupełnisz zestaw kontrolny i przygotujesz zmianę z pomiarem przed i po wdrożeniu. Równolegle uporządkujesz sposób zgłaszania przypadków wymagających ręcznego sprawdzenia.

Przykładowe pytanie z tego projektu: co powinno się wydarzyć, gdy odpowiedź wygląda poprawnie, ale opiera się na nieaktualnym dokumencie? Trzeba rozstrzygnąć zarówno zachowanie usługi, jak i to, co zobaczy użytkownik. Będziesz omawiać takie przypadki z produktem i ekspertami, zamiast zamykać je wyłącznie w warstwie technicznej.

### Dane i ograniczenia

Pracujemy w środowisku regulowanym. Dostęp do materiałów jest ograniczony do potrzeb projektu, a testy zaczynamy od danych syntetycznych lub odpowiednio przygotowanych przykładów. Dokumentacja techniczna powinna pozwalać zrozumieć, na jakich danych sprawdzono rozwiązanie i gdzie kończy się wiarygodność wyniku.

W ewaluacji rozdzielamy przypadki używane podczas pracy nad rozwiązaniem od zestawu kontrolnego. Analizujemy też zachowanie przy brakujących danych, zmianie formatu wejścia i niedostępności modelu. Jeśli nie da się jeszcze bezpiecznie uruchomić funkcji, potrzebujemy jasnego opisu przyczyn i dalszych kroków.

### Co powinieneś umieć na starcie

- Projektować i utrzymywać usługi produkcyjne; wyjaśnić ich zachowanie przy awarii i wzroście obciążenia.
- Swobodnie pracować w Pythonie, integrować API i stosować testy oraz przeglądy kodu.
- Oceniać systemy wykorzystujące modele na reprezentatywnych przykładach i rozpoznawać regresje jakości.
- Omawiać kompromisy z osobami z produktu i obszaru medycznego, również wtedy, gdy oczekiwania są sprzeczne.
- Pomagać innym inżynierom dojść do decyzji i pozostawiać po sobie zrozumiałą dokumentację.

### Dodatkowe doświadczenie

Przyda się praca z wyszukiwaniem w dokumentach, kontrolą dostępu lub systemami przetwarzającymi dane wrażliwe. Nie zakładamy, że znasz wszystkie procesy medyczne. Wiedzę domenową uzupełnisz z ekspertami; ważne, żebyś potrafił dopytać o konsekwencje błędu i przełożyć odpowiedź na zachowanie produktu.

### Warunki współpracy

Zdalnie z Polski, B2B, 30 000–39 000 zł netto miesięcznie. Spotkania projektowe odbywają się w godzinach pracy zespołu. Kierunek architektury wypracowujesz z inżynierami, a zakres wdrożenia z produktem i ekspertami domenowymi. Podczas rekrutacji omawiamy sposób wsparcia usług, obowiązki związane z incydentami oraz zależności między zespołami.

### Rozmowy z nami

Najpierw uzgodnimy oczekiwania i warunki. Potem z inżynierami przejdziesz przez jeden utrzymywany przez Ciebie system: architekturę, trudną decyzję i problem, który ujawnił się po wdrożeniu. Ostatnia rozmowa dotyczy współpracy z produktem i pierwszego obszaru pracy. Nie prosimy o dane pacjentów ani poufny kod poprzedniego pracodawcy.`,

  "senior-product-designer-ai": `Użytkownik dostaje podpowiedź AI. Czy rozumie, skąd się wzięła? Co zrobi, jeśli połowa odpowiedzi jest dobra, a połowę trzeba poprawić? W Plain Sight projektujemy właśnie takie momenty w produktach B2B. Szukamy Senior Product Designera, który chce przejść całą drogę od obserwacji pracy do sprawdzenia wdrożonego rozwiązania.

Pracujesz bezpośrednio z klientem, product managerem i inżynierami. Inni designerzy pomagają w przeglądach i przygotowaniu badań. Pierwszym projektem będzie narzędzie do przeglądania materiałów z podpowiedziami systemu. Zbadasz, kiedy ludzie korzystają z sugestii, kiedy ją poprawiają, a kiedy wolą pracować samodzielnie.

### Od obserwacji do zachowania produktu

Będziesz prowadzić rozmowy i testy, rozpisywać przepływy, prototypować oraz dopracowywać interfejs z użyciem istniejącego design systemu. Ważne są także oczekiwanie na wynik, błąd i powrót do pracy po odrzuceniu podpowiedzi. Po oddaniu projektu sprawdzisz wdrożenie z inżynierami, w tym dostępność i zachowanie na różnych urządzeniach.

### Pokaż nam, jak podejmujesz decyzje

Szukamy doświadczenia we wdrożonych produktach, samodzielnym prowadzeniu badań i współpracy z zespołem technicznym. Figma, komponenty i prototypowanie to codzienny warsztat. W portfolio chcemy zobaczyć kontekst, Twój wkład, odrzucone opcje i to, co zmieniło się po testach. Projekt nie musi dotyczyć AI. Materiały objęte NDA możesz zastąpić zanonimizowanym omówieniem.

### Współpraca

B2B, 18 000–24 000 zł netto miesięcznie. Pracujemy hybrydowo we Wrocławiu i Warszawie; warsztaty, badania oraz obecność planujemy z zespołem. Po rozmowie wstępnej wspólnie przejdziemy przez Twoje portfolio, a potem poznasz osoby z produktu. Nie przygotowujesz dla nas nowych ekranów ani bezpłatnego projektu dla klienta.`,

  "ai-operations-specialist": `Warszawa · stacjonarnie · umowa o pracę · 11 000–16 000 zł brutto miesięcznie.

W BrightLabs szukamy osoby do usprawniania pracy finansów i obsługi klienta. Będziesz blisko ludzi, którzy dziś ręcznie przepisują dane, sprawdzają załączniki i przekazują zgłoszenia. W integracjach wspiera Cię inżynier, a za proces odpowiada jego właściciel.

### Trzy rzeczy, którymi się zajmiesz

1. Rozpiszesz proces razem z użytkownikami: kroki, wyjątki, dane i miejsca wymagające decyzji.
2. Zbudujesz małe automatyzacje, sprawdzisz ich wyniki i zostawisz ręczną ścieżkę obsługi błędów.
3. Pomożesz zespołowi zacząć z nich korzystać: instrukcja, demonstracja, poprawki po pierwszych dniach pracy.

### Z czym przychodzisz

- Znasz arkusze i narzędzie takie jak n8n lub Make.
- Rozumiesz podstawy API, webhooków i JSON; umiesz opisać błąd osobie technicznej.
- Potrafisz dopytać o nietypowy przypadek i sprawdzić treść wygenerowaną przez model.

### Jak zaczniemy

Na początek wybierzemy jeden powtarzalny krok do usprawnienia i zmierzymy, ile zajmuje czasu. Pierwszy kwartał ma zakończyć się używanym rozwiązaniem z instrukcją i ustalonym właścicielem utrzymania. Na rekrutacji omówimy Twoje wcześniejsze usprawnienie, a potem poznasz zespół. Wystarczy opis lub schemat bez danych klientów.`,

  "growth-lead-ai-products": `Praca zdalna w Europie. Umowa o pracę, 65 000–82 000 EUR brutto rocznie. Szczegóły zatrudnienia w danym kraju ustalamy na początku rozmów.

### Mamy produkt. Teraz potrzebujemy lepiej zrozumieć drogę do zakupu.

Northstar Health rozwija oprogramowanie do dokumentacji i koordynacji pracy zespołów medycznych. Szukamy Growth Leada, który pomoże znaleźć powtarzalny sposób docierania do organizacji z konkretnym problemem i gotowością do pilota. Będziesz pracować z produktem, sprzedażą, wdrożeniami i compliance.

W ochronie zdrowia decyzja rzadko zapada po jednym kontakcie. Użytkownik, osoba kupująca i osoba oceniająca ryzyko mogą mieć inne pytania. Chcemy wiedzieć, co pomaga przejść do wartościowej rozmowy, a co tylko zwiększa liczbę zapisów bez dalszego ciągu.

### Twoje decyzje i codzienna praca

- Wybierzesz z zespołem segment do sprawdzenia, poznasz jego problemy i sposób zakupu.
- Zaplanujesz eksperymenty dotyczące komunikacji, kanałów dotarcia i aktywacji po pierwszym kontakcie.
- Przygotujesz treści, strony i materiały wspierające sprzedaż. Twierdzenia o produkcie sprawdzisz przed publikacją.
- Uzgodnisz definicję kwalifikowanego kontaktu i sposób zbierania informacji o dalszym przebiegu rozmów.
- Będziesz kontrolować uzgodniony budżet i decydować, które próby kontynuować, zmienić lub zakończyć.

W pierwszym kwartale przejrzysz dotychczasowe działania i jakość danych w lejku, a następnie uruchomisz ograniczoną serię testów. Podsumowanie ma pokazać również pytania, na które nie da się jeszcze odpowiedzieć. Czas trwania zakupu trzeba uwzględnić w ocenie wyniku.

### Kiedy ta rola będzie dla Ciebie dobra

Masz doświadczenie w growth lub marketingu produktu B2B oraz we współpracy ze sprzedażą. Umiesz zaprojektować eksperyment, sprawdzić definicje metryk w analityce i CRM oraz ostrożnie wyciągać wnioski z małej liczby obserwacji. Potrafisz pisać i redagować komunikację. Po angielsku swobodnie rozmawiasz z zespołem i klientami w Europie.

Doświadczenie w healthtech lub innym obszarze regulowanym będzie pomocne. AI może przyspieszać research i przygotowanie szkiców, ale odpowiedzialność za komunikację pozostaje po naszej stronie. Nie oczekujemy automatyzacji każdego kontaktu z klientem.

### Jak będziemy współpracować

Spotkania planujemy w europejskich strefach czasowych. Kierunek działań uzgadniasz z produktem i sprzedażą; większe zmiany budżetu oraz obietnice dotyczące produktu wymagają ich udziału. Rekrutacja obejmuje rozmowę wstępną, omówienie Twojego eksperymentu lub kampanii i spotkanie z zespołem. Zanonimizowane dane wystarczą. Nie prosimy o bezpłatny plan wejścia na rynek.`,

  "machine-learning-engineer": `Wrocław, hybrydowo. B2B: 19 000–26 000 zł netto miesięcznie.

Plain Sight wdraża funkcje ML w produktach klientów B2B: klasyfikację zgłoszeń, wyszukiwanie podobnych dokumentów i przewidywanie zdarzeń w procesie. Szukamy Machine Learning Engineera na poziomie mid. Dołączysz do małego zespołu z inżynierami i osobą prowadzącą produkt. Trudniejsze decyzje omawiasz z bardziej doświadczonymi osobami.

### Projekt, od którego zaczniesz

Pierwszym zadaniem będzie funkcja pomagająca porządkować zgłoszenia. Sprawdzisz dane i etykiety, przygotujesz prostą metodę porównawczą, a potem eksperyment możliwy do powtórzenia przez inną osobę. Z produktem ustalisz, jak pokazać wynik i co zrobić, gdy model nie ma wystarczającej pewności.

Dalej przyjdzie integracja przez API lub zadanie wsadowe, testy i pomiar po uruchomieniu. Wspierają Cię inżynierowie produktu. Czasem najważniejszym wynikiem pracy będzie wskazanie brakujących danych albo zaproponowanie prostszego rozwiązania.

### Warsztat

- Python i SQL, przetwarzanie danych oraz biblioteki ML, np. pandas i scikit-learn.
- Walidacja bez wycieku informacji, analiza błędów i dobór metryk do kosztu pomyłki.
- Git, testy, przeglądy kodu i dokumentacja pozwalająca odtworzyć eksperyment.
- Podstawy kontenerów i integracji API albo gotowość do uzupełnienia tych umiejętności.

Przyda się doświadczenie z modelem działającym w używanym produkcie. Nie wymagamy publikacji naukowych. Liczy się też umiejętność wyjaśnienia osobie spoza obszaru danych, czego model jeszcze nie potrafi.

### Po wdrożeniu

Obserwujesz jakość danych wejściowych, czas działania i zmiany wyników. Przygotowujesz możliwość wycofania wersji. Priorytety ustalasz z osobą prowadzącą produkt, a dostęp do danych klienta odbywa się na zasadach projektu.

Porozmawiamy o Twoim doświadczeniu, potem o jednym projekcie ML — od danych po wdrożenie — i o współpracy z zespołem. Własny projekt lub zanonimizowany opis wystarczy; nie potrzebujemy poufnego kodu ani zbiorów.`,
};
