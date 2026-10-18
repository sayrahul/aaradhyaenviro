const site = require('../config');
const { services, bySlug } = require('../data/services');
const { homeFaqs, reasons, products } = require('../data/content');
const posts = require('../data/posts');
const { esc, icon, photo, photoUrl, waLink } = require('../lib/html');
const { sectionHead, serviceCard, faqs, ctaBand, statsRow, clientsSection, testimonialsSection } = require('../lib/components');
const schema = require('../lib/schema');

module.exports = () => {
  const featured = ['legal-compliances', 'environmental-clearances', 'etp-stp-installation', 'zld-ro-systems', 'air-pollution-control', 'environmental-testing', 'hazardous-waste-management', 'operation-maintenance'].map(s => bySlug[s]);
  const faq = faqs(homeFaqs, { title: 'Common questions about environmental compliance', lead: 'Quick answers on MPCB consents, treatment plants and clearances in Maharashtra.' });
  const steps = [
    { t: 'Site visit & assessment', d: 'We study your process, effluent, emissions and existing approvals.' },
    { t: 'Design & engineering', d: 'Treatment and control systems sized for your actual load.' },
    { t: 'Approvals', d: 'MPCB consents, EC and other permissions filed and followed up.' },
    { t: 'Installation', d: 'Fabrication and erection with minimum disruption to production.' },
    { t: 'Testing & commissioning', d: 'Performance proved against your consent limits.' },
    { t: 'O&M and renewals', d: 'Day-to-day operation, monitoring, returns and renewals.' },
  ];
  const latest = posts.slice(0, 3);
  const showcase = products.slice(0, 4);

  const body = `
<section class="relative isolate overflow-hidden bg-gray-950">
  <div class="absolute inset-0 -z-10">${photo('stp-aerial', { cls: 'h-full w-full object-cover opacity-45', eager: true, sizes: '100vw' })}</div>
  <div class="absolute inset-0 -z-10 bg-gradient-to-r from-gray-950 via-gray-950/85 to-gray-950/30"></div>
  <div class="container-x py-20 sm:py-24 lg:py-32">
    <div class="max-w-3xl">
      <p class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">${icon('map-pin', 'w-4 h-4')}Waluj MIDC, Chhatrapati Sambhajinagar</p>
      <h1 class="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Environmental compliance &amp; pollution control, <span class="text-emerald-400">handled end-to-end</span></h1>
      <p class="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">MPCB consents, Environmental Clearance, ETP/STP, ZLD, air pollution control, testing and O&amp;M — one accountable team trusted by ${site.clientsCount} clients across Maharashtra since ${site.foundingYear}.</p>
      <div class="mt-9 flex flex-col gap-3 sm:flex-row">
        <a href="/contact" class="btn btn-primary btn-lg">Get a free site assessment ${icon('arrow-right', 'w-5 h-5')}</a>
        <a href="${waLink('Hello Aaradhya Enviro, I need help with environmental compliance for my unit.')}" target="_blank" rel="noopener" class="btn btn-outline-light btn-lg">${icon('whatsapp', 'w-5 h-5')}Chat on WhatsApp</a>
      </div>
      <ul class="mt-10 grid max-w-xl grid-cols-1 gap-3 text-sm text-gray-200 sm:grid-cols-2">
        ${['MPCB CTE / CTO & renewals', 'Turnkey ETP, STP & ZLD plants', 'Stack, air & water testing', 'Form V, annual returns & audits'].map(t => `<li class="flex items-center gap-2">${icon('check-circle', 'w-5 h-5 text-emerald-400')}${t}</li>`).join('\n        ')}
      </ul>
    </div>
  </div>
</section>

<section class="relative z-10 -mt-px bg-white pt-12">
  <div class="container-x">${statsRow()}</div>
</section>

<section class="section bg-white" aria-labelledby="services-title">
  <div class="container-x">
    ${sectionHead({ eyebrow: 'What we do', title: 'Environmental services for every stage of your plant', lead: 'From the first consent application to daily plant operation, we cover approvals, engineering, monitoring and reporting.', id: 'services-title' })}
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${featured.map(serviceCard).join('\n      ')}
    </div>
    <p class="mt-10 text-center"><a href="/services" class="btn btn-outline">View all ${services.length} services ${icon('arrow-right', 'w-4 h-4')}</a></p>
  </div>
</section>

<section class="section bg-gray-50" aria-labelledby="turnkey-title">
  <div class="container-x">
    <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      ${sectionHead({ eyebrow: 'Turnkey projects', title: 'Treatment systems designed, built and commissioned', lead: 'Every plant is designed from your actual wastewater or emission data and handed over with trained operators.', center: false, id: 'turnkey-title' })}
      <a href="/products" class="inline-flex shrink-0 items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800">See all systems ${icon('arrow-right', 'w-4 h-4')}</a>
    </div>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${showcase.map(p => `<a href="/services/${p.service}" class="card group overflow-hidden">
        <div class="aspect-[4/3] overflow-hidden bg-gray-100">${photo(p.image, { cls: 'h-full w-full object-cover transition duration-500 group-hover:scale-105', sizes: '(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw' })}</div>
        <div class="p-5">
          <p class="text-xs font-semibold uppercase tracking-wider text-emerald-700">${esc(p.category)}</p>
          <h3 class="mt-1 font-semibold text-gray-900 group-hover:text-emerald-700">${esc(p.name)}</h3>
        </div>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section bg-white" aria-labelledby="why-title">
  <div class="container-x grid items-center gap-12 lg:grid-cols-2">
    <div class="relative">
      ${photo('engineers-lab', { cls: 'aspect-[4/3] w-full rounded-2xl object-cover shadow-xl', sizes: '(min-width:1024px) 50vw, 100vw' })}
      <div class="absolute -bottom-6 left-6 right-6 rounded-xl bg-white p-5 shadow-lg sm:left-auto sm:right-6 sm:w-72">
        <p class="text-3xl font-bold text-emerald-700">${site.clientsCount} clients</p>
        <p class="text-sm text-gray-600">served since ${site.foundingYear}, backed by ${site.yearsExperience} years of team experience</p>
      </div>
    </div>
    <div>
      ${sectionHead({ eyebrow: 'Why Aaradhya Enviro', title: 'One accountable partner instead of five vendors', lead: 'Consultants who only file papers, contractors who only build, labs that only test — the gaps between them are where compliance fails. We cover all of it.', center: false, id: 'why-title' })}
      <ul class="mt-8 grid gap-6 sm:grid-cols-2">
        ${reasons.map(r => `<li>
          <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">${icon(r.icon, 'w-5 h-5')}</span>
          <h3 class="mt-3 font-semibold text-gray-900">${esc(r.title)}</h3>
          <p class="mt-1 text-sm leading-relaxed text-gray-600">${esc(r.text)}</p>
        </li>`).join('\n        ')}
      </ul>
    </div>
  </div>
</section>

<section class="section bg-gray-900" aria-labelledby="process-title">
  <div class="container-x">
    <div class="mx-auto max-w-3xl text-center">
      <p class="eyebrow bg-white/10 text-emerald-300">How we work</p>
      <h2 id="process-title" class="h2 mt-3 text-white">From site visit to steady compliance</h2>
    </div>
    <ol class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      ${steps.map((s, i) => `<li class="rounded-2xl border border-white/10 bg-white/5 p-6">
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 font-bold text-white">${i + 1}</span>
        <h3 class="mt-4 text-lg font-semibold text-white">${esc(s.t)}</h3>
        <p class="mt-1 text-sm leading-relaxed text-gray-300">${esc(s.d)}</p>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>

${clientsSection({ limit: 12 })}

${testimonialsSection()}

<section class="section bg-white" aria-labelledby="areas-title">
  <div class="container-x grid gap-10 lg:grid-cols-5 lg:items-center">
    <div class="lg:col-span-2">
      ${sectionHead({ eyebrow: 'Service area', title: 'Based in Waluj MIDC, working across Maharashtra', lead: 'Our team visits client sites for assessments, installations, sampling and audits throughout Marathwada and the rest of the state.', center: false, id: 'areas-title' })}
    </div>
    <ul class="flex flex-wrap gap-2 lg:col-span-3">
      ${site.areasServed.map(a => `<li class="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700">${icon('map-pin', 'w-4 h-4 text-emerald-600')}${esc(a)}</li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="section bg-gray-50" aria-labelledby="blog-title">
  <div class="container-x">
    <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      ${sectionHead({ eyebrow: 'Knowledge centre', title: 'Guides from our engineers', lead: 'Practical articles on treatment plants, MPCB procedures and environmental reporting.', center: false, id: 'blog-title' })}
      <a href="/blog" class="inline-flex shrink-0 items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800">All ${posts.length} articles ${icon('arrow-right', 'w-4 h-4')}</a>
    </div>
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      ${latest.map(p => `<a href="/blog/${p.slug}" class="card group overflow-hidden">
        <div class="aspect-[16/9] overflow-hidden bg-gray-100">${photo(p.image, { cls: 'h-full w-full object-cover transition duration-500 group-hover:scale-105', sizes: '(min-width:768px) 33vw, 100vw', alt: '' })}</div>
        <div class="p-5">
          <p class="text-xs font-semibold uppercase tracking-wider text-emerald-700">${esc(p.category)}</p>
          <h3 class="mt-2 font-semibold leading-snug text-gray-900 group-hover:text-emerald-700">${esc(p.title)}</h3>
          <p class="mt-2 text-sm text-gray-600">${esc(p.excerpt)}</p>
        </div>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

${faq.html}

${ctaBand()}
`;

  return [{
    path: '/',
    file: 'index.html',
    active: 'home',
    title: `MPCB & Environmental Consultant, Sambhajinagar | ${site.name}`,
    description: 'MPCB consent, Environmental Clearance, ETP/STP, ZLD and air pollution control from Waluj MIDC, Chhatrapati Sambhajinagar. 500+ clients. Call +91 99759 29212.',
    preload: `<link rel="preload" as="image" href="${photoUrl('stp-aerial', 1024)}" imagesrcset="/assets/img/stp-aerial-640.webp 640w, /assets/img/stp-aerial-1024.webp 1024w, /assets/img/stp-aerial-1600.webp 1600w" imagesizes="100vw" fetchpriority="high">\n`,
    schema: [schema.organization(), schema.website(), faq.schema],
    body,
  }];
};
