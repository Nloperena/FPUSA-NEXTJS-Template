// Auto-generated from Flickr scraper
// Run 'node scripts/scrape-flickr-albums.js' to update

export interface ProjectPhoto {
  id: string;
  url: string;
  title: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: 'highlight' | 'standard';
  albumUrl: string;
  coverPhoto: string;
  description: string;
  photos: ProjectPhoto[];
}

export const projects: Project[] = [
  {
    id: '72177720316430456',
    title: '581 Sweet Birdie St',
    location: 'Champions Gate, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    coverPhoto: '',
    description: 'Luxury vacation rental transformation with premium design and finishes',
    photos: [
    ]
  },
  {
    id: '72177720300655381',
    title: '2969 Protagonist Street',
    location: 'Orlando, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381',
    coverPhoto: '',
    description: 'Luxury vacation rental transformation with premium design and finishes',
    photos: [
    ]
  },
  {
    id: '72177720309667386',
    title: '4213 Lana Avenue',
    location: 'Kissimmee, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386',
    coverPhoto: '',
    description: 'Luxury vacation rental transformation with premium design and finishes',
    photos: [
    ]
  },
  {
    id: '72177720313910761',
    title: '8952 Takeaway Way',
    location: 'Reunion, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761',
    coverPhoto: '',
    description: 'Luxury vacation rental transformation with premium design and finishes',
    photos: [
    ]
  },
  {
    id: '72157710133541282',
    title: '333 Ocean Course',
    location: 'Windsor at Westside, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282',
    coverPhoto: '',
    description: 'Luxury vacation rental transformation with premium design and finishes',
    photos: [
    ]
  },
  {
    id: '72177720320587147',
    title: '1443 Butterfly Milkweed',
    location: 'Davenport, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147',
    coverPhoto: '',
    description: 'Luxury vacation rental transformation with premium design and finishes',
    photos: [
    ]
  },
  {
    id: '72157719863774016',
    title: '2858 Bookmark Drive',
    location: 'Solterra Resort, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016',
    coverPhoto: '',
    description: 'Complete furnishing package with modern style and functionality',
    photos: [
    ]
  },
  {
    id: '72177720303794132',
    title: '2997 Protagonist',
    location: 'Clermont, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720303794132',
    coverPhoto: '',
    description: 'Complete furnishing package with modern style and functionality',
    photos: [
    ]
  },
  {
    id: '72157711887679752',
    title: '4573 Target Boulevard',
    location: 'Champions Gate, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157711887679752',
    coverPhoto: '',
    description: 'Complete furnishing package with modern style and functionality',
    photos: [
    ]
  },
  {
    id: '72157710956178362',
    title: '8813 Cruden Bay',
    location: 'Orlando, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710956178362',
    coverPhoto: '',
    description: 'Complete furnishing package with modern style and functionality',
    photos: [
    ]
  },
];

export function getHighlightProjects() {
  return projects.filter(p => p.category === 'highlight');
}

export function getStandardProjects() {
  return projects.filter(p => p.category === 'standard');
}

export function getProjectById(id: string) {
  return projects.find(p => p.id === id);
}
