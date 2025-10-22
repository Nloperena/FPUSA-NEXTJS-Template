"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface Card {
  number: string;
  title: string;
  description: string;
  stat: string;
  bgImage: string;
  icon: string;
  testimonials?: string[];
}

const CARDS_DATA: Card[] = [
  {
    number: '01',
    title: '22+ Years of Excellence',
    description: 'Over two decades of expertise in vacation rental design, with proven results across thousands of properties.',
    stat: '1,000+ properties designed across Central Florida',
    bgImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
    icon: 'award',
    testimonials: ['"Transformed our business." - Sarah M.', '"Best investment ever made." - Michael T.', '"Absolute game changer." - Jennifer P.'],
  },
  {
    number: '02',
    title: '5-Star Client Reviews',
    description: 'Our clients consistently rate us 5 stars. Don\'t just take our word for it—let our reviews speak for themselves.',
    stat: '500+ verified 5-star reviews',
    bgImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    icon: 'star',
    testimonials: ['"Outstanding service!" - David K.', '"Exceeded expectations." - Lisa R.', '"Highly recommend!" - James W.'],
  },
  {
    number: '03',
    title: 'Custom Design Solutions',
    description: 'From budget-friendly makeovers to luxury theme park-inspired rooms, we create designs that maximize your bookings.',
    stat: '3,100+ verified stays influenced in 24 months',
    bgImage: 'https://images.unsplash.com/photo-1565183938294-7563f3ce68c5?w=1200&h=800&fit=crop',
    icon: 'palette',
    testimonials: ['"Bookings increased 300%." - Amanda G.', '"Creative solutions." - Robert H.', '"Worth every penny." - Nicole S.'],
  },
  {
    number: '04',
    title: 'Quality & Reliability',
    description: 'We\'re committed to delivering exceptional service. Quality and reliability are our standards, not exceptions.',
    stat: '99.2% client satisfaction rate',
    bgImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
    icon: 'check',
    testimonials: ['"Reliable partners." - Tom B.', '"Consistent excellence." - Patricia M.', '"Always on point." - Kevin L.'],
  },
  {
    number: '05',
    title: 'Free Professional Photography',
    description: 'Premium visual content at no extra cost. Eye-catching images that boost your rental\'s online presence.',
    stat: 'Included in every package',
    bgImage: 'https://images.unsplash.com/photo-1491897554886-76df266b133d?w=1200&h=800&fit=crop',
    icon: 'camera',
    testimonials: ['"Photos are stunning." - Emily C.', '"Booking rate soared." - Mark D.', '"Professional quality." - Susan V.'],
  },
  {
    number: '06',
    title: 'Giving Back to Community',
    description: 'A portion of our earnings supports families in need and children\'s causes. Your project becomes a force for good.',
    stat: '$50K+ donated to local causes',
    bgImage: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1200&h=800&fit=crop',
    icon: 'heart',
    testimonials: ['"Proud to partner." - Grace F.', '"Community focused." - Richard E.', '"Making a difference." - Barbara T.'],
  },
];

// ============================================================================
// ICON COMPONENT
// ============================================================================

const IconSVG = ({ type, className = '' }: { type: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    award: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <circle cx="12" cy="8" r="7" />
        <path d="M8 15h8" />
        <path d="M9 15l-2 5h10l-2-5" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    palette: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="7" cy="9" r="2" />
        <circle cx="17" cy="9" r="2" />
        <circle cx="9" cy="17" r="2" />
        <circle cx="15" cy="17" r="2" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    camera: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  };
  return icons[type] || null;
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// Character reveal helper
const revealChars = (text: string, isActive: boolean) => {
  if (!isActive) return text;
  return text.split('').map((char, i) => (
    <span
      key={i}
      className="inline-block opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
      style={{ animationDelay: `${i * 20}ms` }}
    >
      {char}
    </span>
  ));
};

// Live counter component
const LiveCounter = ({ target, isActive }: { target: number; isActive: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }

    let current = 0;
    const increment = target / 40;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isActive, target]);

  return <span className="tabular-nums">{count.toLocaleString()}</span>;
};

// Scroll progress ring
const ScrollProgressRing = ({ progress }: { progress: number }) => (
  <div className="fixed top-8 right-8 z-50 w-16 h-16 pointer-events-none">
    <svg viewBox="0 0 60 60" className="w-full h-full rotate-[-90deg]">
      <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      <circle
        cx="30"
        cy="30"
        r="28"
        fill="none"
        stroke="#F16022"
        strokeWidth="2"
        strokeDasharray={`${progress * 176} 176`}
        className="transition-all duration-300"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
      {Math.round(progress * 100)}%
    </div>
  </div>
);

// Testimonial modal
const TestimonialModal = ({ card, onClose }: { card: Card; onClose: () => void }) => (
  <div
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md border border-white/10 shadow-2xl animate-[scaleIn_0.3s_ease-out]">
      <h3 className="text-2xl font-bold text-white mb-6">Client Testimonials</h3>
      <div className="space-y-4 mb-6">
        {card.testimonials?.map((testimonial, i) => (
          <p key={i} className="text-white/80 text-sm leading-relaxed italic">
            {testimonial}
          </p>
        ))}
      </div>
      <button
        onClick={onClose}
        className="w-full px-6 py-3 bg-[#F16022] hover:bg-[#E55A1A] text-white font-semibold rounded-lg transition-all duration-300"
      >
        Close
      </button>
    </div>
  </div>
);

// Section card
const SectionCard = ({
  card,
  idx,
  isActive,
  scrollProgress,
  onShowTestimonial,
}: {
  card: Card;
  idx: number;
  isActive: boolean;
  scrollProgress: number;
  onShowTestimonial: (idx: number) => void;
}) => (
  <section
    className="sticky top-0 h-screen w-full flex items-center justify-center px-4 md:px-8 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 overflow-hidden"
    style={{
      zIndex: 10 + idx,
      perspective: '1200px',
    }}
  >
    {/* Background image */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url('${card.bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    />

    {/* Split overlay: 50% blue, 50% transparent */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(to right, #2c3e50 0%, #2c3e50 50%, transparent 50%, transparent 100%)',
      }}
    />

    {/* Radial energy glow */}
    <div className="absolute inset-0 opacity-[.07] bg-[radial-gradient(60%_80%_at_20%_20%,#F16022,transparent_60%)]" />

    {/* Content */}
    <div
      className={`relative z-10 w-full h-full flex items-center max-w-7xl mx-auto will-change-transform transition-all duration-500 ${
        isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-50 scale-[.98] translate-y-2'
      }`}
      style={{
        transform: isActive ? 'perspective(1200px) rotateX(0deg)' : 'perspective(1200px) rotateX(2deg)',
      }}
    >
      <div className="w-full h-full flex items-center gap-8">
        {/* Left side - text content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 md:px-8">
          <div className="space-y-6">
            {/* Icon */}
            <div className="relative w-12 h-12 text-[#F16022] opacity-0 animate-[slideIn_0.8s_ease-out_0.2s_forwards]">
              <IconSVG type={card.icon} className="w-full h-full stroke-[#F16022]" />
              <div
                className="absolute inset-0 border border-[#F16022] rounded-lg opacity-0 animate-[pulse_1.5s_ease-in-out_infinite]"
                style={{ animationDelay: '0.3s' }}
              />
            </div>

            {/* Number & Title */}
            <div className="relative mb-6">
              <span className="absolute -left-1 md:-left-4 -top-6 md:-top-10 text-7xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white/10 via-white/6 to-transparent select-none pointer-events-none leading-none">
                {card.number}
              </span>
              <h3 className="relative z-10 text-4xl md:text-6xl font-extrabold tracking-tight text-white text-balance">
                <span
                  className={`bg-gradient-to-r from-[#F16022] to-[#E55A1A] bg-[length:0%_3px] bg-no-repeat bg-left-bottom pb-1 transition-[background-size] duration-700 ${
                    isActive ? 'bg-[length:100%_3px]' : 'bg-[length:0%_3px]'
                  }`}
                >
                  {isActive ? revealChars(card.title, true) : card.title}
                </span>
              </h3>
            </div>

            {/* Description */}
            <p className="max-w-[68ch] text-lg md:text-xl text-white/80 leading-relaxed [text-wrap:balance] mb-6">
              {isActive ? revealChars(card.description, true) : card.description}
            </p>

            {/* Stat pill with testimonials */}
            <StatPill card={card} isActive={isActive} onShowTestimonial={() => onShowTestimonial(idx)} />
          </div>
        </div>

        {/* Right side - background image (hidden on mobile) */}
        <div className="hidden lg:block w-1/2 h-full" />
      </div>
    </div>
  </section>
);

// Stat pill component
const StatPill = ({ card, isActive, onShowTestimonial }: { card: Card; isActive: boolean; onShowTestimonial?: () => void }) => (
  <div
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-white/90 transition-all duration-500 cursor-pointer hover:bg-white/8 ${
      isActive ? 'shadow-[0_0_24px_0_rgba(241,96,34,.25)]' : 'shadow-[0_0_0_0_rgba(241,96,34,0)]'
    }`}
    onClick={onShowTestimonial}
  >
    <span className="relative">
      <span
        className={`absolute inset-0 rounded-full bg-[#F16022] opacity-0 scale-75 ${
          isActive ? 'opacity-30 animate-[pulse_900ms_ease-out_1]' : ''
        }`}
      />
      <span className="relative w-1.5 h-1.5 block rounded-full bg-[#F16022]" />
    </span>

    {card.stat.includes('1,000') ? (
      <>
        <LiveCounter target={1000} isActive={isActive} />+ properties
      </>
    ) : card.stat.includes('500') ? (
      <>
        <LiveCounter target={500} isActive={isActive} />+ reviews
      </>
    ) : card.stat.includes('3,100') ? (
      <>
        <LiveCounter target={3100} isActive={isActive} />+ stays influenced
      </>
    ) : (
      card.stat
    )}
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function WhyChooseUsV2() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTestimonial, setShowTestimonial] = useState<number | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Setup intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex((section) => section === entry.target);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-slate-900">
      {/* Scroll progress ring */}
      <ScrollProgressRing progress={scrollProgress} />

      {/* Sections */}
      {CARDS_DATA.map((card, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) sectionsRef.current[idx] = el;
          }}
        >
          <SectionCard
            card={card}
            idx={idx}
            isActive={idx === activeSection}
            scrollProgress={scrollProgress}
            onShowTestimonial={(idx) => setShowTestimonial(idx)}
          />
        </div>
      ))}

      {/* Testimonial modal */}
      {showTestimonial !== null && (
        <TestimonialModal
          card={CARDS_DATA[showTestimonial]}
          onClose={() => setShowTestimonial(null)}
        />
      )}

      {/* Stats section */}
      <section className="relative min-h-screen bg-gradient-to-r from-[#1e2832] via-[#2a3545] to-[#1e2832] py-20 px-4 md:px-8 flex items-center justify-center border-t border-gray-700/30">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            The Numbers Behind Our Success
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '22+', text: 'Years Experience', sub: 'Industry Leadership' },
              { label: '1,000+', text: 'Properties Designed', sub: 'Proven Results' },
              { label: '500K+', text: 'Guests Booked', sub: 'Hundreds of Thousands' },
              { label: '5.0', text: 'Average Rating', sub: 'Client Satisfaction' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-[#F16022] mb-2">{stat.label}</div>
                <div className="text-sm md:text-base font-semibold text-white mb-1">{stat.text}</div>
                <div className="text-xs md:text-sm text-gray-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-20 px-4 md:px-8 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F16022]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <h3 className="text-4xl md:text-6xl font-bold text-white">Ready to Transform Your Rental?</h3>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Let's create an experience that turns guests into return bookings and revenue into growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            {['Get Free Design Consultation', 'View Our Portfolio'].map((text, i) => (
              <button
                key={i}
                className={`relative px-8 py-4 font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95 ${
                  i === 0
                    ? 'bg-[#F16022] hover:bg-[#E55A1A] text-white shadow-lg hover:shadow-xl hover:shadow-[#F16022]/50 focus:ring-[#F16022]'
                    : 'border-2 border-white text-white hover:bg-white hover:text-slate-900 focus:ring-white'
                }`}
                onMouseMove={(e) => {
                  const btn = e.currentTarget;
                  const rect = btn.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const distX = (x - centerX) * 0.2;
                  const distY = (y - centerY) * 0.2;
                  btn.style.transform = `translate(${distX}px, ${distY}px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                }}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(0.75);
            opacity: 0;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.25;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
