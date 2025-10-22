/**
 * Flickr HTML Parser
 * 
 * This script parses saved Flickr album HTML files and extracts photo data.
 * 
 * Usage:
 * 1. Save each Flickr album page as an HTML file (right-click > Save As > Complete Page)
 * 2. Place them in the ./flickr-html/ directory
 * 3. Run: node parse-flickr-html.js
 */

const fs = require('fs');
const path = require('path');

// Define the album URLs and their metadata
const albumMetadata = [
  {
    id: 'champions-gate-luxury',
    title: 'Champions Gate Luxury Estate',
    location: 'Champions Gate, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    filename: 'album-1.html'
  },
  {
    id: 'champions-gate-modern',
    title: 'Champions Gate Modern Villa',
    location: 'Champions Gate, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    filename: 'album-2.html'
  },
  {
    id: 'windsor-resort',
    title: 'Windsor Resort Estate',
    location: 'Windsor, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381',
    filename: 'album-3.html'
  },
  {
    id: 'reunion-paradise',
    title: 'Reunion Paradise Home',
    location: 'Reunion, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386',
    filename: 'album-4.html'
  },
  {
    id: 'storey-lake',
    title: 'Storey Lake Retreat',
    location: 'Kissimmee, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761',
    filename: 'album-5.html'
  },
  {
    id: 'orlando-villa',
    title: 'Orlando Luxury Villa',
    location: 'Orlando, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282',
    filename: 'album-6.html'
  },
  {
    id: 'kissimmee-estate',
    title: 'Kissimmee Premium Estate',
    location: 'Kissimmee, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147',
    filename: 'album-7.html'
  },
  {
    id: 'vacation-home-1',
    title: 'Modern Vacation Home',
    location: 'Orlando, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016',
    filename: 'album-8.html'
  },
  {
    id: 'vacation-home-2',
    title: 'Contemporary Resort Home',
    location: 'Kissimmee, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720303794132',
    filename: 'album-9.html'
  },
  {
    id: 'vacation-home-3',
    title: 'Elegant Vacation Property',
    location: 'Orlando, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157711887679752',
    filename: 'album-10.html'
  },
  {
    id: 'vacation-home-4',
    title: 'Family Resort Home',
    location: 'Kissimmee, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710956178362',
    filename: 'album-11.html'
  }
];

/**
 * Extract photo data from Flickr HTML
 */
function parseFlickrHTML(html, albumMeta) {
  const photos = [];
  
  // Method 1: Look for modelExport JSON data (most reliable)
  const modelExportMatch = html.match(/modelExport:\s*({[\s\S]*?})\s*,\s*reqId/);
  if (modelExportMatch) {
    try {
      const modelData = JSON.parse(modelExportMatch[1]);
      
      // Navigate through the complex Flickr data structure
      if (modelData && modelData['photo-models-flickr-feed']) {
        const photoModels = modelData['photo-models-flickr-feed'];
        
        for (const key in photoModels) {
          const photo = photoModels[key];
          if (photo && photo.engagement) {
            const photoId = photo.id || key;
            
            // Extract available image sizes
            let photoUrl = '';
            if (photo.sizes) {
              // Prefer large size (1024px or 1600px width)
              photoUrl = photo.sizes.l?.url || photo.sizes.c?.url || photo.sizes.z?.url || photo.sizes.m?.url || '';
            }
            
            // Fallback: construct URL from photo data
            if (!photoUrl && photo.server && photo.id && photo.secret) {
              photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
            }
            
            if (photoUrl) {
              photos.push({
                id: photoId,
                url: photoUrl,
                title: photo.title || photo.engagement?.title || 'Untitled',
                width: photo.width || 1024,
                height: photo.height || 683
              });
            }
          }
        }
      }
    } catch (e) {
      console.error(`Error parsing modelExport JSON for ${albumMeta.title}:`, e.message);
    }
  }
  
  // Method 2: Look for img tags with data-defer-src or src attributes
  if (photos.length === 0) {
    const imgRegex = /<img[^>]*(?:data-defer-src|src)="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi;
    let match;
    
    while ((match = imgRegex.exec(html)) !== null) {
      let imgUrl = match[1];
      const alt = match[2];
      
      // Filter for actual photo images (not icons, avatars, etc.)
      if (imgUrl.includes('live.staticflickr.com') || imgUrl.includes('staticflickr.com')) {
        // Upgrade to higher resolution if possible
        imgUrl = imgUrl.replace(/_[a-z]\.jpg/, '_b.jpg'); // b = 1024px
        
        photos.push({
          id: `photo-${photos.length + 1}`,
          url: imgUrl,
          title: alt || 'Untitled',
          width: 1024,
          height: 683
        });
      }
    }
  }
  
  // Method 3: Look for JSON-LD structured data
  if (photos.length === 0) {
    const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    let match;
    
    while ((match = jsonLdRegex.exec(html)) !== null) {
      try {
        const jsonData = JSON.parse(match[1]);
        
        if (jsonData['@type'] === 'ImageGallery' && jsonData.image) {
          jsonData.image.forEach((img, index) => {
            photos.push({
              id: `photo-${index + 1}`,
              url: img.contentUrl || img.url,
              title: img.name || img.caption || 'Untitled',
              width: img.width || 1024,
              height: img.height || 683
            });
          });
        }
      } catch (e) {
        // Ignore JSON parsing errors
      }
    }
  }
  
  // Remove duplicates based on URL
  const uniquePhotos = [];
  const seen = new Set();
  
  for (const photo of photos) {
    if (!seen.has(photo.url)) {
      seen.add(photo.url);
      uniquePhotos.push(photo);
    }
  }
  
  return uniquePhotos;
}

/**
 * Main processing function
 */
function processAllAlbums() {
  const htmlDir = path.join(__dirname, 'flickr-html');
  const outputFile = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-scraped.ts');
  
  // Check if HTML directory exists
  if (!fs.existsSync(htmlDir)) {
    console.log(`Creating directory: ${htmlDir}`);
    fs.mkdirSync(htmlDir, { recursive: true });
    console.log('\n⚠️  Please save your Flickr album HTML files to:');
    console.log(`   ${htmlDir}`);
    console.log('\nName them as: album-1.html, album-2.html, etc.');
    console.log('Then run this script again.');
    return;
  }
  
  const projects = [];
  
  for (const albumMeta of albumMetadata) {
    const htmlPath = path.join(htmlDir, albumMeta.filename);
    
    if (!fs.existsSync(htmlPath)) {
      console.log(`⚠️  Missing: ${albumMeta.filename}`);
      continue;
    }
    
    console.log(`\n📸 Processing: ${albumMeta.title}`);
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const photos = parseFlickrHTML(html, albumMeta);
    
    if (photos.length === 0) {
      console.log(`   ⚠️  No photos found!`);
      continue;
    }
    
    console.log(`   ✓ Found ${photos.length} photos`);
    
    // Set the first photo as cover
    const coverPhoto = photos[0]?.url || '';
    
    projects.push({
      ...albumMeta,
      coverPhoto,
      description: `Complete vacation rental transformation featuring modern design and premium finishes`,
      photos
    });
  }
  
  // Generate TypeScript file
  const tsContent = `/**
 * Flickr Projects Data - Auto-generated
 * Generated: ${new Date().toISOString()}
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
  
  fs.writeFileSync(outputFile, tsContent);
  console.log(`\n✅ Successfully generated: ${outputFile}`);
  console.log(`   Total projects: ${projects.length}`);
  console.log(`   Total photos: ${projects.reduce((sum, p) => sum + p.photos.length, 0)}`);
}

// Run the script
processAllAlbums();


