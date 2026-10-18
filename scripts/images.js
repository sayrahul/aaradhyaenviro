/**
 * Image pipeline: source files in src/images  ->  optimized files in assets/img (+ favicons in root).
 *
 *   npm run images
 *
 * - Photos: responsive WebP (640 / 1024 / 1600 px, never upscaled)
 * - Client logos: trimmed, resized, WebP (SVGs are copied as-is)
 * - Brand: logo WebP, favicon.ico, apple-touch-icon, PWA icons, 1200x630 social share image
 * Writes real dimensions to src/data/image-meta.json for width/height attributes.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src', 'images');
const outDir = path.join(root, 'assets', 'img');
const photos = require('../src/data/images');
const clients = require('../src/data/clients');

const WIDTHS = [640, 1024, 1600];
const meta = { photos: {}, clients: {}, brand: {} };

function reset(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

async function doPhotos() {
  for (const [key, p] of Object.entries(photos)) {
    const file = path.join(srcDir, 'photos', p.file);
    let img = sharp(file);
    const m = await img.metadata();
    let { width, height } = m;
    if (p.crop) {
      const h = Math.round(height * (1 - (p.crop.bottom || 0)));
      img = sharp(await img.extract({ left: 0, top: 0, width, height: h }).toBuffer());
      height = h;
    }
    const buf = await img.toBuffer();
    const widths = WIDTHS.filter(w => w < width);
    widths.push(Math.min(width, 1600));
    const uniq = [...new Set(widths)].sort((a, b) => a - b);
    for (const w of uniq) {
      await sharp(buf).resize({ width: w }).webp({ quality: 72, effort: 5 }).toFile(path.join(outDir, `${key}-${w}.webp`));
    }
    const maxW = uniq[uniq.length - 1];
    // JPEG copy for the brochure PDF: PDFs cannot embed WebP, Chrome would store it uncompressed.
    const pw = Math.min(width, 1100);
    await sharp(buf).resize({ width: pw }).jpeg({ quality: 68, mozjpeg: true }).toFile(path.join(outDir, `${key}-print.jpg`));
    meta.photos[key] = { widths: uniq, width: maxW, height: Math.round(height * maxW / width), print: { width: pw, height: Math.round(height * pw / width) } };
  }
}

async function doClients() {
  fs.mkdirSync(path.join(outDir, 'clients'), { recursive: true });
  for (const c of clients) {
    const file = path.join(srcDir, 'clients', c.file);
    const base = c.file.replace(/\.[^.]+$/, '');
    if (c.file.endsWith('.svg')) {
      fs.copyFileSync(file, path.join(outDir, 'clients', c.file));
      const m = await sharp(file).metadata();
      meta.clients[c.file] = { src: `clients/${c.file}`, width: m.width, height: m.height };
      continue;
    }
    const trimmed = await sharp(file, { animated: false }).flatten({ background: '#ffffff' }).trim({ threshold: 12 }).toBuffer();
    const info = await sharp(trimmed)
      .resize({ width: 320, height: 160, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(outDir, 'clients', base + '.webp'));
    meta.clients[c.file] = { src: `clients/${base}.webp`, width: info.width, height: info.height };
  }
}

// Minimal ICO writer: embeds PNG images (supported by all modern browsers).
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2); dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4); dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8); dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...pngs.map(p => p.data)]);
}

async function doBrand() {
  const logoSrc = path.join(srcDir, 'brand', 'logo-horizontal.png');
  const info = await sharp(logoSrc).webp({ quality: 90 }).toFile(path.join(outDir, 'logo.webp'));
  meta.brand.logo = { width: info.width, height: info.height };

  // The "A + leaf" mark is the left part of the horizontal logo.
  const mark = await sharp(logoSrc).extract({ left: 0, top: 0, width: 122, height: 98 }).trim().toBuffer();
  const square = async (size, pad, bg) => {
    const inner = Math.round(size * (1 - pad * 2));
    const icon = await sharp(mark).resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
      .composite([{ input: icon, gravity: 'center' }]).png().toBuffer();
  };
  const transparent = { r: 255, g: 255, b: 255, alpha: 0 };
  const white = { r: 255, g: 255, b: 255, alpha: 1 };
  fs.writeFileSync(path.join(root, 'favicon.ico'), buildIco([
    { size: 32, data: await square(32, 0.02, transparent) },
    { size: 48, data: await square(48, 0.02, transparent) },
  ]));
  fs.writeFileSync(path.join(root, 'apple-touch-icon.png'), await square(180, 0.12, white));
  fs.writeFileSync(path.join(outDir, 'icon-192.png'), await square(192, 0.14, white));
  fs.writeFileSync(path.join(outDir, 'icon-512.png'), await square(512, 0.14, white));

  // Social share image 1200x630: photo background, dark overlay, logo card and headline.
  const bg = await sharp(path.join(srcDir, 'photos', photos['stp-aerial'].file))
    .resize(1200, 630, { fit: 'cover' }).modulate({ brightness: 0.55 }).toBuffer();
  const logo = await sharp(logoSrc).resize({ width: 520 }).toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const card = await sharp({ create: { width: 600, height: logoMeta.height + 60, channels: 4, background: white } })
    .composite([{ input: logo, top: 30, left: 40 }]).png().toBuffer();
  const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <style>.h{font:700 54px Arial,Helvetica,sans-serif;fill:#fff}.s{font:400 30px Arial,Helvetica,sans-serif;fill:#d1fae5}</style>
    <text x="70" y="330" class="h">MPCB Compliance, ETP/STP &amp; ZLD</text>
    <text x="70" y="400" class="h">Turnkey Environmental Solutions</text>
    <text x="70" y="470" class="s">Chhatrapati Sambhajinagar  |  500+ clients since 2018</text>
    <rect x="70" y="520" width="360" height="56" rx="28" fill="#059669"/>
    <text x="100" y="557" style="font:700 28px Arial,Helvetica,sans-serif;fill:#fff">+91 99759 29212</text>
  </svg>`);
  await sharp(bg).composite([{ input: card, top: 60, left: 70 }, { input: text, top: 0, left: 0 }])
    .jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, 'og-image.jpg'));
}

(async () => {
  reset(outDir);
  await doPhotos();
  await doClients();
  await doBrand();
  fs.writeFileSync(path.join(root, 'src', 'data', 'image-meta.json'), JSON.stringify(meta, null, 2) + '\n');
  const total = fs.readdirSync(outDir, { recursive: true }).length;
  console.log(`images: ${Object.keys(meta.photos).length} photos, ${Object.keys(meta.clients).length} logos, ${total} files written`);
})().catch(e => { console.error(e); process.exit(1); });
