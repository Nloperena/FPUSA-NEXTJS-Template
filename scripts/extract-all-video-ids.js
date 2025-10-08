#!/usr/bin/env node

/**
 * Extract ALL Video IDs from Channel Page
 * Parses the provided channel HTML to extract ALL video IDs from the entire channel history
 */

// Based on the channel page you provided, I can see there are 636+ videos
// Let me extract the video IDs from the titles you provided

const ALL_VIDEO_TITLES = [
  // Recent videos (2024-2025)
  "Transform your rental into a booking magnet!",
  "Transform your rental into a booking magnet!",
  "Transform your rental into a booking magnet!",
  "Transform your rental into a booking magnet!",
  "Transform your rental into a booking magnet!",
  "Transform your rental into a booking magnet!",
  "Reunion Resort, Vacation Home Interior Design By Furniture Packages USA",
  "Storey Lake Resort, Vacation Home Interior Design By Furniture Packages USA",
  "Vacation Home Interior Design Refresh By Furniture Packages USA",
  "Vacation Home Interior Design Refresh By Furniture Packages USA",
  "Vacation Home Interior Design Refresh By Furniture Packages USA",
  "Testimonial for Furniture Packages USA",
  "Paradiso Grande Orlando, Vacation Home Interior Design By Furniture Packages USA",
  "Vacation Home Interior Design Refresh By Furniture Packages USA",
  "Windsor Cay Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Cay Vacation Home Interior Design By Furniture Packages USA",
  "🏡✨ Turn Your Vacation Home into a Booking Magnet! ✨🏡",
  "🏡✨ Turn Your Vacation Home into a Booking Magnet! ✨🏡",
  "🏡✨ Turn Your Vacation Home into a Booking Magnet! ✨🏡",
  "Vacation Home Game Rooms By Furniture Packages USA in Orlando",
  "Theater Rooms, Vacation Home Interior Design By Furniture Packages USA",
  "🗣️ Testimonial from Rick & Linda",
  "ChampionsGate Vacation Home Interior Design By Furniture Packages USA",
  "Azur Resort Vacation Home Interior Design By Furniture Packages USA",
  "Vacation Home Interior Design in Championsgate Florida, By Furniture Packages USA",
  "Emerald Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "15 Bedroom Vacation Home - Interior Design By Furniture Packages USA",
  "Windsor Cay Vacation Home Interior Design By Furniture Packages USA",
  "From Blank to Brilliant - Crafting the Ultimate 15 Bedroom Vacation Home",
  "Azur Resort Vacation Home Interior Design By Furniture Packages USA",
  "Testimonial for Furniture Packages USA",
  "Testimonio De Gaby y Amarie Alicea",
  "ChampionsGate Vacation Home Interior Design By Furniture Packages USA",
  "ChampionsGate Vacation Home Interior Design By Furniture Packages USA",
  "ChampionsGate Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "ChampionsGate Vacation Home Interior Design By Furniture Packages USA",
  "Testimonial for Furniture Packages",
  "Azur Resort Vacation Home Interior Design By Furniture Packages USA",
  "Azur Resort Vacation Home Interior Design By Furniture Packages USA",
  "Azur Resort Vacation Home Interior Design By Furniture Packages USA",
  "Azur Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Veranda Palms Vacation Home Interior Design By Furniture Packages USA",
  "Storey Lake Vacation Home Interior Design By Furniture Packages USA",
  "Azur Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "The Enclaves at Festival Vacation Home Interior Design By Furniture Packages USA",
  "Emerald Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Testimonial for Furniture Packages USA",
  "Orland Vacation Rental Makeovers",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Furniture Packages USA Testimonial",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Furniture Packages USA Testimonial",
  "Vacation Home Makeover, by Furniture Packages USA, Before and After Demo",
  "Storey Lake Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Vacation Home Make Over",
  "ChampionsGate Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Why Choose Furniture Packages USA, Real customer Testimonial",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Storey Lake Vacation Home Interior Design By Furniture Packages USA",
  "ChampionsGate Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor at Westside Resort, Vacation Home Interior Design By Furniture Packages USA",
  "Storey Lake Resort, Vacation Home Interior Design By Furniture Packages USA",
  "Solara Resort, Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Storey Lake Vacation Home Interior Design By Furniture Packages USA",
  "Storey Lake Vacation Home Interior Design By Furniture Packages USA",
  "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA",
  "Storey Lake Vacation Home Interior Design By Furniture Packages USA",
  "Solara Resort, Vacation Home Interior Design By Furniture Packages USA",
  "Storey Lake Vacation Home Interior Design By Furniture Packages USA",
  "Testimonial for Furniture Packages USA",
  "Design by Furniture Packages USA",
  "Windsor Cay Vacation Home Interior Design By Furniture Packages USA",
  "Vacation Home Interior Design By Furniture Packages USA",
  "Storey Lake Vacation Home Interior Design By Furniture Packages USA",
  "Testimonial for Furniture Packages USA",
  "Vacation Home in Windsor Hills, Interior Design by Furniture Packages USA",
  "Orlando Vacation Home Interior Design By Furniture Packages USA",
  "Vacation Home Interior Design in Windsor Hills, By Furniture Packages USA",
  
  // And many more going back 10+ years...
  // The issue is we need the actual video IDs, not just the titles
];

console.log('📊 Video Title Analysis');
console.log('======================');
console.log(`Total titles provided: ${ALL_VIDEO_TITLES.length}`);
console.log('Note: We need the actual video IDs to scrape these videos');
console.log('The channel has 636+ videos, but we only have titles, not video IDs');

// Categorize the titles we have
const categories = {
  testimonial: [],
  project: [],
  promotional: [],
  junk: []
};

ALL_VIDEO_TITLES.forEach(title => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('testimonial') || lowerTitle.includes('testimonio')) {
    categories.testimonial.push(title);
  } else if (lowerTitle.includes('booking magnet') || lowerTitle.includes('transform your rental')) {
    categories.promotional.push(title);
  } else if (lowerTitle.includes('interior design') || lowerTitle.includes('vacation home') || lowerTitle.includes('resort')) {
    categories.project.push(title);
  } else {
    categories.junk.push(title);
  }
});

console.log('\n📈 Title Categorization:');
console.log(`🗣️  Testimonials: ${categories.testimonial.length}`);
console.log(`🏠 Projects: ${categories.project.length}`);
console.log(`📢 Promotional: ${categories.promotional.length}`);
console.log(`🗑️  Junk: ${categories.junk.length}`);

console.log('\n🗣️  Sample Testimonials:');
categories.testimonial.slice(0, 10).forEach((title, index) => {
  console.log(`  ${index + 1}. ${title}`);
});

console.log('\n🏠 Sample Projects:');
categories.project.slice(0, 10).forEach((title, index) => {
  console.log(`  ${index + 1}. ${title}`);
});

console.log('\n❌ Problem: We need the actual video IDs to scrape these videos');
console.log('The channel page shows titles but not the video IDs in the HTML');
console.log('We need to either:');
console.log('1. Use YouTube API to get all video IDs from the channel');
console.log('2. Manually extract video IDs from the channel page');
console.log('3. Use a different scraping method');

module.exports = { ALL_VIDEO_TITLES, categories };



