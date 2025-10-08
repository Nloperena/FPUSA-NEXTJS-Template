#!/usr/bin/env node

/**
 * Backup YouTube Videos Data
 * Creates a backup of the current youtube-videos.ts file before updating titles
 */

const fs = require('fs');
const path = require('path');

const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');
const BACKUP_DIR = path.join(__dirname, 'backups');
const BACKUP_FILE = path.join(BACKUP_DIR, `youtube-videos-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.ts`);

function createBackup() {
  try {
    // Create backup directory if it doesn't exist
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    
    // Read current file
    const fileContent = fs.readFileSync(YOUTUBE_VIDEOS_FILE, 'utf8');
    
    // Write backup
    fs.writeFileSync(BACKUP_FILE, fileContent, 'utf8');
    
    console.log('✅ Backup created successfully!');
    console.log(`📁 Backup location: ${BACKUP_FILE}`);
    
    return BACKUP_FILE;
  } catch (error) {
    console.error('❌ Error creating backup:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  createBackup();
}

module.exports = { createBackup };



