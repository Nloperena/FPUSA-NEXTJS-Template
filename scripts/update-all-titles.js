#!/usr/bin/env node

/**
 * Complete YouTube Title Update Process
 * 1. Creates backup
 * 2. Updates all video titles
 * 3. Provides verification
 */

const { createBackup } = require('./backup-videos');
const { updateVideoTitles } = require('./youtube-title-fetcher');

async function runCompleteUpdate() {
  try {
    console.log('🎬 YouTube Title Update Process');
    console.log('================================\n');
    
    // Step 1: Create backup
    console.log('📦 Step 1: Creating backup...');
    const backupFile = createBackup();
    console.log(`✅ Backup created: ${backupFile}\n`);
    
    // Step 2: Update titles
    console.log('🔄 Step 2: Updating video titles...');
    await updateVideoTitles();
    
    console.log('\n🎉 Process completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the updated titles in src/data/youtube-videos.ts');
    console.log('2. Test the website to ensure everything works correctly');
    console.log('3. If issues occur, restore from backup:');
    console.log(`   cp "${backupFile}" src/data/youtube-videos.ts`);
    
  } catch (error) {
    console.error('❌ Process failed:', error);
    process.exit(1);
  }
}

// Run the complete process
if (require.main === module) {
  runCompleteUpdate();
}

module.exports = { runCompleteUpdate };



