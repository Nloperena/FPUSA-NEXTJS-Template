// YouTube videos scraped from Furniture Packages USA channel
// Regular videos for portfolio, Testimonials for testimonials page

export interface YouTubeVideo {
  video_id: string;
  url: string;
  title: string;
  embedUrl: string;
}

// Helper function to convert to embed URL
const toEmbedUrl = (videoId: string) => `https://www.youtube.com/embed/${videoId}`;

// Helper function to filter videos with 'testimonial' in title
export const filterTestimonialVideos = (videos: YouTubeVideo[]): YouTubeVideo[] => {
  return videos.filter(video => video.title.toLowerCase().includes('testimonial'));
};

// Promotional/Marketing videos
export const promotionalVideos: YouTubeVideo[] = [
  { video_id: "93OvrQaMcyY", url: "https://www.youtube.com/watch?v=93OvrQaMcyY", title: "Transform your rental into a booking magnet!", embedUrl: toEmbedUrl("93OvrQaMcyY") },
  { video_id: "VJnt2KvedRc", url: "https://www.youtube.com/watch?v=VJnt2KvedRc", title: "Transform your rental into a booking magnet!", embedUrl: toEmbedUrl("VJnt2KvedRc") },
  { video_id: "XSk5w_RdWIw", url: "https://www.youtube.com/watch?v=XSk5w_RdWIw", title: "Transform your rental into a booking magnet!", embedUrl: toEmbedUrl("XSk5w_RdWIw") },
  { video_id: "cFDBzdJCHp8", url: "https://www.youtube.com/watch?v=cFDBzdJCHp8", title: "🏡✨ Turn Your Vacation Home into a Booking Magnet! ✨🏡", embedUrl: toEmbedUrl("cFDBzdJCHp8") },
  { video_id: "XfAJDFu5E5s", url: "https://www.youtube.com/watch?v=XfAJDFu5E5s", title: "🏡✨ Turn Your Vacation Home into a Booking Magnet! ✨🏡", embedUrl: toEmbedUrl("XfAJDFu5E5s") }
];

// Actual project showcase videos
export const regularVideos: YouTubeVideo[] = [
  { video_id: "GMoebI8HuZw", url: "https://www.youtube.com/watch?v=GMoebI8HuZw", title: "Reunion Resort, Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("GMoebI8HuZw") },
  { video_id: "J_lenyWTdUk", url: "https://www.youtube.com/watch?v=J_lenyWTdUk", title: "Vacation Home Game Rooms By Furniture Packages USA in Orlando", embedUrl: toEmbedUrl("J_lenyWTdUk") },
  { video_id: "Y8HLlzROEhg", url: "https://www.youtube.com/watch?v=Y8HLlzROEhg", title: "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("Y8HLlzROEhg") },
  { video_id: "1f3_mZZveJQ", url: "https://www.youtube.com/watch?v=1f3_mZZveJQ", title: "Storey Lake Resort, Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("1f3_mZZveJQ") },
  { video_id: "jiOo1wtF29M", url: "https://www.youtube.com/watch?v=jiOo1wtF29M", title: "Vacation Home Interior Design Refresh By Furniture Packages USA", embedUrl: toEmbedUrl("jiOo1wtF29M") },
  { video_id: "DWtJxWU987s", url: "https://www.youtube.com/watch?v=DWtJxWU987s", title: "Vacation Home Interior Design Refresh By Furniture Packages USA", embedUrl: toEmbedUrl("DWtJxWU987s") },
  { video_id: "wGXiyq1FQCw", url: "https://www.youtube.com/watch?v=wGXiyq1FQCw", title: "Vacation Home Interior Design Refresh By Furniture Packages USA", embedUrl: toEmbedUrl("wGXiyq1FQCw") },
  { video_id: "8TWFGu_0kLg", url: "https://www.youtube.com/watch?v=8TWFGu_0kLg", title: "Vacation Home Interior Design Refresh By Furniture Packages USA", embedUrl: toEmbedUrl("8TWFGu_0kLg") },
  { video_id: "faAp5jhXBKg", url: "https://www.youtube.com/watch?v=faAp5jhXBKg", title: "Windsor Cay Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("faAp5jhXBKg") },
  { video_id: "9Zs1eR1-45k", url: "https://www.youtube.com/watch?v=9Zs1eR1-45k", title: "Windsor Cay Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("9Zs1eR1-45k") },
  { video_id: "yAHtYdBGPA4", url: "https://www.youtube.com/watch?v=yAHtYdBGPA4", title: "Theater Rooms, Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("yAHtYdBGPA4") },
  { video_id: "yau8-eDC6tI", url: "https://www.youtube.com/watch?v=yau8-eDC6tI", title: "Vacation Home in Windsor Hills, Interior Design by Furniture Packages USA", embedUrl: toEmbedUrl("yau8-eDC6tI") },
  { video_id: "ghaICLW8nsE", url: "https://www.youtube.com/watch?v=ghaICLW8nsE", title: "Windsor at Westside Resort, Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("ghaICLW8nsE") },
  { video_id: "zYXGlIR6XwA", url: "https://www.youtube.com/watch?v=zYXGlIR6XwA", title: "Paradiso Grande Orlando, Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("zYXGlIR6XwA") },
  { video_id: "DuRyChEqbD0", url: "https://www.youtube.com/watch?v=DuRyChEqbD0", title: "ChampionsGate Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("DuRyChEqbD0") },
  { video_id: "1YLpXU4OVSE", url: "https://www.youtube.com/watch?v=1YLpXU4OVSE", title: "Azur Resort Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("1YLpXU4OVSE") },
  { video_id: "vHuOSqeZaD8", url: "https://www.youtube.com/watch?v=vHuOSqeZaD8", title: "Orland Vacation Rental Makeovers", embedUrl: toEmbedUrl("vHuOSqeZaD8") },
  { video_id: "PtfV5ooKxh4", url: "https://www.youtube.com/watch?v=PtfV5ooKxh4", title: "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("PtfV5ooKxh4") },
  { video_id: "PH5jMkr5u4A", url: "https://www.youtube.com/watch?v=PH5jMkr5u4A", title: "Vacation Home Makeover, by Furniture Packages USA, Before and After Demo", embedUrl: toEmbedUrl("PH5jMkr5u4A") },
  { video_id: "Wwc2weT68m8", url: "https://www.youtube.com/watch?v=Wwc2weT68m8", title: "Windsor Island Resort Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("Wwc2weT68m8") },
  { video_id: "CvrbU_GcFMo", url: "https://www.youtube.com/watch?v=CvrbU_GcFMo", title: "Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("CvrbU_GcFMo") },
  { video_id: "on2inzx_Lr0", url: "https://www.youtube.com/watch?v=on2inzx_Lr0", title: "Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("on2inzx_Lr0") },
  { video_id: "Xa49aYpDwls", url: "https://www.youtube.com/watch?v=Xa49aYpDwls", title: "Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("Xa49aYpDwls") },
  { video_id: "Yiuh6T58N9U", url: "https://www.youtube.com/watch?v=Yiuh6T58N9U", title: "Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("Yiuh6T58N9U") },
  { video_id: "nHLSasMnCvY", url: "https://www.youtube.com/watch?v=nHLSasMnCvY", title: "ChampionsGate Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("nHLSasMnCvY") },
  { video_id: "z357e2nY2x8", url: "https://www.youtube.com/watch?v=z357e2nY2x8", title: "ChampionsGate Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("z357e2nY2x8") },
  { video_id: "yhh2OXqyeZ4", url: "https://www.youtube.com/watch?v=yhh2OXqyeZ4", title: "Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("yhh2OXqyeZ4") },
  { video_id: "UyfcKjtvf7k", url: "https://www.youtube.com/watch?v=UyfcKjtvf7k", title: "ChampionsGate Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("UyfcKjtvf7k") },
  { video_id: "sipHV1o846I", url: "https://www.youtube.com/watch?v=sipHV1o846I", title: "Storey Lake Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("sipHV1o846I") },
  { video_id: "sleFJFz65As", url: "https://www.youtube.com/watch?v=sleFJFz65As", title: "Veranda Palms Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("sleFJFz65As") },
  { video_id: "lbfSZ_gg5sM", url: "https://www.youtube.com/watch?v=lbfSZ_gg5sM", title: "Windsor at Westside Resort, Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("lbfSZ_gg5sM") },
  { video_id: "kuTW1dG3kkA", url: "https://www.youtube.com/watch?v=kuTW1dG3kkA", title: "Design By Furniture Packages USA", embedUrl: toEmbedUrl("kuTW1dG3kkA") },
  { video_id: "i3_GkP2zacE", url: "https://www.youtube.com/watch?v=i3_GkP2zacE", title: "Solara Resort, Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("i3_GkP2zacE") },
  { video_id: "dNGRVcUoJps", url: "https://www.youtube.com/watch?v=dNGRVcUoJps", title: "Storey Lake Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("dNGRVcUoJps") },
  { video_id: "M6cxBsDtN9w", url: "https://www.youtube.com/watch?v=M6cxBsDtN9w", title: "Design by Furniture Packages USA", embedUrl: toEmbedUrl("M6cxBsDtN9w") },
  { video_id: "0mPvOj5iwy4", url: "https://www.youtube.com/watch?v=0mPvOj5iwy4", title: "Windsor Cay Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("0mPvOj5iwy4") },
  { video_id: "2ezlEodfkIU", url: "https://www.youtube.com/watch?v=2ezlEodfkIU", title: "Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("2ezlEodfkIU") },
  { video_id: "34lnPRiU6xo", url: "https://www.youtube.com/watch?v=34lnPRiU6xo", title: "Storey Lake Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("34lnPRiU6xo") },
  { video_id: "L2s_1clo3Ik", url: "https://www.youtube.com/watch?v=L2s_1clo3Ik", title: "Vacation Home in Windsor Hills, Interior Design by Furniture Packages USA", embedUrl: toEmbedUrl("L2s_1clo3Ik") },
  { video_id: "-1pVqIxCB_s", url: "https://www.youtube.com/watch?v=-1pVqIxCB_s", title: "Orlando Vacation Home Interior Design By Furniture Packages USA", embedUrl: toEmbedUrl("-1pVqIxCB_s") },
  { video_id: "EhtVLS4lmrs", url: "https://www.youtube.com/watch?v=EhtVLS4lmrs", title: "Vacation Home Interior Design in Windsor Hills, By Furniture Packages USA", embedUrl: toEmbedUrl("EhtVLS4lmrs") }
];

export const testimonialVideos: YouTubeVideo[] = [
  { video_id: "1xjIiy7OIcw", url: "https://www.youtube.com/watch?v=1xjIiy7OIcw", title: "Testimonial for Furniture Packages USA", embedUrl: toEmbedUrl("1xjIiy7OIcw") },
  { video_id: "YaWuqzxeATc", url: "https://www.youtube.com/watch?v=YaWuqzxeATc", title: "🗣️ Testimonial from Rick & Linda", embedUrl: toEmbedUrl("YaWuqzxeATc") },
  { video_id: "a33qiydF9vs", url: "https://www.youtube.com/watch?v=a33qiydF9vs", title: "Testimonio De Gaby y Amarie Alicea", embedUrl: toEmbedUrl("a33qiydF9vs") },
  { video_id: "PjXyKM9ou-E", url: "https://www.youtube.com/watch?v=PjXyKM9ou-E", title: "Testimonial for Furniture Packages USA, Portuguse", embedUrl: toEmbedUrl("PjXyKM9ou-E") },
  { video_id: "OcgwqJEhkLk", url: "https://www.youtube.com/watch?v=OcgwqJEhkLk", title: "Testimonial for Furniture Packages USA", embedUrl: toEmbedUrl("OcgwqJEhkLk") },
  { video_id: "by b2xPAHCO0", url: "https://www.youtube.com/watch?v=by b2xPAHCO0", title: "Testimonial for Furniture Packages USA", embedUrl: toEmbedUrl("by b2xPAHCO0") }
];

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
