#!/usr/bin/env node

/**
 * YouTube Channel Video Scraper
 * Scrapes ALL videos from the Furniture Packages USA channel
 * and categorizes them properly
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CHANNEL_URL = 'https://www.youtube.com/@FurniturePackagesUSAvideo/videos';
const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');
const DELAY_BETWEEN_REQUESTS = 1000; // 1 second delay

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    
    request.on('error', reject);
    request.setTimeout(15000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Extract video IDs from channel page
async function extractVideoIdsFromChannel() {
  try {
    console.log('🔍 Scraping channel page for video IDs...');
    
    const html = await makeRequest(CHANNEL_URL);
    
    // Extract video IDs using regex patterns
    const videoIdPatterns = [
      /"videoId":"([a-zA-Z0-9_-]{11})"/g,
      /watch\?v=([a-zA-Z0-9_-]{11})/g,
      /\/embed\/([a-zA-Z0-9_-]{11})/g
    ];
    
    const videoIds = new Set();
    
    videoIdPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        videoIds.add(match[1]);
      }
    });
    
    console.log(`✅ Found ${videoIds.size} unique video IDs`);
    return Array.from(videoIds);
    
  } catch (error) {
    console.error('❌ Error scraping channel:', error.message);
    return [];
  }
}

// Get video details using oEmbed API
async function getVideoDetails(videoId) {
  try {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await makeRequest(url);
    
    if (response && response.title) {
      return {
        videoId,
        title: response.title.trim(),
        url: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`
      };
    }
    
    return null;
  } catch (error) {
    console.error(`❌ Error fetching details for ${videoId}:`, error.message);
    return null;
  }
}

// Add delay between requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Categorize video based on title
function categorizeVideo(title) {
  const lowerTitle = title.toLowerCase();
  
  // Junk/irrelevant indicators
  const junkKeywords = [
    'shorts', 'short', 'live', 'streaming', 'premiere', 'unlisted',
    'private', 'deleted', 'removed', 'error', 'test', 'demo',
    'placeholder', 'temp', 'draft', 'backup'
  ];
  
  // Testimonial indicators
  const testimonialKeywords = [
    'testimonial', 'testimonio', 'review', 'customer', 'client', 
    'satisfied', 'happy', 'recommend', 'experience', 'feedback',
    'speaks', 'says', 'tells', 'shares'
  ];
  
  // Project/portfolio indicators
  const projectKeywords = [
    'interior design', 'vacation home', 'resort', 'makeover', 
    'before and after', 'transformation', 'furniture', 'design',
    'windsor', 'championsgate', 'storey lake', 'paradiso', 'azur',
    'solara', 'veranda palms', 'windsor island', 'windsor cay',
    'reunion', 'champions gate', 'storey', 'paradiso grande'
  ];
  
  // Promotional/marketing indicators
  const promotionalKeywords = [
    'booking magnet', 'transform your rental', 'turn your vacation',
    'showroom', 'marketing', 'promo', 'advertisement', 'call now',
    'contact us', 'get started', 'learn more', 'discover'
  ];
  
  // Check for junk first
  if (junkKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'junk';
  }
  
  // Check for testimonial
  if (testimonialKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'testimonial';
  }
  
  // Check for promotional
  if (promotionalKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'promotional';
  }
  
  // Check for project (most specific)
  if (projectKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'project';
  }
  
  // Default to project if unclear
  return 'project';
}

// Main scraping function
async function scrapeChannelVideos() {
  try {
    console.log('🚀 Starting comprehensive channel scrape...\n');
    
    // Step 1: Get all video IDs from channel
    const videoIds = await extractVideoIdsFromChannel();
    
    if (videoIds.length === 0) {
      console.log('❌ No video IDs found. Exiting.');
      return;
    }
    
    console.log(`📹 Processing ${videoIds.length} videos...\n`);
    
    // Step 2: Get details for each video
    const allVideos = [];
    const categories = {
      testimonial: [],
      project: [],
      promotional: [],
      junk: []
    };
    
    for (let i = 0; i < videoIds.length; i++) {
      const videoId = videoIds[i];
      console.log(`[${i + 1}/${videoIds.length}] Processing ${videoId}...`);
      
      const videoDetails = await getVideoDetails(videoId);
      if (videoDetails) {
        const category = categorizeVideo(videoDetails.title);
        const video = { ...videoDetails, category };
        
        allVideos.push(video);
        categories[category].push(video);
        
        console.log(`${category.toUpperCase()}: ${videoDetails.title}`);
      } else {
        console.log(`❌ Failed to get details for ${videoId}`);
      }
      
      // Add delay between requests
      if (i < videoIds.length - 1) {
        await delay(DELAY_BETWEEN_REQUESTS);
      }
    }
    
    // Step 3: Generate new file content
    const generateVideoArray = (videos, arrayName) => {
      if (videos.length === 0) return `export const ${arrayName}: YouTubeVideo[] = [];`;
      
      return `export const ${arrayName}: YouTubeVideo[] = [\n${videos.map(video => 
        `  { video_id: "${video.videoId}", url: "${video.url}", title: "${video.title.replace(/"/g, '\\"')}", embedUrl: toEmbedUrl("${video.videoId}") }`
      ).join(',\n')}\n];`;
    };
    
    const newContent = `// YouTube videos scraped from Furniture Packages USA channel
// Auto-generated on ${new Date().toISOString()}

export interface YouTubeVideo {
  video_id: string;
  url: string;
  title: string;
  embedUrl: string;
}

// Helper function to convert to embed URL
const toEmbedUrl = (videoId: string) => \`https://www.youtube.com/embed/\${videoId}\`;

// Helper function to filter videos with 'testimonial' in title
export const filterTestimonialVideos = (videos: YouTubeVideo[]): YouTubeVideo[] => {
  return videos.filter(video => video.title.toLowerCase().includes('testimonial'));
};

// Promotional/Marketing videos
${generateVideoArray(categories.promotional, 'promotionalVideos')}

// Actual project showcase videos
${generateVideoArray(categories.project, 'regularVideos')}

// Client testimonial videos
${generateVideoArray(categories.testimonial, 'testimonialVideos')}

// Get first N videos for preview/homepage
export const getFeaturedVideos = (count: number = 6): YouTubeVideo[] => {
  return regularVideos.slice(0, count);
};

export const getFeaturedTestimonials = (count: number = 6): YouTubeVideo[] => {
  return filterTestimonialVideos(testimonialVideos).slice(0, count);
};

export const getFeaturedPromotional = (count: number = 6): YouTubeVideo[] => {
  return promotionalVideos.slice(0, count);
};
`;

    // Step 4: Write the new content
    fs.writeFileSync(YOUTUBE_VIDEOS_FILE, newContent, 'utf8');
    
    // Step 5: Show summary
    console.log('\n🎉 Channel scrape complete!');
    console.log('============================');
    console.log(`📊 Total videos processed: ${allVideos.length}`);
    console.log(`✅ Testimonials: ${categories.testimonial.length}`);
    console.log(`🏠 Projects: ${categories.project.length}`);
    console.log(`📢 Promotional: ${categories.promotional.length}`);
    console.log(`🗑️  Junk (filtered out): ${categories.junk.length}`);
    console.log(`📁 Updated file: ${YOUTUBE_VIDEOS_FILE}`);
    
    if (categories.junk.length > 0) {
      console.log('\n🗑️  Filtered out junk videos:');
      categories.junk.forEach(video => {
        console.log(`  - ${video.title}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error scraping channel:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  scrapeChannelVideos();
}

module.exports = { scrapeChannelVideos, categorizeVideo };



