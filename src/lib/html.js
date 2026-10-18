// Small HTML helpers shared by all templates.
const site = require('../config');
const imageMeta = require('../data/image-meta.json');
const photos = require('../data/images');
const { names: iconNames } = require('./icons');

// Cache-busting versions for static assets, filled in by scripts/build.js.
const versions = { css: '', js: '', icons: '' };

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const abs = (p = '/') => site.siteUrl + (p === '/' ? '/' : p);

function icon(name, cls = 'w-5 h-5') {
  if (!iconNames.has(name)) throw new Error(`Unknown icon "${name}"`);
  return `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="/assets/icons.svg?v=${versions.icons}#${name}"/></svg>`;
}

// Responsive photo with real width/height (prevents layout shift).
function photo(key, { sizes = '100vw', cls = '', eager = false, lazy = true, alt } = {}) {
  const m = imageMeta.photos[key];
  if (!m) throw new Error(`Unknown photo "${key}"`);
  const srcset = m.widths.map(w => `/assets/img/${key}-${w}.webp ${w}w`).join(', ');
  const fallback = m.widths.find(w => w >= 1024) || m.width;
  return `<img src="/assets/img/${key}-${fallback}.webp" srcset="${srcset}" sizes="${sizes}" width="${m.width}" height="${m.height}" alt="${esc(alt ?? photos[key].alt)}" class="${cls}"${eager ? ' fetchpriority="high"' : lazy ? ' loading="lazy"' : ''} decoding="async">`;
}

// JPEG version used on the printable brochure (keeps the PDF small).
function printPhoto(key, cls = '') {
  const m = imageMeta.photos[key];
  if (!m || !m.print) throw new Error(`No print image for "${key}" – run npm run images`);
  return `<img src="/assets/img/${key}-print.jpg" width="${m.print.width}" height="${m.print.height}" alt="${esc(photos[key].alt)}" class="${cls}" decoding="async">`;
}

function photoUrl(key, width = 1024) {
  const m = imageMeta.photos[key];
  const w = m.widths.find(x => x >= width) || m.width;
  return `/assets/img/${key}-${w}.webp`;
}

function logoImg(cls = 'h-10 w-auto', { eager = false } = {}) {
  const { width, height } = imageMeta.brand.logo;
  return `<img src="/assets/img/logo.webp" width="${width}" height="${height}" alt="${esc(site.name)} – ${esc(site.tagline)}" class="${cls}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
}

function clientLogo(c, cls = '', { lazy = true } = {}) {
  const m = imageMeta.clients[c.file];
  return `<img src="/assets/img/${m.src}" width="${m.width}" height="${m.height}" alt="${esc(c.name)} logo" class="${cls}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
}

const waLink = (text = 'Hello Aaradhya Enviro, I would like to know more about your environmental services.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
const telLink = () => `tel:${site.phoneE164}`;

const jsonLd = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

module.exports = { versions, esc, abs, icon, photo, printPhoto, photoUrl, logoImg, clientLogo, waLink, telLink, jsonLd };
