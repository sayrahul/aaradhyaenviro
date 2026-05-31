const fs = require('fs');
const path = require('path');

/**
 * Image Optimization Script
 * 
 * This script provides instructions for optimizing images.
 * For actual optimization, you'll need to install image processing tools.
 * 
 * Recommended tools:
 * 1. Sharp (Node.js): npm install sharp
 * 2. ImageMagick: https://imagemagick.org/
 * 3. Squoosh CLI: npm install -g @squoosh/cli
 * 4. cwebp (Google): https://developers.google.com/speed/webp/download
 */

console.log('🖼️  Image Optimization Guide\n');
console.log('=' .repeat(60));

console.log('\n📦 Install optimization tools:\n');
console.log('Option 1 - Sharp (Recommended):');
console.log('  npm install sharp --save-dev\n');

console.log('Option 2 - Squoosh CLI:');
console.log('  npm install -g @squoosh/cli\n');

console.log('Option 3 - Manual tools:');
console.log('  - ImageOptim (Mac): https://imageoptim.com/');
console.log('  - Squoosh (Web): https://squoosh.app/');
console.log('  - TinyPNG (Web): https://tinypng.com/\n');

console.log('=' .repeat(60));
console.log('\n🔧 Optimization Commands:\n');

console.log('Using Sharp (create optimize-with-sharp.js):');
console.log(`
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);
}

// Usage:
// optimizeImage('assets/Hero.jpg', 'assets/Hero.webp');
`);

console.log('\nUsing Squoosh CLI:');
console.log('  squoosh-cli --webp \'{"quality":80}\' assets/**/*.{jpg,png}\n');

console.log('Using cwebp (Google):');
console.log('  cwebp -q 80 assets/Hero.jpg -o assets/Hero.webp\n');

console.log('=' .repeat(60));
console.log('\n📊 Images to optimize:\n');

const imageDirs = [
  'assets/gallery',
  'assets/Clients',
  'assets/Products',
  'assets/images',
  'assets'
];

let totalSize = 0;
let imageCount = 0;

imageDirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  
  if (fs.existsSync(fullPath)) {
    const files = fs.readdirSync(fullPath);
    const images = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    
    if (images.length > 0) {
      console.log(`\n${dir}/`);
      images.forEach(img => {
        const imgPath = path.join(fullPath, img);
        const stats = fs.statSync(imgPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        totalSize += stats.size;
        imageCount++;
        console.log(`  - ${img} (${sizeKB} KB)`);
      });
    }
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n📈 Summary:`);
console.log(`  Total images: ${imageCount}`);
console.log(`  Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`  Estimated size after optimization: ${(totalSize / 1024 / 1024 * 0.3).toFixed(2)} MB (70% reduction)`);

console.log('\n✅ Next steps:');
console.log('  1. Choose an optimization tool from above');
console.log('  2. Run optimization on all images');
console.log('  3. Update HTML to use WebP with fallbacks');
console.log('  4. Add loading="lazy" to all images\n');
