const fs = require('fs');

function extractUrls(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const urls = new Set();
    
    // match src="url" or href="url"
    const srcRegex = /(?:src|href)="([^"]+)"/g;
    let match;
    while ((match = srcRegex.exec(html)) !== null) {
        if (match[1].startsWith('http') || match[1].includes('_next')) {
            urls.add(match[1]);
        }
    }

    // match srcSet URLs
    const srcSetRegex = /srcSet="([^"]+)"/ig;
    while ((match = srcSetRegex.exec(html)) !== null) {
        const parts = match[1].split(',');
        for (const part of parts) {
            const url = part.trim().split(' ')[0];
            if (url) urls.add(url);
        }
    }

    // output unique urls
    const arr = [...urls].filter(u => u.includes('image?url=') || u.includes('.jpg') || u.includes('.png'));
    console.log(arr.join('\n'));
}

extractUrls(process.argv[2] || 'index.html');
