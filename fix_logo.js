const fs = require('fs');
const path = require('path');

function processHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace navbar logo class (h-16 -> h-12)
    content = content.replace(/class="h-16 w-auto bg-white rounded p-1"/g, 'class="h-12 sm:h-14 w-auto bg-white rounded p-1"');

    // Replace footer logo class (h-14 sm:h-16 -> h-12 sm:h-14)
    content = content.replace(/class="h-14 sm:h-16 w-auto bg-white rounded-lg p-2"/g, 'class="h-12 sm:h-14 w-auto bg-white rounded-lg p-1"');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed logo size in', filePath);
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
console.log('Done fixing logo size');
