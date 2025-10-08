"use client";

import React from 'react';
import { CheckCircle, Star, Users, Award, Heart, Camera } from 'lucide-react';
import BlurText from './ui/blur-text';

const features = [
  {
    icon: <Award className="w-8 h-8" />,
    title: "22+ Years of Excellence",
    description: "Over two decades of expertise in vacation rental design, with proven results across thousands of properties.",
    highlight: "Industry Veteran"
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "5-Star Client Reviews",
    description: "Our clients consistently rate us 5 stars. Don't just take our word for it - let our reviews speak for themselves.",
    highlight: "Client Trusted"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Custom Design Solutions",
    description: "From budget-friendly makeovers to luxury theme park-inspired rooms, we create designs that maximize your bookings.",
    highlight: "Tailored Approach"
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Quality & Reliability",
    description: "We're committed to delivering exceptional service. Quality and reliability are our standards, not exceptions.",
    highlight: "Guaranteed Quality"
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Free Professional Photography",
    description: "Premium visual content at no extra cost. Eye-catching images that boost your rental's online presence.",
    highlight: "No Extra Cost"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Giving Back to Community",
    description: "A portion of our earnings supports families in need and children's causes. Your project becomes a force for good.",
    highlight: "Social Impact"
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F16022]/10 text-[#F16022] text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2 stroke-2" strokeWidth={2.5} />
            Why Choose Furniture Packages USA
          </div>
          <BlurText
            text="The Difference That Makes All The Difference"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-6xl md:text-8xl font-bold text-[#1B3764] mb-4"
          />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We don't just furnish spaces – we create experiences that turn your vacation rental into a booking magnet. 
            Here's what sets us apart in the industry.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#F16022]/20 hover:-translate-y-2"
            >
              {/* Highlight Badge */}
              <div className="absolute -top-3 left-6">
                <span className="bg-[#F16022] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {feature.highlight}
                </span>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-[#1B3764]">
                  {React.cloneElement(feature.icon, { 
                    className: "w-10 h-10 stroke-2", 
                    strokeWidth: 2.5 
                  })}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#1B3764] mb-4 group-hover:text-[#F16022] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F16022]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-[#1B3764] to-[#2A4A6B] rounded-3xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#F16022]">22+</div>
              <div className="text-lg font-medium">Years Experience</div>
              <div className="text-sm text-gray-300">Industry Leadership</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#F16022]">1000+</div>
              <div className="text-lg font-medium">Properties Designed</div>
              <div className="text-sm text-gray-300">Proven Results</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#F16022]">500K+</div>
              <div className="text-lg font-medium">Guests Booked</div>
              <div className="text-sm text-gray-300">Hundreds of Thousands</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#F16022]">5.0</div>
              <div className="text-lg font-medium">Average Rating</div>
              <div className="text-sm text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-8">
            Ready to transform your vacation rental into a booking magnet?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#F16022] hover:bg-[#E55A1A] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get Free Design Consultation
            </button>
            <button className="border-2 border-[#1B3764] text-[#1B3764] hover:bg-[#1B3764] hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
              View Our Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
