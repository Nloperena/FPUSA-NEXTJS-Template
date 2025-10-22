"use client";

import React from 'react';
import BlurText from '@/components/ui/blur-text';
import TestimonialsShowcase from '@/components/TestimonialsShowcase';
import { googleReviews, getAverageRating, getTotalReviews } from '@/data/google-reviews';
import { Star, TrendingUp, Users, Award } from 'lucide-react';

export default function TestimonialsPage() {
  const averageRating = getAverageRating();
  const totalReviews = getTotalReviews();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1B3764] to-[#115B87] text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <BlurText
              text="Client Testimonials"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-6xl md:text-8xl font-bold text-white mb-6"
            />
            <p className="text-2xl text-gray-100 max-w-3xl mx-auto mb-12">
              Real reviews from real property owners. No bots, no AI, just genuine feedback from our clients.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Star className="w-12 h-12 text-[#F16022] mx-auto mb-3" fill="#F16022" />
                <div className="text-4xl font-bold mb-2">{averageRating}</div>
                <div className="text-sm text-gray-200">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Users className="w-12 h-12 text-[#F16022] mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">{totalReviews}+</div>
                <div className="text-sm text-gray-200">Total Reviews</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <TrendingUp className="w-12 h-12 text-[#F16022] mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-sm text-gray-200">Properties Designed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Award className="w-12 h-12 text-[#F16022] mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">22+</div>
                <div className="text-sm text-gray-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <TestimonialsShowcase reviews={googleReviews} itemsPerPage={12} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#F5F5DC] to-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-5xl font-bold text-[#1B3764] mb-6">
            Ready to Join Our Happy Clients?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's transform your vacation rental into a 5-star booking magnet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:4073488848"
              className="px-8 py-4 bg-[#F16022] text-white rounded-xl font-semibold text-lg hover:bg-[#E55A1A] transition-colors shadow-lg"
            >
              Call (407) 348-8848
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-[#1B3764] text-[#1B3764] hover:bg-[#1B3764] hover:text-white rounded-xl font-semibold text-lg transition-all"
            >
              Get Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
