-- Optional synthetic volume fixtures, separate from the canonical teaching seed.
-- Stable reserved IDs; reruns preserve existing fixture edits and all user-owned data.
begin;

create temporary table marketplace_fixture_companies on commit drop as
select
  ('a1000000-0000-4000-8000-' || lpad(n::text, 12, '0'))::uuid as id,
  ('a4000000-0000-4000-8000-' || lpad(n::text, 12, '0'))::uuid as organization_id,
  'demo-' || slug as slug,
  name,
  (array['Warszawa', 'Kraków', 'Wrocław', 'Gdańsk', 'Poznań', 'Łódź', 'Katowice', 'Lublin', 'Szczecin', 'Białystok'])[(n - 1) % 10 + 1] as city,
  (array[52.2297, 50.0647, 51.1079, 54.3520, 52.4064, 51.7592, 50.2649, 51.2465, 53.4285, 53.1325])[(n - 1) % 10 + 1] as latitude,
  (array[21.0122, 19.9450, 17.0385, 18.6466, 16.9252, 19.4560, 19.0238, 22.5684, 14.5528, 23.1688])[(n - 1) % 10 + 1] as longitude,
  (array['finanse', 'logistyka', 'edukacja', 'handel', 'energia'])[(n - 1) % 5 + 1] as sector
from (values
  (1, 'kobalt-labs', 'Kobalt Labs'), (2, 'orbita-cloud', 'Orbita Cloud'),
  (3, 'splot-data', 'Splot Data'), (4, 'iskra-systems', 'Iskra Systems'),
  (5, 'pryzmat-studio', 'Pryzmat Studio'), (6, 'foton-works', 'Foton Works'),
  (7, 'latarnia-digital', 'Latarnia Digital'), (8, 'mewa-analytics', 'Mewa Analytics'),
  (9, 'neon-flow', 'Neon Flow'), (10, 'wektor-ai', 'Wektor AI'),
  (11, 'bursztyn-tech', 'Bursztyn Tech'), (12, 'mozaika-products', 'Mozaika Products'),
  (13, 'kompas-automation', 'Kompas Automation'), (14, 'zorza-platform', 'Zorza Platform'),
  (15, 'puls-insights', 'Puls Insights'), (16, 'tandem-software', 'Tandem Software'),
  (17, 'szlak-robotics', 'Szlak Robotics'), (18, 'zefir-design', 'Zefir Design'),
  (19, 'rytm-commerce', 'Rytm Commerce'), (20, 'most-intelligence', 'Most Intelligence'),
  (21, 'lumen-tools', 'Lumen Tools'), (22, 'echo-operations', 'Echo Operations'),
  (23, 'atlas-discovery', 'Atlas Discovery'), (24, 'delta-research', 'Delta Research'),
  (25, 'punkt-solutions', 'Punkt Solutions')
) as company(n, slug, name);

-- BEGIN GENERATED COMPANY COPY
create temporary table marketplace_fixture_company_copy (id uuid primary key, summary text not null, description text not null) on commit drop;
insert into marketplace_fixture_company_copy values
('a1000000-0000-4000-8000-000000000001','Porządkujemy obieg dokumentów rozliczeniowych.','Kobalt Labs. Porządkujemy obieg dokumentów rozliczeniowych. Nasi użytkownicy muszą znaleźć źródło rozbieżności, zanim zamkną miesiąc, więc przy każdej podpowiedzi potrzebują dostępu do dokumentu.'),
('a1000000-0000-4000-8000-000000000002','Rozwijamy narzędzia dla operatorów transportowych.','Orbita Cloud. Rozwijamy narzędzia dla operatorów transportowych. Zlecenia zmieniają się w ciągu dnia, a dyspozytorzy muszą szybko ustalić, co wymaga ich uwagi i komu przekazać sprawę.'),
('a1000000-0000-4000-8000-000000000003','Pracujemy nad produktami dla zespołów edukacyjnych.','Splot Data. Pracujemy nad produktami dla zespołów edukacyjnych. Pomagamy uporządkować materiały i sprawdzać, czy uczestnicy potrafią wykorzystać je w praktyce.'),
('a1000000-0000-4000-8000-000000000004','Budujemy zaplecze cyfrowe dla handlu.','Iskra Systems. Budujemy zaplecze cyfrowe dla handlu. Łączymy informacje o produktach, zamówieniach i zwrotach, które dotąd były rozproszone między kilkoma systemami.'),
('a1000000-0000-4000-8000-000000000005','Projektujemy narzędzia dla zespołów pracujących z danymi o zużyciu energii.','Pryzmat Studio. Projektujemy narzędzia dla zespołów pracujących z danymi o zużyciu energii. Surowy odczyt musi przejść kontrolę jakości, zanim stanie się podstawą raportu lub rekomendacji.'),
('a1000000-0000-4000-8000-000000000006','Tworzymy oprogramowanie dla usług finansowych.','Foton Works. Tworzymy oprogramowanie dla usług finansowych. Zespoły obsługi szukają odpowiedzi w dokumentach i potrzebują wiedzieć, czy korzystają z aktualnej wersji procedury.'),
('a1000000-0000-4000-8000-000000000007','Wspieramy koordynację dostaw i pracę magazynów.','Latarnia Digital. Wspieramy koordynację dostaw i pracę magazynów. Rozwijamy produkt obok działających procesów, których nie można po prostu zatrzymać na czas wdrożenia.'),
('a1000000-0000-4000-8000-000000000008','Pomagamy organizatorom szkoleń korzystać z danych o nauce.','Mewa Analytics. Pomagamy organizatorom szkoleń korzystać z danych o nauce. Zależy nam na połączeniu zachowania w produkcie z postępem uczestnika, a nie samą liczbą otwarć lekcji.'),
('a1000000-0000-4000-8000-000000000009','Automatyzujemy przepływ informacji w sklepach internetowych.','Neon Flow. Automatyzujemy przepływ informacji w sklepach internetowych. Najwięcej uwagi poświęcamy wyjątkom: zmianie zamówienia, nietypowemu zwrotowi i brakującej informacji o produkcie.'),
('a1000000-0000-4000-8000-000000000010','Rozwijamy oprogramowanie dla zespołów energetycznych.','Wektor AI. Rozwijamy oprogramowanie dla zespołów energetycznych. Użytkownicy łączą dane pomiarowe z dokumentacją techniczną i muszą rozumieć ograniczenia automatycznej analizy.'),
('a1000000-0000-4000-8000-000000000011','Przygotowujemy narzędzia do analizy danych finansowych.','Bursztyn Tech. Przygotowujemy narzędzia do analizy danych finansowych. W raporcie równie ważne jak wynik są definicja metryki, okres i możliwość powrotu do źródła.'),
('a1000000-0000-4000-8000-000000000012','Budujemy produkty dla zespołów zarządzających łańcuchem dostaw.','Mozaika Products. Budujemy produkty dla zespołów zarządzających łańcuchem dostaw. Praca zaczyna się od poznania lokalnego procesu, bo ten sam status w dwóch magazynach może oznaczać coś innego.'),
('a1000000-0000-4000-8000-000000000013','Pomagamy zespołom szkoleniowym ograniczyć ręczną administrację.','Kompas Automation. Pomagamy zespołom szkoleniowym ograniczyć ręczną administrację. Automatyzacje mają działać także wtedy, gdy uczestnik zmieni grupę lub prowadzący poprawi plan zajęć.'),
('a1000000-0000-4000-8000-000000000014','Rozwijamy platformę dla operacji handlowych.','Zorza Platform. Rozwijamy platformę dla operacji handlowych. Zespół pracuje nad wspólnymi usługami, które mają obsługiwać kilka produktów i dawać się diagnozować bez zgadywania.'),
('a1000000-0000-4000-8000-000000000015','Łączymy analitykę z codzienną pracą zespołów energii.','Puls Insights. Łączymy analitykę z codzienną pracą zespołów energii. Pomagamy zauważać nietypowe odczyty i sprawdzać ich przyczyny przed przekazaniem informacji dalej.'),
('a1000000-0000-4000-8000-000000000016','Tworzymy produkty finansowe we współpracy z zespołami klienta.','Tandem Software. Tworzymy produkty finansowe we współpracy z zespołami klienta. Pracujemy w krótkich przyrostach, ale każda zmiana wymaga uzgodnienia sposobu sprawdzenia i odbioru.'),
('a1000000-0000-4000-8000-000000000017','Rozwijamy oprogramowanie wspierające procesy logistyczne.','Szlak Robotics. Rozwijamy oprogramowanie wspierające procesy logistyczne. Część pracy odbywa się blisko zespołów operacyjnych, które mają mało czasu na testowanie nowych narzędzi.'),
('a1000000-0000-4000-8000-000000000018','Projektujemy doświadczenia dla produktów edukacyjnych.','Zefir Design. Projektujemy doświadczenia dla produktów edukacyjnych. Prowadzący i uczestnicy korzystają z tych samych materiałów w innym celu, dlatego nie zawsze potrzebują tego samego interfejsu.'),
('a1000000-0000-4000-8000-000000000019','Pracujemy nad narzędziami dla e-commerce.','Rytm Commerce. Pracujemy nad narzędziami dla e-commerce. Łączymy jakość katalogu, obsługę zamówień i komunikację z klientem, zamiast traktować te obszary jak niezależne kanały.'),
('a1000000-0000-4000-8000-000000000020','Pomagamy zespołom energetycznym pracować z rozproszoną wiedzą.','Most Intelligence. Pomagamy zespołom energetycznym pracować z rozproszoną wiedzą. Dokumentacja bywa aktualizowana niezależnie od systemów pomiarowych i trzeba umieć rozpoznać sprzeczność.'),
('a1000000-0000-4000-8000-000000000021','Budujemy narzędzia dla zespołów finansowych, które pracują na wielu źródłach danych.','Lumen Tools. Budujemy narzędzia dla zespołów finansowych, które pracują na wielu źródłach danych. Najpierw porządkujemy definicje i dostęp, dopiero potem automatyzujemy analizę.'),
('a1000000-0000-4000-8000-000000000022','Wspieramy zespoły obsługujące transport i dostawy.','Echo Operations. Wspieramy zespoły obsługujące transport i dostawy. W produkcie ważny jest szybki powrót do ręcznej obsługi, gdy integracja nie zwróci wyniku na czas.'),
('a1000000-0000-4000-8000-000000000023','Pracujemy z organizatorami programów edukacyjnych.','Atlas Discovery. Pracujemy z organizatorami programów edukacyjnych. Łączymy badania potrzeb z małymi wdrożeniami, które można sprawdzić podczas rzeczywistej pracy ze szkoleniem.'),
('a1000000-0000-4000-8000-000000000024','Rozwijamy produkty dla handlu, opierając decyzje na obserwacji użytkowników i danych.','Delta Research. Rozwijamy produkty dla handlu, opierając decyzje na obserwacji użytkowników i danych. Badamy również przypadki, w których rekomendacja nie pomaga albo wprowadza w błąd.'),
('a1000000-0000-4000-8000-000000000025','Przygotowujemy narzędzia dla organizacji z sektora energii.','Punkt Solutions. Przygotowujemy narzędzia dla organizacji z sektora energii. Zespoły techniczne i biznesowe wspólnie ustalają zakres pilota oraz warunki jego dalszego utrzymania.');
-- END GENERATED COMPANY COPY

insert into public.companies (id, slug, name, summary, description, website_url, location, size_label)
select id, slug, name,
  companycopy.summary,
  companycopy.description,
  'https://' || slug || '.example.invalid', city,
  (array['11–50 osób', '51–200 osób', '201–500 osób'])[(row_number() over (order by id) - 1)::int % 3 + 1]
from marketplace_fixture_companies join marketplace_fixture_company_copy companycopy using (id)
on conflict (id) do nothing;

insert into public.organizations (id, company_id, name, slug)
select organization_id, id, name, slug from marketplace_fixture_companies
on conflict (id) do nothing;

create temporary table marketplace_fixture_jobs on commit drop as
select
  ('a2000000-0000-4000-8000-' || lpad(n::text, 12, '0'))::uuid as id,
  ('a3000000-0000-4000-8000-' || lpad(n::text, 12, '0'))::uuid as brief_id,
  company.id as company_id,
  company.slug || '-' || role.slug || '-' || n as slug,
  (array['Junior ', '', 'Senior ', 'Lead '])[((n - 1) % 4 + (n - 1) / 20) % 4 + 1] || role.title as title,
  role.category::public.job_category as category,
  role.function::public.job_function as function,
  role.focus,
  company.name as company_name, company.city, company.sector,
  company.latitude + ((n - 1) % 4 - 1.5) * 0.018 as latitude,
  company.longitude + ((n - 1) % 4 - 1.5) * 0.024 as longitude,
  (array['onsite', 'hybrid', 'remote'])[(n - 1) % 3 + 1]::public.remote_status as remote_status,
  (array['junior', 'mid', 'senior', 'lead'])[((n - 1) % 4 + (n - 1) / 20) % 4 + 1]::public.seniority_level as seniority,
  (array['employment', 'b2b', 'mandate'])[((n - 1) / 4) % 3 + 1]::public.contract_type as contract_type,
  (array['unverified', 'editorial', 'employer_verified'])[(n - 1) % 3 + 1]::public.verification_status as verification_status,
  7500 + (((n - 1) % 4 + (n - 1) / 20) % 4) * 6000 + ((n - 1) % 5) * 1000 as salary_min,
  now() - ((n - 1) % 21) * interval '1 day' as published_at,
  now() + interval '90 days' as expiry_at
from generate_series(1, 100) as series(n)
join marketplace_fixture_companies company on company.id =
  ('a1000000-0000-4000-8000-' || lpad((((n - 1) / 4) + 1)::text, 12, '0'))::uuid
join (values
  (1, 'ai-product-manager', 'AI Product Manager', 'lead', 'product', 'discovery i planowanie produktu'),
  (2, 'llm-engineer', 'LLM Engineer', 'build', 'engineering', 'integracje modeli językowych i ewaluacje'),
  (3, 'product-designer-ai', 'Product Designer — AI', 'apply', 'design', 'projektowanie kontroli i informacji zwrotnej'),
  (4, 'ai-operations-specialist', 'AI Operations Specialist', 'apply', 'operations', 'automatyzacja procesów operacyjnych'),
  (5, 'data-scientist', 'Data Scientist', 'build', 'data', 'eksperymenty i analiza danych'),
  (6, 'growth-strategist-ai', 'Growth Strategist — AI', 'lead', 'marketing', 'eksperymenty wzrostowe i pomiar konwersji'),
  (7, 'ai-platform-engineer', 'AI Platform Engineer', 'build', 'engineering', 'niezawodność platformy i obserwowalność'),
  (8, 'ux-researcher-ai', 'UX Researcher — AI', 'apply', 'design', 'badania użytkowników i testowanie prototypów'),
  (9, 'analytics-engineer', 'Analytics Engineer', 'build', 'data', 'modelowanie danych i jakość raportowania'),
  (10, 'ai-transformation-consultant', 'AI Transformation Consultant', 'lead', 'operations', 'adopcja AI i zarządzanie zmianą'),
  (11, 'product-analyst', 'Product Analyst', 'apply', 'product', 'analiza zachowań i metryk produktowych'),
  (12, 'ai-content-strategist', 'AI Content Strategist', 'apply', 'marketing', 'strategia treści i weryfikacja jakości'),
  (13, 'ml-engineer', 'Machine Learning Engineer', 'build', 'data', 'pipeline danych i wdrażanie modeli'),
  (14, 'automation-engineer', 'Automation Engineer', 'build', 'engineering', 'integracje API i automatyzacje'),
  (15, 'conversational-designer', 'Conversational Designer', 'apply', 'design', 'projektowanie dialogów i obsługa błędów'),
  (16, 'ai-delivery-manager', 'AI Delivery Manager', 'lead', 'operations', 'koordynacja wdrożeń i kryteria odbioru'),
  (17, 'ai-product-owner', 'AI Product Owner', 'lead', 'product', 'priorytetyzacja i walidacja potrzeb'),
  (18, 'marketing-automation-specialist', 'Marketing Automation Specialist', 'apply', 'marketing', 'automatyzacja komunikacji i eksperymenty'),
  (19, 'ai-quality-engineer', 'AI Quality Engineer', 'build', 'engineering', 'testy regresji i kontrola jakości odpowiedzi'),
  (20, 'business-intelligence-analyst', 'Business Intelligence Analyst', 'apply', 'data', 'metryki biznesowe i wspieranie decyzji')
) as role(position, slug, title, category, function, focus) on role.position = (n - 1) % 20 + 1;

-- BEGIN GENERATED MARKETPLACE COPY
create temporary table marketplace_fixture_copy (id uuid primary key, description text not null) on commit drop;
insert into marketplace_fixture_copy values
('a2000000-0000-4000-8000-000000000001','Kobalt Labs szuka osoby na stanowisko Junior AI Product Manager. Porządkujemy obieg dokumentów rozliczeniowych. Nasi użytkownicy muszą znaleźć źródło rozbieżności, zanim zamkną miesiąc, więc przy każdej podpowiedzi potrzebują dostępu do dokumentu.

### Zadania

- Rozmowy z użytkownikami i analiza obecnego przebiegu pracy.
- Ustalenie priorytetów, zakresu eksperymentu i kryteriów odbioru.
- Porównanie wyniku pilota z punktem odniesienia oraz rekomendacja dalszych prac.

### Na start

Pierwszy temat: wybór jednego procesu do usprawnienia i sprawdzenie prototypu z jego użytkownikami. Łączysz obserwacje użytkowników z danymi o korzystaniu z produktu. Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

Warszawa · stacjonarnie · umowa o pracę. 7500–12 500 zł brutto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna.'),
('a2000000-0000-4000-8000-000000000002','Porządkujemy obieg dokumentów rozliczeniowych. Nasi użytkownicy muszą znaleźć źródło rozbieżności, zanim zamkną miesiąc, więc przy każdej podpowiedzi potrzebują dostępu do dokumentu.

W firmie Kobalt Labs potrzebujemy osoby na stanowisko LLM Engineer. Pierwszym tematem będzie wyszukiwanie odpowiedzi w dokumentacji z cytowaniem źródeł i zestawem testów jakości.

Testy obejmują pytania bez odpowiedzi w źródłach, sprzeczne wersje dokumentu i brak uprawnień do części materiałów. Samo wskazanie źródła nie wystarczy: sprawdzamy też, czy odpowiedź rzeczywiście z niego wynika. Użytkownik musi móc rozpoznać, kiedy system potrzebuje dodatkowych informacji.

### Jak wygląda praca

Przygotowanie dokumentów, wyszukiwania i kontekstu przekazywanego do modelu. Integracja API, walidacja odpowiedzi, limity czasu i obsługa błędów dostawcy. Analiza nietrafionych odpowiedzi oraz pomiar opóźnień i kosztu.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

Pracujesz w Pythonie lub TypeScripcie i umiesz integrować API. Rozumiesz podstawy wyszukiwania w dokumentach i oceny odpowiedzi na oddzielnym zbiorze przykładów. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Ustalenia i kolejny krok

Warszawa · hybrydowo · umowa o pracę. 14 500–19 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000003','Kobalt Labs szuka osoby na stanowisko Senior Product Designer — AI. Porządkujemy obieg dokumentów rozliczeniowych. Nasi użytkownicy muszą znaleźć źródło rozbieżności, zanim zamkną miesiąc, więc przy każdej podpowiedzi potrzebują dostępu do dokumentu.

### Zadania

- Rozpisanie przepływu, stanów błędów i ręcznej ścieżki wykonania zadania.
- Prototypowanie zachowania produktu i prowadzenie testów użyteczności.
- Przygotowanie komponentów, treści i przeglądu wdrożenia z inżynierami.

### Na start

Pierwszy temat: przeprojektowanie momentu, w którym użytkownik sprawdza, poprawia lub odrzuca sugestię AI. Pracujesz w Figmie i umiesz pokazać tok decyzji w projekcie. Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

Warszawa · zdalnie · umowa o pracę. 21 500–26 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000004','Porządkujemy obieg dokumentów rozliczeniowych. Nasi użytkownicy muszą znaleźć źródło rozbieżności, zanim zamkną miesiąc, więc przy każdej podpowiedzi potrzebują dostępu do dokumentu.

W firmie Kobalt Labs potrzebujemy osoby na stanowisko Lead AI Operations Specialist. Pierwszym tematem będzie skrócenie ręcznego przekazywania zgłoszeń między operacjami a obsługą klienta.

Najpierw sprawdzimy, ile czasu zajmuje krok procesu i gdzie najczęściej brakuje informacji. Po uruchomieniu porównamy czas obsługi oraz liczbę poprawek. Jeśli automatyzacja przeniesie pracę na inny zespół, uwzględnimy to w ocenie wyniku zamiast traktować lokalną oszczędność jako sukces.

### Jak wygląda praca

Mapa procesu obejmująca wyjątki, źródła danych i osoby podejmujące decyzję. Mała automatyzacja w n8n lub Make z możliwością ręcznej obsługi. Instrukcja dla zespołu, testowe uruchomienie i poprawki po pierwszych dniach pracy.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

Znasz arkusze i podstawy narzędzi automatyzacji. Rozumiesz webhooki oraz JSON i potrafisz opisać problem osobie technicznej. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Ustalenia i kolejny krok

Warszawa · stacjonarnie · umowa o pracę. 28 500–33 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000005','Orbita Cloud szuka osoby na stanowisko Junior Data Scientist.

Rozwijamy narzędzia dla operatorów transportowych. Zlecenia zmieniają się w ciągu dnia, a dyspozytorzy muszą szybko ustalić, co wymaga ich uwagi i komu przekazać sprawę.

### Co będziesz robić

- Sprawdzenie jakości danych, etykiet i podziału zbiorów.
- Przygotowanie prostej metody porównawczej i powtarzalnego eksperymentu.
- Analiza błędów w segmentach oraz omówienie wyniku z produktem.

### Pierwszy projekt

Zaczynamy od jednego zadania: porównanie modelu predykcyjnego z obecną regułą biznesową na danych kontrolnych. Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Czego potrzebujesz

- Korzystasz z Pythona, SQL i bibliotek do analizy danych.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Warunki

Kraków · hybrydowo · B2B. 11 500–16 500 zł netto miesięcznie.

### Zanim dołączysz

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000006','### Dlaczego otwieramy tę rolę

Orbita Cloud szuka osoby na stanowisko Growth Strategist — AI.

Rozwijamy narzędzia dla operatorów transportowych. Zlecenia zmieniają się w ciągu dnia, a dyspozytorzy muszą szybko ustalić, co wymaga ich uwagi i komu przekazać sprawę.

### Projekt, od którego zaczniesz

Pierwszy temat to sprawdzenie, które komunikaty i kanały prowadzą do kwalifikowanych rozmów z klientami.

Uwzględniamy czas procesu zakupowego i nie ogłaszamy zwycięzcy testu po kilku zapisach. Chcemy sprawdzić, czy obietnica w komunikacji odpowiada temu, co klient zastaje w produkcie. Materiały przygotowane z pomocą AI przechodzą redakcyjną weryfikację przed publikacją.

### Codzienna praca

- Wybór segmentu i hipotezy dotyczącej komunikacji.
- Przygotowanie testów kanałów i materiałów we współpracy ze sprzedażą.
- Analiza lejka wraz z jakością kontaktów i dalszym przebiegiem rozmów.

### Poziom i zakres decyzji

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Rozumiesz eksperymenty marketingowe i analitykę lejka.
- Umiesz redagować komunikację oraz ustalić ze sprzedażą definicję kwalifikowanego kontaktu.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Kraków · zdalnie · B2B. 13 500–18 500 zł netto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000007','Orbita Cloud szuka osoby na stanowisko Senior AI Platform Engineer.

Rozwijamy narzędzia dla operatorów transportowych. Zlecenia zmieniają się w ciągu dnia, a dyspozytorzy muszą szybko ustalić, co wymaga ich uwagi i komu przekazać sprawę.

### Co będziesz robić

- Rozwój kontraktów usługi, limitów i konfiguracji środowisk.
- Metryki, logi i alerty pomagające rozpoznać przyczynę problemu.
- Automatyzacja wdrożenia i powrotu do poprzedniej wersji.

### Pierwszy projekt

Zaczynamy od jednego zadania: uporządkowanie monitorowania jakości, kosztu i opóźnień wspólnej usługi modeli. Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

### Czego potrzebujesz

- Rozumiesz utrzymanie usług, kontenery i integracje API.
- Potrafisz diagnozować problem na podstawie logów i metryk.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Warunki

Kraków · stacjonarnie · B2B. 20 500–25 500 zł netto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000008','### Dlaczego otwieramy tę rolę

Orbita Cloud szuka osoby na stanowisko Lead UX Researcher — AI.

Rozwijamy narzędzia dla operatorów transportowych. Zlecenia zmieniają się w ciągu dnia, a dyspozytorzy muszą szybko ustalić, co wymaga ich uwagi i komu przekazać sprawę.

### Projekt, od którego zaczniesz

Pierwszy temat to zbadanie, kiedy użytkownicy przestają ufać automatycznej rekomendacji i co robią dalej.

Nie zaczynamy od pytania, czy ludzie lubią AI. Interesują nas konkretne zadania i sytuacje: czego nie potrafili sprawdzić, co poprawili i dlaczego wrócili do starego sposobu pracy. W raporcie pokażemy także przypadki przeczące głównej interpretacji i granice zebranych danych.

### Codzienna praca

- Dobór uczestników i przygotowanie scenariusza badania.
- Rozmowy, obserwacje pracy oraz testy prototypów.
- Synteza z odwołaniem do materiału źródłowego i omówienie wniosków z zespołem.

### Poziom i zakres decyzji

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Potrafisz zadawać pytania bez sugerowania odpowiedzi.
- Odróżniasz obserwację, interpretację i deklarację uczestnika.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Kraków · hybrydowo · B2B. 27 500–32 500 zł netto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000009','Wrocław · zdalnie · umowa zlecenie. 10 500–15 500 zł brutto miesięcznie.

### Produkt i problem

Pracujemy nad produktami dla zespołów edukacyjnych. Pomagamy uporządkować materiały i sprawdzać, czy uczestnicy potrafią wykorzystać je w praktyce.

Splot Data szuka osoby na stanowisko Junior Analytics Engineer.

### Pierwszy zakres pracy

Uporządkowanie definicji metryk i przygotowanie wiarygodnego zbioru do eksperymentu.

- Modelowanie danych i uzgadnianie znaczenia pól z ich właścicielami.
- Testy transformacji, kompletności i świeżości danych.
- Dokumentacja modeli oraz wsparcie analityków korzystających z nich w raportach.

### Jak sprawdzimy efekt

Pierwszy zestaw obejmie zdarzenia produktu i rezultat procesu operacyjnego. Sprawdzimy klucze łączenia, duplikaty i różnice w czasie zapisu. Zamiast poprawiać każdy raport osobno, chcemy ustalić wspólną definicję oraz test, który wykryje ponowne pojawienie się problemu.

### Twoja odpowiedzialność

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Warsztat

- Swobodnie pracujesz w SQL i rozumiesz transformacje danych.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Rozmowy z nami

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000010','Na początek: wybranie procesu do pilota i uzgodnienie właścicieli zmiany z dwoma działami. To pierwszy projekt na stanowisku AI Transformation Consultant w firmie Splot Data.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Wdrożenie obejmuje nie tylko narzędzie, lecz także dostęp do danych, instrukcje i czas zespołu na naukę. Sponsor zatwierdza zmianę zakresu oraz dodatkowy budżet. Nie oczekujemy obietnicy pełnej automatyzacji: plan powinien wskazywać także przypadki pozostające po stronie człowieka.

### Co jest w Twoim zakresie

- Rozpoznanie obecnego sposobu pracy i gotowości zespołu do zmiany.
- Ustalenie zakresu pilota, zależności, ryzyk i odpowiedzialności.
- Wsparcie wdrożenia oraz zebranie wyników i informacji o adopcji.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Dobra współpraca

Potrafisz prowadzić ustalenia z osobami o różnych potrzebach. Rozpisujesz proces i rozróżniasz problem narzędzia od problemu organizacji pracy. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

Pracujemy nad produktami dla zespołów edukacyjnych. Pomagamy uporządkować materiały i sprawdzać, czy uczestnicy potrafią wykorzystać je w praktyce.

Wrocław · stacjonarnie · umowa zlecenie. 17 500–22 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000011','Wrocław · hybrydowo · umowa zlecenie. 19 500–24 500 zł brutto miesięcznie.

### Produkt i problem

Pracujemy nad produktami dla zespołów edukacyjnych. Pomagamy uporządkować materiały i sprawdzać, czy uczestnicy potrafią wykorzystać je w praktyce.

Splot Data szuka osoby na stanowisko Senior Product Analyst.

### Pierwszy zakres pracy

Ustalenie, na którym etapie użytkownicy porzucają nowy produkt i jakie są możliwe przyczyny.

- Kontrola poprawności zdarzeń i definicji lejka.
- Analiza ścieżek i segmentów oraz porównanie kohort.
- Przygotowanie rekomendacji i omówienie niepewności z zespołem produktu.

### Jak sprawdzimy efekt

Przejdziemy od zbiorczego lejka do konkretnych ścieżek i przykładów użycia. Rozważymy kilka wyjaśnień spadku, w tym zmianę składu użytkowników i błąd instrumentacji. Raport ma pomóc wybrać następny krok, a nie tylko pokazać efektowny wykres.

### Twoja odpowiedzialność

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

### Warsztat

- Pracujesz z SQL i rozumiesz metryki produktu.
- Umiesz sprawdzić jakość pomiaru przed interpretacją zmiany wskaźnika.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000012','Na początek: opracowanie zasad tworzenia i redakcyjnej weryfikacji treści wspomaganych przez AI. To pierwszy projekt na stanowisku Lead AI Content Strategist w firmie Splot Data.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Ustalimy, które informacje wymagają potwierdzenia przez eksperta i kto zatwierdza publikację. Przetestujemy zasady na niewielkiej serii materiałów, mierząc również czas poprawek. Sama liczba wygenerowanych tekstów nie będzie kryterium oceny pracy.

### Co jest w Twoim zakresie

- Rozpoznanie potrzeb odbiorców i przegląd istniejących materiałów.
- Przygotowanie briefów, przykładów i kryteriów oceny tekstu.
- Redakcja oraz sprawdzenie, czy publikacja pomaga w zadaniu odbiorcy.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Dobra współpraca

Umiesz pisać, redagować i sprawdzać twierdzenia w źródłach. Potrafisz przełożyć cel komunikacji na konkretny brief i plan treści. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

Pracujemy nad produktami dla zespołów edukacyjnych. Pomagamy uporządkować materiały i sprawdzać, czy uczestnicy potrafią wykorzystać je w praktyce.

Wrocław · zdalnie · umowa zlecenie. 26 500–31 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000013','Budujemy zaplecze cyfrowe dla handlu. Łączymy informacje o produktach, zamówieniach i zwrotach, które dotąd były rozproszone między kilkoma systemami.

W firmie Iskra Systems potrzebujemy osoby na stanowisko Junior Machine Learning Engineer. Pierwszym tematem będzie przygotowanie powtarzalnego przetwarzania danych i wdrożenia niewielkiego modelu.

Eksperyment powinien dać się odtworzyć bez ręcznego odgadywania ustawień. Po wdrożeniu sprawdzimy jakość danych wejściowych, opóźnienie i zachowanie przy brakujących wartościach. Dobór modelu jest jednym z etapów; potrzebujemy także czytelnego sposobu utrzymania całego rozwiązania.

### Jak wygląda praca

Wersjonowanie danych, kodu i artefaktów eksperymentu. Integracja predykcji z produktem i testy ścieżki wdrożenia. Monitorowanie danych wejściowych oraz przygotowanie wycofania wersji.

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

Pracujesz w Pythonie i SQL oraz rozumiesz walidację modeli. Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Ustalenia i kolejny krok

Gdańsk · stacjonarnie · umowa o pracę. 9500–14 500 zł brutto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000014','Iskra Systems szuka osoby na stanowisko Automation Engineer. Budujemy zaplecze cyfrowe dla handlu. Łączymy informacje o produktach, zamówieniach i zwrotach, które dotąd były rozproszone między kilkoma systemami.

### Zadania

- Opis kontraktów integracji i mapowania danych.
- Obsługa ponowień, duplikatów i niepełnych odpowiedzi.
- Testy, logi i instrukcja diagnozowania problemów po wdrożeniu.

### Na start

Pierwszy temat: połączenie dwóch API z kolejką zadań, obsługą błędów i ręczną ścieżką awaryjną. Programujesz w Pythonie lub TypeScripcie i korzystasz z API. Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

Gdańsk · hybrydowo · umowa o pracę. 16 500–21 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000015','Budujemy zaplecze cyfrowe dla handlu. Łączymy informacje o produktach, zamówieniach i zwrotach, które dotąd były rozproszone między kilkoma systemami.

W firmie Iskra Systems potrzebujemy osoby na stanowisko Senior Conversational Designer. Pierwszym tematem będzie zaprojektowanie dialogu, który pomaga zakończyć zadanie i potrafi przekazać je człowiekowi.

Pracujemy nad sytuacjami, w których użytkownik zmienia zdanie, podaje sprzeczne informacje lub potrzebuje innego rodzaju pomocy. Projekt obejmie przekazanie sprawy człowiekowi wraz z potrzebnym kontekstem. Nie chcemy zmuszać odbiorcy do rozpoczynania wszystkiego od nowa.

### Jak wygląda praca

Opis intencji, kontekstu i brakujących informacji w rozmowie. Projekt odpowiedzi, doprecyzowań oraz komunikatów o błędach. Testowanie dialogów z użytkownikami i analiza miejsc przerwania rozmowy.

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

Piszesz zrozumiałe treści i umiesz projektować przebieg rozmowy. Potrafisz ocenić dialog także pod kątem wykonania zadania, a nie tylko płynności odpowiedzi. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Ustalenia i kolejny krok

Gdańsk · zdalnie · umowa o pracę. 23 500–28 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000016','Iskra Systems szuka osoby na stanowisko Lead AI Delivery Manager. Budujemy zaplecze cyfrowe dla handlu. Łączymy informacje o produktach, zamówieniach i zwrotach, które dotąd były rozproszone między kilkoma systemami.

### Zadania

- Uzgodnienie zakresu, zależności i kryteriów odbioru.
- Koordynacja pracy produktu, inżynierii i użytkowników pilota.
- Prowadzenie przeglądów ryzyk oraz przygotowanie przekazania do utrzymania.

### Na start

Pierwszy temat: doprowadzenie ograniczonego pilota do odbioru przez właściciela procesu. Umiesz porządkować ustalenia, terminy i odpowiedzialność. Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

Gdańsk · stacjonarnie · umowa o pracę. 25 500–30 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000017','### Dlaczego otwieramy tę rolę

Pryzmat Studio szuka osoby na stanowisko Junior AI Product Owner.

Projektujemy narzędzia dla zespołów pracujących z danymi o zużyciu energii. Surowy odczyt musi przejść kontrolę jakości, zanim stanie się podstawą raportu lub rekomendacji.

### Projekt, od którego zaczniesz

Pierwszy temat to ustalenie kolejności prac i warunków akceptacji pierwszego przyrostu produktu.

Nie oczekujemy najdłuższego backlogu. Potrzebujemy jasności, co robimy teraz, co czeka i dlaczego. Pierwszy przyrost powinien pozwolić sprawdzić ważne założenie bez budowy całego procesu. Po odbiorze wrócimy do użytkowników, żeby zobaczyć, czy efekt odpowiadał oczekiwaniom.

### Codzienna praca

- Porządkowanie zgłoszeń i potrzeb wspólnie z produktem.
- Opis scenariuszy, wyjątków i warunków akceptacji.
- Wsparcie odbioru przyrostu i zebranie informacji z użytkowania.

### Poziom i zakres decyzji

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Potrafisz zamienić ogólne oczekiwanie na sprawdzalny zakres pracy.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Poznań · hybrydowo · B2B. 8500–13 500 zł netto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000018','Pryzmat Studio szuka osoby na stanowisko Marketing Automation Specialist.

Projektujemy narzędzia dla zespołów pracujących z danymi o zużyciu energii. Surowy odczyt musi przejść kontrolę jakości, zanim stanie się podstawą raportu lub rekomendacji.

### Co będziesz robić

- Dobór segmentu, zdarzeń uruchamiających i reguł wykluczenia.
- Konfiguracja komunikacji i testy na przygotowanych kontach.
- Analiza reakcji oraz kontrola poprawności danych przekazywanych między narzędziami.

### Pierwszy projekt

Zaczynamy od jednego zadania: automatyzacja jednego scenariusza komunikacji z możliwością pomiaru i wycofania zmiany. Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Czego potrzebujesz

- Znasz narzędzie automatyzacji marketingu lub CRM.
- Rozumiesz segmentację, zdarzenia i potrzebę sprawdzenia komunikacji przed wysyłką.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Warunki

Poznań · zdalnie · B2B. 15 500–20 500 zł netto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000019','### Dlaczego otwieramy tę rolę

Pryzmat Studio szuka osoby na stanowisko Senior AI Quality Engineer.

Projektujemy narzędzia dla zespołów pracujących z danymi o zużyciu energii. Surowy odczyt musi przejść kontrolę jakości, zanim stanie się podstawą raportu lub rekomendacji.

### Projekt, od którego zaczniesz

Pierwszy temat to budowa testów regresji wykrywających odpowiedzi poprawne językowo, ale błędne merytorycznie.

Testy mają obejmować brakujące informacje, sprzeczne dokumenty i pytania poza zakresem systemu. Wspólnie ustalimy, które błędy blokują wdrożenie, a które wymagają dodatkowego przeglądu. Zestaw kontrolny musi pozostać niezależny od przykładów używanych podczas poprawiania rozwiązania.

### Codzienna praca

- Przygotowanie przypadków testowych z ekspertami domenowymi.
- Automatyzacja testów i analiza rozbieżności między ocenami.
- Raportowanie regresji po zmianie modelu, promptu lub źródła danych.

### Poziom i zakres decyzji

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Potrafisz opisać odtwarzalny błąd i ustalić oczekiwany rezultat.
- Znasz podstawy automatyzacji testów oraz oceny jakości odpowiedzi modeli.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Poznań · stacjonarnie · B2B. 22 500–27 500 zł netto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000020','Pryzmat Studio szuka osoby na stanowisko Lead Business Intelligence Analyst.

Projektujemy narzędzia dla zespołów pracujących z danymi o zużyciu energii. Surowy odczyt musi przejść kontrolę jakości, zanim stanie się podstawą raportu lub rekomendacji.

### Co będziesz robić

- Uzgodnienie definicji miar z osobami podejmującymi decyzję.
- Budowa zestawień w SQL i czytelnego raportu BI.
- Sprawdzenie rozbieżności, braków oraz przyczyn zmian wskaźnika.

### Pierwszy projekt

Zaczynamy od jednego zadania: przygotowanie raportu łączącego wynik operacyjny z jakością danych źródłowych. Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Czego potrzebujesz

- Pracujesz w SQL i narzędziu BI oraz sprawdzasz pochodzenie danych.
- Umiesz opisać, do jakiej decyzji służy raport i czego nie da się z niego wywnioskować.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Warunki

Poznań · hybrydowo · B2B. 29 500–34 500 zł netto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000021','Na początek: wybór jednego procesu do usprawnienia i sprawdzenie prototypu z jego użytkownikami. To pierwszy projekt na stanowisku AI Product Manager w firmie Foton Works.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Nie zakładamy, że odpowiedzią na każdą potrzebę jest nowa funkcja AI. Czasem trzeba zmienić formularz, uporządkować uprawnienia lub usunąć zbędny krok. Decyzję o rozszerzeniu pilota podejmujemy po sprawdzeniu, czy rozwiązanie jest używane i komu faktycznie oszczędza pracę.

### Co jest w Twoim zakresie

- Rozmowy z użytkownikami i analiza obecnego przebiegu pracy.
- Ustalenie priorytetów, zakresu eksperymentu i kryteriów odbioru.
- Porównanie wyniku pilota z punktem odniesienia oraz rekomendacja dalszych prac.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Dobra współpraca

Łączysz obserwacje użytkowników z danymi o korzystaniu z produktu. Potrafisz wyjaśnić kompromis między zakresem, kosztem i jakością rozwiązania. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

Tworzymy oprogramowanie dla usług finansowych. Zespoły obsługi szukają odpowiedzi w dokumentach i potrzebują wiedzieć, czy korzystają z aktualnej wersji procedury.

Łódź · zdalnie · umowa zlecenie. 13 500–18 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000022','Łódź · stacjonarnie · umowa zlecenie. 20 500–25 500 zł brutto miesięcznie.

### Produkt i problem

Tworzymy oprogramowanie dla usług finansowych. Zespoły obsługi szukają odpowiedzi w dokumentach i potrzebują wiedzieć, czy korzystają z aktualnej wersji procedury.

Foton Works szuka osoby na stanowisko Senior LLM Engineer.

### Pierwszy zakres pracy

Wyszukiwanie odpowiedzi w dokumentacji z cytowaniem źródeł i zestawem testów jakości.

- Przygotowanie dokumentów, wyszukiwania i kontekstu przekazywanego do modelu.
- Integracja API, walidacja odpowiedzi, limity czasu i obsługa błędów dostawcy.
- Analiza nietrafionych odpowiedzi oraz pomiar opóźnień i kosztu.

### Jak sprawdzimy efekt

Testy obejmują pytania bez odpowiedzi w źródłach, sprzeczne wersje dokumentu i brak uprawnień do części materiałów. Samo wskazanie źródła nie wystarczy: sprawdzamy też, czy odpowiedź rzeczywiście z niego wynika. Użytkownik musi móc rozpoznać, kiedy system potrzebuje dodatkowych informacji.

### Twoja odpowiedzialność

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

### Warsztat

- Pracujesz w Pythonie lub TypeScripcie i umiesz integrować API.
- Rozumiesz podstawy wyszukiwania w dokumentach i oceny odpowiedzi na oddzielnym zbiorze przykładów.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000023','Na początek: przeprojektowanie momentu, w którym użytkownik sprawdza, poprawia lub odrzuca sugestię AI. To pierwszy projekt na stanowisku Lead Product Designer — AI w firmie Foton Works.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

W pierwszym badaniu chcemy zrozumieć, w którym momencie człowiek potrzebuje więcej kontekstu, a w którym nadmiar informacji przeszkadza. Prototyp obejmie również oczekiwanie na wynik, poprawkę i powrót do pracy po odrzuceniu podpowiedzi. Końcowe ekrany są tylko częścią rezultatu.

### Co jest w Twoim zakresie

- Rozpisanie przepływu, stanów błędów i ręcznej ścieżki wykonania zadania.
- Prototypowanie zachowania produktu i prowadzenie testów użyteczności.
- Przygotowanie komponentów, treści i przeglądu wdrożenia z inżynierami.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Dobra współpraca

Pracujesz w Figmie i umiesz pokazać tok decyzji w projekcie. Uwzględniasz dostępność, treści oraz sytuacje inne niż poprawne zakończenie zadania. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

Tworzymy oprogramowanie dla usług finansowych. Zespoły obsługi szukają odpowiedzi w dokumentach i potrzebują wiedzieć, czy korzystają z aktualnej wersji procedury.

Łódź · hybrydowo · umowa zlecenie. 27 500–32 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000024','Foton Works szuka osoby na stanowisko Junior AI Operations Specialist. Tworzymy oprogramowanie dla usług finansowych. Zespoły obsługi szukają odpowiedzi w dokumentach i potrzebują wiedzieć, czy korzystają z aktualnej wersji procedury.

### Zadania

- Mapa procesu obejmująca wyjątki, źródła danych i osoby podejmujące decyzję.
- Mała automatyzacja w n8n lub Make z możliwością ręcznej obsługi.
- Instrukcja dla zespołu, testowe uruchomienie i poprawki po pierwszych dniach pracy.

### Na start

Pierwszy temat: skrócenie ręcznego przekazywania zgłoszeń między operacjami a obsługą klienta. Znasz arkusze i podstawy narzędzi automatyzacji. Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

Łódź · zdalnie · umowa zlecenie. 10 500–15 500 zł brutto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna.'),
('a2000000-0000-4000-8000-000000000025','Latarnia Digital szuka osoby na stanowisko Data Scientist. Wspieramy koordynację dostaw i pracę magazynów. Rozwijamy produkt obok działających procesów, których nie można po prostu zatrzymać na czas wdrożenia.

### Zadania

- Sprawdzenie jakości danych, etykiet i podziału zbiorów.
- Przygotowanie prostej metody porównawczej i powtarzalnego eksperymentu.
- Analiza błędów w segmentach oraz omówienie wyniku z produktem.

### Na start

Pierwszy temat: porównanie modelu predykcyjnego z obecną regułą biznesową na danych kontrolnych. Korzystasz z Pythona, SQL i bibliotek do analizy danych. Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

Katowice · stacjonarnie · umowa o pracę. 17 500–22 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000026','Wspieramy koordynację dostaw i pracę magazynów. Rozwijamy produkt obok działających procesów, których nie można po prostu zatrzymać na czas wdrożenia.

W firmie Latarnia Digital potrzebujemy osoby na stanowisko Senior Growth Strategist — AI. Pierwszym tematem będzie sprawdzenie, które komunikaty i kanały prowadzą do kwalifikowanych rozmów z klientami.

Uwzględniamy czas procesu zakupowego i nie ogłaszamy zwycięzcy testu po kilku zapisach. Chcemy sprawdzić, czy obietnica w komunikacji odpowiada temu, co klient zastaje w produkcie. Materiały przygotowane z pomocą AI przechodzą redakcyjną weryfikację przed publikacją.

### Jak wygląda praca

Wybór segmentu i hipotezy dotyczącej komunikacji. Przygotowanie testów kanałów i materiałów we współpracy ze sprzedażą. Analiza lejka wraz z jakością kontaktów i dalszym przebiegiem rozmów.

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

Rozumiesz eksperymenty marketingowe i analitykę lejka. Umiesz redagować komunikację oraz ustalić ze sprzedażą definicję kwalifikowanego kontaktu. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Ustalenia i kolejny krok

Katowice · hybrydowo · umowa o pracę. 19 500–24 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000027','Latarnia Digital szuka osoby na stanowisko Lead AI Platform Engineer. Wspieramy koordynację dostaw i pracę magazynów. Rozwijamy produkt obok działających procesów, których nie można po prostu zatrzymać na czas wdrożenia.

### Zadania

- Rozwój kontraktów usługi, limitów i konfiguracji środowisk.
- Metryki, logi i alerty pomagające rozpoznać przyczynę problemu.
- Automatyzacja wdrożenia i powrotu do poprzedniej wersji.

### Na start

Pierwszy temat: uporządkowanie monitorowania jakości, kosztu i opóźnień wspólnej usługi modeli. Rozumiesz utrzymanie usług, kontenery i integracje API. Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

Katowice · zdalnie · umowa o pracę. 26 500–31 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000028','Latarnia Digital szuka osoby na stanowisko Junior UX Researcher — AI.

Wspieramy koordynację dostaw i pracę magazynów. Rozwijamy produkt obok działających procesów, których nie można po prostu zatrzymać na czas wdrożenia.

### Co będziesz robić

- Dobór uczestników i przygotowanie scenariusza badania.
- Rozmowy, obserwacje pracy oraz testy prototypów.
- Synteza z odwołaniem do materiału źródłowego i omówienie wniosków z zespołem.

### Pierwszy projekt

Zaczynamy od jednego zadania: zbadanie, kiedy użytkownicy przestają ufać automatycznej rekomendacji i co robią dalej. Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Czego potrzebujesz

- Potrafisz zadawać pytania bez sugerowania odpowiedzi.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Warunki

Katowice · stacjonarnie · umowa o pracę. 9500–14 500 zł brutto miesięcznie.

### Zanim dołączysz

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000029','Mewa Analytics szuka osoby na stanowisko Analytics Engineer.

Pomagamy organizatorom szkoleń korzystać z danych o nauce. Zależy nam na połączeniu zachowania w produkcie z postępem uczestnika, a nie samą liczbą otwarć lekcji.

### Co będziesz robić

- Modelowanie danych i uzgadnianie znaczenia pól z ich właścicielami.
- Testy transformacji, kompletności i świeżości danych.
- Dokumentacja modeli oraz wsparcie analityków korzystających z nich w raportach.

### Pierwszy projekt

Zaczynamy od jednego zadania: uporządkowanie definicji metryk i przygotowanie wiarygodnego zbioru do eksperymentu. Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Czego potrzebujesz

- Swobodnie pracujesz w SQL i rozumiesz transformacje danych.
- Umiesz znaleźć źródło rozbieżności między raportami i wyjaśnić przyjętą definicję.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Warunki

Lublin · hybrydowo · B2B. 16 500–21 500 zł netto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000030','### Dlaczego otwieramy tę rolę

Mewa Analytics szuka osoby na stanowisko Senior AI Transformation Consultant.

Pomagamy organizatorom szkoleń korzystać z danych o nauce. Zależy nam na połączeniu zachowania w produkcie z postępem uczestnika, a nie samą liczbą otwarć lekcji.

### Projekt, od którego zaczniesz

Pierwszy temat to wybranie procesu do pilota i uzgodnienie właścicieli zmiany z dwoma działami.

Wdrożenie obejmuje nie tylko narzędzie, lecz także dostęp do danych, instrukcje i czas zespołu na naukę. Sponsor zatwierdza zmianę zakresu oraz dodatkowy budżet. Nie oczekujemy obietnicy pełnej automatyzacji: plan powinien wskazywać także przypadki pozostające po stronie człowieka.

### Codzienna praca

- Rozpoznanie obecnego sposobu pracy i gotowości zespołu do zmiany.
- Ustalenie zakresu pilota, zależności, ryzyk i odpowiedzialności.
- Wsparcie wdrożenia oraz zebranie wyników i informacji o adopcji.

### Poziom i zakres decyzji

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Potrafisz prowadzić ustalenia z osobami o różnych potrzebach.
- Rozpisujesz proces i rozróżniasz problem narzędzia od problemu organizacji pracy.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Lublin · zdalnie · B2B. 23 500–28 500 zł netto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000031','Mewa Analytics szuka osoby na stanowisko Lead Product Analyst.

Pomagamy organizatorom szkoleń korzystać z danych o nauce. Zależy nam na połączeniu zachowania w produkcie z postępem uczestnika, a nie samą liczbą otwarć lekcji.

### Co będziesz robić

- Kontrola poprawności zdarzeń i definicji lejka.
- Analiza ścieżek i segmentów oraz porównanie kohort.
- Przygotowanie rekomendacji i omówienie niepewności z zespołem produktu.

### Pierwszy projekt

Zaczynamy od jednego zadania: ustalenie, na którym etapie użytkownicy porzucają nowy produkt i jakie są możliwe przyczyny. Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Czego potrzebujesz

- Pracujesz z SQL i rozumiesz metryki produktu.
- Umiesz sprawdzić jakość pomiaru przed interpretacją zmiany wskaźnika.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Warunki

Lublin · stacjonarnie · B2B. 25 500–30 500 zł netto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000032','Lublin · hybrydowo · B2B. 8500–13 500 zł netto miesięcznie.

### Produkt i problem

Pomagamy organizatorom szkoleń korzystać z danych o nauce. Zależy nam na połączeniu zachowania w produkcie z postępem uczestnika, a nie samą liczbą otwarć lekcji.

Mewa Analytics szuka osoby na stanowisko Junior AI Content Strategist.

### Pierwszy zakres pracy

Opracowanie zasad tworzenia i redakcyjnej weryfikacji treści wspomaganych przez AI.

- Rozpoznanie potrzeb odbiorców i przegląd istniejących materiałów.
- Przygotowanie briefów, przykładów i kryteriów oceny tekstu.
- Redakcja oraz sprawdzenie, czy publikacja pomaga w zadaniu odbiorcy.

### Jak sprawdzimy efekt

Ustalimy, które informacje wymagają potwierdzenia przez eksperta i kto zatwierdza publikację. Przetestujemy zasady na niewielkiej serii materiałów, mierząc również czas poprawek. Sama liczba wygenerowanych tekstów nie będzie kryterium oceny pracy.

### Twoja odpowiedzialność

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Warsztat

- Umiesz pisać, redagować i sprawdzać twierdzenia w źródłach.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Rozmowy z nami

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000033','Szczecin · zdalnie · umowa zlecenie. 15 500–20 500 zł brutto miesięcznie.

### Produkt i problem

Automatyzujemy przepływ informacji w sklepach internetowych. Najwięcej uwagi poświęcamy wyjątkom: zmianie zamówienia, nietypowemu zwrotowi i brakującej informacji o produkcie.

Neon Flow szuka osoby na stanowisko Machine Learning Engineer.

### Pierwszy zakres pracy

Przygotowanie powtarzalnego przetwarzania danych i wdrożenia niewielkiego modelu.

- Wersjonowanie danych, kodu i artefaktów eksperymentu.
- Integracja predykcji z produktem i testy ścieżki wdrożenia.
- Monitorowanie danych wejściowych oraz przygotowanie wycofania wersji.

### Jak sprawdzimy efekt

Eksperyment powinien dać się odtworzyć bez ręcznego odgadywania ustawień. Po wdrożeniu sprawdzimy jakość danych wejściowych, opóźnienie i zachowanie przy brakujących wartościach. Dobór modelu jest jednym z etapów; potrzebujemy także czytelnego sposobu utrzymania całego rozwiązania.

### Twoja odpowiedzialność

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

### Warsztat

- Pracujesz w Pythonie i SQL oraz rozumiesz walidację modeli.
- Znasz Git i podstawy testowania kodu, który będzie utrzymywany przez zespół.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000034','Na początek: połączenie dwóch API z kolejką zadań, obsługą błędów i ręczną ścieżką awaryjną. To pierwszy projekt na stanowisku Senior Automation Engineer w firmie Neon Flow.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Najtrudniejsza część zwykle zaczyna się po poprawnym wykonaniu pierwszego scenariusza. Sprawdzimy, co dzieje się po przekroczeniu limitu, zmianie formatu danych i częściowym zapisaniu zadania. Użytkownik powinien wiedzieć, czy może bezpiecznie ponowić operację.

### Co jest w Twoim zakresie

- Opis kontraktów integracji i mapowania danych.
- Obsługa ponowień, duplikatów i niepełnych odpowiedzi.
- Testy, logi i instrukcja diagnozowania problemów po wdrożeniu.

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

### Dobra współpraca

Programujesz w Pythonie lub TypeScripcie i korzystasz z API. Rozumiesz uwierzytelnianie, limity zapytań i skutki ponownego wykonania zadania. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

Automatyzujemy przepływ informacji w sklepach internetowych. Najwięcej uwagi poświęcamy wyjątkom: zmianie zamówienia, nietypowemu zwrotowi i brakującej informacji o produkcie.

Szczecin · stacjonarnie · umowa zlecenie. 22 500–27 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000035','Szczecin · hybrydowo · umowa zlecenie. 29 500–34 500 zł brutto miesięcznie.

### Produkt i problem

Automatyzujemy przepływ informacji w sklepach internetowych. Najwięcej uwagi poświęcamy wyjątkom: zmianie zamówienia, nietypowemu zwrotowi i brakującej informacji o produkcie.

Neon Flow szuka osoby na stanowisko Lead Conversational Designer.

### Pierwszy zakres pracy

Zaprojektowanie dialogu, który pomaga zakończyć zadanie i potrafi przekazać je człowiekowi.

- Opis intencji, kontekstu i brakujących informacji w rozmowie.
- Projekt odpowiedzi, doprecyzowań oraz komunikatów o błędach.
- Testowanie dialogów z użytkownikami i analiza miejsc przerwania rozmowy.

### Jak sprawdzimy efekt

Pracujemy nad sytuacjami, w których użytkownik zmienia zdanie, podaje sprzeczne informacje lub potrzebuje innego rodzaju pomocy. Projekt obejmie przekazanie sprawy człowiekowi wraz z potrzebnym kontekstem. Nie chcemy zmuszać odbiorcy do rozpoczynania wszystkiego od nowa.

### Twoja odpowiedzialność

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

### Warsztat

- Piszesz zrozumiałe treści i umiesz projektować przebieg rozmowy.
- Potrafisz ocenić dialog także pod kątem wykonania zadania, a nie tylko płynności odpowiedzi.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000036','Automatyzujemy przepływ informacji w sklepach internetowych. Najwięcej uwagi poświęcamy wyjątkom: zmianie zamówienia, nietypowemu zwrotowi i brakującej informacji o produkcie.

W firmie Neon Flow potrzebujemy osoby na stanowisko Junior AI Delivery Manager. Pierwszym tematem będzie doprowadzenie ograniczonego pilota do odbioru przez właściciela procesu.

Plan wdrożenia powinien uwzględniać dostęp do danych, czas użytkowników i gotowość wsparcia. Decyzja o odbiorze należy do właściciela procesu, więc kryteria uzgadniamy przed rozpoczęciem prac. Przy zmianie zakresu pokażemy wpływ na termin i koszt zamiast dopisywać zadania bez końca.

### Jak wygląda praca

Uzgodnienie zakresu, zależności i kryteriów odbioru. Koordynacja pracy produktu, inżynierii i użytkowników pilota. Prowadzenie przeglądów ryzyk oraz przygotowanie przekazania do utrzymania.

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

Umiesz porządkować ustalenia, terminy i odpowiedzialność. Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Ustalenia i kolejny krok

Szczecin · zdalnie · umowa zlecenie. 7500–12 500 zł brutto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000037','Rozwijamy oprogramowanie dla zespołów energetycznych. Użytkownicy łączą dane pomiarowe z dokumentacją techniczną i muszą rozumieć ograniczenia automatycznej analizy.

W firmie Wektor AI potrzebujemy osoby na stanowisko AI Product Owner. Pierwszym tematem będzie ustalenie kolejności prac i warunków akceptacji pierwszego przyrostu produktu.

Nie oczekujemy najdłuższego backlogu. Potrzebujemy jasności, co robimy teraz, co czeka i dlaczego. Pierwszy przyrost powinien pozwolić sprawdzić ważne założenie bez budowy całego procesu. Po odbiorze wrócimy do użytkowników, żeby zobaczyć, czy efekt odpowiadał oczekiwaniom.

### Jak wygląda praca

Porządkowanie zgłoszeń i potrzeb wspólnie z produktem. Opis scenariuszy, wyjątków i warunków akceptacji. Wsparcie odbioru przyrostu i zebranie informacji z użytkowania.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

Potrafisz zamienić ogólne oczekiwanie na sprawdzalny zakres pracy. Umiesz omawiać priorytety i zależności z zespołem technicznym. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Ustalenia i kolejny krok

Białystok · stacjonarnie · umowa o pracę. 14 500–19 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000038','Wektor AI szuka osoby na stanowisko Senior Marketing Automation Specialist. Rozwijamy oprogramowanie dla zespołów energetycznych. Użytkownicy łączą dane pomiarowe z dokumentacją techniczną i muszą rozumieć ograniczenia automatycznej analizy.

### Zadania

- Dobór segmentu, zdarzeń uruchamiających i reguł wykluczenia.
- Konfiguracja komunikacji i testy na przygotowanych kontach.
- Analiza reakcji oraz kontrola poprawności danych przekazywanych między narzędziami.

### Na start

Pierwszy temat: automatyzacja jednego scenariusza komunikacji z możliwością pomiaru i wycofania zmiany. Znasz narzędzie automatyzacji marketingu lub CRM. Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

Białystok · hybrydowo · umowa o pracę. 21 500–26 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000039','Rozwijamy oprogramowanie dla zespołów energetycznych. Użytkownicy łączą dane pomiarowe z dokumentacją techniczną i muszą rozumieć ograniczenia automatycznej analizy.

W firmie Wektor AI potrzebujemy osoby na stanowisko Lead AI Quality Engineer. Pierwszym tematem będzie budowa testów regresji wykrywających odpowiedzi poprawne językowo, ale błędne merytorycznie.

Testy mają obejmować brakujące informacje, sprzeczne dokumenty i pytania poza zakresem systemu. Wspólnie ustalimy, które błędy blokują wdrożenie, a które wymagają dodatkowego przeglądu. Zestaw kontrolny musi pozostać niezależny od przykładów używanych podczas poprawiania rozwiązania.

### Jak wygląda praca

Przygotowanie przypadków testowych z ekspertami domenowymi. Automatyzacja testów i analiza rozbieżności między ocenami. Raportowanie regresji po zmianie modelu, promptu lub źródła danych.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

Potrafisz opisać odtwarzalny błąd i ustalić oczekiwany rezultat. Znasz podstawy automatyzacji testów oraz oceny jakości odpowiedzi modeli. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Ustalenia i kolejny krok

Białystok · zdalnie · umowa o pracę. 28 500–33 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000040','### Dlaczego otwieramy tę rolę

Wektor AI szuka osoby na stanowisko Junior Business Intelligence Analyst.

Rozwijamy oprogramowanie dla zespołów energetycznych. Użytkownicy łączą dane pomiarowe z dokumentacją techniczną i muszą rozumieć ograniczenia automatycznej analizy.

### Projekt, od którego zaczniesz

Pierwszy temat to przygotowanie raportu łączącego wynik operacyjny z jakością danych źródłowych.

Najpierw przejdziemy przez decyzję, którą zespół ma podjąć na podstawie raportu. Sprawdzimy zakres danych, moment ich aktualizacji i wpływ brakujących rekordów. Chcemy uniknąć sytuacji, w której dwie osoby patrzą na tę samą nazwę metryki, ale rozumieją ją inaczej.

### Codzienna praca

- Uzgodnienie definicji miar z osobami podejmującymi decyzję.
- Budowa zestawień w SQL i czytelnego raportu BI.
- Sprawdzenie rozbieżności, braków oraz przyczyn zmian wskaźnika.

### Poziom i zakres decyzji

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Pracujesz w SQL i narzędziu BI oraz sprawdzasz pochodzenie danych.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Białystok · stacjonarnie · umowa o pracę. 11 500–16 500 zł brutto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000041','### Dlaczego otwieramy tę rolę

Bursztyn Tech szuka osoby na stanowisko Senior AI Product Manager.

Przygotowujemy narzędzia do analizy danych finansowych. W raporcie równie ważne jak wynik są definicja metryki, okres i możliwość powrotu do źródła.

### Projekt, od którego zaczniesz

Pierwszy temat to wybór jednego procesu do usprawnienia i sprawdzenie prototypu z jego użytkownikami.

Nie zakładamy, że odpowiedzią na każdą potrzebę jest nowa funkcja AI. Czasem trzeba zmienić formularz, uporządkować uprawnienia lub usunąć zbędny krok. Decyzję o rozszerzeniu pilota podejmujemy po sprawdzeniu, czy rozwiązanie jest używane i komu faktycznie oszczędza pracę.

### Codzienna praca

- Rozmowy z użytkownikami i analiza obecnego przebiegu pracy.
- Ustalenie priorytetów, zakresu eksperymentu i kryteriów odbioru.
- Porównanie wyniku pilota z punktem odniesienia oraz rekomendacja dalszych prac.

### Poziom i zakres decyzji

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Łączysz obserwacje użytkowników z danymi o korzystaniu z produktu.
- Potrafisz wyjaśnić kompromis między zakresem, kosztem i jakością rozwiązania.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Warszawa · hybrydowo · B2B. 19 500–24 500 zł netto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000042','Bursztyn Tech szuka osoby na stanowisko Lead LLM Engineer.

Przygotowujemy narzędzia do analizy danych finansowych. W raporcie równie ważne jak wynik są definicja metryki, okres i możliwość powrotu do źródła.

### Co będziesz robić

- Przygotowanie dokumentów, wyszukiwania i kontekstu przekazywanego do modelu.
- Integracja API, walidacja odpowiedzi, limity czasu i obsługa błędów dostawcy.
- Analiza nietrafionych odpowiedzi oraz pomiar opóźnień i kosztu.

### Pierwszy projekt

Zaczynamy od jednego zadania: wyszukiwanie odpowiedzi w dokumentacji z cytowaniem źródeł i zestawem testów jakości. Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Czego potrzebujesz

- Pracujesz w Pythonie lub TypeScripcie i umiesz integrować API.
- Rozumiesz podstawy wyszukiwania w dokumentach i oceny odpowiedzi na oddzielnym zbiorze przykładów.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Warunki

Warszawa · zdalnie · B2B. 26 500–31 500 zł netto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000043','Warszawa · stacjonarnie · B2B. 9500–14 500 zł netto miesięcznie.

### Produkt i problem

Przygotowujemy narzędzia do analizy danych finansowych. W raporcie równie ważne jak wynik są definicja metryki, okres i możliwość powrotu do źródła.

Bursztyn Tech szuka osoby na stanowisko Junior Product Designer — AI.

### Pierwszy zakres pracy

Przeprojektowanie momentu, w którym użytkownik sprawdza, poprawia lub odrzuca sugestię AI.

- Rozpisanie przepływu, stanów błędów i ręcznej ścieżki wykonania zadania.
- Prototypowanie zachowania produktu i prowadzenie testów użyteczności.
- Przygotowanie komponentów, treści i przeglądu wdrożenia z inżynierami.

### Jak sprawdzimy efekt

W pierwszym badaniu chcemy zrozumieć, w którym momencie człowiek potrzebuje więcej kontekstu, a w którym nadmiar informacji przeszkadza. Prototyp obejmie również oczekiwanie na wynik, poprawkę i powrót do pracy po odrzuceniu podpowiedzi. Końcowe ekrany są tylko częścią rezultatu.

### Twoja odpowiedzialność

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Warsztat

- Pracujesz w Figmie i umiesz pokazać tok decyzji w projekcie.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Rozmowy z nami

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000044','Na początek: skrócenie ręcznego przekazywania zgłoszeń między operacjami a obsługą klienta. To pierwszy projekt na stanowisku AI Operations Specialist w firmie Bursztyn Tech.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Najpierw sprawdzimy, ile czasu zajmuje krok procesu i gdzie najczęściej brakuje informacji. Po uruchomieniu porównamy czas obsługi oraz liczbę poprawek. Jeśli automatyzacja przeniesie pracę na inny zespół, uwzględnimy to w ocenie wyniku zamiast traktować lokalną oszczędność jako sukces.

### Co jest w Twoim zakresie

- Mapa procesu obejmująca wyjątki, źródła danych i osoby podejmujące decyzję.
- Mała automatyzacja w n8n lub Make z możliwością ręcznej obsługi.
- Instrukcja dla zespołu, testowe uruchomienie i poprawki po pierwszych dniach pracy.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Dobra współpraca

Znasz arkusze i podstawy narzędzi automatyzacji. Rozumiesz webhooki oraz JSON i potrafisz opisać problem osobie technicznej. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

Przygotowujemy narzędzia do analizy danych finansowych. W raporcie równie ważne jak wynik są definicja metryki, okres i możliwość powrotu do źródła.

Warszawa · hybrydowo · B2B. 16 500–21 500 zł netto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000045','Na początek: porównanie modelu predykcyjnego z obecną regułą biznesową na danych kontrolnych. To pierwszy projekt na stanowisku Senior Data Scientist w firmie Mozaika Products.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Wynik jednej zbiorczej metryki nie rozstrzygnie o wdrożeniu. Sprawdzimy, kto ponosi koszt pomyłki i czy model działa podobnie w różnych rodzajach przypadków. Jeśli danych jest za mało lub etykiety są niespójne, wynikiem eksperymentu może być plan uzupełnienia materiału.

### Co jest w Twoim zakresie

- Sprawdzenie jakości danych, etykiet i podziału zbiorów.
- Przygotowanie prostej metody porównawczej i powtarzalnego eksperymentu.
- Analiza błędów w segmentach oraz omówienie wyniku z produktem.

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

### Dobra współpraca

Korzystasz z Pythona, SQL i bibliotek do analizy danych. Rozumiesz walidację, wyciek informacji i różnicę między korelacją a dowodem przyczynowym. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

Budujemy produkty dla zespołów zarządzających łańcuchem dostaw. Praca zaczyna się od poznania lokalnego procesu, bo ten sam status w dwóch magazynach może oznaczać coś innego.

Kraków · zdalnie · umowa zlecenie. 23 500–28 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000046','Kraków · stacjonarnie · umowa zlecenie. 25 500–30 500 zł brutto miesięcznie.

### Produkt i problem

Budujemy produkty dla zespołów zarządzających łańcuchem dostaw. Praca zaczyna się od poznania lokalnego procesu, bo ten sam status w dwóch magazynach może oznaczać coś innego.

Mozaika Products szuka osoby na stanowisko Lead Growth Strategist — AI.

### Pierwszy zakres pracy

Sprawdzenie, które komunikaty i kanały prowadzą do kwalifikowanych rozmów z klientami.

- Wybór segmentu i hipotezy dotyczącej komunikacji.
- Przygotowanie testów kanałów i materiałów we współpracy ze sprzedażą.
- Analiza lejka wraz z jakością kontaktów i dalszym przebiegiem rozmów.

### Jak sprawdzimy efekt

Uwzględniamy czas procesu zakupowego i nie ogłaszamy zwycięzcy testu po kilku zapisach. Chcemy sprawdzić, czy obietnica w komunikacji odpowiada temu, co klient zastaje w produkcie. Materiały przygotowane z pomocą AI przechodzą redakcyjną weryfikację przed publikacją.

### Twoja odpowiedzialność

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

### Warsztat

- Rozumiesz eksperymenty marketingowe i analitykę lejka.
- Umiesz redagować komunikację oraz ustalić ze sprzedażą definicję kwalifikowanego kontaktu.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000047','Budujemy produkty dla zespołów zarządzających łańcuchem dostaw. Praca zaczyna się od poznania lokalnego procesu, bo ten sam status w dwóch magazynach może oznaczać coś innego.

W firmie Mozaika Products potrzebujemy osoby na stanowisko Junior AI Platform Engineer. Pierwszym tematem będzie uporządkowanie monitorowania jakości, kosztu i opóźnień wspólnej usługi modeli.

Z usługi korzysta kilka funkcji produktu, więc zmiana konfiguracji musi być przewidywalna dla zespołów. W pierwszym etapie odtworzymy scenariusze niedostępności dostawcy i przekroczenia limitu kosztu. Ustalimy, które zdarzenia wymagają interwencji, a które można obsłużyć automatycznie.

### Jak wygląda praca

Rozwój kontraktów usługi, limitów i konfiguracji środowisk. Metryki, logi i alerty pomagające rozpoznać przyczynę problemu. Automatyzacja wdrożenia i powrotu do poprzedniej wersji.

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

Rozumiesz utrzymanie usług, kontenery i integracje API. Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Ustalenia i kolejny krok

Kraków · hybrydowo · umowa zlecenie. 8500–13 500 zł brutto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000048','Mozaika Products szuka osoby na stanowisko UX Researcher — AI. Budujemy produkty dla zespołów zarządzających łańcuchem dostaw. Praca zaczyna się od poznania lokalnego procesu, bo ten sam status w dwóch magazynach może oznaczać coś innego.

### Zadania

- Dobór uczestników i przygotowanie scenariusza badania.
- Rozmowy, obserwacje pracy oraz testy prototypów.
- Synteza z odwołaniem do materiału źródłowego i omówienie wniosków z zespołem.

### Na start

Pierwszy temat: zbadanie, kiedy użytkownicy przestają ufać automatycznej rekomendacji i co robią dalej. Potrafisz zadawać pytania bez sugerowania odpowiedzi. Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

Kraków · zdalnie · umowa zlecenie. 15 500–20 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000049','Kompas Automation szuka osoby na stanowisko Senior Analytics Engineer. Pomagamy zespołom szkoleniowym ograniczyć ręczną administrację. Automatyzacje mają działać także wtedy, gdy uczestnik zmieni grupę lub prowadzący poprawi plan zajęć.

### Zadania

- Modelowanie danych i uzgadnianie znaczenia pól z ich właścicielami.
- Testy transformacji, kompletności i świeżości danych.
- Dokumentacja modeli oraz wsparcie analityków korzystających z nich w raportach.

### Na start

Pierwszy temat: uporządkowanie definicji metryk i przygotowanie wiarygodnego zbioru do eksperymentu. Swobodnie pracujesz w SQL i rozumiesz transformacje danych. Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

Wrocław · stacjonarnie · umowa o pracę. 22 500–27 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000050','Pomagamy zespołom szkoleniowym ograniczyć ręczną administrację. Automatyzacje mają działać także wtedy, gdy uczestnik zmieni grupę lub prowadzący poprawi plan zajęć.

W firmie Kompas Automation potrzebujemy osoby na stanowisko Lead AI Transformation Consultant. Pierwszym tematem będzie wybranie procesu do pilota i uzgodnienie właścicieli zmiany z dwoma działami.

Wdrożenie obejmuje nie tylko narzędzie, lecz także dostęp do danych, instrukcje i czas zespołu na naukę. Sponsor zatwierdza zmianę zakresu oraz dodatkowy budżet. Nie oczekujemy obietnicy pełnej automatyzacji: plan powinien wskazywać także przypadki pozostające po stronie człowieka.

### Jak wygląda praca

Rozpoznanie obecnego sposobu pracy i gotowości zespołu do zmiany. Ustalenie zakresu pilota, zależności, ryzyk i odpowiedzialności. Wsparcie wdrożenia oraz zebranie wyników i informacji o adopcji.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

Potrafisz prowadzić ustalenia z osobami o różnych potrzebach. Rozpisujesz proces i rozróżniasz problem narzędzia od problemu organizacji pracy. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Ustalenia i kolejny krok

Wrocław · hybrydowo · umowa o pracę. 29 500–34 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000051','### Dlaczego otwieramy tę rolę

Kompas Automation szuka osoby na stanowisko Junior Product Analyst.

Pomagamy zespołom szkoleniowym ograniczyć ręczną administrację. Automatyzacje mają działać także wtedy, gdy uczestnik zmieni grupę lub prowadzący poprawi plan zajęć.

### Projekt, od którego zaczniesz

Pierwszy temat to ustalenie, na którym etapie użytkownicy porzucają nowy produkt i jakie są możliwe przyczyny.

Przejdziemy od zbiorczego lejka do konkretnych ścieżek i przykładów użycia. Rozważymy kilka wyjaśnień spadku, w tym zmianę składu użytkowników i błąd instrumentacji. Raport ma pomóc wybrać następny krok, a nie tylko pokazać efektowny wykres.

### Codzienna praca

- Kontrola poprawności zdarzeń i definicji lejka.
- Analiza ścieżek i segmentów oraz porównanie kohort.
- Przygotowanie rekomendacji i omówienie niepewności z zespołem produktu.

### Poziom i zakres decyzji

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Pracujesz z SQL i rozumiesz metryki produktu.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Wrocław · zdalnie · umowa o pracę. 7500–12 500 zł brutto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000052','Kompas Automation szuka osoby na stanowisko AI Content Strategist.

Pomagamy zespołom szkoleniowym ograniczyć ręczną administrację. Automatyzacje mają działać także wtedy, gdy uczestnik zmieni grupę lub prowadzący poprawi plan zajęć.

### Co będziesz robić

- Rozpoznanie potrzeb odbiorców i przegląd istniejących materiałów.
- Przygotowanie briefów, przykładów i kryteriów oceny tekstu.
- Redakcja oraz sprawdzenie, czy publikacja pomaga w zadaniu odbiorcy.

### Pierwszy projekt

Zaczynamy od jednego zadania: opracowanie zasad tworzenia i redakcyjnej weryfikacji treści wspomaganych przez AI. Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Czego potrzebujesz

- Umiesz pisać, redagować i sprawdzać twierdzenia w źródłach.
- Potrafisz przełożyć cel komunikacji na konkretny brief i plan treści.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Warunki

Wrocław · stacjonarnie · umowa o pracę. 14 500–19 500 zł brutto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000053','Zorza Platform szuka osoby na stanowisko Senior Machine Learning Engineer.

Rozwijamy platformę dla operacji handlowych. Zespół pracuje nad wspólnymi usługami, które mają obsługiwać kilka produktów i dawać się diagnozować bez zgadywania.

### Co będziesz robić

- Wersjonowanie danych, kodu i artefaktów eksperymentu.
- Integracja predykcji z produktem i testy ścieżki wdrożenia.
- Monitorowanie danych wejściowych oraz przygotowanie wycofania wersji.

### Pierwszy projekt

Zaczynamy od jednego zadania: przygotowanie powtarzalnego przetwarzania danych i wdrożenia niewielkiego modelu. Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

### Czego potrzebujesz

- Pracujesz w Pythonie i SQL oraz rozumiesz walidację modeli.
- Znasz Git i podstawy testowania kodu, który będzie utrzymywany przez zespół.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Warunki

Gdańsk · hybrydowo · B2B. 21 500–26 500 zł netto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000054','### Dlaczego otwieramy tę rolę

Zorza Platform szuka osoby na stanowisko Lead Automation Engineer.

Rozwijamy platformę dla operacji handlowych. Zespół pracuje nad wspólnymi usługami, które mają obsługiwać kilka produktów i dawać się diagnozować bez zgadywania.

### Projekt, od którego zaczniesz

Pierwszy temat to połączenie dwóch API z kolejką zadań, obsługą błędów i ręczną ścieżką awaryjną.

Najtrudniejsza część zwykle zaczyna się po poprawnym wykonaniu pierwszego scenariusza. Sprawdzimy, co dzieje się po przekroczeniu limitu, zmianie formatu danych i częściowym zapisaniu zadania. Użytkownik powinien wiedzieć, czy może bezpiecznie ponowić operację.

### Codzienna praca

- Opis kontraktów integracji i mapowania danych.
- Obsługa ponowień, duplikatów i niepełnych odpowiedzi.
- Testy, logi i instrukcja diagnozowania problemów po wdrożeniu.

### Poziom i zakres decyzji

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Programujesz w Pythonie lub TypeScripcie i korzystasz z API.
- Rozumiesz uwierzytelnianie, limity zapytań i skutki ponownego wykonania zadania.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Gdańsk · zdalnie · B2B. 28 500–33 500 zł netto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000055','Na początek: zaprojektowanie dialogu, który pomaga zakończyć zadanie i potrafi przekazać je człowiekowi. To pierwszy projekt na stanowisku Junior Conversational Designer w firmie Zorza Platform.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Pracujemy nad sytuacjami, w których użytkownik zmienia zdanie, podaje sprzeczne informacje lub potrzebuje innego rodzaju pomocy. Projekt obejmie przekazanie sprawy człowiekowi wraz z potrzebnym kontekstem. Nie chcemy zmuszać odbiorcy do rozpoczynania wszystkiego od nowa.

### Co jest w Twoim zakresie

- Opis intencji, kontekstu i brakujących informacji w rozmowie.
- Projekt odpowiedzi, doprecyzowań oraz komunikatów o błędach.
- Testowanie dialogów z użytkownikami i analiza miejsc przerwania rozmowy.

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Dobra współpraca

Piszesz zrozumiałe treści i umiesz projektować przebieg rozmowy. Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

Rozwijamy platformę dla operacji handlowych. Zespół pracuje nad wspólnymi usługami, które mają obsługiwać kilka produktów i dawać się diagnozować bez zgadywania.

Gdańsk · stacjonarnie · B2B. 11 500–16 500 zł netto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna.'),
('a2000000-0000-4000-8000-000000000056','Gdańsk · hybrydowo · B2B. 13 500–18 500 zł netto miesięcznie.

### Produkt i problem

Rozwijamy platformę dla operacji handlowych. Zespół pracuje nad wspólnymi usługami, które mają obsługiwać kilka produktów i dawać się diagnozować bez zgadywania.

Zorza Platform szuka osoby na stanowisko AI Delivery Manager.

### Pierwszy zakres pracy

Doprowadzenie ograniczonego pilota do odbioru przez właściciela procesu.

- Uzgodnienie zakresu, zależności i kryteriów odbioru.
- Koordynacja pracy produktu, inżynierii i użytkowników pilota.
- Prowadzenie przeglądów ryzyk oraz przygotowanie przekazania do utrzymania.

### Jak sprawdzimy efekt

Plan wdrożenia powinien uwzględniać dostęp do danych, czas użytkowników i gotowość wsparcia. Decyzja o odbiorze należy do właściciela procesu, więc kryteria uzgadniamy przed rozpoczęciem prac. Przy zmianie zakresu pokażemy wpływ na termin i koszt zamiast dopisywać zadania bez końca.

### Twoja odpowiedzialność

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

### Warsztat

- Umiesz porządkować ustalenia, terminy i odpowiedzialność.
- Rozpoznajesz zależność blokującą wdrożenie i komunikujesz jej konsekwencje.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000057','Poznań · zdalnie · umowa zlecenie. 20 500–25 500 zł brutto miesięcznie.

### Produkt i problem

Łączymy analitykę z codzienną pracą zespołów energii. Pomagamy zauważać nietypowe odczyty i sprawdzać ich przyczyny przed przekazaniem informacji dalej.

Puls Insights szuka osoby na stanowisko Senior AI Product Owner.

### Pierwszy zakres pracy

Ustalenie kolejności prac i warunków akceptacji pierwszego przyrostu produktu.

- Porządkowanie zgłoszeń i potrzeb wspólnie z produktem.
- Opis scenariuszy, wyjątków i warunków akceptacji.
- Wsparcie odbioru przyrostu i zebranie informacji z użytkowania.

### Jak sprawdzimy efekt

Nie oczekujemy najdłuższego backlogu. Potrzebujemy jasności, co robimy teraz, co czeka i dlaczego. Pierwszy przyrost powinien pozwolić sprawdzić ważne założenie bez budowy całego procesu. Po odbiorze wrócimy do użytkowników, żeby zobaczyć, czy efekt odpowiadał oczekiwaniom.

### Twoja odpowiedzialność

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

### Warsztat

- Potrafisz zamienić ogólne oczekiwanie na sprawdzalny zakres pracy.
- Umiesz omawiać priorytety i zależności z zespołem technicznym.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000058','Na początek: automatyzacja jednego scenariusza komunikacji z możliwością pomiaru i wycofania zmiany. To pierwszy projekt na stanowisku Lead Marketing Automation Specialist w firmie Puls Insights.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Zanim uruchomimy scenariusz, sprawdzimy zgodność reguł kontaktu i sytuacje brzegowe: zmianę segmentu, opóźnione zdarzenie czy zakończenie współpracy. Ocenimy nie tylko reakcję na wiadomość, lecz także dalsze zachowanie w produkcie. Plan musi zawierać prosty sposób zatrzymania wysyłki.

### Co jest w Twoim zakresie

- Dobór segmentu, zdarzeń uruchamiających i reguł wykluczenia.
- Konfiguracja komunikacji i testy na przygotowanych kontach.
- Analiza reakcji oraz kontrola poprawności danych przekazywanych między narzędziami.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Dobra współpraca

Znasz narzędzie automatyzacji marketingu lub CRM. Rozumiesz segmentację, zdarzenia i potrzebę sprawdzenia komunikacji przed wysyłką. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

Łączymy analitykę z codzienną pracą zespołów energii. Pomagamy zauważać nietypowe odczyty i sprawdzać ich przyczyny przed przekazaniem informacji dalej.

Poznań · stacjonarnie · umowa zlecenie. 27 500–32 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000059','Puls Insights szuka osoby na stanowisko Junior AI Quality Engineer. Łączymy analitykę z codzienną pracą zespołów energii. Pomagamy zauważać nietypowe odczyty i sprawdzać ich przyczyny przed przekazaniem informacji dalej.

### Zadania

- Przygotowanie przypadków testowych z ekspertami domenowymi.
- Automatyzacja testów i analiza rozbieżności między ocenami.
- Raportowanie regresji po zmianie modelu, promptu lub źródła danych.

### Na start

Pierwszy temat: budowa testów regresji wykrywających odpowiedzi poprawne językowo, ale błędne merytorycznie. Potrafisz opisać odtwarzalny błąd i ustalić oczekiwany rezultat. Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

Poznań · hybrydowo · umowa zlecenie. 10 500–15 500 zł brutto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna.'),
('a2000000-0000-4000-8000-000000000060','Łączymy analitykę z codzienną pracą zespołów energii. Pomagamy zauważać nietypowe odczyty i sprawdzać ich przyczyny przed przekazaniem informacji dalej.

W firmie Puls Insights potrzebujemy osoby na stanowisko Business Intelligence Analyst. Pierwszym tematem będzie przygotowanie raportu łączącego wynik operacyjny z jakością danych źródłowych.

Najpierw przejdziemy przez decyzję, którą zespół ma podjąć na podstawie raportu. Sprawdzimy zakres danych, moment ich aktualizacji i wpływ brakujących rekordów. Chcemy uniknąć sytuacji, w której dwie osoby patrzą na tę samą nazwę metryki, ale rozumieją ją inaczej.

### Jak wygląda praca

Uzgodnienie definicji miar z osobami podejmującymi decyzję. Budowa zestawień w SQL i czytelnego raportu BI. Sprawdzenie rozbieżności, braków oraz przyczyn zmian wskaźnika.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

Pracujesz w SQL i narzędziu BI oraz sprawdzasz pochodzenie danych. Umiesz opisać, do jakiej decyzji służy raport i czego nie da się z niego wywnioskować. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Ustalenia i kolejny krok

Poznań · zdalnie · umowa zlecenie. 17 500–22 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000061','Tworzymy produkty finansowe we współpracy z zespołami klienta. Pracujemy w krótkich przyrostach, ale każda zmiana wymaga uzgodnienia sposobu sprawdzenia i odbioru.

W firmie Tandem Software potrzebujemy osoby na stanowisko Lead AI Product Manager. Pierwszym tematem będzie wybór jednego procesu do usprawnienia i sprawdzenie prototypu z jego użytkownikami.

Nie zakładamy, że odpowiedzią na każdą potrzebę jest nowa funkcja AI. Czasem trzeba zmienić formularz, uporządkować uprawnienia lub usunąć zbędny krok. Decyzję o rozszerzeniu pilota podejmujemy po sprawdzeniu, czy rozwiązanie jest używane i komu faktycznie oszczędza pracę.

### Jak wygląda praca

Rozmowy z użytkownikami i analiza obecnego przebiegu pracy. Ustalenie priorytetów, zakresu eksperymentu i kryteriów odbioru. Porównanie wyniku pilota z punktem odniesienia oraz rekomendacja dalszych prac.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

Łączysz obserwacje użytkowników z danymi o korzystaniu z produktu. Potrafisz wyjaśnić kompromis między zakresem, kosztem i jakością rozwiązania. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Ustalenia i kolejny krok

Łódź · stacjonarnie · umowa o pracę. 25 500–30 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000062','### Dlaczego otwieramy tę rolę

Tandem Software szuka osoby na stanowisko Junior LLM Engineer.

Tworzymy produkty finansowe we współpracy z zespołami klienta. Pracujemy w krótkich przyrostach, ale każda zmiana wymaga uzgodnienia sposobu sprawdzenia i odbioru.

### Projekt, od którego zaczniesz

Pierwszy temat to wyszukiwanie odpowiedzi w dokumentacji z cytowaniem źródeł i zestawem testów jakości.

Testy obejmują pytania bez odpowiedzi w źródłach, sprzeczne wersje dokumentu i brak uprawnień do części materiałów. Samo wskazanie źródła nie wystarczy: sprawdzamy też, czy odpowiedź rzeczywiście z niego wynika. Użytkownik musi móc rozpoznać, kiedy system potrzebuje dodatkowych informacji.

### Codzienna praca

- Przygotowanie dokumentów, wyszukiwania i kontekstu przekazywanego do modelu.
- Integracja API, walidacja odpowiedzi, limity czasu i obsługa błędów dostawcy.
- Analiza nietrafionych odpowiedzi oraz pomiar opóźnień i kosztu.

### Poziom i zakres decyzji

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Pracujesz w Pythonie lub TypeScripcie i umiesz integrować API.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Łódź · hybrydowo · umowa o pracę. 8500–13 500 zł brutto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000063','Tandem Software szuka osoby na stanowisko Product Designer — AI.

Tworzymy produkty finansowe we współpracy z zespołami klienta. Pracujemy w krótkich przyrostach, ale każda zmiana wymaga uzgodnienia sposobu sprawdzenia i odbioru.

### Co będziesz robić

- Rozpisanie przepływu, stanów błędów i ręcznej ścieżki wykonania zadania.
- Prototypowanie zachowania produktu i prowadzenie testów użyteczności.
- Przygotowanie komponentów, treści i przeglądu wdrożenia z inżynierami.

### Pierwszy projekt

Zaczynamy od jednego zadania: przeprojektowanie momentu, w którym użytkownik sprawdza, poprawia lub odrzuca sugestię AI. Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Czego potrzebujesz

- Pracujesz w Figmie i umiesz pokazać tok decyzji w projekcie.
- Uwzględniasz dostępność, treści oraz sytuacje inne niż poprawne zakończenie zadania.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Warunki

Łódź · zdalnie · umowa o pracę. 15 500–20 500 zł brutto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000064','### Dlaczego otwieramy tę rolę

Tandem Software szuka osoby na stanowisko Senior AI Operations Specialist.

Tworzymy produkty finansowe we współpracy z zespołami klienta. Pracujemy w krótkich przyrostach, ale każda zmiana wymaga uzgodnienia sposobu sprawdzenia i odbioru.

### Projekt, od którego zaczniesz

Pierwszy temat to skrócenie ręcznego przekazywania zgłoszeń między operacjami a obsługą klienta.

Najpierw sprawdzimy, ile czasu zajmuje krok procesu i gdzie najczęściej brakuje informacji. Po uruchomieniu porównamy czas obsługi oraz liczbę poprawek. Jeśli automatyzacja przeniesie pracę na inny zespół, uwzględnimy to w ocenie wyniku zamiast traktować lokalną oszczędność jako sukces.

### Codzienna praca

- Mapa procesu obejmująca wyjątki, źródła danych i osoby podejmujące decyzję.
- Mała automatyzacja w n8n lub Make z możliwością ręcznej obsługi.
- Instrukcja dla zespołu, testowe uruchomienie i poprawki po pierwszych dniach pracy.

### Poziom i zakres decyzji

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Znasz arkusze i podstawy narzędzi automatyzacji.
- Rozumiesz webhooki oraz JSON i potrafisz opisać problem osobie technicznej.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Łódź · stacjonarnie · umowa o pracę. 22 500–27 500 zł brutto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000065','### Dlaczego otwieramy tę rolę

Szlak Robotics szuka osoby na stanowisko Lead Data Scientist.

Rozwijamy oprogramowanie wspierające procesy logistyczne. Część pracy odbywa się blisko zespołów operacyjnych, które mają mało czasu na testowanie nowych narzędzi.

### Projekt, od którego zaczniesz

Pierwszy temat to porównanie modelu predykcyjnego z obecną regułą biznesową na danych kontrolnych.

Wynik jednej zbiorczej metryki nie rozstrzygnie o wdrożeniu. Sprawdzimy, kto ponosi koszt pomyłki i czy model działa podobnie w różnych rodzajach przypadków. Jeśli danych jest za mało lub etykiety są niespójne, wynikiem eksperymentu może być plan uzupełnienia materiału.

### Codzienna praca

- Sprawdzenie jakości danych, etykiet i podziału zbiorów.
- Przygotowanie prostej metody porównawczej i powtarzalnego eksperymentu.
- Analiza błędów w segmentach oraz omówienie wyniku z produktem.

### Poziom i zakres decyzji

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Korzystasz z Pythona, SQL i bibliotek do analizy danych.
- Rozumiesz walidację, wyciek informacji i różnicę między korelacją a dowodem przyczynowym.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Katowice · hybrydowo · B2B. 29 500–34 500 zł netto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000066','Na początek: sprawdzenie, które komunikaty i kanały prowadzą do kwalifikowanych rozmów z klientami. To pierwszy projekt na stanowisku Junior Growth Strategist — AI w firmie Szlak Robotics.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Uwzględniamy czas procesu zakupowego i nie ogłaszamy zwycięzcy testu po kilku zapisach. Chcemy sprawdzić, czy obietnica w komunikacji odpowiada temu, co klient zastaje w produkcie. Materiały przygotowane z pomocą AI przechodzą redakcyjną weryfikację przed publikacją.

### Co jest w Twoim zakresie

- Wybór segmentu i hipotezy dotyczącej komunikacji.
- Przygotowanie testów kanałów i materiałów we współpracy ze sprzedażą.
- Analiza lejka wraz z jakością kontaktów i dalszym przebiegiem rozmów.

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Dobra współpraca

Rozumiesz eksperymenty marketingowe i analitykę lejka. Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

Rozwijamy oprogramowanie wspierające procesy logistyczne. Część pracy odbywa się blisko zespołów operacyjnych, które mają mało czasu na testowanie nowych narzędzi.

Katowice · zdalnie · B2B. 7500–12 500 zł netto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna.'),
('a2000000-0000-4000-8000-000000000067','Katowice · stacjonarnie · B2B. 14 500–19 500 zł netto miesięcznie.

### Produkt i problem

Rozwijamy oprogramowanie wspierające procesy logistyczne. Część pracy odbywa się blisko zespołów operacyjnych, które mają mało czasu na testowanie nowych narzędzi.

Szlak Robotics szuka osoby na stanowisko AI Platform Engineer.

### Pierwszy zakres pracy

Uporządkowanie monitorowania jakości, kosztu i opóźnień wspólnej usługi modeli.

- Rozwój kontraktów usługi, limitów i konfiguracji środowisk.
- Metryki, logi i alerty pomagające rozpoznać przyczynę problemu.
- Automatyzacja wdrożenia i powrotu do poprzedniej wersji.

### Jak sprawdzimy efekt

Z usługi korzysta kilka funkcji produktu, więc zmiana konfiguracji musi być przewidywalna dla zespołów. W pierwszym etapie odtworzymy scenariusze niedostępności dostawcy i przekroczenia limitu kosztu. Ustalimy, które zdarzenia wymagają interwencji, a które można obsłużyć automatycznie.

### Twoja odpowiedzialność

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

### Warsztat

- Rozumiesz utrzymanie usług, kontenery i integracje API.
- Potrafisz diagnozować problem na podstawie logów i metryk.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000068','Na początek: zbadanie, kiedy użytkownicy przestają ufać automatycznej rekomendacji i co robią dalej. To pierwszy projekt na stanowisku Senior UX Researcher — AI w firmie Szlak Robotics.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Nie zaczynamy od pytania, czy ludzie lubią AI. Interesują nas konkretne zadania i sytuacje: czego nie potrafili sprawdzić, co poprawili i dlaczego wrócili do starego sposobu pracy. W raporcie pokażemy także przypadki przeczące głównej interpretacji i granice zebranych danych.

### Co jest w Twoim zakresie

- Dobór uczestników i przygotowanie scenariusza badania.
- Rozmowy, obserwacje pracy oraz testy prototypów.
- Synteza z odwołaniem do materiału źródłowego i omówienie wniosków z zespołem.

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

### Dobra współpraca

Potrafisz zadawać pytania bez sugerowania odpowiedzi. Odróżniasz obserwację, interpretację i deklarację uczestnika. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

Rozwijamy oprogramowanie wspierające procesy logistyczne. Część pracy odbywa się blisko zespołów operacyjnych, które mają mało czasu na testowanie nowych narzędzi.

Katowice · hybrydowo · B2B. 21 500–26 500 zł netto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000069','Na początek: uporządkowanie definicji metryk i przygotowanie wiarygodnego zbioru do eksperymentu. To pierwszy projekt na stanowisku Lead Analytics Engineer w firmie Zefir Design.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Pierwszy zestaw obejmie zdarzenia produktu i rezultat procesu operacyjnego. Sprawdzimy klucze łączenia, duplikaty i różnice w czasie zapisu. Zamiast poprawiać każdy raport osobno, chcemy ustalić wspólną definicję oraz test, który wykryje ponowne pojawienie się problemu.

### Co jest w Twoim zakresie

- Modelowanie danych i uzgadnianie znaczenia pól z ich właścicielami.
- Testy transformacji, kompletności i świeżości danych.
- Dokumentacja modeli oraz wsparcie analityków korzystających z nich w raportach.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Dobra współpraca

Swobodnie pracujesz w SQL i rozumiesz transformacje danych. Umiesz znaleźć źródło rozbieżności między raportami i wyjaśnić przyjętą definicję. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

Projektujemy doświadczenia dla produktów edukacyjnych. Prowadzący i uczestnicy korzystają z tych samych materiałów w innym celu, dlatego nie zawsze potrzebują tego samego interfejsu.

Lublin · zdalnie · umowa zlecenie. 28 500–33 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000070','Zefir Design szuka osoby na stanowisko Junior AI Transformation Consultant. Projektujemy doświadczenia dla produktów edukacyjnych. Prowadzący i uczestnicy korzystają z tych samych materiałów w innym celu, dlatego nie zawsze potrzebują tego samego interfejsu.

### Zadania

- Rozpoznanie obecnego sposobu pracy i gotowości zespołu do zmiany.
- Ustalenie zakresu pilota, zależności, ryzyk i odpowiedzialności.
- Wsparcie wdrożenia oraz zebranie wyników i informacji o adopcji.

### Na start

Pierwszy temat: wybranie procesu do pilota i uzgodnienie właścicieli zmiany z dwoma działami. Potrafisz prowadzić ustalenia z osobami o różnych potrzebach. Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

Lublin · stacjonarnie · umowa zlecenie. 11 500–16 500 zł brutto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna.'),
('a2000000-0000-4000-8000-000000000071','Projektujemy doświadczenia dla produktów edukacyjnych. Prowadzący i uczestnicy korzystają z tych samych materiałów w innym celu, dlatego nie zawsze potrzebują tego samego interfejsu.

W firmie Zefir Design potrzebujemy osoby na stanowisko Product Analyst. Pierwszym tematem będzie ustalenie, na którym etapie użytkownicy porzucają nowy produkt i jakie są możliwe przyczyny.

Przejdziemy od zbiorczego lejka do konkretnych ścieżek i przykładów użycia. Rozważymy kilka wyjaśnień spadku, w tym zmianę składu użytkowników i błąd instrumentacji. Raport ma pomóc wybrać następny krok, a nie tylko pokazać efektowny wykres.

### Jak wygląda praca

Kontrola poprawności zdarzeń i definicji lejka. Analiza ścieżek i segmentów oraz porównanie kohort. Przygotowanie rekomendacji i omówienie niepewności z zespołem produktu.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

Pracujesz z SQL i rozumiesz metryki produktu. Umiesz sprawdzić jakość pomiaru przed interpretacją zmiany wskaźnika. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Ustalenia i kolejny krok

Lublin · hybrydowo · umowa zlecenie. 13 500–18 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000072','Zefir Design szuka osoby na stanowisko Senior AI Content Strategist. Projektujemy doświadczenia dla produktów edukacyjnych. Prowadzący i uczestnicy korzystają z tych samych materiałów w innym celu, dlatego nie zawsze potrzebują tego samego interfejsu.

### Zadania

- Rozpoznanie potrzeb odbiorców i przegląd istniejących materiałów.
- Przygotowanie briefów, przykładów i kryteriów oceny tekstu.
- Redakcja oraz sprawdzenie, czy publikacja pomaga w zadaniu odbiorcy.

### Na start

Pierwszy temat: opracowanie zasad tworzenia i redakcyjnej weryfikacji treści wspomaganych przez AI. Umiesz pisać, redagować i sprawdzać twierdzenia w źródłach. Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

Lublin · zdalnie · umowa zlecenie. 20 500–25 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000073','Rytm Commerce szuka osoby na stanowisko Lead Machine Learning Engineer. Pracujemy nad narzędziami dla e-commerce. Łączymy jakość katalogu, obsługę zamówień i komunikację z klientem, zamiast traktować te obszary jak niezależne kanały.

### Zadania

- Wersjonowanie danych, kodu i artefaktów eksperymentu.
- Integracja predykcji z produktem i testy ścieżki wdrożenia.
- Monitorowanie danych wejściowych oraz przygotowanie wycofania wersji.

### Na start

Pierwszy temat: przygotowanie powtarzalnego przetwarzania danych i wdrożenia niewielkiego modelu. Pracujesz w Pythonie i SQL oraz rozumiesz walidację modeli. Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

Szczecin · stacjonarnie · umowa o pracę. 27 500–32 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000074','Rytm Commerce szuka osoby na stanowisko Junior Automation Engineer.

Pracujemy nad narzędziami dla e-commerce. Łączymy jakość katalogu, obsługę zamówień i komunikację z klientem, zamiast traktować te obszary jak niezależne kanały.

### Co będziesz robić

- Opis kontraktów integracji i mapowania danych.
- Obsługa ponowień, duplikatów i niepełnych odpowiedzi.
- Testy, logi i instrukcja diagnozowania problemów po wdrożeniu.

### Pierwszy projekt

Zaczynamy od jednego zadania: połączenie dwóch API z kolejką zadań, obsługą błędów i ręczną ścieżką awaryjną. Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Czego potrzebujesz

- Programujesz w Pythonie lub TypeScripcie i korzystasz z API.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Warunki

Szczecin · hybrydowo · umowa o pracę. 10 500–15 500 zł brutto miesięcznie.

### Zanim dołączysz

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000075','### Dlaczego otwieramy tę rolę

Rytm Commerce szuka osoby na stanowisko Conversational Designer.

Pracujemy nad narzędziami dla e-commerce. Łączymy jakość katalogu, obsługę zamówień i komunikację z klientem, zamiast traktować te obszary jak niezależne kanały.

### Projekt, od którego zaczniesz

Pierwszy temat to zaprojektowanie dialogu, który pomaga zakończyć zadanie i potrafi przekazać je człowiekowi.

Pracujemy nad sytuacjami, w których użytkownik zmienia zdanie, podaje sprzeczne informacje lub potrzebuje innego rodzaju pomocy. Projekt obejmie przekazanie sprawy człowiekowi wraz z potrzebnym kontekstem. Nie chcemy zmuszać odbiorcy do rozpoczynania wszystkiego od nowa.

### Codzienna praca

- Opis intencji, kontekstu i brakujących informacji w rozmowie.
- Projekt odpowiedzi, doprecyzowań oraz komunikatów o błędach.
- Testowanie dialogów z użytkownikami i analiza miejsc przerwania rozmowy.

### Poziom i zakres decyzji

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Piszesz zrozumiałe treści i umiesz projektować przebieg rozmowy.
- Potrafisz ocenić dialog także pod kątem wykonania zadania, a nie tylko płynności odpowiedzi.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Szczecin · zdalnie · umowa o pracę. 17 500–22 500 zł brutto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000076','Rytm Commerce szuka osoby na stanowisko Senior AI Delivery Manager.

Pracujemy nad narzędziami dla e-commerce. Łączymy jakość katalogu, obsługę zamówień i komunikację z klientem, zamiast traktować te obszary jak niezależne kanały.

### Co będziesz robić

- Uzgodnienie zakresu, zależności i kryteriów odbioru.
- Koordynacja pracy produktu, inżynierii i użytkowników pilota.
- Prowadzenie przeglądów ryzyk oraz przygotowanie przekazania do utrzymania.

### Pierwszy projekt

Zaczynamy od jednego zadania: doprowadzenie ograniczonego pilota do odbioru przez właściciela procesu. Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

### Czego potrzebujesz

- Umiesz porządkować ustalenia, terminy i odpowiedzialność.
- Rozpoznajesz zależność blokującą wdrożenie i komunikujesz jej konsekwencje.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Warunki

Szczecin · stacjonarnie · umowa o pracę. 19 500–24 500 zł brutto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000077','Most Intelligence szuka osoby na stanowisko Lead AI Product Owner.

Pomagamy zespołom energetycznym pracować z rozproszoną wiedzą. Dokumentacja bywa aktualizowana niezależnie od systemów pomiarowych i trzeba umieć rozpoznać sprzeczność.

### Co będziesz robić

- Porządkowanie zgłoszeń i potrzeb wspólnie z produktem.
- Opis scenariuszy, wyjątków i warunków akceptacji.
- Wsparcie odbioru przyrostu i zebranie informacji z użytkowania.

### Pierwszy projekt

Zaczynamy od jednego zadania: ustalenie kolejności prac i warunków akceptacji pierwszego przyrostu produktu. Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Czego potrzebujesz

- Potrafisz zamienić ogólne oczekiwanie na sprawdzalny zakres pracy.
- Umiesz omawiać priorytety i zależności z zespołem technicznym.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Warunki

Białystok · hybrydowo · B2B. 26 500–31 500 zł netto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000078','Białystok · zdalnie · B2B. 9500–14 500 zł netto miesięcznie.

### Produkt i problem

Pomagamy zespołom energetycznym pracować z rozproszoną wiedzą. Dokumentacja bywa aktualizowana niezależnie od systemów pomiarowych i trzeba umieć rozpoznać sprzeczność.

Most Intelligence szuka osoby na stanowisko Junior Marketing Automation Specialist.

### Pierwszy zakres pracy

Automatyzacja jednego scenariusza komunikacji z możliwością pomiaru i wycofania zmiany.

- Dobór segmentu, zdarzeń uruchamiających i reguł wykluczenia.
- Konfiguracja komunikacji i testy na przygotowanych kontach.
- Analiza reakcji oraz kontrola poprawności danych przekazywanych między narzędziami.

### Jak sprawdzimy efekt

Zanim uruchomimy scenariusz, sprawdzimy zgodność reguł kontaktu i sytuacje brzegowe: zmianę segmentu, opóźnione zdarzenie czy zakończenie współpracy. Ocenimy nie tylko reakcję na wiadomość, lecz także dalsze zachowanie w produkcie. Plan musi zawierać prosty sposób zatrzymania wysyłki.

### Twoja odpowiedzialność

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Warsztat

- Znasz narzędzie automatyzacji marketingu lub CRM.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Rozmowy z nami

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000079','Na początek: budowa testów regresji wykrywających odpowiedzi poprawne językowo, ale błędne merytorycznie. To pierwszy projekt na stanowisku AI Quality Engineer w firmie Most Intelligence.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Testy mają obejmować brakujące informacje, sprzeczne dokumenty i pytania poza zakresem systemu. Wspólnie ustalimy, które błędy blokują wdrożenie, a które wymagają dodatkowego przeglądu. Zestaw kontrolny musi pozostać niezależny od przykładów używanych podczas poprawiania rozwiązania.

### Co jest w Twoim zakresie

- Przygotowanie przypadków testowych z ekspertami domenowymi.
- Automatyzacja testów i analiza rozbieżności między ocenami.
- Raportowanie regresji po zmianie modelu, promptu lub źródła danych.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Dobra współpraca

Potrafisz opisać odtwarzalny błąd i ustalić oczekiwany rezultat. Znasz podstawy automatyzacji testów oraz oceny jakości odpowiedzi modeli. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

Pomagamy zespołom energetycznym pracować z rozproszoną wiedzą. Dokumentacja bywa aktualizowana niezależnie od systemów pomiarowych i trzeba umieć rozpoznać sprzeczność.

Białystok · stacjonarnie · B2B. 16 500–21 500 zł netto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000080','Białystok · hybrydowo · B2B. 23 500–28 500 zł netto miesięcznie.

### Produkt i problem

Pomagamy zespołom energetycznym pracować z rozproszoną wiedzą. Dokumentacja bywa aktualizowana niezależnie od systemów pomiarowych i trzeba umieć rozpoznać sprzeczność.

Most Intelligence szuka osoby na stanowisko Senior Business Intelligence Analyst.

### Pierwszy zakres pracy

Przygotowanie raportu łączącego wynik operacyjny z jakością danych źródłowych.

- Uzgodnienie definicji miar z osobami podejmującymi decyzję.
- Budowa zestawień w SQL i czytelnego raportu BI.
- Sprawdzenie rozbieżności, braków oraz przyczyn zmian wskaźnika.

### Jak sprawdzimy efekt

Najpierw przejdziemy przez decyzję, którą zespół ma podjąć na podstawie raportu. Sprawdzimy zakres danych, moment ich aktualizacji i wpływ brakujących rekordów. Chcemy uniknąć sytuacji, w której dwie osoby patrzą na tę samą nazwę metryki, ale rozumieją ją inaczej.

### Twoja odpowiedzialność

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

### Warsztat

- Pracujesz w SQL i narzędziu BI oraz sprawdzasz pochodzenie danych.
- Umiesz opisać, do jakiej decyzji służy raport i czego nie da się z niego wywnioskować.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000081','Lumen Tools szuka osoby na stanowisko Junior AI Product Manager. Budujemy narzędzia dla zespołów finansowych, które pracują na wielu źródłach danych. Najpierw porządkujemy definicje i dostęp, dopiero potem automatyzujemy analizę.

### Zadania

- Rozmowy z użytkownikami i analiza obecnego przebiegu pracy.
- Ustalenie priorytetów, zakresu eksperymentu i kryteriów odbioru.
- Porównanie wyniku pilota z punktem odniesienia oraz rekomendacja dalszych prac.

### Na start

Pierwszy temat: wybór jednego procesu do usprawnienia i sprawdzenie prototypu z jego użytkownikami. Łączysz obserwacje użytkowników z danymi o korzystaniu z produktu. Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

Warszawa · zdalnie · umowa zlecenie. 7500–12 500 zł brutto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna.'),
('a2000000-0000-4000-8000-000000000082','Budujemy narzędzia dla zespołów finansowych, które pracują na wielu źródłach danych. Najpierw porządkujemy definicje i dostęp, dopiero potem automatyzujemy analizę.

W firmie Lumen Tools potrzebujemy osoby na stanowisko LLM Engineer. Pierwszym tematem będzie wyszukiwanie odpowiedzi w dokumentacji z cytowaniem źródeł i zestawem testów jakości.

Testy obejmują pytania bez odpowiedzi w źródłach, sprzeczne wersje dokumentu i brak uprawnień do części materiałów. Samo wskazanie źródła nie wystarczy: sprawdzamy też, czy odpowiedź rzeczywiście z niego wynika. Użytkownik musi móc rozpoznać, kiedy system potrzebuje dodatkowych informacji.

### Jak wygląda praca

Przygotowanie dokumentów, wyszukiwania i kontekstu przekazywanego do modelu. Integracja API, walidacja odpowiedzi, limity czasu i obsługa błędów dostawcy. Analiza nietrafionych odpowiedzi oraz pomiar opóźnień i kosztu.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

Pracujesz w Pythonie lub TypeScripcie i umiesz integrować API. Rozumiesz podstawy wyszukiwania w dokumentach i oceny odpowiedzi na oddzielnym zbiorze przykładów. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Ustalenia i kolejny krok

Warszawa · stacjonarnie · umowa zlecenie. 14 500–19 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000083','Lumen Tools szuka osoby na stanowisko Senior Product Designer — AI. Budujemy narzędzia dla zespołów finansowych, które pracują na wielu źródłach danych. Najpierw porządkujemy definicje i dostęp, dopiero potem automatyzujemy analizę.

### Zadania

- Rozpisanie przepływu, stanów błędów i ręcznej ścieżki wykonania zadania.
- Prototypowanie zachowania produktu i prowadzenie testów użyteczności.
- Przygotowanie komponentów, treści i przeglądu wdrożenia z inżynierami.

### Na start

Pierwszy temat: przeprojektowanie momentu, w którym użytkownik sprawdza, poprawia lub odrzuca sugestię AI. Pracujesz w Figmie i umiesz pokazać tok decyzji w projekcie. Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

Warszawa · hybrydowo · umowa zlecenie. 21 500–26 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000084','Budujemy narzędzia dla zespołów finansowych, które pracują na wielu źródłach danych. Najpierw porządkujemy definicje i dostęp, dopiero potem automatyzujemy analizę.

W firmie Lumen Tools potrzebujemy osoby na stanowisko Lead AI Operations Specialist. Pierwszym tematem będzie skrócenie ręcznego przekazywania zgłoszeń między operacjami a obsługą klienta.

Najpierw sprawdzimy, ile czasu zajmuje krok procesu i gdzie najczęściej brakuje informacji. Po uruchomieniu porównamy czas obsługi oraz liczbę poprawek. Jeśli automatyzacja przeniesie pracę na inny zespół, uwzględnimy to w ocenie wyniku zamiast traktować lokalną oszczędność jako sukces.

### Jak wygląda praca

Mapa procesu obejmująca wyjątki, źródła danych i osoby podejmujące decyzję. Mała automatyzacja w n8n lub Make z możliwością ręcznej obsługi. Instrukcja dla zespołu, testowe uruchomienie i poprawki po pierwszych dniach pracy.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

Znasz arkusze i podstawy narzędzi automatyzacji. Rozumiesz webhooki oraz JSON i potrafisz opisać problem osobie technicznej. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Ustalenia i kolejny krok

Warszawa · zdalnie · umowa zlecenie. 28 500–33 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000085','Echo Operations szuka osoby na stanowisko Junior Data Scientist.

Wspieramy zespoły obsługujące transport i dostawy. W produkcie ważny jest szybki powrót do ręcznej obsługi, gdy integracja nie zwróci wyniku na czas.

### Co będziesz robić

- Sprawdzenie jakości danych, etykiet i podziału zbiorów.
- Przygotowanie prostej metody porównawczej i powtarzalnego eksperymentu.
- Analiza błędów w segmentach oraz omówienie wyniku z produktem.

### Pierwszy projekt

Zaczynamy od jednego zadania: porównanie modelu predykcyjnego z obecną regułą biznesową na danych kontrolnych. Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Czego potrzebujesz

- Korzystasz z Pythona, SQL i bibliotek do analizy danych.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Warunki

Kraków · stacjonarnie · umowa o pracę. 11 500–16 500 zł brutto miesięcznie.

### Zanim dołączysz

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000086','### Dlaczego otwieramy tę rolę

Echo Operations szuka osoby na stanowisko Growth Strategist — AI.

Wspieramy zespoły obsługujące transport i dostawy. W produkcie ważny jest szybki powrót do ręcznej obsługi, gdy integracja nie zwróci wyniku na czas.

### Projekt, od którego zaczniesz

Pierwszy temat to sprawdzenie, które komunikaty i kanały prowadzą do kwalifikowanych rozmów z klientami.

Uwzględniamy czas procesu zakupowego i nie ogłaszamy zwycięzcy testu po kilku zapisach. Chcemy sprawdzić, czy obietnica w komunikacji odpowiada temu, co klient zastaje w produkcie. Materiały przygotowane z pomocą AI przechodzą redakcyjną weryfikację przed publikacją.

### Codzienna praca

- Wybór segmentu i hipotezy dotyczącej komunikacji.
- Przygotowanie testów kanałów i materiałów we współpracy ze sprzedażą.
- Analiza lejka wraz z jakością kontaktów i dalszym przebiegiem rozmów.

### Poziom i zakres decyzji

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów. Kierunek prac uzgadniasz z osobą odpowiedzialną za produkt; sam tytuł stanowiska nie oznacza nieograniczonego mandatu do reorganizacji firmy.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Rozumiesz eksperymenty marketingowe i analitykę lejka.
- Umiesz redagować komunikację oraz ustalić ze sprzedażą definicję kwalifikowanego kontaktu.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Kraków · hybrydowo · umowa o pracę. 13 500–18 500 zł brutto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000087','Echo Operations szuka osoby na stanowisko Senior AI Platform Engineer.

Wspieramy zespoły obsługujące transport i dostawy. W produkcie ważny jest szybki powrót do ręcznej obsługi, gdy integracja nie zwróci wyniku na czas.

### Co będziesz robić

- Rozwój kontraktów usługi, limitów i konfiguracji środowisk.
- Metryki, logi i alerty pomagające rozpoznać przyczynę problemu.
- Automatyzacja wdrożenia i powrotu do poprzedniej wersji.

### Pierwszy projekt

Zaczynamy od jednego zadania: uporządkowanie monitorowania jakości, kosztu i opóźnień wspólnej usługi modeli. Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres.

### Czego potrzebujesz

- Rozumiesz utrzymanie usług, kontenery i integracje API.
- Potrafisz diagnozować problem na podstawie logów i metryk.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Warunki

Kraków · zdalnie · umowa o pracę. 20 500–25 500 zł brutto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000088','### Dlaczego otwieramy tę rolę

Echo Operations szuka osoby na stanowisko Lead UX Researcher — AI.

Wspieramy zespoły obsługujące transport i dostawy. W produkcie ważny jest szybki powrót do ręcznej obsługi, gdy integracja nie zwróci wyniku na czas.

### Projekt, od którego zaczniesz

Pierwszy temat to zbadanie, kiedy użytkownicy przestają ufać automatycznej rekomendacji i co robią dalej.

Nie zaczynamy od pytania, czy ludzie lubią AI. Interesują nas konkretne zadania i sytuacje: czego nie potrafili sprawdzić, co poprawili i dlaczego wrócili do starego sposobu pracy. W raporcie pokażemy także przypadki przeczące głównej interpretacji i granice zebranych danych.

### Codzienna praca

- Dobór uczestników i przygotowanie scenariusza badania.
- Rozmowy, obserwacje pracy oraz testy prototypów.
- Synteza z odwołaniem do materiału źródłowego i omówienie wniosków z zespołem.

### Poziom i zakres decyzji

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Potrafisz zadawać pytania bez sugerowania odpowiedzi.
- Odróżniasz obserwację, interpretację i deklarację uczestnika.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Kraków · stacjonarnie · umowa o pracę. 27 500–32 500 zł brutto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000089','Wrocław · hybrydowo · B2B. 10 500–15 500 zł netto miesięcznie.

### Produkt i problem

Pracujemy z organizatorami programów edukacyjnych. Łączymy badania potrzeb z małymi wdrożeniami, które można sprawdzić podczas rzeczywistej pracy ze szkoleniem.

Atlas Discovery szuka osoby na stanowisko Junior Analytics Engineer.

### Pierwszy zakres pracy

Uporządkowanie definicji metryk i przygotowanie wiarygodnego zbioru do eksperymentu.

- Modelowanie danych i uzgadnianie znaczenia pól z ich właścicielami.
- Testy transformacji, kompletności i świeżości danych.
- Dokumentacja modeli oraz wsparcie analityków korzystających z nich w raportach.

### Jak sprawdzimy efekt

Pierwszy zestaw obejmie zdarzenia produktu i rezultat procesu operacyjnego. Sprawdzimy klucze łączenia, duplikaty i różnice w czasie zapisu. Zamiast poprawiać każdy raport osobno, chcemy ustalić wspólną definicję oraz test, który wykryje ponowne pojawienie się problemu.

### Twoja odpowiedzialność

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Warsztat

- Swobodnie pracujesz w SQL i rozumiesz transformacje danych.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Rozmowy z nami

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000090','Na początek: wybranie procesu do pilota i uzgodnienie właścicieli zmiany z dwoma działami. To pierwszy projekt na stanowisku AI Transformation Consultant w firmie Atlas Discovery.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Wdrożenie obejmuje nie tylko narzędzie, lecz także dostęp do danych, instrukcje i czas zespołu na naukę. Sponsor zatwierdza zmianę zakresu oraz dodatkowy budżet. Nie oczekujemy obietnicy pełnej automatyzacji: plan powinien wskazywać także przypadki pozostające po stronie człowieka.

### Co jest w Twoim zakresie

- Rozpoznanie obecnego sposobu pracy i gotowości zespołu do zmiany.
- Ustalenie zakresu pilota, zależności, ryzyk i odpowiedzialności.
- Wsparcie wdrożenia oraz zebranie wyników i informacji o adopcji.

Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Dobra współpraca

Potrafisz prowadzić ustalenia z osobami o różnych potrzebach. Rozpisujesz proces i rozróżniasz problem narzędzia od problemu organizacji pracy. Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

Pracujemy z organizatorami programów edukacyjnych. Łączymy badania potrzeb z małymi wdrożeniami, które można sprawdzić podczas rzeczywistej pracy ze szkoleniem.

Wrocław · zdalnie · B2B. 17 500–22 500 zł netto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000091','Wrocław · stacjonarnie · B2B. 19 500–24 500 zł netto miesięcznie.

### Produkt i problem

Pracujemy z organizatorami programów edukacyjnych. Łączymy badania potrzeb z małymi wdrożeniami, które można sprawdzić podczas rzeczywistej pracy ze szkoleniem.

Atlas Discovery szuka osoby na stanowisko Senior Product Analyst.

### Pierwszy zakres pracy

Ustalenie, na którym etapie użytkownicy porzucają nowy produkt i jakie są możliwe przyczyny.

- Kontrola poprawności zdarzeń i definicji lejka.
- Analiza ścieżek i segmentów oraz porównanie kohort.
- Przygotowanie rekomendacji i omówienie niepewności z zespołem produktu.

### Jak sprawdzimy efekt

Przejdziemy od zbiorczego lejka do konkretnych ścieżek i przykładów użycia. Rozważymy kilka wyjaśnień spadku, w tym zmianę składu użytkowników i błąd instrumentacji. Raport ma pomóc wybrać następny krok, a nie tylko pokazać efektowny wykres.

### Twoja odpowiedzialność

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

### Warsztat

- Pracujesz z SQL i rozumiesz metryki produktu.
- Umiesz sprawdzić jakość pomiaru przed interpretacją zmiany wskaźnika.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Rozmowy z nami

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000092','Na początek: opracowanie zasad tworzenia i redakcyjnej weryfikacji treści wspomaganych przez AI. To pierwszy projekt na stanowisku Lead AI Content Strategist w firmie Atlas Discovery.

### Od czego zaczniemy

1. Poznanie procesu i przygotowanie punktu odniesienia.
2. Ograniczony eksperyment i omówienie wyników.
3. Decyzja o dalszych pracach wspólnie z zespołem.

Ustalimy, które informacje wymagają potwierdzenia przez eksperta i kto zatwierdza publikację. Przetestujemy zasady na niewielkiej serii materiałów, mierząc również czas poprawek. Sama liczba wygenerowanych tekstów nie będzie kryterium oceny pracy.

### Co jest w Twoim zakresie

- Rozpoznanie potrzeb odbiorców i przegląd istniejących materiałów.
- Przygotowanie briefów, przykładów i kryteriów oceny tekstu.
- Redakcja oraz sprawdzenie, czy publikacja pomaga w zadaniu odbiorcy.

Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Dobra współpraca

Umiesz pisać, redagować i sprawdzać twierdzenia w źródłach. Potrafisz przełożyć cel komunikacji na konkretny brief i plan treści. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

Pracujemy z organizatorami programów edukacyjnych. Łączymy badania potrzeb z małymi wdrożeniami, które można sprawdzić podczas rzeczywistej pracy ze szkoleniem.

Wrocław · hybrydowo · B2B. 26 500–31 500 zł netto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000093','Rozwijamy produkty dla handlu, opierając decyzje na obserwacji użytkowników i danych. Badamy również przypadki, w których rekomendacja nie pomaga albo wprowadza w błąd.

W firmie Delta Research potrzebujemy osoby na stanowisko Junior Machine Learning Engineer. Pierwszym tematem będzie przygotowanie powtarzalnego przetwarzania danych i wdrożenia niewielkiego modelu.

Eksperyment powinien dać się odtworzyć bez ręcznego odgadywania ustawień. Po wdrożeniu sprawdzimy jakość danych wejściowych, opóźnienie i zachowanie przy brakujących wartościach. Dobór modelu jest jednym z etapów; potrzebujemy także czytelnego sposobu utrzymania całego rozwiązania.

### Jak wygląda praca

Wersjonowanie danych, kodu i artefaktów eksperymentu. Integracja predykcji z produktem i testy ścieżki wdrożenia. Monitorowanie danych wejściowych oraz przygotowanie wycofania wersji.

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

Pracujesz w Pythonie i SQL oraz rozumiesz walidację modeli. Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Ustalenia i kolejny krok

Gdańsk · zdalnie · umowa zlecenie. 9500–14 500 zł brutto miesięcznie.

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000094','Delta Research szuka osoby na stanowisko Automation Engineer. Rozwijamy produkty dla handlu, opierając decyzje na obserwacji użytkowników i danych. Badamy również przypadki, w których rekomendacja nie pomaga albo wprowadza w błąd.

### Zadania

- Opis kontraktów integracji i mapowania danych.
- Obsługa ponowień, duplikatów i niepełnych odpowiedzi.
- Testy, logi i instrukcja diagnozowania problemów po wdrożeniu.

### Na start

Pierwszy temat: połączenie dwóch API z kolejką zadań, obsługą błędów i ręczną ścieżką awaryjną. Programujesz w Pythonie lub TypeScripcie i korzystasz z API. Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

Gdańsk · stacjonarnie · umowa zlecenie. 16 500–21 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000095','Rozwijamy produkty dla handlu, opierając decyzje na obserwacji użytkowników i danych. Badamy również przypadki, w których rekomendacja nie pomaga albo wprowadza w błąd.

W firmie Delta Research potrzebujemy osoby na stanowisko Senior Conversational Designer. Pierwszym tematem będzie zaprojektowanie dialogu, który pomaga zakończyć zadanie i potrafi przekazać je człowiekowi.

Pracujemy nad sytuacjami, w których użytkownik zmienia zdanie, podaje sprzeczne informacje lub potrzebuje innego rodzaju pomocy. Projekt obejmie przekazanie sprawy człowiekowi wraz z potrzebnym kontekstem. Nie chcemy zmuszać odbiorcy do rozpoczynania wszystkiego od nowa.

### Jak wygląda praca

Opis intencji, kontekstu i brakujących informacji w rozmowie. Projekt odpowiedzi, doprecyzowań oraz komunikatów o błędach. Testowanie dialogów z użytkownikami i analiza miejsc przerwania rozmowy.

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Punktem wyjścia jest usprawnienie jednego kroku pracy; uzgodnienia między działami prowadzi właściciel procesu.

Piszesz zrozumiałe treści i umiesz projektować przebieg rozmowy. Potrafisz ocenić dialog także pod kątem wykonania zadania, a nie tylko płynności odpowiedzi. Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Ustalenia i kolejny krok

Gdańsk · hybrydowo · umowa zlecenie. 23 500–28 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000096','Delta Research szuka osoby na stanowisko Lead AI Delivery Manager. Rozwijamy produkty dla handlu, opierając decyzje na obserwacji użytkowników i danych. Badamy również przypadki, w których rekomendacja nie pomaga albo wprowadza w błąd.

### Zadania

- Uzgodnienie zakresu, zależności i kryteriów odbioru.
- Koordynacja pracy produktu, inżynierii i użytkowników pilota.
- Prowadzenie przeglądów ryzyk oraz przygotowanie przekazania do utrzymania.

### Na start

Pierwszy temat: doprowadzenie ograniczonego pilota do odbioru przez właściciela procesu. Umiesz porządkować ustalenia, terminy i odpowiedzialność. Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

Gdańsk · zdalnie · umowa zlecenie. 25 500–30 500 zł brutto miesięcznie.

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół.'),
('a2000000-0000-4000-8000-000000000097','### Dlaczego otwieramy tę rolę

Punkt Solutions szuka osoby na stanowisko Junior AI Product Owner.

Przygotowujemy narzędzia dla organizacji z sektora energii. Zespoły techniczne i biznesowe wspólnie ustalają zakres pilota oraz warunki jego dalszego utrzymania.

### Projekt, od którego zaczniesz

Pierwszy temat to ustalenie kolejności prac i warunków akceptacji pierwszego przyrostu produktu.

Nie oczekujemy najdłuższego backlogu. Potrzebujemy jasności, co robimy teraz, co czeka i dlaczego. Pierwszy przyrost powinien pozwolić sprawdzić ważne założenie bez budowy całego procesu. Po odbiorze wrócimy do użytkowników, żeby zobaczyć, czy efekt odpowiadał oczekiwaniom.

### Codzienna praca

- Porządkowanie zgłoszeń i potrzeb wspólnie z produktem.
- Opis scenariuszy, wyjątków i warunków akceptacji.
- Wsparcie odbioru przyrostu i zebranie informacji z użytkowania.

### Poziom i zakres decyzji

Pracujesz z opiekunem nad ograniczonym zadaniem. Wspólnie przeglądacie plan, wyniki i decyzje przed wdrożeniem. Nie oczekujemy samodzielnego prowadzenia całego obszaru.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Potrafisz zamienić ogólne oczekiwanie na sprawdzalny zakres pracy.
- Podstawy możesz pokazać na projekcie własnym, stażu lub pracy wykonywanej z opiekunem. Nie wymagamy samodzielnych wdrożeń produkcyjnych.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Poznań · stacjonarnie · umowa o pracę. 8500–13 500 zł brutto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po krótkiej rozmowie omówimy przykład Twojej pracy lub nauki i poznasz opiekuna. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000098','Punkt Solutions szuka osoby na stanowisko Marketing Automation Specialist.

Przygotowujemy narzędzia dla organizacji z sektora energii. Zespoły techniczne i biznesowe wspólnie ustalają zakres pilota oraz warunki jego dalszego utrzymania.

### Co będziesz robić

- Dobór segmentu, zdarzeń uruchamiających i reguł wykluczenia.
- Konfiguracja komunikacji i testy na przygotowanych kontach.
- Analiza reakcji oraz kontrola poprawności danych przekazywanych między narzędziami.

### Pierwszy projekt

Zaczynamy od jednego zadania: automatyzacja jednego scenariusza komunikacji z możliwością pomiaru i wycofania zmiany. Samodzielnie prowadzisz uzgodniony zakres. Złożone decyzje i zależności omawiasz z osobą prowadzącą projekt; możesz liczyć na przeglądy pracy i wsparcie specjalistów.

### Czego potrzebujesz

- Znasz narzędzie automatyzacji marketingu lub CRM.
- Rozumiesz segmentację, zdarzenia i potrzebę sprawdzenia komunikacji przed wysyłką.
- Masz doświadczenie w samodzielnym wykonaniu uzgodnionego zadania i umiesz omówić jego wynik.

### Warunki

Poznań · hybrydowo · umowa o pracę. 15 500–20 500 zł brutto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000099','### Dlaczego otwieramy tę rolę

Punkt Solutions szuka osoby na stanowisko Senior AI Quality Engineer.

Przygotowujemy narzędzia dla organizacji z sektora energii. Zespoły techniczne i biznesowe wspólnie ustalają zakres pilota oraz warunki jego dalszego utrzymania.

### Projekt, od którego zaczniesz

Pierwszy temat to budowa testów regresji wykrywających odpowiedzi poprawne językowo, ale błędne merytorycznie.

Testy mają obejmować brakujące informacje, sprzeczne dokumenty i pytania poza zakresem systemu. Wspólnie ustalimy, które błędy blokują wdrożenie, a które wymagają dodatkowego przeglądu. Zestaw kontrolny musi pozostać niezależny od przykładów używanych podczas poprawiania rozwiązania.

### Codzienna praca

- Przygotowanie przypadków testowych z ekspertami domenowymi.
- Automatyzacja testów i analiza rozbieżności między ocenami.
- Raportowanie regresji po zmianie modelu, promptu lub źródła danych.

### Poziom i zakres decyzji

Prowadzisz obszar od rozpoznania problemu po sprawdzenie wdrożenia. Pomagasz mniej doświadczonym osobom i omawiasz z zespołem kompromisy wpływające na jakość, koszt i zakres. Twój zakres obejmuje własny komponent i jego utrzymanie; zmiany wspólnej architektury ustalasz z inżynierami.

### Pierwsze tygodnie

1. Poznasz użytkowników, obecny proces i osoby współpracujące przy projekcie. Sprawdzisz dostęp do materiałów oraz pytania, na które zespół nie zna jeszcze odpowiedzi.
2. Przygotujesz z zespołem ograniczoną wersję rozwiązania i sposób jej sprawdzenia. Zapiszesz punkt odniesienia, założenia oraz przypadki pozostające poza zakresem.
3. Zbierzesz wyniki i uwagi. Podczas przeglądu ustalimy, co rozwijać, co poprawić i czy zakres powinien się zmienić.

### Doświadczenie i umiejętności

- Potrafisz opisać odtwarzalny błąd i ustalić oczekiwany rezultat.
- Znasz podstawy automatyzacji testów oraz oceny jakości odpowiedzi modeli.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Współpraca z zespołem

Pracujesz z osobą prowadzącą produkt i przedstawicielem zespołu użytkowników. W zależności od zadania dołączają inżynierowie, analityk lub designer. Nie zakładamy, że nowa osoba sama pozyska wszystkie zgody i dostęp do danych. Zależności ustalamy przed startem, a decyzje zapisujemy w krótkich notatkach.

### Warunki i organizacja

Poznań · zdalnie · umowa o pracę. 22 500–27 500 zł brutto miesięcznie.

Spotkania planujemy z wyprzedzeniem. Dostajesz czas na poznanie procesu i przeglądy pracy z zespołem. Zakres pierwszego projektu jest ograniczony; decyzję o rozszerzeniu podejmiemy po sprawdzeniu wyników i gotowości do utrzymania rozwiązania.

### Przebieg rekrutacji

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.'),
('a2000000-0000-4000-8000-000000000100','Punkt Solutions szuka osoby na stanowisko Lead Business Intelligence Analyst.

Przygotowujemy narzędzia dla organizacji z sektora energii. Zespoły techniczne i biznesowe wspólnie ustalają zakres pilota oraz warunki jego dalszego utrzymania.

### Co będziesz robić

- Uzgodnienie definicji miar z osobami podejmującymi decyzję.
- Budowa zestawień w SQL i czytelnego raportu BI.
- Sprawdzenie rozbieżności, braków oraz przyczyn zmian wskaźnika.

### Pierwszy projekt

Zaczynamy od jednego zadania: przygotowanie raportu łączącego wynik operacyjny z jakością danych źródłowych. Koordynujesz pracę i decyzje w swoim obszarze. Uzgadniasz priorytety oraz kryteria odbioru z produktem i właścicielem procesu. Zwiększenie budżetu lub zobowiązanie innego działu wymaga decyzji sponsora.

### Czego potrzebujesz

- Pracujesz w SQL i narzędziu BI oraz sprawdzasz pochodzenie danych.
- Umiesz opisać, do jakiej decyzji służy raport i czego nie da się z niego wywnioskować.
- Pokaż przykład projektu, w którym podejmowane przez Ciebie decyzje wpłynęły na wynik i dalszy sposób pracy zespołu.

### Warunki

Poznań · stacjonarnie · umowa o pracę. 29 500–34 500 zł brutto miesięcznie.

### Zanim dołączysz

Po rozmowie wstępnej omówimy jeden Twój projekt, potem poznasz zespół. Interesuje nas kontekst, własny wkład i to, co zmieniło się po sprawdzeniu rozwiązania. Materiały poufne możesz zastąpić zanonimizowanym opisem. Nie prosimy o bezpłatną pracę nad zadaniem klienta.');
-- END GENERATED MARKETPLACE COPY

insert into public.employer_briefs (id, company_id, title, source_text, decision_criteria)
select brief_id, company_id, title || ' — brief testowy',
  format('Syntetyczny brief firmy %s. Obszar odpowiedzialności: %s. Potrzebujemy dowodu wdrożenia w sektorze %s, jasnego określenia własnej odpowiedzialności oraz umiejętności oceny ryzyka. W pierwszych 90 dniach osoba zdefiniuje punkt odniesienia, sprawdzi prototyp z użytkownikami i oceni wynik na podstawie danych.', company_name, focus, sector),
  jsonb_build_array('Przykład rzeczywistego wkładu w projekt', 'Pomiar efektu i ograniczeń rozwiązania', 'Współpraca z zespołem i kontrola ryzyka')
from marketplace_fixture_jobs
on conflict (id) do nothing;

insert into public.jobs (
  id, slug, company_id, employer_brief_id, title, summary, description, category, function,
  remote_status, locations, seniority, contract_type, salary_min, salary_max, salary_currency,
  salary_period, salary_kind, publication_status, verification_status, published_at, expiry_at,
  map_latitude, map_longitude
)
select fixture.id, slug, company_id, brief_id, title,
  format('Dołącz do %s. Twój obszar: %s.', company_name, focus),
  copy.description,
  category, function, remote_status, array[city], seniority, contract_type,
  salary_min, salary_min + 5000, 'PLN', 'month',
  case when contract_type = 'b2b' then 'net'::public.salary_kind else 'gross'::public.salary_kind end,
  'published', verification_status, published_at, expiry_at, latitude, longitude
from marketplace_fixture_jobs fixture join marketplace_fixture_copy copy using (id)
on conflict (id) do nothing;

insert into public.job_text_versions (job_id, version, source, visibility, title, summary, description, approved_at)
select job.id, 1, 'human', 'public', job.title, job.summary, job.description, job.published_at
from public.jobs job join marketplace_fixture_jobs fixture on fixture.id = job.id
on conflict (job_id, version) do nothing;

commit;
