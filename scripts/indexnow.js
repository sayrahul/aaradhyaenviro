/**
 * Notifies IndexNow search engines (Bing — which also feeds ChatGPT search and Copilot — Yandex,
 * Seznam, Naver) about new or changed pages. Run AFTER the site is deployed:
 *
 *   npm run indexnow            pages whose sitemap <lastmod> is within the last 7 days
 *   npm run indexnow -- --all   every URL in the sitemap
 *
 * The ownership key is src/config.js → indexNowKey; the build publishes it as /<key>.txt.
 */
const fs = require('fs');
const path = require('path');
const site = require('../src/config');

const all = process.argv.includes('--all');
const xml = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');
const since = Date.now() - 7 * 24 * 3600 * 1000;
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
  .filter(m => all || new Date(m[2]).getTime() >= since)
  .map(m => m[1]);

(async () => {
  if (!urls.length) return console.log('Nothing recent to submit (use --all to submit every URL).');
  const host = new URL(site.siteUrl).host;
  const keyUrl = `${site.siteUrl}/${site.indexNowKey}.txt`;
  const live = await fetch(keyUrl).then(r => r.ok ? r.text() : '').catch(() => '');
  if (live.trim() !== site.indexNowKey) {
    console.error(`Key file not live at ${keyUrl}. Deploy the site first, then run this again.`);
    process.exit(1);
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: site.indexNowKey, keyLocation: keyUrl, urlList: urls }),
  });
  console.log(`IndexNow: submitted ${urls.length} URL(s) → HTTP ${res.status} ${res.status === 200 || res.status === 202 ? '(accepted)' : await res.text()}`);
})();
