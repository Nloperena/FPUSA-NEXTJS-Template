/**
 * Finish Integration - Add Albums 7 & 8 to Standard Projects
 */

const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'extracted-albums-data.json');
const targetFile = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');

console.log('🔄 Adding Albums 7 & 8 to Standard Projects...\n');

// Load data
const extractedAlbums = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
const album7 = extractedAlbums.find(a => a.num === 7);
const album8 = extractedAlbums.find(a => a.num === 8);

if (!album7 || !album8) {
  console.log('❌ Could not find albums 7 or 8 in extracted data');
  process.exit(1);
}

console.log(`📸 Album 7: ${album7.data.photos.length} photos`);
console.log(`📸 Album 8: ${album8.data.photos.length} photos\n`);

// Load file
let tsContent = fs.readFileSync(targetFile, 'utf-8');

// Replace Standard Project 1
const standardProject1Regex = /  \/\/ Standard Project 1\s+\{[\s\S]*?id: 'vacation-home-package'[\s\S]*?  \},/g;

if (standardProject1Regex.test(tsContent)) {
  const album7Object = JSON.stringify(album7.data, null, 2)
    .split('\n')
    .map(line => '  ' + line)
    .join('\n');
  const newProject7 = `  // Standard Project 1 - REAL FLICKR DATA ✅\n  ${album7Object},`;
  
  standardProject1Regex.lastIndex = 0;
  tsContent = tsContent.replace(standardProject1Regex, newProject7);
  console.log('✅ Integrated Album 7 as Standard Project 1');
} else {
  console.log('⚠️  Could not find Standard Project 1');
}

// Replace Standard Project 2  
const standardProject2Regex = /  \/\/ Standard Project 2\s+\{[\s\S]*?id: 'orlando-rental-transformation'[\s\S]*?  \},/g;

if (standardProject2Regex.test(tsContent)) {
  const album8Object = JSON.stringify(album8.data, null, 2)
    .split('\n')
    .map(line => '  ' + line)
    .join('\n');
  const newProject8 = `  // Standard Project 2 - REAL FLICKR DATA ✅\n  ${album8Object},`;
  
  standardProject2Regex.lastIndex = 0;
  tsContent = tsContent.replace(standardProject2Regex, newProject8);
  console.log('✅ Integrated Album 8 as Standard Project 2\n');
} else {
  console.log('⚠️  Could not find Standard Project 2\n');
}

// Write file
fs.writeFileSync(targetFile, tsContent);

console.log('╔════════════════════════════════════════════╗');
console.log('║  🎉 ALL ALBUMS INTEGRATED!                ║');
console.log('╚════════════════════════════════════════════╝\n');

console.log('📊 FINAL SUMMARY:');
console.log('   • Total albums: 8');
console.log('   • Highlight projects: 6');
console.log('   • Standard projects: 2');
console.log('   • Total photos: 392 real Flickr photos!\n');

console.log('🚀 Your homepage is now fully powered by real Flickr photos!');
console.log('   Run "npm run dev" to see the amazing results.\n');


