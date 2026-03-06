const fs = require('fs');
const path = require('path');

const targetDir = 'd:\\My Web Sites\\aaradhya 2';

function processHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replace Email
    content = content.replace(/gurukrupafireservices@gmail\.com/gi, 'aaradhyaenviro07@gmail.com');
    // Also handle mailto: links just in case
    content = content.replace(/mailto:gurukrupafireservices@gmail\.com/gi, 'mailto:aaradhyaenviro07@gmail.com');

    // Replace Phones
    // Format 1: (+91) 98238-23324
    content = content.replace(/\(\+91\)\s*98238-23324/g, '(+91) 99759-29212');
    // Format 2: 88051-33333
    // We'll just replace 88051-33333 entirely with 99759-29212 or remove the block. The user requested (+91) 99759-29212. I'll replace the secondary number with 99759-29212 as well to prevent old numbers.
    content = content.replace(/88051-33333/g, '99759-29212');
    // Format 3: +91 98238 23324
    content = content.replace(/\+91\s*98238\s*23324/g, '+91 99759 29212');
    // Format 4: +91-9823823324
    content = content.replace(/\+91-9823823324/g, '+91-9975929212');
    // Format 5: 9823823324 (tel links)
    content = content.replace(/9823823324/g, '9975929212');
    content = content.replace(/8805513333/g, '9975929212'); // wait inside tel:+918805513333

    // Replace Address
    // "Plot No. D-84, Shendra MIDC, Chhatrapati Sambhajinagar"
    // "Plot No. D-84, Shendra MIDC"
    content = content.replace(/Plot No\. D-84, Shendra MIDC(?:,\s*Chhatrapati Sambhajinagar)?/gi, '10, Wadgaon Kolhati, MIDC Waluj Area, Chhatrapati Sambhajinagar - 431136');
    // Also "Plot No. D-84, Shendra MIDC" in schemas inside index.html
    content = content.replace(/"streetAddress":"Plot No\. D-84, Shendra MIDC"/g, '"streetAddress":"10, Wadgaon Kolhati, MIDC Waluj Area"');
    content = content.replace(/"postalCode":"431001"/g, '"postalCode":"431136"');

    // Copyright replacement
    // E.g., Gurukrupa Fire Services. All Rights Reserved.
    // E.g. © 2024 Gurukrupa Fire Services. All Rights Reserved.
    // Let's find "All Rights Reserved" and completely rewrite the block
    content = content.replace(/©\s*\d{4}\s*.*?All Rights Reserved\.?/gi, '© 2025 Aaradhya Enviro. All Rights Reserved.');
    // Just in case it's not starting with ©
    content = content.replace(/(?:<span[^>]*>)?Gurukrupa Fire Services(?:<\/span>)?\.\s*All Rights Reserved\./gi, '© 2025 Aaradhya Enviro. All Rights Reserved.');
    // Same for Aaradhya if they already changed owner name
    content = content.replace(/(?:<span[^>]*>)?Aaradhya Enviro(?:<\/span>)?\.\s*All Rights Reserved\./gi, '© 2025 Aaradhya Enviro. All Rights Reserved.');

    // Developer link replacement
    // Currently we don't know the exact developer text. Let's append it if it doesn't exist, or replace "Designed by" blocks.
    // "Design and Developed by Proventure Digital Agency (https://www.proventure.in/)"
    // Let's see if we can find a developer text.
    // Proventure Digital Agency
    const developerHtml = 'Design and Developed by <a href="https://www.proventure.in/" target="_blank" class="hover:underline text-orange-400">Proventure Digital Agency</a>';

    if (/Designed(?: and Developed)? by/i.test(content)) {
        content = content.replace(/Designed(?: and Developed)? by.*?<\/p>/i, developerHtml + '</p>');
        content = content.replace(/Designed(?: and Developed)? by.*?<\/a>/ig, developerHtml);
    } else if (content.includes('All Rights Reserved')) {
        // If developer text doesn't exist but copyright does, we add it next to copyright.
        // E.g. <p>...All Rights Reserved.</p>
        // But since there are divs, maybe we shouldn't arbitrarily add it. The user said "also you can copied content from screen shot".
        // Let's replace Proventure strings if present.
        content = content.replace(/Design(?: and Developed)? by Proventure.*?(?=<\/)/i, 'Design and Developed by Proventure Digital Agency');
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git' && file !== 'assets') {
            traverseDir(fullPath);
        } else if (stat.isFile() && fullPath.endsWith('.html')) {
            processHtml(fullPath);
        }
    }
}

traverseDir(targetDir);
console.log('Done replacing contact info across HTML files.');
