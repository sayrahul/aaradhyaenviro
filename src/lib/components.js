// Reusable page sections.
const site = require('../config');
const clients = require('../data/clients');
const { testimonials } = require('../data/content');
const { esc, abs, icon, photo, clientLogo, waLink, telLink } = require('./html');

// Breadcrumb trail + matching BreadcrumbList schema.
function breadcrumbs(items) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  const html = `<nav aria-label="Breadcrumb" class="text-sm">
      <ol class="flex flex-wrap items-center gap-1.5 text-gray-300">
        ${all.map((it, i) => i === all.length - 1
          ? `<li aria-current="page" class="text-white">${esc(it.name)}</li>`
          : `<li><a href="${it.path}" class="hover:text-white">${esc(it.name)}</a></li><li aria-hidden="true">${icon('chevron-right', 'w-3.5 h-3.5')}</li>`).join('')}
      </ol>
    </nav>`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
  return { html, schema };
}

// Dark page header used on inner pages.
function pageHero({ title, lead, crumbs, image, eyebrow, actions = true }) {
  return `<section class="relative isolate overflow-hidden bg-gray-900">
  ${image ? `<div class="absolute inset-0 -z-10">${photo(image, { cls: 'h-full w-full object-cover opacity-30', eager: true })}</div>` : ''}
  <div class="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-gray-900/90 to-emerald-950/80"></div>
  <div class="container-x py-14 lg:py-20">
    ${crumbs ? crumbs.html : ''}
    ${eyebrow ? `<p class="mt-6 text-sm font-semibold uppercase tracking-wider text-emerald-400">${esc(eyebrow)}</p>` : ''}
    <h1 class="${eyebrow ? 'mt-2' : 'mt-6'} max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">${esc(title)}</h1>
    ${lead ? `<p class="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">${esc(lead)}</p>` : ''}
    ${actions ? `<div class="mt-8 flex flex-wrap gap-3">
      <a href="/contact" class="btn btn-primary">Get a free consultation ${icon('arrow-right', 'w-4 h-4')}</a>
      <a href="${telLink()}" class="btn btn-outline-light">${icon('phone', 'w-4 h-4')}${site.phoneDisplay}</a>
    </div>` : ''}
  </div>
</section>`;
}

function sectionHead({ eyebrow, title, lead, center = true, id }) {
  return `<div class="${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
      <h2${id ? ` id="${id}"` : ''} class="h2 mt-3">${title}</h2>
      ${lead ? `<p class="mt-4 text-lg leading-relaxed text-gray-600">${lead}</p>` : ''}
    </div>`;
}

function serviceCard(s) {
  return `<a href="/services/${s.slug}" class="card group flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg">
      <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">${icon(s.icon, 'w-6 h-6')}</span>
      <h3 class="mt-5 text-lg font-semibold text-gray-900 group-hover:text-emerald-700">${esc(s.name)}</h3>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600">${esc(s.card)}</p>
      <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">Learn more ${icon('arrow-right', 'w-4 h-4 transition group-hover:translate-x-1')}</span>
    </a>`;
}

// FAQ accordion (native <details>, no JS needed) + FAQPage schema.
function faqs(list, { title = 'Frequently asked questions', lead, eyebrow = 'FAQ', id = 'faq' } = {}) {
  const html = `<section class="section bg-white" aria-labelledby="${id}-title">
  <div class="container-x">
    ${sectionHead({ eyebrow, title: esc(title), lead, id: `${id}-title` })}
    <div class="mx-auto mt-10 max-w-3xl divide-y divide-gray-200 rounded-2xl border border-gray-200">
      ${list.map(f => `<details class="faq group">
        <summary class="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left font-semibold text-gray-900 hover:text-emerald-700">
          <span>${esc(f.q)}</span>${icon('chevron-down', 'mt-0.5 w-5 h-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180')}
        </summary>
        <div class="px-5 pb-5 leading-relaxed text-gray-600">${esc(f.a)}</div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return { html, schema };
}

function ctaBand({ title = 'Need help with environmental compliance?', text = 'Talk to our team for a free site assessment and a clear, written plan for your approvals, treatment systems and reporting.' } = {}) {
  return `<section class="bg-emerald-700">
  <div class="container-x flex flex-col items-start gap-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
    <div class="max-w-2xl">
      <h2 class="text-2xl font-bold text-white sm:text-3xl">${esc(title)}</h2>
      <p class="mt-2 text-emerald-50">${esc(text)}</p>
    </div>
    <div class="flex flex-wrap gap-3">
      <a href="/contact" class="btn bg-white text-emerald-800 hover:bg-emerald-50">Get a free quote ${icon('arrow-right', 'w-4 h-4')}</a>
      <a href="${waLink()}" target="_blank" rel="noopener" class="btn btn-outline-light">${icon('whatsapp', 'w-4 h-4')}WhatsApp us</a>
    </div>
  </div>
</section>`;
}

function statsRow(dark = false) {
  return `<dl class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl ${dark ? 'bg-white/10' : 'bg-gray-200'} lg:grid-cols-4">
      ${site.stats.map(s => `<div class="${dark ? 'bg-gray-900/60' : 'bg-white'} px-6 py-7 text-center">
        <dt class="text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}">${esc(s.label)}</dt>
        <dd class="order-first text-3xl font-bold tracking-tight ${dark ? 'text-white' : 'text-gray-900'} sm:text-4xl">${esc(s.value)}</dd>
      </div>`).join('\n      ')}
    </dl>`;
}

function clientsSection({ limit, title = 'Trusted by industry leaders', lead = 'A few of the manufacturers, builders and institutions we have worked with.' } = {}) {
  const list = limit ? clients.slice(0, limit) : clients;
  return `<section class="section bg-gray-50" aria-labelledby="clients-title">
  <div class="container-x">
    ${sectionHead({ eyebrow: 'Our clients', title: esc(title), lead: esc(lead), id: 'clients-title' })}
    <ul class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      ${list.map(c => `<li class="flex h-28 items-center justify-center rounded-xl border border-gray-200 bg-white p-4" title="${esc(c.name)}">${clientLogo(c, 'max-h-16 w-auto max-w-full object-contain')}</li>`).join('\n      ')}
    </ul>
    ${limit && clients.length > limit ? `<p class="mt-8 text-center"><a href="/about#clients" class="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800">See all ${clients.length} clients ${icon('arrow-right', 'w-4 h-4')}</a></p>` : ''}
  </div>
</section>`;
}

function testimonialsSection() {
  return `<section class="section bg-gray-900" aria-labelledby="reviews-title">
  <div class="container-x">
    <div class="mx-auto max-w-3xl text-center">
      <p class="eyebrow bg-white/10 text-emerald-300">Client feedback</p>
      <h2 id="reviews-title" class="h2 mt-3 text-white">What our clients say</h2>
      <p class="mt-4 text-lg text-gray-300">Feedback from plant heads, EHS managers and project owners we work with.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      ${testimonials.map(t => `<figure class="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
        ${icon('quote', 'w-8 h-8 text-emerald-400')}
        <blockquote class="mt-4 flex-1 leading-relaxed text-gray-200">“${esc(t.quote)}”</blockquote>
        <figcaption class="mt-6 border-t border-white/10 pt-4">
          <p class="font-semibold text-white">${esc(t.name)}</p>
          <p class="text-sm text-emerald-300">${esc(t.role)}</p>
        </figcaption>
      </figure>`).join('\n      ')}
    </div>
    ${site.googleReviewUrl ? `<p class="mt-10 text-center"><a href="${site.googleReviewUrl}" target="_blank" rel="noopener" class="btn btn-outline-light">${icon('star', 'w-4 h-4 text-yellow-400')}Review us on Google</a></p>` : ''}
  </div>
</section>`;
}

module.exports = { breadcrumbs, pageHero, sectionHead, serviceCard, faqs, ctaBand, statsRow, clientsSection, testimonialsSection };
