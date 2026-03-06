const fs = require('fs');
const html = fs.readFileSync('d:/My Web Sites/aaradhya 2 - V0/products.html', 'utf8');
const match = html.match(/<img[^>]*Fire-Sprinkler-Set[^>]*>/);
console.log(match ? match[0] : 'Not found');
