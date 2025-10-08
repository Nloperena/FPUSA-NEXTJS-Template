#!/usr/bin/env node

/**
 * Re-categorize Videos Based on Updated Titles
 * Moves videos to correct categories based on their actual YouTube titles
 */

const fs = require('fs');
const path = require('path');

const YOUTUBE_VIDEOS_FILE = path.join(__dirname, '../src/data/youtube-videos.ts');

// Read and parse the current file
function readVideoFile() {
  const content = fs.readFileSync(YOUTUBE_VIDEOS_FILE, 'utf8');
  return content;
}

// Categorize videos based on their titles
function categorizeVideo(title) {
  const lowerTitle = title.toLowerCase();
  
  // Testimonial indicators
  const testimonialKeywords = [
    'testimonial', 'testimonio', 'review', 'customer', 'client', 
    'satisfied', 'happy', 'recommend', 'experience', 'feedback'
  ];
  
  // Project/portfolio indicators
  const projectKeywords = [
    'interior design', 'vacation home', 'resort', 'makeover', 
    'before and after', 'transformation', 'furniture', 'design',
    'windsor', 'championsgate', 'storey lake', 'paradiso', 'azur',
    'solara', 'veranda palms', 'windsor island', 'windsor cay'
  ];
  
  // Promotional/marketing indicators
  const promotionalKeywords = [
    'booking magnet', 'transform your rental', 'turn your vacation',
    'showroom', 'marketing', 'promo', 'advertisement'
  ];
  
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

// Re-categorize videos
function reCategorizeVideos() {
  try {
    console.log('🔄 Re-categorizing videos based on updated titles...\n');
    
    const content = readVideoFile();
    
    // Extract all videos with their current categories
    const videoRegex = /video_id:\s*"([^"]+)"[^}]*title:\s*"([^"]+)"/g;
    const videos = [];
    let match;
    
    while ((match = videoRegex.exec(content)) !== null) {
      const videoId = match[1];
      const title = match[2];
      const category = categorizeVideo(title);
      videos.push({ videoId, title, category });
    }
    
    console.log('📊 Categorization Results:');
    console.log('==========================');
    
    const categories = {
      testimonial: [],
      project: [],
      promotional: []
    };
    
    videos.forEach(video => {
      categories[video.category].push(video);
      console.log(`${video.category.toUpperCase()}: ${video.title}`);
    });
    
    console.log(`\n📈 Summary:`);
    console.log(`Testimonials: ${categories.testimonial.length}`);
    console.log(`Projects: ${categories.project.length}`);
    console.log(`Promotional: ${categories.promotional.length}`);
    
    // Generate new file content
    const generateVideoArray = (videos, arrayName) => {
      return `export const ${arrayName}: YouTubeVideo[] = [\n${videos.map(video => 
        `  { video_id: "${video.videoId}", url: "https://www.youtube.com/watch?v=${video.videoId}", title: "${video.title}", embedUrl: toEmbedUrl("${video.videoId}") }`
      ).join(',\n')}\n];`;
    };
    
    const newContent = `// YouTube videos scraped from Furniture Packages USA channel
// Regular videos for portfolio, Testimonials for testimonials page

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
    
    console.log('\n✅ Re-categorization complete!');
    console.log(`📁 Updated file: ${YOUTUBE_VIDEOS_FILE}`);
    
  } catch (error) {
    console.error('❌ Error re-categorizing videos:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  reCategorizeVideos();
}

module.exports = { reCategorizeVideos, categorizeVideo };



