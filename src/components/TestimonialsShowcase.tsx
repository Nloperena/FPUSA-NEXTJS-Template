"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Star } from 'lucide-react';
import { GoogleReview } from '@/data/google-reviews';

interface TestimonialsShowcaseProps {
  reviews: GoogleReview[];
  itemsPerPage?: number;
}

const categories = [
  { value: 'all', label: 'All Reviews' },
  { value: 'recent', label: 'Recent' },
  { value: '5-star', label: '5 Star Only' },
  { value: 'verified', label: 'Verified Owners' }
];

export default function TestimonialsShowcase({ reviews, itemsPerPage = 9 }: TestimonialsShowcaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const [selectedReview, setSelectedReview] = useState<GoogleReview | null>(null);

  // Filter and search logic
  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    // Category filter
    if (selectedCategory === 'recent') {
      filtered = filtered.filter(r => r.date.includes('month') || r.date.includes('week'));
    } else if (selectedCategory === '5-star') {
      filtered = filtered.filter(r => r.rating === 5);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [reviews, selectedCategory, searchTerm]);

  const displayedReviews = filteredReviews.slice(0, displayCount);
  const hasMore = displayCount < filteredReviews.length;

  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search reviews by name, location, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#F16022] focus:outline-none text-gray-700 text-lg"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-[#F16022] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#F16022] hover:text-[#F16022]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-gray-600 text-lg">
          Showing <span className="font-bold text-[#F16022]">{displayedReviews.length}</span> of{' '}
          <span className="font-bold">{filteredReviews.length}</span> reviews
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <AnimatePresence mode="popLayout">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedReview(review)}
              className="group cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={review.clientPhoto}
                  alt={review.clientName}
                  className="w-16 h-16 rounded-full border-2 border-[#F16022] flex-shrink-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.clientName)}&background=1B3764&color=fff&size=64&bold=true&font-size=0.33&rounded=true`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#1B3764] truncate group-hover:text-[#F16022] transition-colors">
                    {review.clientName}
                  </h3>
                  <p className="text-sm text-gray-500">{review.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-[#F16022] text-[#F16022]' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 line-clamp-4 leading-relaxed mb-3">
                "{review.reviewText}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">{review.date}</span>
                <span className="text-sm text-[#F16022] font-semibold group-hover:underline">
                  Read Full Review →
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setDisplayCount(prev => prev + itemsPerPage)}
            className="px-8 py-4 bg-[#1B3764] text-white rounded-xl font-semibold text-lg hover:bg-[#1B3764]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Load More Reviews ({filteredReviews.length - displayCount} remaining)
          </button>
        </div>
      )}

      {/* Full Review Modal */}
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
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              {/* Review Content */}
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={selectedReview.clientPhoto}
                  alt={selectedReview.clientName}
                  className="w-24 h-24 rounded-full border-4 border-[#F16022]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedReview.clientName)}&background=1B3764&color=fff&size=96&bold=true&font-size=0.33&rounded=true`;
                  }}
                />
                <div>
                  <h3 className="text-3xl font-bold text-[#1B3764] mb-2">
                    {selectedReview.clientName}
                  </h3>
                  <p className="text-lg text-[#F16022] font-semibold mb-2">
                    {selectedReview.location}
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${i < selectedReview.rating ? 'fill-[#F16022] text-[#F16022]' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-800 leading-relaxed mb-6">
                "{selectedReview.reviewText}"
              </p>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">Posted {selectedReview.date}</p>
                <a
                  href="https://www.google.com/maps/place/Furniture+Packages+USA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#1B3764] hover:text-[#F16022] font-semibold text-lg"
                >
                  View on Google Reviews →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No reviews found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-6 py-3 bg-[#F16022] text-white rounded-xl font-semibold hover:bg-[#E55A1A] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}


