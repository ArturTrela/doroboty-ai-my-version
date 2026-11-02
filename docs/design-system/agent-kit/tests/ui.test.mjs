import test from 'node:test';
import assert from 'node:assert/strict';
import { jobCard, logoHTML, salaryHTML, icon, offerURL } from '../components/ui.js';
import { jobs } from '../examples/assets/jobs.js';
const job = jobs[0];
test('card escapes supplied text and keeps semantic links and title association',()=>{
  const bad='<img src=x onerror="alert(1)">';
  const html=jobCard({...job,title:bad,company:bad,category:bad,city:bad,mode:bad,level:bad,tags:[bad],days:bad},new Set(), './oferta.html?id=1');
  assert.ok(!html.includes('<img'));
  assert.ok(html.includes('&lt;img'));
  assert.match(html,/aria-labelledby="job-title-1"/);
  assert.match(html,/<h3 class="job-title" id="job-title-1"><a href="\.\/oferta\.html\?id=1">/);
});
test('bookmark state changes without changing its accessible name',()=>{
  const off=jobCard(job,new Set(),offerURL(job.id));
  const on=jobCard(job,new Set([job.id]),offerURL(job.id));
  const name=html=>html.match(/class="save-button"[^>]*aria-label="([^"]+)"/)[1];
  assert.equal(name(off),name(on));
  assert.match(off,/aria-pressed="false"/);
  assert.match(on,/aria-pressed="true"/);
});
test('untrusted card destinations cannot create executable or remote-relative links',()=>{
  for (const href of ['javascript:alert(1)','data:text/html,hi','//example.com','\\example.com','/\\example.com','java\nscript:alert(1)']) {
    assert.match(jobCard(job,new Set(),href),/<a href="#">/);
  }
  assert.match(jobCard(job,new Set(),'https://example.com/job?x=1&y=2'),/<a href="https:\/\/example.com\/job\?x=1&amp;y=2">/);
});
test('invalid identities are rejected before rendering duplicate-prone title IDs',()=>{
  for (const id of [0,-1,'1',1.5,NaN]) assert.throws(()=>jobCard({...job,id},new Set(),'#'),TypeError);
});
test('missing salary and logo remain explicit, with safe tone and icon fallbacks',()=>{
  assert.equal(salaryHTML({...job,salaryMin:null}),'<span class="salary-missing">Nie podano wynagrodzenia</span>');
  assert.match(logoHTML({...job,company:'Example Company',logo:'',tone:'oops" onclick="x'}),/class="company-logo logo-white"[^>]*>EC</);
  assert.equal(icon('toString'),icon('work'));
});
test('detail URL preserves filter context and bookmark IDs as URL parameters',()=>{
  const url=new URL(offerURL(7,'?q=AI&mode=Zdalnie',new Set([1,7])),'https://example.com/examples/');
  assert.equal(url.searchParams.get('id'),'7');
  assert.equal(url.searchParams.get('back'),'q=AI&mode=Zdalnie');
  assert.equal(url.searchParams.get('marks'),'1,7');
});
