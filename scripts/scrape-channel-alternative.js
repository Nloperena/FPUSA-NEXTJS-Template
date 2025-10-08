#!/usr/bin/env node

/**
 * Alternative YouTube Channel Scraper
 * Uses a different approach to get video information
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');
const DELAY_BETWEEN_REQUESTS = 2000; // 2 second delay

// Known video IDs from the channel (we'll expand this list)
const KNOWN_VIDEO_IDS = [
  // From our previous data
  '93OvrQaMcyY', 'VJnt2KvedRc', 'XSk5w_RdWIw', 'GMoebI8HuZw',
  'cFDBzdJCHp8', 'J_lenyWTdUk', 'Y8HLlzROEhg', '1f3_mZZveJQ',
  'jiOo1wtF29M', 'DWtJxWU987s', 'wGXiyq1FQCw', '1xjIiy7OIcw',
  '8TWFGu_0kLg', 'faAp5jhXBKg', '9Zs1eR1-45k', 'XfAJDFu5E5s',
  'yAHtYdBGPA4', 'YaWuqzxeATc', 'yau8-eDC6tI', 'ghaICLW8nsE',
  'zYXGlIR6XwA', 'DuRyChEqbD0', 'a33qiydF9vs', '1YLpXU4OVSE',
  'vHuOSqeZaD8', 'PtfV5ooKxh4', 'PH5jMkr5u4A', 'Wwc2weT68m8',
  'CvrbU_GcFMo', 'PjXyKM9ou-E', 'on2inzx_Lr0', 'Xa49aYpDwls',
  'Yiuh6T58N9U', 'nHLSasMnCvY', 'z357e2nY2x8', 'yhh2OXqyeZ4',
  'UyfcKjtvf7k', 'sipHV1o846I', 'sleFJFz65As', 'lbfSZ_gg5sM',
  'kuTW1dG3kkA', 'i3_GkP2zacE', 'dNGRVcUoJps', 'OcgwqJEhkLk',
  'M6cxBsDtN9w', '0mPvOj5iwy4', '2ezlEodfkIU', '34lnPRiU6xo',
  'L2s_1clo3Ik', '-1pVqIxCB_s', 'EhtVLS4lmrs'
];

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
    request.setTimeout(20000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
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

// Categorize video based on title
function categorizeVideo(title) {
  const lowerTitle = title.toLowerCase();
  
  // Junk/irrelevant indicators
  const junkKeywords = [
    'shorts', 'short', 'live', 'streaming', 'premiere', 'unlisted',
    'private', 'deleted', 'removed', 'error', 'test', 'demo',
    'placeholder', 'temp', 'draft', 'backup', 'music', 'song',
    'audio', 'sound', 'noise', 'static', 'unavailable', 'not found'
  ];
  
  // Testimonial indicators
  const testimonialKeywords = [
    'testimonial', 'testimonio', 'review', 'customer', 'client', 
    'satisfied', 'happy', 'recommend', 'experience', 'feedback',
    'speaks', 'says', 'tells', 'shares', 'speaking', 'talking'
  ];
  
  // Project/portfolio indicators
  const projectKeywords = [
    'interior design', 'vacation home', 'resort', 'makeover', 
    'before and after', 'transformation', 'furniture', 'design',
    'windsor', 'championsgate', 'storey lake', 'paradiso', 'azur',
    'solara', 'veranda palms', 'windsor island', 'windsor cay',
    'reunion', 'champions gate', 'storey', 'paradiso grande',
    'bedroom', 'living room', 'kitchen', 'bathroom', 'game room',
    'theater', 'theatre', 'pool', 'patio', 'balcony'
  ];
  
  // Promotional/marketing indicators
  const promotionalKeywords = [
    'booking magnet', 'transform your rental', 'turn your vacation',
    'showroom', 'marketing', 'promo', 'advertisement', 'call now',
    'contact us', 'get started', 'learn more', 'discover',
    'book now', 'schedule', 'appointment', 'consultation'
  ];
  
  // Check for testimonial first (highest priority)
  if (testimonialKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'testimonial';
  }
  
  // Check for junk
  if (junkKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'junk';
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
async function scrapeAllVideos() {
  try {
    console.log('🚀 Starting comprehensive video scraping...\n');
    console.log(`📹 Processing ${KNOWN_VIDEO_IDS.length} known videos...\n`);
    
    const allVideos = [];
    const categories = {
      testimonial: [],
      project: [],
      promotional: [],
      junk: []
    };
    
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < KNOWN_VIDEO_IDS.length; i++) {
      const videoId = KNOWN_VIDEO_IDS[i];
      console.log(`[${i + 1}/${KNOWN_VIDEO_IDS.length}] Processing ${videoId}...`);
      
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
      if (i < KNOWN_VIDEO_IDS.length - 1) {
        await delay(DELAY_BETWEEN_REQUESTS);
      }
    }
    
    // Generate new file content
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

    // Write the new content
    fs.writeFileSync(YOUTUBE_VIDEOS_FILE, newContent, 'utf8');
    
    // Show summary
    console.log('\n🎉 Video scraping complete!');
    console.log('============================');
    console.log(`📊 Total videos processed: ${allVideos.length}`);
    console.log(`✅ Successfully scraped: ${successCount}`);
    console.log(`❌ Failed to scrape: ${failCount}`);
    console.log(`📈 Categorization:`);
    console.log(`  🗣️  Testimonials: ${categories.testimonial.length}`);
    console.log(`  🏠 Projects: ${categories.project.length}`);
    console.log(`  📢 Promotional: ${categories.promotional.length}`);
    console.log(`  🗑️  Junk (filtered out): ${categories.junk.length}`);
    console.log(`📁 Updated file: ${YOUTUBE_VIDEOS_FILE}`);
    
    if (categories.junk.length > 0) {
      console.log('\n🗑️  Filtered out junk videos:');
      categories.junk.forEach(video => {
        console.log(`  - ${video.title}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error scraping videos:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  scrapeAllVideos();
}

module.exports = { scrapeAllVideos, categorizeVideo };
