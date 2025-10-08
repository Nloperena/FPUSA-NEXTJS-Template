import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { designs } from '@/data/designs';
import { flickrPhotos } from '@/data/flickr-portfolio';
import { portfolioProjects } from '@/data/portfolio';
import { getFeaturedTestimonials, getFeaturedVideos } from '@/data/youtube-videos';
import { googleReviews } from '@/data/google-reviews';

// Dynamic imports for heavy components
const SpotlightCard = dynamic(() => import('@/components/SpotlightCard'), { ssr: false });
const ScrollFloat = dynamic(() => import('@/components/ScrollFloat'), { ssr: false });
const Carousel = dynamic(() => import('@/components/ui/apple-cards-carousel').then(mod => ({ default: mod.Carousel })), { ssr: false });
const Card = dynamic(() => import('@/components/ui/apple-cards-carousel').then(mod => ({ default: mod.Card })), { ssr: false });
const AnimatedTestimonials = dynamic(() => import('@/components/ui/animated-testimonials').then(mod => ({ default: mod.AnimatedTestimonials })), { ssr: false });
const GoogleReviewsGrid = dynamic(() => import('@/components/GoogleReviewsGrid'), { ssr: false });
const HeroParallax = dynamic(() => import('@/components/ui/hero-parallax').then(mod => ({ default: mod.HeroParallax })), { ssr: false });
const VideoSkeleton = dynamic(() => import('@/components/VideoSkeleton'), { ssr: false });
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), { ssr: false });
const HowItWorks = dynamic(() => import('@/components/HowItWorks'), { ssr: false });
const YouTubeThumbnail = dynamic(() => import('@/components/YouTubeThumbnail'), { ssr: false });
const BlurText = dynamic(() => import('@/components/ui/blur-text'), { ssr: false });
const NewsTicker = dynamic(() => import('@/components/NewsTicker'), { ssr: false });
const TestimonialTicker = dynamic(() => import('@/components/TestimonialTicker'), { ssr: false });

// Client component for interactive sections
const InteractiveSections = dynamic(() => import('@/components/InteractiveSections'), { ssr: false });

export default function Home() {
  const [backgroundVideoLoaded, setBackgroundVideoLoaded] = useState(false);
  const [contentVideoLoaded, setContentVideoLoaded] = useState(false);
  const [backgroundVideoError, setBackgroundVideoError] = useState(false);
  const [contentVideoError, setContentVideoError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [contentVideoPlaying, setContentVideoPlaying] = useState(true);

  // Retry function for failed videos
  const retryVideo = () => {
    setRetryCount(prev => prev + 1);
    setBackgroundVideoError(false);
    setContentVideoError(false);
    setBackgroundVideoLoaded(false);
    setContentVideoLoaded(false);
  };

  // Timeout fallback to prevent infinite skeleton loading
  React.useEffect(() => {
    const backgroundTimeout = setTimeout(() => {
      if (!backgroundVideoLoaded && !backgroundVideoError) {
        console.log('Background video loading timeout - showing fallback');
        setBackgroundVideoError(true);
      }
    }, 5000); // 5 second timeout - more aggressive

    const contentTimeout = setTimeout(() => {
      if (!contentVideoLoaded && !contentVideoError) {
        console.log('Content video loading timeout - showing fallback');
        setContentVideoError(true);
      }
    }, 4000); // 4 second timeout - more aggressive

    return () => {
      clearTimeout(backgroundTimeout);
      clearTimeout(contentTimeout);
    };
  }, [backgroundVideoLoaded, backgroundVideoError, contentVideoLoaded, contentVideoError]);

  // Additional fallback - if videos don't load within 3 seconds, show content anyway
  React.useEffect(() => {
    const emergencyTimeout = setTimeout(() => {
      if (!backgroundVideoLoaded && !backgroundVideoError) {
        console.log('Emergency fallback - forcing video to show content');
        setBackgroundVideoError(true);
      }
      if (!contentVideoLoaded && !contentVideoError) {
        console.log('Emergency fallback - forcing content video to show content');
        setContentVideoError(true);
      }
    }, 3000); // 3 second emergency timeout

    return () => clearTimeout(emergencyTimeout);
  }, []);

  return (
    <div className="relative bg-white">
      {/* News Ticker */}
      <NewsTicker />
      
      {/* Hero Section with Video Background and Parallax Images */}
      <div className="relative">
        {/* Video Background - Fixed */}
        <div className="fixed top-0 left-0 w-screen h-screen z-0 overflow-hidden">
          {/* Background Video Skeleton */}
          {(!backgroundVideoLoaded && !backgroundVideoError) && (
            <div className="absolute inset-0 w-full h-full">
              <VideoSkeleton 
                className="absolute inset-0 w-full h-full"
                isBackground={true}
              />
              {/* Loading progress indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-80">
                Loading video...
              </div>
            </div>
          )}
          
          {/* Error Fallback */}
          {backgroundVideoError && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B3764] to-[#115B87] flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-lg font-medium">Video Loading</p>
                <p className="text-sm opacity-80 mb-4">Experience our designs</p>
                {retryCount < 3 && (
                  <button
                    onClick={retryVideo}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    Retry Loading
                  </button>
                )}
              </div>
            </div>
          )}
          
          <iframe 
            src="https://player.vimeo.com/video/825630813?h=1e14851030&muted=1&background=1&app_id=58479&autoplay=1&loop=1&autopause=0"
            className={`absolute top-1/2 left-1/2 transition-all duration-1000 ease-in-out motion-safe:${
              backgroundVideoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } motion-reduce:opacity-100 motion-reduce:scale-100`}
            style={{ 
              width: '177.77777778vh',
              height: '100vh',
              minWidth: '100vw',
              minHeight: '56.25vw',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="FPUSA Background Video"
            loading="lazy"
            onLoad={() => {
              console.log('Background video loaded successfully');
              // Add a small delay to ensure smooth transition
              setTimeout(() => {
                setBackgroundVideoLoaded(true);
              }, 500);
            }}
            onError={(e) => {
              console.log('Background video error:', e);
              setBackgroundVideoError(true);
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content that slides over - High z-index */}
        <div className="relative z-20">
          {/* Hero Content - Trusted Vacation Rental Furnishings */}
          <div className="relative z-10">
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center text-white max-w-6xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
                  Trusted Vacation Rental Furnishings for Florida Homeowners
                </h1>
                <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 drop-shadow-lg leading-relaxed">
                  Serving Florida Since 2001, we've helped hundreds of property owners create guest-ready spaces that feel like home. From full furniture packages to cost-effective refreshes, our family-owned team delivers quality, comfort, and peace of mind — every time.
                </p>
                
                {/* Mobile subtext */}
                <p className="text-lg md:hidden max-w-3xl mx-auto mb-6 drop-shadow-lg opacity-90">
                  Over 1,000 Central Florida homes furnished and refreshed. Family-owned. Locally trusted.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <Button asChild size="lg" className="bg-[#F16022] hover:bg-[#F16022]/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg">
                    <Link href="/contact">Start My Free Consultation</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1B3764] px-8 py-4 text-lg font-semibold rounded-full shadow-lg">
                    <Link href="/our-designs">View Design Packages</Link>
                  </Button>
                </div>
                
                {/* Tagline */}
                <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto">
                  Flexible financing available — from $8,000 up to $250,000 • Fast approval • Local expertise you can trust
                </p>
              </div>
            </div>
          </div>

          {/* Discover Our Latest Designs Section - Slides over video */}
          <section className="relative bg-white py-20" role="region" aria-labelledby="about-heading">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column - Content & Video */}
              <div className="lg:col-span-8 pr-0 lg:pr-20">
                <p className="text-gray-600 font-medium text-lg mb-4">Furniture Packages USA</p>
                <h2 id="about-heading" className="text-4xl md:text-7xl font-bold text-[#1B3764] mb-4 scroll-mt-24">
                  About Us
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Turn-key furnishing for Central Florida vacation rentals—designed, delivered, installed, and photographed by one local team.
                </p>
                
                {/* Trust Stats Row */}
                <ul className="flex flex-wrap items-center gap-3 mb-6 text-sm font-medium text-gray-600" aria-label="Company highlights">
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#F16022] rounded-full" aria-hidden="true"></div>
                    <span>22+ years in Central Florida</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#F16022] rounded-full" aria-hidden="true"></div>
                    <span>1,000+ installs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#F16022] rounded-full" aria-hidden="true"></div>
                    <span>BBB A+</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#F16022] rounded-full" aria-hidden="true"></div>
                    <span>Financing $8k–$250k</span>
                  </li>
                </ul>
                
                {/* YouTube Video - Behind the Scenes Look */}
                <div className="aspect-video mb-8 rounded-lg overflow-hidden shadow-lg relative">
                  {/* Video status announcement */}
                  <div id="video-status" className="sr-only" aria-live="polite"></div>
                  {/* Click-to-Play Poster */}
                  {!contentVideoPlaying && (
                    <button 
                      type="button"
                      className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1B3764] to-[#115B87] flex items-center justify-center cursor-pointer group focus:outline-none focus:ring-4 focus:ring-[#F16022] focus:ring-opacity-50"
                      onClick={(e) => {
                        setContentVideoPlaying(true);
                        // Update button ARIA states
                        const button = e.currentTarget;
                        button.setAttribute('aria-expanded', 'true');
                        button.setAttribute('aria-pressed', 'true');
                        // Announce status
                        const status = document.getElementById('video-status');
                        if (status) {
                          status.textContent = 'Video playing';
                        }
                        // Move focus to iframe after it loads
                        setTimeout(() => {
                          const iframe = document.getElementById('about-video');
                          if (iframe) {
                            iframe.focus();
                          }
                        }, 100);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setContentVideoPlaying(true);
                          // Update button ARIA states
                          const button = e.currentTarget;
                          button.setAttribute('aria-expanded', 'true');
                          button.setAttribute('aria-pressed', 'true');
                          // Announce status
                          const status = document.getElementById('video-status');
                          if (status) {
                            status.textContent = 'Video playing';
                          }
                          // Move focus to iframe after it loads
                          setTimeout(() => {
                            const iframe = document.getElementById('about-video');
                            if (iframe) {
                              iframe.focus();
                            }
                          }, 100);
                        }
                      }}
                      aria-label="Play 'Behind the Scenes' video"
                      aria-controls="about-video"
                      aria-expanded="false"
                      aria-pressed="false"
                      data-intent="play-about-video"
                    >
                      {/* Poster Image */}
                      <img 
                        src="https://i.ytimg.com/vi/1_tueZ5zC3w/maxresdefault.jpg"
                        alt="Behind the Scenes — Furniture Packages USA"
                        width={1600}
                        height={900}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="high"
                      />
                      {/* Play Button Overlay */}
                      <div className="relative z-10 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 motion-safe:group-hover:bg-white/30 motion-reduce:group-hover:bg-white/20 transition-colors">
                          <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <p className="text-lg font-medium mb-2">Behind the Scenes</p>
                        <p className="text-sm opacity-80">Click to watch our latest designs</p>
                      </div>
                    </button>
                  )}
                  
                  {/* YouTube iframe - only load when playing */}
                  {contentVideoPlaying && (
                    <iframe 
                      id="about-video"
                      src="https://www.youtube.com/embed/1_tueZ5zC3w?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Behind the Scenes — Furniture Packages USA"
                      loading="lazy"
                      referrerPolicy="origin-when-cross-origin"
                    />
                  )}
                  
                  {/* No-JS Fallback */}
                  <noscript>
                  <iframe 
                    src="https://www.youtube.com/embed/1_tueZ5zC3w?rel=0&modestbranding=1&showinfo=0"
                      className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                      title="Behind the Scenes — Furniture Packages USA"
                    />
                  </noscript>
                </div>
                
                {/* Watch on YouTube Link - Always Visible */}
                <div className="text-center mb-6">
                  <a 
                    href="https://www.youtube.com/watch?v=1_tueZ5zC3w"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#F16022] hover:text-[#E55A1A] text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:ring-opacity-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </a>
                </div>
                
                {/* About Text */}
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed mb-8">
                  <p>
                    At <strong>Furniture Packages USA</strong>, we believe furnishing your rental should feel effortless.
                  </p>
                  <p>
                    For over two decades, we've designed and installed complete furniture solutions for short-term rentals, second homes, and investment properties across Central Florida. Our turnkey approach ensures every project is completed with precision and care.
                  </p>
                  <p>
                    Whether you're refreshing a property or furnishing a new vacation rental or second home, we handle everything — design, sourcing, delivery, installation, and photography — so you can focus on what matters most: hosting great guests and maximizing your investment.
                  </p>
                  <p>
                    We've worked with owners, investors, and realtors across Kissimmee, Davenport, and Orlando to make every property guest-ready.
                  </p>
                  
                  {/* Why Us + Financing */}
                  <div className="bg-[#F16022]/5 p-6 rounded-lg border-l-4 border-[#F16022]">
                    <p className="font-semibold text-[#1B3764] mb-2">Why Choose Us?</p>
                    <p className="text-gray-700 mb-3">
                      A local team with 22+ years and flexible financing—premium setups on your timeline.
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      Over 1,000 installs completed across Kissimmee, Davenport, and Orlando.<sup><a href="#testimonials" className="text-[#F16022] hover:underline text-xs">¹</a></sup>
                    </p>
                  </div>
                  
                  {/* Service Areas */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-3">We furnish vacation homes across Central Florida—fast installs and local support in:</p>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <li>Kissimmee</li>
                      <li>Davenport</li>
                      <li>Orlando</li>
                      <li>Celebration</li>
                      <li>Windermere</li>
                      <li>Clermont</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-3">
                      Average install: 1–2 days per home*<br />
                      <span className="text-xs">*based on scope and inventory availability</span>
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link 
                  href="/about"
                  className="inline-flex items-center gap-2 text-white bg-[#1B3764] hover:bg-[#1B3764]/90 px-8 py-4 rounded-md font-semibold transition-all group"
                    data-intent="learn-about"
                    aria-label="Learn more about Furniture Packages USA"
                    title="Company story, team, FAQs"
                >
                    Learn More About Us
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                  <a 
                    href="/our-process"
                    className="inline-flex items-center gap-2 text-[#F16022] hover:text-[#E55A1A] px-8 py-4 rounded-md font-semibold transition-all group border border-[#F16022] hover:border-[#E55A1A]"
                    data-intent="see-process"
                    aria-label="See our install day process"
                    title="See our install day process (2–3 minute read)"
                  >
                    See our install day process →
                  </a>
                </div>

                {/* Visual Divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <span>BBB A+ Rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                      </svg>
                    </div>
                    <span>Google ★★★★★</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </div>
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-6 h-6 bg-[#F16022]/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#F16022]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span>Financing Available</span>
                  </div>
                </div>

              </div>

              {/* Right Column - Contact Form */}
              <div className="lg:col-span-4">
                <div className="bg-[#fff7ef] p-8 rounded-2xl shadow-lg sticky top-24" role="complementary" aria-label="Contact form">
                  <p className="text-[#F16022] font-medium text-lg mb-2">Have Questions? Get in Touch.</p>
                  <h3 className="text-3xl font-bold text-[#1B3764] mb-6">Ask Us Below</h3>
                  <div id="form-errors" className="sr-only" aria-live="polite" aria-atomic="true"></div>
                  
                  <form className="space-y-4" aria-label="Contact form" data-source="about" noValidate>
                    <p className="text-sm text-gray-600">
                      <span className="text-red-500">*</span> indicates required fields
                    </p>
                    
                    {/* Honeypot field - hidden from users */}
                    <div className="hidden">
                      <label htmlFor="website">Website (leave blank)</label>
                      <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    
                    {/* Hidden source field for attribution */}
                    <input type="hidden" name="source" value="about" />
                    
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-700">
                        First Name<span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        type="text"
                        required 
                        className="bg-white"
                        autoComplete="given-name"
                        inputMode="text"
                        data-intent="form-start"
                        onFocus={() => {
                          // Track form start
                          if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'form_start', {
                              event_category: 'engagement',
                              event_label: 'about_contact_form'
                            });
                          }
                        }}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-700">
                        Last Name<span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        type="text"
                        required 
                        className="bg-white"
                        autoComplete="family-name"
                        inputMode="text"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                        Your Email<span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email" 
                        required 
                        className="bg-white"
                        autoComplete="email"
                        inputMode="email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700">
                        Your Phone<span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel" 
                        required 
                        className="bg-white"
                        autoComplete="tel-national"
                        inputMode="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10}|\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}"
                        placeholder="(407) 348-8848"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2 text-gray-700">
                        Project Budget
                      </label>
                      <select 
                        id="budget"
                        name="budget"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:border-transparent bg-white"
                      >
                        <option value="" disabled>Select budget range</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="over-100k">Over $100,000</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium mb-2 text-gray-700">
                        Timeline
                      </label>
                      <select 
                        id="timeline"
                        name="timeline"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:border-transparent bg-white"
                      >
                        <option value="" disabled>Select timeline</option>
                        <option value="asap">ASAP (within 2 weeks)</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="planning">Just planning ahead</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium mb-2 text-gray-700">
                        Property Location
                      </label>
                      <select 
                        id="location"
                        name="location"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:border-transparent bg-white"
                      >
                        <option value="" disabled>Select location</option>
                        <option value="kissimmee">Kissimmee</option>
                        <option value="davenport">Davenport</option>
                        <option value="orlando">Orlando</option>
                        <option value="celebration">Celebration</option>
                        <option value="windermere">Windermere</option>
                        <option value="clermont">Clermont</option>
                        <option value="other">Other Central Florida</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="hearAbout" className="block text-sm font-medium mb-2 text-gray-700">
                        How did you hear about us?<span className="text-red-500">*</span>
                      </label>
                      <select 
                        id="hearAbout"
                        name="hearAbout"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:border-transparent bg-white"
                      >
                        <option value="" disabled>Select option</option>
                        <option value="google">Google Search</option>
                        <option value="referral">Referral from friend/client</option>
                        <option value="realtor">Realtor recommendation</option>
                        <option value="social">Social Media</option>
                        <option value="website">Website browsing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                        Your Message<span className="text-red-500">*</span>
                      </label>
                      <Textarea 
                        id="message"
                        name="message"
                        required 
                        className="bg-white min-h-[120px]"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        name="privacy"
                        required
                        className="mt-1 h-4 w-4 text-[#1B3764] focus:ring-[#1B3764] border-gray-300 rounded"
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-600">
                        I agree to the <a href="/privacy" className="text-[#1B3764] hover:underline">Privacy Policy</a> and consent to being contacted about my project.
                      </label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-[#1B3764] hover:bg-[#1B3764]/90 text-white font-semibold py-6" data-intent="contact-form-submit">
                      SEND MESSAGE
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          </section>

        

          {/* How It Works Section */}
          <HowItWorks />

          {/* Our Designs Section */}
          <section className="py-20 bg-gray-50">
            <div className="w-full">
              <div className="max-w-7xl mx-auto px-4 mb-8">
                <h2 className="text-6xl md:text-8xl font-bold text-[#1B3764] mb-4">
                  Our Designs
                </h2>
                <p className="text-2xl text-gray-600 mb-4 text-left">Quality and Variety</p>
                <p className="text-xl text-gray-600 mb-8 text-left">Stunning designs that wow guests and boost bookings across Central Florida.</p>
              </div>
              
              <Carousel items={designs.slice(0, 12).map((design, index) => (
                <Card 
                  key={design.id} 
                  card={{
                    src: design.imageUrl,
                    title: design.name,
                    category: "Vacation Rental Design",
                    content: (
                      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl">
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-8">
                          <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            {design.name}
                          </span>
                          {" "}
                          This stunning design showcases our ability to create memorable spaces that wow guests and maximize bookings for your vacation rental property.
                        </p>
                        <img
                          src={design.imageUrl}
                          alt={design.name}
                          height="500"
                          width="500"
                          className="md:w-3/4 md:h-3/4 h-full w-full mx-auto object-contain rounded-lg"
                        />
                      </div>
                    )
                  }} 
                  index={index} 
                />
              ))} />

              <div className="text-left mt-12">
                <Button asChild size="lg" className="bg-[#F16022] hover:bg-[#F16022]/90 text-white">
                  <Link href="/our-designs">VIEW ALL DESIGNS</Link>
                </Button>
              </div>
            </div>
          </section>

           {/* Why Choose Us Section - Modern Version */}
           <WhyChooseUs />

           {/* Financing Section */}
           <section className="py-20 bg-gradient-to-br from-[#1B3764] to-[#2A4A6B] text-white">
             <div className="container mx-auto px-4 max-w-6xl">
               <div className="text-center mb-12">
                 <h2 className="text-5xl md:text-6xl font-bold mb-6">
                   Flexible Financing for Every Project
                 </h2>
                 <p className="text-xl md:text-2xl mb-8 opacity-90">
                   From $8,000 to $250,000 • Quick approvals • Competitive rates
                 </p>
                 <p className="text-lg max-w-3xl mx-auto mb-6 opacity-80">
                   Whether you're furnishing a new property or updating an existing one, we make it easier to get started without delaying your next guest booking.
                 </p>
                 <p className="text-lg max-w-3xl mx-auto mb-8 opacity-80">
                   We partner with trusted financing providers to help property owners get started without heavy upfront costs.
                 </p>
                 <Button asChild size="lg" className="bg-[#F16022] hover:bg-[#F16022]/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg">
                   <Link href="/contact">Explore Financing Options</Link>
                 </Button>
               </div>
             </div>
           </section>

          {/* Our Projects Section - Marquee Effect with YouTube Thumbnails */}
          <section className="py-20 bg-[#1B3764]">
            <div className="w-full px-4">
              {/* BlurText Heading */}
              <div className="mb-12 text-center">
                <h2 className="text-6xl md:text-8xl font-bold text-white mb-4">
                  Recent Florida Projects
                </h2>
                <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                  Explore our recent Central Florida transformations — from cozy retreats to luxury villas, each designed to enhance guest comfort and style.
                </p>
                <Link href="/portfolio" className="text-white font-semibold hover:text-[#F16022] hover:underline flex items-center gap-2 justify-center">
                    VIEW ALL PROJECTS
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
              </div>
              
              {/* Marquee Effect with YouTube Thumbnails */}
              <div className="relative w-full">
                <HeroParallax 
                  products={getFeaturedVideos(15).map(video => ({
                    title: video.title,
                    link: video.url,
                    thumbnail: `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`
                  }))}
                />
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12">
            <h2 className="text-6xl md:text-8xl font-bold text-[#1B3764] mb-4">
              Real Clients. Real Transformations.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mb-4">
              Hear directly from Florida homeowners and realtors who've trusted us to furnish and style their vacation properties.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mb-8">
              Every review and video here comes from real clients who trusted us with their homes — and their guests' first impressions.
            </p>
            <Link href="/testimonials" className="text-[#F16022] font-semibold hover:underline flex items-center gap-2">
              See More Client Reviews
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Google Reviews - Animated Carousel */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#1B3764] mb-6 text-left">FEATURED REVIEWS</h3>
            <AnimatedTestimonials 
              testimonials={googleReviews.slice(0, 5).map(review => ({
                quote: review.reviewText,
                name: review.clientName,
                designation: review.location || "Home Owner",
                src: review.clientPhoto
              }))}
              autoplay={true}
            />
          </div>

          {/* Google Reviews - Grid Gallery */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#1B3764] mb-6 text-left">GOOGLE REVIEWS - CLICK TO READ</h3>
            <GoogleReviewsGrid reviews={googleReviews} />
          </div>


          </div>
          </section>

          {/* Testimonial Video Ticker */}
          <TestimonialTicker videos={getFeaturedTestimonials(10)} />

          {/* Testimonial Callout */}
          <div className="text-center py-12 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <p className="text-xl text-gray-700 leading-relaxed">
                "We're proud to be a family-run business with hundreds of satisfied clients. Every design you see here represents our dedication to service and detail."
              </p>
                        </div>
                        </div>

          {/* Community Impact Section */}
          <section className="py-20 bg-gradient-to-br from-[#1B3764] to-[#2A4A6B] text-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-16">
                  <h2 className="text-6xl md:text-8xl font-bold text-white mb-6">
                    Building Community, One Home at a Time
                  </h2>
                <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                  We give 10% of our income to local organizations, funding programs that feed families, support medical research, and create lasting memories for children.
                </p>
                <p className="text-lg text-white/90 max-w-4xl mx-auto mb-8">
                  When you choose Furniture Packages USA, you're not just upgrading a home — you're helping build hope right here in Florida.
                </p>
                        </div>

              {/* Partner Organizations */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-center mb-12">Partner Organizations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#F16022] to-[#E55A1A] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-[#1B3764] mb-3">St. Jude Children's Research Hospital</h4>
                      <p className="text-gray-600">
                        Advancing cures for childhood cancer.
                      </p>
                        </div>
                        </div>

                  <div className="text-center group">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#1B3764] to-[#2A4A6B] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-[#1B3764] mb-3">Give Kids the World Village</h4>
                      <p className="text-gray-600">
                        Creating magical vacations for critically ill children.
                      </p>
                    </div>
                  </div>

                  <div className="text-center group">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-[#1B3764] mb-3">Second Harvest Food Bank</h4>
                      <p className="text-gray-600">
                        Fighting hunger across Central Florida.
                      </p>
                    </div>
                    </div>
                  </div>
                </div>
                
              {/* Values Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
                <h3 className="text-4xl font-bold text-center mb-12">Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#F16022] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      </div>
                    <h4 className="text-xl font-bold mb-3">Integrity</h4>
                    <p className="text-white/80">Honest, transparent communication.</p>
                      </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#F16022] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Excellence</h4>
                    <p className="text-white/80">Exceptional craftsmanship and service.</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#F16022] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                      </div>
                    <h4 className="text-xl font-bold mb-3">Community</h4>
                    <p className="text-white/80">We give back through every project.</p>
                      </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#F16022] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Reliability</h4>
                    <p className="text-white/80">Consistent, dependable results.</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#F16022] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      </div>
                    <h4 className="text-xl font-bold mb-3">Innovation</h4>
                    <p className="text-white/80">Fresh ideas, proven results.</p>
                      </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#F16022] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Giving Back</h4>
                    <p className="text-white/80">Making a lasting local impact.</p>
                  </div>
                </div>
                
                {/* Final Callout */}
                <div className="text-center mt-12">
                  <p className="text-2xl font-medium text-white/90 italic">
                    Together, we're creating homes that serve guests — and hearts that serve others.
                  </p>
                </div>
              </div>
            </div>
          </section>


          {/* Final CTA Section */}
          <section className="py-20 bg-gradient-to-br from-[#F16022] to-[#D35127] text-white">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-4">
            Let's Transform Your Property — Together
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-4xl mx-auto">
            Ready to take the next step? Our local Orlando team is ready to help you plan your project and get your property guest-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button asChild size="lg" className="bg-white text-[#F16022] hover:bg-gray-100 text-lg px-10 py-6 rounded-full shadow-lg">
              <Link href="/contact">Start My Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#F16022] text-lg px-10 py-6 rounded-full shadow-lg">
              <a href="tel:4073488848" data-intent="call">Call (407) 348-8848</a>
          </Button>
          </div>
          <p className="text-lg opacity-90">
            Or call/text us directly at <a href="tel:4073488848" className="text-white hover:underline">(407) 348-8848</a> — we're local and ready to help.
          </p>
          <p className="text-base opacity-80 mt-2">
            Prefer email? <a href="mailto:info@furniturepackagesusa.com" className="text-white hover:underline">info@furniturepackagesusa.com</a>
          </p>
          </div>
          </section>
        </div>
      </div>
    </div>
  );
}
