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

insert into public.companies (id, slug, name, summary, description, website_url, location, size_label)
select id, slug, name,
  format('Produkty i automatyzacje AI dla sektora: %s.', sector),
  format('%s to fikcyjna firma w lokalnym środowisku DoRoboty.ai. Rozwijamy rozwiązania AI dla sektora: %s. Zespół łączy discovery, inżynierię i mierzenie wyników wdrożeń. Wszystkie ogłoszenia są syntetyczne i służą wyłącznie testowaniu serwisu.', name, sector),
  'https://' || slug || '.example.invalid', city,
  (array['11–50 osób', '51–200 osób', '201–500 osób'])[(row_number() over (order by id) - 1)::int % 3 + 1]
from marketplace_fixture_companies
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
  role.title,
  role.category::public.job_category as category,
  role.function::public.job_function as function,
  role.focus,
  company.name as company_name, company.city, company.sector,
  company.latitude + ((n - 1) % 4 - 1.5) * 0.018 as latitude,
  company.longitude + ((n - 1) % 4 - 1.5) * 0.024 as longitude,
  (array['onsite', 'hybrid', 'remote'])[(n - 1) % 3 + 1]::public.remote_status as remote_status,
  (array['junior', 'mid', 'senior', 'lead'])[((n - 1) / 25) + 1]::public.seniority_level as seniority,
  (array['employment', 'b2b', 'mandate'])[((n - 1) / 4) % 3 + 1]::public.contract_type as contract_type,
  (array['unverified', 'editorial', 'employer_verified'])[(n - 1) % 3 + 1]::public.verification_status as verification_status,
  7500 + ((n - 1) / 25) * 6000 + ((n - 1) % 5) * 1000 as salary_min,
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
select id, slug, company_id, brief_id, title,
  format('Dołącz do %s. Twój obszar: %s. Oferta fikcyjna do testowania DoRoboty.ai.', company_name, focus),
  format(E'O firmie\n%s rozwija produkty dla sektora: %s. To ogłoszenie jest fikcyjnym materiałem do testowania DoRoboty.ai, nie rzeczywistą rekrutacją.\n\nZakres odpowiedzialności\nTwój obszar to %s. Będziesz współpracować z zespołem produktowym i operacyjnym, definiować kryteria sukcesu oraz sprawdzać rozwiązania z użytkownikami.\n\nOczekiwania\nPokaż projekt, swoją odpowiedzialność i wynik. Liczą się jasna komunikacja, rozumienie ograniczeń AI i dobór metod do poziomu doświadczenia. Nie wymagamy znajomości wszystkich narzędzi.\n\nPierwsze 90 dni\nPoznasz proces, wybierzesz jeden problem, przygotujesz prototyp i ocenę jakości. Wspólnie zdecydujemy o wdrożeniu na podstawie efektu, kosztu i ryzyka.\n\nCo oferujemy\nJawne widełki, czas na naukę, współpracę z ekspertami i wpływ na sposób pracy. Rekrutacja testowa obejmuje przegląd profilu oraz rozmowę o doświadczeniu.', company_name, sector, focus),
  category, function, remote_status, array[city], seniority, contract_type,
  salary_min, salary_min + 5000, 'PLN', 'month',
  case when contract_type = 'b2b' then 'net'::public.salary_kind else 'gross'::public.salary_kind end,
  'published', verification_status, published_at, expiry_at, latitude, longitude
from marketplace_fixture_jobs
on conflict (id) do nothing;

insert into public.job_text_versions (job_id, version, source, visibility, title, summary, description, approved_at)
select job.id, 1, 'human', 'public', job.title, job.summary, job.description, job.published_at
from public.jobs job join marketplace_fixture_jobs fixture on fixture.id = job.id
on conflict (job_id, version) do nothing;

commit;
