/**
 * Local preview server that behaves like Cloudflare static assets:
 * clean URLs (/about -> about.html), /x.html redirects to /x, custom 404 page.
 *
 *   npm run preview      then open http://localhost:8080
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const port = Number(process.env.PORT) || 8080;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.xml': 'application/xml',
  '.txt': 'text/plain', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.json': 'application/json',
};

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  if (clean.includes('..')) return null;
  const candidates = clean.endsWith('/') ? [clean + 'index.html'] : [clean, clean + '.html'];
  for (const c of candidates) {
    const file = path.join(root, c);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return null;
}

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.endsWith('.html')) {
    const to = url === '/index.html' ? '/' : url.slice(0, -5);
    res.writeHead(307, { Location: to });
    return res.end();
  }
  const file = resolve(url);
  if (!file) {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    return res.end(fs.readFileSync(path.join(root, '404.html')));
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Preview: http://localhost:${port}`));
