"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SpotlightCard from '@/components/SpotlightCard';
import ScrollFloat from '@/components/ScrollFloat';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import GoogleReviewsGrid from '@/components/GoogleReviewsGrid';
import { HeroParallax } from '@/components/ui/hero-parallax';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import PremiumPackageSelector from '@/components/PremiumPackageSelector';
import StickyScrollDesigns from '@/components/StickyScrollDesigns';
import ProjectsParallaxSection from '@/components/ProjectsParallaxSection';
import YouTubeThumbnail from '@/components/YouTubeThumbnail';
import BlurText from '@/components/ui/blur-text';
import NewsTicker from '@/components/NewsTicker';
import TestimonialTicker from '@/components/TestimonialTicker';
import VacationRentalIntro from '@/components/sections/VacationRentalIntro';
import { designs } from '@/data/designs';
import { flickrPhotos } from '@/data/flickr-portfolio';
import { portfolioProjects } from '@/data/portfolio';
import { getFeaturedTestimonials } from '@/data/youtube-videos';
import { googleReviews } from '@/data/google-reviews';
import { projects } from '@/data/flickr-projects-full';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative bg-white">
      {/* News Ticker */}
      <NewsTicker />
      
      {/* Hero Section with Video Background and Parallax Images */}
      <div className="relative">
        {/* Video Background - Fixed */}
        <div className="fixed top-0 left-0 w-screen h-screen z-0 overflow-hidden">
          {mounted && (
            <>
              <iframe 
                src="https://player.vimeo.com/video/825630813?h=1e14851030&muted=1&background=1&app_id=58479&autoplay=1&loop=1&autopause=0"
                className="absolute top-1/2 left-1/2 opacity-100"
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
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}
        </div>

        {/* Content that slides over - High z-index */}
        <div className="relative" style={{ zIndex: 20 }}>
          {/* Hero Content - #1 Interior Designer */}
          <div className="relative z-10">
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-left text-white">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl">
                  #1 Interior Designer <br /> for Short-term Rentals <br /> in Florida
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl drop-shadow-lg">
                  Turn-Key FURNITURE PACKAGES USA - Browse our stunning vacation rental designs
                </p>
              </div>
            </div>
          </div>

          {/* All sections below - with solid background to cover video */}
          <div className="relative bg-white" style={{ zIndex: 20 }}>
          {/* Vacation Rental Intro Section */}
          <VacationRentalIntro />

          {/* Premium Package Selector - Sticky Rail + Parallax Panels */}
          <PremiumPackageSelector />

          {/* Our Designs Section Header */}
          <section className="py-20" style={{ backgroundColor: '#334155' }}>
            <div className="max-w-7xl mx-auto px-4">
              <BlurText
                text="Our Designs"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-6xl md:text-8xl font-bold text-white mb-4"
              />
              <p className="text-2xl text-gray-200 mb-4 text-left">Quality and Variety</p>
              <p className="text-xl text-gray-300 mb-4 text-left">
                Competitive designs to wow both adults and kids.
              </p>
            </div>
          </section>

          {/* Our Designs Section - Sticky Scroll */}
          <StickyScrollDesigns designs={designs} />

           {/* Why Choose Us Section - Modern Version */}
           <WhyChooseUs />

          {/* Our Projects Section Header */}
          <section className="py-12 bg-white">
            <div className="w-full px-4">
              <div className="mb-6">
                <div className="ml-[20rem]">
                  <BlurText
                    text="Our Projects"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-6xl md:text-8xl font-bold text-[#1B3764] mb-4"
                  />
                  <Link href="/portfolio" className="text-[#1B3764] font-semibold hover:text-[#F16022] hover:underline flex items-center gap-2">
                    VIEW ALL PROJECTS
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Our Projects - Flickr Photo Gallery with 3D Parallax */}
          <ProjectsParallaxSection projects={projects} />

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20" style={{ backgroundColor: '#334155' }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12">
            <BlurText
              text="Real People, Real Testimonials"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-6xl md:text-8xl font-bold text-white mb-4"
            />
            <p className="text-xl text-gray-200 max-w-3xl mb-8">
              No bots, fluff or AI reviews. We're the industry experts in this market, not some fly-by-night company. Be a part of our legacy!
            </p>
            <Link href="/testimonials" className="text-[#F16022] font-semibold hover:underline flex items-center gap-2">
              VIEW ALL TESTIMONIALS
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Google Reviews - Animated Carousel */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-left">FEATURED REVIEWS</h3>
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
            <h3 className="text-2xl font-bold text-white mb-6 text-left">GOOGLE REVIEWS - CLICK TO READ</h3>
            <GoogleReviewsGrid reviews={googleReviews} />
          </div>


          </div>
          </section>

          {/* Testimonial Video Ticker */}
          <TestimonialTicker videos={getFeaturedTestimonials(6)} />

          {/* Charitable Causes Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <BlurText
                  text="With Love, We Give"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-6xl md:text-8xl font-bold text-[#1B3764] mb-4"
                />
                <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
                  We donate a portion of proceeds to these companies, supporting causes that matter to us and our community.
                </p>
                
                {/* Company Values Plaque */}
                <div className="bg-gradient-to-br from-[#1B3764] to-[#115B87] rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl border-4 border-[#F16022] mb-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Company Values</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#F16022] rounded-full flex-shrink-0 mt-1"></div>
                        <p className="text-lg font-medium">Integrity & Transparency</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#F16022] rounded-full flex-shrink-0 mt-1"></div>
                        <p className="text-lg font-medium">Quality & Excellence</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#F16022] rounded-full flex-shrink-0 mt-1"></div>
                        <p className="text-lg font-medium">Customer Satisfaction</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#F16022] rounded-full flex-shrink-0 mt-1"></div>
                        <p className="text-lg font-medium">Community Impact</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#F16022] rounded-full flex-shrink-0 mt-1"></div>
                        <p className="text-lg font-medium">Innovation & Growth</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#F16022] rounded-full flex-shrink-0 mt-1"></div>
                        <p className="text-lg font-medium">Giving Back</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <p className="text-2xl font-bold text-[#F16022]">
                      $50,000+ donated to children's charities since 2020
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* St. Jude's */}
                <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#F16022] mb-4">St. Jude Children's Research Hospital</h3>
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-sm font-medium text-gray-600 mr-2">Our Impact</span>
                      <span className="text-2xl font-bold text-[#1B3764]">$15,000+</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-[#F16022] to-[#E55A1A] h-3 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Supporting research and treatment for childhood cancer and other life-threatening diseases.
                  </p>
                  <a 
                    href="https://www.stjude.org/donate" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-6 py-3 bg-[#F16022] text-white font-semibold rounded-lg hover:bg-[#E55A1A] transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Learn More
                  </a>
                </div>

                {/* Give Kids the World */}
                <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#1B3764] mb-4">Give Kids the World Village</h3>
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-sm font-medium text-gray-600 mr-2">Our Impact</span>
                      <span className="text-2xl font-bold text-[#1B3764]">$20,000+</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-[#1B3764] to-[#2A4A6B] h-3 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Creating magical vacation memories for critically ill children and their families.
                  </p>
                  <a 
                    href="https://www.gktw.org/donate" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-6 py-3 bg-[#1B3764] text-white font-semibold rounded-lg hover:bg-[#2A4A6B] transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Learn More
                  </a>
                </div>

                {/* Second Harvest */}
                <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <h3 className="text-2xl font-bold text-green-600 mb-4">Second Harvest Food Bank</h3>
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-sm font-medium text-gray-600 mr-2">Our Impact</span>
                      <span className="text-2xl font-bold text-green-600">$15,000+</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{width: '70%'}}></div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Fighting hunger and food insecurity in our local community and beyond.
                  </p>
                  <a 
                    href="https://www.feedhopenow.org/donate" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20" style={{ backgroundColor: '#334155' }}>
            <div className="container mx-auto px-4 text-left max-w-4xl">
              <BlurText
                text="Ready to Transform Your Vacation Rental"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-6xl md:text-8xl font-bold text-white mb-4"
              />
              <p className="text-xl mb-10 text-gray-200">
                Let's create an unforgettable space that maximizes your bookings and wows your guests.
              </p>
              <Button asChild size="lg" className="bg-[#F16022] text-white hover:bg-[#E55A1A] text-lg px-10 py-6 rounded-full">
                <a href="tel:4073488848">Call us: (407) 348-8848</a>
              </Button>
            </div>
          </section>
          </div>
          {/* End of sections wrapper */}
        </div>
        {/* End of content that slides over */}
      </div>
      {/* End of hero section wrapper */}
    </div>
  );
}
