'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { designs } from '@/data/designs';
import { flickrPhotos } from '@/data/flickr-portfolio';
import { getFeaturedVideos } from '@/data/youtube-videos';
import { googleReviews } from '@/data/google-reviews';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import SpotlightCard from '@/components/SpotlightCard';
import GoogleReviewsGrid from '@/components/GoogleReviewsGrid';
import VideoModal from '@/components/VideoModal';
import YouTubeThumbnail from '@/components/YouTubeThumbnail';
import { ParallaxScroll } from '@/components/ParallaxScroll';
import ScrollFloat from '@/components/ScrollFloat';
import { submitContactForm } from '@/app/actions/contact';

export default function InteractiveSections() {
  const [backgroundVideoLoaded, setBackgroundVideoLoaded] = useState(false);
  const [contentVideoLoaded, setContentVideoLoaded] = useState(false);
  const [backgroundVideoError, setBackgroundVideoError] = useState(false);
  const [contentVideoError, setContentVideoError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [contentVideoPlaying, setContentVideoPlaying] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [formState, setFormState] = useState<{
    isSubmitting: boolean;
    success: boolean;
    error: string | null;
  }>({
    isSubmitting: false,
    success: false,
    error: null,
  });

  // Retry function for failed videos
  const retryVideo = () => {
    setRetryCount(prev => prev + 1);
    setBackgroundVideoError(false);
    setContentVideoError(false);
  };

  // Intersection Observer for video pause when off-screen
  useEffect(() => {
    const videoElement = document.getElementById('about-video');
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const iframe = videoElement as HTMLIFrameElement;
        if (!iframe.contentWindow) return;
        
        // Pause video when not visible
        if (!entry.isIntersecting) {
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "pauseVideo" }),
            "*"
          );
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, [contentVideoPlaying]);

  // Form submission handler
  const handleFormSubmit = async (formData: FormData) => {
    setFormState({ isSubmitting: true, success: false, error: null });
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setFormState({ isSubmitting: false, success: true, error: null });
        // Reset form after success
        const form = document.getElementById('contact-form') as HTMLFormElement;
        if (form) form.reset();
      } else {
        setFormState({ 
          isSubmitting: false, 
          success: false, 
          error: result.error || 'Something went wrong' 
        });
      }
    } catch (error) {
      setFormState({ 
        isSubmitting: false, 
        success: false, 
        error: 'Network error. Please try again.' 
      });
    }
  };

  return (
    <>
      {/* Background Video Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Loading State */}
        {!backgroundVideoLoaded && !backgroundVideoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3764] to-[#115B87] flex items-center justify-center z-10">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-lg font-medium">Loading video...</p>
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
                  <a href="tel:4073488848" data-intent="call">Call (407) 348-8848</a>
                </Button>
              </div>
              
              <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto">
                Flexible financing available — from $8,000 up to $250,000 • Fast approval • Local expertise you can trust
              </p>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <section role="region" aria-labelledby="about-heading" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="about-heading" className="text-4xl md:text-7xl font-bold text-[#1B3764] mb-4 scroll-mt-24">
                About Us
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Turn-key furnishing for Central Florida vacation rentals—designed, delivered, installed, and photographed by one local team. Serving Kissimmee, Davenport, Orlando.
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
                
                {/* Always show thumbnail by default */}
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
                  style={{ display: contentVideoPlaying ? 'none' : 'flex' }}
                >
                  {/* YouTube Thumbnail */}
                  <Image
                    src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
                    alt="Behind the Scenes — Furniture Packages USA"
                    width={1600}
                    height={900}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                    onError={(e) => {
                      // Fallback to a placeholder if YouTube thumbnail fails
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSI5MDAiIHZpZXdCb3g9IjAgMCAxNjAwIDkwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2MDAiIGhlaWdodD0iOTAwIiBmaWxsPSIjMUJCNzY0Ii8+CjxwYXRoIGQ9Ik04MDAgNDAwTDEwMDAgNTAwTDgwMCA2MDBWNDAwWiIgZmlsbD0iI0YxNjAyMiIvPgo8L3N2Zz4K';
                    }}
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
                
                {/* YouTube iframe - only load when playing */}
                {contentVideoPlaying && (
                  <iframe 
                    id="about-video"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1&playsinline=1"
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
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&showinfo=0"
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
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div className="space-y-8">
                {/* Why Choose Us Card */}
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

                {/* Trust Badges */}
                <div className="border-t border-gray-200 my-8"></div>
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <a 
                    href="https://www.bbb.org/us/fl/orlando/profile/furniture-dealers/furniture-packages-usa-llc-0633-1000000000"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B3764] transition-colors bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:ring-opacity-50"
                    data-intent="badge-click-bbb"
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <span>BBB A+ Rating</span>
                    <span className="sr-only">Read our BBB profile</span>
                  </a>
                  <a 
                    href="https://www.google.com/maps/place/Furniture+Packages+USA"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B3764] transition-colors bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:ring-opacity-50"
                    data-intent="badge-click-google"
                  >
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                      </svg>
                    </div>
                    <span>Google ★★★★★</span>
                    <span className="sr-only">Google 5-star rating</span>
                    <span className="text-[#F16022] hover:underline text-xs">Read reviews</span>
                  </a>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </div>
                    <span>Licensed & Insured</span>
                    <span className="sr-only">Licensed and Insured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <div className="w-6 h-6 bg-[#F16022]/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#F16022]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span>Financing Available</span>
                    <span className="sr-only">Financing Available</span>
                  </div>
                </div>

                {/* Internal Links */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <a href="/our-process" className="text-[#F16022] hover:underline flex items-center gap-1">
                    See our process →
                  </a>
                  <a href="/portfolio" className="text-[#F16022] hover:underline flex items-center gap-1">
                    View our work →
                  </a>
                  <a href="/financing" className="text-[#F16022] hover:underline flex items-center gap-1">
                    Learn about financing →
                  </a>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-[#1B3764] mb-4">Get Your Free Consultation</h3>
                <p className="text-gray-600 mb-6">
                  Ready to transform your property? Let's discuss your project and create a custom plan that fits your budget and timeline.
                </p>
                
                <form 
                  id="contact-form"
                  action={handleFormSubmit}
                  className="space-y-4" 
                  aria-label="Contact form" 
                  data-source="about" 
                  noValidate
                >
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
                      Email Address<span className="text-red-500">*</span>
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
                  
                  {/* Form Status Messages */}
                  {formState.success && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">Thank you for your message! We'll contact you within 1 business day.</p>
                    </div>
                  )}
                  
                  {formState.error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-medium">{formState.error}</p>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={formState.isSubmitting}
                    className="w-full bg-[#1B3764] hover:bg-[#1B3764]/90 text-white font-semibold py-6 disabled:opacity-50 disabled:cursor-not-allowed" 
                    data-intent="contact-form-submit"
                  >
                    {formState.isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the sections would go here - HowItWorks, WhyChooseUs, etc. */}
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
          <WhyChooseUs />
        </Suspense>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#1B3764] to-[#115B87] text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
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
    </>
  );
}
