/**
 * Automated Album Integration Script
 * Replaces placeholder projects with real Flickr data
 */

const fs = require('fs');
const path = require('path');

// Album data to integrate (from scraper output)
const albums = {
  // Album 4 - Storey Lake (replaces Project 5)
  'storey-lake': {
    replaceId: 'contemporary-luxury-villa',
    data: require('./album4-data.json')
  },
  // Album 5 - Orlando Villa (replaces Project 6)
  'orlando-villa': {
    replaceId: 'classic-vacation-rental',
    data: require('./album5-data.json')
  }
};

const targetFile = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');

console.log('📝 Reading current file...');
let content = fs.readFileSync(targetFile, 'utf-8');

console.log('🔄 Replacing placeholder projects with real Flickr data...\n');

// For each album, replace the placeholder
for (const [albumId, config] of Object.entries(albums)) {
  const { replaceId, data } = config;
  
  // Find the placeholder project
  const projectRegex = new RegExp(
    `  \\/\\/ Highlight Project \\d+\\s+\\{[\\s\\S]*?id: '${replaceId}'[\\s\\S]*?\\},`,
    'g'
  );
  
  if (projectRegex.test(content)) {
    console.log(`✅ Found placeholder: ${replaceId}`);
    console.log(`   Replacing with: ${albumId} (${data.photos.length} photos)`);
    
    // Generate the TypeScript project object
    const projectCode = `  // ${data.title} - REAL FLICKR DATA ✅
  ${JSON.stringify(data, null, 2).replace(/^/gm, '  ')},`;
    
    // Reset regex
    projectRegex.lastIndex = 0;
    content = content.replace(projectRegex, projectCode);
  } else {
    console.log(`⚠️  Could not find placeholder: ${replaceId}`);
  }
}

console.log('\n💾 Writing updated file...');
fs.writeFileSync(targetFile, content);

console.log('✅ Integration complete!\n');


