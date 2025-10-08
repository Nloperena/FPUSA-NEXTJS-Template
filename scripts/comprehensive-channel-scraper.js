#!/usr/bin/env node

/**
 * Comprehensive YouTube Channel Scraper
 * Scrapes ALL videos from the Furniture Packages USA channel
 * and categorizes them properly based on actual content
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');
const DELAY_BETWEEN_REQUESTS = 1500; // 1.5 second delay

// All video IDs from the channel (comprehensive list)
const ALL_VIDEO_IDS = [
  // Recent promotional videos (2024-2025)
  '93OvrQaMcyY', 'VJnt2KvedRc', 'XSk5w_RdWIw', 'cFDBzdJCHp8', 'XfAJDFu5E5s',
  
  // Recent project videos (2024-2025)
  'GMoebI8HuZw', '1f3_mZZveJQ', 'jiOo1wtF29M', 'DWtJxWU987s', 'wGXiyq1FQCw',
  '8TWFGu_0kLg', 'faAp5jhXBKg', '9Zs1eR1-45k', 'J_lenyWTdUk', 'yAHtYdBGPA4',
  'yau8-eDC6tI', 'ghaICLW8nsE', 'zYXGlIR6XwA', 'DuRyChEqbD0', '1YLpXU4OVSE',
  'vHuOSqeZaD8', 'PtfV5ooKxh4', 'Wwc2weT68m8', 'CvrbU_GcFMo', 'on2inzx_Lr0',
  'Xa49aYpDwls', 'Yiuh6T58N9U', 'nHLSasMnCvY', 'z357e2nY2x8', 'yhh2OXqyeZ4',
  'UyfcKjtvf7k', 'sipHV1o846I', 'sleFJFz65As', 'lbfSZ_gg5sM', 'kuTW1dG3kkA',
  'i3_GkP2zacE', 'dNGRVcUoJps', 'M6cxBsDtN9w', '0mPvOj5iwy4', '2ezlEodfkIU',
  '34lnPRiU6xo', 'L2s_1clo3Ik', '-1pVqIxCB_s', 'EhtVLS4lmrs',
  
  // Testimonial videos
  '1xjIiy7OIcw', 'YaWuqzxeATc', 'a33qiydF9vs', 'PjXyKM9ou-E', 'OcgwqJEhkLk',
  
  // Note: The channel has 636+ videos total, but we're starting with the most recent/relevant ones
  // Additional video IDs can be added as needed
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

// Enhanced categorization based on the actual video titles
function categorizeVideo(title) {
  const lowerTitle = title.toLowerCase();
  
  // Junk/irrelevant indicators
  const junkKeywords = [
    'shorts', 'short', 'live', 'streaming', 'premiere', 'unlisted',
    'private', 'deleted', 'removed', 'error', 'test', 'demo',
    'placeholder', 'temp', 'draft', 'backup', 'music', 'song',
    'audio', 'sound', 'noise', 'static', 'unavailable', 'not found',
    'loading', 'processing', 'uploading'
  ];
  
  // Testimonial indicators (highest priority)
  const testimonialKeywords = [
    'testimonial', 'testimonio', 'review', 'customer', 'client', 
    'satisfied', 'happy', 'recommend', 'experience', 'feedback',
    'speaks', 'says', 'tells', 'shares', 'speaking', 'talking',
    'owners testimonial', 'client testimonial', 'customer testimonial',
    'spanish testimonial', 'portuguese testimonial', 'chinese testimonial',
    'brazil', 'uk', 'u.k.', 'from brazil', 'from u.k.', 'from uk',
    'chinese', 'portuguese', 'spanish', 'español', 'português'
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
    'custom', 'specialist', 'expert', 'professional'
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
async function scrapeAllChannelVideos() {
  try {
    console.log('🚀 Starting comprehensive channel scraping...\n');
    console.log(`📹 Processing ${ALL_VIDEO_IDS.length} videos...\n`);
    
    const allVideos = [];
    const categories = {
      testimonial: [],
      project: [],
      promotional: [],
      junk: []
    };
    
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < ALL_VIDEO_IDS.length; i++) {
      const videoId = ALL_VIDEO_IDS[i];
      console.log(`[${i + 1}/${ALL_VIDEO_IDS.length}] Processing ${videoId}...`);
      
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
      if (i < ALL_VIDEO_IDS.length - 1) {
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
// Comprehensive scrape completed on ${new Date().toISOString()}
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
    console.log('\n🎉 Comprehensive channel scraping complete!');
    console.log('==========================================');
    console.log(`📊 Total videos processed: ${allVideos.length}`);
    console.log(`✅ Successfully scraped: ${successCount}`);
    console.log(`❌ Failed to scrape: ${failCount}`);
    console.log(`📈 Final categorization:`);
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
    
    // Show sample videos from each category
    console.log('\n📋 Sample videos by category:');
    console.log('==============================');
    
    if (categories.testimonial.length > 0) {
      console.log('\n🗣️  Sample Testimonials:');
      categories.testimonial.slice(0, 3).forEach((video, index) => {
        console.log(`  ${index + 1}. ${video.title}`);
      });
    }
    
    if (categories.project.length > 0) {
      console.log('\n🏠 Sample Projects:');
      categories.project.slice(0, 5).forEach((video, index) => {
        console.log(`  ${index + 1}. ${video.title}`);
      });
    }
    
    if (categories.promotional.length > 0) {
      console.log('\n📢 Sample Promotional:');
      categories.promotional.slice(0, 3).forEach((video, index) => {
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
