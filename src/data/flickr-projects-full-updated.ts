// Complete Flickr Project Data - Using Unsplash placeholders until Flickr API is connected
// All photos and metadata stored locally for fast loading

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

// HIGHLIGHT PROJECTS
export const projects: Project[] = [
  // Highlight Project 1
  {
    id: 'champions-gate-luxury',
    title: 'Champions Gate Luxury Estate',
    location: 'Champions Gate, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    coverPhoto: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop&q=80',
    description: 'Complete luxury vacation rental transformation featuring modern design, premium finishes, and themed kids rooms',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop&q=80', title: 'Living Room', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200&h=800&fit=crop&q=80', title: 'Kitchen', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop&q=80', title: 'Primary Bedroom', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&h=800&fit=crop&q=80', title: 'Kids Room', width: 1200, height: 800 },
      { id: '5', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&h=800&fit=crop&q=80', title: 'Dining Area', width: 1200, height: 800 },
      { id: '6', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80', title: 'Game Room', width: 1200, height: 800 }
    ]
  },
  
  // Highlight Project 2
  {
    id: 'kissimmee-modern',
    title: 'Modern Kissimmee Villa',
    location: 'Kissimmee, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    coverPhoto: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&q=80',
    description: 'Contemporary design with elegant furnishings, open floor plan, and resort-style amenities',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&q=80', title: 'Great Room', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80', title: 'Living Space', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop&q=80', title: 'Master Suite', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&h=800&fit=crop&q=80', title: 'Themed Bedroom', width: 1200, height: 800 },
      { id: '5', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80', title: 'Pool Area', width: 1200, height: 800 }
    ]
  },

  // Highlight Project 3
  {
    id: 'orlando-family-home',
    title: 'Orlando Family Resort Home',
    location: 'Orlando, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381',
    coverPhoto: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&q=80',
    description: 'Spacious family-friendly vacation home with multiple themed kids rooms and entertainment areas',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&q=80', title: 'Entry & Living', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&h=800&fit=crop&q=80', title: 'Dining Room', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop&q=80', title: 'Galaxy Room', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop&q=80', title: 'Princess Suite', width: 1200, height: 800 },
      { id: '5', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80', title: 'Game Room', width: 1200, height: 800 },
      { id: '6', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80', title: 'Pool Deck', width: 1200, height: 800 }
    ]
  },

  // Highlight Project 4
  {
    id: 'coastal-themed-resort',
    title: 'Coastal Themed Resort Villa',
    location: 'Reunion, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386',
    coverPhoto: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&q=80',
    description: 'Beach-inspired design with light colors, coastal accents, and ocean-themed kids rooms',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&q=80', title: 'Coastal Living Room', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200&h=800&fit=crop&q=80', title: 'Beach Kitchen', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop&q=80', title: 'Ocean Bedroom', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&h=800&fit=crop&q=80', title: 'Nautical Kids Room', width: 1200, height: 800 },
      { id: '5', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80', title: 'Outdoor Lounge', width: 1200, height: 800 }
    ]
  },

  // Highlight Project 5
  {
    id: 'contemporary-luxury-villa',
    title: 'Contemporary Luxury Villa',
    location: 'Windsor at Westside, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761',
    coverPhoto: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop&q=80',
    description: 'High-end modern design with premium furniture, designer fixtures, and luxury finishes throughout',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop&q=80', title: 'Modern Living', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=80', title: 'Gourmet Kitchen', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop&q=80', title: 'Luxury Primary', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop&q=80', title: 'Designer Bath', width: 1200, height: 800 },
      { id: '5', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80', title: 'Entertainment Room', width: 1200, height: 800 },
      { id: '6', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80', title: 'Resort Pool', width: 1200, height: 800 }
    ]
  },

  // Highlight Project 6
  {
    id: 'classic-vacation-rental',
    title: 'Classic Vacation Rental',
    location: 'Davenport, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282',
    coverPhoto: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=800&fit=crop&q=80',
    description: 'Timeless design with comfortable furnishings, warm accents, and inviting living spaces',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=800&fit=crop&q=80', title: 'Classic Living', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&h=800&fit=crop&q=80', title: 'Formal Dining', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop&q=80', title: 'Traditional Bedroom', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop&q=80', title: 'Kids Bedroom', width: 1200, height: 800 },
      { id: '5', url: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&h=800&fit=crop&q=80', title: 'Patio', width: 1200, height: 800 }
    ]
  },

  // Highlight Project 7
  {
    id: 'premium-resort-property',
    title: 'Premium Resort Property',
    location: 'Solterra Resort, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147',
    coverPhoto: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&h=800&fit=crop&q=80',
    description: 'Upscale vacation home with luxury amenities, designer finishes, and resort-style features',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&h=800&fit=crop&q=80', title: 'Grand Living', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=80', title: 'Chef Kitchen', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop&q=80', title: 'Premium Suite', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80', title: 'Arcade Room', width: 1200, height: 800 },
      { id: '5', url: 'https://images.unsplash.com/photo-1635274494493-5460345c19b0?w=1200&h=800&fit=crop&q=80', title: 'Movie Theater', width: 1200, height: 800 },
      { id: '6', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80', title: 'Resort Pool', width: 1200, height: 800 }
    ]
  },

  // Standard Project 1
  {
    id: 'vacation-home-package',
    title: 'Complete Vacation Home Package',
    location: 'Kissimmee, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016',
    coverPhoto: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop&q=80',
    description: 'Complete furnishing package for vacation rental property with modern style and functionality',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop&q=80', title: 'Living Area', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=80', title: 'Kitchen & Dining', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop&q=80', title: 'Bedroom', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop&q=80', title: 'Second Bedroom', width: 1200, height: 800 }
    ]
  },

  // Standard Project 2
  {
    id: 'orlando-rental-transformation',
    title: 'Orlando Rental Transformation',
    location: 'Orlando, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720303794132',
    coverPhoto: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&h=800&fit=crop&q=80',
    description: 'Full property makeover with modern furniture, contemporary decor, and updated finishes',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&h=800&fit=crop&q=80', title: 'Renovated Living', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&q=80', title: 'Updated Kitchen', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&q=80', title: 'New Furnishings', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop&q=80', title: 'Fresh Bedroom', width: 1200, height: 800 }
    ]
  },

  // Standard Project 3
  {
    id: 'cozy-vacation-cottage',
    title: 'Cozy Vacation Cottage',
    location: 'Clermont, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157711887679752',
    coverPhoto: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&h=800&fit=crop&q=80',
    description: 'Warm and inviting design for smaller vacation properties with efficient space planning',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&h=800&fit=crop&q=80', title: 'Cozy Living', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=800&fit=crop&q=80', title: 'Compact Kitchen', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop&q=80', title: 'Charming Bedroom', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop&q=80', title: 'Guest Room', width: 1200, height: 800 }
    ]
  },

  // Standard Project 4
  {
    id: 'family-resort-home',
    title: 'Family Resort Home',
    location: 'Davenport, FL',
    category: 'standard',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72157710956178362',
    coverPhoto: 'https://images.unsplash.com/photo-1600607686895-ea43949fcbc0?w=1200&h=800&fit=crop&q=80',
    description: 'Kid-friendly design with durable furniture, fun accents, and family-oriented spaces',
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600607686895-ea43949fcbc0?w=1200&h=800&fit=crop&q=80', title: 'Family Room', width: 1200, height: 800 },
      { id: '2', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&q=80', title: 'Open Kitchen', width: 1200, height: 800 },
      { id: '3', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop&q=80', title: 'Kids Bunk Room', width: 1200, height: 800 },
      { id: '4', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80', title: 'Play Area', width: 1200, height: 800 }
    ]
  }
];

// Get all highlight projects
export function getHighlightProjects() {
  return projects.filter(p => p.category === 'highlight');
}

// Get all standard projects
export function getStandardProjects() {
  return projects.filter(p => p.category === 'standard');
}

// Get project by ID
export function getProjectById(id: string) {
  return projects.find(p => p.id === id);
}


