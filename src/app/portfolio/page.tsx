"use client";

import { useState } from 'react';
import { regularVideos } from '@/data/youtube-videos';

export default function PortfolioPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videos = regularVideos;

  return (
    <div className="min-h-screen pt-32 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-[#1B3764] mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-600 mb-4">
            Explore {videos.length}+ vacation rental transformations that have helped property owners maximize their bookings and delight their guests.
          </p>
          <p className="text-lg text-gray-500">
            Click any video to watch our stunning interior designs come to life.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {videos.map((video) => (
            <div 
              key={video.video_id}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              onClick={() => setSelectedVideo(video.embedUrl)}
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault doesn't exist
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-[#F16022] ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-[#1B3764] line-clamp-2 group-hover:text-[#F16022] transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative w-full max-w-6xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#F16022] transition-colors"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-br from-[#1B3764] to-[#115B87] text-white rounded-2xl max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Your Own Transformation?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Let's create a stunning design that maximizes your bookings and wows your guests.
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

