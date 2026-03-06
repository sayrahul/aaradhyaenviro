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

const newMobileMenuHtml = `
<!-- Mobile Menu Fallback -->
<div id="mobile-menu" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; background: #ffffff !important; display: none; flex-direction: column; overflow-y: auto; transform: translateX(100%); transition: transform 0.3s ease-in-out; box-shadow: -5px 0 15px rgba(0,0,0,0.1);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid #e5e7eb; background: #ffffff;">
    <a href="index.html" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
      <img src="assets/logo-nobag.png" alt="Logo" style="width: 32px; height: 32px;" />
      <div>
        <h1 style="font-size: 14px; font-weight: bold; color: #f97316; text-transform: uppercase; margin: 0; line-height: 1.2;">Gurukrupa</h1>
        <h2 style="font-size: 12px; font-weight: bold; color: #1f2937; text-transform: uppercase; margin: 0; line-height: 1.2;">Fire Services</h2>
      </div>
    </a>
    <button id="close-mobile-menu" style="padding: 8px; color: #4b5563; background: transparent; border: none; cursor: pointer;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
  <div style="flex: 1; padding: 24px;">
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <a href="index.html" style="font-size: 18px; font-weight: 600; color: #1f2937; text-decoration: none; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">Home</a>
      <a href="about.html" style="font-size: 18px; font-weight: 600; color: #1f2937; text-decoration: none; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">About Us</a>
      <a href="services.html" style="font-size: 18px; font-weight: 600; color: #1f2937; text-decoration: none; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">Services</a>
      <div style="padding-left: 16px; display: flex; flex-direction: column; gap: 12px;">
        <a href="services/engineering-services-consultancy.html" style="font-size: 16px; color: #4b5563; text-decoration: none;">Engineering & Consultancy</a>
        <a href="fire-systems.html" style="font-size: 16px; color: #4b5563; text-decoration: none;">Fire Systems</a>
        <a href="extinguishers.html" style="font-size: 16px; color: #4b5563; text-decoration: none;">Equipment</a>
        <a href="services/annual-maintenance.html" style="font-size: 16px; color: #4b5563; text-decoration: none;">Maintenance & Support</a>
      </div>
      <a href="products.html" style="font-size: 18px; font-weight: 600; color: #1f2937; text-decoration: none; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">Products</a>
      <a href="gallery.html" style="font-size: 18px; font-weight: 600; color: #1f2937; text-decoration: none; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">Gallery</a>
    </div>
    <div style="margin-top: 32px;">
      <a href="contact.html" style="display: block; width: 100%; text-align: center; background: #f97316; color: white; padding: 12px 0; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 16px;">Contact Us</a>
    </div>
  </div>
</div>
<!-- /Mobile Menu Fallback -->
`;

const newMobileMenuScript = `
<script>
(function() {
    function initMobileMenu() {
        const hamburgerBtn = document.querySelector('button.lg\\\\:hidden[aria-label="Toggle mobile menu"]') || document.querySelector('nav button.lg\\\\:hidden');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('close-mobile-menu');

        if (!hamburgerBtn || !mobileMenu) return;

        function openMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.style.display = 'flex';
            // small delay to allow display:block to apply before animating transform
            setTimeout(() => {
                mobileMenu.style.transform = 'translateX(0)';
            }, 10);
        }

        function closeMenu(e) {
            if (e) {
               e.preventDefault();
               e.stopPropagation();
            }
            mobileMenu.style.transform = 'translateX(100%)';
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        }

        const newBtn = hamburgerBtn.cloneNode(true);
        hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);
        
        newBtn.addEventListener('click', openMenu);
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
</script>
`;

let changedFiles = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace the old injected fallback with the newly styled one
    const oldMenuRegex = /<!-- Mobile Menu Fallback -->[\s\S]*?<!-- \/Mobile Menu Fallback -->/g;
    const oldScriptRegex = /<script>\s*\(function\(\) \{[\s\S]*?\}\)\(\);\s*<\/script>/g;

    let currentHtml = newMobileMenuHtml;
    let currentScript = newMobileMenuScript;

    // Correct paths based on file depths
    const relativeDepth = path.relative(projectDir, file).split(path.sep).length - 1;
    const prefix = relativeDepth > 0 ? '../'.repeat(relativeDepth) : '';

    if (prefix) {
        currentHtml = currentHtml.replace(/href="([^"']+(?:\.html|#))"/g, 'href="' + prefix + '$1"');
        currentHtml = currentHtml.replace(/src="([^"']+)"/g, 'src="' + prefix + '$1"');
    }

    if (content.match(oldMenuRegex)) {
        content = content.replace(oldMenuRegex, currentHtml);
        content = content.replace(oldScriptRegex, currentScript);
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
    }
}

console.log(changedFiles + ' files updated with inline-styled mobile menu.');
