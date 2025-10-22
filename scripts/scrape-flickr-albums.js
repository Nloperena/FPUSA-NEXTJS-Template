// Flickr Album Scraper - No API needed
// Run with: node scripts/scrape-flickr-albums.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const ALBUM_URLS = {
  highlight: [
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381',
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386',
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761',
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282',
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147'
  ],
  standard: [
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016',
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720303794132',
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72157711887679752',
    'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710956178362'
  ]
};

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractPhotosFromHTML(html) {
  const photos = [];
  
  // Extract modelExport JSON data from Flickr page
  const modelExportMatch = html.match(/modelExport:\s*({.+?})\s*,\s*reqId:/s);
  
  if (modelExportMatch) {
    try {
      const jsonData = JSON.parse(modelExportMatch[1]);
      const albumData = jsonData['photoset-photos-90'] || jsonData['photo-models-90'];
      
      if (albumData && albumData._data) {
        albumData._data.forEach(photo => {
          const photoId = photo.id;
          const secret = photo.secret;
          const server = photo.server;
          const farm = photo.farm;
          const title = photo.title || 'Untitled';
          
          // Construct photo URLs
          const photoUrl = `https://live.staticflickr.com/${server}/${photoId}_${secret}_b.jpg`;
          const largeUrl = `https://live.staticflickr.com/${server}/${photoId}_${secret}_k.jpg`;
          
          photos.push({
            id: photoId,
            title: title,
            url: photoUrl,
            urlLarge: largeUrl,
            secret: secret,
            server: server,
            farm: farm,
            width: photo.width || 1024,
            height: photo.height || 768
          });
        });
      }
    } catch (e) {
      console.error('Error parsing JSON:', e.message);
    }
  }
  
  // Fallback: Extract from HTML img tags
  if (photos.length === 0) {
    const imgRegex = /<img[^>]+class="[^"]*photo-list-photo-view[^"]*"[^>]+data-defer-src="([^"]+)"/g;
    let match;
    
    while ((match = imgRegex.exec(html)) !== null) {
      const url = match[1].replace(/_[a-z]\.jpg$/, '_b.jpg');
      photos.push({
        id: Date.now() + Math.random(),
        title: 'Photo',
        url: url,
        width: 1024,
        height: 768
      });
    }
  }
  
  return photos;
}

function extractAlbumTitle(html) {
  const titleMatch = html.match(/<h1[^>]*class="[^"]*album-title[^"]*"[^>]*>([^<]+)<\/h1>/);
  if (titleMatch) return titleMatch[1].trim();
  
  const metaTitleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
  if (metaTitleMatch) return metaTitleMatch[1].trim();
  
  return 'Untitled Album';
}

async function scrapeAllAlbums() {
  const results = {
    highlight: [],
    standard: []
  };
  
  console.log('🔍 Starting Flickr album scraper...\n');
  
  for (const category of Object.keys(ALBUM_URLS)) {
    console.log(`\n📂 Scraping ${category} projects...`);
    
    for (const url of ALBUM_URLS[category]) {
      try {
        console.log(`  Fetching: ${url}`);
        const html = await fetchPage(url);
        const title = extractAlbumTitle(html);
        const photos = extractPhotosFromHTML(html);
        
        const albumId = url.match(/albums\/(\d+)/)[1];
        
        results[category].push({
          id: albumId,
          title: title,
          albumUrl: url,
          photoCount: photos.length,
          coverPhoto: photos[0]?.url || '',
          photos: photos
        });
        
        console.log(`  ✅ Found ${photos.length} photos in "${title}"`);
        
        // Be nice to Flickr's servers
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`  ❌ Error scraping ${url}:`, error.message);
      }
    }
  }
  
  // Save to file
  const outputPath = path.join(__dirname, '../src/data/scraped-flickr-projects.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Saved scraped data to: ${outputPath}`);
  
  // Generate TypeScript file
  generateTypeScriptFile(results);
  
  return results;
}

function generateTypeScriptFile(data) {
  let tsContent = `// Auto-generated from Flickr scraper
// Run 'node scripts/scrape-flickr-albums.js' to update

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

export const projects: Project[] = [\n`;

  const locations = [
    'Champions Gate, FL',
    'Orlando, FL',
    'Kissimmee, FL',
    'Reunion, FL',
    'Windsor at Westside, FL',
    'Davenport, FL',
    'Solterra Resort, FL',
    'Clermont, FL'
  ];

  let locationIndex = 0;

  // Process highlight projects
  data.highlight.forEach((album, index) => {
    const location = locations[locationIndex++ % locations.length];
    tsContent += `  {
    id: '${album.id}',
    title: '${album.title.replace(/'/g, "\\'")}',
    location: '${location}',
    category: 'highlight',
    albumUrl: '${album.albumUrl}',
    coverPhoto: '${album.coverPhoto}',
    description: 'Luxury vacation rental transformation with premium design and finishes',
    photos: [\n`;

    album.photos.forEach(photo => {
      const cleanTitle = photo.title.replace(/'/g, "\\'");
      tsContent += `      { id: '${photo.id}', url: '${photo.url}', title: '${cleanTitle}', width: ${photo.width}, height: ${photo.height} },\n`;
    });

    tsContent += `    ]\n  },\n`;
  });

  // Process standard projects
  data.standard.forEach((album, index) => {
    const location = locations[locationIndex++ % locations.length];
    tsContent += `  {
    id: '${album.id}',
    title: '${album.title.replace(/'/g, "\\'")}',
    location: '${location}',
    category: 'standard',
    albumUrl: '${album.albumUrl}',
    coverPhoto: '${album.coverPhoto}',
    description: 'Complete furnishing package with modern style and functionality',
    photos: [\n`;

    album.photos.forEach(photo => {
      const cleanTitle = photo.title.replace(/'/g, "\\'");
      tsContent += `      { id: '${photo.id}', url: '${photo.url}', title: '${cleanTitle}', width: ${photo.width}, height: ${photo.height} },\n`;
    });

    tsContent += `    ]\n  },\n`;
  });

  tsContent += `];

export function getHighlightProjects() {
  return projects.filter(p => p.category === 'highlight');
}

export function getStandardProjects() {
  return projects.filter(p => p.category === 'standard');
}

export function getProjectById(id: string) {
  return projects.find(p => p.id === id);
}
`;

  const outputPath = path.join(__dirname, '../src/data/flickr-projects-scraped.ts');
  fs.writeFileSync(outputPath, tsContent);
  console.log(`✅ Generated TypeScript file: ${outputPath}`);
}

// Run the scraper
scrapeAllAlbums()
  .then(() => console.log('\n🎉 Scraping complete!'))
  .catch(err => console.error('\n❌ Scraping failed:', err));
