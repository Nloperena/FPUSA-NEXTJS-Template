const fs = require('fs');
const path = require('path');

console.log('🎨 Filling parallax rows to 15 projects...\n');

// Read current projects file
const projectsPath = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');
const content = fs.readFileSync(projectsPath, 'utf-8');

// Extract all existing projects
const projectsMatch = content.match(/export const projects: Project\[\] = \[([\s\S]*)\];/);
if (!projectsMatch) {
  console.error('❌ Could not find projects array');
  process.exit(1);
}

// Parse individual projects (match each project object)
const projectMatches = projectsMatch[1].match(/\/\/ Album \d+ - REAL FLICKR DATA ✅[\s\S]*?photos: \[[\s\S]*?\n    \]\n  }/g);

if (!projectMatches || projectMatches.length === 0) {
  console.error('❌ No projects found');
  process.exit(1);
}

console.log(`✅ Found ${projectMatches.length} real projects\n`);

// Florida locations for variations
const locations = [
  'Windsor at Westside, FL',
  'Solterra Resort, FL',
  'Paradise Palms, FL',
  'Emerald Island, FL',
  'Vista Cay, FL',
  'Watersong Resort, FL',
  'Encore Resort, FL'
];

// Start with the original 8 projects
let allProjects = [...projectMatches];

// Calculate how many more we need to reach 15
const needed = 15 - projectMatches.length;
console.log(`📊 Need ${needed} more projects to fill 3 rows (15 total)\n`);

// Create variations by reusing projects with different locations
let locationIndex = 0;
for (let i = 0; i < needed; i++) {
  // Pick a project to duplicate (cycle through them)
  const sourceIdx = i % projectMatches.length;
  const sourceProject = projectMatches[sourceIdx];
  
  // Extract the project ID and title
  const idMatch = sourceProject.match(/id: '([^']+)'/);
  const titleMatch = sourceProject.match(/title: '([^']+)'/);
  const origLocationMatch = sourceProject.match(/location: '([^']+)'/);
  
  if (!idMatch || !titleMatch || !origLocationMatch) continue;
  
  const origId = idMatch[1];
  const origTitle = titleMatch[1];
  const newLocation = locations[locationIndex % locations.length];
  
  // Create variation with new ID and location
  const newId = `${origId}-v${i + 1}`;
  const variation = sourceProject
    .replace(new RegExp(`id: '${origId}'`, 'g'), `id: '${newId}'`)
    .replace(/location: '[^']+'/, `location: '${newLocation}'`)
    .replace(/\/\/ Album \d+ - REAL FLICKR DATA ✅/, `  // Display Variation ${i + 1} (based on Album ${sourceIdx + 1})`);
  
  allProjects.push(variation);
  console.log(`✅ Created variation ${i + 1}: ${origTitle} → ${newLocation}`);
  
  locationIndex++;
}

// Rebuild the file with all projects
const newContent = content.replace(
  /export const projects: Project\[\] = \[[\s\S]*\];/,
  `export const projects: Project[] = [\n${allProjects.join(',\n\n')}\n];`
);

fs.writeFileSync(projectsPath, newContent, 'utf-8');

console.log('\n' + '═'.repeat(50));
console.log('✅ PARALLAX ROWS FILLED!');
console.log('═'.repeat(50));
console.log(`\n📊 Summary:`);
console.log(`   • Original projects: ${projectMatches.length}`);
console.log(`   • Added variations: ${needed}`);
console.log(`   • Total projects: ${allProjects.length}`);
console.log(`   • Rows displayed: 3 (5 + 5 + 5)`);
console.log(`\n🎨 Your parallax section now has 3 full rows!`);
console.log(`   Refresh your browser to see the complete display.\n`);


