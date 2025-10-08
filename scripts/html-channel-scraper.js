#!/usr/bin/env node

/**
 * HTML Channel Scraper
 * Extracts video IDs directly from the channel page HTML
 * This approach doesn't require YouTube API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CHANNEL_URL = 'https://www.youtube.com/@FurniturePackagesUSAvideo/videos';
const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');
const DELAY_BETWEEN_REQUESTS = 2000; // 2 second delay

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    
    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Extract video IDs from channel page HTML
async function extractVideoIdsFromHTML() {
  try {
    console.log('🔍 Scraping channel page for video IDs...');
    
    const html = await makeRequest(CHANNEL_URL);
    
    // Multiple regex patterns to find video IDs
    const videoIdPatterns = [
      /"videoId":"([a-zA-Z0-9_-]{11})"/g,
      /watch\?v=([a-zA-Z0-9_-]{11})/g,
      /\/embed\/([a-zA-Z0-9_-]{11})/g,
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/g,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/g
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

// Get video title using multiple methods
async function getVideoTitle(videoId) {
  const methods = [
    // Method 1: oEmbed API
    async () => {
      const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const response = await makeRequest(url);
      const json = JSON.parse(response);
      return json.title ? json.title.trim() : null;
    },
    
    // Method 2: Direct YouTube page scraping
    async () => {
      const url = `https://www.youtube.com/watch?v=${videoId}`;
      const html = await makeRequest(url);
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      if (titleMatch) {
        let title = titleMatch[1];
        title = title.replace(/\s*-\s*YouTube\s*$/, '').trim();
        return title;
      }
      return null;
    }
  ];
  
  for (let i = 0; i < methods.length; i++) {
    try {
      const title = await methods[i]();
      if (title && title.length > 0) {
        return title;
      }
    } catch (error) {
      console.log(`  Method ${i + 1} failed: ${error.message}`);
    }
  }
  
  return null;
}

// Add delay between requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Enhanced categorization
function categorizeVideo(title) {
  const lowerTitle = title.toLowerCase();
  
  // Testimonial indicators (highest priority)
  const testimonialKeywords = [
    'testimonial', 'testimonio', 'review', 'customer', 'client', 
    'satisfied', 'happy', 'recommend', 'experience', 'feedback',
    'speaks', 'says', 'tells', 'shares', 'speaking', 'talking',
    'owners testimonial', 'client testimonial', 'customer testimonial',
    'spanish testimonial', 'portuguese testimonial', 'chinese testimonial',
    'brazil', 'uk', 'u.k.', 'from brazil', 'from u.k.', 'from uk',
    'chinese', 'portuguese', 'spanish', 'español', 'português',
    'why choose', 'real customer', 'industry professionals'
  ];
  
  // Project/portfolio indicators
  const projectKeywords = [
    'interior design', 'vacation home', 'resort', 'makeover', 
    'before and after', 'transformation', 'furniture', 'design',
    'windsor', 'championsgate', 'storey lake', 'paradiso', 'azur',
    'solara', 'veranda palms', 'windsor island', 'windsor cay',
    'reunion', 'champions gate', 'storey', 'paradiso grande',
    'bedroom', 'living room', 'kitchen', 'bathroom', 'game room',
    'theater', 'theatre', 'pool', 'patio', 'balcony', 'emerald island',
    'solterra', 'paradise palms', 'enclaves', 'windsor hills',
    'windsor at westside', 'westside', 'st james', 'encore at reunion',
    'themed rooms', 'kids room', 'frozen', 'harry potter', 'mural',
    'custom', 'specialist', 'expert', 'professional', 'make over',
    'blank to brilliant', 'crafting the ultimate'
  ];
  
  // Promotional/marketing indicators
  const promotionalKeywords = [
    'booking magnet', 'transform your rental', 'turn your vacation',
    'showroom', 'marketing', 'promo', 'advertisement', 'call now',
    'contact us', 'get started', 'learn more', 'discover',
    'book now', 'schedule', 'appointment', 'consultation',
    'welcome to', 'message from', 'owner', 'expo', 'association',
    'industry professionals', 'recommend', 'furnishing from',
    'orlando vacation', 'florida vacation', 'disney world'
  ];
  
  // Check for testimonial first
  if (testimonialKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'testimonial';
  }
  
  // Check for promotional
  if (promotionalKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'promotional';
  }
  
  // Check for project
  if (projectKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'project';
  }
  
  // Default to project
  return 'project';
}

// Main scraping function
async function scrapeAllChannelVideos() {
  try {
    console.log('🚀 Starting comprehensive HTML channel scraping...\n');
    
    // Step 1: Extract all video IDs from channel page
    const allVideoIds = await extractVideoIdsFromHTML();
    
    if (allVideoIds.length === 0) {
      console.log('❌ No video IDs found. Exiting.');
      return;
    }
    
    console.log(`📹 Processing ${allVideoIds.length} videos...\n`);
    
    // Step 2: Get details for each video
    const allVideos = [];
    const categories = {
      testimonial: [],
      project: [],
      promotional: [],
      junk: []
    };
    
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < allVideoIds.length; i++) {
      const videoId = allVideoIds[i];
      console.log(`[${i + 1}/${allVideoIds.length}] Processing ${videoId}...`);
      
      const title = await getVideoTitle(videoId);
      if (title) {
        const category = categorizeVideo(title);
        const video = {
          videoId,
          title,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          category
        };
        
        allVideos.push(video);
        categories[category].push(video);
        successCount++;
        
        console.log(`✅ ${category.toUpperCase()}: ${title}`);
      } else {
        failCount++;
        console.log(`❌ Failed to get title for ${videoId}`);
      }
      
      // Add delay between requests
      if (i < allVideoIds.length - 1) {
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
// Comprehensive HTML scrape completed on ${new Date().toISOString()}
// Total videos processed: ${allVideos.length}

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

// Promotional/Marketing videos (${categories.promotional.length} videos)
${generateVideoArray(categories.promotional, 'promotionalVideos')}

// Project showcase videos (${categories.project.length} videos)
${generateVideoArray(categories.project, 'regularVideos')}

// Client testimonial videos (${categories.testimonial.length} videos)
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

    // Write the new content
    fs.writeFileSync(YOUTUBE_VIDEOS_FILE, newContent, 'utf8');
    
    // Show summary
    console.log('\n🎉 Comprehensive HTML scraping complete!');
    console.log('=====================================');
    console.log(`📊 Total videos processed: ${allVideos.length}`);
    console.log(`✅ Successfully scraped: ${successCount}`);
    console.log(`❌ Failed to scrape: ${failCount}`);
    console.log(`📈 Final categorization:`);
    console.log(`  🗣️  Testimonials: ${categories.testimonial.length}`);
    console.log(`  🏠 Projects: ${categories.project.length}`);
    console.log(`  📢 Promotional: ${categories.promotional.length}`);
    console.log(`  🗑️  Junk: ${categories.junk.length}`);
    console.log(`📁 Updated file: ${YOUTUBE_VIDEOS_FILE}`);
    
    if (categories.testimonial.length > 0) {
      console.log('\n🗣️  Sample Testimonials:');
      categories.testimonial.slice(0, 10).forEach((video, index) => {
        console.log(`  ${index + 1}. ${video.title}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error scraping channel:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  scrapeAllChannelVideos();
}

module.exports = { scrapeAllChannelVideos, categorizeVideo };



