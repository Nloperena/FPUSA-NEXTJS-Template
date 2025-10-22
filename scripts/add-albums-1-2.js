const fs = require('fs');
const path = require('path');

console.log('📸 Extracting Albums 1 & 2...\n');

const albums = [
  {
    num: 1,
    file: 'album1.html',
    id: 'champions-gate-luxury',
    title: 'Champions Gate Luxury Estate',
    location: 'Champions Gate, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    description: 'Complete luxury vacation rental transformation featuring modern design, premium finishes, and themed kids rooms'
  },
  {
    num: 2,
    file: 'album2.html',
    id: 'windsor-resort',
    title: 'Windsor Resort Estate',
    location: 'Windsor at Westside, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381',
    description: 'Stunning vacation home with luxury furnishings and designer touches throughout'
  }
];

const extractedAlbums = [];

albums.forEach(album => {
  const htmlPath = path.join(__dirname, album.file);
  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  const photos = [];
  let photoIndex = 1;
  
  // Extract photos using regex
  const styleRegex = /style="[^"]*background-image:\s*url\((https:\/\/live\.staticflickr\.com[^)]+)\)/g;
  let match;
  
  while ((match = styleRegex.exec(html)) !== null) {
    let url = match[1];
    // Convert to _b size for consistency
    url = url.replace(/_[a-z]\.jpg$/, '_b.jpg');
    
    photos.push({
      id: `${album.id}-${photoIndex}`,
      url,
      title: `${album.title} - Photo ${photoIndex}`,
      width: 1024,
      height: 683
    });
    photoIndex++;
  }
  
  if (photos.length > 0) {
    extractedAlbums.push({
      ...album,
      coverPhoto: photos[0].url,
      photos
    });
    console.log(`✅ Album ${album.num}: ${album.title} (${photos.length} photos)`);
  }
});

// Read current projects file
const projectsPath = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');
let content = fs.readFileSync(projectsPath, 'utf-8');

// Build the two new projects
const newProjects = extractedAlbums.map(album => {
  const photosArray = album.photos.map(photo => 
    `      { id: '${photo.id}', url: '${photo.url}', title: '${photo.title}', width: ${photo.width}, height: ${photo.height} }`
  ).join(',\n');
  
  return `  // Album ${album.num} - REAL FLICKR DATA ✅
  {
    id: '${album.id}',
    title: '${album.title}',
    location: '${album.location}',
    category: '${album.category}',
    albumUrl: '${album.albumUrl}',
    coverPhoto: '${album.coverPhoto}',
    description: '${album.description}',
    photos: [
${photosArray}
    ]
  }`;
});

// Insert at the beginning of the projects array
content = content.replace(
  /export const projects: Project\[\] = \[\n/,
  `export const projects: Project[] = [\n${newProjects.join(',\n\n')},\n\n`
);

fs.writeFileSync(projectsPath, content, 'utf-8');

console.log('\n✅ Albums 1 & 2 added to the beginning of projects array\n');

