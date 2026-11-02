import { jobs } from './jobs.js';
import { icon, esc, logoHTML, salaryHTML, contractLabel, age, jobCard, offerURL } from '../../components/ui.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const params = new URLSearchParams(location.search);
const job = jobs.find(j => String(j.id) === params.get('id'));
const saved = new Set((params.get('marks') || '').split(',').map(Number).filter(id => jobs.some(j => j.id === id)));
const back = new URLSearchParams();
const incoming = new URLSearchParams((params.get('back') || '').slice(0,3000));
for(const key of ['q','city','category','mode','level','contract','salary','salaryOnly','sort','page','savedOnly']) {
  incoming.getAll(key).forEach(value => back.append(key,value));
}
let toastTimer;
const profile = {
  Apply: {
    lead:'Pomóż nam zamieniać możliwości AI w produkty, które ułatwiają ludziom codzienną pracę.',
    intro:'Szukamy osoby, która potrafi przejść od dobrego pytania do rozwiązania sprawdzonego z użytkownikami. Będziesz blisko produktu, technologii i ludzi, którzy korzystają z efektów Twojej pracy.',
    tasks:['Rozpoznawanie potrzeb użytkowników i miejsc, w których AI może ułatwić im pracę.','Projektowanie rozwiązań i prototypów, które pozwalają szybko sprawdzić pomysł.','Testowanie z użytkownikami i rozwijanie produktu na podstawie ich doświadczeń.','Współpraca z zespołem technicznym od pierwszego szkicu do wdrożenia.'],
    requirements:['Potrafisz pokazać projekty, w których Twoja praca rozwiązała konkretny problem.','Sprawnie przechodzisz od poznania potrzeb do prototypu i testów.','Rozumiesz możliwości oraz ograniczenia narzędzi opartych na AI.','Umiesz jasno opowiedzieć o swoich decyzjach i zaprosić zespół do współpracy.'],
    company:'Tworzymy produkty i narzędzia, które pomagają zespołom w codziennej pracy. Łączymy projektowanie, technologię i uważność na potrzeby ludzi.'
  },
  Build: {
    lead:'Buduj rozwiązania AI, które wychodzą poza eksperyment i trafiają do codziennej pracy.',
    intro:'Dołącz do zespołu, który łączy inżynierię z rozumieniem produktu. Będziesz sprawdzać pomysły, dbać o jakość modeli i rozwijać rozwiązania razem z osobami od danych, produktu i designu.',
    tasks:['Projektowanie oraz rozwijanie rozwiązań opartych na AI.','Budowanie ewaluacji i sprawdzanie jakości wyników na rzeczywistych scenariuszach.','Dbanie o niezawodność, obserwowalność i koszt działania rozwiązania.','Współpraca z zespołem produktu przy kolejnych wdrożeniach.'],
    requirements:['Masz praktyczne doświadczenie adekwatne do poziomu tej roli.','Potrafisz testować jakość rozwiązania i uzasadnić wybór narzędzi.','Myślisz o utrzymaniu kodu i czytelnie dokumentujesz decyzje.','Chętnie dzielisz się wiedzą i pracujesz z osobami z innych specjalizacji.'],
    company:'Pracujemy nad rozwiązaniami AI dla zespołów i produktów cyfrowych. Cenimy czytelny kod, mierzalną jakość i bliską współpracę inżynierii z produktem.'
  },
  Lead: {
    lead:'Nadaj kierunek pracy z AI i pomóż zespołowi przełożyć pomysły na konkretne rezultaty.',
    intro:'Szukamy osoby, która łączy rozumienie technologii z potrzebami organizacji. Będziesz porządkować priorytety, wspierać współpracę i podejmować decyzje na podstawie wyników, a nie obietnic.',
    tasks:['Wybieranie problemów, w których zastosowanie AI może przynieść wartość.','Ustalanie priorytetów, celów i sposobu oceny rezultatów.','Prowadzenie współpracy między zespołami i wspieranie osób odpowiedzialnych za wdrożenie.','Dbanie o odpowiedzialne wykorzystanie AI i dzielenie się wnioskami.'],
    requirements:['Masz doświadczenie w prowadzeniu projektów lub zespołów.','Potrafisz połączyć potrzeby organizacji z możliwościami i ograniczeniami AI.','Umiesz jasno określić zakres, priorytety i kryteria decyzji.','Budujesz współpracę i pomagasz innym samodzielnie rozwiązywać problemy.'],
    company:'Pomagamy organizacjom sensownie korzystać z technologii. Rozwijamy zespoły, procesy i produkty, w których AI wspiera jasno określone cele.'
  }
};
if(job?.id === 1) {
  profile.Apply.lead = 'Projektuj produkty, w których AI naprawdę pomaga. Od pierwszej rozmowy z użytkownikiem do ostatniego detalu interfejsu.';
  profile.Apply.intro = 'W Forma Studio tworzymy narzędzia dla zespołów, które chcą pracować prościej. Szukamy osoby, która pomoże nam nadać sens i formę nowym doświadczeniom opartym na AI. Dostaniesz przestrzeń na badania, eksperymenty i dopracowanie rozwiązania — razem z zespołem produktu i inżynierii.';
  profile.Apply.tasks = ['Prowadzenie projektów produktowych: od poznania potrzeb i pierwszych koncepcji po gotowy interfejs.','Projektowanie doświadczeń, które pomagają użytkownikom rozumieć wyniki AI i podejmować świadome decyzje.','Budowanie prototypów w Figmie i z pomocą narzędzi AI, a następnie sprawdzanie ich z użytkownikami.','Rozwijanie systemu projektowego i dbanie o spójność oraz dostępność produktu.','Bliska współpraca z product managerem i zespołem inżynierii przy wdrożeniach.'];
  profile.Apply.requirements = ['Masz doświadczenie w projektowaniu produktów cyfrowych i portfolio, które pokazuje Twój sposób myślenia.','Swobodnie pracujesz w Figmie: prototypujesz, tworzysz komponenty i korzystasz z auto layoutu.','Potrafisz prowadzić rozmowy z użytkownikami i przełożyć wnioski na decyzje projektowe.','Interesuje Cię projektowanie produktów AI i chcesz sprawdzać, gdzie ta technologia ma sens.','Dobrze czujesz się we współpracy i umiesz rozmawiać o kompromisach projektowych.'];
}
const list = (items) => `<ul class="offer-bullets">${items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`;
const categoryName = {Build:'Twórz AI',Apply:'Wdrażaj AI',Lead:'Wyznaczaj kierunek'};
const contractName = (j) => ({B2B:'B2B',UoP:'Umowa o pracę',Zlecenie:'Umowa zlecenie'}[j.contract]);
const saveButton = (j,classes='') => `<button class="button ${classes}" type="button" data-save="${j.id}" aria-pressed="${saved.has(j.id)}">${icon('bookmark')}<span>Zapisz ofertę</span></button>`;
const applyButton = () => `<button class="button button-primary offer-apply" type="button" data-apply aria-haspopup="dialog">Aplikuj na tę ofertę ${icon('arrow-right')}</button>`;
function returnURL(onlySaved=false) {
  const p = new URLSearchParams(back);
  if(saved.size) p.set('marks',[...saved].join(','));
  if(onlySaved) p.set('savedOnly','1');
  return `./${p.size?'?'+p:''}#results`;
}
function updateLinks() {
  $$('[data-return]').forEach(a=>a.href=returnURL());
  $('#saved-count').textContent=saved.size;
  $$('#related-jobs .job-card').forEach(card=>{
    const id=Number(card.querySelector('[data-save]').dataset.save);
    card.querySelectorAll('a').forEach(a=>a.href=offerURL(id,back.toString(),saved));
  });
}
function updateSaves() {
  $$('[data-save]').forEach(button=>{
    const id=Number(button.dataset.save);
    const current=jobs.find(j=>j.id===id);
    button.setAttribute('aria-pressed',String(saved.has(id)));
    button.setAttribute('aria-label',`Zapisz ofertę: ${current.title}`);
    const label=button.querySelector('span');
    if(label) label.textContent='Zapisz ofertę';
  });
  updateLinks();
}
function notify(text) {
  clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').hidden=false;
  toastTimer=setTimeout(()=>$('#toast').hidden=true,2800);
}
function render() {
  $$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
  if(!job) {
    document.title='Nie znaleziono oferty — DoRoboty.ai';
    $('#breadcrumb-company').hidden=true;
    $('#offer-content').innerHTML=`<section class="offer-not-found"><span class="empty-mark">${icon('search')}</span><h1>Nie ma tu takiej oferty.</h1><p>Ten adres nie prowadzi do żadnej z naszych przykładowych ofert. Wróć do listingu i wybierz coś dla siebie.</p><a class="button button-primary" href="./#results" data-return>Przeglądaj oferty ${icon('arrow-right')}</a></section>`;
    updateLinks();return;
  }
  const p=profile[job.category];
  const related=jobs.filter(j=>j.category===job.category&&j.id!==job.id).sort((a,b)=>Number(b.company===job.company)-Number(a.company===job.company)||a.id-b.id).slice(0,3);
  const locationCopy=job.mode==='Zdalnie'?'Pracuj zdalnie z terenu Polski. Spotkania i sposób współpracy ustalamy wspólnie.':job.mode==='Hybrydowo'?`Łączymy pracę zdalną ze spotkaniami w biurze. Lokalizacja: ${job.city}. Rytm obecności ustalamy w zespole.`:`Pracujemy stacjonarnie. Lokalizacja: ${job.city}. Dbamy o przestrzeń do skupienia i wspólnej pracy.`;
  document.title=`${job.title} w ${job.company} — DoRoboty.ai`;
  $('#breadcrumb-company').textContent=job.company;
  $('#application-context').textContent=`${job.title} · ${job.company}`;
  $('#offer-content').innerHTML=`
    <div class="offer-grid">
      <header class="offer-hero">
        <div class="offer-identity">${logoHTML(job)}<div><a href="#company" class="offer-company-link">${esc(job.company)} ${icon('external')}</a><p>Oferta dodana ${age(job).toLocaleLowerCase('pl')}</p></div><span class="offer-category">${job.category}<span>${categoryName[job.category]}</span></span></div>
        <h1>${esc(job.title)}</h1>
        <div class="offer-key-facts"><span>${icon('pin')}${esc(job.city)}</span><span>${icon('remote')}${job.mode}</span><span>${icon('work')}${job.level==='Lead'?'Lead / Manager':job.level}</span></div>
        <div class="offer-skill-row">${job.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
        <div class="offer-hero-bottom"><span>AI w codziennej pracy.</span><button class="text-button offer-share" type="button" data-share>${icon('external')}Udostępnij ofertę</button></div>
      </header>
      <aside class="offer-sidebar" aria-label="Warunki i aplikowanie">
        <div class="offer-action-card"><div class="offer-pay"><p class="offer-eyebrow">Wynagrodzenie</p>${salaryHTML(job)}<p class="offer-pay-terms">${job.salaryMin===null?contractName(job):contractLabel(job)}</p></div>
          <dl class="offer-terms"><div><dt>Forma współpracy</dt><dd>${contractName(job)}</dd></div><div><dt>Tryb pracy</dt><dd>${job.mode}</dd></div><div><dt>Lokalizacja</dt><dd>${esc(job.city)}</dd></div><div><dt>Doświadczenie</dt><dd>${job.level==='Lead'?'Lead / Manager':job.level}</dd></div></dl>
          <div class="offer-actions">${applyButton()}${saveButton(job,'offer-save')}<p>Oferta demonstracyjna.<br> Aplikacje nie są wysyłane.</p></div>
        </div>
        <p class="offer-side-note">${icon('smile')}Dobra decyzja zaczyna się od konkretów.</p>
      </aside>
      <article class="offer-description">
        <nav class="offer-section-nav" aria-label="Sekcje oferty"><a href="#role">O roli</a><a href="#requirements">Wymagania</a><a href="#benefits">Co oferujemy</a><a href="#process">Rekrutacja</a></nav>
        <div class="offer-reading">
          <section id="role" class="offer-section"><h2>O tej roli</h2><p class="offer-lead">${esc(p.lead)}</p><p>${esc(p.intro)}</p><h3>Czym się zajmiesz</h3>${list(p.tasks)}</section>
          <section id="requirements" class="offer-section"><h2>Czego szukamy</h2>${list(p.requirements)}<div class="offer-extra"><b>Przyda się też</b><p>Praktyka w obszarach: ${job.tags.map(esc).join(', ')}. Nie musisz znać każdego narzędzia — opowiedz nam, jak się uczysz i rozwiązujesz problemy.</p></div></section>
          <section id="benefits" class="offer-section"><h2>Co dostajesz w zamian</h2><div class="offer-benefits"><div>${icon('remote')}<h3>Praca dopasowana do roli</h3><p>${esc(locationCopy)}</p></div><div>${icon('spark')}<h3>Przestrzeń na eksperyment</h3><p>Sprawdzamy pomysły, dzielimy się wnioskami i dajemy sobie czas na naukę.</p></div><div>${icon('work')}<h3>Jasne zasady współpracy</h3><p>Zakres odpowiedzialności i warunki omawiamy przed podjęciem decyzji.</p></div><div>${icon('smile')}<h3>Zespół do współpracy</h3><p>Pracujesz blisko osób od produktu, technologii i potrzeb użytkowników.</p></div></div></section>
          <section id="process" class="offer-section"><h2>Jak się poznamy</h2><p>Chcemy poznać Twój sposób pracy i dać Ci przestrzeń na pytania. Przykładowy proces wygląda tak:</p><ol class="offer-process"><li><div><h3>Pierwsza rozmowa</h3><p>Porozmawiamy o Twoim doświadczeniu, oczekiwaniach i tym, nad czym chcesz pracować.</p></div></li><li><div><h3>Spotkanie z zespołem</h3><p>Przejdziemy przez wybrany projekt lub problem z Twojej praktyki. Poznasz osoby, z którymi będziesz współpracować.</p></div></li><li><div><h3>Decyzja i konkretne warunki</h3><p>Wrócimy z informacją zwrotną i omówimy kolejne kroki.</p></div></li></ol></section>
          <section class="offer-closing"><h2>Zainteresowała Cię ta rola?</h2><p>Sprawdź warunki i zdecyduj, czy to miejsce dla Ciebie.</p>${applyButton()}<span class="offer-demo-inline">To przykładowa oferta — aplikowanie jest niedostępne.</span></section>
        </div>
      </article>
      <section class="offer-employer" id="company" aria-labelledby="company-heading"><div class="employer-top">${logoHTML(job)}<div><p class="offer-eyebrow">Poznaj firmę</p><h2 id="company-heading">${esc(job.company)}</h2></div></div><div class="employer-copy"><div><p>${esc(p.company)}</p><p class="employer-note">Przykładowy profil firmy przygotowany na potrzeby tej demonstracji.</p><a class="button" href="./?q=${encodeURIComponent(job.company)}#results">Oferty tej firmy ${icon('arrow-right')}</a></div><img src="../assets/people.png" alt="" width="300" height="200" loading="lazy"></div></section>
    </div>
    <section class="offer-related" aria-labelledby="related-heading"><div class="offer-related-heading"><div><h2 id="related-heading">Może też Cię zainteresować</h2><p>Inne role w obszarze ${job.category}.</p></div><a class="text-button" href="./?category=${job.category}#results">Wszystkie w ${job.category} ${icon('arrow-right')}</a></div><div class="job-list" id="related-jobs">${related.map(j=>jobCard(j,saved,offerURL(j.id,back.toString(),saved))).join('')}</div></section>`;
  updateSaves();
}
$('#detail-saved-nav').addEventListener('click',()=>location.assign(returnURL(true)));
$('#about-open').addEventListener('click',()=>$('#about-dialog').showModal());
$('#footer-about').addEventListener('click',()=>$('#about-dialog').showModal());
document.addEventListener('click',async e=>{
  const close=e.target.closest('[data-close]');if(close){document.getElementById(close.dataset.close).close();return;}
  const save=e.target.closest('[data-save]');if(save){const id=Number(save.dataset.save);if(saved.has(id)){saved.delete(id);notify('Usunięto z zapisanych');}else{saved.add(id);notify('Zapisano ofertę na czas tej wizyty');}updateSaves();return;}
  if(e.target.closest('[data-apply]')){$('#application-dialog').showModal();return;}
  if(e.target.closest('[data-share]')){
    const url=new URL('oferta.html',location.href);url.searchParams.set('id',job.id);
    try{await navigator.clipboard.writeText(url.href);notify('Link do oferty skopiowany');}
    catch{$('#share-url').value=url.href;$('#share-dialog').showModal();$('#share-url').focus();$('#share-url').select();}
  }
});
render();
