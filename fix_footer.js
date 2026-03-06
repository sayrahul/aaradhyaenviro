const fs = require('fs');
const path = require('path');

function processHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Fix the messy copyright
    content = content.replace(/<p class="text-gray-400 text-sm">©.*?All Rights Reserved\.<\/p>/g, '<p class="text-gray-400 text-sm">© 2025 Aaradhya Enviro. All Rights Reserved.</p>');

    // Fix developer credit
    content = content.replace(/<p class="text-xs text-gray-500">Design and Developed by.*?<\/p>/gi, '<p class="text-xs text-gray-500">Design and Developed by <a href="https://www.proventure.in/" target="_blank" rel="noopener noreferrer" class="text-orange-400 hover:text-orange-300 transition-colors duration-200 font-medium">Proventure Digital Agency</a></p>');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', filePath);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && file !== 'node_modules' && file !== 'assets') {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processHtml(fullPath);
        }
    }
}

traverseDir('d:\\My Web Sites\\aaradhya 2');
console.log('Done fixing footer');
