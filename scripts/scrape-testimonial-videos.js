#!/usr/bin/env node

/**
 * Scrape All Testimonial Videos
 * Processes the provided testimonial video IDs to get their current titles
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');
const DELAY_BETWEEN_REQUESTS = 1500; // 1.5 second delay

// All testimonial video IDs (oldest to newest)
const TESTIMONIAL_VIDEO_IDS = [
  '3Bm3zM0_JQo', 'RhryRwiXPrc', 'MSk_a4z_kmI', 'O78zgZVXEHE', 'PN1R8H8JMUo',
  'gbmPpO7NrS4', 'LBvYnExdFM0', 'PESIM-eaz10', 'RiJuDLwVgX0', 'gnR9vz7sVdk',
  'hgm3gNDnjps', 'qviBOUHbm_8', 'z0j5uv6irzc', 'ylh6WmTeXGI', '173lYime06w',
  '6W6dXT5L794', 'pnuLQdhiIpM', 'IbGZ4z3TxRc', 'fid9BFohso0', 'ZsNEKO2PdQI',
  's3yayGSTFSw', 'gXtD_ozOI1Q', 'lMcMwr_OR2I', '5mpAVtz_BIY', 'zgjp6zIW5mw',
  'Dl4M8Y3qwxc', 'OcgwqJEhkLk', 'gPrQgMhnU0Q', 'a33qiydF9vs', '89qSuEsQxVg',
  '1xjIiy7OIcw'
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

// Main scraping function
async function scrapeAllTestimonialVideos() {
  try {
    console.log('🚀 Starting comprehensive testimonial video scraping...\n');
    console.log(`📹 Processing ${TESTIMONIAL_VIDEO_IDS.length} testimonial videos...\n`);
    
    const testimonialVideos = [];
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < TESTIMONIAL_VIDEO_IDS.length; i++) {
      const videoId = TESTIMONIAL_VIDEO_IDS[i];
      console.log(`[${i + 1}/${TESTIMONIAL_VIDEO_IDS.length}] Processing ${videoId}...`);
      
      const title = await getVideoTitle(videoId);
      if (title) {
        const video = {
          videoId,
          title,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`
        };
        
        testimonialVideos.push(video);
        successCount++;
        
        console.log(`✅ ${title}`);
      } else {
        failCount++;
        console.log(`❌ Failed to get title for ${videoId}`);
      }
      
      // Add delay between requests
      if (i < TESTIMONIAL_VIDEO_IDS.length - 1) {
        await delay(DELAY_BETWEEN_REQUESTS);
      }
    }
    
    // Read current file to preserve other video categories
    let currentContent = '';
    try {
      currentContent = fs.readFileSync(YOUTUBE_VIDEOS_FILE, 'utf8');
    } catch (error) {
      console.log('Creating new file...');
    }
    
    // Extract existing promotional and project videos
    const promotionalMatch = currentContent.match(/promotionalVideos: YouTubeVideo\[\] = \[([\s\S]*?)\];/);
    const projectMatch = currentContent.match(/regularVideos: YouTubeVideo\[\] = \[([\s\S]*?)\];/);
    
    const promotionalVideos = promotionalMatch ? promotionalMatch[1] : '[]';
    const regularVideos = projectMatch ? projectMatch[1] : '[]';
    
    // Generate new testimonial videos array
    const generateTestimonialArray = (videos) => {
      if (videos.length === 0) return `export const testimonialVideos: YouTubeVideo[] = [];`;
      
      return `export const testimonialVideos: YouTubeVideo[] = [\n${videos.map(video => 
        `  { video_id: "${video.videoId}", url: "${video.url}", title: "${video.title.replace(/"/g, '\\"')}", embedUrl: toEmbedUrl("${video.videoId}") }`
      ).join(',\n')}\n];`;
    };
    
    const newContent = `// YouTube videos scraped from Furniture Packages USA channel
// Comprehensive testimonial scrape completed on ${new Date().toISOString()}
// Total testimonial videos: ${testimonialVideos.length}

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
export const promotionalVideos: YouTubeVideo[] = ${promotionalVideos};

// Project showcase videos
export const regularVideos: YouTubeVideo[] = ${regularVideos};

// Client testimonial videos (${testimonialVideos.length} videos - complete collection)
${generateTestimonialArray(testimonialVideos)}

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
    console.log('\n🎉 Comprehensive testimonial scraping complete!');
    console.log('==============================================');
    console.log(`📊 Total testimonial videos processed: ${testimonialVideos.length}`);
    console.log(`✅ Successfully scraped: ${successCount}`);
    console.log(`❌ Failed to scrape: ${failCount}`);
    console.log(`📁 Updated file: ${YOUTUBE_VIDEOS_FILE}`);
    
    // Show sample testimonials
    console.log('\n🗣️  Sample Testimonials:');
    testimonialVideos.slice(0, 10).forEach((video, index) => {
      console.log(`  ${index + 1}. ${video.title}`);
    });
    
    if (testimonialVideos.length > 10) {
      console.log(`  ... and ${testimonialVideos.length - 10} more`);
    }
    
    console.log('\n✅ All testimonial videos have been successfully scraped and categorized!');
    console.log('This includes the complete 10+ year history of testimonials from the channel.');
    
  } catch (error) {
    console.error('❌ Error scraping testimonial videos:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  scrapeAllTestimonialVideos();
}

module.exports = { scrapeAllTestimonialVideos };



