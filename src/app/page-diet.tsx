"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import BlurText from '@/components/ui/blur-text';
import PremiumPackageSelector from '@/components/PremiumPackageSelector';
import ProductSchema from '@/components/ProductSchema';
import { Phone, ArrowRight, Star, TrendingUp, Clock } from 'lucide-react';

export default function HomeDiet() {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <ProductSchema />
      <div className="relative bg-white">
      {/* Hero Section with Video Background */}
      <div className="relative">
        {/* Video Background - Fixed */}
        <div className="fixed top-0 left-0 w-screen h-screen z-0 overflow-hidden">
          {mounted && (
            <>
              <iframe 
                src="https://player.vimeo.com/video/825630813?h=1e14851030&muted=1&background=1&app_id=58479&autoplay=1&loop=1&autopause=0"
                className="absolute top-1/2 left-1/2 opacity-100"
                style={{ 
                  width: '177.77777778vh',
                  height: '100vh',
                  minWidth: '100vw',
                  minHeight: '56.25vw',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="FPUSA Background Video"
              />
              <div className="absolute inset-0 bg-black/50" />
            </>
          )}
        </div>

        {/* Hero Content */}
        <div className="relative" style={{ zIndex: 20 }}>
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center text-white max-w-5xl">
              <div className="inline-flex items-center gap-2 bg-[#F16022]/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <Star className="w-5 h-5 text-[#F16022]" fill="#F16022" />
                <span className="text-white font-semibold">Florida's #1 Vacation Rental Designer</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl leading-tight">
                Transform Your Rental
                <br />
                <span className="text-[#F16022]">Triple Your Bookings</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
                Turn-key furniture packages that transform vacation rentals into 5-star booking magnets. 
                <span className="block mt-2 text-[#F16022] font-semibold">22+ years. 1000+ properties. Proven results.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:4073488848"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#F16022] hover:bg-[#E55A1A] text-white rounded-full font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
                >
                  <Phone className="w-6 h-6" />
                  Call (407) 348-8848
                </a>
                <Link
                  href="#consultation"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white rounded-full font-bold text-xl transition-all duration-300"
                >
                  Free Consultation
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-4xl font-bold text-[#F16022] mb-1">22+</div>
                  <div className="text-sm text-white/80">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#F16022] mb-1">1000+</div>
                  <div className="text-sm text-white/80">Properties Designed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#F16022] mb-1">5.0★</div>
                  <div className="text-sm text-white/80">Client Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections - Solid Background */}
          <div className="relative bg-white" style={{ zIndex: 20 }}>
            
            {/* Results Section */}
            <section className="py-24 bg-white">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16">
                  <BlurText
                    text="Real Results That Matter"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-5xl md:text-7xl font-bold text-[#1B3764] mb-6"
                  />
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our clients don't just get beautiful spaces—they get measurable business results
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-[#1B3764] to-[#115B87] rounded-3xl p-10 text-white text-center transform hover:scale-105 transition-all duration-300 shadow-xl">
                    <TrendingUp className="w-16 h-16 mx-auto mb-6 text-[#F16022]" />
                    <div className="text-5xl font-bold mb-3">87%</div>
                    <div className="text-xl mb-2">Average Increase</div>
                    <div className="text-sm text-gray-300">in Booking Rates</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#F16022] to-[#E55A1A] rounded-3xl p-10 text-white text-center transform hover:scale-105 transition-all duration-300 shadow-xl">
                    <Star className="w-16 h-16 mx-auto mb-6" fill="white" />
                    <div className="text-5xl font-bold mb-3">4.8★</div>
                    <div className="text-xl mb-2">Guest Rating</div>
                    <div className="text-sm text-white/90">Average Improvement</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#1B3764] to-[#115B87] rounded-3xl p-10 text-white text-center transform hover:scale-105 transition-all duration-300 shadow-xl">
                    <Clock className="w-16 h-16 mx-auto mb-6 text-[#F16022]" />
                    <div className="text-5xl font-bold mb-3">2-4</div>
                    <div className="text-xl mb-2">Weeks</div>
                    <div className="text-sm text-gray-300">Full Transformation</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Packages Section */}
            <PremiumPackageSelector />

            {/* Simple Process */}
            <section className="py-24 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                  <h2 className="text-5xl md:text-7xl font-bold text-[#1B3764] mb-6">
                    Simple. Fast. Proven.
                  </h2>
                  <p className="text-xl text-gray-600">Three steps to a fully transformed rental property</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#F16022] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                      1
                    </div>
                    <h3 className="text-2xl font-bold text-[#1B3764] mb-4">Consult</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Free consultation to understand your vision, budget, and goals. We handle everything.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#F16022] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                      2
                    </div>
                    <h3 className="text-2xl font-bold text-[#1B3764] mb-4">Design</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Custom furniture packages designed to maximize bookings and wow your guests.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#F16022] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                      3
                    </div>
                    <h3 className="text-2xl font-bold text-[#1B3764] mb-4">Launch</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Professional installation and photography. Your property is ready to earn.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Social Proof - Testimonials */}
            <section className="py-24 bg-[#1B3764]">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                  <BlurText
                    text="Trusted by Property Owners"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-5xl md:text-7xl font-bold text-white mb-6"
                  />
                  <p className="text-xl text-gray-200">See what our clients say about working with us</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-3xl p-8 shadow-xl">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-[#F16022]" fill="#F16022" />
                      ))}
                    </div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "Joe and Laura transformed our 6-bedroom villa. Bookings increased by 90% within 2 months. The ROI was immediate and incredible!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1B3764] rounded-full flex items-center justify-center text-white font-bold">
                        MB
                      </div>
                      <div>
                        <div className="font-bold text-[#1B3764]">Michael B.</div>
                        <div className="text-sm text-gray-500">Orlando, FL</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-8 shadow-xl">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-[#F16022]" fill="#F16022" />
                      ))}
                    </div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "As a remote investor, I needed someone I could trust completely. FPUSA delivered perfection. I've used them for 3 properties now."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1B3764] rounded-full flex items-center justify-center text-white font-bold">
                        SC
                      </div>
                      <div>
                        <div className="font-bold text-[#1B3764]">Sarah C.</div>
                        <div className="text-sm text-gray-500">California Investor</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <Link 
                    href="/testimonials"
                    className="inline-flex items-center gap-2 text-white hover:text-[#F16022] font-semibold text-lg group"
                  >
                    Read 50+ More Reviews
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section id="consultation" className="py-24 bg-white">
              <div className="container mx-auto px-4 max-w-4xl text-center">
                <BlurText
                  text="Ready to Transform Your Property?"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-5xl md:text-7xl font-bold text-[#1B3764] mb-6"
                />
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  Let's create a stunning rental that maximizes bookings and wows every guest.
                  <span className="block mt-2 text-[#F16022] font-semibold">Free consultation. No obligation. Fast turnaround.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                  <a
                    href="tel:4073488848"
                    className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#F16022] hover:bg-[#E55A1A] text-white rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                    aria-label="Call Furniture Packages USA"
                  >
                    <Phone className="w-6 h-6" />
                    Call (407) 348-8848
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white border-2 border-[#1B3764] text-[#1B3764] hover:bg-[#1B3764] hover:text-white rounded-xl font-bold text-xl transition-all duration-300"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-6 h-6" />
                  </a>
                </div>

                <p className="text-gray-500">
                  Local to Orlando · Family Owned · 22+ Years in Business
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

