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

const mobileMenuHtml = `
<!-- Mobile Menu Fallback -->
<div id="mobile-menu" class="fixed inset-0 z-[100] bg-white hidden flex-col transition-transform transform translate-x-full">
  <div class="flex items-center justify-between p-4 border-b">
    <a href="index.html" class="flex items-center space-x-2">
      <img src="assets/logo-nobag.png" alt="Logo" class="w-8 h-8" />
      <div>
        <h1 class="text-sm font-bold text-orange-500 uppercase leading-tight">Gurukrupa</h1>
        <h2 class="text-xs font-bold text-gray-800 uppercase leading-tight">Fire Services</h2>
      </div>
    </a>
    <button id="close-mobile-menu" class="p-2 text-gray-600 hover:text-orange-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
  <div class="flex-1 overflow-y-auto py-4 px-6 flex flex-col space-y-4">
    <a href="index.html" class="text-lg font-semibold text-gray-800 hover:text-orange-500 border-b pb-2">Home</a>
    <a href="about.html" class="text-lg font-semibold text-gray-800 hover:text-orange-500 border-b pb-2">About Us</a>
    <a href="services.html" class="text-lg font-semibold text-gray-800 hover:text-orange-500 border-b pb-2">Services</a>
    <div class="pl-4 flex flex-col space-y-2">
      <a href="services/engineering-services-consultancy.html" class="text-base text-gray-600 hover:text-orange-500">Engineering & Consultancy</a>
      <a href="fire-systems.html" class="text-base text-gray-600 hover:text-orange-500">Fire Systems</a>
      <a href="extinguishers.html" class="text-base text-gray-600 hover:text-orange-500">Equipment</a>
      <a href="services/annual-maintenance.html" class="text-base text-gray-600 hover:text-orange-500">Maintenance & Support</a>
    </div>
    <a href="products.html" class="text-lg font-semibold text-gray-800 hover:text-orange-500 border-b pb-2">Products</a>
    <a href="gallery.html" class="text-lg font-semibold text-gray-800 hover:text-orange-500 border-b pb-2">Gallery</a>
    <a href="contact.html" class="text-lg font-semibold text-gray-800 hover:text-orange-500 border-b pb-2">Contact Us</a>
  </div>
</div>
<!-- /Mobile Menu Fallback -->
`;

const mobileMenuScript = `
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
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.remove('translate-x-full');
            }, 10);
        }

        function closeMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.add('translate-x-full');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }

        // Remove any old listeners by replacing the node (though not strictly necessary since original was React)
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

    // Completely replace old fallback if it exists
    if (content.includes('id="mobile-menu"')) {
        content = content.replace(/<!-- Mobile Menu Fallback -->[\s\S]*?<!-- \/Mobile Menu Fallback -->/, mobileMenuHtml);
        content = content.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => {[\s\S]*?\}\);\s*<\/script>/, mobileMenuScript);
    } else {
        content = content.replace('</body>', mobileMenuHtml + '\\n' + mobileMenuScript + '\\n</body>');
    }

    // Process relative paths
    const relativeDepth = path.relative(projectDir, file).split(path.sep).length - 1;
    const prefix = relativeDepth > 0 ? '../'.repeat(relativeDepth) : '';

    if (prefix && content.includes(mobileMenuHtml)) {
        let modifiedMenuHtml = mobileMenuHtml.replace(/href="([^"]+)"/g, 'href="' + prefix + '$1"');
        modifiedMenuHtml = modifiedMenuHtml.replace(/src="([^"]+)"/g, 'src="' + prefix + '$1"');
        content = content.replace(mobileMenuHtml, modifiedMenuHtml);
    }

    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
}

console.log(changedFiles + ' files processed. Mobile menu updated.');
