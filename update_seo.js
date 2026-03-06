const fs = require('fs');
const path = require('path');

function processHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace brand name text
    content = content.replace(/Gurukrupa Fire Services/g, 'Aaradhya Enviro');
    content = content.replace(/Gurukrupa/g, 'Aaradhya Enviro'); // Just in case

    // Replace URL text
    content = content.replace(/gurukrupafireservices/g, 'aaradhyaenviro');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed SEO', filePath);
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
console.log('Done fixing SEO');
