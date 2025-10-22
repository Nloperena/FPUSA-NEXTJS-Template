"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Hammer, Paintbrush } from 'lucide-react';

const packages = [
  {
    id: "refresh",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Refresh Package",
    tagline: "Quick Updates for Instant Impact",
    description: "Perfect for properties that need a quick refresh. We update key pieces, add new decor, and stage your space to maximize appeal.",
    features: [
      "New accent furniture & decor",
      "Professional staging",
      "Photography session",
      "Quick 1-2 week turnaround"
    ],
    price: "Starting at $5,000",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop",
    gradient: "from-[#F16022] to-[#E55A1A]"
  },
  {
    id: "partial",
    icon: <Paintbrush className="w-6 h-6" />,
    title: "Partial Package",
    tagline: "Targeted Room Transformations",
    description: "Transform specific rooms with custom furniture and design. Ideal for updating main living spaces or bedrooms to boost bookings.",
    features: [
      "Custom design for selected rooms",
      "Quality furniture & decor",
      "Professional installation",
      "Photography & styling"
    ],
    price: "Starting at $15,000",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop",
    gradient: "from-[#1B3764] to-[#115B87]"
  },
  {
    id: "full",
    icon: <Hammer className="w-6 h-6" />,
    title: "Full Package",
    tagline: "Complete Turn-Key Transformation",
    description: "Our signature end-to-end service. We handle everything from design concept to final photography, creating a stunning rental property.",
    features: [
      "Comprehensive design & planning",
      "Full furniture & decor package",
      "Professional installation & setup",
      "Premium photography session",
      "Ongoing support & maintenance"
    ],
    price: "Starting at $30,000",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    gradient: "from-purple-600 to-purple-800"
  }
];

export default function PackageSelector() {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollY(scrollProgress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPackage = packages[selectedPackage];

  return (
    <div ref={containerRef} className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-[#1B3764] mb-4">
          Choose Your Perfect Package
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From quick refreshes to complete transformations, we have a solution that fits your property and budget.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Left: Parallax Image */}
        <div className="relative h-[600px] lg:h-[800px] rounded-3xl overflow-hidden shadow-2xl">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                selectedPackage === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Parallax Image */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.001})`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${pkg.gradient} opacity-60`} />
              
              {/* Package Info Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white">
                      {React.cloneElement(pkg.icon, { 
                        className: "w-8 h-8", 
                        strokeWidth: 2.5 
                      })}
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white">
                        {pkg.title}
                      </h3>
                      <p className="text-lg text-white/90">
                        {pkg.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">
                    {pkg.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Package List */}
        <div className="flex flex-col justify-center space-y-6">
          {packages.map((pkg, index) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(index)}
              className={`group relative bg-white rounded-2xl p-8 text-left transition-all duration-500 transform hover:scale-105 ${
                selectedPackage === index 
                  ? 'shadow-2xl ring-4 ring-[#F16022] scale-105' 
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all duration-300 ${
                  selectedPackage === index 
                    ? 'bg-[#F16022] scale-110' 
                    : 'bg-[#1B3764] group-hover:bg-[#F16022]'
                }`}>
                  {React.cloneElement(pkg.icon, { 
                    className: "w-7 h-7", 
                    strokeWidth: 2.5 
                  })}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                    selectedPackage === index ? 'text-[#F16022]' : 'text-[#1B3764]'
                  }`}>
                    {pkg.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    {pkg.tagline}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <svg className="w-5 h-5 text-[#F16022] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className={`text-2xl font-bold transition-colors duration-300 ${
                      selectedPackage === index ? 'text-[#F16022]' : 'text-[#1B3764]'
                    }`}>
                      {pkg.price}
                    </p>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className={`flex-shrink-0 transition-all duration-300 ${
                  selectedPackage === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}>
                  <svg className="w-8 h-8 text-[#F16022]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Active Border */}
              {selectedPackage === index && (
                <div className="absolute inset-0 rounded-2xl border-4 border-[#F16022] pointer-events-none" />
              )}

              {/* CTA Button for Selected Package */}
              {selectedPackage === index && (
                <div className="mt-6 animate-fadeIn">
                  <button className="w-full bg-[#F16022] hover:bg-[#E55A1A] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
                    Get Started with {pkg.title}
                  </button>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


