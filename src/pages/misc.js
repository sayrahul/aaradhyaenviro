// Privacy, terms, HTML sitemap and 404.
const fs = require('fs');
const path = require('path');
const site = require('../config');
const { groups, services } = require('../data/services');
const posts = require('../data/posts');
const { esc, icon, telLink, waLink } = require('../lib/html');
const { breadcrumbs, pageHero } = require('../lib/components');

const content = f => fs.readFileSync(path.join(__dirname, '..', 'content', f), 'utf8').replace(/^<!--.*?-->\s*/, '');

const legalAddendum = `
<h2>Third-party services used on this website</h2>
<p>Enquiry and call-back forms on this website are delivered to our team through Google Workspace (Google Apps Script and Google Sheets). The contact page embeds a Google Map, which is loaded from Google's servers. If website analytics is enabled, it is provided by Google Analytics. These providers process data under their own privacy policies. We do not sell your personal information.</p>`;

// Insert extra sections just before the page's existing "Contact …" heading.
function withAddendum(html, extra) {
  if (!extra) return html;
  const i = html.search(/<h2>[^<]*Contact[^<]*<\/h2>/);
  return i === -1 ? html + extra : html.slice(0, i) + extra.trim() + '\n' + html.slice(i);
}

function legal({ slug, file, name, source, description, extra = '' }) {
  const crumbs = breadcrumbs([{ name, path: `/${slug}` }]);
  return {
    path: `/${slug}`,
    file,
    active: '',
    title: name,
    description,
    schema: [crumbs.schema],
    body: `
${pageHero({ title: name, lead: 'Last updated: 18 October 2026', crumbs, actions: false })}
<section class="bg-white py-12 lg:py-16">
  <div class="container-x">
    <div class="prose-article mx-auto max-w-3xl">
${withAddendum(content(source), extra)}
    </div>
  </div>
</section>`,
  };
}

function sitemapPage() {
  const crumbs = breadcrumbs([{ name: 'Sitemap', path: '/sitemap' }]);
  const col = (title, links) => `<div>
      <h2 class="text-lg font-bold text-gray-900">${esc(title)}</h2>
      <ul class="mt-4 space-y-2">${links.map(([href, label]) => `<li><a href="${href}" class="text-gray-600 hover:text-emerald-700">${esc(label)}</a></li>`).join('')}</ul>
    </div>`;
  return {
    path: '/sitemap',
    file: 'sitemap.html',
    active: '',
    title: 'Sitemap',
    description: 'All pages on the Aaradhya Enviro website: services, products, blog articles, company information and contact.',
    schema: [crumbs.schema],
    body: `
${pageHero({ title: 'Sitemap', lead: 'Every page on our website in one place.', crumbs, actions: false })}
<section class="section bg-white">
  <div class="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
    ${col('Company', [['/', 'Home'], ['/about', 'About us'], ['/products', 'Products'], ['/gallery', 'Gallery'], ['/brochure', 'Company brochure'], ['/contact', 'Contact'], ['/privacy-policy', 'Privacy policy'], ['/terms-and-conditions', 'Terms & conditions']])}
    ${groups.map(g => col(g.name, services.filter(s => s.group === g.id).map(s => [`/services/${s.slug}`, s.name]))).join('\n    ')}
  </div>
  <div class="container-x mt-14">
    ${col('Blog articles', [['/blog', 'All articles'], ...posts.map(p => [`/blog/${p.slug}`, p.title])])}
  </div>
</section>`,
  };
}

function notFound() {
  return {
    path: '/404',
    file: '404.html',
    active: '',
    title: 'Page not found',
    description: 'The page you are looking for is not available.',
    noindex: true,
    schema: [],
    body: `
<section class="bg-white">
  <div class="container-x py-20 text-center lg:py-28">
    <p class="text-6xl font-bold text-emerald-600">404</p>
    <h1 class="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">This page could not be found</h1>
    <p class="mx-auto mt-4 max-w-xl text-lg text-gray-600">The link may be old or mistyped. Try one of these pages, or contact us and we will help you directly.</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <a href="/" class="btn btn-primary">Go to home page</a>
      <a href="/services" class="btn btn-outline">Browse services</a>
      <a href="${waLink()}" target="_blank" rel="noopener" class="btn btn-wa">${icon('whatsapp', 'w-4 h-4')}WhatsApp us</a>
    </div>
    <ul class="mx-auto mt-14 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
      ${services.slice(0, 8).map(s => `<li><a href="/services/${s.slug}" class="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-gray-700 hover:border-emerald-300 hover:text-emerald-700">${esc(s.name)}${icon('chevron-right', 'w-4 h-4')}</a></li>`).join('\n      ')}
    </ul>
  </div>
</section>`,
  };
}

module.exports = () => [
  legal({ slug: 'privacy-policy', file: 'privacy-policy.html', name: 'Privacy policy', source: 'privacy.html', description: 'How Aaradhya Enviro collects, uses and protects information shared through this website, forms, phone, email and WhatsApp.', extra: legalAddendum }),
  legal({ slug: 'terms-and-conditions', file: 'terms-and-conditions.html', name: 'Terms and conditions', source: 'terms.html', description: 'Terms and conditions for using the Aaradhya Enviro website and environmental consultancy services.' }),
  sitemapPage(),
  notFound(),
];
