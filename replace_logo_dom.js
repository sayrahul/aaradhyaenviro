const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

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
    const dom = new JSDOM(content);
    const document = dom.window.document;
    let changed = false;

    const relativeDepth = path.relative(projectDir, file).split(path.sep).length - 1;
    const prefix = relativeDepth > 0 ? '../'.repeat(relativeDepth) : '';
    const logoSrc = prefix + 'assets/aaradhya-logo-img.png';

    // 1. Desktop Navbar Logo
    const desktopLogoLinks = document.querySelectorAll('header nav a.flex.items-center.group');
    desktopLogoLinks.forEach(link => {
        const hasLogo = link.querySelector('img[src*="logo-nobag.png"], img[src*="main-logo.png"]');
        // In the original, it was a complex div structure with text "Gurukrupa Fire Services"
        if (hasLogo || link.textContent.includes('Gurukrupa')) {
            link.innerHTML = `<img alt="Aaradhya Enviro Logo" class="h-10 sm:h-12 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105" src="${logoSrc}" />`;
            changed = true;
        }
    });

    // Also look for the un-grouped version using the original structure:
    const originalDesktopLogos = document.querySelectorAll('header nav a[href*="index.html"]');
    originalDesktopLogos.forEach(link => {
        if (link.textContent.includes('Gurukrupa') && link.querySelector('img[src*="logo-nobag.png"]')) {
            link.innerHTML = `<img alt="Aaradhya Enviro Logo" class="h-10 sm:h-12 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105" src="${logoSrc}" />`;
            changed = true;
        }
    });

    // 2. Mobile Menu Logo (if injected by our previous script)
    const mobileHeaderDiv = document.getElementById('mobile-menu-header');
    if (mobileHeaderDiv) {
        const logoLink = mobileHeaderDiv.querySelector('a');
        if (logoLink) {
            logoLink.innerHTML = `<img src="${logoSrc}" alt="Aaradhya Enviro Logo" style="height: 36px; width: auto;" />`;
            changed = true;
        }
    }

    // 3. Footer Logo
    const footerLinks = document.querySelectorAll('footer a[href*="index.html"]');
    footerLinks.forEach(link => {
        if (link.textContent.includes('Gurukrupa') && link.querySelector('img[src*="logo-nobag.png"]')) {
            link.innerHTML = `<img src="${logoSrc}" alt="Aaradhya Enviro Logo" class="h-14 sm:h-16 w-auto bg-white rounded-lg p-2" />`;
            changed = true;
        }
    });

    // Broad search for any other occurrence
    const allLinks = document.querySelectorAll('a[href*="index.html"]');
    allLinks.forEach(link => {
        if (link.textContent.includes('Gurukrupa') && link.querySelector('img[src*="logo-nobag.png"]')) {
            link.innerHTML = `<img alt="Aaradhya Enviro Logo" class="h-16 w-auto bg-white rounded p-1" src="${logoSrc}" />`;
            changed = true;
        }
    });

    if (document.title.includes('Gurukrupa Fire Services')) {
        document.title = document.title.replace('Gurukrupa Fire Services', 'Aaradhya Enviro');
        changed = true;
    }

    if (changed) {
        // JSDOM serialize sometimes wraps in html/head/body even if it was a fragment
        // We ensure we preserve the original <!DOCTYPE html> declaration
        let newContent = dom.serialize();
        // Fixing the fact that jsdom might add <html><head><body> to files that didn't strictly format them nicely:
        // Actually, our files are full HTML documents, so dom.serialize() is fine.

        fs.writeFileSync(file, newContent, 'utf8');
        changedFiles++;
    }
}

console.log(changedFiles + ' files updated with the new Aaradhya Enviro logo via JSDOM.');
