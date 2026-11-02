import { jobs } from './jobs.js';
import { icon, jobCard, offerURL, logoHTML, salaryHTML } from '../../components/ui.js';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const saved=new Set([7]);
const sampleJobs=[1,7,10].map(id=>jobs.find(j=>j.id===id));
let timer;
function notify(message){clearTimeout(timer);$('#toast').textContent=message;$('#toast').hidden=false;timer=setTimeout(()=>$('#toast').hidden=true,2800);}
function renderCards(){
  $('#sample-cards').innerHTML=sampleJobs.map(job=>jobCard(job,saved,offerURL(job.id,'',saved))).join('');
}
function setStatus(message){$('#catalog-status').textContent=message;}
$$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
$('#sample-facts').innerHTML=salaryHTML(jobs[0])+salaryHTML(jobs[9]);
$('#sample-logos').innerHTML=[jobs[0],jobs[1],jobs[2],jobs[3]].map(logoHTML).join('');
renderCards();
$('#catalog-form').addEventListener('submit',event=>{event.preventDefault();const form=new FormData(event.currentTarget);setStatus(`Poprawna wartość: ${form.get('salary')?form.get('salary')+' zł':'bez progu'}. Trybów pracy: ${form.getAll('mode').length}.`);notify('Przykładowy formularz sprawdzony');});
$('#catalog-form').addEventListener('invalid',()=>setStatus('Wpisz liczbę od 0 do 100000.'),true);
$('#catalog-form').addEventListener('reset',()=>setStatus('Pola przykładu wyczyszczone.'));
$('#sample-sort').addEventListener('change',e=>setStatus(`Wybrano: ${e.target.selectedOptions[0].textContent}.`));
$('#reset-example').addEventListener('click',()=>{$('#catalog-form').reset();$('#sample-sort').value='newest';notify('Wyczyszczono przykład pól');});
$('#sample-toggle').addEventListener('click',e=>{const b=e.currentTarget;const next=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(next));notify(next?'Zapisano przykład':'Usunięto przykład z zapisanych');});
$('#sample-categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;$$('#sample-categories button').forEach(item=>{const selected=item===b;item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',String(selected));});$('#category-status').textContent=`Wybrano: ${b.dataset.category==='all'?'Wszystkie oferty':b.dataset.category}.`;});
$('#sample-chips').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const next=b.nextElementSibling||b.previousElementSibling;b.remove();if(next)next.focus();else $('#sample-categories button').focus();notify('Usunięto kryterium przykładu');});
document.addEventListener('click',e=>{
  if(e.target.closest('[data-open-dialog]'))$('#catalog-dialog').showModal();
  if(e.target.closest('[data-close-dialog]'))$('#catalog-dialog').close();
  const page=e.target.closest('[data-page]');if(page)location.assign(`./?page=${page.dataset.page}#results`);
  const button=e.target.closest('[data-save]');if(button){const id=Number(button.dataset.save);if(saved.has(id))saved.delete(id);else saved.add(id);renderCards();$(`#sample-cards [data-save="${id}"]`).focus();notify(saved.has(id)?'Zapisano ofertę w przykładzie':'Usunięto ofertę z zapisanych');}
});
