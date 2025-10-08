"use client";

interface VideoSkeletonProps {
  className?: string;
  aspectRatio?: string;
  isBackground?: boolean;
}

export default function VideoSkeleton({ 
  className = "", 
  aspectRatio = "aspect-video",
  isBackground = false 
}: VideoSkeletonProps) {

  return (
    <div className={`${aspectRatio} ${className} relative overflow-hidden`}>
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B3764] to-[#115B87]" />
      
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      {/* Play button skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center animate-pulse shadow-lg">
          <div className="w-8 h-8 bg-white/60 rounded-sm ml-1" />
        </div>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute top-4 right-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
      
      {/* Video title skeleton */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="h-4 bg-white/20 rounded animate-pulse mb-2" />
        <div className="h-3 bg-white/10 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
}
