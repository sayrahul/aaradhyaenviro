// QR codes as inline SVG. The qrcode library is async, so scripts/build.js calls
// prepare() once before rendering; templates then read codes synchronously with qr().
const QRCode = require('qrcode');
const site = require('../config');

const targets = {
  website: `${site.siteUrl}/?utm_source=brochure&utm_medium=qr`,
  whatsapp: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello Aaradhya Enviro, I saw your company profile and would like to discuss a requirement.')}`,
};
const cache = {};

async function prepare() {
  for (const [key, url] of Object.entries(targets)) {
    cache[key] = await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#111827', light: '#ffffff' } });
  }
}

function qr(key, cls = 'h-28 w-28') {
  if (!cache[key]) throw new Error(`QR "${key}" not prepared – call prepare() first`);
  return cache[key].replace('<svg ', `<svg class="${cls}" role="img" aria-label="QR code: ${key}" `);
}

module.exports = { prepare, qr, targets };
