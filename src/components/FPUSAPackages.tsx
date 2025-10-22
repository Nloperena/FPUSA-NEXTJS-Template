"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import QuoteEstimator from './QuoteEstimator';

const packages = [
  {
    id: "refresh",
    title: "Refresh Package",
    tagline: "Staging + Accent Updates",
    description: "Perfect for properties that need a quick refresh. We update key accent pieces, add new decor, and stage your space to maximize appeal without a full renovation.",
    features: [
      "New accent furniture & decor",
      "Professional staging consultation",
      "Delivery & installation included",
      "Quick 1-2 week turnaround"
    ],
    price: "Starting at $5,000",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop"
  },
  {
    id: "partial",
    title: "Partial / Per-Room Package",
    tagline: "Targeted room transformations",
    description: "Transform specific rooms with custom furniture and design. Perfect for updating main living spaces or creating wow-factor bedrooms that boost bookings.",
    roomPricing: [
      { room: "Living Room", range: "$4,000–$7,500" },
      { room: "Primary Bedroom", range: "$3,500–$6,500" },
      { room: "Bunk / Kids Room", range: "$4,500–$8,500" },
      { room: "Dining / Kitchen Nook", range: "$2,500–$5,000" }
    ],
    features: [
      "Custom design for selected rooms",
      "Quality furniture & decor",
      "Professional delivery & install",
      "Photography optional (+$500)"
    ],
    price: "Per Room: $3,500–$7,500",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop"
  },
  {
    id: "full",
    title: "Full Turn-Key Package",
    tagline: "Complete property transformation",
    description: "Our signature end-to-end service. We handle everything from design concept to final photography, creating a stunning, booking-ready vacation rental property.",
    features: [
      "Comprehensive design & planning",
      "Full furniture & decor package",
      "All rooms furnished & staged",
      "Professional installation & setup",
      "Premium photography session included",
      "Ongoing support & maintenance"
    ],
    price: "$25k–$60k+",
    priceNote: "Range varies by bed/bath count and brand level",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop"
  }
];

const themeRooms = [
  { name: "Princess Suite", range: "$6k–$12k" },
  { name: "Galaxy Bunk Room", range: "$7k–$14k" },
  { name: "Ocean Adventure", range: "$6k–$11k" },
  { name: "Arcade / Media Room", range: "$8k–$18k" }
];

export default function FPUSAPackages() {
  const [showEstimator, setShowEstimator] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollY(scrollProgress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div ref={sectionRef} className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-[#1B3764] mb-4">
            Choose Your Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From quick refreshes to complete transformations, we have a solution that fits your property and budget.
          </p>
        </div>

        {/* Packages with Parallax Images */}
        <div className="space-y-12 mb-12">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Image with Parallax - Left side for even, right side for odd */}
              <div 
                className={`relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl ${
                  index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transform: `translateY(${scrollY * 0.2 * (index % 2 === 0 ? 1 : -1)}px) scale(${1 + scrollY * 0.001})`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="600"
                    height="600"
                  />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3764]/80 via-[#1B3764]/20 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-white text-4xl font-bold mb-2">{pkg.price}</p>
                    {pkg.priceNote && (
                      <p className="text-white/90 text-sm">{pkg.priceNote}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Content - Right side for even, left side for odd */}
              <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                  <h3 className="text-3xl font-bold text-[#1B3764] mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-lg text-[#F16022] font-semibold mb-4">{pkg.tagline}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Per-Room Pricing (Partial Package Only) */}
                  {pkg.roomPricing && (
                    <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                      <h4 className="text-sm font-bold text-[#1B3764] mb-3 uppercase tracking-wide">
                        Per-Room Pricing
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {pkg.roomPricing.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                            <span className="text-gray-700 font-medium">{item.room}</span>
                            <span className="font-bold text-[#F16022]">{item.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <Check className="w-5 h-5 text-[#F16022] mr-3 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => setShowEstimator(true)}
                    className="w-full bg-[#F16022] hover:bg-[#E55A1A] text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Get Fast Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Theme Rooms Add-Ons */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-6 h-6 text-[#F16022]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"/>
            </svg>
            <h5 className="text-xl font-bold text-[#1B3764]">Theme Rooms Add-Ons</h5>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Give your listing a scroll-stopping hero room. Pricing varies by mural, props, AV & built-ins.
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {themeRooms.map((theme, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  i % 2 === 0
                    ? 'bg-[#F16022]/10 text-[#F16022]'
                    : 'bg-[#1B3764]/10 text-[#1B3764]'
                }`}
              >
                {theme.name} • {theme.range}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            *Add-ons layered onto Partial or Full packages. Custom carpentry & permits quoted separately.
          </p>
        </div>

        {/* CTA Row */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Ready to transform your vacation rental?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowEstimator(true)}
              className="px-8 py-4 bg-[#F16022] hover:bg-[#E55A1A] text-white rounded-xl font-semibold text-lg transition-colors shadow-lg"
            >
              Get Fast Quote
            </button>
            <a
              href="/portfolio"
              className="px-8 py-4 border-2 border-[#1B3764] text-[#1B3764] hover:bg-[#1B3764] hover:text-white rounded-xl font-semibold text-lg transition-all"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Quote Estimator Modal */}
      <QuoteEstimator isOpen={showEstimator} onClose={() => setShowEstimator(false)} />
    </>
  );
}

