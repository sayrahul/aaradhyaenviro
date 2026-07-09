const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.aaradhyaenviro.com';
const currentDate = new Date().toISOString().split('T')[0];

// Define all pages with their priorities and change frequencies
const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/index.html', priority: '1.0', changefreq: 'weekly' },
  { url: '/about.html', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact.html', priority: '0.9', changefreq: 'monthly' },
  { url: '/products.html', priority: '0.8', changefreq: 'weekly' },
  { url: '/gallery.html', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy-policy.html', priority: '0.3', changefreq: 'yearly' },
  { url: '/404.html', priority: '0.1', changefreq: 'yearly' }
];

// Service pages
const servicePages = [
  'legal-compliances',
  'environmental-clearances',
  'audit-reporting',
  'cgwa-biomedical-noc',
  'etp-stp-installation',
  'zld-ro-systems',
  'air-pollution-control',
  'plant-upgradation',
  'environmental-testing',
  'noise-monitoring',
  'online-monitoring-systems',
  'treatability-studies',
  'hazardous-waste-management',
  'plastic-epr-compliance',
  'operation-maintenance',
  'compliance-training',
  'nucleonic-material'
];

servicePages.forEach(page => {
  pages.push({
    url: `/services/${page}.html`,
    priority: '0.7',
    changefreq: 'monthly'
  });
});

// Generate XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

pages.forEach(page => {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>';

// Write sitemap.xml
fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), xml);
console.log('✅ Sitemap generated successfully: sitemap.xml');
console.log(`📄 Total URLs: ${pages.length}`);
