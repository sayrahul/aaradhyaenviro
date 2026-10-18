// ─────────────────────────────────────────────────────────────────────────────
//  Single source of truth for business details. Change a value here, run
//  `npm run build`, and every page, schema block and the sitemap update together.
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  name: 'Aaradhya Enviro',
  legalName: 'Aaradhya Enviro',
  tagline: 'Environmental Consultancy & Services',

  // Canonical domain (no trailing slash). The www sub-domain currently has no DNS
  // record, so the bare domain is canonical. See DEPLOYMENT-GUIDE.md.
  siteUrl: 'https://aaradhyaenviro.com',

  phone: '9975929212',
  phoneDisplay: '+91 99759 29212',
  phoneE164: '+919975929212',
  whatsapp: '919975929212',
  email: 'info@aaradhyaenviro.com',

  address: {
    street: '10, Wadgaon Kolhati, MIDC Waluj Area',
    city: 'Chhatrapati Sambhajinagar',
    region: 'Maharashtra',
    postalCode: '431136',
    country: 'IN',
    full: '10, Wadgaon Kolhati, MIDC Waluj Area, Chhatrapati Sambhajinagar, Maharashtra 431136',
  },
  geo: { lat: 19.8762, lng: 75.3433 },
  // Paste the "Share → link" of your Google Business Profile here to show review / directions buttons.
  googleBusinessUrl: '',
  googleReviewUrl: '',

  hours: '24/7 on phone & WhatsApp',
  openingHoursSchema: 'Mo-Su 00:00-23:59',

  // Numbers shown across the site. Keep them honest and identical everywhere.
  stats: [
    { value: '500+', label: 'Clients served' },
    { value: '10+', label: 'Years of team experience' },
    { value: '2018', label: 'Founded' },
    { value: '17', label: 'Specialised services' },
  ],
  // Team experience (the company itself was founded in foundingYear).
  yearsExperience: '10+',
  foundingYear: '2018',
  clientsCount: '500+',

  areasServed: ['Chhatrapati Sambhajinagar', 'Waluj MIDC', 'Shendra MIDC', 'Chikalthana MIDC', 'Jalna', 'Beed', 'Latur', 'Dharashiv (Osmanabad)', 'Nanded', 'Ahilyanagar (Ahmednagar)', 'Nashik', 'Pune', 'Mumbai', 'Nagpur'],

  social: {
    facebook: 'https://www.facebook.com/AaradhyaEnviro',
    instagram: 'https://www.instagram.com/aaradhyaenviro/',
    linkedin: 'https://www.linkedin.com/company/aaradhyaenviro/',
  },

  // Lead forms post to Google Apps Script web apps (same endpoints as before).
  forms: {
    contact: 'https://script.google.com/macros/s/AKfycbyLxz0bhJ5qCAAaJ1uKxWJVybdFQOIoXqFcImn43a_f3GIgIZwPJ70vbUuv8JTVLT4/exec',
    callback: 'https://script.google.com/macros/s/AKfycbwZ1wn0rP0H-SONl9myYZWVW-7OEXoB9j4H_hr-E3mRlOGvfa2YSgfVNssgZBruDeqA/exec',
  },

  // Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'. Empty = analytics off.
  ga4Id: '',
  // Google Search Console HTML-tag verification code (content="..." value). Empty = not added.
  googleSiteVerification: '',

  credits: {
    designer: { name: 'Proventure Digital Agency', url: 'https://www.proventure.in/' },
    partner: { label: 'Billing & POS Partner', name: 'KamaiPlus', url: 'https://kamaiplus.com', title: 'KamaiPlus - Offline GST Billing Software' },
  },
};
