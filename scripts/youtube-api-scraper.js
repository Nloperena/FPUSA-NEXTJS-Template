#!/usr/bin/env node

/**
 * YouTube API Channel Scraper
 * Uses YouTube Data API to get ALL video IDs from the channel
 * This requires a YouTube API key
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CHANNEL_ID = 'UC_FurniturePackagesUSAvideo'; // This needs to be the actual channel ID
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Set this environment variable
const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (res) => {
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

// Get channel uploads playlist ID
async function getChannelUploadsPlaylist(channelId) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`;
    const response = await makeRequest(url);
    const data = JSON.parse(response);
    
    if (data.items && data.items.length > 0) {
      return data.items[0].contentDetails.relatedPlaylists.uploads;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting channel uploads playlist:', error);
    return null;
  }
}

// Get all video IDs from uploads playlist
async function getAllVideoIds(uploadsPlaylistId) {
  try {
    const allVideoIds = [];
    let nextPageToken = '';
    
    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&pageToken=${nextPageToken}&key=${YOUTUBE_API_KEY}`;
      const response = await makeRequest(url);
      const data = JSON.parse(response);
      
      if (data.items) {
        data.items.forEach(item => {
          allVideoIds.push(item.snippet.resourceId.videoId);
        });
      }
      
      nextPageToken = data.nextPageToken || '';
      console.log(`Fetched ${allVideoIds.length} video IDs so far...`);
      
    } while (nextPageToken);
    
    return allVideoIds;
  } catch (error) {
    console.error('Error getting video IDs:', error);
    return [];
  }
}

// Get video details for a batch of videos
async function getVideoDetails(videoIds) {
  try {
    const videoIdsString = videoIds.join(',');
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIdsString}&key=${YOUTUBE_API_KEY}`;
    const response = await makeRequest(url);
    const data = JSON.parse(response);
    
    return data.items || [];
  } catch (error) {
    console.error('Error getting video details:', error);
    return [];
  }
}

// Categorize video based on title
function categorizeVideo(title) {
  const lowerTitle = title.toLowerCase();
  
  // Testimonial indicators
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
    if (!YOUTUBE_API_KEY) {
      console.log('❌ YouTube API key not found!');
      console.log('Please set the YOUTUBE_API_KEY environment variable');
      console.log('Get your API key from: https://console.developers.google.com/');
      return;
    }
    
    console.log('🚀 Starting comprehensive YouTube API scraping...\n');
    
    // Step 1: Get channel uploads playlist
    console.log('📺 Getting channel uploads playlist...');
    const uploadsPlaylistId = await getChannelUploadsPlaylist(CHANNEL_ID);
    
    if (!uploadsPlaylistId) {
      console.log('❌ Could not get channel uploads playlist');
      return;
    }
    
    console.log(`✅ Found uploads playlist: ${uploadsPlaylistId}`);
    
    // Step 2: Get all video IDs
    console.log('\n📹 Getting all video IDs...');
    const allVideoIds = await getAllVideoIds(uploadsPlaylistId);
    
    console.log(`✅ Found ${allVideoIds.length} videos total`);
    
    // Step 3: Get video details in batches
    console.log('\n📋 Getting video details...');
    const allVideos = [];
    const categories = {
      testimonial: [],
      project: [],
      promotional: [],
      junk: []
    };
    
    const batchSize = 50; // YouTube API allows up to 50 videos per request
    
    for (let i = 0; i < allVideoIds.length; i += batchSize) {
      const batch = allVideoIds.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allVideoIds.length / batchSize)}...`);
      
      const videoDetails = await getVideoDetails(batch);
      
      videoDetails.forEach(video => {
        const title = video.snippet.title;
        const category = categorizeVideo(title);
        const videoData = {
          videoId: video.id,
          title,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          embedUrl: `https://www.youtube.com/embed/${video.id}`,
          category,
          publishedAt: video.snippet.publishedAt
        };
        
        allVideos.push(videoData);
        categories[category].push(videoData);
      });
      
      // Add delay between batches
      if (i + batchSize < allVideoIds.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Step 4: Generate new file content
    const generateVideoArray = (videos, arrayName) => {
      if (videos.length === 0) return `export const ${arrayName}: YouTubeVideo[] = [];`;
      
      return `export const ${arrayName}: YouTubeVideo[] = [\n${videos.map(video => 
        `  { video_id: "${video.videoId}", url: "${video.url}", title: "${video.title.replace(/"/g, '\\"')}", embedUrl: toEmbedUrl("${video.videoId}") }`
      ).join(',\n')}\n];`;
    };
    
    const newContent = `// YouTube videos scraped from Furniture Packages USA channel
// Comprehensive API scrape completed on ${new Date().toISOString()}
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
    console.log('\n🎉 Comprehensive API scraping complete!');
    console.log('=====================================');
    console.log(`📊 Total videos processed: ${allVideos.length}`);
    console.log(`📈 Final categorization:`);
    console.log(`  🗣️  Testimonials: ${categories.testimonial.length}`);
    console.log(`  🏠 Projects: ${categories.project.length}`);
    console.log(`  📢 Promotional: ${categories.promotional.length}`);
    console.log(`  🗑️  Junk: ${categories.junk.length}`);
    console.log(`📁 Updated file: ${YOUTUBE_VIDEOS_FILE}`);
    
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



