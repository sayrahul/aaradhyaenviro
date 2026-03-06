const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const htmlFiles = [];

function findHtmlFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        if (item === 'assets' || item === 'node_modules' || item.includes('V0')) continue;
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            findHtmlFiles(fullPath);
        } else if (item.endsWith('.html') || item === '404' || item === '404-2' || item === '404-3') {
            htmlFiles.push(fullPath);
        }
    }
}
findHtmlFiles(projectDir);

let changedFiles = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove HTTrack comments
    content = content.replace(/<!-- Mirrored from .*? -->\r?\n?/g, '');
    content = content.replace(/<!-- Added by HTTrack -->.*?<!-- \/Added by HTTrack -->\r?\n?/gs, '');

    // 2. Remove Google Tag function
    content = content.replace(/<script>\s*window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\];\s*function\s+gtag\(\)\{dataLayer\.push\(arguments\);\}\s*gtag\('js',\s*new\s+Date\(\)\);\s*gtag\('config',\s*'[^']+'\);\s*<\/script>/gs, '');
    content = content.replace(/<script\s+async=""\s+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"]+"><\/script>/g, '');

    // 3. Remove Google site verification
    content = content.replace(/<meta\s+name="google-site-verification"\s+content="[^"]+"\s*\/?>/g, '');

    // 4. CSS links
    content = content.replace(/href="https:\/\/www\.gurukrupafireservices\.com\/_next\/static\/css\/cf6d95645304868a\.css"/g, 'href="/assets/css/main.css"');
    content = content.replace(/href="https:\/\/www\.gurukrupafireservices\.com\/_next\/static\/css\/[a-zA-Z0-9]+\.css"/g, 'href="/assets/css/layout.css"');

    // Fix paths based on depth
    const relativeDepth = path.relative(projectDir, file).split(path.sep).length - 1;
    const prefix = relativeDepth > 0 ? '../'.repeat(relativeDepth) : '';

    // Use prefix on CSS just in case
    content = content.replace(/href="\/assets\/css\//g, `href="${prefix}assets/css/`);

    // 5. Font preload
    content = content.replace(/href="https:\/\/www\.gurukrupafireservices\.com\/_next\/static\/media\/e4af272ccee01ff0-s\.p\.woff2"/g, `href="${prefix}assets/fonts/e4af272ccee01ff0-s.p.woff2"`);

    // 6. Remove Next.js script chunks
    content = content.replace(/<script src="https:\/\/www\.gurukrupafireservices\.com\/_next\/static\/chunks\/[^"]+"\s*(?:async="")?><\/script>/g, '');
    content = content.replace(/<link rel="preload" as="script" fetchPriority="low" href="https:\/\/www\.gurukrupafireservices\.com\/_next\/static\/chunks\/[^"]+"\/>/g, '');

    // 7. Process Images
    content = content.replace(/<link rel="preload" as="image" imageSrcSet="[^"]+"\s*imageSizes="[^"]+"\/>/g, '');

    // Replacing images by finding 'url=' inside src
    content = content.replace(/<img([^>]*)>/gi, (match, attrs) => {
        let realSrc = null;
        let pMatch;

        // Find src url directly instead of srcset
        // e.g. src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFire-Sprinkler-Set.c88a8550.jpg&amp;w=640&amp;q=75"
        const srcMatch = attrs.match(/src="([^"]+)"/i);
        if (srcMatch && srcMatch[1].includes('url=')) {
            const urlMatch = srcMatch[1].match(/url=([^&]+)&/);
            if (urlMatch) {
                const decoded = decodeURIComponent(urlMatch[1]);
                const fname = decoded.split('/').pop();

                // Route image to correct folder based on its filename
                let cat = '';
                if (['Fire-Sprinkler-Set', 'Fire-Hoses', 'Foam-Monitor', 'Water-Monitor', 'Hose-Reel', 'Branch-Pipe', 'Hose-Box', 'MCP'].some(x => fname.includes(x))) {
                    cat = 'Products/';
                } else if (/^g[1-9][0-9]*\./.test(fname)) {
                    cat = 'gallery/';
                } else if (['RD-PRINT-PACK_FINAL', 'gubba', 'madhura',
                    'logo.4c584ba3', 'parason-stock',
                    'Harman', 'Tooltech', 'Adora', 'Fintek',
                    'icon_splogo_blue', 'Chandra', 'Cast',
                    'Sunshine', 'Posliva', 'NHK', 'Deshmukh'].some(x => fname.includes(x))) {
                    cat = 'Clients/';
                } else if (fname.startsWith('img')) {
                    cat = 'images/';
                }

                // Strip the hash from filename if it matches (e.g. g2.e4cbcc8b.jpg -> g2.jpg)
                let cleanFname = fname;

                // List of known names needing unhashing
                const unhash = {
                    'Fire-Sprinkler-Set': 'Fire-Sprinkler-Set.jpg',
                    'Fire-Hoses': 'Fire-Hoses.jpg',
                    'Foam-Monitor': 'Foam-Monitor.jpg',
                    'Water-Monitor': 'Water-Monitor.jpg',
                    'Hose-Reel': 'Hose-Reel.jpg',
                    'Branch-Pipe': 'Branch-Pipe.jpg',
                    'Hose-Box': 'Hose-Box.jpg',
                    'MCP': 'MCP.jpg',
                    'certificate.jpg': 'certificate.png', // Fallback, sometimes it's named png
                    'certificate.png': 'certificate.png',
                    'hero-bg': 'hero-bg.png',
                    'achv-img': 'achv-img.png',
                    'logo-nobag': 'logo-nobag.png'
                };

                for (const key in unhash) {
                    if (fname.includes(key)) {
                        cleanFname = unhash[key];
                        cat = cat || '';
                        break;
                    }
                }

                // Clean g1..g7
                if (/^g[1-7]\./.test(fname)) {
                    cleanFname = fname.replace(/\.[a-f0-9]+\.jpg$/i, '.jpg');
                } else if (fname.includes('RD-PRINT-PACK_FINAL-1')) {
                    cleanFname = 'RD-PRINT-PACK_FINAL-1.4df16c61.png';
                }

                realSrc = `${prefix}assets/${cat}${cleanFname}`;
            }
        }

        let newAttrs = attrs;
        if (realSrc) {
            newAttrs = newAttrs.replace(/src="[^"]*"/, `src="${realSrc}"`);
            newAttrs = newAttrs.replace(/srcSet="[^"]*"/ig, '');
            newAttrs = newAttrs.replace(/sizes="[^"]*"/ig, '');
            newAttrs = newAttrs.replace(/data-nimg="[^"]*"/ig, '');
        }

        return `<img${newAttrs}>`;
    });

    // 8. Fix favicon
    content = content.replace(/href="favicon\.ico"/g, `href="${prefix}favicon.ico"`);

    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
}

console.log(`${changedFiles} files processed successfully.`);
