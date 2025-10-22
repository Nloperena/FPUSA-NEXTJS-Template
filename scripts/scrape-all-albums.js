/**
 * MULTI-ALBUM FLICKR SCRAPER
 * 
 * Paste HTML for ALL albums below, then run this script once!
 * 
 * INSTRUCTIONS:
 * 1. For each album, add an entry to the ALBUMS array below
 * 2. Paste the full HTML from each Flickr album page
 * 3. Run: node scrape-all-albums.js
 * 4. The script will generate flickr-projects-full.ts with all data
 */

// ============================================
// PASTE YOUR HTML FOR EACH ALBUM HERE
// ============================================

const ALBUMS = [
  {
    // ALBUM 1 - Champions Gate Luxury
    info: {
      id: 'champions-gate-luxury',
      title: 'Champions Gate Luxury Estate',
      location: 'Champions Gate, FL',
      category: 'highlight',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456'
    },
    html: `
PASTE HTML FOR ALBUM 1 HERE (View Page Source, Ctrl+A, Ctrl+C)
    `
  },
  
  {
    // ALBUM 2 - Champions Gate Modern
    info: {
      id: 'champions-gate-modern',
      title: 'Champions Gate Modern Villa',
      location: 'Champions Gate, FL',
      category: 'highlight',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456'
    },
    html: `
PASTE HTML FOR ALBUM 2 HERE
    `
  },
  
  {
    // ALBUM 3 - Windsor Resort
    info: {
      id: 'windsor-resort',
      title: 'Windsor Resort Estate',
      location: 'Windsor, FL',
      category: 'highlight',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381'
    },
    html: `
PASTE HTML FOR ALBUM 3 HERE
    `
  },
  
  {
    // ALBUM 4 - Reunion Paradise
    info: {
      id: 'reunion-paradise',
      title: 'Reunion Paradise Home',
      location: 'Reunion, FL',
      category: 'highlight',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386'
    },
    html: `
PASTE HTML FOR ALBUM 4 HERE
    `
  },
  
  {
    // ALBUM 5 - Storey Lake
    info: {
      id: 'storey-lake',
      title: 'Storey Lake Retreat',
      location: 'Kissimmee, FL',
      category: 'highlight',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761'
    },
    html: `
PASTE HTML FOR ALBUM 5 HERE
    `
  },
  
  {
    // ALBUM 6 - Orlando Villa
    info: {
      id: 'orlando-villa',
      title: 'Orlando Luxury Villa',
      location: 'Orlando, FL',
      category: 'highlight',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282'
    },
    html: `
PASTE HTML FOR ALBUM 6 HERE
    `
  },
  
  {
    // ALBUM 7 - Kissimmee Estate
    info: {
      id: 'kissimmee-estate',
      title: 'Kissimmee Premium Estate',
      location: 'Kissimmee, FL',
      category: 'highlight',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147'
    },
    html: `
PASTE HTML FOR ALBUM 7 HERE
    `
  },
  
  {
    // ALBUM 8 - Modern Vacation Home
    info: {
      id: 'vacation-home-1',
      title: 'Modern Vacation Home',
      location: 'Orlando, FL',
      category: 'standard',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016'
    },
    html: `
PASTE HTML FOR ALBUM 8 HERE
    `
  },
  
  {
    // ALBUM 9 - Contemporary Resort Home
    info: {
      id: 'vacation-home-2',
      title: 'Contemporary Resort Home',
      location: 'Kissimmee, FL',
      category: 'standard',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720303794132'
    },
    html: `
PASTE HTML FOR ALBUM 9 HERE
    `
  },
  
  {
    // ALBUM 10 - Elegant Vacation Property
    info: {
      id: 'vacation-home-3',
      title: 'Elegant Vacation Property',
      location: 'Orlando, FL',
      category: 'standard',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157711887679752'
    },
    html: `
PASTE HTML FOR ALBUM 10 HERE
    `
  },
  
  {
    // ALBUM 11 - Family Resort Home
    info: {
      id: 'vacation-home-4',
      title: 'Family Resort Home',
      location: 'Kissimmee, FL',
      category: 'standard',
      albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710956178362'
    },
    html: `
PASTE HTML FOR ALBUM 11 HERE
    `
  }
];

// ============================================
// EXTRACTION CODE (Don't modify below)
// ============================================

const fs = require('fs');
const path = require('path');

function extractPhotos(html, albumInfo) {
  const photos = [];
  const seen = new Set();
  
  console.log(`\n🔍 Processing: ${albumInfo.title}`);
  
  // Method 1: Extract from modelExport JSON (most reliable)
  try {
    const modelExportMatch = html.match(/modelExport:\s*({[\s\S]*?})\s*,\s*(?:reqId|modelData)/);
    if (modelExportMatch) {
      const jsonStr = modelExportMatch[1];
      const modelData = JSON.parse(jsonStr);
      
      // Look for photo-models or photo data
      const photoModels = modelData['photo-models'] || modelData['photo-models-flickr-feed'] || {};
      
      for (const key in photoModels) {
        const photo = photoModels[key];
        if (photo && (photo.id || photo.sizes)) {
          const photoId = photo.id || key;
          let photoUrl = '';
          
          // Extract the best available size
          if (photo.sizes) {
            photoUrl = photo.sizes.l?.url || photo.sizes.c?.url || photo.sizes.z?.url || photo.sizes.m?.url || '';
          } else if (photo.server && photo.id && photo.secret) {
            photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
          }
          
          if (photoUrl && !seen.has(photoUrl)) {
            seen.add(photoUrl);
            photos.push({
              id: `${albumInfo.id}-${photos.length + 1}`,
              url: photoUrl,
              title: photo.title || photo.engagement?.title || `${albumInfo.title} - Photo ${photos.length + 1}`,
              width: photo.width || 1024,
              height: photo.height || 683
            });
          }
        }
      }
    }
  } catch (e) {
    console.log(`   ⚠️  ModelExport parsing failed: ${e.message}`);
  }
  
  // Method 2: Look for Y.photo.models or window.YUI_config
  if (photos.length === 0) {
    try {
      const yuiMatch = html.match(/Y\.photo\.models\s*=\s*({[\s\S]*?});/);
      if (yuiMatch) {
        const yuiData = JSON.parse(yuiMatch[1]);
        if (yuiData.photos) {
          yuiData.photos.forEach(photo => {
            const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
            if (!seen.has(photoUrl)) {
              seen.add(photoUrl);
              photos.push({
                id: `${albumInfo.id}-${photos.length + 1}`,
                url: photoUrl,
                title: photo.title || `${albumInfo.title} - Photo ${photos.length + 1}`,
                width: 1024,
                height: 683
              });
            }
          });
        }
      }
    } catch (e) {
      console.log(`   ⚠️  YUI parsing failed: ${e.message}`);
    }
  }
  
  // Method 3: Extract from script tags containing flickr URLs
  if (photos.length === 0) {
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    
    while ((match = scriptRegex.exec(html)) !== null) {
      const scriptContent = match[1];
      
      // Look for staticflickr URLs
      const urlRegex = /https:\/\/live\.staticflickr\.com\/(\d+)\/(\d+)_([a-z0-9]+)_[a-z]\.jpg/gi;
      let urlMatch;
      
      while ((urlMatch = urlRegex.exec(scriptContent)) !== null) {
        const server = urlMatch[1];
        const photoId = urlMatch[2];
        const secret = urlMatch[3];
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
    }
  }
  
  // Method 4: Extract from img tags
  if (photos.length === 0) {
    const imgRegex = /<img[^>]*(?:src|data-defer-src)="(https:\/\/live\.staticflickr\.com\/[^"]+)"[^>]*>/gi;
    let match;
    
    while ((match = imgRegex.exec(html)) !== null) {
      let url = match[1];
      url = url.replace(/_[a-z]\.jpg$/, '_b.jpg');
      
      if (!seen.has(url)) {
        seen.add(url);
        photos.push({
          id: `${albumInfo.id}-${photos.length + 1}`,
          url: url,
          title: `${albumInfo.title} - Photo ${photos.length + 1}`,
          width: 1024,
          height: 683
        });
      }
    }
  }
  
  console.log(`   ✓ Found ${photos.length} photos`);
  return photos;
}

function processAllAlbums() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  FLICKR MULTI-ALBUM SCRAPER                ║');
  console.log('╚════════════════════════════════════════════╝');
  
  const projects = [];
  let totalPhotos = 0;
  
  for (const album of ALBUMS) {
    // Skip if HTML hasn't been pasted
    if (album.html.includes('PASTE HTML FOR ALBUM')) {
      console.log(`\n⚠️  SKIPPED: ${album.info.title} (no HTML pasted)`);
      continue;
    }
    
    const photos = extractPhotos(album.html, album.info);
    
    if (photos.length === 0) {
      console.log(`   ❌ No photos extracted!`);
      continue;
    }
    
    totalPhotos += photos.length;
    
    projects.push({
      ...album.info,
      coverPhoto: photos[0]?.url || '',
      description: 'Complete vacation rental transformation featuring modern design and premium finishes',
      photos: photos
    });
  }
  
  // Generate TypeScript file
  if (projects.length === 0) {
    console.log('\n❌ No projects processed!');
    console.log('   Please paste HTML for at least one album and try again.\n');
    return;
  }
  
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');
  
  const tsContent = `/**
 * Flickr Projects Data
 * Auto-generated from Flickr albums
 * Generated: ${new Date().toLocaleString()}
 */

export interface ProjectPhoto {
  id: string;
  url: string;
  title: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: 'highlight' | 'standard';
  albumUrl: string;
  coverPhoto: string;
  description: string;
  photos: ProjectPhoto[];
}

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
  
  fs.writeFileSync(outputPath, tsContent);
  
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  ✅ SUCCESS!                               ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`\n📁 Generated: ${outputPath}`);
  console.log(`📊 Projects: ${projects.length}`);
  console.log(`📸 Total Photos: ${totalPhotos}`);
  console.log(`\n🎉 Your photos are now ready to use!\n`);
}

// Run the script
processAllAlbums();


