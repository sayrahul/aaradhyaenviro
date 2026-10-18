// Company profile / brochure.
// On screen (md+) each <section class="sheet"> is an exact A4 page, so what you see is what the PDF
// contains. On phones the sheets reflow into normal cards. `npm run pdf` prints this page with
// headless Chrome into assets/Aaradhya-Enviro-Company-Profile.pdf (the "Download PDF" file).
const fs = require('fs');
const path = require('path');
const site = require('../config');
const clients = require('../data/clients');
const { groups, services } = require('../data/services');
const { products, values, reasons, testimonials } = require('../data/content');
const { esc, icon, printPhoto, logoImg, clientLogo, waLink, telLink } = require('../lib/html');
const { breadcrumbs } = require('../lib/components');
const { qr } = require('../lib/qr');

const PDF_PATH = '/assets/Aaradhya-Enviro-Company-Profile.pdf';
const TOTAL = 8;

module.exports = () => {
  const crumbs = breadcrumbs([{ name: 'Company brochure', path: '/brochure' }]);
  const year = new Date().getFullYear();
  const pdfFile = path.join(__dirname, '..', '..', PDF_PATH);
  const pdfSize = fs.existsSync(pdfFile) ? `${(fs.statSync(pdfFile).size / 1048576).toFixed(1)} MB` : '';
  const domain = site.siteUrl.replace('https://', '');
  const img = (key, cls) => printPhoto(key, cls);

  const sheetFooter = n => `<div class="sheet-footer"><span>${esc(site.name)} · Company Profile ${year}</span><span>${domain} · ${site.phoneDisplay}</span><span>${n} / ${TOTAL}</span></div>`;
  const sheet = (n, inner, cls = '') => `<section class="sheet ${cls}" aria-label="Page ${n} of ${TOTAL}">${inner}${n > 1 && n < TOTAL ? sheetFooter(n) : ''}</section>`;
  const h = (num, title, kicker) => `<header class="mb-6">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">${String(num).padStart(2, '0')} · ${esc(kicker)}</p>
      <h2 class="mt-1 border-b-2 border-emerald-600 pb-3 text-[1.7rem] font-bold leading-tight text-gray-900">${title}</h2>
    </header>`;
  const svcBlock = g => `<div>
      <h3 class="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold uppercase tracking-wider text-emerald-800">${icon(g.icon, 'w-4 h-4')}${esc(g.name)}</h3>
      <ul class="mt-3 space-y-3">${services.filter(s => s.group === g.id).map(s => `
        <li class="flex gap-3">
          <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">${icon(s.icon, 'w-4 h-4')}</span>
          <div><p class="font-semibold leading-snug text-gray-900">${esc(s.name)}</p><p class="mt-0.5 text-[0.8rem] leading-snug text-gray-600">${esc(s.card)}</p></div>
        </li>`).join('')}
      </ul>
    </div>`;
  const process = ['Site visit & assessment', 'Design & engineering', 'Regulatory approvals', 'Fabrication & installation', 'Testing & commissioning', 'O&M, monitoring & renewals'];
  const industries = [['factory', 'Chemical & pharma'], ['leaf', 'Sugar & food processing'], ['settings', 'Engineering & automotive'], ['building', 'Construction & real estate'], ['shield-check', 'Hospitals & healthcare'], ['layers', 'Textile & agro-industries']];

  const pages = [
    // 1 — Cover
    sheet(1, `
    <div class="flex h-full flex-col">
      <div class="relative h-[27rem] overflow-hidden md:h-[58%]">
        ${img('stp-aerial', 'absolute inset-0 h-full w-full object-cover')}
        <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/10"></div>
        <div class="absolute left-6 top-6 rounded-xl bg-white px-4 py-3 shadow-lg md:left-[12mm] md:top-[12mm]">${logoImg('h-8 w-auto md:h-12', { eager: true })}</div>
        <div class="absolute inset-x-6 bottom-6 text-white md:inset-x-[12mm] md:bottom-[10mm]">
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Company Profile ${year}</p>
          <p class="mt-2 text-2xl font-bold leading-tight sm:text-3xl md:text-[2.6rem]">Environmental consultancy &amp; turnkey pollution control</p>
          <p class="mt-3 text-sm text-gray-200 md:text-base">MPCB compliance · ETP / STP · ZLD &amp; RO · Air pollution control · Testing · O&amp;M</p>
        </div>
      </div>
      <div class="flex flex-1 flex-col p-6 md:px-[12mm] md:py-[9mm]">
        <dl class="grid grid-cols-2 gap-3 md:grid-cols-4">
          ${site.stats.map(s => `<div class="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-4 text-center"><dd class="text-3xl font-bold text-emerald-700">${esc(s.value)}</dd><dt class="mt-1 text-xs font-medium text-gray-600">${esc(s.label)}</dt></div>`).join('')}
        </dl>
        <p class="mt-6 text-[0.95rem] leading-relaxed text-gray-700">One accountable partner for your environmental obligations — approvals, engineering, installation, monitoring and day-to-day operation — for industries across Maharashtra.</p>
        <div class="mt-auto flex flex-col gap-5 border-t border-gray-200 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-center gap-2">${icon('phone', 'w-4 h-4 text-emerald-700')}<a href="${telLink()}" class="font-semibold">${site.phoneDisplay}</a></li>
            <li class="flex items-center gap-2">${icon('mail', 'w-4 h-4 text-emerald-700')}${site.email}</li>
            <li class="flex items-center gap-2">${icon('external-link', 'w-4 h-4 text-emerald-700')}${domain}</li>
            <li class="flex items-start gap-2">${icon('map-pin', 'mt-0.5 w-4 h-4 shrink-0 text-emerald-700')}<span>${esc(site.address.full)}</span></li>
          </ul>
          <div class="flex items-center gap-3 text-right">
            <p class="whitespace-nowrap text-xs font-medium leading-snug text-gray-500">Scan to visit<br>our website</p>
            <div class="rounded-lg border border-gray-200 bg-white p-2">${qr('website', 'h-24 w-24')}</div>
          </div>
        </div>
      </div>
    </div>`, 'sheet--bleed'),

    // 2 — About
    sheet(2, `
    ${h(1, 'About Aaradhya Enviro', 'Who we are')}
    <div class="grid gap-6 md:grid-cols-3">
      <div class="space-y-3 text-[0.9rem] leading-relaxed text-gray-700 md:col-span-2">
        <p>Environmental pollution is one of the most pressing challenges facing industry today, threatening the air we breathe, the water we drink and the food we grow. As regulations tighten, industries are expected to operate responsibly while staying profitable.</p>
        <p>Aaradhya Enviro was founded in ${site.foundingYear} in Waluj MIDC, Chhatrapati Sambhajinagar, to solve exactly this problem. Backed by a team with ${site.yearsExperience} years of hands-on experience, we have served ${site.clientsCount} clients — from small manufacturing units to large industrial groups, sugar factories, construction companies and multinational corporations.</p>
        <p>We do not stop at paperwork. We design, install, operate and maintain the physical systems — ETPs, STPs, RO and ZLD plants, air pollution control equipment — that keep a facility compliant every single day.</p>
      </div>
      <aside class="rounded-xl bg-gray-900 p-5 text-sm text-gray-300">
        <p class="text-xs font-bold uppercase tracking-wider text-emerald-400">At a glance</p>
        <dl class="mt-3 space-y-3">
          ${[['Founded', site.foundingYear], ['Head office', 'Waluj MIDC, Chh. Sambhajinagar'], ['Clients served', site.clientsCount], ['Team experience', `${site.yearsExperience} years`], ['Services', `${services.length} specialised services`], ['Coverage', 'Maharashtra & PAN India on request']].map(([k, v]) => `<div><dt class="text-xs text-gray-400">${k}</dt><dd class="font-semibold text-white">${esc(v)}</dd></div>`).join('')}
        </dl>
      </aside>
    </div>
    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <div class="rounded-xl border-l-4 border-emerald-600 bg-gray-50 p-5"><h3 class="flex items-center gap-2 font-bold text-gray-900">${icon('route', 'w-5 h-5 text-emerald-700')}Our mission</h3><p class="mt-2 text-sm leading-relaxed text-gray-700">To make environmental compliance simple, transparent and achievable — protecting the environment while helping clients reduce risk and cost.</p></div>
      <div class="rounded-xl border-l-4 border-emerald-600 bg-gray-50 p-5"><h3 class="flex items-center gap-2 font-bold text-gray-900">${icon('leaf', 'w-5 h-5 text-emerald-700')}Our vision</h3><p class="mt-2 text-sm leading-relaxed text-gray-700">To be one of Maharashtra's most trusted names in environmental consultancy and turnkey pollution control.</p></div>
    </div>
    <h3 class="mt-7 text-lg font-bold text-gray-900">Our values</h3>
    <ul class="mt-3 grid gap-4 md:grid-cols-2">${values.map(v => `<li class="flex gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">${icon(v.icon, 'w-5 h-5')}</span><div><p class="font-semibold text-gray-900">${esc(v.title)}</p><p class="text-sm leading-snug text-gray-600">${esc(v.text)}</p></div></li>`).join('')}</ul>`),

    // 3 — Why us, process, industries
    sheet(3, `
    ${h(2, 'Why industries choose us', 'Our approach')}
    <ul class="grid gap-4 md:grid-cols-2">${reasons.map(r => `<li class="flex gap-3 rounded-xl border border-gray-200 p-4"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-white">${icon(r.icon, 'w-5 h-5')}</span><div><p class="font-semibold text-gray-900">${esc(r.title)}</p><p class="mt-1 text-sm leading-snug text-gray-600">${esc(r.text)}</p></div></li>`).join('')}</ul>
    <h3 class="mt-6 text-lg font-bold text-gray-900">One partner, every stage</h3>
    <ol class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">${process.map((p, i) => `<li class="relative rounded-xl bg-gray-900 p-4 text-white"><span class="text-2xl font-bold text-emerald-400">${String(i + 1).padStart(2, '0')}</span><p class="mt-1 text-sm font-semibold leading-snug">${esc(p)}</p></li>`).join('')}</ol>
    <h3 class="mt-6 text-lg font-bold text-gray-900">Industries we serve</h3>
    <ul class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">${industries.map(([ic, t]) => `<li class="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800">${icon(ic, 'w-5 h-5 shrink-0 text-emerald-700')}${esc(t)}</li>`).join('')}</ul>
    <div class="mt-6 grid grid-cols-3 gap-3">${['etp-site', 'zld-plant', 'apc-stack'].map(k => `<div class="overflow-hidden rounded-xl">${img(k, 'aspect-[16/7] w-full object-cover')}</div>`).join('')}</div>`),

    // 4 — Services I
    sheet(4, `
    ${h(3, 'Our services', 'Compliance & turnkey projects')}
    <div class="grid gap-6 md:grid-cols-2">${groups.slice(0, 2).map(svcBlock).join('')}</div>
    <div class="mt-6 rounded-xl bg-emerald-700 p-5 text-white">
      <p class="font-bold">From consent application to commissioned plant</p>
      <p class="mt-1 text-sm text-emerald-50">We prepare MPCB and Environmental Clearance applications and design, build and commission the treatment systems those approvals require — so documents and plant performance always match.</p>
    </div>
    <div class="mt-6 grid grid-cols-3 gap-3">${['etp-plant', 'ro-plant-hall', 'apc-scrubber'].map(k => `<div class="overflow-hidden rounded-xl">${img(k, 'aspect-[16/7] w-full object-cover')}</div>`).join('')}</div>`),

    // 5 — Services II
    sheet(5, `
    ${h(4, 'Our services', 'Testing, monitoring & management')}
    <div class="grid gap-6 md:grid-cols-2">${groups.slice(2).map(svcBlock).join('')}</div>
    <h3 class="mt-6 flex items-center gap-2 text-lg font-bold text-gray-900">${icon('calendar', 'w-5 h-5 text-emerald-700')}Key annual compliance deadlines</h3>
    <div class="mt-3 overflow-x-auto rounded-xl border border-gray-200">
      <table class="w-full min-w-[30rem] text-left text-[0.8rem]">
        <thead class="bg-gray-900 text-white"><tr><th class="px-3 py-2 font-semibold">Filing</th><th class="px-3 py-2 font-semibold">Who files</th><th class="px-3 py-2 font-semibold">Due</th></tr></thead>
        <tbody class="divide-y divide-gray-200 text-gray-700">
          ${[
            ['Environmental Statement (Form V)', 'All units holding MPCB consent', '30 September'],
            ['Hazardous waste annual return', 'Hazardous waste generators', '30 June'],
            ['Bio-medical waste annual report', 'Hospitals, clinics, labs', '30 June'],
            ['Plastic EPR annual return', 'Producers, importers, brand owners', '30 June'],
            ['EC six-monthly compliance report', 'Projects with Environmental Clearance', '1 June & 1 December'],
            ['Consent / NOC renewal', 'MPCB consent, CGWA NOC holders', 'Well before expiry'],
          ].map(([a, b, c], i) => `<tr class="${i % 2 ? 'bg-gray-50' : ''}"><td class="px-3 py-2 font-medium text-gray-900">${a}</td><td class="px-3 py-2">${b}</td><td class="whitespace-nowrap px-3 py-2 font-semibold text-emerald-700">${c}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
    <p class="mt-2 text-[0.7rem] text-gray-500">As per current rules; always check the conditions in your own consent or authorisation. We track these dates for our clients.</p>
    <div class="mt-4 grid grid-cols-3 gap-3">${['monitoring-room', 'engineers-lab', 'stp-clarifiers'].map(k => `<div class="overflow-hidden rounded-xl">${img(k, 'aspect-[3/1] w-full object-cover')}</div>`).join('')}</div>`),

    // 6 — Systems
    sheet(6, `
    ${h(5, 'Systems we deliver', 'Turnkey equipment')}
    <div class="grid gap-4 md:grid-cols-2">${products.slice(0, 6).map(p => `<article class="overflow-hidden rounded-xl border border-gray-200">
      ${img(p.image, 'aspect-[5/2] w-full object-cover')}
      <div class="p-4">
        <p class="text-[0.65rem] font-bold uppercase tracking-wider text-emerald-700">${esc(p.category)}</p>
        <h3 class="font-bold leading-snug text-gray-900">${esc(p.name)}</h3>
        <ul class="mt-2 grid grid-cols-1 gap-1 text-[0.78rem] text-gray-600">${p.features.slice(0, 3).map(f => `<li class="flex gap-1.5">${icon('check', 'mt-0.5 w-3.5 h-3.5 shrink-0 text-emerald-600')}${esc(f)}</li>`).join('')}</ul>
      </div>
    </article>`).join('')}</div>`),

    // 7 — Clients & testimonials
    sheet(7, `
    ${h(6, `Trusted by ${site.clientsCount} clients`, 'Clients & feedback')}
    <ul class="grid grid-cols-3 gap-3 md:grid-cols-5">${clients.map(c => `<li class="flex h-14 items-center justify-center rounded-lg border border-gray-200 bg-white p-2">${clientLogo(c, 'max-h-10 w-auto max-w-full object-contain', { lazy: false })}</li>`).join('')}</ul>
    <h3 class="mt-8 text-lg font-bold text-gray-900">What our clients say</h3>
    <div class="mt-4 grid gap-4 md:grid-cols-2">${testimonials.slice(0, 4).map(t => `<figure class="rounded-xl bg-gray-50 p-5">
      ${icon('quote', 'w-6 h-6 text-emerald-600')}
      <blockquote class="mt-2 text-sm leading-relaxed text-gray-700">“${esc(t.quote)}”</blockquote>
      <figcaption class="mt-3 text-sm"><span class="font-semibold text-gray-900">${esc(t.name)}</span> · <span class="text-gray-500">${esc(t.role)}</span></figcaption>
    </figure>`).join('')}</div>`),

    // 8 — Back cover / contact
    sheet(8, `
    <div class="flex h-full flex-col bg-gray-950 p-6 text-gray-300 md:p-[12mm]">
      <div class="inline-flex self-start rounded-xl bg-white px-4 py-3">${logoImg('h-10 w-auto')}</div>
      <h2 class="mt-10 text-3xl font-bold leading-tight text-white md:text-[2.4rem]">Ready to make compliance simple?</h2>
      <p class="mt-3 max-w-xl text-gray-300">Book a free site assessment. Share your requirement and receive a clear written scope, timeline and estimate.</p>
      <div class="mt-10 grid gap-6 md:grid-cols-2">
        <ul class="space-y-4">
          ${[['phone', 'Call', site.phoneDisplay], ['whatsapp', 'WhatsApp', site.phoneDisplay], ['mail', 'Email', site.email], ['external-link', 'Website', domain], ['clock', 'Availability', site.hours]].map(([ic, k, v]) => `<li class="flex items-center gap-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400">${icon(ic, 'w-5 h-5')}</span><span><span class="block text-xs uppercase tracking-wider text-gray-400">${k}</span><span class="font-semibold text-white">${esc(v)}</span></span></li>`).join('')}
        </ul>
        <div class="grid grid-cols-2 items-start gap-4">
          <div class="rounded-xl bg-white p-4 text-center"><div class="mx-auto w-fit">${qr('whatsapp', 'h-28 w-28')}</div><p class="mt-2 text-xs font-semibold text-gray-900">Scan to WhatsApp us</p></div>
          <div class="rounded-xl bg-white p-4 text-center"><div class="mx-auto w-fit">${qr('website', 'h-28 w-28')}</div><p class="mt-2 text-xs font-semibold text-gray-900">Scan to visit website</p></div>
        </div>
      </div>
      <div class="mt-10 rounded-xl border border-white/10 p-5">
        <p class="flex items-center gap-2 font-semibold text-white">${icon('map-pin', 'w-5 h-5 text-emerald-400')}Head office</p>
        <p class="mt-1 text-sm">${esc(site.address.full)}</p>
        <p class="mt-4 text-xs uppercase tracking-wider text-gray-400">Areas we serve</p>
        <p class="mt-1 text-sm leading-relaxed">${site.areasServed.join(' · ')}</p>
      </div>
      <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">${Object.entries(site.social).map(([k, url]) => `<li><a href="${url}" class="inline-flex items-center gap-2 text-gray-300 hover:text-white">${icon(k, 'w-4 h-4 text-emerald-400')}${url.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')}</a></li>`).join('')}</ul>
      <p class="mt-auto pt-8 text-xs text-gray-500">© ${year} ${esc(site.legalName)}. Information in this profile is indicative; scope and specifications are confirmed in each project proposal.</p>
    </div>`, 'sheet--bleed'),
  ];

  const body = `
<section class="no-print bg-gray-900">
  <div class="container-x py-10 lg:py-14">
    ${crumbs.html}
    <div class="mt-6 grid gap-8 lg:grid-cols-5 lg:items-end">
      <div class="lg:col-span-3">
        <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Company profile &amp; brochure</h1>
        <p class="mt-4 max-w-2xl text-lg text-gray-300">Everything about Aaradhya Enviro in ${TOTAL} pages: who we are, our ${services.length} services, the systems we build, clients and contact details. Download the PDF or share it on WhatsApp.</p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row lg:col-span-2 lg:justify-end">
        <a href="${PDF_PATH}" download class="btn btn-primary btn-lg">${icon('download', 'w-5 h-5')}Download PDF${pdfSize ? ` <span class="font-normal text-emerald-100">(${pdfSize})</span>` : ''}</a>
        <a href="https://wa.me/?text=${encodeURIComponent(`${site.name} – company profile: ${site.siteUrl}${PDF_PATH}`)}" target="_blank" rel="noopener" class="btn btn-wa btn-lg">${icon('whatsapp', 'w-5 h-5')}Share</a>
      </div>
    </div>
    <p class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
      <span class="inline-flex items-center gap-2">${icon('file-text', 'w-4 h-4 text-emerald-400')}A4 · ${TOTAL} pages · print-ready</span>
      <button type="button" class="inline-flex items-center gap-2 hover:text-white" data-print>${icon('printer', 'w-4 h-4 text-emerald-400')}Print this brochure</button>
      <a href="${waLink('Hello Aaradhya Enviro, please send me your company profile and a quote.')}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 hover:text-white">${icon('message', 'w-4 h-4 text-emerald-400')}Request a printed copy</a>
    </p>
  </div>
</section>

<div class="brochure">
  ${pages.join('\n  ')}
</div>
`;
  return [{
    path: '/brochure',
    file: 'brochure.html',
    active: '',
    title: 'Company Profile & Brochure (PDF)',
    description: `Download the ${site.name} company profile (PDF): environmental services, turnkey ETP/STP/ZLD systems, ${site.clientsCount} clients and contact details.`,
    schema: [crumbs.schema, {
      '@context': 'https://schema.org', '@type': 'DigitalDocument', name: `${site.name} – Company Profile ${year}`,
      encodingFormat: 'application/pdf', url: site.siteUrl + PDF_PATH, author: { '@id': `${site.siteUrl}/#organization` },
    }],
    body,
  }];
};
