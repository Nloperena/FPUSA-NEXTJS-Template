"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BlurText from '@/components/ui/blur-text';

interface Design {
  id: string;
  name: string;
  imageUrl: string;
  category?: string;
}

interface StickyScrollDesignsProps {
  designs: Design[];
}

export default function StickyScrollDesigns({ designs }: StickyScrollDesignsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }

      // Show scrolling state
      setIsScrolling(true);
      
      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Hide scrolling state after 150ms of no scrolling
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const updateScrollPosition = () => {
      if (!containerRef.current || !carouselScrollRef.current) return;

      const container = containerRef.current;
      const carousel = carouselScrollRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate if we're in the sticky zone
      const isStickyNow = rect.top <= 0 && rect.bottom > windowHeight;
      setIsSticky(isStickyNow);

      // Calculate progress based on container position
      const containerHeight = rect.height;
      const scrollableDistance = containerHeight - windowHeight;
      
      // How far through the container have we scrolled?
      const scrolledIntoContainer = -rect.top;
      const progress = Math.min(Math.max(scrolledIntoContainer / scrollableDistance, 0), 1);
      
      setScrollProgress(progress);

      // Apply horizontal scroll to carousel in real-time
      if (carousel) {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        carousel.scrollLeft = progress * maxScrollLeft;
      }
    };

    // Initial call
    updateScrollPosition();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollPosition);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Calculate the height needed for smooth scrolling
  // We want about 4-5 viewport heights to scroll through all designs for a luxurious feel
  const scrollMultiplier = 4.5;
  const containerHeight = `${scrollMultiplier * 100}vh`;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: containerHeight }}
    >
      {/* Sticky Section */}
      <section
        ref={carouselContainerRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: '#334155' }}
      >
        <div className="h-full flex flex-col justify-center py-20">
          <div className="w-full">
            {/* Content Area - Header moved outside */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
              {/* Scroll Message - Left aligned, only show when not actively scrolling */}
              <div 
                className={`text-left mb-8 transition-opacity duration-500 ${
                  isSticky && !isScrolling ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="text-white text-4xl md:text-6xl font-bold">
                  Scroll to explore designs
                </p>
              </div>
              
              {/* Progress Indicator - Centered */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-64 h-2 bg-gray-600 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-[#F16022] shadow-lg"
                      style={{ 
                        width: `${scrollProgress * 100}%`,
                        transition: 'width 0.05s linear'
                      }}
                    />
                  </div>
                  <span className="text-white text-lg font-bold min-w-[80px] tabular-nums">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Carousel - Controlled by Scroll */}
            <div className="relative">
              <div
                ref={carouselScrollRef}
                className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                style={{ 
                  scrollBehavior: 'auto', // Remove smooth scrolling for instant response
                  scrollSnapType: 'none' // Disable snap points
                }}
              >
                <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
                  {designs.slice(0, 12).map((design, index) => (
                    <motion.div
                      key={design.id}
                      className="rounded-3xl"
                      style={{
                        opacity: 1,
                        transform: 'none',
                      }}
                    >
                      <div className="relative h-80 w-56 md:h-[500px] md:w-96 rounded-3xl overflow-hidden bg-gray-100 shadow-2xl">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${design.imageUrl})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Card Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-xs uppercase tracking-wide text-gray-300 mb-2">
                            Vacation Rental Design
                          </p>
                          <h3 className="text-2xl font-bold mb-2">{design.name}</h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA - Centered under cards */}
            <div className="max-w-7xl mx-auto px-4 mt-8">
              <div className="flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#F16022] hover:bg-[#F16022]/90 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Link href="/our-designs">VIEW ALL DESIGNS</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

