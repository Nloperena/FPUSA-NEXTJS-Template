#!/usr/bin/env node

/**
 * YouTube Title Scraper
 * Updates all video titles in youtube-videos.ts with current YouTube titles
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');
const DELAY_BETWEEN_REQUESTS = 1000; // 1 second delay to avoid rate limiting

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Extract video title from YouTube page
async function getYouTubeTitle(videoId) {
  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(`Fetching title for video: ${videoId}`);
    
    const html = await makeRequest(url);
    
    // Extract title from HTML using regex
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    if (titleMatch) {
      let title = titleMatch[1];
      // Clean up the title (remove " - YouTube" suffix)
      title = title.replace(/\s*-\s*YouTube\s*$/, '').trim();
      return title;
    }
    
    throw new Error('Title not found in HTML');
  } catch (error) {
    console.error(`Error fetching title for ${videoId}:`, error.message);
    return null;
  }
}

// Add delay between requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Update video titles in the file
async function updateVideoTitles() {
  try {
    console.log('🚀 Starting YouTube title update process...\n');
    
    // Read the current file
    const fileContent = fs.readFileSync(YOUTUBE_VIDEOS_FILE, 'utf8');
    
    // Extract all video IDs from the file
    const videoIdRegex = /video_id:\s*"([^"]+)"/g;
    const videoIds = [];
    let match;
    
    while ((match = videoIdRegex.exec(fileContent)) !== null) {
      videoIds.push(match[1]);
    }
    
    console.log(`Found ${videoIds.length} videos to update\n`);
    
    // Create a map of video IDs to new titles
    const titleUpdates = new Map();
    
    // Process videos in batches to avoid rate limiting
    for (let i = 0; i < videoIds.length; i++) {
      const videoId = videoIds[i];
      console.log(`[${i + 1}/${videoIds.length}] Processing ${videoId}...`);
      
      const newTitle = await getYouTubeTitle(videoId);
      if (newTitle) {
        titleUpdates.set(videoId, newTitle);
        console.log(`✅ Updated: ${newTitle}`);
      } else {
        console.log(`❌ Failed to get title for ${videoId}`);
      }
      
      // Add delay between requests
      if (i < videoIds.length - 1) {
        await delay(DELAY_BETWEEN_REQUESTS);
      }
    }
    
    // Update the file with new titles
    let updatedContent = fileContent;
    
    titleUpdates.forEach((newTitle, videoId) => {
      // Escape special characters for regex
      const escapedVideoId = videoId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(video_id:\\s*"${escapedVideoId}"[^}]*title:\\s*")[^"]*(")`, 'g');
      updatedContent = updatedContent.replace(regex, `$1${newTitle}$2`);
    });
    
    // Write the updated content back to the file
    fs.writeFileSync(YOUTUBE_VIDEOS_FILE, updatedContent, 'utf8');
    
    console.log(`\n🎉 Successfully updated ${titleUpdates.size} video titles!`);
    console.log(`📁 Updated file: ${YOUTUBE_VIDEOS_FILE}`);
    
    // Show summary
    console.log('\n📊 Summary:');
    titleUpdates.forEach((title, videoId) => {
      console.log(`  ${videoId}: ${title}`);
    });
    
  } catch (error) {
    console.error('❌ Error updating video titles:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  updateVideoTitles();
}

module.exports = { updateVideoTitles, getYouTubeTitle };



