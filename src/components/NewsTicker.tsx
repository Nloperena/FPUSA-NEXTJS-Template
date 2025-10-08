"use client";

import React, { useState, useEffect } from 'react';

const NewsTicker = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`sticky top-20 z-40 overflow-hidden py-3 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-r from-[#1B3764] to-[#115B87]' 
        : 'bg-transparent'
    }`}>
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className={`absolute top-1/2 right-4 transform -translate-y-1/2 z-50 transition-colors duration-200 p-1 ${
          isScrolled 
            ? 'text-white hover:text-gray-300' 
            : 'text-white/80 hover:text-white'
        }`}
        aria-label="Close ticker"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Ticker Content */}
      <div className="flex items-center justify-center pr-12">
        <div className="flex items-center text-white">
          {/* Ticker Text */}
          <div className="flex items-center space-x-8 animate-scroll">
            <span className="text-lg font-semibold whitespace-nowrap">
              Flexible Financing Available • Starting from $8,000 up to $250,000 • 
            </span>
            <span className="text-lg font-semibold whitespace-nowrap">
              Competitive Rates • Quick Approval Process • 
            </span>
            <span className="text-lg font-semibold whitespace-nowrap">
              Transform Your Vacation Rental Today • 
            </span>
            <span className="text-lg font-semibold whitespace-nowrap">
              Call (407) 348-8848 for Financing Details • 
            </span>
          </div>
        </div>
      </div>
      
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
