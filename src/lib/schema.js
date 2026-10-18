// JSON-LD builders. Only facts that are true and visible on the site go here.
const site = require('../config');
const { services } = require('../data/services');
const { abs } = require('./html');

const ORG_ID = `${site.siteUrl}/#organization`;
const orgRef = { '@id': ORG_ID };

function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: site.name,
    description: 'Environmental consultancy and turnkey pollution control company in Chhatrapati Sambhajinagar, Maharashtra: MPCB consents, Environmental Clearance, ETP/STP, ZLD, air pollution control, environmental testing and O&M.',
    url: site.siteUrl + '/',
    logo: abs('/assets/main-logo.png'),
    image: abs('/assets/img/og-image.jpg'),
    telephone: site.phoneE164,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    foundingDate: site.foundingYear,
    openingHours: site.openingHoursSchema,
    areaServed: [
      { '@type': 'City', name: 'Chhatrapati Sambhajinagar' },
      { '@type': 'State', name: 'Maharashtra' },
    ],
    knowsAbout: ['MPCB consent', 'Environmental Clearance', 'Effluent Treatment Plant', 'Sewage Treatment Plant', 'Zero Liquid Discharge', 'Air pollution control', 'Hazardous waste management', 'Plastic EPR', 'Environmental monitoring'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Environmental services',
      itemListElement: services.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(`/services/${s.slug}`) },
      })),
    },
    sameAs: Object.values(site.social),
  };
}

function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.siteUrl}/#website`,
    url: site.siteUrl + '/',
    name: site.name,
    publisher: orgRef,
    inLanguage: 'en-IN',
  };
}

function webPage(type, { path, name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    url: abs(path),
    name,
    description,
    isPartOf: { '@id': `${site.siteUrl}/#website` },
    about: orgRef,
  };
}

function service(s) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: abs(`/services/${s.slug}`),
    provider: orgRef,
    areaServed: { '@type': 'State', name: 'Maharashtra' },
  };
}

module.exports = { ORG_ID, orgRef, organization, website, webPage, service };
