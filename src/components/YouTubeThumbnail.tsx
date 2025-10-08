"use client";

import React, { useState } from 'react';

interface YouTubeThumbnailProps {
  videoId: string;
  title: string;
  className?: string;
}

const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = ({ 
  videoId, 
  title, 
  className = "w-full h-full object-cover" 
}) => {
  const [currentSrc, setCurrentSrc] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Array of thumbnail quality options in order of preference
  const thumbnailSources = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`
  ];

  const handleError = () => {
    if (currentSrc < thumbnailSources.length - 1) {
      // Try next quality level
      setCurrentSrc(prev => prev + 1);
    } else {
      // All thumbnail sources failed, show placeholder
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#1B3764] to-[#115B87] flex items-center justify-center`}>
        <div className="text-center text-white p-4">
          <svg className="w-12 h-12 mx-auto mb-2 opacity-70 stroke-2" strokeWidth={2.5} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <p className="text-sm font-medium">Video Thumbnail</p>
          <p className="text-xs opacity-70">Click to view</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
          <div className="w-8 h-8 border-2 border-[#F16022] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={thumbnailSources[currentSrc]}
        alt={title}
        className={`${className} ${isLoading ? 'hidden' : 'block'} group-hover:scale-110 transition-transform duration-500`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  );
};

export default YouTubeThumbnail;
