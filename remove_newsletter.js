const fs = require('fs');
const path = require('path');

function processHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove the newsletter section
    content = content.replace(/<div class="mt-12 lg:mt-16 pt-8 border-t border-gray-700">[\s\S]*?<div class="text-center">[\s\S]*?<h3 class="text-lg sm:text-xl font-bold text-white mb-4">Stay Updated[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="mt-12 pt-8 border-t border-gray-700">/ig, '<div class="mt-12 lg:mt-16 pt-8 border-t border-gray-700">');

    // Also remove single line versions if present
    content = content.replace(/<div class="mt-12 lg:mt-16 pt-8 border-t border-gray-700"><div class="text-center"><h3 class="text-lg sm:text-xl font-bold text-white mb-4">Stay Updated[\s\S]*?<\/button><\/div><\/div><\/div><div class="mt-12 pt-8 border-t border-gray-700">/ig, '<div class="mt-12 lg:mt-16 pt-8 border-t border-gray-700">');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', filePath);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && file !== 'node_modules' && file !== 'assets' && file !== '.git') {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processHtml(fullPath);
        }
    }
}

traverseDir('d:\\My Web Sites\\aaradhya 2');
console.log('Done removing newsletter form');
