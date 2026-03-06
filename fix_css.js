const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'assets', 'css', 'main.css');

if (fs.existsSync(cssFile)) {
    let content = fs.readFileSync(cssFile, 'utf8');

    // Remove Google Fonts API call
    content = content.replace(/@font-face\{font-family:Inter;src:url\(https:\/\/fonts\.googleapis\.com[^\)]+\)\s+format\(\\"woff2\\"\);font-weight:400;font-style:normal;font-display:swap\}/g, '');

    // Sometimes it's without quotes
    content = content.replace(/@font-face\{font-family:Inter;src:url\(https:\/\/fonts\.googleapis\.com[^\)]+\)\s+format\("woff2"\)[^\}]+\}/g, '');

    // Replace Next.js absolute font paths with relative paths
    content = content.replace(/url\(\/_next\/static\/media\/([^\)]+)\)/g, 'url(../fonts/$1)');

    fs.writeFileSync(cssFile, content, 'utf8');
    console.log('main.css updated successfully.');
} else {
    console.log('main.css not found.');
}
