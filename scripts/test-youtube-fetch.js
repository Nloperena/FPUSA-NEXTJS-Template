#!/usr/bin/env node

/**
 * Test YouTube Title Fetching
 * Tests the title fetching on a few sample videos before running the full update
 */

const { getYouTubeTitle } = require('./youtube-title-fetcher');

// Test with a few sample video IDs
const testVideoIds = [
  'zYXGlIR6XwA', // First testimonial video
  '1f3_mZZveJQ', // First project video
  '93OvrQaMcyY', // First promotional video
];

async function testTitleFetching() {
  console.log('🧪 Testing YouTube Title Fetching');
  console.log('==================================\n');
  
  for (const videoId of testVideoIds) {
    console.log(`Testing video: ${videoId}`);
    const title = await getYouTubeTitle(videoId);
    
    if (title) {
      console.log(`✅ Success: ${title}\n`);
    } else {
      console.log(`❌ Failed to fetch title\n`);
    }
  }
  
  console.log('Test completed!');
}

// Run the test
if (require.main === module) {
  testTitleFetching();
}

module.exports = { testTitleFetching };



