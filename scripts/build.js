/**
 * Builds the static site from src/ into the repository root (which Cloudflare serves as-is).
 *
 *   npm run build
 *
 * 1. assets/icons.svg      ← src/lib/icons.js
 * 2. assets/js/site.js     ← src/js/site.js (minified)
 * 3. assets/css/main.css   ← assets/css/main-source.css (Tailwind, minified)
 * 4. *.html, services/*.html, blog/*.html  ← src/pages/*
 * 5. sitemap.xml, robots.txt, site.webmanifest
 * 6. Checks: internal links, assets, titles, descriptions, duplicate ids
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { minify } = require('terser');

const root = path.join(__dirname, '..');
const site = require('../src/config');
const { versions } = require('../src/lib/html');
const { sprite } = require('../src/lib/icons');
const { page } = require('../src/lib/layout');
const qr = require('../src/lib/qr');

const hash = buf => crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);
const write = (rel, data) => {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
};

async function buildAssets() {
  const svg = sprite();
  write('assets/icons.svg', svg);
  versions.icons = hash(svg);

  const src = fs.readFileSync(path.join(root, 'src/js/site.js'), 'utf8')
    .replace(/__WHATSAPP__/g, site.whatsapp)
    .replace(/__PHONE_DISPLAY__/g, site.phoneDisplay);
  const { code } = await minify(src, { compress: true, mangle: true });
  write('assets/js/site.js', code);
  versions.js = hash(code);

  execFileSync(process.execPath, [
    path.join(root, 'node_modules/tailwindcss/lib/cli.js'),
    '-i', path.join(root, 'assets/css/main-source.css'),
    '-o', path.join(root, 'assets/css/main.css'),
    '--minify',
  ], { cwd: root, stdio: ['ignore', 'ignore', 'pipe'] });
  versions.css = hash(fs.readFileSync(path.join(root, 'assets/css/main.css')));
}

function renderPages() {
  const modules = ['home', 'about', 'services', 'products', 'gallery', 'contact', 'blog', 'brochure', 'faq', 'lang', 'misc'];
  const pages = modules.flatMap(m => require(`../src/pages/${m}`)());
  return pages.map(p => ({ ...p, html: page(p) }));
}

function oldLastmods() {
  const map = {};
  const file = path.join(root, 'sitemap.xml');
  if (!fs.existsSync(file)) return map;
  const xml = fs.readFileSync(file, 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) map[m[1]] = m[2];
  return map;
}

function writePages(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const prev = oldLastmods();
  // Remove generated sub-folders first so deleted posts/services do not linger.
  for (const dir of ['services', 'blog']) fs.rmSync(path.join(root, dir), { recursive: true, force: true });
  for (const p of pages) {
    const file = path.join(root, p.file);
    const before = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    const loc = site.siteUrl + (p.path === '/' ? '/' : p.path);
    p.lastmod = before === p.html && prev[loc] ? prev[loc] : today;
    write(p.file, p.html);
  }
}

function writeSeoFiles(pages) {
  const urls = pages.filter(p => !p.noindex).map(p => {
    const loc = site.siteUrl + (p.path === '/' ? '/' : p.path);
    const imgs = [...new Set([...p.html.matchAll(/src="(\/assets\/img\/[^"]+\.webp)"/g)].map(m => m[1]))]
      .filter(src => !src.includes('/clients/') && !src.endsWith('logo.webp')).slice(0, 10);
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n${imgs.map(i => `    <image:image><image:loc>${site.siteUrl}${i}</image:loc></image:image>\n`).join('')}  </url>`;
  });
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`);
  write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /src/\nDisallow: /scripts/\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`);
  write('site.webmanifest', JSON.stringify({
    name: site.name, short_name: 'Aaradhya Enviro', start_url: '/', display: 'standalone',
    background_color: '#ffffff', theme_color: '#047857',
    icons: [
      { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }, null, 2) + '\n');

  // IndexNow ownership key (Bing, Yandex, Seznam…). See scripts/indexnow.js.
  write(`${site.indexNowKey}.txt`, site.indexNowKey);

  writeLlmsTxt();
}

// llms.txt – a plain Markdown summary for AI assistants (https://llmstxt.org).
function writeLlmsTxt() {
  const { groups, services } = require('../src/data/services');
  const answers = require('../src/data/answers');
  const posts = require('../src/data/posts');
  const u = p => site.siteUrl + p;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} is an environmental consultancy and turnkey pollution control company in Waluj MIDC, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India. Founded in ${site.foundingYear}, it has served ${site.clientsCount} clients and offers ${services.length} services: MPCB consents (CTE/CTO), Environmental Clearance, ETP/STP and ZLD plants, air pollution control, environmental testing and monitoring, hazardous waste and plastic EPR compliance, operation & maintenance and compliance training.`,
    '',
    '## Key facts',
    `- Founded: ${site.foundingYear}`,
    `- Head office: ${site.address.full}`,
    `- Clients served: ${site.clientsCount}; team experience: ${site.yearsExperience} years`,
    `- Service area: ${site.areasServed.join(', ')}; PAN India on request`,
    `- Phone / WhatsApp: ${site.phoneDisplay}; email: ${site.email}`,
    `- Languages: English, Hindi, Marathi`,
    '',
    ...groups.flatMap(g => [`## ${g.name}`, ...services.filter(s => s.group === g.id).map(s => `- [${s.name}](${u('/services/' + s.slug)}): ${answers.services[s.slug]}`), '']),
    '## Guides',
    ...posts.map(p => `- [${p.title}](${u('/blog/' + p.slug)}): ${p.excerpt}`),
    '',
    '## Company',
    `- [About](${u('/about')})`,
    `- [Environmental compliance FAQ](${u('/faq')})`,
    `- [Company profile PDF](${u('/assets/Aaradhya-Enviro-Company-Profile.pdf')})`,
    `- [Contact](${u('/contact')})`,
    `- [Google Business Profile](${site.googleBusinessUrl}) (listed as "${site.alternateName}")`,
    `- [Hindi](${u('/hi')}) · [Marathi](${u('/mr')})`,
    '',
  ];
  write('llms.txt', lines.join('\n'));
}

function check(pages) {
  const problems = [];
  const known = new Set(pages.map(p => p.path));
  const exists = rel => fs.existsSync(path.join(root, decodeURIComponent(rel.split('?')[0].split('#')[0])));
  for (const p of pages) {
    const title = (p.html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    const desc = (p.html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    const plainTitle = title.replace(/&amp;/g, '&');
    if (plainTitle.length > 65) problems.push(`${p.path}: title ${plainTitle.length} chars`);
    const plainDesc = desc.replace(/&amp;/g, '&').replace(/&#39;/g, "'");
    if (!p.noindex && (plainDesc.length < 70 || plainDesc.length > 160)) problems.push(`${p.path}: description ${plainDesc.length} chars`);
    if ((p.html.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`${p.path}: ${(p.html.match(/<h1[\s>]/g) || []).length} h1 tags`);
    const ids = [...p.html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dup.length) problems.push(`${p.path}: duplicate ids ${[...new Set(dup)].join(', ')}`);
    for (const m of p.html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
      const url = m[1].split('#')[0].split('?')[0];
      if (!url || url === '/') continue;
      if (url.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(url)) { if (!exists(url)) problems.push(`${p.path}: missing file ${url}`); }
      else if (!known.has(url)) problems.push(`${p.path}: broken link ${url}`);
    }
  }
  return problems;
}

(async () => {
  const t = Date.now();
  await buildAssets();
  await qr.prepare();
  const pages = renderPages();
  writePages(pages);
  writeSeoFiles(pages);
  const problems = check(pages);
  const kb = f => (fs.statSync(path.join(root, f)).size / 1024).toFixed(1) + ' KB';
  console.log(`Built ${pages.length} pages in ${Date.now() - t} ms  |  css ${kb('assets/css/main.css')}  js ${kb('assets/js/site.js')}  icons ${kb('assets/icons.svg')}`);
  if (problems.length) {
    console.log(`\n${problems.length} problem(s):\n  ` + problems.join('\n  '));
    process.exitCode = 1;
  } else {
    console.log('Checks passed: links, assets, titles, descriptions, headings, ids.');
  }
})().catch(e => { console.error(e); process.exit(1); });
