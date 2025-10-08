"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import ScrollFloat from "@/components/ScrollFloat";

export default function AboutPage() {
  const timelineData = [
    {
      title: "2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8">
            Continuing to innovate and set new standards in vacation rental furnishing across Central Florida. Expanding our design portfolio with cutting-edge themed experiences.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://furniturepackagesusa.com/wp-content/uploads/2023/10/image4-2-1024x1024.png"
              alt="2025 design"
              className="rounded-lg object-cover shadow-lg w-full h-40 md:h-60"
            />
            <img
              src="https://furniturepackagesusa.com/wp-content/uploads/2023/11/image9-724x1024.png"
              alt="2025 design"
              className="rounded-lg object-cover shadow-lg w-full h-40 md:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2020-2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8">
            Expanded our services to include theme park-inspired rooms, luxury coastal designs, and family-friendly vacation spaces. Helped hundreds of property owners maximize their ROI during the vacation rental boom.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://furniturepackagesusa.com/wp-content/uploads/2023/07/SpaceTheme.jpg"
              alt="Space theme design"
              className="rounded-lg object-cover shadow-lg w-full h-40 md:h-60"
            />
            <img
              src="https://furniturepackagesusa.com/wp-content/uploads/2023/07/52940520520_41a02d3164_c.jpg"
              alt="Golden delight design"
              className="rounded-lg object-cover shadow-lg w-full h-40 md:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2010-2019",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8">
            Established ourselves as Florida's trusted vacation rental furnishing experts. Developed our turnkey approach and built lasting relationships with property owners throughout Orlando and beyond.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://furniturepackagesusa.com/wp-content/uploads/2023/07/LivingRoom-900x604.jpg"
              alt="Living room design"
              className="rounded-lg object-cover shadow-lg w-full h-40 md:h-60"
            />
            <img
              src="https://furniturepackagesusa.com/wp-content/uploads/2023/07/DiningRoom-900x604.jpg"
              alt="Dining room design"
              className="rounded-lg object-cover shadow-lg w-full h-40 md:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2001-2009",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-4">
            Founded FURNITURE PACKAGES USA with a vision to transform ordinary vacation rentals into extraordinary guest experiences.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8">
            Started with a handful of projects, focusing on quality craftsmanship and customer satisfaction. Built our reputation one satisfied client at a time.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              ✅ Company founded by Joe and Denise
            </div>
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              ✅ First 100 vacation rental transformations
            </div>
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              ✅ Established Central Florida presence
            </div>
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              ✅ Developed custom design process
            </div>
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              ✅ Built foundation of excellence
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-32 bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <ScrollFloat 
            containerClassName="text-center mb-6"
            textClassName="text-5xl font-bold text-[#1B3764]"
            animationDuration={1}
            ease="back.inOut(2)"
            stagger={0.03}
          >
            About Us
          </ScrollFloat>
          <p className="text-2xl text-gray-600 leading-relaxed">
            A name you can trust, built on years of successful transformations, attentive service and glowing reviews.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Hello and welcome to <strong className="text-[#1B3764]">FURNITURE PACKAGES USA</strong>, where we turn your dream homes into reality. We're not just about fancy furniture and decor – we're about understanding your vision, your style, and your budget.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Whether you need a dash of design advice or a full-blown transformation, we're here, walking alongside you. Together, we will craft spaces that resonate with you, bringing a sense of satisfaction as the home you dreamed about quietly takes shape. Together, we will craft a space that resonates with you and your guests.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <Timeline data={timelineData} />
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-[#1B3764] to-[#115B87] text-white p-12 rounded-2xl">
            <h2 className="text-4xl font-bold text-center mb-12">By The Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-6xl font-bold text-[#F16022] mb-2">22+</div>
                <p className="text-xl">Years of Excellence</p>
              </div>
              <div>
                <div className="text-6xl font-bold text-[#F16022] mb-2">500+</div>
                <p className="text-xl">Properties Transformed</p>
              </div>
              <div>
                <div className="text-6xl font-bold text-[#F16022] mb-2">100%</div>
                <p className="text-xl">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Owners */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-[#1B3764] text-center mb-12">
            Meet JOE and DENISE
          </h2>
          <p className="text-2xl text-gray-600 text-center mb-8">The Owners</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center">
                <p className="text-gray-500">Video: Joe the owner and his wife Denise</p>
              </div>
            </div>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                With over two decades of experience in the vacation rental industry, Joe and Denise have built FURNITURE PACKAGES USA on a foundation of trust, creativity, and exceptional service.
              </p>
              <p>
                Their hands-on approach and keen eye for design have helped hundreds of property owners transform their rentals into memorable guest experiences that drive bookings and maximize ROI.
              </p>
              <p>
                From theme park-inspired bedrooms to elegant coastal living spaces, their expertise spans the full spectrum of vacation rental design.
              </p>
            </div>
          </div>
        </div>

        {/* Charitable Giving */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-gray-50 p-12 rounded-2xl">
            <h2 className="text-4xl font-bold text-[#1B3764] text-center mb-8">
              Giving Back
            </h2>
            <p className="text-xl text-gray-600 text-center mb-10">
              We don't just design spaces; we build bridges to better futures. A portion of our earnings aids families in need and gives hope to children.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#F16022] mb-2">St. Jude's</h3>
                <p className="text-gray-600">Childhood cancer research</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#F16022] mb-2">Give Kids the World</h3>
                <p className="text-gray-600">Magical vacations for ill children</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#F16022] mb-2">Second Harvest</h3>
                <p className="text-gray-600">Food for families in need</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#F16022] to-[#D35127] text-white p-12 rounded-2xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create something amazing for your vacation rental.
            </p>
            <a
              href="tel:4073488848"
              className="inline-flex items-center justify-center bg-white text-[#F16022] hover:bg-gray-100 text-lg px-10 py-4 rounded-full transition-all font-semibold"
            >
              Call us: (407) 348-8848
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
