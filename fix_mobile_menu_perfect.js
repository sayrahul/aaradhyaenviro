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
<!-- Mobile Menu Fallback Perfect -->
<div id="mobile-menu-backdrop" style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9998; opacity: 0; pointer-events: none; transition: opacity 0.3s ease-in-out;"></div>
<div id="mobile-menu" style="position: fixed; top: 0; right: 0; width: 85%; max-width: 400px; height: 100%; z-index: 9999; background: #ffffff !important; display: flex; flex-direction: column; overflow-y: auto; transform: translateX(100%); transition: transform 0.3s ease-in-out; box-shadow: -5px 0 15px rgba(0,0,0,0.1);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid #f3f4f6; background: #fff;">
    <a href="index.html" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
      <img src="assets/logo-nobag.png" alt="Logo" style="width: 28px; height: auto;" />
      <div>
        <h1 style="font-size: 14px; font-weight: 700; color: #f97316; margin: 0; line-height: 1.1;">GURUKRUPA</h1>
        <h2 style="font-size: 11px; font-weight: 700; color: #374151; margin: 0; line-height: 1.1;">FIRE SERVICES</h2>
      </div>
    </a>
    <button id="close-mobile-menu" style="padding: 4px; color: #4b5563; background: transparent; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
  <div style="flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 4px;">
    
    <a href="index.html" class="mm-link mm-home" style="display: block; padding: 12px 16px; background: #fff7ed; color: #ea580c; font-weight: 600; font-size: 15px; border-radius: 8px; text-decoration: none; border: none;">Home</a>
    <a href="about.html" class="mm-link" style="display: block; padding: 12px 16px; color: #374151; font-weight: 600; font-size: 15px; border-radius: 8px; text-decoration: none; border-bottom: 1px solid transparent;">About Us</a>
    
    <div style="border-bottom: 1px solid transparent;">
        <button class="mobile-accordion-btn" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; color: #374151; font-weight: 600; font-size: 15px; background: transparent; border: none; cursor: pointer;">
            Services
            <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.2s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="mobile-accordion-content" style="display: none; padding: 0 16px 12px 32px; flex-direction: column; gap: 12px;">
            <a href="services/engineering-services-consultancy.html" style="font-size: 14px; font-weight: 500; color: #4b5563; text-decoration: none;">Engineering & Consultancy</a>
            <a href="fire-systems.html" style="font-size: 14px; font-weight: 500; color: #4b5563; text-decoration: none;">Fire Systems</a>
            <a href="extinguishers.html" style="font-size: 14px; font-weight: 500; color: #4b5563; text-decoration: none;">Equipment & Products</a>
            <a href="services/annual-maintenance.html" style="font-size: 14px; font-weight: 500; color: #4b5563; text-decoration: none;">Maintenance & Support</a>
        </div>
    </div>

    <div style="border-bottom: 1px solid transparent;">
        <button class="mobile-accordion-btn" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; color: #374151; font-weight: 600; font-size: 15px; background: transparent; border: none; cursor: pointer;">
            Fire Safety
            <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.2s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="mobile-accordion-content" style="display: none; padding: 0 16px 12px 32px; flex-direction: column; gap: 12px;">
            <a href="extinguishers.html" style="font-size: 14px; font-weight: 500; color: #4b5563; text-decoration: none;">Fire Extinguishers</a>
            <a href="fire-systems.html" style="font-size: 14px; font-weight: 500; color: #4b5563; text-decoration: none;">Fire Systems</a>
        </div>
    </div>

    <a href="products.html" class="mm-link" style="display: block; padding: 12px 16px; color: #374151; font-weight: 600; font-size: 15px; border-radius: 8px; text-decoration: none; border-bottom: 1px solid transparent;">Products</a>
    <a href="gallery.html" class="mm-link" style="display: block; padding: 12px 16px; color: #374151; font-weight: 600; font-size: 15px; border-radius: 8px; text-decoration: none; border-bottom: 1px solid transparent;">Gallery</a>
    
    <div style="margin-top: 24px; padding: 0 8px; margin-bottom: 32px;">
      <a href="contact.html" style="display: block; width: 100%; text-align: center; background: #f97316; color: white; padding: 12px 0; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.2);">Contact Us</a>
    </div>
  </div>
</div>
<!-- /Mobile Menu Fallback Perfect -->
`;

const newMobileMenuScript = `
<script>
(function() {
    function initMobileMenu() {
        const hamburgerBtn = document.querySelector('button.lg\\\\:hidden[aria-label="Toggle mobile menu"]') || document.querySelector('nav button.lg\\\\:hidden') || document.querySelector('button[aria-expanded]');
        const mobileMenu = document.getElementById('mobile-menu');
        const backdrop = document.getElementById('mobile-menu-backdrop');
        const closeBtn = document.getElementById('close-mobile-menu');

        if (!hamburgerBtn || !mobileMenu) return;

        function openMenu(e) {
            if(e) { e.preventDefault(); e.stopPropagation(); }
            if(backdrop) {
                backdrop.style.pointerEvents = 'auto';
                backdrop.style.opacity = '1';
            }
            mobileMenu.style.transform = 'translateX(0)';
        }

        function closeMenu(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            if(backdrop) {
                backdrop.style.pointerEvents = 'none';
                backdrop.style.opacity = '0';
            }
            mobileMenu.style.transform = 'translateX(100%)';
        }

        const newBtn = hamburgerBtn.cloneNode(true);
        hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);
        newBtn.addEventListener('click', openMenu);
        
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (backdrop) backdrop.addEventListener('click', closeMenu);

        // Accordion functionality
        const accordions = document.querySelectorAll('.mobile-accordion-btn');
        accordions.forEach(btn => {
            btn.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const chevron = this.querySelector('.chevron');
                if (content.style.display === 'none') {
                    content.style.display = 'flex';
                    if(chevron) chevron.style.transform = 'rotate(180deg)';
                } else {
                    content.style.display = 'none';
                    if(chevron) chevron.style.transform = 'rotate(0deg)';
                }
            });
        });
        
        // Dynamic Active State (Optional, but nice depending on page)
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const allLinks = document.querySelectorAll('.mm-link');
        allLinks.forEach(link => {
             const href = link.getAttribute('href');
             if(href && href.includes(currentPath) && currentPath !== '') {
                  // Reset home which is set by default
                  const homeLink = document.querySelector('.mm-home');
                  if (homeLink && homeLink !== link) {
                       homeLink.style.background = 'transparent';
                       homeLink.style.color = '#374151';
                  }
                  link.style.background = '#fff7ed';
                  link.style.color = '#ea580c';
             }
        });
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

    // First, remove old versions
    content = content.replace(/<!-- Mobile Menu Fallback -->[\s\S]*?<!-- \/Mobile Menu Fallback -->/g, '');
    content = content.replace(/<!-- Mobile Menu Fallback Perfect -->[\s\S]*?<!-- \/Mobile Menu Fallback Perfect -->/g, '');
    content = content.replace(/<script>\s*\(function\(\) \{\s*function initMobileMenu\(\)[\s\S]*?\}\)\(\);\s*<\/script>/g, '');

    // Set up paths correctly relative to current file depth
    const relativeDepth = path.relative(projectDir, file).split(path.sep).length - 1;
    const prefix = relativeDepth > 0 ? '../'.repeat(relativeDepth) : '';

    let htmlToInsert = newMobileMenuHtml;
    if (prefix) {
        htmlToInsert = htmlToInsert.replace(/href="([^"']+(?:\.html|#))"/g, 'href="' + prefix + '$1"');
        htmlToInsert = htmlToInsert.replace(/src="([^"']+)"/g, 'src="' + prefix + '$1"');
    }

    // Insert new version right before </body>
    if (content.includes('</body>')) {
        content = content.replace('</body>', htmlToInsert + '\n' + newMobileMenuScript + '\n</body>');
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
    }
}

console.log(changedFiles + ' files updated with PERFECT mobile menu.');
