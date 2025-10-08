#!/usr/bin/env node

/**
 * Extract Video IDs from Channel Page HTML
 * This script can parse HTML content to extract all video IDs
 */

const fs = require('fs');
const path = require('path');

// Function to extract video IDs from HTML content
function extractVideoIdsFromHTML(htmlContent) {
  const videoIds = new Set();
  
  // Multiple regex patterns to find video IDs
  const videoIdPatterns = [
    /"videoId":"([a-zA-Z0-9_-]{11})"/g,
    /watch\?v=([a-zA-Z0-9_-]{11})/g,
    /\/embed\/([a-zA-Z0-9_-]{11})/g,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/g,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/g,
    /"url":"https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/g
  ];
  
  videoIdPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(htmlContent)) !== null) {
      videoIds.add(match[1]);
    }
  });
  
  return Array.from(videoIds);
}

// Function to save video IDs to a file
function saveVideoIds(videoIds, filename) {
  const content = `// Extracted video IDs from channel page
// Total videos found: ${videoIds.length}
// Generated on: ${new Date().toISOString()}

const EXTRACTED_VIDEO_IDS = [
${videoIds.map(id => `  "${id}"`).join(',\n')}
];

module.exports = { EXTRACTED_VIDEO_IDS };
`;

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`✅ Saved ${videoIds.length} video IDs to ${filename}`);
}

// Main function
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('📋 Video ID Extractor');
    console.log('====================');
    console.log('');
    console.log('Usage:');
    console.log('  node extract-video-ids-from-html.js <html-file>');
    console.log('');
    console.log('Or provide HTML content directly:');
    console.log('  node extract-video-ids-from-html.js --html "<html content>"');
    console.log('');
    console.log('To get the channel HTML:');
    console.log('1. Go to https://www.youtube.com/@FurniturePackagesUSAvideo/videos');
    console.log('2. Scroll down to load ALL videos (this may take a while)');
    console.log('3. Right-click and "View Page Source"');
    console.log('4. Save the HTML to a file');
    console.log('5. Run this script with the HTML file');
    return;
  }
  
  let htmlContent = '';
  
  if (args[0] === '--html') {
    htmlContent = args[1];
  } else {
    const htmlFile = args[0];
    if (!fs.existsSync(htmlFile)) {
      console.error(`❌ File not found: ${htmlFile}`);
      return;
    }
    htmlContent = fs.readFileSync(htmlFile, 'utf8');
  }
  
  console.log('🔍 Extracting video IDs from HTML...');
  const videoIds = extractVideoIdsFromHTML(htmlContent);
  
  console.log(`✅ Found ${videoIds.length} unique video IDs`);
  
  if (videoIds.length > 0) {
    // Save to file
    const outputFile = path.join(__dirname, 'extracted-video-ids.js');
    saveVideoIds(videoIds, outputFile);
    
    // Show sample
    console.log('\n📋 Sample video IDs:');
    videoIds.slice(0, 10).forEach((id, index) => {
      console.log(`  ${index + 1}. ${id}`);
    });
    
    if (videoIds.length > 10) {
      console.log(`  ... and ${videoIds.length - 10} more`);
    }
    
    console.log('\n✅ Next steps:');
    console.log('1. Review the extracted video IDs');
    console.log('2. Run the comprehensive scraper with these IDs');
    console.log('3. This should capture all 636+ videos from the channel');
  } else {
    console.log('❌ No video IDs found in the HTML content');
    console.log('Make sure the HTML contains the full channel page with all videos loaded');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { extractVideoIdsFromHTML, saveVideoIds };



