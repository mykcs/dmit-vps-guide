import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root,'dist');
const html = await readFile(resolve(dist,'index.html'),'utf8');
const js = await readFile(resolve(dist,'main.js'),'utf8');
const css = await readFile(resolve(dist,'styles.css'),'utf8');
const data = JSON.parse(await readFile(resolve(root,'data/plans.json'),'utf8'));
const files = await readdir(dist);

assert(files.includes('.nojekyll'), 'Missing GitHub Pages nojekyll file');
assert(files.includes('favicon.svg'), 'Missing favicon');
assert(!html.includes('<!-- PRICE_ROWS -->'), 'Build did not render plan table');
assert(!html.includes('__SOURCE_DATE__'), 'Date placeholder not resolved');
assert.equal((html.match(/<tr data-route=/g)||[]).length,data.plans.length,'Displayed plans do not match source data');
for (const anchor of ['basics','nodes','plans','build','publishing']) assert(html.includes('id="' + anchor + '"'), 'Missing anchor ' + anchor);
for (const file of ['styles.css','main.js','favicon.svg']) assert(html.includes('./' + file), 'Missing asset ' + file);
for (const series of ['T1','Eyeball','Premium']) assert(html.includes('data-route="' + series + '"'), 'Missing network series ' + series);
assert(css.length > 5000 && js.length > 500, 'Assets unexpectedly small');
assert(data.checked_on==='2026-10-15', 'Re-verify live data before changing source date');
assert(!/(-----BEGIN (?:OPENSSH|RSA|EC|PRIVATE) PRIVATE KEY-----|tailscale-auth-key|tskey-auth-|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/.test(html+js+css),
  'Potential secret in generated website');
console.log('PASS: source date, pricing table, navigation, assets, and secret-pattern checks');
