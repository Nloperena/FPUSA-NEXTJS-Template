/**
 * FLICKR HTML FILE SCRAPER
 * 
 * This version reads HTML from separate files to avoid backtick conflicts
 * 
 * INSTRUCTIONS:
 * 1. Save your Flickr album HTML as "album1.html" in the same directory
 * 2. Update ALBUM_INFO below
 * 3. Run: node scrape-from-file.js
 */

const fs = require('fs');
const path = require('path');

// ============================================
// Album Information - UPDATE THIS
// ============================================
const ALBUM_INFO = {
  id: 'vacation-home-1',
  title: 'Modern Vacation Home',
  location: 'Orlando, FL',
  category: 'standard',
  albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016'
};

// HTML file to read (should be in the scripts directory)
const HTML_FILE = 'album8.html';

// ============================================
// EXTRACTION CODE
// ============================================

function extractPhotos(html, albumInfo) {
  const photos = [];
  const seen = new Set();
  
  console.log(`\n🔍 Processing: ${albumInfo.title}`);
  console.log(`   HTML size: ${(html.length / 1024).toFixed(1)} KB\n`);
  
  // Method 1: Look for staticflickr URLs in the entire HTML
  // Matches both https:// and protocol-relative // URLs
  const urlRegex = /(?:https:)?\/\/live\.staticflickr\.com\/(\d+)\/(\d+)_([a-z0-9]+)_[a-z]\.jpg/gi;
  let match;
  
  while ((match = urlRegex.exec(html)) !== null) {
    const server = match[1];
    const photoId = match[2];
    const secret = match[3];
    const photoUrl = `https://live.staticflickr.com/${server}/${photoId}_${secret}_b.jpg`;
    
    if (!seen.has(photoUrl)) {
      seen.add(photoUrl);
      photos.push({
        id: `${albumInfo.id}-${photos.length + 1}`,
        url: photoUrl,
        title: `${albumInfo.title} - Photo ${photos.length + 1}`,
        width: 1024,
        height: 683
      });
    }
  }
  
  console.log(`   ✓ Found ${photos.length} photos`);
  return photos;
}

// ============================================
// MAIN
// ============================================

try {
  const htmlPath = path.join(__dirname, HTML_FILE);
  
  if (!fs.existsSync(htmlPath)) {
    console.error(`\n❌ ERROR: File not found: ${HTML_FILE}`);
    console.log('\n📝 INSTRUCTIONS:');
    console.log('   1. Go to your Flickr album');
    console.log('   2. Press Ctrl+U (view page source)');
    console.log('   3. Press Ctrl+A, then Ctrl+C (copy all)');
    console.log('   4. Create a file named "album1.html" in the scripts folder');
    console.log('   5. Paste the HTML into that file and save');
    console.log('   6. Run this script again\n');
    process.exit(1);
  }
  
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  FLICKR PHOTO EXTRACTOR                    ║');
  console.log('╚════════════════════════════════════════════╝');
  
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const photos = extractPhotos(html, ALBUM_INFO);
  
  if (photos.length === 0) {
    console.log('\n⚠️  No photos found!');
    console.log('   Make sure the HTML file contains the full Flickr album page.\n');
    process.exit(1);
  }
  
  console.log('\n📸 Photo URLs:\n');
  photos.forEach((photo, index) => {
    console.log(`   ${index + 1}. ${photo.url}`);
  });
  
  console.log('\n\n╔════════════════════════════════════════════╗');
  console.log('║  📋 TYPESCRIPT OBJECT (COPY THIS)         ║');
  console.log('╚════════════════════════════════════════════╝\n');
  
  const projectObject = {
    id: ALBUM_INFO.id,
    title: ALBUM_INFO.title,
    location: ALBUM_INFO.location,
    category: ALBUM_INFO.category,
    albumUrl: ALBUM_INFO.albumUrl,
    coverPhoto: photos[0].url,
    description: 'Complete vacation rental transformation featuring modern design and premium finishes',
    photos: photos
  };
  
  console.log(JSON.stringify(projectObject, null, 2));
  console.log('\n═══════════════════════════════════════════════\n');
  console.log('✅ Copy the JSON above and add it to your flickr-projects-full.ts file!\n');
  
} catch (error) {
  console.error('\n❌ ERROR:', error.message);
  console.log('\nPlease make sure the HTML file is valid and try again.\n');
  process.exit(1);
}

