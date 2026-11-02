import { jobs } from './jobs.js';
import { icon, esc, money, jobCard, offerURL } from '../../components/ui.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
$$('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
const normalize = (s) => s.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ł','l');
const plural = (n,one,few,many) => n === 1 ? one : n%10>=2 && n%10<=4 && !(n%100>=12&&n%100<=14) ? few : many;
const offerCount = (n) => `${n} ${plural(n,'oferta','oferty','ofert')}`;
const valid = {mode:['Zdalnie','Hybrydowo','Stacjonarnie'],level:['Junior','Mid','Senior','Lead'],contract:['B2B','UoP','Zlecenie']};
const pageSize = 12;
const state = {q:'',city:'',category:'all',mode:[],level:[],contract:[],minSalary:0,salaryOnly:false,sort:'newest',page:1,savedOnly:false};
const saved = new Set();
let toastTimer;

function fromURL() {
  const p = new URLSearchParams(location.search);
  state.q = (p.get('q') || '').slice(0,200);
  state.city = ['', 'Warszawa','Kraków','Wrocław','Poznań','Gdańsk','Łódź'].includes(p.get('city')) ? p.get('city') : '';
  state.category = ['Build','Apply','Lead'].includes(p.get('category')) ? p.get('category') : 'all';
  for (const key of ['mode','level','contract']) state[key] = p.getAll(key).filter(v=>valid[key].includes(v));
  state.minSalary = Math.max(0,Math.min(100000,Number(p.get('salary')) || 0));
  state.salaryOnly = p.get('salaryOnly') === '1';
  state.sort = ['newest','salary','company'].includes(p.get('sort')) ? p.get('sort') : 'newest';
  state.page = Math.max(1,Math.floor(Number(p.get('page')) || 1));
  state.savedOnly = p.get('savedOnly') === '1';
  if(p.has('marks')){saved.clear();p.get('marks').split(',').map(Number).filter(id=>jobs.some(j=>j.id===id)).forEach(id=>saved.add(id));}
}
function syncControls() {
  $('#search').value = state.q;
  $('#location').value = state.city;
  $('#sort').value = state.sort;
  $('#min-salary').value = state.minSalary || '';
  $('#salary-only').checked = state.salaryOnly;
  for (const key of ['mode','level','contract']) $$(`input[name="${key}"]`).forEach(c=>c.checked=state[key].includes(c.value));
  $('#search-clear').hidden = !$('#search').value;
}
function syncURL() {
  const p = new URLSearchParams();
  if(state.q) p.set('q',state.q);
  if(state.city) p.set('city',state.city);
  if(state.category!=='all') p.set('category',state.category);
  for(const key of ['mode','level','contract']) state[key].forEach(v=>p.append(key,v));
  if(state.minSalary) p.set('salary',state.minSalary);
  if(state.salaryOnly) p.set('salaryOnly','1');
  if(state.sort!=='newest') p.set('sort',state.sort);
  if(state.page>1) p.set('page',state.page);
  if(state.savedOnly) p.set('savedOnly','1');
  history.replaceState(null,'',`${location.pathname}${p.size?'?'+p:''}${location.hash}`);
}
function filtered({ignoreCategory=false,ignoreMode=false}={}) {
  const q = normalize(state.q.trim());
  return jobs.filter(j => (!q || normalize(`${j.title} ${j.company} ${j.tags.join(' ')} ${j.category}`).includes(q))
    && (!state.city || j.city===state.city)
    && (ignoreCategory || state.category==='all' || j.category===state.category)
    && (ignoreMode || !state.mode.length || state.mode.includes(j.mode))
    && (!state.level.length || state.level.includes(j.level))
    && (!state.contract.length || state.contract.includes(j.contract))
    && (!state.salaryOnly || j.salaryMin!==null)
    && (!state.minSalary || (j.salaryMin!==null && j.salaryMin>=state.minSalary))
    && (!state.savedOnly || saved.has(j.id)));
}
function sortJobs(list) {
  return [...list].sort((a,b) => state.sort==='salary' ? (b.salaryMin??-1)-(a.salaryMin??-1) || a.id-b.id : state.sort==='company' ? a.company.localeCompare(b.company,'pl') || a.id-b.id : a.days-b.days || a.id-b.id);
}
const saveLabel = (job) => `Zapisz ofertę: ${job.title}`;
function jobHTML(j) { return jobCard(j,saved,offerURL(j.id,location.search,saved)); }
function activeFilters() {
  const chips=[];
  if(state.q) chips.push({key:'q',value:state.q,label:`„${state.q}”`});
  if(state.city) chips.push({key:'city',value:state.city,label:state.city});
  for(const key of ['mode','level','contract']) state[key].forEach(v=>chips.push({key,value:v,label:v==='UoP'?'Umowa o pracę':v==='Lead'?'Lead / Manager':v}));
  if(state.minSalary) chips.push({key:'minSalary',value:'',label:`Od ${money(state.minSalary)} zł`});
  if(state.salaryOnly) chips.push({key:'salaryOnly',value:'',label:'Z widełkami'});
  return chips;
}
function render() {
  const matches=sortJobs(filtered());
  const pages=Math.max(1,Math.ceil(matches.length/pageSize));
  state.page=Math.min(state.page,pages);
  syncURL();
  const start=(state.page-1)*pageSize;
  const page=matches.slice(start,start+pageSize);
  $('#job-list').innerHTML=page.map(jobHTML).join('');
  $('#result-number').textContent=matches.length;
  $('#results-title').textContent=state.savedOnly?'Zapisane oferty':'Oferty pracy';
  $('#results-announcement').textContent=`${offerCount(matches.length)}. ${matches.length?`Wyświetlono ${start+1}–${start+page.length}.`:''}`;
  $('#saved-count').textContent=saved.size;
  $('#saved-toggle').setAttribute('aria-pressed',String(state.savedOnly));
  const allCategories=filtered({ignoreCategory:true});
  $$('#categories button').forEach(b=>{const category=b.dataset.category;const selected=state.category===category;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));b.querySelector('[data-count]').textContent=category==='all'?allCategories.length:allCategories.filter(j=>j.category===category).length;});
  const modeBase=filtered({ignoreMode:true});
  $$('[data-facet]').forEach(el=>el.textContent=modeBase.filter(j=>j.mode===el.dataset.facet).length);
  const chips=activeFilters();
  $('#active-filters').hidden=!chips.length;
  $('#active-filters').innerHTML=chips.map(c=>`<button class="filter-chip" type="button" data-remove="${c.key}" data-value="${esc(c.value)}" aria-label="Usuń filtr: ${esc(c.label)}">${esc(c.label)}${icon('close')}</button>`).join('');
  const filterCount=chips.length+(state.category!=='all'?1:0);
  $('#mobile-filter-count').textContent=filterCount;
  $('#mobile-filter-count').hidden=!filterCount;
  $('#apply-mobile-filters').textContent=`Pokaż ${matches.length} ${plural(matches.length,'ofertę','oferty','ofert')}`;
  $('#empty-state').hidden=!!matches.length;
  $('#empty-title').textContent=state.savedOnly?'Zapisz coś dla siebie.':'Tym razem nic tu nie ma.';
  $('#empty-copy').textContent=state.savedOnly?(saved.size?'Żadna zapisana oferta nie pasuje do tych filtrów. Zmień kryteria, żeby zobaczyć więcej.':'Kliknij zakładkę przy ofercie, do której chcesz wrócić. Zapisane oferty są dostępne w tej sesji.'):'Zmień hasło lub odpuść jeden z filtrów. Dobra robota może być tuż obok.';
  $('#empty-reset').textContent=state.savedOnly?'Wróć do wszystkich ofert':'Pokaż wszystkie oferty';
  $('#pagination').hidden=!matches.length;
  $('#pagination').innerHTML=matches.length?`<span class="page-summary">${start+1}–${start+page.length} z ${matches.length}</span><button class="page-button" type="button" data-page="${state.page-1}" ${state.page===1?'disabled':''} aria-label="Poprzednia strona">${icon('arrow-left')}</button>${Array.from({length:pages},(_,i)=>`<button class="page-button" type="button" data-page="${i+1}" ${state.page===i+1?'aria-current="page"':''} aria-label="Strona ${i+1}">${i+1}</button>`).join('')}<button class="page-button" type="button" data-page="${state.page+1}" ${state.page===pages?'disabled':''} aria-label="Następna strona">${icon('arrow-right')}</button>`:'';
  updateSavedButtons();
}
function updateSavedButtons() {
  $$('[data-save]').forEach(b=>{const job=jobs.find(j=>j.id===Number(b.dataset.save));b.setAttribute('aria-pressed',String(saved.has(job.id)));b.setAttribute('aria-label',saveLabel(job));if(b.classList.contains('modal-save'))b.innerHTML=`${icon(saved.has(job.id)?'check':'bookmark')}${saved.has(job.id)?'Zapisano w tej sesji':'Zapisz ofertę'}`;});
}
function notify(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent=message;$('#toast').hidden=false;
  toastTimer=setTimeout(()=>$('#toast').hidden=true,2800);
}
function toggleSaved(id) {
  const job=jobs.find(j=>j.id===id);if(!job)return;
  const removing=saved.has(id);if(removing)saved.delete(id);else saved.add(id);
  notify(removing?'Usunięto z zapisanych':'Zapisano ofertę w tej sesji');
  if(state.savedOnly)render();else{$('#saved-count').textContent=saved.size;updateSavedButtons();$$('.job-card a').forEach(a=>{const id=Number(a.closest('.job-card').querySelector('[data-save]').dataset.save);a.href=offerURL(id,location.search,saved);});}
}
function reset() {
  Object.assign(state,{q:'',city:'',category:'all',mode:[],level:[],contract:[],minSalary:0,salaryOnly:false,page:1,savedOnly:false});
  syncControls();render();
}
$('#search-form').addEventListener('submit',e=>{e.preventDefault();state.q=$('#search').value.trim().slice(0,200);state.city=$('#location').value;state.page=1;render();});
$('#search').addEventListener('input',()=>$('#search-clear').hidden=!$('#search').value);
$('#search-clear').addEventListener('click',()=>{$('#search').value='';state.q='';state.page=1;$('#search-clear').hidden=true;render();$('#search').focus();});
$('#categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;state.category=b.dataset.category;state.page=1;render();});
$('#filter-panel').addEventListener('change',e=>{
  const el=e.target;
  if(['mode','level','contract'].includes(el.name))state[el.name]=$$(`input[name="${el.name}"]:checked`).map(c=>c.value);
  if(el.id==='min-salary'){if(!el.checkValidity()){el.reportValidity();return;}state.minSalary=Number(el.value)||0;}
  if(el.id==='salary-only')state.salaryOnly=el.checked;
  state.page=1;render();
});
$('#min-salary').addEventListener('input',e=>{if(!e.target.checkValidity())return;state.minSalary=Number(e.target.value)||0;state.page=1;render();});
$('#sort').addEventListener('change',e=>{state.sort=e.target.value;state.page=1;render();});
$('#active-filters').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;const key=b.dataset.remove;if(Array.isArray(state[key]))state[key]=state[key].filter(v=>v!==b.dataset.value);else state[key]=key==='salaryOnly'?false:key==='minSalary'?0:'';state.page=1;syncControls();render();});
$('#reset-filters').addEventListener('click',reset);
$('#empty-reset').addEventListener('click',reset);
$('#saved-toggle').addEventListener('click',()=>{state.savedOnly=!state.savedOnly;state.page=1;render();$('#results').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
$('#pagination').addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(!b||b.disabled)return;state.page=Number(b.dataset.page);render();$('#results').scrollIntoView({behavior:'instant',block:'start'});$('#results').focus({preventScroll:true});});
document.addEventListener('click',e=>{
  const close=e.target.closest('[data-close]');if(close){document.getElementById(close.dataset.close).close();return;}
  const save=e.target.closest('[data-save]');if(save){toggleSaved(Number(save.dataset.save));return;}
});
$('#about-open').addEventListener('click',()=>$('#about-dialog').showModal());
$('#footer-about').addEventListener('click',()=>$('#about-dialog').showModal());
$('#mobile-filters').addEventListener('click',()=>{$('#mobile-filter-slot').append($('#filter-panel'));$('#filter-dialog').showModal();});
$('#apply-mobile-filters').addEventListener('click',()=>$('#filter-dialog').close());
$('#filter-dialog').addEventListener('close',()=>$('#filter-sidebar').prepend($('#filter-panel')));
window.addEventListener('popstate',()=>{fromURL();syncControls();render();});
fromURL();syncControls();render();
