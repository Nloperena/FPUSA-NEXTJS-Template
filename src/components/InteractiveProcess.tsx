"use client";

import React, { useState } from 'react';
import { 
  MessageCircle, 
  Palette, 
  ShoppingCart, 
  Truck, 
  CheckCircle, 
  Camera
} from 'lucide-react';

const processSteps = [
  {
    number: "01",
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Free Consultation",
    description: "We start with a complimentary consultation to understand your vision, budget, and property requirements.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop"
  },
  {
    number: "02", 
    icon: <Palette className="w-6 h-6" />,
    title: "Custom Design Creation",
    description: "Our design team creates a personalized plan that maximizes your rental's appeal and booking potential.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop"
  },
  {
    number: "03",
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Furniture Sourcing",
    description: "We source high-quality furniture and decor that perfectly matches your design vision and budget.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop"
  },
  {
    number: "04",
    icon: <Truck className="w-6 h-6" />,
    title: "Professional Installation",
    description: "Our experienced team handles everything from delivery to final setup, ensuring perfect placement.",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&h=800&fit=crop"
  },
  {
    number: "05",
    icon: <Camera className="w-6 h-6" />,
    title: "Professional Photography",
    description: "We capture stunning photos of your transformed space to boost your online listing appeal.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=800&fit=crop"
  },
  {
    number: "06",
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Launch & Support",
    description: "Your rental is ready to welcome guests! We provide ongoing support to ensure continued success.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop"
  }
];

export default function InteractiveProcess() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left: Image */}
        <div className="relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                selectedStep === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#F16022] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  {React.cloneElement(step.icon, { 
                    className: "w-8 h-8 text-white", 
                    strokeWidth: 2.5 
                  })}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-200">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: List Items */}
        <div className="flex flex-col justify-center space-y-4">
          <h3 className="text-4xl font-bold text-[#1B3764] mb-6">
            Your Journey to Success
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Click each step to learn more about our proven process
          </p>
          
          {processSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setSelectedStep(index)}
              className={`group relative bg-white rounded-2xl p-6 text-left transition-all duration-300 transform hover:scale-105 ${
                selectedStep === index 
                  ? 'shadow-2xl ring-2 ring-[#F16022] scale-105' 
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Number Badge */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
                  selectedStep === index 
                    ? 'bg-[#F16022] scale-110' 
                    : 'bg-[#1B3764] group-hover:bg-[#F16022]'
                }`}>
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {React.cloneElement(step.icon, { 
                      className: `w-5 h-5 transition-colors duration-300 ${
                        selectedStep === index ? 'text-[#F16022]' : 'text-[#1B3764]'
                      }`, 
                      strokeWidth: 2.5 
                    })}
                    <h4 className={`text-xl font-bold transition-colors duration-300 ${
                      selectedStep === index ? 'text-[#F16022]' : 'text-[#1B3764]'
                    }`}>
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className={`flex-shrink-0 transition-all duration-300 ${
                  selectedStep === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}>
                  <svg className="w-6 h-6 text-[#F16022]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Active Border */}
              {selectedStep === index && (
                <div className="absolute inset-0 rounded-2xl border-2 border-[#F16022] pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

