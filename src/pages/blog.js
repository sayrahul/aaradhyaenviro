const site = require('../config');
const posts = require('../data/posts');
const { bySlug } = require('../data/services');
const { esc, abs, icon, photo, photoUrl, waLink, telLink } = require('../lib/html');
const { breadcrumbs, pageHero, ctaBand } = require('../lib/components');
const schema = require('../lib/schema');

const fmt = iso => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

function card(p, sizes) {
  return `<a href="/blog/${p.slug}" class="card group flex flex-col overflow-hidden">
      <div class="aspect-[16/9] overflow-hidden bg-gray-100">${photo(p.image, { cls: 'h-full w-full object-cover transition duration-500 group-hover:scale-105', sizes, alt: '' })}</div>
      <div class="flex flex-1 flex-col p-6">
        <p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">${esc(p.category)}<span class="text-gray-300">•</span><time datetime="${p.iso}" class="font-medium normal-case tracking-normal text-gray-500">${fmt(p.iso)}</time></p>
        <h2 class="mt-3 text-lg font-semibold leading-snug text-gray-900 group-hover:text-emerald-700">${esc(p.title)}</h2>
        <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600">${esc(p.excerpt)}</p>
        <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">Read article · ${p.minutes} min ${icon('arrow-right', 'w-4 h-4 transition group-hover:translate-x-1')}</span>
      </div>
    </a>`;
}

function indexPage() {
  const crumbs = breadcrumbs([{ name: 'Blog', path: '/blog' }]);
  const categories = [...new Set(posts.map(p => p.category))];
  const body = `
${pageHero({ title: 'Technical insights & articles', lead: 'Practical guides from our engineers on ETP/STP operation, ZLD, MPCB procedures, monitoring and environmental reporting.', crumbs, actions: false })}

<section class="section bg-gray-50">
  <div class="container-x">
    <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category" data-filter>
      <button type="button" class="chip" aria-pressed="true" data-filter-value="all">All (${posts.length})</button>
      ${categories.map(c => `<button type="button" class="chip" aria-pressed="false" data-filter-value="${esc(c)}">${esc(c)} (${posts.filter(p => p.category === c).length})</button>`).join('\n      ')}
    </div>
    <ul class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      ${posts.map(p => `<li data-category="${esc(p.category)}">${card(p, '(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw')}</li>`).join('\n      ')}
    </ul>
  </div>
</section>

${ctaBand({ title: 'Have a specific compliance question?', text: 'Ask our engineers directly — we are happy to point you in the right direction.' })}
`;
  return {
    path: '/blog',
    file: 'blog.html',
    active: 'blog',
    title: 'Environmental Compliance Blog – ETP, ZLD & MPCB Guides',
    description: 'Expert articles on ETP/STP operation, ZLD, MPCB consent, hazardous waste, monitoring and environmental reporting from the Aaradhya Enviro engineering team.',
    schema: [
      {
        '@context': 'https://schema.org', '@type': 'Blog', name: `${site.name} blog`, url: abs('/blog'), publisher: schema.orgRef,
        blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: abs(`/blog/${p.slug}`), datePublished: p.iso })),
      },
      crumbs.schema,
    ],
    body,
  };
}

function postPage(p, i) {
  const crumbs = breadcrumbs([{ name: 'Blog', path: '/blog' }, { name: p.title, path: `/blog/${p.slug}` }]);
  const svc = bySlug[p.service];
  const more = posts.filter(x => x.slug !== p.slug && (x.category === p.category || x.service === p.service)).slice(0, 3);
  const fill = posts.filter(x => x.slug !== p.slug && !more.includes(x)).slice(0, 3 - more.length);
  const readNext = [...more, ...fill];
  const prev = posts[i + 1];
  const next = posts[i - 1];

  const body = `
<article>
  <header class="relative isolate overflow-hidden bg-gray-900">
    <div class="absolute inset-0 -z-10">${photo(p.image, { cls: 'h-full w-full object-cover opacity-30', eager: true, alt: '' })}</div>
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-gray-900/90 to-emerald-950/80"></div>
    <div class="container-x py-14 lg:py-20">
      ${crumbs.html}
      <p class="mt-6 inline-flex rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">${esc(p.category)}</p>
      <h1 class="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">${esc(p.title)}</h1>
      <p class="mt-4 max-w-3xl text-lg text-gray-300">${esc(p.excerpt)}</p>
      <p class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300">
        <span class="inline-flex items-center gap-2">${icon('calendar', 'w-4 h-4 text-emerald-400')}<time datetime="${p.iso}">${fmt(p.iso)}</time></span>
        <span class="inline-flex items-center gap-2">${icon('clock', 'w-4 h-4 text-emerald-400')}${p.minutes} min read</span>
        <span class="inline-flex items-center gap-2">${icon('users', 'w-4 h-4 text-emerald-400')}${esc(site.name)} technical team</span>
      </p>
    </div>
  </header>

  <div class="bg-white">
    <div class="container-x grid gap-12 py-12 lg:grid-cols-3 lg:py-16">
      <div class="prose-article min-w-0 lg:col-span-2">
${p.body}
        <aside class="not-prose mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-wider text-emerald-700">Need expert help?</p>
          <h2 class="mt-2 text-xl font-bold text-gray-900">${esc(svc.name)}</h2>
          <p class="mt-2 text-gray-700">${esc(svc.card)}</p>
          <div class="mt-5 flex flex-wrap gap-3">
            <a href="/services/${svc.slug}" class="btn btn-primary">Explore the service ${icon('arrow-right', 'w-4 h-4')}</a>
            <a href="${waLink(`Hello Aaradhya Enviro, I read your article "${p.title}" and need help.`)}" target="_blank" rel="noopener" class="btn btn-wa">${icon('whatsapp', 'w-4 h-4')}Ask on WhatsApp</a>
          </div>
        </aside>
        <nav aria-label="More articles" class="not-prose mt-10 grid gap-4 sm:grid-cols-2">
          ${prev ? `<a href="/blog/${prev.slug}" class="rounded-xl border border-gray-200 p-5 hover:border-emerald-300"><span class="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500">${icon('arrow-left', 'w-3.5 h-3.5')}Previous</span><span class="mt-1 block font-semibold text-gray-900">${esc(prev.title)}</span></a>` : '<span></span>'}
          ${next ? `<a href="/blog/${next.slug}" class="rounded-xl border border-gray-200 p-5 text-right hover:border-emerald-300"><span class="flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Next${icon('arrow-right', 'w-3.5 h-3.5')}</span><span class="mt-1 block font-semibold text-gray-900">${esc(next.title)}</span></a>` : ''}
        </nav>
      </div>
      <aside class="lg:col-span-1">
        <div class="sticky top-28 space-y-6">
          <div class="rounded-2xl bg-gray-900 p-6 text-gray-300">
            <h2 class="text-lg font-semibold text-white">Talk to an engineer</h2>
            <p class="mt-1 text-sm">Free first consultation for your unit.</p>
            <div class="mt-5 space-y-3">
              <a href="/contact" class="btn btn-primary w-full">Get a free quote</a>
              <a href="${telLink()}" class="btn btn-outline-light w-full">${icon('phone', 'w-4 h-4')}${site.phoneDisplay}</a>
            </div>
          </div>
          <div class="rounded-2xl border border-gray-200 p-6">
            <h2 class="font-semibold text-gray-900">Read next</h2>
            <ul class="mt-4 space-y-4">
              ${readNext.map(x => `<li><a href="/blog/${x.slug}" class="group block"><span class="text-xs font-semibold uppercase tracking-wider text-emerald-700">${esc(x.category)}</span><span class="mt-0.5 block font-medium leading-snug text-gray-900 group-hover:text-emerald-700">${esc(x.title)}</span></a></li>`).join('\n              ')}
            </ul>
            <a href="/blog" class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">All articles ${icon('arrow-right', 'w-4 h-4')}</a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</article>
`;
  return {
    path: `/blog/${p.slug}`,
    file: `blog/${p.slug}.html`,
    active: 'blog',
    type: 'article',
    image: photoUrl(p.image, 1600),
    title: p.title,
    description: p.excerpt.length > 160 ? p.excerpt.slice(0, 157).replace(/\s+\S*$/, '') + '…' : p.excerpt,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.excerpt,
        image: abs(photoUrl(p.image, 1600)),
        datePublished: p.iso,
        dateModified: p.iso,
        author: { '@type': 'Organization', name: `${site.name} technical team`, url: site.siteUrl + '/' },
        publisher: schema.orgRef,
        mainEntityOfPage: abs(`/blog/${p.slug}`),
        articleSection: p.category,
        inLanguage: 'en-IN',
      },
      crumbs.schema,
    ],
    body,
  };
}

module.exports = () => [indexPage(), ...posts.map(postPage)];
