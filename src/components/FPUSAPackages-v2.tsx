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
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop",
    gradient: "from-orange-500/90 to-red-600/90"
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
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop",
    gradient: "from-blue-600/90 to-indigo-700/90"
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
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    gradient: "from-purple-600/90 to-pink-600/90"
  }
];

const themeRooms = [
  { name: "Princess Suite", range: "$6k–$12k", color: "bg-pink-500" },
  { name: "Galaxy Bunk Room", range: "$7k–$14k", color: "bg-indigo-600" },
  { name: "Ocean Adventure", range: "$6k–$11k", color: "bg-blue-500" },
  { name: "Arcade / Media Room", range: "$8k–$18k", color: "bg-purple-600" }
];

export default function FPUSAPackagesV2() {
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
          <h2 className="text-5xl md:text-7xl font-bold text-[#1B3764] mb-4">
            Choose Your Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From quick refreshes to complete transformations, we have a solution that fits your property and budget.
          </p>
        </div>

        {/* Packages Grid - V2 Large Block Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] ${
                index === 2 ? 'lg:col-span-2' : ''
              }`}
              style={{ minHeight: '650px' }}
            >
              {/* Parallax Background Image */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${scrollY * 0.15 * (index % 2 === 0 ? 1 : -1)}px) scale(${1.1 + scrollY * 0.001})`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="800"
                  height="650"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient}`} />

              {/* Content Overlay */}
              <div className="relative h-full flex flex-col justify-between p-8 text-white">
                {/* Top Section */}
                <div>
                  <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                    Package {index + 1}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-3">
                    {pkg.title}
                  </h3>
                  <p className="text-xl text-white/90 mb-6">{pkg.tagline}</p>
                </div>

                {/* Middle Section - Features */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-white/90 leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    {/* Per-Room Pricing Grid */}
                    {pkg.roomPricing && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {pkg.roomPricing.map((item, i) => (
                          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                            <p className="text-white/80 text-sm mb-1">{item.room}</p>
                            <p className="text-white font-bold text-lg">{item.range}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Features List */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-white/90 text-sm">
                          <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Section - Price & CTA */}
                <div className="mt-6">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Investment</p>
                        <p className="text-3xl font-bold text-[#1B3764]">{pkg.price}</p>
                        {pkg.priceNote && (
                          <p className="text-xs text-gray-500 mt-1">{pkg.priceNote}</p>
                        )}
                      </div>
                      <div className="h-16 w-16 rounded-full bg-[#F16022]/10 flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#F16022]">{index + 1}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowEstimator(true)}
                      className="w-full bg-[#F16022] hover:bg-[#E55A1A] text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Get Fast Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Theme Rooms Add-Ons - V2 Card Style */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#F16022]/10 rounded-full mb-4">
              <svg className="w-6 h-6 text-[#F16022]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="text-[#F16022] font-bold uppercase tracking-wide text-sm">Premium Add-Ons</span>
            </div>
            <h3 className="text-4xl font-bold text-[#1B3764] mb-3">
              Theme Rooms That Steal the Show
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Give your listing a scroll-stopping hero room. Pricing varies by mural, props, AV & built-ins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {themeRooms.map((theme, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${theme.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${theme.color} rounded-xl mb-4 text-white font-bold text-xl`}>
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-bold text-[#1B3764] mb-2">
                    {theme.name}
                  </h4>
                  <p className="text-2xl font-bold text-[#F16022] mb-3">
                    {theme.range}
                  </p>
                  <button
                    onClick={() => setShowEstimator(true)}
                    className="text-sm text-[#1B3764] font-semibold hover:text-[#F16022] flex items-center gap-2 group"
                  >
                    Add to quote
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            *Add-ons layered onto Partial or Full packages. Custom carpentry & permits quoted separately.
          </p>
        </div>
      </div>

      {/* Quote Estimator Modal */}
      <QuoteEstimator isOpen={showEstimator} onClose={() => setShowEstimator(false)} />
    </>
  );
}

