"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GoogleReview } from '@/data/google-reviews';

interface GoogleReviewsGridProps {
  reviews: GoogleReview[];
}

export const GoogleReviewsGrid: React.FC<GoogleReviewsGridProps> = ({ reviews }) => {
  const [selectedReview, setSelectedReview] = useState<GoogleReview | null>(null);

  return (
    <>
      {/* Grid of Reviews */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedReview(review)}
            className="cursor-pointer group"
          >
            <div className="relative aspect-square rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg hover:shadow-2xl transition-shadow">
              <img
                src={review.clientPhoto}
                alt={review.clientName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.clientName)}&background=1B3764&color=fff&size=400&bold=true&font-size=0.33&rounded=true`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                <p className="text-white text-sm font-semibold text-center truncate w-full">
                  {review.clientName}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < review.rating ? 'text-[#F16022]' : 'text-gray-300'}`}>★</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal - Full Review */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              {/* Review Content */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Client Photo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#F16022] shadow-xl">
                    <img
                      src={selectedReview.clientPhoto}
                      alt={selectedReview.clientName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedReview.clientName)}&background=1B3764&color=fff&size=400&bold=true&font-size=0.33&rounded=true`;
                      }}
                    />
                  </div>
                </div>

                {/* Review Details */}
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#1B3764] mb-2">
                    {selectedReview.clientName}
                  </h3>
                  <p className="text-lg text-[#F16022] font-semibold mb-3">
                    {selectedReview.location}
                  </p>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-2xl mr-1 ${i < selectedReview.rating ? 'text-[#F16022]' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-6">{selectedReview.date}</p>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-xl text-gray-800 leading-relaxed">
                      "{selectedReview.reviewText}"
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Posted on Google Reviews</p>
                    <a
                      href="https://www.google.com/maps/place/Furniture+Packages+USA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#1B3764] hover:text-[#F16022] font-semibold"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GoogleReviewsGrid;




