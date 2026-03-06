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

    // Desktop Navbar Regex
    const desktopRex = /<a[^>]*class="[^"]*flex items-center space-x-2 sm:space-x-3 group[^"]*"[^>]*href="(?:[^"]*\/)?index\.html"[^>]*>[\s\S]*?(?:<\/div>\s*){2}<\/a>/i;

    // Mobile Menu inserted by my previous script
    const mobileRex = /<a href="(?:[^"]*\/)?index\.html" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">[\s\S]*?<\/a>/;

    // Footer Logo Block Regex (assuming it contains logo-nobag.png and Gurukrupa text)
    // Looking for a div that has the logo image and the text following it
    const footerRex = /<a[^>]*href="(?:[^"]*\/)?index\.html"[^>]*class="flex items-center justify-center lg:justify-start gap-4 mb-6"[^>]*>[\s\S]*?<\/a>/i;

    // Backup broader footer match if classes differ
    const fallbackFooterRex = /<div class="flex flex-col items-center lg:items-start[^>]*>[\s\S]*?<a[^>]*href="(?:[^"]*\/)?index\.html"[^>]*>[\s\S]*?<img[^>]*src="[^"]*logo-nobag\.png"[\s\S]*?<\/a>/i;

    const relativeDepth = path.relative(projectDir, file).split(path.sep).length - 1;
    const prefix = relativeDepth > 0 ? '../'.repeat(relativeDepth) : '';
    const logoSrc = prefix + 'assets/aaradhya-logo-img.png';
    const indexHref = prefix + 'index.html';

    const newDesktopNav = `
        <a class="flex items-center group" href="${indexHref}">
            <img alt="Aaradhya Enviro Logo" class="h-10 sm:h-12 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105" src="${logoSrc}" />
        </a>`;

    const newMobileNav = `
        <a href="${indexHref}" style="display: flex; align-items: center; text-decoration: none;">
            <img src="${logoSrc}" alt="Aaradhya Enviro Logo" style="height: 36px; width: auto;" />
        </a>`;

    const newFooterNav = `
        <a href="${indexHref}" class="flex items-center justify-center lg:justify-start mb-6">
            <img src="${logoSrc}" alt="Aaradhya Enviro Logo" class="h-14 sm:h-16 w-auto bg-white rounded-lg p-2" />
        </a>`;

    let changed = false;

    if (content.match(desktopRex)) {
        content = content.replace(desktopRex, newDesktopNav);
        changed = true;
    }

    if (content.match(mobileRex)) {
        content = content.replace(mobileRex, newMobileNav);
        changed = true;
    }

    if (content.match(footerRex)) {
        content = content.replace(footerRex, newFooterNav);
        changed = true;
    } else {
        // Broad replace for anywhere logo-nobag is used with Gurukrupa text
        const anyLogoHtml = /<div class="relative"><img[^>]*src="[^"]*logo-nobag\.png"[^>]*><\/div>\s*<div class="block">\s*<h[1-4][^>]*>Gurukrupa<\/h[1-4]>\s*<h[1-4][^>]*>Fire Services<\/h[1-4]>\s*<\/div>/ig;
        if (content.match(anyLogoHtml)) {
            content = content.replace(anyLogoHtml, `<img alt="Aaradhya Enviro Logo" class="h-16 w-auto bg-white rounded p-1" src="${logoSrc}" />`);
            changed = true;
        }
    }

    // Check title tag specifically
    if (content.includes('<title>')) {
        content = content.replace(/Gurukrupa Fire Services/g, 'Aaradhya Enviro');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
    }
}

console.log(changedFiles + ' files updated with the new Aaradhya Enviro logo.');
