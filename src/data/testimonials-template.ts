/**
 * TESTIMONIALS TEMPLATE
 * 
 * Use this template to add your 40+ testimonials to google-reviews.ts
 * 
 * INSTRUCTIONS:
 * 1. Copy the template below for each new review
 * 2. Fill in the details
 * 3. Add to the googleReviews array in google-reviews.ts
 * 4. Increment the ID for each new review (11, 12, 13, etc.)
 */

import { GoogleReview } from './google-reviews';

// TEMPLATE - Copy this for each new testimonial:
const testimonialTemplate: GoogleReview = {
  id: "11", // Increment this number for each new review
  clientName: "John Doe", // Full name of the client
  clientPhoto: "https://ui-avatars.com/api/?name=John+Doe&background=1B3764&color=fff&size=400", // Google photo URL or use default
  rating: 5, // 1-5 stars
  reviewText: "Amazing experience working with Furniture Packages USA! They transformed our vacation rental...", // Full review text
  date: "2 weeks ago", // How long ago (e.g., "2 weeks ago", "a month ago", "3 months ago")
  location: "Orlando, FL" // Optional: Location or property type
};

// EXAMPLE - Multiple testimonials ready to add:
export const newTestimonials: GoogleReview[] = [
  {
    id: "11",
    clientName: "Jennifer Williams",
    clientPhoto: "https://ui-avatars.com/api/?name=Jennifer+Williams&background=1B3764&color=fff&size=400",
    rating: 5,
    reviewText: "Joe and Laura went above and beyond for our 8-bedroom resort home. The attention to detail was incredible, and our booking rate increased by 40% after the redesign!",
    date: "2 weeks ago",
    location: "Champions Gate, FL"
  },
  {
    id: "12",
    clientName: "Michael Chen",
    clientPhoto: "https://ui-avatars.com/api/?name=Michael+Chen&background=1B3764&color=fff&size=400",
    rating: 5,
    reviewText: "As a remote investor, I needed a team I could trust completely. Furniture Packages USA delivered exactly that. Professional, responsive, and the results speak for themselves.",
    date: "3 weeks ago",
    location: "California Investor"
  },
  {
    id: "13",
    clientName: "Sarah Martinez",
    clientPhoto: "https://ui-avatars.com/api/?name=Sarah+Martinez&background=1B3764&color=fff&size=400",
    rating: 5,
    reviewText: "We hired them for a full package on our 5-bedroom villa. From Disney-themed kids rooms to elegant master suites, every room was perfection. Worth every penny!",
    date: "a month ago",
    location: "Windsor at Westside"
  },
  // Add more reviews following this pattern...
];

/**
 * TIPS FOR COLLECTING TESTIMONIALS:
 * 
 * 1. Google Reviews: Export from your Google Business Profile
 * 2. Email: Request from past clients
 * 3. Social Media: Collect from Facebook, Instagram comments
 * 4. Direct: Ask during final walkthrough or delivery
 * 
 * PHOTO URLS:
 * - Google photos: Right-click > Copy image address
 * - No photo? Use the ui-avatars.com API (already included in template)
 * - Format: https://ui-avatars.com/api/?name=First+Last&background=1B3764&color=fff&size=400
 * 
 * BEST PRACTICES:
 * - Keep reviews authentic and unedited
 * - Include location or property type for context
 * - Mix recent and older reviews for credibility
 * - Highlight different services (design, installation, photography, etc.)
 * - Include various property types (condos, villas, townhomes, etc.)
 */


