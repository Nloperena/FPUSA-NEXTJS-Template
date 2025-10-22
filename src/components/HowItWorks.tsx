"use client";

import React from 'react';
import { 
  MessageCircle, 
  Palette, 
  ShoppingCart, 
  Truck, 
  CheckCircle, 
  Camera,
  Sparkles
} from 'lucide-react';
import BlurText from './ui/blur-text';
import InteractiveProcess from './InteractiveProcess';
import PackageSelector from './PackageSelector';
import TransformationCTA from './TransformationCTA';

const steps = [
  {
    number: "01",
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Free Consultation",
    description: "We start with a complimentary consultation to understand your vision, budget, and property requirements.",
    details: [
      "Property assessment",
      "Style preference discussion", 
      "Budget planning",
      "Timeline establishment"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "02", 
    icon: <Palette className="w-8 h-8" />,
    title: "Custom Design Creation",
    description: "Our design team creates a personalized plan that maximizes your rental's appeal and booking potential.",
    details: [
      "3D design mockups",
      "Furniture selection",
      "Color scheme planning",
      "Theme development"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "Furniture Sourcing",
    description: "We source high-quality furniture and decor that perfectly matches your design vision and budget.",
    details: [
      "Vendor partnerships",
      "Quality assurance",
      "Bulk pricing benefits",
      "Custom pieces when needed"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    number: "04",
    icon: <Truck className="w-8 h-8" />,
    title: "Professional Installation",
    description: "Our experienced team handles everything from delivery to final setup, ensuring perfect placement.",
    details: [
      "White-glove delivery",
      "Professional installation",
      "Quality inspection",
      "Final walkthrough"
    ],
    color: "from-orange-500 to-red-500"
  },
  {
    number: "05",
    icon: <Camera className="w-8 h-8" />,
    title: "Professional Photography",
    description: "We capture stunning photos of your transformed space to boost your online listing appeal.",
    details: [
      "Professional photography",
      "Multiple angles",
      "High-resolution images",
      "Marketing-ready content"
    ],
    color: "from-indigo-500 to-purple-500"
  },
  {
    number: "06",
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Launch & Support",
    description: "Your rental is ready to welcome guests! We provide ongoing support to ensure continued success.",
    details: [
      "Final quality check",
      "Maintenance guidance",
      "Ongoing support",
      "Performance monitoring"
    ],
    color: "from-teal-500 to-cyan-500"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F16022]/10 text-[#F16022] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2 stroke-2" strokeWidth={2.5} />
            Our Process
          </div>
          <BlurText
            text="How We Transform Your Space"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-6xl md:text-8xl font-bold text-[#1B3764] mb-4"
          />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial consultation to final photography, we handle every detail of your vacation rental transformation. 
            Here's how we bring your vision to life.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#F16022]/20 hover:-translate-y-2"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#F16022] to-[#E55A1A] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-[#1B3764]">
                  {React.cloneElement(step.icon, { 
                    className: "w-10 h-10 stroke-2", 
                    strokeWidth: 2.5 
                  })}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#1B3764] mb-4 group-hover:text-[#F16022] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Details List */}
              <ul className="space-y-2">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-[#F16022] rounded-full mr-3 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F16022]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Interactive Process */}
        <div className="mt-16">
          <InteractiveProcess />
        </div>

        {/* Transformation CTA */}
        <TransformationCTA />

        {/* Package Selector */}
        <div className="mt-20">
          <PackageSelector />
        </div>

      </div>
    </section>
  );
}
