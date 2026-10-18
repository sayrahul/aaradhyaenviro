# Aaradhya Enviro – website

Static website for Aaradhya Enviro (environmental consultancy, Waluj MIDC, Chhatrapati Sambhajinagar).
Live: https://aaradhyaenviro.com · Hosted on Cloudflare (Workers static assets).

The HTML in the repository root is **generated**. Edit the sources in `src/`, then run `npm run build`.
Never hand-edit `index.html`, `services/*.html`, `blog/*.html` etc. — the next build overwrites them.

## Quick start

```bash
npm install          # once
npm run build        # regenerate HTML, CSS, JS, sitemap (≈5 s)
npm run preview      # http://localhost:8080 with clean URLs, like Cloudflare
npm run images       # only after adding/replacing photos or logos
npm run pdf          # regenerate the brochure PDF (needs Chrome/Edge) – run after changing
                     # services, stats, clients, testimonials or contact details
```

Requires Node.js 18+.

## Where things live

| What to change | File |
|---|---|
| Phone, email, address, stats, social links, GA4 id, form endpoints | `src/config.js` |
| The 17 service pages (text, FAQs, process, regulations) | `src/data/services.js` |
| Testimonials, homepage FAQs, products, values | `src/data/content.js` |
| Client logos (order and names) | `src/data/clients.js` + files in `src/images/clients/` |
| Photos and their alt text | `src/data/images.js` + files in `src/images/photos/` |
| Blog posts | `src/content/posts.json` (meta) + `src/content/posts/<slug>.html` (body) + image/service mapping in `src/data/posts.js` |
| Privacy policy / terms text | `src/content/privacy.html`, `src/content/terms.html` |
| Page layouts | `src/pages/*.js` |
| Header, footer, menus, call-back dialog | `src/lib/layout.js` |
| Shared sections (FAQ, CTA, cards…) | `src/lib/components.js` |
| Structured data (JSON-LD) | `src/lib/schema.js` |
| Icons | `src/lib/icons.js` (compiled to `assets/icons.svg`) |
| Styles | `assets/css/main-source.css` (Tailwind 3) |
| Browser JS | `src/js/site.js` (minified to `assets/js/site.js`) |

## Build output

`scripts/build.js` writes:

- `*.html`, `services/*.html`, `blog/*.html` (49 pages)
- `assets/css/main.css`, `assets/js/site.js`, `assets/icons.svg` — referenced with `?v=<hash>` for cache-busting
- `sitemap.xml` (with image entries), `robots.txt`, `site.webmanifest`

It then checks every page for broken internal links, missing files, title/description length,
a single `<h1>` and duplicate ids, and exits non-zero if anything fails.

`scripts/images.js` converts `src/images/**` into responsive WebP files in `assets/img/`,
generates `favicon.ico`, `apple-touch-icon.png`, PWA icons and the 1200×630 social image,
and records real dimensions in `src/data/image-meta.json`.

## Company profile PDF

`/brochure` is laid out as eight exact A4 sheets. `scripts/pdf.js` opens it in headless Chrome,
warns if any sheet overflows its page, and writes `assets/Aaradhya-Enviro-Company-Profile.pdf`
(the file behind the "Download PDF" button, ~2 MB). Brochure photos use the `-print.jpg`
copies made by `npm run images`, because PDFs cannot embed WebP efficiently.

## Hosting notes (Cloudflare)

- `wrangler.jsonc` – static assets from the repo root, clean URLs (`/about` serves `about.html`; `/about.html` redirects), `404.html` for unknown URLs.
- `_headers` – security headers (CSP, HSTS, nosniff, …) and long-term caching for hashed assets.
- `_redirects` – a few legacy redirects.
- `.assetsignore` – keeps `src/`, `scripts/`, config and docs off the live site.

If you add a new third-party script, embed or form endpoint, allow its domain in the
`Content-Security-Policy` in `_headers`, otherwise the browser will block it.

## Adding a blog post

1. Add an entry to `src/content/posts.json` (`slug`, `title`, `date` like `Oct 18, 2026`, `category`, `excerpt`).
2. Create `src/content/posts/<slug>.html` with the article body (use `<h2>`, `<h3>`, `<p>`, `<ul>`, tables, `<aside class="callout">`).
3. Add `'<slug>': { image: '<photo key>', service: '<service slug>' }` in `src/data/posts.js`.
4. `npm run build`.

See `OWNER-GUIDE.md` for the go-live checklist and the tasks that need the owner's accounts.
