"use client";

import { designs } from '@/data/designs';
import { ParallaxScroll } from '@/components/ParallaxScroll';
import ScrollFloat from '@/components/ScrollFloat';

export default function OurDesignsPage() {
  const imageUrls = designs.map(design => design.imageUrl);

  return (
    <div className="min-h-screen pt-32 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <ScrollFloat 
            containerClassName="text-center mb-6"
            textClassName="text-5xl font-bold text-[#1B3764]"
            animationDuration={1}
            ease="back.inOut(2)"
            stagger={0.03}
          >
            Our Designs
          </ScrollFloat>
          <p className="text-2xl text-gray-600 mb-4">Quality and Variety</p>
          <p className="text-xl text-gray-600">
            Competitive designs to wow both adults and kids.
          </p>
        </div>

        {/* Parallax Scroll Grid */}
        <ParallaxScroll images={imageUrls} className="mb-16" />

        <div className="mt-16 p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto text-center border border-gray-200">
          <h2 className="text-3xl font-bold text-[#1B3764] mb-4">
            Love What You See?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Let's bring these designs to life in your vacation rental.
          </p>
          <a
            href="tel:4073488848"
            className="inline-flex items-center justify-center bg-[#F16022] hover:bg-[#F16022]/90 text-white text-lg px-8 py-4 rounded-full transition-all"
          >
            Call us: (407) 348-8848
          </a>
        </div>
      </div>
    </div>
  );
}

