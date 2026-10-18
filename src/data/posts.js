// Blog posts: metadata in src/content/posts.json, article body in src/content/posts/<slug>.html.
// `image` picks a relevant photo, `service` links the article to the matching service page.
const fs = require('fs');
const path = require('path');
const list = require('../content/posts.json');

const extra = {
  'mpcb-show-cause-notice-closure-direction-what-to-do': { image: 'engineers-lab', service: 'legal-compliances' },
  'environmental-compliance-checklist-midc-chhatrapati-sambhajinagar': { image: 'engineer-factory', service: 'legal-compliances' },
  'etp-cost-in-india-price-factors': { image: 'etp-plant', service: 'etp-stp-installation' },
  'stp-for-housing-societies-maharashtra': { image: 'stp-packaged', service: 'etp-stp-installation' },
  'mpcb-red-orange-green-white-category-guide': { image: 'strategy', service: 'legal-compliances' },
  'comprehensive-guide-to-etp-and-stp-operations': { image: 'etp-site', service: 'etp-stp-installation' },
  'zero-liquid-discharge-the-future-of-industry': { image: 'zld-plant', service: 'zld-ro-systems' },
  'mastering-mpcb-consent-procedures': { image: 'engineer-factory', service: 'legal-compliances' },
  'air-pollution-control-scrubbers-vs-baghouse-filters': { image: 'apc-scrubber', service: 'air-pollution-control' },
  'a-guide-to-flawless-environmental-audits': { image: 'engineers-lab', service: 'audit-reporting' },
  'decoding-plastic-waste-management': { image: 'eco-city', service: 'plastic-epr-compliance' },
  'bio-medical-waste-segregation-protocols': { image: 'sapling', service: 'cgwa-biomedical-noc' },
  'groundwater-extraction-and-cgwa-compliance': { image: 'wtp', service: 'cgwa-biomedical-noc' },
  'industrial-noise-pollution-and-abatement': { image: 'engineer-factory', service: 'noise-monitoring' },
  'mastering-the-hazardous-waste-manifest': { image: 'strategy', service: 'hazardous-waste-management' },
  'the-science-of-treatability-studies': { image: 'engineers-lab', service: 'treatability-studies' },
  'online-continuous-emission-monitoring': { image: 'monitoring-room', service: 'online-monitoring-systems' },
  'industrial-rainwater-harvesting': { image: 'green-energy', service: 'cgwa-biomedical-noc' },
  'preventing-reverse-osmosis-membrane-failure': { image: 'ro-plant-hall', service: 'zld-ro-systems' },
  'environmental-impact-assessment-dynamics': { image: 'stp-aerial', service: 'environmental-clearances' },
  'retrofitting-and-upgrading-aging-etps': { image: 'etp-plant', service: 'plant-upgradation' },
  'the-strategic-value-of-form-v': { image: 'monitoring-tablet', service: 'audit-reporting' },
  'stack-emission-monitoring-the-isokinetic-rule': { image: 'apc-stack', service: 'environmental-testing' },
  'hazardous-waste-storage-design-and-safety-protocols': { image: 'stp-clarifiers', service: 'hazardous-waste-management' },
  'circular-economy-the-future-of-green-manufacturing': { image: 'green-bulb', service: 'zld-ro-systems' },
};

const posts = list.map(p => {
  const e = extra[p.slug];
  if (!e) throw new Error(`posts.js: no image/service mapping for ${p.slug}`);
  const body = fs.readFileSync(path.join(__dirname, '..', 'content', 'posts', `${p.slug}.html`), 'utf8');
  const iso = new Date(p.date + ' UTC').toISOString().slice(0, 10);
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return { ...p, ...e, body, iso, minutes: Math.max(2, Math.round(words / 200)) };
}).sort((a, b) => b.iso.localeCompare(a.iso)); // newest first

module.exports = posts;
