const fs = require('fs');
const path = require('path');

// Read the TypeScript file as text
const projectsPath = path.join(__dirname, '..', 'src', 'data', 'flickr-projects-full.ts');
const content = fs.readFileSync(projectsPath, 'utf-8');

// Extract project IDs
const idMatches = content.match(/^\s+id: '([^']+)',/gm);

if (idMatches) {
  console.log('\n📋 Project IDs Found:\n');
  idMatches.forEach((match, i) => {
    const id = match.match(/id: '([^']+)'/)[1];
    console.log(`${i + 1}. ${id}`);
  });
  console.log(`\n✅ Total: ${idMatches.length} projects with IDs\n`);
} else {
  console.log('❌ No project IDs found\n');
}


