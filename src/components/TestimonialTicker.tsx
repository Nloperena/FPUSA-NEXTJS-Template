"use client";

import React, { useState } from 'react';
import YouTubeThumbnail from './YouTubeThumbnail';
import BlurText from './ui/blur-text';
import VideoModal from './VideoModal';

interface TestimonialTickerProps {
  videos: Array<{
    video_id: string;
    title: string;
    url: string;
  }>;
}

const TestimonialTicker: React.FC<TestimonialTickerProps> = ({ videos }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);

  // Limit to first 6 videos for better performance, then double for seamless loop
  const limitedVideos = videos.slice(0, 6);
  const infiniteVideos = [...limitedVideos, ...limitedVideos];
  
  // Calculate dimensions
  const videoWidth = 1024; // width of each video card
  const gap = 64; // gap-16 = 64px
  const totalWidth = (videoWidth + gap) * limitedVideos.length;

  const handleVideoClick = (videoId: string, title: string) => {
    setSelectedVideo({ videoId, title });
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="relative overflow-hidden py-32 w-screen -mx-4" style={{ backgroundColor: '#ffffff' }}>
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[18rem] mb-16 text-left">
        <BlurText
          text="Video Testimonials"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-6xl md:text-8xl font-bold text-[#1B3764] mb-4"
        />
        <p className="text-left text-gray-600 text-2xl">Watch our satisfied clients share their experiences</p>
      </div>
      
      <div className="relative">
        <div 
          className="flex gap-16"
          style={{ 
            animation: `scroll-left ${limitedVideos.length * 8}s linear infinite`,
            animationPlayState: isHovered ? 'paused' : 'running',
            willChange: 'transform'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {infiniteVideos.map((video, index) => (
            <div
              key={`${video.video_id}-${index}`}
              className="flex-shrink-0 w-[1024px] cursor-pointer group"
              onClick={() => handleVideoClick(video.video_id, video.title)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gray-200">
                <YouTubeThumbnail
                  videoId={video.video_id}
                  title={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-24 h-24 bg-[#F16022]/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-16 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-4xl font-medium line-clamp-2">{video.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={closeModal}
          videoId={selectedVideo.videoId}
          title={selectedVideo.title}
        />
      )}
      
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${totalWidth}px);
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialTicker;
