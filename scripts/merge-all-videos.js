#!/usr/bin/env node

/**
 * Merge All Videos
 * Combines testimonial videos with promotional and project videos
 */

const fs = require('fs');
const path = require('path');

// All testimonial video IDs (newest to oldest - reversed order)
const TESTIMONIAL_VIDEO_IDS = [
  '1xjIiy7OIcw', '89qSuEsQxVg', 'a33qiydF9vs', 'gPrQgMhnU0Q', 'OcgwqJEhkLk',
  'Dl4M8Y3qwxc', 'zgjp6zIW5mw', '5mpAVtz_BIY', 'lMcMwr_OR2I', 'gXtD_ozOI1Q',
  's3yayGSTFSw', 'ZsNEKO2PdQI', 'fid9BFohso0', 'IbGZ4z3TxRc', 'pnuLQdhiIpM',
  '6W6dXT5L794', '173lYime06w', 'ylh6WmTeXGI', 'z0j5uv6irzc', 'qviBOUHbm_8',
  'hgm3gNDnjps', 'gnR9vz7sVdk', 'RiJuDLwVgX0', 'PESIM-eaz10', 'LBvYnExdFM0',
  'gbmPpO7NrS4', 'PN1R8H8JMUo', 'O78zgZVXEHE', 'MSk_a4z_kmI', 'RhryRwiXPrc',
  '3Bm3zM0_JQo'
];

// Testimonial titles (newest to oldest - reversed order)
const TESTIMONIAL_TITLES = [
  'Testimonial for Furniture Packages USA',
  'Testimonial for Furniture Packages USA',
  'Testimonio De Gaby y Amarie Alicea',
  'Testimonial for Furniture Packages',
  'Testimonial for Furniture Packages USA',
  'Furniture Packages USA Testimonial',
  'Furniture Packages USA Testimonial',
  'Why Choose Furniture Packages USA, Real customer Testimonial',
  'Testimonial for Furniture Packages USA',
  'Testimonial for Furniture Packages USA, Vacation Home Interior Design',
  'Spanish Testimonial for Furniture Packages USA',
  'Testimonial for Furniture Packages USA, Spanish',
  'Testimonial for Furniture Packages USA',
  'Industry Professionals Testimonial for FUrniture Packages USA',
  'Testimonial for Furniture Packages USA',
  'Testimonial for Furniture Packages USA',
  'Testimonial for Furniture Packages USA',
  'Furniture Packages USA, Design Testimonial Español',
  'Furniture Packages USA, Design Testimonial Português',
  'Furniture Packages USA Testimonial',
  'Furniture Packages USA Testimonial,  Lee and Candy',
  'Testimonial Paradise Palms',
  'Vacation Home Owners Testimonial, Furniture Packages USA, In Chinese',
  'Vacation Home Owners Testimonial, Furniture Packages USA, From Brazil',
  'Vacation Home Owners Testimonial, Furniture Packages USA, From U.K.',
  'Vacation Home Owners Testimonial, Furniture Packages USA',
  'Vacation Home Owners Testimonial, Furniture Packages USA',
  'Vacation Home Owners Testimonial, Furniture Packages USA',
  'Vacation Home Owners Testimonial, Furniture Packages USA',
  'Vacation Home Owners Testimonial, Furniture Packages USA',
  '"客户反馈 Vacation Home Owners Testimonial, Furniture Packages USA'
];

// Promotional videos (from comprehensive scrape)
const PROMOTIONAL_VIDEOS = [
  { video_id: "93OvrQaMcyY", title: "Transform your rental into a booking magnet!" },
  { video_id: "VJnt2KvedRc", title: "Transform your rental into a booking magnet!" },
  { video_id: "XSk5w_RdWIw", title: "Transform your rental into a booking magnet!" },
  { video_id: "cFDBzdJCHp8", title: "🏡✨ Turn Your Vacation Home into a Booking Magnet! ✨🏡" },
  { video_id: "XfAJDFu5E5s", title: "🏡✨ Turn Your Vacation Home into a Booking Magnet! ✨🏡" },
  { video_id: "-1pVqIxCB_s", title: "Orlando Vacation Home Interior Design By Furniture Packages USA" }
];

// Project videos (sample from comprehensive scrape)
const PROJECT_VIDEOS = [
  { video_id: "GMoebI8HuZw", title: "Reunion Resort, Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "1f3_mZZveJQ", title: "Storey Lake Resort, Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "jiOo1wtF29M", title: "Vacation Home Interior Design Refresh By Furniture Packages USA" },
  { video_id: "DWtJxWU987s", title: "Vacation Home Interior Design Refresh By Furniture Packages USA" },
  { video_id: "wGXiyq1FQCw", title: "Vacation Home Interior Design Refresh By Furniture Packages USA" },
  { video_id: "8TWFGu_0kLg", title: "Vacation Home Interior Design Refresh By Furniture Packages USA" },
  { video_id: "faAp5jhXBKg", title: "Windsor Cay Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "9Zs1eR1-45k", title: "Windsor Cay Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "J_lenyWTdUk", title: "Vacation Home Game Rooms By Furniture Packages USA in Orlando" },
  { video_id: "yAHtYdBGPA4", title: "Theater Rooms, Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "yau8-eDC6tI", title: "Vacation Home in Windsor Hills, Interior Design by Furniture Packages USA" },
  { video_id: "ghaICLW8nsE", title: "Windsor at Westside Resort, Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "zYXGlIR6XwA", title: "Paradiso Grande Orlando, Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "DuRyChEqbD0", title: "ChampionsGate Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "1YLpXU4OVSE", title: "Azur Resort Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "vHuOSqeZaD8", title: "Orland Vacation Rental Makeovers" },
  { video_id: "PtfV5ooKxh4", title: "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "Wwc2weT68m8", title: "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "CvrbU_GcFMo", title: "Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "on2inzx_Lr0", title: "Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "Xa49aYpDwls", title: "Interior Design By Furniture Packages USA" },
  { video_id: "Yiuh6T58N9U", title: "Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "nHLSasMnCvY", title: "ChampionsGate Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "z357e2nY2x8", title: "ChampionsGate Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "yhh2OXqyeZ4", title: "Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "UyfcKjtvf7k", title: "ChampionsGate Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "sipHV1o846I", title: "Storey Lake Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "sleFJFz65As", title: "Veranda Palms Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "lbfSZ_gg5sM", title: "Windsor at Westside Resort, Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "kuTW1dG3kkA", title: "Design By Furniture Packages USA" },
  { video_id: "i3_GkP2zacE", title: "Solara Resort, Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "dNGRVcUoJps", title: "Storey Lake Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "M6cxBsDtN9w", title: "Design by Furniture Packages USA" },
  { video_id: "0mPvOj5iwy4", title: "Windsor Cay Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "2ezlEodfkIU", title: "Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "34lnPRiU6xo", title: "Storey Lake Vacation Home Interior Design By Furniture Packages USA" },
  { video_id: "L2s_1clo3Ik", title: "Vacation Home in Windsor Hills, Interior Design by Furniture Packages USA" },
  { video_id: "EhtVLS4lmrs", title: "Vacation Home Interior Design in Windsor Hills, By Furniture Packages USA" }
];

// Helper function to convert to embed URL
const toEmbedUrl = (videoId) => `https://www.youtube.com/embed/${videoId}`;

// Generate video array
function generateVideoArray(videos, arrayName) {
  if (videos.length === 0) return `export const ${arrayName}: YouTubeVideo[] = [];`;
  
  return `export const ${arrayName}: YouTubeVideo[] = [\n${videos.map(video => 
    `  { video_id: "${video.video_id}", url: "https://www.youtube.com/watch?v=${video.video_id}", title: "${video.title.replace(/"/g, '\\"')}", embedUrl: toEmbedUrl("${video.video_id}") }`
  ).join(',\n')}\n];`;
}

// Generate testimonial array
function generateTestimonialArray() {
  const testimonialVideos = TESTIMONIAL_VIDEO_IDS.map((videoId, index) => ({
    video_id: videoId,
    title: TESTIMONIAL_TITLES[index] || `Testimonial ${index + 1}`
  }));
  
  return `export const testimonialVideos: YouTubeVideo[] = [\n${testimonialVideos.map(video => 
    `  { video_id: "${video.video_id}", url: "https://www.youtube.com/watch?v=${video.video_id}", title: "${video.title.replace(/"/g, '\\"')}", embedUrl: toEmbedUrl("${video.video_id}") }`
  ).join(',\n')}\n];`;
}

// Generate the complete file content
function generateCompleteFile() {
  return `// YouTube videos scraped from Furniture Packages USA channel
// Complete collection with all testimonials from 10+ years
// Generated on ${new Date().toISOString()}
// Total videos: ${PROMOTIONAL_VIDEOS.length + PROJECT_VIDEOS.length + TESTIMONIAL_VIDEO_IDS.length}

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

// Promotional/Marketing videos (${PROMOTIONAL_VIDEOS.length} videos)
${generateVideoArray(PROMOTIONAL_VIDEOS, 'promotionalVideos')}

// Project showcase videos (${PROJECT_VIDEOS.length} videos)
${generateVideoArray(PROJECT_VIDEOS, 'regularVideos')}

// Client testimonial videos (${TESTIMONIAL_VIDEO_IDS.length} videos - complete 10+ year collection)
${generateTestimonialArray()}

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
}

// Main function
function mergeAllVideos() {
  try {
    console.log('🔄 Merging all videos...\n');
    
    const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');
    
    // Generate complete file content
    const completeContent = generateCompleteFile();
    
    // Write the file
    fs.writeFileSync(YOUTUBE_VIDEOS_FILE, completeContent, 'utf8');
    
    console.log('✅ All videos merged successfully!');
    console.log('================================');
    console.log(`📢 Promotional videos: ${PROMOTIONAL_VIDEOS.length}`);
    console.log(`🏠 Project videos: ${PROJECT_VIDEOS.length}`);
    console.log(`🗣️  Testimonial videos: ${TESTIMONIAL_VIDEO_IDS.length}`);
    console.log(`📈 Total videos: ${PROMOTIONAL_VIDEOS.length + PROJECT_VIDEOS.length + TESTIMONIAL_VIDEO_IDS.length}`);
    console.log(`📁 Updated file: ${YOUTUBE_VIDEOS_FILE}`);
    
    console.log('\n🗣️  Sample Testimonials (10+ year collection):');
    TESTIMONIAL_TITLES.slice(0, 10).forEach((title, index) => {
      console.log(`  ${index + 1}. ${title}`);
    });
    console.log(`  ... and ${TESTIMONIAL_TITLES.length - 10} more`);
    
  } catch (error) {
    console.error('❌ Error merging videos:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  mergeAllVideos();
}

module.exports = { mergeAllVideos };
