/**
 * Final Integration Script
 * Replaces placeholder projects in flickr-projects-full.ts with real extracted data
 */

const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'extracted-albums-data.json');
const targetFile = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');

console.log('╔════════════════════════════════════════════╗');
console.log('║  FINAL INTEGRATION - FLICKR PROJECTS      ║');
console.log('╚════════════════════════════════════════════╝\n');

// Load extracted data
console.log('📂 Loading extracted album data...');
const extractedAlbums = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

// Load current TypeScript file
console.log('📄 Reading current TypeScript file...\n');
let tsContent = fs.readFileSync(targetFile, 'utf-8');

// Split into lines for easier processing
const lines = tsContent.split('\n');

// Find and replace each placeholder project
for (const album of extractedAlbums) {
  console.log(`🔄 Integrating Album ${album.num}: ${album.title}`);
  console.log(`   → ${album.data.photos.length} photos`);
  console.log(`   → Replacing Highlight Project ${album.replaceProject}\n`);
  
  // Generate the TypeScript project object
  const projectComment = `  // Highlight Project ${album.replaceProject} - REAL FLICKR DATA ✅`;
  const projectObject = JSON.stringify(album.data, null, 2)
    .split('\n')
    .map(line => '  ' + line)
    .join('\n');
  
  const newProject = `${projectComment}\n  ${projectObject},`;
  
  // Find the project by its number comment
  const projectRegex = new RegExp(
    `  \\/\\/ Highlight Project ${album.replaceProject}[^{]*?\\{[\\s\\S]*?  \\},`,
    'g'
  );
  
  if (projectRegex.test(tsContent)) {
    projectRegex.lastIndex = 0;
    tsContent = tsContent.replace(projectRegex, newProject);
    console.log(`   ✅ Successfully integrated!\n`);
  } else {
    console.log(`   ⚠️  Could not find Highlight Project ${album.replaceProject}\n`);
  }
}

// Write updated file
console.log('💾 Writing updated TypeScript file...');
fs.writeFileSync(targetFile, tsContent);

console.log('\n╔════════════════════════════════════════════╗');
console.log('║  ✅ INTEGRATION COMPLETE!                 ║');
console.log('╚════════════════════════════════════════════╝\n');

console.log('📊 Summary:');
console.log(`   • Albums integrated: ${extractedAlbums.length}`);
console.log(`   • Total new photos: ${extractedAlbums.reduce((sum, a) => sum + a.data.photos.length, 0)}`);
console.log(`   • File updated: flickr-projects-full.ts\n`);

console.log('🎉 Your Flickr photos are now live on your homepage!');
console.log('   Run "npm run dev" to see them in action.\n');


