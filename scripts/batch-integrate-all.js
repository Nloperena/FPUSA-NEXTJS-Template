/**
 * Batch Integration Script - Extracts and Integrates ALL Albums
 * Replaces all placeholder projects with real Flickr data
 */

const fs = require('fs');
const path = require('path');

// Album configurations
const albums = [
  { num: 3, id: 'reunion-paradise', title: 'Reunion Paradise Home', location: 'Reunion, FL', category: 'highlight', albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386', replaceProject: 3 },
  { num: 4, id: 'storey-lake', title: 'Storey Lake Retreat', location: 'Kissimmee, FL', category: 'highlight', albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761', replaceProject: 5 },
  { num: 5, id: 'orlando-villa', title: 'Orlando Luxury Villa', location: 'Orlando, FL', category: 'highlight', albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282', replaceProject: 6 },
  { num: 6, id: 'kissimmee-estate', title: 'Kissimmee Premium Estate', location: 'Kissimmee, FL', category: 'highlight', albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147', replaceProject: 7 },
  { num: 7, id: 'album-7', title: 'Premium Resort Home', location: 'Orlando, FL', category: 'standard', albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016', replaceProject: 8 },
  { num: 8, id: 'vacation-home-1', title: 'Modern Vacation Home', location: 'Orlando, FL', category: 'standard', albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016', replaceProject: 9 },
];

function extractPhotos(html, albumInfo) {
  const photos = [];
  const seen = new Set();
  
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
  
  return photos;
}

console.log('╔════════════════════════════════════════════╗');
console.log('║  BATCH ALBUM EXTRACTION & INTEGRATION     ║');
console.log('╚════════════════════════════════════════════╝\n');

const extractedData = [];

// Extract all albums
for (const albumConfig of albums) {
  const htmlPath = path.join(__dirname, `album${albumConfig.num}.html`);
  
  if (!fs.existsSync(htmlPath)) {
    console.log(`⚠️  Missing: album${albumConfig.num}.html`);
    continue;
  }
  
  console.log(`🔍 Processing Album ${albumConfig.num}: ${albumConfig.title}`);
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const photos = extractPhotos(html, albumConfig);
  
  console.log(`   ✓ Found ${photos.length} photos\n`);
  
  const projectData = {
    id: albumConfig.id,
    title: albumConfig.title,
    location: albumConfig.location,
    category: albumConfig.category,
    albumUrl: albumConfig.albumUrl,
    coverPhoto: photos[0]?.url || '',
    description: 'Complete vacation rental transformation featuring modern design and premium finishes',
    photos: photos
  };
  
  extractedData.push({
    ...albumConfig,
    data: projectData
  });
}

// Save extracted data
const outputFile = path.join(__dirname, 'extracted-albums-data.json');
fs.writeFileSync(outputFile, JSON.stringify(extractedData, null, 2));

console.log(`✅ Extracted ${extractedData.length} albums`);
console.log(`📁 Data saved to: extracted-albums-data.json`);
console.log(`📸 Total photos: ${extractedData.reduce((sum, a) => sum + a.data.photos.length, 0)}\n`);

console.log('🎉 Extraction complete! Data ready for integration.');
console.log('📝 Next: Review extracted-albums-data.json and confirm before integrating.\n');


