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

    const relativeDepth = path.relative(projectDir, file).split(path.sep).length - 1;
    const prefix = relativeDepth > 0 ? '../'.repeat(relativeDepth) : '';

    const unhash = {
        'Fire-Sprinkler-Set': 'Products/Fire-Sprinkler-Set.jpg',
        'Fire-Hoses': 'Products/Fire-Hoses.jpg',
        'Foam-Monitor': 'Products/Foam-Monitor.jpg',
        'Water-Monitor': 'Products/Water-Monitor.jpg',
        'Hose-Reel': 'Products/Hose-Reel.jpg',
        'Branch-Pipe': 'Products/Branch-Pipe.jpg',
        'Hose-Box': 'Products/Hose-Box.jpg',
        'MCP': 'Products/MCP.jpg',
        'hero-bg': 'hero-bg.png',
        'achv-img': 'achv-img.png',
        'logo-nobag': 'logo-nobag.png',
        'RD-PRINT-PACK_FINAL-1': 'Clients/RD-PRINT-PACK_FINAL-1.4df16c61.png',
        'gubba.': 'Clients/gubba.06238cc0.gif',
        'madhura.': 'Clients/madhura.0890c8bc.png',
        'logo.4c584ba3': 'Clients/logo.4c584ba3.png',
        'parason-stock': 'Clients/parason-stock-preparation-line-logo (1).7638b3cd.svg',
        'Harman.': 'Clients/Harman.b51306ca.png',
        'Tooltech.': 'Clients/Tooltech.8e251bfa.png',
        'Adora.': 'Clients/Adora.6646c0b4.png',
        'Fintek.': 'Clients/Fintek.3986403a.png',
        'icon_splogo_blue': 'Clients/icon_splogo_blue.64911754.svg',
        'Chandra.': 'Clients/Chandra.6b3d2876.png',
        'Cast.': 'Clients/Cast.a925d9fe.png',
        'Sunshine.': 'Clients/Sunshine.d078e9e1.png',
        'Posliva.': 'Clients/Posliva.f3736eae.png',
        'NHK.': 'Clients/NHK.6e52d012.png',
        'Deshmukh.': 'Clients/Deshmukh.dd02d0c7.png'
    };

    content = content.replace(/<img([^>]*)>/gi, (match, attrs) => {
        let newAttrs = attrs;
        let pMatch;
        let matched = false;

        for (const key in unhash) {
            if (attrs.includes(key)) {
                newAttrs = newAttrs.replace(/src="[^"]*"/i, `src="${prefix}assets/${unhash[key]}"`);
                matched = true;
                break;
            }
        }

        if (!matched) {
            if (attrs.match(/g[1-7]\./)) {
                let m = attrs.match(/g([1-7])\./);
                if (m) newAttrs = newAttrs.replace(/src="[^"]*"/i, `src="${prefix}assets/gallery/g${m[1]}.jpg"`);
            } else if (attrs.includes('img1.')) {
                newAttrs = newAttrs.replace(/src="[^"]*"/i, `src="${prefix}assets/images/img1.jpg"`);
            } else if (attrs.includes('img3.')) {
                newAttrs = newAttrs.replace(/src="[^"]*"/i, `src="${prefix}assets/images/img3.jpg"`);
            } else if (attrs.includes('img5.')) {
                newAttrs = newAttrs.replace(/src="[^"]*"/i, `src="${prefix}assets/images/img5.jpg"`);
            } else if (attrs.includes('img6.')) {
                newAttrs = newAttrs.replace(/src="[^"]*"/i, `src="${prefix}assets/images/img6.jpg"`);
            } else if (attrs.includes('img7.')) {
                newAttrs = newAttrs.replace(/src="[^"]*"/i, `src="${prefix}assets/images/img7.jpg"`);
            } else if (attrs.includes('certificate')) {
                newAttrs = newAttrs.replace(/src="[^"]*"/i, `src="${prefix}assets/certificate.png"`);
            }
        }

        // Remove tracking attributes again just in case
        newAttrs = newAttrs.replace(/srcSet="[^"]*"/ig, '');
        newAttrs = newAttrs.replace(/sizes="[^"]*"/ig, '');
        newAttrs = newAttrs.replace(/data-nimg="[^"]*"/ig, '');
        newAttrs = newAttrs.replace(/decoding="async"/ig, '');
        newAttrs = newAttrs.replace(/loading="lazy"/ig, '');

        if (newAttrs !== attrs) return `<img${newAttrs}>`;
        return match;
    });

    // Also download missing images from gallery if they are there
    // Found out that gallery images are G1-G12
    content = content.replace(/assets\/g([8-9]|1[0-2])\.[a-f0-9]+\.jpg/g, 'assets/gallery/g$1.jpg')

    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
}

console.log(`${changedFiles} files processed successfully for images.`);
