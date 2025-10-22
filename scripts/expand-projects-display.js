/**
 * Expand Projects for Display
 * Duplicates existing projects with randomized locations for more visual variety
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');

// Florida locations to randomize
const locations = [
  'Champions Gate, FL',
  'Reunion, FL',
  'Windsor at Westside, FL',
  'Storey Lake, FL',
  'Orlando, FL',
  'Kissimmee, FL',
  'Davenport, FL',
  'Clermont, FL',
  'Celebration, FL',
  'Winter Garden, FL',
  'Lake Nona, FL',
  'Doctor Phillips, FL',
  'Windermere, FL',
  'ChampionsGate, FL',
  'Solterra, FL',
  'Windsor Hills, FL',
  'Paradise Palms, FL',
  'Solara Resort, FL',
  'Encore Resort, FL',
  'Margaritaville Resort, FL'
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

console.log('📊 Expanding projects for better parallax display...\n');

// Read the TypeScript file
let content = fs.readFileSync(targetFile, 'utf-8');

// Find the export statement and the end of the array
const exportMatch = content.match(/export const projects: Project\[\] = \[/);
if (!exportMatch) {
  console.error('❌ Could not find projects array');
  process.exit(1);
}

// Split content to work with it
const beforeProjects = content.substring(0, exportMatch.index + exportMatch[0].length);
const afterExportStart = content.substring(exportMatch.index + exportMatch[0].length);

// Find where the array ends
const arrayEndIndex = afterExportStart.lastIndexOf('];');
if (arrayEndIndex === -1) {
  console.error('❌ Could not find end of projects array');
  process.exit(1);
}

const projectsContent = afterExportStart.substring(0, arrayEndIndex);
const afterProjects = afterExportStart.substring(arrayEndIndex);

// Parse projects (simplified - just look for project objects)
const projectMatches = projectsContent.match(/  \/\/ .*?\n  \{[\s\S]*?  \},/g);

if (!projectMatches || projectMatches.length === 0) {
  console.error('❌ Could not parse projects');
  process.exit(1);
}

console.log(`✅ Found ${projectMatches.length} original projects\n`);

// Shuffle locations
const shuffledLocations = shuffleArray(locations);
let locationIndex = 0;

// Create variations by changing locations
const expandedProjects = [];

// Add original projects
expandedProjects.push(...projectMatches);

// Create 2 more sets with randomized locations (total 3x)
for (let set = 1; set <= 2; set++) {
  console.log(`🔄 Creating variation set ${set}...`);
  
  for (let i = 0; i < projectMatches.length; i++) {
    let projectCopy = projectMatches[i];
    
    // Replace location with a random one
    const newLocation = shuffledLocations[locationIndex % shuffledLocations.length];
    locationIndex++;
    
    projectCopy = projectCopy.replace(
      /location: '[^']+'/,
      `location: '${newLocation}'`
    );
    
    // Update the comment to indicate it's a variation
    projectCopy = projectCopy.replace(
      /(\/\/ .*?)(- REAL FLICKR DATA ✅)?(\n)/,
      `$1 (Display Copy ${set})$3`
    );
    
    expandedProjects.push(projectCopy);
  }
  
  console.log(`   ✓ Added ${projectMatches.length} variations\n`);
}

// Rebuild the file
const newContent = beforeProjects + '\n' + expandedProjects.join('\n\n') + '\n' + afterProjects;

// Write back
fs.writeFileSync(targetFile, newContent);

console.log('╔════════════════════════════════════════════╗');
console.log('║  ✅ PROJECTS EXPANDED!                    ║');
console.log('╚════════════════════════════════════════════╝\n');

console.log('📊 Summary:');
console.log(`   • Original projects: ${projectMatches.length}`);
console.log(`   • Total projects now: ${expandedProjects.length}`);
console.log(`   • Variations created: ${expandedProjects.length - projectMatches.length}`);
console.log(`   • Unique locations: ${locations.length}\n`);

console.log('🎨 Your parallax section now has 3x more projects with varied locations!');
console.log('   Refresh your browser to see the expanded display.\n');


