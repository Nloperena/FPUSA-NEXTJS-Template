#!/usr/bin/env node

/**
 * Video Summary Script
 * Shows a summary of all videos and their categories
 */

const fs = require('fs');
const path = require('path');

const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');

function showVideoSummary() {
  try {
    console.log('📊 YouTube Videos Summary');
    console.log('========================\n');
    
    // Read the file
    const content = fs.readFileSync(YOUTUBE_VIDEOS_FILE, 'utf8');
    
    // Extract video counts
    const promotionalMatch = content.match(/promotionalVideos: YouTubeVideo\[\] = \[([\s\S]*?)\];/);
    const projectMatch = content.match(/regularVideos: YouTubeVideo\[\] = \[([\s\S]*?)\];/);
    const testimonialMatch = content.match(/testimonialVideos: YouTubeVideo\[\] = \[([\s\S]*?)\];/);
    
    const promotionalCount = promotionalMatch ? (promotionalMatch[1].match(/{/g) || []).length : 0;
    const projectCount = projectMatch ? (projectMatch[1].match(/{/g) || []).length : 0;
    const testimonialCount = testimonialMatch ? (testimonialMatch[1].match(/{/g) || []).length : 0;
    
    console.log(`📢 Promotional Videos: ${promotionalCount}`);
    console.log(`🏠 Project Videos: ${projectCount}`);
    console.log(`🗣️  Testimonial Videos: ${testimonialCount}`);
    console.log(`📈 Total Videos: ${promotionalCount + projectCount + testimonialCount}\n`);
    
    // Show sample videos from each category
    console.log('📋 Sample Videos by Category:');
    console.log('==============================');
    
    if (promotionalCount > 0) {
      console.log('\n📢 Promotional Videos:');
      const promotionalVideos = content.match(/promotionalVideos: YouTubeVideo\[\] = \[([\s\S]*?)\];/)[1];
      const promoMatches = promotionalVideos.match(/title: "([^"]+)"/g);
      if (promoMatches) {
        promoMatches.slice(0, 3).forEach((match, index) => {
          const title = match.match(/title: "([^"]+)"/)[1];
          console.log(`  ${index + 1}. ${title}`);
        });
        if (promoMatches.length > 3) {
          console.log(`  ... and ${promoMatches.length - 3} more`);
        }
      }
    }
    
    if (projectCount > 0) {
      console.log('\n🏠 Project Videos:');
      const projectVideos = content.match(/regularVideos: YouTubeVideo\[\] = \[([\s\S]*?)\];/)[1];
      const projectMatches = projectVideos.match(/title: "([^"]+)"/g);
      if (projectMatches) {
        projectMatches.slice(0, 5).forEach((match, index) => {
          const title = match.match(/title: "([^"]+)"/)[1];
          console.log(`  ${index + 1}. ${title}`);
        });
        if (projectMatches.length > 5) {
          console.log(`  ... and ${projectMatches.length - 5} more`);
        }
      }
    }
    
    if (testimonialCount > 0) {
      console.log('\n🗣️  Testimonial Videos:');
      const testimonialVideos = content.match(/testimonialVideos: YouTubeVideo\[\] = \[([\s\S]*?)\];/)[1];
      const testimonialMatches = testimonialVideos.match(/title: "([^"]+)"/g);
      if (testimonialMatches) {
        testimonialMatches.forEach((match, index) => {
          const title = match.match(/title: "([^"]+)"/)[1];
          console.log(`  ${index + 1}. ${title}`);
        });
      }
    }
    
    console.log('\n✅ All videos have been successfully scraped and categorized!');
    console.log('📁 Data file: src/data/youtube-videos.ts');
    
  } catch (error) {
    console.error('❌ Error reading video data:', error);
  }
}

// Run the script
if (require.main === module) {
  showVideoSummary();
}

module.exports = { showVideoSummary };



