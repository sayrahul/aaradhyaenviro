const photos = require('../data/images');
const { esc, icon, photo, photoUrl } = require('../lib/html');
const { breadcrumbs, pageHero, ctaBand } = require('../lib/components');
const schema = require('../lib/schema');
const site = require('../config');

// Gallery sections. Captions describe the kind of system shown.
const sections = [
  { title: 'Wastewater treatment', items: [['stp-aerial', 'Sewage treatment plant'], ['etp-site', 'Effluent treatment plant'], ['etp-plant', 'ETP dosing and filtration'], ['stp-clarifiers', 'Clarifiers and aeration basins'], ['stp-packaged', 'Packaged STP unit']] },
  { title: 'Water recovery & ZLD', items: [['zld-plant', 'Zero liquid discharge plant'], ['ro-plant-hall', 'Industrial RO plant'], ['ro-system', 'Skid-mounted RO system'], ['ro-skid', 'RO with media filters'], ['wtp', 'Water treatment pressure filters']] },
  { title: 'Air pollution control & monitoring', items: [['apc-stack', 'Air pollution control unit and stack'], ['apc-scrubber', 'Wet scrubber system'], ['monitoring-room', 'Online monitoring dashboards'], ['monitoring-tablet', 'Plant monitoring on site'], ['engineers-lab', 'Sampling and inspection'], ['engineer-factory', 'Plant audit and data review']] },
];

module.exports = () => {
  const crumbs = breadcrumbs([{ name: 'Gallery', path: '/gallery' }]);
  const body = `
${pageHero({ title: 'Gallery', lead: 'Treatment plants, recovery systems and air pollution control equipment of the kind we design, install and maintain.', crumbs, image: 'zld-plant', actions: false })}

<section class="section bg-white" data-gallery>
  <div class="container-x space-y-16">
    ${sections.map(sec => `<div>
      <h2 class="h2">${esc(sec.title)}</h2>
      <ul class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        ${sec.items.map(([key, caption]) => `<li>
          <figure class="group overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <button type="button" class="relative block w-full overflow-hidden" data-lightbox="${photoUrl(key, 1600)}" data-caption="${esc(caption)}" aria-label="Enlarge image: ${esc(caption)}">
              ${photo(key, { cls: 'aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105', sizes: '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw' })}
              <span class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 opacity-0 shadow transition group-hover:opacity-100">${icon('zoom-in', 'w-5 h-5')}</span>
            </button>
            <figcaption class="px-4 py-3 text-sm font-medium text-gray-700">${esc(caption)}</figcaption>
          </figure>
        </li>`).join('\n        ')}
      </ul>
    </div>`).join('\n    ')}
    <p class="rounded-xl bg-gray-50 p-5 text-sm text-gray-600">Some images are representative of the systems we work on. Photographs and references from completed client projects are shared on request.</p>
  </div>
</section>

<dialog class="lightbox" aria-label="Image viewer" data-lightbox-dialog>
  <button type="button" class="lightbox__btn right-4 top-4" aria-label="Close" data-lightbox-close>${icon('x', 'w-6 h-6')}</button>
  <button type="button" class="lightbox__btn left-4 top-1/2 -translate-y-1/2" aria-label="Previous image" data-lightbox-prev>${icon('chevron-left', 'w-6 h-6')}</button>
  <button type="button" class="lightbox__btn right-4 top-1/2 -translate-y-1/2" aria-label="Next image" data-lightbox-next>${icon('chevron-right', 'w-6 h-6')}</button>
  <figure class="flex h-full w-full flex-col items-center justify-center p-4 sm:p-12">
    <img alt="" class="max-h-[80vh] max-w-full rounded-lg object-contain" data-lightbox-img>
    <figcaption class="mt-4 text-center text-sm text-gray-200" data-lightbox-caption></figcaption>
  </figure>
</dialog>

${ctaBand()}
`;
  return [{
    path: '/gallery',
    file: 'gallery.html',
    active: 'gallery',
    title: 'Gallery – ETP, STP, ZLD & Air Pollution Control Systems',
    description: 'Images of effluent and sewage treatment plants, ZLD and RO systems, air pollution control and online monitoring systems of the kind Aaradhya Enviro delivers.',
    schema: [
      {
        '@context': 'https://schema.org', '@type': 'ImageGallery', name: 'Aaradhya Enviro gallery', url: `${site.siteUrl}/gallery`,
        image: sections.flatMap(s => s.items).map(([key, caption]) => ({ '@type': 'ImageObject', contentUrl: site.siteUrl + photoUrl(key, 1600), caption, description: photos[key].alt })),
      },
      crumbs.schema,
    ],
    body,
  }];
};
