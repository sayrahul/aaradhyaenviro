const site = require('../config');
const { services } = require('../data/services');
const { esc, icon, waLink, telLink } = require('../lib/html');
const { breadcrumbs, pageHero } = require('../lib/components');
const schema = require('../lib/schema');

module.exports = () => {
  const crumbs = breadcrumbs([{ name: 'Contact', path: '/contact' }]);
  const mapQuery = encodeURIComponent(`${site.name}, ${site.address.full}`);
  const directions = site.googleBusinessUrl || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const cards = [
    { icon: 'phone', title: 'Call us', text: site.phoneDisplay, href: telLink(), note: site.hours },
    { icon: 'whatsapp', title: 'WhatsApp', text: 'Chat with an expert', href: waLink(), note: 'Share documents or photos directly', external: true },
    { icon: 'mail', title: 'Email', text: site.email, href: `mailto:${site.email}`, note: 'We reply within one working day' },
    { icon: 'map-pin', title: 'Office', text: 'Waluj MIDC, Chhatrapati Sambhajinagar', href: directions, note: 'Get directions', external: true },
  ];

  const body = `
${pageHero({ title: 'Contact us', lead: 'Tell us about your unit and requirement. Our environmental experts will get back to you with clear next steps — the first consultation is free.', crumbs, actions: false })}

<section class="bg-white py-12">
  <div class="container-x grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
    ${cards.map(c => `<a href="${c.href}"${c.external ? ' target="_blank" rel="noopener"' : ''} class="card group p-4 hover:border-emerald-300 sm:p-6">
      <span class="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white">${icon(c.icon, 'w-5 h-5')}</span>
      <h2 class="mt-4 text-sm font-semibold uppercase tracking-wider text-gray-500">${c.title}</h2>
      <p class="mt-1 break-words text-sm font-semibold text-gray-900 sm:text-base">${esc(c.text)}</p>
      <p class="mt-1 hidden text-sm text-gray-500 sm:block">${esc(c.note)}</p>
    </a>`).join('\n    ')}
  </div>
</section>

<section class="section bg-gray-50 pt-8 lg:pt-12">
  <div class="container-x grid gap-10 lg:grid-cols-5">
    <div class="card p-6 sm:p-10 lg:col-span-3">
      <div data-form-body>
        <h2 class="text-2xl font-bold text-gray-900">Send us your enquiry</h2>
        <p class="mt-1 text-gray-600">Fields marked * are required.</p>
        <form class="mt-8 grid gap-5 sm:grid-cols-2" data-lead-form="contact" data-endpoint="${site.forms.contact}" novalidate>
          <div><label for="name" class="form-label">Full name *</label><input id="name" name="name" type="text" class="form-input" autocomplete="name" required></div>
          <div><label for="mobile" class="form-label">Mobile number *</label><input id="mobile" name="mobile" type="tel" class="form-input" autocomplete="tel" inputmode="tel" required></div>
          <div><label for="email" class="form-label">Email *</label><input id="email" name="email" type="email" class="form-input" autocomplete="email" required></div>
          <div><label for="serviceType" class="form-label">Service required</label>
            <select id="serviceType" name="serviceType" class="form-input">
              <option value="">Select a service</option>
              ${services.map(s => `<option value="${esc(s.name)}">${esc(s.name)}</option>`).join('\n              ')}
              <option value="Other / not sure">Other / not sure</option>
            </select>
          </div>
          <div class="sm:col-span-2"><label for="urgency" class="form-label">When do you need this?</label>
            <select id="urgency" name="urgency" class="form-input">
              <option value="">Select timeline</option>
              <option value="Urgent (notice / deadline)">Urgent (notice or deadline)</option>
              <option value="Within a month">Within a month</option>
              <option value="Planning (future project)">Planning (future project)</option>
            </select>
          </div>
          <div class="sm:col-span-2"><label for="message" class="form-label">Your requirement *</label><textarea id="message" name="message" rows="5" class="form-input" placeholder="Industry, location, capacity, approvals you have, and what you need help with" required></textarea></div>
          <div class="hp" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
          <p class="form-error sm:col-span-2" role="alert" hidden data-form-error></p>
          <div class="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
            <button type="submit" class="btn btn-primary btn-lg">Send enquiry ${icon('arrow-right', 'w-5 h-5')}</button>
            <a href="${waLink()}" target="_blank" rel="noopener" class="btn btn-wa btn-lg">${icon('whatsapp', 'w-5 h-5')}WhatsApp instead</a>
          </div>
          <p class="text-xs text-gray-500 sm:col-span-2">By submitting, you agree that we may contact you about your enquiry. See our <a href="/privacy-policy" class="underline">privacy policy</a>.</p>
        </form>
      </div>
      <div class="hidden py-10 text-center" data-form-success tabindex="-1">
        <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">${icon('check', 'w-8 h-8')}</span>
        <h2 class="mt-4 text-2xl font-bold text-gray-900">Thank you — enquiry received</h2>
        <p class="mx-auto mt-2 max-w-md text-gray-600">Our team will contact you shortly. If it is urgent, call <a href="${telLink()}" class="font-semibold text-emerald-700">${site.phoneDisplay}</a> or message us on WhatsApp.</p>
      </div>
    </div>

    <div class="space-y-6 lg:col-span-2">
      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <iframe title="Map showing Aaradhya Enviro office, Waluj MIDC" src="https://www.google.com/maps?q=${mapQuery}&amp;output=embed" class="h-72 w-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        <div class="p-6">
          <h2 class="font-semibold text-gray-900">${esc(site.name)}</h2>
          <p class="mt-1 text-sm leading-relaxed text-gray-600">${esc(site.address.full)}</p>
          <a href="${directions}" target="_blank" rel="noopener" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800">Open in Google Maps ${icon('external-link', 'w-4 h-4')}</a>
        </div>
      </div>
      <div class="rounded-2xl bg-gray-900 p-6 text-gray-300">
        <h2 class="font-semibold text-white">What happens next?</h2>
        <ol class="mt-4 space-y-3 text-sm">
          <li class="flex gap-3"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">1</span>We review your requirement and call you to understand the details.</li>
          <li class="flex gap-3"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">2</span>If needed, we visit your site or review your documents.</li>
          <li class="flex gap-3"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">3</span>You receive a written scope, timeline and estimate.</li>
        </ol>
      </div>
    </div>
  </div>
</section>
`;
  return [{
    path: '/contact',
    file: 'contact.html',
    active: 'contact',
    title: 'Contact Aaradhya Enviro – Waluj MIDC, Chhatrapati Sambhajinagar',
    description: 'Contact Aaradhya Enviro for MPCB compliance, ETP/STP, ZLD and testing. Call or WhatsApp +91 99759 29212 or send an enquiry for a free consultation.',
    schema: [schema.organization(), schema.webPage('ContactPage', { path: '/contact', name: 'Contact Aaradhya Enviro', description: 'Contact details and enquiry form.' }), crumbs.schema],
    body,
  }];
};
