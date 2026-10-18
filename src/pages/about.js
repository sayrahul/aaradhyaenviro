const site = require('../config');
const { values, reasons } = require('../data/content');
const { esc, icon, photo } = require('../lib/html');
const { breadcrumbs, pageHero, sectionHead, ctaBand, statsRow, clientsSection } = require('../lib/components');
const schema = require('../lib/schema');

module.exports = () => {
  const crumbs = breadcrumbs([{ name: 'About us', path: '/about' }]);
  const team = [
    { role: 'Founder & Director', sub: 'Environmental consultant', text: `${site.yearsExperience} years of experience in MPCB compliance, ETP/STP design and environmental clearances across Maharashtra.`, tags: ['MPCB compliance', 'ETP design'] },
    { role: 'Senior Environmental Engineer', sub: 'Turnkey project lead', text: 'Design, fabrication and commissioning of ETP, STP, ZLD and RO systems for industrial clients.', tags: ['ZLD systems', 'STP installation'] },
    { role: 'Compliance Manager', sub: 'MPCB liaison', text: 'MPCB documentation, Environmental Statement and annual returns, audit reports and clearance applications.', tags: ['EC applications', 'Audits'] },
    { role: 'Environmental Analyst', sub: 'Testing & monitoring', text: 'Air, water and soil sampling, online monitoring systems and coordination of laboratory reports.', tags: ['Stack testing', 'OCEMS'] },
  ];
  const industries = ['Chemical & pharmaceutical', 'Sugar & food processing', 'Engineering & automotive', 'Construction & real estate', 'Hospitals & healthcare', 'Textile & agro-industries'];

  const body = `
${pageHero({ title: 'About Aaradhya Enviro', lead: 'An environmental consultancy and turnkey pollution control company from Waluj MIDC, Chhatrapati Sambhajinagar, helping industries balance production with environmental responsibility.', crumbs, image: 'engineers-lab' })}

<section class="section bg-white">
  <div class="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
    <div>
      ${sectionHead({ eyebrow: 'Who we are', title: 'Compliance consultants who also build the plants', center: false })}
      <div class="mt-6 space-y-4 text-lg leading-relaxed text-gray-600">
        <p>Environmental pollution is one of the most pressing challenges facing industry today, threatening the air we breathe, the water we drink and the food we grow. As regulations tighten, industries are expected to operate responsibly while remaining profitable.</p>
        <p>Aaradhya Enviro was founded in ${site.foundingYear} to solve exactly this problem. Backed by a team with ${site.yearsExperience} years of hands-on experience, we have grown from a local compliance consultancy into a full-spectrum environmental solutions provider, serving ${site.clientsCount} clients — from small manufacturing units to large industrial groups, sugar factories, construction companies and multinational corporations.</p>
        <p>What sets us apart is that we do not stop at paperwork. We design, install, operate and maintain the physical systems — ETPs, STPs, RO and ZLD plants, air pollution control equipment — that keep a facility compliant every single day. You get one accountable partner for your environmental obligations instead of several vendors.</p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      ${photo('engineer-factory', { cls: 'col-span-2 aspect-[16/9] w-full rounded-2xl object-cover', sizes: '(min-width:1024px) 50vw, 100vw' })}
      ${photo('etp-site', { cls: 'aspect-square w-full rounded-2xl object-cover', sizes: '(min-width:1024px) 25vw, 50vw' })}
      ${photo('ro-skid', { cls: 'aspect-square w-full rounded-2xl object-cover', sizes: '(min-width:1024px) 25vw, 50vw' })}
    </div>
  </div>
</section>

<section class="bg-white pb-16 lg:pb-24"><div class="container-x">${statsRow()}</div></section>

<section class="section bg-gray-50">
  <div class="container-x grid gap-6 md:grid-cols-2">
    <div class="card p-8">
      <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-white">${icon('route', 'w-6 h-6')}</span>
      <h2 class="mt-5 text-2xl font-bold text-gray-900">Our mission</h2>
      <p class="mt-3 leading-relaxed text-gray-600">To make environmental compliance simple, transparent and achievable — protecting the environment while helping clients reduce risk and cost.</p>
    </div>
    <div class="card p-8">
      <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-white">${icon('leaf', 'w-6 h-6')}</span>
      <h2 class="mt-5 text-2xl font-bold text-gray-900">Our vision</h2>
      <p class="mt-3 leading-relaxed text-gray-600">To be one of Maharashtra's most trusted names in environmental consultancy and turnkey pollution control, recognised for reliability and technical depth.</p>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container-x">
    ${sectionHead({ eyebrow: 'Our values', title: 'What guides our work' })}
    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${values.map(v => `<li class="card p-6">
        <span class="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">${icon(v.icon, 'w-5 h-5')}</span>
        <h3 class="mt-4 font-semibold text-gray-900">${esc(v.title)}</h3>
        <p class="mt-2 text-sm leading-relaxed text-gray-600">${esc(v.text)}</p>
      </li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="section bg-gray-900">
  <div class="container-x grid gap-12 lg:grid-cols-2">
    <div>
      <p class="eyebrow bg-white/10 text-emerald-300">Why choose us</p>
      <h2 class="h2 mt-3 text-white">Local knowledge, end-to-end delivery</h2>
      <p class="mt-4 text-lg text-gray-300">Deep knowledge of MPCB procedures combined with in-house engineering and project execution.</p>
      <ul class="mt-8 space-y-6">
        ${reasons.map(r => `<li class="flex gap-4">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">${icon(r.icon, 'w-5 h-5')}</span>
          <div><h3 class="font-semibold text-white">${esc(r.title)}</h3><p class="mt-1 text-sm leading-relaxed text-gray-300">${esc(r.text)}</p></div>
        </li>`).join('\n        ')}
      </ul>
    </div>
    <div>
      <h2 class="text-xl font-semibold text-white">Industries we serve</h2>
      <ul class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        ${industries.map(i => `<li class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-200">${icon('factory', 'w-5 h-5 text-emerald-400')}${esc(i)}</li>`).join('\n        ')}
      </ul>
      <h2 class="mt-10 text-xl font-semibold text-white">Areas we serve</h2>
      <p class="mt-3 leading-relaxed text-gray-300">Headquartered in Waluj MIDC, Chhatrapati Sambhajinagar, with projects across ${site.areasServed.slice(1).join(', ')}.</p>
    </div>
  </div>
</section>

<section class="section bg-white" aria-labelledby="team-title">
  <div class="container-x">
    ${sectionHead({ eyebrow: 'Our team', title: 'The people behind your compliance', lead: 'Environmental engineers, compliance specialists and project managers who give every client expert, personal attention.', id: 'team-title' })}
    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${team.map(t => `<li class="card p-6">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white">${icon('users', 'w-6 h-6')}</span>
        <h3 class="mt-4 font-semibold text-gray-900">${esc(t.role)}</h3>
        <p class="text-sm font-medium text-emerald-700">${esc(t.sub)}</p>
        <p class="mt-3 text-sm leading-relaxed text-gray-600">${esc(t.text)}</p>
        <p class="mt-4 flex flex-wrap gap-2">${t.tags.map(x => `<span class="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">${esc(x)}</span>`).join('')}</p>
      </li>`).join('\n      ')}
    </ul>
    <p class="mt-10 text-center text-gray-600">Interested in joining our team? <a href="/contact" class="font-semibold text-emerald-700 hover:text-emerald-800">Get in touch</a>.</p>
  </div>
</section>

<div id="clients">${clientsSection({ title: 'Clients who trust us', lead: 'Manufacturers, builders, sugar mills and institutions we have worked with.' })}</div>

${ctaBand({ title: 'Ready to ensure environmental compliance?', text: 'Book a free site assessment with our environmental consultants.' })}
`;

  return [{
    path: '/about',
    file: 'about.html',
    active: 'about',
    title: 'About Us – Environmental Consultancy, Waluj MIDC',
    description: `Aaradhya Enviro: environmental consultancy and turnkey pollution control in Chhatrapati Sambhajinagar since ${site.foundingYear}, trusted by ${site.clientsCount} clients in Maharashtra.`,
    schema: [schema.organization(), schema.webPage('AboutPage', { path: '/about', name: 'About Aaradhya Enviro', description: 'Company profile of Aaradhya Enviro.' }), crumbs.schema],
    body,
  }];
};
