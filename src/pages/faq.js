// /faq – environmental compliance FAQ hub (AEO/GEO). Questions here are written to be different
// from the per-service FAQs so each question appears in FAQPage markup only once on the site.
const site = require('../config');
const { services } = require('../data/services');
const { esc, icon, telLink, waLink } = require('../lib/html');
const { breadcrumbs, pageHero, ctaBand, quickAnswer } = require('../lib/components');

const reviewed = new Date(site.contentReviewed + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const groups = [
  {
    id: 'about', title: 'About Aaradhya Enviro', icon: 'building',
    items: [
      { q: 'What is Aaradhya Enviro?', a: `Aaradhya Enviro is an environmental consultancy and turnkey pollution control company based in Waluj MIDC, Chhatrapati Sambhajinagar, Maharashtra. Founded in ${site.foundingYear}, it offers ${services.length} services — MPCB consents, Environmental Clearance, ETP/STP and ZLD plants, air pollution control, environmental testing, hazardous waste and EPR compliance, and plant operation — and has served ${site.clientsCount} clients.`, link: ['/about', 'About us'] },
      { q: 'Where is Aaradhya Enviro located?', a: `The office is at ${site.address.full}. Site visits, sampling and installations are carried out at client locations.`, link: ['/contact', 'Contact & map'] },
      { q: 'Which cities and districts does Aaradhya Enviro cover?', a: `Chhatrapati Sambhajinagar and its MIDC areas (Waluj, Shendra, Chikalthana), Jalna, Beed, Latur, Dharashiv, Nanded, Ahilyanagar, Nashik, Pune, Mumbai, Nagpur and the rest of Maharashtra. Projects outside Maharashtra are taken up on request.` },
      { q: 'What kinds of clients does Aaradhya Enviro work with?', a: 'Manufacturing units, chemical and pharmaceutical plants, sugar and food processing units, engineering and automotive suppliers, builders and housing societies, hospitals and institutions — from small units to large industrial groups.' },
      { q: 'How can I get a quote from Aaradhya Enviro?', a: `Call or WhatsApp ${site.phoneDisplay}, email ${site.email} or use the contact form. Share your industry, location, capacity, existing approvals and what you need. The first consultation is free, and a written scope and estimate follow after a site visit or document review.`, link: ['/contact', 'Get a free quote'] },
    ],
  },
  {
    id: 'consent', title: 'MPCB consent', icon: 'shield-check',
    items: [
      { q: 'Who needs consent from the Maharashtra Pollution Control Board?', a: 'Any industry, operation or project in Maharashtra that discharges wastewater, releases air emissions or generates hazardous waste, unless it falls in the White category. This includes factories, many commercial establishments, hospitals, hotels and large building projects.', link: ['/blog/mpcb-red-orange-green-white-category-guide', 'MPCB category guide'] },
      { q: 'Which documents are usually needed for a Consent to Establish application?', a: 'Typically: proof of land or premises, site and layout plans, a description of the manufacturing process, raw materials and products with quantities, water balance, details of effluent, emissions and waste, the proposed treatment and control systems, and proof of capital investment. Exact requirements depend on category and activity.', link: ['/services/legal-compliances', 'MPCB consent service'] },
      { q: 'How is the MPCB consent fee calculated?', a: 'The consent fee depends mainly on the category of the industry and its capital investment. The applicable fee is calculated when the application is prepared.' },
      { q: 'What happens if a unit operates without valid MPCB consent?', a: 'The board can issue directions including closure and disconnection of electricity and water supply, and the Water and Air Acts also provide for penalties and prosecution. Units should apply well before starting operations and renew before expiry.', link: ['/blog/mpcb-show-cause-notice-closure-direction-what-to-do', 'What to do if you receive a notice'] },
      { q: 'Do I need to amend my consent when I expand or add a product?', a: 'Yes. Any increase in capacity, new product, process change or additional pollution source should be covered by a consent amendment before the change is implemented. Operating outside the consented scope is a violation.' },
    ],
  },
  {
    id: 'water', title: 'Wastewater, ETP & STP', icon: 'droplet',
    items: [
      { q: 'What does KLD mean for ETP and STP capacity?', a: 'KLD stands for kilolitres per day. One KLD equals 1,000 litres of wastewater per day, so a 50 KLD plant is designed to treat about 50,000 litres per day.' },
      { q: 'What are BOD and COD?', a: 'BOD (Biochemical Oxygen Demand) measures the oxygen bacteria need to break down organic matter; COD (Chemical Oxygen Demand) measures the oxygen needed to chemically oxidise all oxidisable matter. Both indicate how polluted wastewater is, and both are common consent parameters.' },
      { q: 'What is a CETP?', a: 'A Common Effluent Treatment Plant treats wastewater from many units in an industrial cluster. Member units usually still need primary treatment to meet the CETP\'s inlet norms, and the arrangement must be reflected in their consent.' },
      { q: 'How much ETP or STP treated water can be reused?', a: 'With suitable tertiary treatment such as filtration and disinfection, most treated water can be reused for gardening, flushing, cooling towers or process use. RO and ZLD systems allow even higher recovery.', link: ['/blog/etp-cost-in-india-price-factors', 'ETP cost guide'] },
    ],
  },
  {
    id: 'air', title: 'Air, noise & monitoring', icon: 'wind',
    items: [
      { q: 'How often is stack emission monitoring required?', a: 'The frequency is set in each unit\'s consent order and depends on the category and process. Monitoring is carried out through accredited laboratories, and the results are kept for returns and inspections.', link: ['/services/environmental-testing', 'Testing service'] },
      { q: 'What are the National Ambient Air Quality Standards?', a: 'The National Ambient Air Quality Standards (NAAQS), notified in 2009, set limits for pollutants such as PM10, PM2.5, sulphur dioxide and nitrogen dioxide in outdoor air. Ambient air monitoring around industrial sites is compared against these standards.' },
      { q: 'What is OCEMS and who needs it?', a: 'OCEMS (online continuous emission and effluent monitoring systems) measure stack and effluent parameters in real time and send the data to CPCB and MPCB servers. Highly polluting industries and units directed through their consent must install it.', link: ['/services/online-monitoring-systems', 'Online monitoring service'] },
    ],
  },
  {
    id: 'waste', title: 'Waste, EPR & special approvals', icon: 'recycle',
    items: [
      { q: 'What is a TSDF?', a: 'A TSDF (Treatment, Storage and Disposal Facility) is an authorised common facility that receives hazardous waste from industries for treatment, secure landfilling or incineration. Waste must reach it with a proper manifest.', link: ['/services/hazardous-waste-management', 'Hazardous waste service'] },
      { q: 'What does EPR mean?', a: 'EPR (Extended Producer Responsibility) makes producers, importers and brand owners responsible for collecting and recycling the waste from products and packaging they put on the market. In India it applies to plastic packaging, e-waste, batteries and other streams under separate rules.', link: ['/services/plastic-epr-compliance', 'Plastic EPR service'] },
      { q: 'What should a factory do with old electronic equipment and e-waste?', a: 'Under the E-Waste (Management) Rules, 2022, e-waste should be handed over only to registered recyclers or refurbishers and records kept. It must not be sold to informal scrap dealers.' },
    ],
  },
  {
    id: 'deadlines', title: 'Reports & deadlines', icon: 'calendar',
    items: [
      { q: 'What are the key annual environmental compliance deadlines in Maharashtra?', a: 'Commonly: hazardous waste annual return by 30 June, bio-medical waste annual report by 30 June, plastic EPR annual return by 30 June, Environmental Statement (Form V) by 30 September, EC six-monthly compliance reports on 1 June and 1 December, and consent or NOC renewal before expiry.', link: ['/blog/the-strategic-value-of-form-v', 'Form V guide'] },
      { q: 'What is the Environmental Statement (Form V)?', a: 'It is an annual statement filed by consent-holding units, covering water and raw material consumption, pollution generated, hazardous and solid waste and the pollution control measures taken during the previous financial year. It is due by 30 September.', link: ['/services/audit-reporting', 'Audit & reporting service'] },
      { q: 'Which records should a unit keep ready for an MPCB inspection?', a: 'Valid consent and authorisations, treatment plant logbooks, monitoring and laboratory reports, hazardous waste records and manifests, filed returns and Environmental Statements, and correspondence with the board.' },
    ],
  },
  {
    id: 'clearance', title: 'Environmental Clearance', icon: 'file-text',
    items: [
      { q: 'What is the difference between Environmental Clearance and MPCB consent?', a: 'Environmental Clearance is a prior approval under the EIA Notification, 2006 for listed projects, granted by MoEFCC or SEIAA after an impact assessment. MPCB consent is the permission to establish and operate under the Water and Air Acts. Many projects need both.', link: ['/services/environmental-clearances', 'Environmental Clearance service'] },
      { q: 'What is SEIAA?', a: 'SEIAA is the State Environment Impact Assessment Authority. In Maharashtra it grants Environmental Clearance for Category B projects, based on appraisal by the State Expert Appraisal Committee (SEAC).' },
    ],
  },
];

module.exports = () => {
  const crumbs = breadcrumbs([{ name: 'FAQ', path: '/faq' }]);
  const all = groups.flatMap(g => g.items);
  const body = `
${pageHero({ title: 'Environmental compliance FAQ', lead: `Straight answers to ${all.length} common questions about MPCB consent, ETP/STP, air and noise monitoring, hazardous waste, EPR, annual deadlines and Environmental Clearance in Maharashtra.`, crumbs, actions: false })}

<nav aria-label="FAQ topics" class="sticky top-16 z-20 border-b border-gray-200 bg-white/95 backdrop-blur lg:top-20">
  <div class="container-x flex gap-2 overflow-x-auto py-3 text-sm">
    ${groups.map(g => `<a href="#${g.id}" class="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 px-4 py-2 font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-700">${icon(g.icon, 'w-4 h-4')}${esc(g.title)}</a>`).join('\n    ')}
  </div>
</nav>

<section class="section bg-white">
  <div class="container-x max-w-4xl">
    ${quickAnswer(`Most industries in Maharashtra need MPCB consent (CTE before construction, CTO before production) unless they are in the White category, must treat effluent and emissions to their consent limits, and must file annual returns — hazardous waste by 30 June and the Environmental Statement (Form V) by 30 September.`, { meta: `Reviewed by the ${site.name} compliance team · ${reviewed}` })}
    ${groups.map(g => `<div id="${g.id}" class="mt-14 scroll-mt-36">
      <h2 class="flex items-center gap-3 text-2xl font-bold text-gray-900"><span class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 text-white">${icon(g.icon, 'w-5 h-5')}</span>${esc(g.title)}</h2>
      <div class="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200">
        ${g.items.map(it => `<details class="group">
          <summary class="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left font-semibold text-gray-900 hover:text-emerald-700"><h3 class="text-base font-semibold">${esc(it.q)}</h3>${icon('chevron-down', 'mt-0.5 w-5 h-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180')}</summary>
          <div class="px-5 pb-5 leading-relaxed text-gray-600"><p>${esc(it.a)}</p>${it.link ? `<p class="mt-3"><a href="${it.link[0]}" class="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800">${esc(it.link[1])} ${icon('arrow-right', 'w-4 h-4')}</a></p>` : ''}</div>
        </details>`).join('\n        ')}
      </div>
    </div>`).join('\n    ')}
    <div class="mt-14 rounded-2xl bg-gray-900 p-6 text-gray-300 sm:p-8">
      <h2 class="text-xl font-bold text-white">Question not answered here?</h2>
      <p class="mt-2">Ask our engineers directly — we usually reply the same day.</p>
      <div class="mt-5 flex flex-wrap gap-3">
        <a href="${waLink('Hello Aaradhya Enviro, I have a compliance question:')}" target="_blank" rel="noopener" class="btn btn-wa">${icon('whatsapp', 'w-4 h-4')}Ask on WhatsApp</a>
        <a href="${telLink()}" class="btn btn-outline-light">${icon('phone', 'w-4 h-4')}${site.phoneDisplay}</a>
      </div>
    </div>
  </div>
</section>

${ctaBand()}
`;
  return [{
    path: '/faq',
    file: 'faq.html',
    active: '',
    title: 'Environmental Compliance FAQ – MPCB, ETP, EPR & Deadlines',
    description: `Answers to ${all.length} common questions on MPCB consent, ETP/STP, monitoring, hazardous waste, EPR, annual deadlines and Environmental Clearance in Maharashtra.`,
    schema: [
      crumbs.schema,
      { '@context': 'https://schema.org', '@type': 'FAQPage', url: `${site.siteUrl}/faq`, dateModified: site.contentReviewed, mainEntity: all.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
    body,
  }];
};
