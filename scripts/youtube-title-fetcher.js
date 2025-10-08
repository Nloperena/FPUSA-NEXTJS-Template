#!/usr/bin/env node

/**
 * YouTube Title Fetcher - Alternative approach
 * Uses YouTube oEmbed API for more reliable title fetching
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');
const DELAY_BETWEEN_REQUESTS = 500; // 500ms delay

// YouTube oEmbed API endpoint
const YOUTUBE_OEMBED_URL = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=';

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });
    
    request.on('error', reject);
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Get YouTube title using oEmbed API
async function getYouTubeTitle(videoId) {
  try {
    const url = `${YOUTUBE_OEMBED_URL}${videoId}&format=json`;
    console.log(`Fetching title for video: ${videoId}`);
    
    const response = await makeRequest(url);
    
    if (response && response.title) {
      return response.title.trim();
    }
    
    throw new Error('Title not found in response');
  } catch (error) {
    console.error(`Error fetching title for ${videoId}:`, error.message);
    return null;
  }
}

// Add delay between requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Extract video IDs from the file
function extractVideoIds(fileContent) {
  const videoIdRegex = /video_id:\s*"([^"]+)"/g;
  const videoIds = [];
  let match;
  
  while ((match = videoIdRegex.exec(fileContent)) !== null) {
    videoIds.push(match[1]);
  }
  
  return videoIds;
}

// Update video titles in the file
async function updateVideoTitles() {
  try {
    console.log('🚀 Starting YouTube title update process...\n');
    
    // Read the current file
    const fileContent = fs.readFileSync(YOUTUBE_VIDEOS_FILE, 'utf8');
    
    // Extract all video IDs
    const videoIds = extractVideoIds(fileContent);
    console.log(`Found ${videoIds.length} videos to update\n`);
    
    // Create a map of video IDs to new titles
    const titleUpdates = new Map();
    let successCount = 0;
    let failCount = 0;
    
    // Process videos
    for (let i = 0; i < videoIds.length; i++) {
      const videoId = videoIds[i];
      console.log(`[${i + 1}/${videoIds.length}] Processing ${videoId}...`);
      
      const newTitle = await getYouTubeTitle(videoId);
      if (newTitle) {
        titleUpdates.set(videoId, newTitle);
        successCount++;
        console.log(`✅ Updated: ${newTitle}`);
      } else {
        failCount++;
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
    
    console.log(`\n🎉 Title update complete!`);
    console.log(`✅ Successfully updated: ${successCount} videos`);
    console.log(`❌ Failed to update: ${failCount} videos`);
    console.log(`📁 Updated file: ${YOUTUBE_VIDEOS_FILE}`);
    
    // Show updated titles
    if (titleUpdates.size > 0) {
      console.log('\n📊 Updated Titles:');
      titleUpdates.forEach((title, videoId) => {
        console.log(`  ${videoId}: ${title}`);
      });
    }
    
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



