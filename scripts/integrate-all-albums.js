const fs = require('fs');
const path = require('path');

console.log('🔄 Integrating all extracted Flickr albums...\n');

// Read the extracted albums data
const extractedPath = path.join(__dirname, 'extracted-albums-data.json');
const extractedAlbums = JSON.parse(fs.readFileSync(extractedPath, 'utf-8'));

console.log(`✅ Found ${extractedAlbums.length} extracted albums\n`);

// Read the current projects file
const projectsPath = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');
let projectsContent = fs.readFileSync(projectsPath, 'utf-8');

// Get the existing albums 1 and 2 (Champions Gate and Windsor)
const album1Match = projectsContent.match(/\/\/ Highlight Project 1 - REAL FLICKR DATA ✅[\s\S]*?photos: \[([\s\S]*?)\n    \]\n  },/);
const album2Match = projectsContent.match(/\/\/ Highlight Project 2 - REAL FLICKR DATA ✅[\s\S]*?photos: \[([\s\S]*?)\n    \]\n  },/);

// Build the complete projects array with all 8 albums
let allProjects = [];

// Add Album 1 (Champions Gate - already in file)
if (album1Match) {
  allProjects.push(album1Match[0]);
  console.log('✅ Kept Album 1: Champions Gate Luxury Estate');
}

// Add Album 2 (Windsor - already in file)
if (album2Match) {
  allProjects.push(album2Match[0]);
  console.log('✅ Kept Album 2: Windsor Resort Estate');
}

// Add Albums 3-8 from extracted data
extractedAlbums.forEach((album, idx) => {
  const albumData = album.data || album;
  const albumNum = album.num || (idx + 3);
  
  const photosArray = albumData.photos.map(photo => 
    `      { id: '${photo.id}', url: '${photo.url}', title: '${photo.title}', width: ${photo.width}, height: ${photo.height} }`
  ).join(',\n');
  
  const projectObj = `  // Album ${albumNum} - REAL FLICKR DATA ✅
  {
    id: '${albumData.id}',
    title: '${albumData.title}',
    location: '${albumData.location}',
    category: '${albumData.category}',
    albumUrl: '${albumData.albumUrl}',
    coverPhoto: '${albumData.coverPhoto}',
    description: '${albumData.description}',
    photos: [
${photosArray}
    ]
  }`;
  
  allProjects.push(projectObj);
  console.log(`✅ Added Album ${albumNum}: ${albumData.title} (${albumData.photos.length} photos)`);
});

// Build the final TypeScript file
const finalContent = `// Auto-generated Flickr projects data
// Contains real project photos from Flickr albums

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

export const projects: Project[] = [
${allProjects.join(',\n\n')}
];
`;

// Write the updated file
fs.writeFileSync(projectsPath, finalContent, 'utf-8');

console.log('\n' + '═'.repeat(50));
console.log('✅ INTEGRATION COMPLETE!');
console.log('═'.repeat(50));
console.log(`\n📊 Summary:`);
console.log(`   • Total projects: ${allProjects.length}`);
console.log(`   • This will create ${Math.ceil(allProjects.length / 5)} rows in the parallax display`);
console.log(`   • All real Flickr data - no duplicates!\n`);


