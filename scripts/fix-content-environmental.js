const fs = require('fs');
const path = require('path');

/**
 * Automated Content Fix Script
 * Changes all "Fire Safety" references to "Environmental Consultancy"
 */

const replacements = [
  // Business descriptions
  {
    find: /Premier fire safety services company/gi,
    replace: 'Premier environmental consultancy services company'
  },
  {
    find: /fire safety solutions provider/gi,
    replace: 'environmental consultancy services provider'
  },
  {
    find: /fire safety services/gi,
    replace: 'environmental consultancy services'
  },
  {
    find: /fire safety company/gi,
    replace: 'environmental consultancy company'
  },
  
  // Service names
  {
    find: /Fire Extinguisher Services/g,
    replace: 'Environmental Compliance Services'
  },
  {
    find: /fire extinguisher supply/gi,
    replace: 'ETP/STP installation'
  },
  {
    find: /Fire Sprinkler Systems/g,
    replace: 'Pollution Control Systems'
  },
  {
    find: /sprinkler systems/gi,
    replace: 'water treatment systems'
  },
  {
    find: /Fire AMC Services/g,
    replace: 'Environmental Maintenance Services'
  },
  {
    find: /fire audit/gi,
    replace: 'environmental audit'
  },
  {
    find: /24\/7 emergency services/gi,
    replace: 'comprehensive compliance support'
  },
  
  // Team names
  {
    find: /Fire Safety Expert Team/g,
    replace: 'Environmental Consultancy Expert Team'
  },
  
  // Titles and descriptions
  {
    find: /Leading Fire Safety Company/g,
    replace: 'Leading Environmental Consultancy'
  },
  {
    find: /Best Fire Safety/gi,
    replace: 'Best Environmental Consultancy'
  },
  {
    find: /Fire Safety Products/g,
    replace: 'Environmental Equipment'
  },
  {
    find: /Fire Protection Equipment/g,
    replace: 'Environmental Solutions'
  },
  {
    find: /Fire Protection Systems/g,
    replace: 'Environmental Management Systems'
  },
  
  // Specific equipment mentions
  {
    find: /fire extinguishers, hydrant valves, hose reels/gi,
    replace: 'ETP/STP systems, RO plants, pollution control equipment'
  },
  {
    find: /Fire extinguishers, sprinkler systems, fire audit/gi,
    replace: 'MPCB compliance, ETP/STP installation, environmental clearances'
  },
  {
    find: /fire extinguisher Aurangabad/gi,
    replace: 'environmental compliance Aurangabad'
  },
  {
    find: /fire AMC Maharashtra/gi,
    replace: 'environmental consultancy Maharashtra'
  },
  
  // Service descriptions in JSON-LD
  {
    find: /Supply, installation, and maintenance of all types of fire extinguishers/g,
    replace: 'MPCB legal compliance, consent applications, and statutory filings'
  },
  {
    find: /Design, installation, and maintenance of fire sprinkler systems/g,
    replace: 'Design, installation, and commissioning of effluent and sewage treatment plants'
  },
  {
    find: /Annual maintenance contracts for fire safety equipment/g,
    replace: 'Annual maintenance contracts for environmental equipment and compliance support'
  },
  {
    find: /Fire Safety Audit/g,
    replace: 'Environmental Audit & Compliance'
  },
  
  // Meta keywords
  {
    find: /fire safety Sambhajinagar, fire extinguisher Aurangabad, fire services Maharashtra/gi,
    replace: 'environmental consultancy Sambhajinagar, MPCB compliance Aurangabad, environmental services Maharashtra'
  },
  {
    find: /fire AMC Sambhajinagar, fire safety training Aurangabad, fire system installation/gi,
    replace: 'ETP STP installation Sambhajinagar, environmental clearances Aurangabad, pollution control systems'
  },
  
  // Comprehensive service descriptions
  {
    find: /Expert fire extinguisher services, fire system installation, AMC, and sa\.\.\./g,
    replace: 'Expert MPCB compliance, ETP/STP installation, environmental clearances, and pollution control...'
  },
  {
    find: /Expert Environmental extinguisher supply, installation, AMC, sprinkler syst\.\.\./g,
    replace: 'Expert ETP/STP installation, MPCB compliance, environmental clearances, air & water pollution control...'
  },
  
  // Duplicate phone number fix
  {
    find: /<a href="tel:9975929212"[^>]*>99759 29212<\/a>\s*\|\s*<a href="tel:9975929212"[^>]*>99759 29212<\/a>/g,
    replace: '<a href="tel:9975929212" class="hover:underline">99759 29212</a>'
  }
];

function fixContentInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changesMade = 0;
    
    replacements.forEach(({ find, replace }) => {
      const matches = content.match(find);
      if (matches) {
        content = content.replace(find, replace);
        changesMade += matches.length;
      }
    });
    
    if (changesMade > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${changesMade} items in: ${path.basename(filePath)}`);
      return changesMade;
    } else {
      console.log(`⏭️  No changes needed: ${path.basename(filePath)}`);
      return 0;
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return -1;
  }
}

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function main() {
  console.log('🔧 Fixing content to focus on Environmental Consultancy...\n');
  console.log('=' .repeat(70));
  
  let totalChanges = 0;
  let filesUpdated = 0;
  let filesSkipped = 0;
  let errors = 0;
  
  // Get all HTML files
  const rootDir = path.join(__dirname, '..');
  const allFiles = getAllHtmlFiles(rootDir);
  
  console.log(`\n📄 Found ${allFiles.length} HTML files to process\n`);
  
  allFiles.forEach(filePath => {
    const changes = fixContentInFile(filePath);
    
    if (changes > 0) {
      totalChanges += changes;
      filesUpdated++;
    } else if (changes === 0) {
      filesSkipped++;
    } else {
      errors++;
    }
  });
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 Summary:');
  console.log(`  ✅ Files updated: ${filesUpdated}`);
  console.log(`  📝 Total changes: ${totalChanges}`);
  console.log(`  ⏭️  Files skipped: ${filesSkipped}`);
  console.log(`  ❌ Errors: ${errors}`);
  console.log('='.repeat(70));
  
  if (filesUpdated > 0) {
    console.log('\n✨ Success! All content has been updated to Environmental Consultancy focus.');
    console.log('\n📋 Changes made:');
    console.log('  • Fire Safety → Environmental Consultancy');
    console.log('  • Fire Extinguisher Services → Environmental Compliance Services');
    console.log('  • Fire Sprinkler Systems → Pollution Control Systems');
    console.log('  • Fire AMC → Environmental Maintenance');
    console.log('  • Fire Safety Expert Team → Environmental Consultancy Expert Team');
    console.log('  • Fixed duplicate phone numbers');
    console.log('\n⚠️  Next steps:');
    console.log('  1. Review changes in a few files to verify');
    console.log('  2. Test website in browser');
    console.log('  3. Run: npm run build');
    console.log('  4. Deploy to production');
  } else {
    console.log('\n⚠️  No changes were made. Files may already be updated.');
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { fixContentInFile };
