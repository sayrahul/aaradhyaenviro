const site = require('../config');
const { products } = require('../data/content');
const { esc, icon, photo, waLink } = require('../lib/html');
const { breadcrumbs, pageHero, ctaBand } = require('../lib/components');
const schema = require('../lib/schema');

module.exports = () => {
  const crumbs = breadcrumbs([{ name: 'Products', path: '/products' }]);
  const body = `
${pageHero({ title: 'Treatment systems & equipment', lead: 'Turnkey ETP, STP, ZLD, RO, water treatment, air pollution control and online monitoring systems, designed for your site and built to meet MPCB norms.', crumbs, image: 'ro-plant-hall' })}

<section class="section bg-white">
  <div class="container-x space-y-10">
    ${products.map((p, i) => `<article class="card grid overflow-hidden lg:grid-cols-5" id="${p.service}-${i}">
      <div class="aspect-[4/3] bg-gray-100 lg:col-span-2 lg:aspect-auto">${photo(p.image, { cls: 'h-full w-full object-cover', sizes: '(min-width:1024px) 40vw, 100vw' })}</div>
      <div class="p-6 sm:p-8 lg:col-span-3">
        <p class="text-xs font-semibold uppercase tracking-wider text-emerald-700">${esc(p.category)}</p>
        <h2 class="mt-2 text-2xl font-bold text-gray-900">${esc(p.name)}</h2>
        <p class="mt-3 leading-relaxed text-gray-600">${esc(p.text)}</p>
        <div class="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-900">Key features</h3>
            <ul class="mt-3 space-y-2 text-sm text-gray-700">${p.features.map(f => `<li class="flex gap-2">${icon('check', 'mt-0.5 w-4 h-4 shrink-0 text-emerald-600')}${esc(f)}</li>`).join('')}</ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-900">Typical applications</h3>
            <ul class="mt-3 flex flex-wrap gap-2">${p.uses.map(u => `<li class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">${esc(u)}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="${waLink(`Hello Aaradhya Enviro, I am interested in a ${p.name}. Please share details.`)}" target="_blank" rel="noopener" class="btn btn-wa">${icon('whatsapp', 'w-4 h-4')}Enquire on WhatsApp</a>
          <a href="/services/${p.service}" class="btn btn-outline">Service details ${icon('arrow-right', 'w-4 h-4')}</a>
        </div>
      </div>
    </article>`).join('\n    ')}
  </div>
</section>

${ctaBand({ title: 'Need a system sized for your site?', text: 'Send us your flow, effluent or emission details and we will recommend the right configuration.' })}
`;
  return [{
    path: '/products',
    file: 'products.html',
    active: 'products',
    title: 'ETP, STP, ZLD, RO & Air Pollution Control Systems',
    description: 'Turnkey ETP and STP plants, ZLD and RO systems, water treatment, air pollution control and online monitoring systems for Maharashtra industries.',
    schema: [
      schema.webPage('CollectionPage', { path: '/products', name: 'Treatment systems & equipment', description: 'Systems supplied by Aaradhya Enviro.' }),
      { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${site.siteUrl}/services/${p.service}` })) },
      crumbs.schema,
    ],
    body,
  }];
};
