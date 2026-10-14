import { readFile, writeFile, copyFile, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const data = JSON.parse(await readFile(resolve(root, 'data/plans.json'), 'utf8'));
const html = await readFile(resolve(root, 'site/index.html'), 'utf8');

if (!/^\d{4}-\d{2}-\d{2}$/.test(data.checked_on) ||
    data.source_url !== 'https://www.dmit.io/pages/location/los-angeles' ||
    !Array.isArray(data.plans) || data.plans.length < 8) {
  throw new Error('Price sources, checked-on date or plan list missing');
}
const names = new Set();
for (const p of data.plans) {
  if (names.has(p.sku)) throw new Error('Duplicate plan: ' + p.sku);
  names.add(p.sku);
  if (!['T1','Eyeball','Premium'].includes(p.network) ||
      !['AS3','AN4','AN5'].includes(p.platform) ||
      !['month','year'].includes(p.interval) ||
      [p.cores,p.ram_gb,p.disk_gb,p.transfer_gb,p.price_usd].some(n => !(Number.isFinite(n) && n>0))) {
    throw new Error('Invalid plan: ' + p.sku);
  }
}
if ((html.match(/<!-- PRICE_ROWS -->/g) || []).length !== 1) {
  throw new Error('Template price placeholder missing or duplicated');
}
const esc = value => String(value).replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const currency = num => '$' + Number(num).toFixed(2);

const rows = data.plans.map(p =>
  '<tr data-route="' + esc(p.network) + '" data-traffic="' + p.transfer_gb + '">' +
  '<td><span class="plan-name">LAX.' + esc(p.sku) + '</span>' +
  '<span class="plan-sub">' + esc(p.platform) + ' · ' + esc(p.port) + '</span></td>' +
  '<td>' + esc(p.network) + '</td>' +
  '<td>' + p.cores + ' 核 / ' + p.ram_gb + ' GB</td>' +
  '<td>' + p.disk_gb + ' GB</td>' +
  '<td>' + esc(p.transfer_label) + '</td>' +
  '<td><span class="plan-rate">' + currency(p.price_usd) + '</span><span class="billed">/ ' +
  (p.interval === 'year' ? '年' : '月') + '</span></td></tr>'
).join('\n');

const output = html.replace('<!-- PRICE_ROWS -->', rows)
  .replaceAll('__SOURCE_DATE__', esc(data.checked_on));

const dist = resolve(root, 'dist');
await rm(dist, { recursive:true, force:true });
await mkdir(dist, { recursive:true });
await writeFile(resolve(dist, 'index.html'), output, 'utf8');
await Promise.all(['styles.css','main.js','favicon.svg','robots.txt'].map(name =>
  copyFile(resolve(root,'site',name),resolve(dist,name))));
await writeFile(resolve(dist,'.nojekyll'),'', 'utf8');
console.log('Built', data.plans.length, 'representative plans; source date', data.checked_on);
