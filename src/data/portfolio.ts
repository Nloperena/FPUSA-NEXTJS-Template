export interface PortfolioProject {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  link: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "The Whispering Palms Package",
    imageUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/04/The-Whispering-Palms-Package-900x604.jpeg",
    link: "https://furniturepackagesusa.com/portfolio/the-whispering-palms-package/"
  },
  {
    id: "2",
    title: "The Celestial Hideaway Package",
    description: "A beautiful and modern dining rooms. Using a color pallet consisting of black, light greys and some gold accents.",
    imageUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/07/DiningRoom-900x604.jpg",
    link: "https://furniturepackagesusa.com/portfolio/the-celestial-hideaway-package/"
  },
  {
    id: "3",
    title: "The Timeless Allure Package",
    imageUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/05/52422920691_a68c04a151_k-900x604.jpg",
    link: "https://furniturepackagesusa.com/portfolio/the-timeless-allure-package/"
  },
  {
    id: "4",
    title: "Vibrant Oasis Package",
    description: "Living Room complete with luxury seating, a dining room, and a real marble backsplash against behind the TV.",
    imageUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/07/LivingRoom-900x604.jpg",
    link: "https://furniturepackagesusa.com/portfolio/vibrant-oasis-package/"
  },
  {
    id: "5",
    title: "Be Our Guest Getaway",
    imageUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/04/Be-Our-Guest-Getaway-900x604.jpeg",
    link: "https://furniturepackagesusa.com/portfolio/be-our-guest-getaway/"
  },
  {
    id: "6",
    title: "Enchanted Retreat Package",
    imageUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/04/The-Enchanted-Contemporary-Retreat-Package-900x604.jpeg",
    link: "https://furniturepackagesusa.com/portfolio/enchanted-retreat-package/"
  }
];

export interface VideoTestimonial {
  id: string;
  thumbnailUrl: string;
  videoUrl: string;
  alt: string;
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "1",
    thumbnailUrl: "https://furniturepackagesusa.com/wp-content/uploads/2024/05/testimonial-thumb-5-2024.jpg",
    videoUrl: "https://vimeo.com/940908016",
    alt: "Home furniture decor"
  },
  {
    id: "2",
    thumbnailUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/01/video-testimonial-thumb-5.webp",
    videoUrl: "https://vimeo.com/356342350",
    alt: "Video testimonial"
  },
  {
    id: "3",
    thumbnailUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/06/David-Jennifer-3-3.jpg",
    videoUrl: "https://vimeo.com/831923388",
    alt: "David and Jennifer sitting on a couch in their newly furnished living room."
  },
  {
    id: "4",
    thumbnailUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/06/Sebrena-2.jpg",
    videoUrl: "https://vimeo.com/manage/videos/800630969",
    alt: "Sebrena, a client of Furniture Packages USA, speaks about her experience with the company and their service."
  },
  {
    id: "5",
    thumbnailUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/01/video-testimonial-thumb-3.jpg",
    videoUrl: "https://vimeo.com/358493578",
    alt: "Video testimonial"
  },
  {
    id: "6",
    thumbnailUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/01/video-testimonial-thumb-4-1.jpg",
    videoUrl: "https://vimeo.com/358456452",
    alt: "Video testimonial"
  },
  {
    id: "7",
    thumbnailUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/01/video-testimonial-thumb-0.jpg",
    videoUrl: "https://vimeo.com/358457432",
    alt: "Video testimonial"
  },
  {
    id: "8",
    thumbnailUrl: "https://furniturepackagesusa.com/wp-content/uploads/2023/01/video-testimonial-thumb-2.webp",
    videoUrl: "https://vimeo.com/356339334",
    alt: "Video testimonial"
  }
];




