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

    // Remove the transparency style injected by Next.js <Image /> component
    content = content.replace(/style="color:transparent"/g, '');

    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
}

console.log(`${changedFiles} files processed successfully for transparency styles.`);
