// Printable company brochure. "Download PDF" uses the browser's Save-as-PDF (print) dialog,
// so there is no heavy PDF library to load.
const site = require('../config');
const clients = require('../data/clients');
const { groups, services } = require('../data/services');
const { products, values } = require('../data/content');
const { esc, icon, photo, logoImg, clientLogo, telLink } = require('../lib/html');
const { breadcrumbs } = require('../lib/components');

module.exports = () => {
  const crumbs = breadcrumbs([{ name: 'Company brochure', path: '/brochure' }]);
  const sheet = (inner, cls = '') => `<section class="brochure-sheet ${cls}">${inner}</section>`;

  const body = `
<div class="no-print bg-gray-900">
  <div class="container-x flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
    <div>${crumbs.html}<h1 class="mt-3 text-2xl font-bold text-white sm:text-3xl">Company brochure</h1></div>
    <button type="button" class="btn btn-primary" data-print>${icon('download', 'w-4 h-4')}Download PDF</button>
  </div>
</div>

<div class="brochure bg-gray-100 py-10 print:bg-white print:py-0">
  ${sheet(`
    <div class="flex h-full flex-col">
      ${logoImg('h-14 w-auto')}
      <div class="mt-12">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Company profile</p>
        <p class="mt-3 text-4xl font-bold leading-tight text-gray-900">Environmental consultancy &amp; turnkey pollution control solutions</p>
        <p class="mt-4 text-lg text-gray-600">MPCB compliance · ETP / STP · ZLD &amp; RO · Air pollution control · Testing · O&amp;M</p>
      </div>
      <div class="mt-8 overflow-hidden rounded-2xl">${photo('stp-aerial', { cls: 'aspect-[16/9] w-full object-cover', sizes: '800px' })}</div>
      <dl class="mt-8 grid grid-cols-4 gap-4 text-center">
        ${site.stats.map(s => `<div class="rounded-xl bg-emerald-50 p-4"><dd class="text-2xl font-bold text-emerald-700">${esc(s.value)}</dd><dt class="text-xs text-gray-600">${esc(s.label)}</dt></div>`).join('')}
      </dl>
      <p class="mt-8 text-sm text-gray-600">${esc(site.address.full)} · ${site.phoneDisplay} · ${site.email}</p>
    </div>`)}

  ${sheet(`
    <h2 class="brochure-h">1. About us</h2>
    <p>Aaradhya Enviro is an environmental consultancy and turnkey pollution control company based in Waluj MIDC, Chhatrapati Sambhajinagar, Maharashtra. Founded in ${site.foundingYear} and backed by a team with ${site.yearsExperience} years of experience, we have served ${site.clientsCount} clients, including manufacturing units, industrial groups, sugar factories, construction companies and multinational corporations meet their environmental obligations.</p>
    <p class="mt-3">We do not stop at paperwork. We design, install, operate and maintain the physical systems — ETPs, STPs, RO and ZLD plants, air pollution control equipment — that keep a facility compliant every day. Clients get one accountable partner for environment, health and safety (EHS) compliance.</p>
    <div class="mt-8 grid grid-cols-2 gap-6">
      <div class="rounded-xl border border-gray-200 p-5"><h3 class="font-bold text-gray-900">Mission</h3><p class="mt-2 text-sm">To make environmental compliance simple, transparent and achievable — protecting the environment while helping clients reduce risk and cost.</p></div>
      <div class="rounded-xl border border-gray-200 p-5"><h3 class="font-bold text-gray-900">Vision</h3><p class="mt-2 text-sm">To be one of Maharashtra's most trusted names in environmental consultancy and turnkey pollution control.</p></div>
    </div>
    <h3 class="mt-8 font-bold text-gray-900">Our values</h3>
    <ul class="mt-3 grid grid-cols-2 gap-4">${values.map(v => `<li class="flex gap-3"><span class="text-emerald-600">${icon(v.icon, 'w-5 h-5')}</span><span><strong class="text-gray-900">${esc(v.title)}.</strong> <span class="text-sm">${esc(v.text)}</span></span></li>`).join('')}</ul>
    <h3 class="mt-8 font-bold text-gray-900">One partner, every stage</h3>
    <p class="mt-2 text-sm">Site assessment → design &amp; engineering → regulatory approvals → fabrication &amp; installation → testing &amp; commissioning → O&amp;M, monitoring and renewals.</p>`)}

  ${sheet(`
    <h2 class="brochure-h">2. Our services</h2>
    <div class="grid grid-cols-2 gap-x-8 gap-y-6">
      ${groups.map(g => `<div>
        <h3 class="flex items-center gap-2 font-bold text-gray-900">${icon(g.icon, 'w-5 h-5 text-emerald-600')}${esc(g.name)}</h3>
        <ul class="mt-3 space-y-3">${services.filter(s => s.group === g.id).map(s => `<li><p class="font-semibold text-gray-900">${esc(s.name)}</p><p class="text-sm">${esc(s.card)}</p></li>`).join('')}</ul>
      </div>`).join('')}
    </div>`)}

  ${sheet(`
    <h2 class="brochure-h">3. Systems we deliver</h2>
    <div class="grid grid-cols-2 gap-5">
      ${products.slice(0, 6).map(p => `<div class="overflow-hidden rounded-xl border border-gray-200">${photo(p.image, { cls: 'aspect-[16/9] w-full object-cover', sizes: '400px' })}<div class="p-4"><h3 class="font-bold text-gray-900">${esc(p.name)}</h3><p class="mt-1 text-sm">${esc(p.text)}</p></div></div>`).join('')}
    </div>`)}

  ${sheet(`
    <h2 class="brochure-h">4. Clients &amp; contact</h2>
    <ul class="grid grid-cols-4 gap-3">${clients.map(c => `<li class="flex h-20 items-center justify-center rounded-lg border border-gray-200 p-2">${clientLogo(c, 'max-h-12 w-auto max-w-full object-contain')}</li>`).join('')}</ul>
    <h3 class="mt-8 font-bold text-gray-900">Areas we serve</h3>
    <p class="mt-2 text-sm">${site.areasServed.join(' · ')}</p>
    <div class="mt-8 rounded-2xl bg-emerald-700 p-8 text-white">
      <p class="text-2xl font-bold">Ready to ensure compliance?</p>
      <p class="mt-1 text-emerald-50">Contact us for a free site assessment.</p>
      <ul class="mt-5 space-y-2">
        <li class="flex items-center gap-3">${icon('phone', 'w-5 h-5')}<a href="${telLink()}">${site.phoneDisplay}</a></li>
        <li class="flex items-center gap-3">${icon('mail', 'w-5 h-5')}${site.email}</li>
        <li class="flex items-center gap-3">${icon('map-pin', 'w-5 h-5')}${esc(site.address.full)}</li>
        <li class="flex items-center gap-3">${icon('external-link', 'w-5 h-5')}${site.siteUrl.replace('https://', '')}</li>
      </ul>
    </div>`)}
</div>
`;
  return [{
    path: '/brochure',
    file: 'brochure.html',
    active: '',
    title: 'Company Brochure (PDF)',
    description: 'Download the Aaradhya Enviro company brochure: profile, environmental services, turnkey systems, clients and contact details.',
    schema: [crumbs.schema],
    body,
  }];
};
