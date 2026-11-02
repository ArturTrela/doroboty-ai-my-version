export const money = (n) => new Intl.NumberFormat('pl-PL',{maximumFractionDigits:0}).format(n);
const paths = {
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.4"/>',
  bookmark:'<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
  'arrow-right':'<path d="M4 12h15m-5-5 5 5-5 5"/>',
  'arrow-left':'<path d="M20 12H5m5-5-5 5 5 5"/>',
  'arrow-up':'<path d="M12 20V5m-5 5 5-5 5 5"/>',
  external:'<path d="M6 18 18 6M7 6h11v11"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  sliders:'<path d="M4 7h6m4 0h6M4 17h10m4 0h2"/><circle cx="12" cy="7" r="2"/><circle cx="16" cy="17" r="2"/>',
  work:'<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V4h6v3M4 12h16M10 12v3h4v-3"/>',
  remote:'<rect x="3" y="4" width="18" height="13" rx="1"/><path d="M8 21h8m-4-4v4"/>',
  smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01"/>',
  spark:'<path d="m12 2 2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2Z"/><path d="m19 17 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" transform="translate(-1 -2) scale(.95)"/>',
  check:'<path d="m5 12 4.5 4.5L19 7"/>',
};
export const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${Object.hasOwn(paths,name) ? paths[name] : paths.work}</svg>`;
export const esc = (s) => String(s).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials = (job) => job.logo || job.company.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
export const logoHTML = (job) => `<span class="company-logo logo-${['pink','yellow','white','ink'].includes(job.tone)?job.tone:'white'}" aria-hidden="true">${esc(initials(job))}</span>`;
export const salaryHTML = (job) => job.salaryMin === null ? '<span class="salary-missing">Nie podano wynagrodzenia</span>' : `<span class="salary-tag">${money(job.salaryMin)}–${money(job.salaryMax)} zł</span>`;
export const contractLabel = (job) => job.contract==='B2B' ? 'B2B · netto + VAT / mies.' : job.contract==='UoP' ? 'UoP · brutto / mies.' : 'Zlecenie · brutto / mies.';
export const age = (j) => j.days===0?'Dzisiaj':j.days===1?'1 dzień temu':`${j.days} dni temu`;
function safeHref(value) {
  const text = String(value ?? '').trim();
  if(/[\u0000-\u001f\u007f]/.test(text) || text.includes('\\') || text.startsWith('//')) return '#';
  const scheme = text.match(/^([a-z][a-z0-9+.-]*):/i);
  return scheme && !['http','https'].includes(scheme[1].toLowerCase()) ? '#' : text || '#';
}
/** Return semantic card markup. Job strings are escaped; attach save behavior in your controller. */
export function jobCard(j, saved, href) {
  if(!Number.isSafeInteger(j.id) || j.id < 1) throw new TypeError('job.id must be a positive safe integer');
  href = safeHref(href);
  return `<article class="job-card" aria-labelledby="job-title-${j.id}">
    ${logoHTML(j)}
    <div class="job-main"><div class="job-topline"><span class="job-company">${esc(j.company)}</span><span class="separator" aria-hidden="true">/</span><span class="job-category">${esc(j.category)}</span></div><h3 class="job-title" id="job-title-${j.id}"><a href="${esc(href)}">${esc(j.title)}</a></h3><p class="job-facts"><span>${icon('pin')}${esc(j.city)}</span><span>${icon('remote')}${esc(j.mode)}</span><span>${esc(j.level==='Lead'?'Lead / Manager':j.level)}</span></p><div class="job-tags">${j.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div>
    <div class="job-side"><div class="job-side-top"><span class="job-age">${esc(age(j))}</span><button class="save-button" type="button" data-save="${j.id}" aria-pressed="${saved.has(j.id)}" aria-label="${esc(`Zapisz ofertę: ${j.title}`)}">${icon('bookmark')}</button></div><div>${salaryHTML(j)}<p class="salary-description">${j.salaryMin===null?esc(j.contract):contractLabel(j)}</p></div><a class="detail-button" href="${esc(href)}" aria-label="Zobacz ofertę: ${esc(j.title)}">Zobacz ofertę ${icon('external')}</a></div>
  </article>`;
}

export function offerURL(id, back = '', saved = new Set()) {
  const params = new URLSearchParams({id:String(id)});
  if(back) params.set('back',back.replace(/^\?/,''));
  if(saved.size) params.set('marks',[...saved].join(','));
  return `./oferta.html?${params}`;
}
