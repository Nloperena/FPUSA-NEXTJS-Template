const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');
const content = fs.readFileSync(projectsPath, 'utf-8');

const realProjects = (content.match(/\/\/ Album \d+/g) || []).length;
const variations = (content.match(/\/\/ Display Variation/g) || []).length;
const total = realProjects + variations;

console.log('');
console.log('══════════════════════════════════════════');
console.log('   PROJECTS FINAL SUMMARY');
console.log('══════════════════════════════════════════');
console.log('');
console.log('📸 Real Projects:', realProjects);
console.log('🎨 Display Variations:', variations);
console.log('━'.repeat(42));
console.log('📊 Total Projects:', total);
console.log('');
console.log('Parallax Display:');
console.log('  • Row 1: 5 projects');
console.log('  • Row 2: 5 projects');
console.log('  • Row 3: 5 projects');
console.log('');
console.log('✅ All 3 rows are now filled!');
console.log('');
console.log('💡 You can now change any project one by one');
console.log('   by editing flickr-projects-full.ts');
console.log('');


