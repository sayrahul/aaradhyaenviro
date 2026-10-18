// Page shell: <head>, header, footer, mobile menu, call-back dialog and scripts.
const site = require('../config');
const { groups, services } = require('../data/services');
const { versions, esc, abs, icon, logoImg, waLink, telLink, jsonLd } = require('./html');

const NAV = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'services', label: 'Services', href: '/services', mega: true },
  { key: 'products', label: 'Products', href: '/products' },
  { key: 'gallery', label: 'Gallery', href: '/gallery' },
  { key: 'blog', label: 'Blog', href: '/blog' },
];

const servicesIn = id => services.filter(s => s.group === id);

// ───────────────────────────── <head> ─────────────────────────────
function head({ title, description, path, image, type = 'website', noindex = false, schema = [], preload = '' }) {
  const url = abs(path);
  const ogImage = abs(image || '/assets/img/og-image.jpg');
  const branded = `${title} | ${site.name}`;
  const fullTitle = title.includes(site.name) || branded.length > 65 ? title : branded;
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#047857">
<link rel="preload" href="/assets/fonts/e4af272ccee01ff0-s.p.woff2" as="font" type="font/woff2" crossorigin>
${preload}<link rel="stylesheet" href="/assets/css/main.css?v=${versions.css}">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
${image ? '' : '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'}<meta property="og:image:alt" content="${esc(site.name)} – ${esc(site.tagline)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<meta name="geo.region" content="IN-MH">
<meta name="geo.placename" content="${esc(site.address.city)}">
<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}">
${site.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">\n` : ''}${schema.map(jsonLd).join('\n')}
<script src="/assets/js/site.js?v=${versions.js}" defer></script>
</head>`;
}

// ───────────────────────────── Header ─────────────────────────────
function topbar() {
  return `<div class="hidden lg:block bg-gray-900 text-gray-300 text-sm">
  <div class="container-x flex h-10 items-center justify-between gap-6">
    <div class="flex items-center gap-6">
      <a href="${telLink()}" class="inline-flex items-center gap-2 hover:text-white">${icon('phone', 'w-4 h-4 text-emerald-400')}${site.phoneDisplay}</a>
      <a href="mailto:${site.email}" class="inline-flex items-center gap-2 hover:text-white">${icon('mail', 'w-4 h-4 text-emerald-400')}${site.email}</a>
      <span class="hidden xl:inline-flex items-center gap-2">${icon('map-pin', 'w-4 h-4 text-emerald-400')}Waluj MIDC, Chhatrapati Sambhajinagar</span>
    </div>
    <div class="flex items-center gap-4">
      <span class="inline-flex items-center gap-2">${icon('clock', 'w-4 h-4 text-emerald-400')}${site.hours}</span>
      ${socialLinks('w-4 h-4', 'hover:text-white')}
    </div>
  </div>
</div>`;
}

function socialLinks(iconCls, linkCls) {
  return Object.entries(site.social).map(([k, href]) =>
    `<a href="${href}" target="_blank" rel="noopener" aria-label="${esc(site.name)} on ${k[0].toUpperCase() + k.slice(1)}" class="${linkCls}">${icon(k, iconCls)}</a>`).join('');
}

function megaMenu() {
  const cols = groups.map(g => `<div>
        <p class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">${icon(g.icon, 'w-4 h-4 text-emerald-600')}${g.name}</p>
        <ul class="space-y-1">${servicesIn(g.id).map(s => `
          <li><a href="/services/${s.slug}" class="block rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700">${esc(s.name)}</a></li>`).join('')}
        </ul>
      </div>`).join('\n      ');
  return `<div id="mega-menu" class="mega-panel" data-mega-panel>
    <div class="grid grid-cols-4 gap-6 p-6">
      ${cols}
    </div>
    <div class="flex items-center justify-between rounded-b-2xl border-t border-gray-100 bg-gray-50 px-6 py-4">
      <a href="/services" class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">View all ${services.length} services ${icon('arrow-right', 'w-4 h-4')}</a>
      <a href="/contact" class="text-sm text-gray-600 hover:text-emerald-700">Not sure what you need? <span class="font-semibold text-emerald-700">Ask our experts</span></a>
    </div>
  </div>`;
}

function header(active) {
  const links = NAV.map(n => {
    const cur = n.key === active ? ' aria-current="page"' : '';
    if (!n.mega) return `<li><a href="${n.href}" class="nav-link"${cur}>${n.label}</a></li>`;
    return `<li class="relative" data-mega>
        <div class="flex items-center">
          <a href="${n.href}" class="nav-link pr-1"${cur}>${n.label}</a>
          <button type="button" class="nav-link px-1" aria-expanded="false" aria-controls="mega-menu" aria-label="Show all services" data-mega-toggle>${icon('chevron-down', 'w-4 h-4 transition-transform')}</button>
        </div>
        ${megaMenu()}
      </li>`;
  }).join('\n      ');

  return `<a href="#main" class="skip-link">Skip to main content</a>
${topbar()}
<header class="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
  <div class="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
    <a href="/" class="shrink-0" aria-label="${esc(site.name)} – home">${logoImg('h-8 w-auto sm:h-10', { eager: true })}</a>
    <nav aria-label="Main" class="hidden lg:block">
      <ul class="flex items-center gap-1">
      ${links}
      </ul>
    </nav>
    <div class="flex items-center gap-2">
      <a href="/contact" class="btn btn-primary hidden sm:inline-flex">Get a free quote</a>
      <button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 lg:hidden" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-open>${icon('menu', 'w-6 h-6')}</button>
    </div>
  </div>
</header>`;
}

// ───────────────────────────── Mobile menu ─────────────────────────────
function mobileMenu(active) {
  const item = n => `<li><a href="${n.href}" class="mobile-link"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a></li>`;
  const svc = groups.map(g => `
          <p class="mt-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">${g.name}</p>
          ${servicesIn(g.id).map(s => `<a href="/services/${s.slug}" class="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50">${esc(s.name)}</a>`).join('\n          ')}`).join('');
  return `<div id="mobile-menu" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden data-menu>
  <div class="mobile-menu__backdrop" data-menu-close></div>
  <div class="mobile-menu__panel">
    <div class="flex items-center justify-between border-b border-gray-100 p-4">
      ${logoImg('h-8 w-auto')}
      <button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100" aria-label="Close menu" data-menu-close>${icon('x', 'w-6 h-6')}</button>
    </div>
    <nav aria-label="Mobile" class="flex-1 overflow-y-auto p-4">
      <ul class="space-y-1">
        ${NAV.filter(n => !n.mega).slice(0, 2).map(item).join('\n        ')}
        <li>
          <details class="group" ${active === 'services' ? 'open' : ''}>
            <summary class="mobile-link flex cursor-pointer list-none items-center justify-between">Services ${icon('chevron-down', 'w-5 h-5 transition-transform group-open:rotate-180')}</summary>
            <div class="pb-2"><a href="/services" class="block rounded-md px-3 py-2 text-sm font-semibold text-emerald-700">All services overview</a>${svc}
            </div>
          </details>
        </li>
        ${NAV.filter(n => !n.mega).slice(2).map(item).join('\n        ')}
        ${item({ key: 'contact', label: 'Contact', href: '/contact' })}
      </ul>
    </nav>
    <div class="grid grid-cols-2 gap-3 border-t border-gray-100 p-4">
      <a href="${telLink()}" class="btn btn-outline">${icon('phone', 'w-4 h-4')}Call</a>
      <a href="${waLink()}" class="btn btn-wa" target="_blank" rel="noopener">${icon('whatsapp', 'w-4 h-4')}WhatsApp</a>
    </div>
  </div>
</div>`;
}

// ───────────────────────────── Footer ─────────────────────────────
function footer() {
  const featured = ['legal-compliances', 'environmental-clearances', 'audit-reporting', 'etp-stp-installation', 'zld-ro-systems', 'air-pollution-control', 'online-monitoring-systems', 'hazardous-waste-management'];
  const year = new Date().getFullYear();
  return `<footer class="bg-gray-950 text-gray-400">
  <div class="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
    <div class="lg:col-span-4">
      <a href="/" class="inline-block rounded-lg bg-white p-2" aria-label="${esc(site.name)} – home">${logoImg('h-9 w-auto')}</a>
      <p class="mt-5 max-w-sm text-sm leading-relaxed">Environmental consultancy and turnkey pollution control from Waluj MIDC, Chhatrapati Sambhajinagar: MPCB compliance, ETP/STP, ZLD, testing and O&amp;M for industries across Maharashtra.</p>
      <div class="mt-5 flex gap-3">${socialLinks('w-5 h-5', 'inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-300 hover:bg-emerald-700 hover:text-white')}</div>
    </div>
    <div class="lg:col-span-3">
      <h2 class="footer-title">Key services</h2>
      <ul class="space-y-2 text-sm">${featured.map(slug => {
        const s = services.find(x => x.slug === slug);
        return `<li><a href="/services/${s.slug}" class="hover:text-emerald-400">${esc(s.name)}</a></li>`;
      }).join('')}
        <li><a href="/services" class="font-semibold text-emerald-400 hover:text-emerald-300">All services →</a></li>
      </ul>
    </div>
    <div class="lg:col-span-2">
      <h2 class="footer-title">Company</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/about" class="hover:text-emerald-400">About us</a></li>
        <li><a href="/products" class="hover:text-emerald-400">Products</a></li>
        <li><a href="/gallery" class="hover:text-emerald-400">Gallery</a></li>
        <li><a href="/blog" class="hover:text-emerald-400">Blog</a></li>
        <li><a href="/brochure" class="hover:text-emerald-400">Company brochure</a></li>
        <li><a href="/contact" class="hover:text-emerald-400">Contact</a></li>
      </ul>
    </div>
    <div class="lg:col-span-3">
      <h2 class="footer-title">Contact</h2>
      <ul class="space-y-4 text-sm">
        <li class="flex gap-3">${icon('map-pin', 'mt-0.5 w-5 h-5 shrink-0 text-emerald-500')}<span>${esc(site.address.full)}</span></li>
        <li class="flex gap-3">${icon('phone', 'mt-0.5 w-5 h-5 shrink-0 text-emerald-500')}<a href="${telLink()}" class="hover:text-emerald-400">${site.phoneDisplay}</a></li>
        <li class="flex gap-3">${icon('mail', 'mt-0.5 w-5 h-5 shrink-0 text-emerald-500')}<a href="mailto:${site.email}" class="break-all hover:text-emerald-400">${site.email}</a></li>
        <li class="flex gap-3">${icon('clock', 'mt-0.5 w-5 h-5 shrink-0 text-emerald-500')}<span>${site.hours}</span></li>
      </ul>
    </div>
  </div>
  <div class="border-t border-white/10">
    <div class="container-x flex flex-col gap-4 py-6 text-xs sm:text-sm md:flex-row md:items-center md:justify-between">
      <p>© ${year} ${esc(site.legalName)}. All rights reserved.</p>
      <nav aria-label="Legal" class="flex flex-wrap gap-x-5 gap-y-2">
        <a href="/privacy-policy" class="hover:text-emerald-400">Privacy policy</a>
        <a href="/terms-and-conditions" class="hover:text-emerald-400">Terms &amp; conditions</a>
        <a href="/sitemap" class="hover:text-emerald-400">Sitemap</a>
      </nav>
      <p class="flex flex-wrap gap-x-3 gap-y-1 text-gray-500">
        <span>Design &amp; development: <a href="${site.credits.designer.url}" target="_blank" rel="noopener" class="text-gray-300 hover:text-emerald-400">${esc(site.credits.designer.name)}</a></span>
        <span aria-hidden="true">•</span>
        <span>${esc(site.credits.partner.label)}: <a href="${site.credits.partner.url}" target="_blank" rel="noopener" title="${esc(site.credits.partner.title)}" class="text-gray-300 hover:text-emerald-400">${esc(site.credits.partner.name)}</a></span>
      </p>
    </div>
  </div>
</footer>`;
}

// ───────────────────────────── Floating actions ─────────────────────────────
function floatingActions() {
  return `<div class="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-gray-200 bg-white text-xs font-semibold shadow-[0_-4px_12px_rgba(0,0,0,0.06)] lg:hidden" data-action-bar>
  <a href="${telLink()}" class="flex flex-col items-center gap-1 py-2.5 text-gray-700">${icon('phone', 'w-5 h-5 text-emerald-600')}Call</a>
  <a href="${waLink()}" target="_blank" rel="noopener" class="flex flex-col items-center gap-1 py-2.5 text-gray-700">${icon('whatsapp', 'w-5 h-5 text-green-600')}WhatsApp</a>
  <button type="button" class="flex flex-col items-center gap-1 py-2.5 text-gray-700" data-callback-open>${icon('message', 'w-5 h-5 text-emerald-600')}Call back</button>
</div>
<a href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp" class="fixed bottom-6 right-6 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition hover:scale-105 hover:bg-green-700 lg:inline-flex">${icon('whatsapp', 'w-7 h-7')}</a>`;
}

// ───────────────────────────── Call-back dialog ─────────────────────────────
function callbackDialog() {
  return `<dialog id="callback-dialog" class="callback-dialog" aria-labelledby="callback-title">
  <div class="relative p-6 sm:p-8">
    <button type="button" class="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100" aria-label="Close" data-callback-close>${icon('x', 'w-5 h-5')}</button>
    <div data-form-body>
      <p class="eyebrow">${icon('phone', 'w-3.5 h-3.5')}Free consultation</p>
      <h2 id="callback-title" class="mt-3 text-2xl font-bold text-gray-900">Request a call back</h2>
      <p class="mt-1 text-sm text-gray-600">Share your details and our environmental expert will call you, usually within one working day.</p>
      <form class="mt-5 space-y-4" data-lead-form="callback" data-endpoint="${site.forms.callback}" novalidate>
        <div><label for="cb-name" class="form-label">Full name *</label><input id="cb-name" name="name" type="text" class="form-input" autocomplete="name" required></div>
        <div><label for="cb-phone" class="form-label">Mobile number *</label><input id="cb-phone" name="phone" type="tel" class="form-input" autocomplete="tel" inputmode="tel" required></div>
        <div><label for="cb-email" class="form-label">Email</label><input id="cb-email" name="email" type="email" class="form-input" autocomplete="email"></div>
        <div class="hp" aria-hidden="true"><label for="cb-website">Website</label><input id="cb-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <p class="form-error" role="alert" hidden data-form-error></p>
        <button type="submit" class="btn btn-primary w-full">Request call back ${icon('arrow-right', 'w-4 h-4')}</button>
        <p class="text-center text-xs text-gray-500">We use your details only to respond to your enquiry. <a href="/privacy-policy" class="underline">Privacy policy</a></p>
      </form>
    </div>
    <div class="hidden py-6 text-center" data-form-success tabindex="-1">
      <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">${icon('check', 'w-8 h-8')}</span>
      <h2 class="mt-4 text-xl font-bold text-gray-900">Request received</h2>
      <p class="mt-2 text-sm text-gray-600">Thank you. Our team will call you shortly. For anything urgent, call <a href="${telLink()}" class="font-semibold text-emerald-700">${site.phoneDisplay}</a>.</p>
    </div>
  </div>
</dialog>`;
}

// ───────────────────────────── Page ─────────────────────────────
function page({ active, body, ...meta }) {
  const ga = site.ga4Id ? ` data-ga4="${esc(site.ga4Id)}"` : '';
  return `<!DOCTYPE html>
<html lang="en-IN"${ga}>
${head(meta)}
<body class="flex min-h-screen flex-col bg-white font-sans text-gray-700 antialiased">
${header(active)}
<main id="main" class="flex-1">
${body}
</main>
${footer()}
${floatingActions()}
${mobileMenu(active)}
${callbackDialog()}
<div class="h-16 bg-gray-950 lg:hidden" aria-hidden="true"></div>
</body>
</html>
`;
}

module.exports = { page };
