const site = require('../config');
const { groups, services, bySlug } = require('../data/services');
const posts = require('../data/posts');
const { esc, icon, photo, waLink, telLink } = require('../lib/html');
const { breadcrumbs, pageHero, sectionHead, serviceCard, faqs, ctaBand } = require('../lib/components');
const schema = require('../lib/schema');

const indexFaqs = [
  { q: 'How do I know if my industry needs MPCB consent?', a: 'Industries are classified as Red, Orange, Green or White based on their pollution potential. Red, Orange and Green category units need Consent to Establish before setting up and Consent to Operate before starting production. White category units are generally exempt from consent but may need to inform MPCB. We offer a free category check for your unit.' },
  { q: 'What are the key requirements for ETP / STP compliance?', a: 'Treated water must meet the parameters in your consent (such as pH, BOD, COD, TSS and oil & grease), monitoring must be done at the required frequency, and logbooks of flow, power, chemicals and sludge must be maintained. Annual returns and the Environmental Statement must also be filed on time.' },
  { q: 'How do online monitoring systems (OCEMS) work?', a: 'Online continuous emission and effluent monitoring systems use analysers to measure stack emissions and treated effluent parameters in real time and transmit the data to the CPCB and MPCB servers. Proper installation, calibration and data connectivity are essential to avoid gaps and false alerts.' },
  { q: 'Do you offer a single contract for design, approvals and operation?', a: 'Yes. Many clients engage us for the complete cycle: approvals, design and installation of treatment systems, testing, annual reporting and operation & maintenance.' },
];

function indexPage() {
  const crumbs = breadcrumbs([{ name: 'Services', path: '/services' }]);
  const faq = faqs(indexFaqs, { lead: 'Quick answers about our environmental services and MPCB compliance.' });
  const body = `
${pageHero({ title: 'Environmental services', lead: `${services.length} specialised services across compliance, turnkey treatment projects, testing and plant management, delivered by one experienced team.`, crumbs, image: 'stp-aerial' })}

<nav aria-label="Service categories" class="sticky top-16 z-20 border-b border-gray-200 bg-white/95 backdrop-blur lg:top-20">
  <div class="container-x flex gap-2 overflow-x-auto py-3 text-sm">
    ${groups.map(g => `<a href="#${g.id}" class="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 px-4 py-2 font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-700">${icon(g.icon, 'w-4 h-4')}${esc(g.name)}</a>`).join('\n    ')}
  </div>
</nav>

${groups.map((g, i) => `<section id="${g.id}" class="section scroll-mt-32 ${i % 2 ? 'bg-gray-50' : 'bg-white'}" aria-labelledby="${g.id}-title">
  <div class="container-x">
    <div class="flex items-center gap-3">
      <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">${icon(g.icon, 'w-5 h-5')}</span>
      <h2 id="${g.id}-title" class="h2">${esc(g.name)}</h2>
    </div>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${services.filter(s => s.group === g.id).map(serviceCard).join('\n      ')}
    </div>
  </div>
</section>`).join('\n')}

${faq.html}

${ctaBand({ title: 'Need a custom environmental solution?', text: 'Our team will assess your requirements and recommend exactly what your unit needs — nothing more.' })}
`;
  return {
    path: '/services',
    file: 'services.html',
    active: 'services',
    title: 'Environmental Services: MPCB, ETP/STP, ZLD, Testing',
    description: 'All environmental services from Aaradhya Enviro: MPCB consent, Environmental Clearance, ETP/STP, ZLD, air pollution control, testing, hazardous waste and O&M.',
    schema: [
      schema.webPage('CollectionPage', { path: '/services', name: 'Environmental services', description: 'All services offered by Aaradhya Enviro.' }),
      { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: `${site.siteUrl}/services/${s.slug}` })) },
      crumbs.schema, faq.schema,
    ],
    body,
  };
}

function detailPage(s) {
  const group = groups.find(g => g.id === s.group);
  const crumbs = breadcrumbs([{ name: 'Services', path: '/services' }, { name: s.name, path: `/services/${s.slug}` }]);
  const faq = faqs(s.faqs, { title: `${s.name}: frequently asked questions`, id: 'service-faq' });
  const related = s.related.map(r => bySlug[r]);
  const articles = posts.filter(p => p.service === s.slug).slice(0, 2);
  const wa = waLink(`Hello Aaradhya Enviro, I would like to discuss ${s.name} for my unit.`);

  const body = `
${pageHero({ title: s.name, lead: s.lead, crumbs, image: s.image, eyebrow: group.name })}

<section class="section bg-white">
  <div class="container-x grid gap-12 lg:grid-cols-3">
    <div class="min-w-0 lg:col-span-2">
      <h2 class="h2">Overview</h2>
      <div class="mt-5 space-y-4 text-lg leading-relaxed text-gray-600">${s.overview.map(p => `<p>${esc(p)}</p>`).join('')}</div>

      <h2 class="h2 mt-14">Who needs this service</h2>
      <ul class="mt-6 grid gap-3 sm:grid-cols-2">
        ${s.whoNeeds.map(w => `<li class="flex gap-3 rounded-xl border border-gray-200 p-4 text-gray-700">${icon('check-circle', 'mt-0.5 w-5 h-5 shrink-0 text-emerald-600')}<span>${esc(w)}</span></li>`).join('\n        ')}
      </ul>

      <h2 class="h2 mt-14">What we cover</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        ${s.scope.map(x => `<div class="rounded-xl bg-gray-50 p-5">
          <h3 class="font-semibold text-gray-900">${esc(x.t)}</h3>
          <p class="mt-1 text-sm leading-relaxed text-gray-600">${esc(x.d)}</p>
        </div>`).join('\n        ')}
      </div>
    </div>

    <aside class="lg:col-span-1">
      <div class="sticky top-28 space-y-6">
        <div class="overflow-hidden rounded-2xl border border-gray-200">
          ${photo(s.image, { cls: 'aspect-[4/3] w-full object-cover', sizes: '(min-width:1024px) 33vw, 100vw' })}
          <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-900">Talk to an expert</h2>
            <p class="mt-1 text-sm text-gray-600">Free first consultation. Share your requirement and we will suggest the right approach.</p>
            <div class="mt-5 space-y-3">
              <a href="/contact?service=${encodeURIComponent(s.name)}" class="btn btn-primary w-full">Get a free quote</a>
              <a href="${telLink()}" class="btn btn-outline w-full">${icon('phone', 'w-4 h-4')}${site.phoneDisplay}</a>
              <a href="${wa}" target="_blank" rel="noopener" class="btn btn-wa w-full">${icon('whatsapp', 'w-4 h-4')}WhatsApp</a>
            </div>
          </div>
        </div>
        <div class="rounded-2xl bg-gray-50 p-6">
          <h2 class="font-semibold text-gray-900">More in ${esc(group.name)}</h2>
          <ul class="mt-3 space-y-1 text-sm">
            ${services.filter(x => x.group === s.group && x.slug !== s.slug).map(x => `<li><a href="/services/${x.slug}" class="flex items-center justify-between rounded-md px-2 py-1.5 text-gray-700 hover:bg-white hover:text-emerald-700">${esc(x.name)}${icon('chevron-right', 'w-4 h-4 text-gray-400')}</a></li>`).join('\n            ')}
          </ul>
        </div>
      </div>
    </aside>
  </div>
</section>

<section class="section bg-gray-900" aria-labelledby="process-title">
  <div class="container-x">
    <h2 id="process-title" class="h2 text-white">Our process</h2>
    <ol class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      ${s.process.map((p, i) => `<li class="rounded-2xl border border-white/10 bg-white/5 p-6">
        <span class="text-sm font-bold text-emerald-400">Step ${i + 1}</span>
        <h3 class="mt-2 text-lg font-semibold text-white">${esc(p.t)}</h3>
        <p class="mt-1 text-sm leading-relaxed text-gray-300">${esc(p.d)}</p>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="section bg-white">
  <div class="container-x grid gap-10 lg:grid-cols-2">
    <div class="card p-8">
      <h2 class="flex items-center gap-3 text-xl font-bold text-gray-900">${icon('file-text', 'w-6 h-6 text-emerald-600')}What you receive</h2>
      <ul class="mt-5 space-y-3">${s.deliverables.map(d => `<li class="flex gap-3 text-gray-700">${icon('check', 'mt-0.5 w-5 h-5 shrink-0 text-emerald-600')}${esc(d)}</li>`).join('')}</ul>
    </div>
    <div class="card p-8">
      <h2 class="flex items-center gap-3 text-xl font-bold text-gray-900">${icon('shield-check', 'w-6 h-6 text-emerald-600')}Applicable regulations</h2>
      <ul class="mt-5 space-y-3">${s.regulations.map(d => `<li class="flex gap-3 text-gray-700">${icon('check', 'mt-0.5 w-5 h-5 shrink-0 text-emerald-600')}${esc(d)}</li>`).join('')}</ul>
      <p class="mt-5 text-xs text-gray-500">Regulations are amended from time to time; we always work to the version currently in force and the conditions in your own consent.</p>
    </div>
  </div>
</section>

${faq.html.replace('section bg-white', 'section bg-gray-50')}

<section class="section bg-white" aria-labelledby="related-title">
  <div class="container-x">
    <h2 id="related-title" class="h2">Related services</h2>
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${related.map(serviceCard).join('\n      ')}
    </div>
    ${articles.length ? `<h2 class="mt-14 text-xl font-bold text-gray-900">Further reading</h2>
    <ul class="mt-4 grid gap-4 md:grid-cols-2">
      ${articles.map(p => `<li><a href="/blog/${p.slug}" class="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-5 hover:border-emerald-300"><span><span class="block text-xs font-semibold uppercase tracking-wider text-emerald-700">${esc(p.category)}</span><span class="mt-1 block font-semibold text-gray-900">${esc(p.title)}</span></span>${icon('arrow-right', 'w-5 h-5 shrink-0 text-emerald-600')}</a></li>`).join('\n      ')}
    </ul>` : ''}
  </div>
</section>

${ctaBand({ title: `Discuss ${s.name} with our team`, text: 'Share your requirement and get a clear scope, timeline and estimate.' })}
`;
  return {
    path: `/services/${s.slug}`,
    file: `services/${s.slug}.html`,
    active: 'services',
    title: s.title,
    description: s.description,
    schema: [schema.service(s), crumbs.schema, faq.schema],
    body,
  };
}

module.exports = () => [indexPage(), ...services.map(detailPage)];
