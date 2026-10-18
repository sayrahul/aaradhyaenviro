// Source photos live in src/images/photos. `npm run images` turns each entry into
// responsive WebP files in assets/img/ and records the real dimensions in
// src/data/image-meta.json (used for width/height attributes, which prevent layout shift).
//
// Note: most of these are stock/illustrative photos. Replace them with real project
// photos from client sites whenever possible: add the file here with the same key.

module.exports = {
  'stp-aerial': { file: 'stp-aerial.webp', alt: 'Aerial view of a large sewage treatment plant with aeration tanks and clarifiers' },
  'ro-plant-hall': { file: 'ro-plant-hall.webp', alt: 'Industrial reverse osmosis plant hall with RO pressure vessel racks and high-pressure pumps' },
  'engineer-factory': { file: 'engineer-factory.webp', alt: 'Engineer in safety helmet and vest reviewing plant data on a laptop inside a factory' },
  'engineers-lab': { file: 'engineers-lab.webp', alt: 'Environmental engineers inspecting a treated water sample at a treatment plant', crop: { bottom: 0.07 } },
  'apc-stack': { file: 'apc-stack.webp', alt: 'Industrial air pollution control unit with stack, ducting and access platforms' },
  'monitoring-tablet': { file: 'monitoring-tablet.jpg', alt: 'Tablet showing real-time plant monitoring dashboard in a process area' },
  'monitoring-room': { file: 'monitoring-room.webp', alt: 'Operator watching online environmental monitoring dashboards in a control room' },
  'etp-site': { file: 'etp-site.jpg', alt: 'Effluent treatment plant with collection tanks, filters and treated water channel' },
  'etp-plant': { file: 'etp-plant.jpg', alt: 'Industrial effluent treatment plant with dosing system, tanks and piping' },
  'stp-clarifiers': { file: 'stp-clarifiers.webp', alt: 'Sewage treatment plant with circular clarifiers, aeration basins and walkways' },
  'stp-packaged': { file: 'stp-packaged.jpg', alt: 'Compact packaged sewage treatment unit installed at site' },
  'zld-plant': { file: 'zld-plant.jpg', alt: 'Zero liquid discharge plant with evaporator, tanks and pipe racks' },
  'ro-skid': { file: 'ro-skid.jpg', alt: 'Industrial RO water treatment skid with FRP pressure vessels and dosing tanks' },
  'ro-system': { file: 'ro-system.jpg', alt: 'Skid-mounted reverse osmosis system with control panel and media filters' },
  'wtp': { file: 'wtp.jpg', alt: 'Water treatment plant with stainless steel pressure filters and manifold piping' },
  'apc-scrubber': { file: 'apc-scrubber.jpg', alt: 'Wet scrubber air pollution control system with blower and ducting' },
  'strategy': { file: 'strategy.webp', alt: 'Consultant selecting environmental and industrial compliance icons' },
  'green-bulb': { file: 'green-bulb.webp', alt: 'Seedling growing inside a light bulb held in soil, symbolising sustainable industry' },
  'eco-city': { file: 'eco-city.webp', alt: 'Illustration of a green city with wind turbines on a leaf' },
  'sapling': { file: 'sapling.webp', alt: 'Hands holding a young plant in soil' },
  'green-energy': { file: 'green-energy.jpg', alt: 'Illustration of solar panels and wind turbines in a green landscape' },
};
