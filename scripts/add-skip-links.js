const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Script to add skip navigation links to all HTML files
 */

const skipLinkHTML = `
<!-- Skip Link for Accessibility -->
<a href="#main-content" class="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-orange-600 focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
  Skip to main content
</a>
`;

function addSkipLinkToFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if skip link is already added
    if (content.includes('skip-link') || content.includes('Skip to main content')) {
      console.log(`⏭️  Skipped (already has skip link): ${filePath}`);
      return false;
    }
    
    // Find <body> tag and add skip link after it
    const bodyRegex = /<body[^>]*>/;
    const match = content.match(bodyRegex);
    
    if (!match) {
      console.log(`⚠️  Warning: No <body> tag found in ${filePath}`);
      return false;
    }
    
    // Insert skip link after <body> tag
    const bodyTag = match[0];
    content = content.replace(bodyTag, bodyTag + skipLinkHTML);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Added skip link to: ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Adding skip navigation links to all HTML files...\n');
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  // Process all HTML files
  const allFiles = glob.sync('**/*.html', { 
    cwd: __dirname + '/..',
    ignore: ['node_modules/**']
  });
  
  allFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const result = addSkipLinkToFile(filePath);
    if (result === true) successCount++;
    else if (result === false) skipCount++;
    else errorCount++;
  });
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`  ✅ Successfully updated: ${successCount} files`);
  console.log(`  ⏭️  Skipped (already done): ${skipCount} files`);
  console.log(`  ❌ Errors: ${errorCount} files`);
  console.log('='.repeat(60));
  
  if (successCount > 0) {
    console.log('\n✨ Done! Skip links have been added to HTML files.');
    console.log('⚠️  Note: You still need to add id="main-content" to main content areas.');
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { addSkipLinkToFile };
