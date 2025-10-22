// Flickr Project Albums for Furniture Packages USA
// Data structure for project galleries scraped from Flickr

export interface FlickrProject {
  id: string;
  title: string;
  albumId: string;
  albumUrl: string;
  coverPhotoId: string;
  category: 'highlight' | 'standard';
  description?: string;
  photoCount?: number;
  photos: FlickrPhoto[];
}

export interface FlickrPhoto {
  id: string;
  title: string;
  description?: string;
  url_o?: string; // Original size
  url_l?: string; // Large size (1024px)
  url_c?: string; // Medium size (800px)
  url_z?: string; // Medium size (640px)
  url_m?: string; // Small size (240px)
  width?: number;
  height?: number;
  secret?: string;
  server?: string;
  farm?: number;
}

// HIGHLIGHT PROJECTS - Premium showcases
export const highlightProjects: FlickrProject[] = [
  {
    id: 'project-1',
    title: 'Luxury Vacation Home - Champions Gate',
    albumId: '72177720316430456',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    coverPhotoId: '53675134748',
    category: 'highlight',
    description: 'Complete luxury vacation rental transformation featuring modern design and premium finishes',
    photoCount: 0, // Will be populated by API
    photos: []
  },
  {
    id: 'project-2',
    title: 'Modern Vacation Rental - Kissimmee',
    albumId: '72177720316430456',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    coverPhotoId: '53675267494',
    category: 'highlight',
    description: 'Contemporary design with elegant furnishings and stylish accents',
    photoCount: 0,
    photos: []
  },
  {
    id: 'project-3',
    title: 'Family Vacation Home - Orlando',
    albumId: '72177720300655381',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381',
    coverPhotoId: '52227303761',
    category: 'highlight',
    description: 'Spacious family-friendly design with themed kids rooms',
    photoCount: 0,
    photos: []
  },
  {
    id: 'project-4',
    title: 'Coastal Themed Resort Home',
    albumId: '72177720309667386',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386',
    coverPhotoId: '53036288115',
    category: 'highlight',
    description: 'Beach-inspired design with light colors and coastal accents',
    photoCount: 0,
    photos: []
  },
  {
    id: 'project-5',
    title: 'Contemporary Luxury Villa',
    albumId: '72177720313910761',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761',
    coverPhotoId: '53452040898',
    category: 'highlight',
    description: 'High-end modern design with premium furniture and fixtures',
    photoCount: 0,
    photos: []
  },
  {
    id: 'project-6',
    title: 'Classic Vacation Rental',
    albumId: '72157710133541282',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282',
    coverPhotoId: '48471464722',
    category: 'highlight',
    description: 'Timeless design with comfortable furnishings and warm accents',
    photoCount: 0,
    photos: []
  },
  {
    id: 'project-7',
    title: 'Premium Resort Property',
    albumId: '72177720320587147',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147',
    coverPhotoId: '54021066631',
    category: 'highlight',
    description: 'Upscale vacation home with luxury amenities and designer finishes',
    photoCount: 0,
    photos: []
  }
];

// STANDARD PROJECTS - Quality portfolio pieces
export const standardProjects: FlickrProject[] = [
  {
    id: 'project-8',
    title: 'Vacation Home Package',
    albumId: '72157719863774016',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016',
    coverPhotoId: '51484941947',
    category: 'standard',
    description: 'Complete furnishing package for vacation rental property',
    photoCount: 0,
    photos: []
  },
  {
    id: 'project-9',
    title: 'Orlando Rental Transformation',
    albumId: '72177720303794132',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720303794132',
    coverPhotoId: '52508844298',
    category: 'standard',
    description: 'Full property makeover with modern furniture and decor',
    photoCount: 0,
    photos: []
  },
  {
    id: 'project-10',
    title: 'Cozy Vacation Cottage',
    albumId: '72157711887679752',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157711887679752',
    coverPhotoId: '49104400853',
    category: 'standard',
    description: 'Warm and inviting design for smaller vacation properties',
    photoCount: 0,
    photos: []
  },
  {
    id: 'project-11',
    title: 'Family Resort Home',
    albumId: '72157710956178362',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710956178362',
    coverPhotoId: '48761164663',
    category: 'standard',
    description: 'Kid-friendly design with durable furniture and fun accents',
    photoCount: 0,
    photos: []
  }
];

// Combined list of all projects
export const allProjects = [...highlightProjects, ...standardProjects];

// Get projects by category
export function getProjectsByCategory(category: 'highlight' | 'standard') {
  return allProjects.filter(project => project.category === category);
}

// Get project by ID
export function getProjectById(id: string) {
  return allProjects.find(project => project.id === id);
}

// Flickr API configuration
export const FLICKR_CONFIG = {
  userId: 'furniturepackagesusa',
  apiEndpoint: 'https://api.flickr.com/services/rest/',
  // NOTE: Add your Flickr API key in .env.local as NEXT_PUBLIC_FLICKR_API_KEY
  // Get your API key from: https://www.flickr.com/services/apps/create/
};

// Helper function to construct Flickr photo URL
export function getFlickrPhotoUrl(
  photo: { farm?: number; server?: string; id: string; secret?: string },
  size: 'o' | 'l' | 'c' | 'z' | 'm' = 'l'
): string {
  if (!photo.farm || !photo.server || !photo.secret) {
    return '/placeholder-image.jpg';
  }

  const sizeCode = size === 'o' ? '' : `_${size}`;
  return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}${sizeCode}.jpg`;
}

// Helper to extract album ID from URL
export function extractAlbumId(url: string): string {
  const match = url.match(/albums\/(\d+)/);
  return match ? match[1] : '';
}

// Helper to extract photo ID from URL
export function extractPhotoId(url: string): string {
  const match = url.match(/with\/(\d+)/);
  return match ? match[1] : '';
}


