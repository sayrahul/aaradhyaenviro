/**
 * Generates the downloadable company profile PDF from the /brochure page.
 *
 *   npm run pdf          (run after `npm run build`; needs Google Chrome or Microsoft Edge installed)
 *
 * Starts the local preview server, opens /brochure in headless Chrome, checks that no A4 sheet
 * overflows, and prints it to assets/Aaradhya-Enviro-Company-Profile.pdf.
 * Set CHROME_PATH if Chrome is installed somewhere unusual.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const { start } = require('./serve');

const root = path.join(__dirname, '..');
const OUT = path.join(root, 'assets', 'Aaradhya-Enviro-Company-Profile.pdf');
const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].filter(Boolean);
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const chrome = candidates.find(p => fs.existsSync(p));
  if (!chrome) throw new Error('Chrome/Edge not found. Install Chrome or set CHROME_PATH.');
  const server = await start(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  const port = 9200 + Math.floor(Math.random() * 600);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ae-pdf-'));
  const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--disable-extensions', '--no-first-run', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

  try {
    let wsUrl;
    for (let i = 0; i < 150 && !wsUrl; i++) {
      try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page')?.webSocketDebuggerUrl; } catch (e) { /* starting */ }
      if (!wsUrl) await sleep(200);
    }
    if (!wsUrl) throw new Error('Could not connect to Chrome');
    const ws = new WebSocket(wsUrl);
    await new Promise(r => ws.addEventListener('open', r, { once: true }));
    let id = 0;
    const pending = new Map();
    const events = [];
    ws.addEventListener('message', ev => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } else events.push(m);
    });
    const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
    const evaluate = async expression => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.result.value;

    await send('Page.enable');
    await send('Emulation.setEmulatedMedia', { media: 'print' });
    await send('Emulation.setDeviceMetricsOverride', { width: 794, height: 1123, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: `${base}/brochure` });
    for (let i = 0; i < 100 && !events.some(e => e.method === 'Page.loadEventFired'); i++) await sleep(100);
    await evaluate(`(async () => {
      document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; });
      await document.fonts.ready;
      await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
    })()`);
    await sleep(500);

    // Every sheet must fit on its A4 page.
    const overflow = await evaluate(`[...document.querySelectorAll('.sheet')].map((s, i) => ({ page: i + 1, over: s.scrollHeight - s.clientHeight })).filter(x => x.over > 1)`);
    if (overflow.length) console.warn('WARNING – content overflows A4 on: ' + overflow.map(o => `page ${o.page} (+${o.over}px)`).join(', '));

    const res = await send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 });
    if (!res.result) throw new Error('printToPDF failed: ' + JSON.stringify(res.error));
    const buf = Buffer.from(res.result.data, 'base64');
    fs.writeFileSync(OUT, buf);
    const pages = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log(`PDF: ${path.relative(root, OUT)}  ${pages} pages  ${(buf.length / 1048576).toFixed(2)} MB`);
    ws.close();
    return overflow.length ? 1 : 0;
  } finally {
    proc.kill();
    server.close();
    // Chrome may still hold files for a moment on Windows; leftovers in the temp folder are harmless.
    setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* locked */ } }, 1500);
  }
}

main().then(code => { process.exitCode = code; }).catch(e => { console.error(e.message); process.exit(1); });
