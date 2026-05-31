const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Script to add main.js to all HTML files
 * This will add the script tag before </body> if not already present
 */

const scriptTag = '\n<!-- Main JavaScript -->\n<script src="assets/js/main.js" defer></script>\n</body>';
const scriptTagServices = '\n<!-- Main JavaScript -->\n<script src="../assets/js/main.js" defer></script>\n</body>';

function addScriptToFile(filePath, isServicePage = false) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if script is already added
    if (content.includes('assets/js/main.js')) {
      console.log(`⏭️  Skipped (already has script): ${filePath}`);
      return false;
    }
    
    // Check if file has </body> tag
    if (!content.includes('</body>')) {
      console.log(`⚠️  Warning: No </body> tag found in ${filePath}`);
      return false;
    }
    
    // Replace </body> with script + </body>
    const tag = isServicePage ? scriptTagServices : scriptTag;
    content = content.replace('</body>', tag);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Added script to: ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Adding main.js to all HTML files...\n');
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  // Process root HTML files
  console.log('📄 Processing root HTML files:');
  const rootFiles = glob.sync('*.html', { cwd: __dirname + '/..' });
  
  rootFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const result = addScriptToFile(filePath, false);
    if (result === true) successCount++;
    else if (result === false) skipCount++;
    else errorCount++;
  });
  
  // Process service HTML files
  console.log('\n📁 Processing service HTML files:');
  const serviceFiles = glob.sync('services/*.html', { cwd: __dirname + '/..' });
  
  serviceFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const result = addScriptToFile(filePath, true);
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
    console.log('\n✨ Done! Script tags have been added to HTML files.');
    console.log('⚠️  Note: You still need to remove inline scripts manually.');
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { addScriptToFile };
