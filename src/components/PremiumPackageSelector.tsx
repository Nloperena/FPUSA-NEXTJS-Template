"use client";

import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface Package {
  id: string;
  title: string;
  tagline: string;
  bullets: string[];
  price: string;
  priceSecondary?: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

const PACKAGES: Package[] = [
  {
    id: 'refresh',
    title: 'Refresh Package',
    tagline: 'Quick Updates for Instant Impact',
    bullets: [
      'New accent furniture & decor',
      'Professional staging',
      'Photography session',
      'Quick 1–2 week turnaround'
    ],
    price: 'Starting at $5,000',
    ctaText: 'Get Started with Refresh',
    ctaHref: '/consultation?package=refresh',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1600&fit=crop&q=90',
    imageAlt: 'Modern living room with refreshed staging and decor'
  },
  {
    id: 'partial',
    title: 'Partial / Per-Room Package',
    tagline: 'Targeted Room Transformations',
    bullets: [
      'Custom design for selected rooms',
      'Quality furniture & decor',
      'Professional installation',
      'Photography & styling'
    ],
    price: 'Per Room: $3,500–$7,500',
    priceSecondary: 'Starting at $15,000',
    ctaText: 'Build My Per-Room Plan',
    ctaHref: '/consultation?package=partial',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=1600&fit=crop&q=90',
    imageAlt: 'Beautifully furnished primary bedroom with custom design'
  },
  {
    id: 'full',
    title: 'Full Package',
    tagline: 'Complete Turn-Key Transformation',
    bullets: [
      'Comprehensive design & planning',
      'Full furniture & decor package',
      'Professional installation & setup',
      'Premium photography session',
      'Ongoing support & maintenance'
    ],
    price: 'Starting at $30,000',
    ctaText: 'Get Started with Full Package',
    ctaHref: '/consultation?package=full',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=1600&fit=crop&q=90',
    imageAlt: 'Complete vacation rental transformation with full furnishing'
  }
];

const THEME_ROOMS = [
  { name: 'Princess Suite', range: '$6k–$12k' },
  { name: 'Galaxy Bunk Room', range: '$7k–$14k' },
  { name: 'Ocean Adventure', range: '$6k–$11k' },
  { name: 'Arcade / Media', range: '$8k–$18k' }
];

// ============================================================================
// UTILITY: Scroll Timeline Support Detection
// ============================================================================

function supportsScrollTimeline(): boolean {
  if (typeof window === 'undefined') return false;
  return 'AnimationTimeline' in window;
}

// ============================================================================
// HOOK: Parallax Fallback (JS-based for browsers without Scroll Timeline API)
// ============================================================================

function useParallaxFallback(
  panelRefs: React.RefObject<HTMLElement>[],
  isReducedMotion: boolean
) {
  useEffect(() => {
    if (isReducedMotion || supportsScrollTimeline()) return;

    let rafId: number;

    const handleScroll = () => {
      panelRefs.forEach((ref) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const panelCenter = rect.top + rect.height / 2;
        const scrollProgress = 1 - panelCenter / windowHeight;

        // Find layers
        const bgLayer = ref.current.querySelector('[data-parallax="bg"]') as HTMLElement;
        const midLayer = ref.current.querySelector('[data-parallax="mid"]') as HTMLElement;
        const fgLayer = ref.current.querySelector('[data-parallax="fg"]') as HTMLElement;

        if (bgLayer) {
          const translateY = scrollProgress * -12;
          bgLayer.style.transform = `translateY(${translateY}%)`;
        }
        if (midLayer) {
          const translateY = scrollProgress * -6;
          midLayer.style.transform = `translateY(${translateY}%)`;
        }
        if (fgLayer) {
          const translateY = scrollProgress * -2;
          const scale = 0.98 + scrollProgress * 0.02;
          fgLayer.style.transform = `translateY(${translateY}%) scale(${scale})`;
        }
      });

      rafId = requestAnimationFrame(handleScroll);
    };

    rafId = requestAnimationFrame(handleScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [panelRefs, isReducedMotion]);
}

// ============================================================================
// HOOK: Active Panel Detection
// ============================================================================

function useActivePanelDetection(
  panelRefs: React.RefObject<HTMLElement>[],
  setActiveIndex: (index: number) => void
) {
  useEffect(() => {
    const observers = panelRefs.map((ref, index) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveIndex(index);
            }
          });
        },
        { threshold: [0.5] }
      );

      observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [panelRefs, setActiveIndex]);
}

// ============================================================================
// COMPONENT: Estimator Modal
// ============================================================================

interface EstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EstimatorModal({ isOpen, onClose }: EstimatorModalProps) {
  const [rooms, setRooms] = useState({ living: 1, primary: 1, kids: 0, dining: 0 });
  const [hasTheme, setHasTheme] = useState(false);
  const [estimate, setEstimate] = useState({ low: 0, high: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const PRICES = {
    living: [4000, 7500],
    primary: [3500, 6500],
    kids: [4500, 8500],
    dining: [2500, 5000],
    theme: [6000, 18000]
  };

  useEffect(() => {
    let low = 0, high = 0;
    Object.entries(rooms).forEach(([key, count]) => {
      const [priceLow, priceHigh] = PRICES[key as keyof typeof PRICES];
      low += priceLow * count;
      high += priceHigh * count;
    });
    if (hasTheme) {
      low += PRICES.theme[0];
      high += PRICES.theme[1];
    }
    setEstimate({ low, high });
  }, [rooms, hasTheme]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      modalRef.current?.focus();
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="estimator-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 id="estimator-title" className="text-2xl md:text-3xl font-bold text-[#1B3764]">
              Fast Quote Estimator
            </h3>
            <p className="text-gray-600 mt-1">Get your custom range in seconds</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F16022]"
            aria-label="Close estimator"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Room Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {Object.entries({ living: 'Living Room', primary: 'Primary Bedroom', kids: 'Kids / Bunk', dining: 'Dining / Nook' }).map(([key, label]) => (
            <label key={key} className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{label}</span>
              <input
                type="number"
                min="0"
                value={rooms[key as keyof typeof rooms]}
                onChange={(e) => setRooms(prev => ({ ...prev, [key]: Math.max(0, parseInt(e.target.value) || 0) }))}
                className="w-full rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022] transition-colors"
              />
              <span className="text-xs text-gray-500 mt-1 block">
                {fmt(PRICES[key as keyof typeof PRICES][0])} – {fmt(PRICES[key as keyof typeof PRICES][1])}
              </span>
            </label>
          ))}
        </div>

        {/* Theme Add-On */}
        <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-[#F16022] transition-colors cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={hasTheme}
            onChange={(e) => setHasTheme(e.target.checked)}
            className="rounded text-[#F16022] focus:ring-[#F16022] w-5 h-5"
          />
          <span className="flex-1 font-semibold text-gray-700">Add Theme Room</span>
          <span className="text-sm text-gray-500">+{fmt(PRICES.theme[0])} – {fmt(PRICES.theme[1])}</span>
        </label>

        {/* Estimate Display */}
        <div className="bg-gradient-to-br from-[#F16022]/10 to-[#F16022]/5 rounded-2xl p-6 border-2 border-[#F16022]/20 mb-6">
          <p className="text-sm font-semibold text-gray-600 mb-2">Your Estimated Range</p>
          <p className="text-4xl font-extrabold text-[#F16022] mb-3">
            {fmt(estimate.low)} – {fmt(estimate.high)}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Final proposal depends on finish level, lead times, and current vendor pricing.
          </p>
        </div>

        {/* Contact Form */}
        <form action="/api/quote" method="post" className="space-y-4">
          <input type="hidden" name="estimate" value={`${fmt(estimate.low)} – ${fmt(estimate.high)}`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name *"
              required
              className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
            />
            <input
              name="email"
              type="email"
              placeholder="Email *"
              required
              className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
            />
          </div>
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            className="w-full rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
          />
          <textarea
            name="notes"
            placeholder="Tell us about your property (bed/bath count, goals, timeline)..."
            rows={4}
            className="w-full rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
          />
          <button
            type="submit"
            className="w-full bg-[#F16022] hover:bg-[#E55A1A] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#F16022]/50"
          >
            Send My Quote Request
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: Premium Package Selector
// ============================================================================

export default function PremiumPackageSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEstimator, setShowEstimator] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Active panel detection
  useActivePanelDetection(
    panelRefs.current.map(el => ({ current: el })),
    setActiveIndex
  );

  // Parallax fallback for browsers without Scroll Timeline API
  useParallaxFallback(
    panelRefs.current.map(el => ({ current: el })),
    isReducedMotion
  );

  const scrollToPanel = (index: number) => {
    panelRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-label="Choose Your Perfect Package"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-[#1B3764] mb-6 leading-tight">
            Choose Your Perfect Package
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From quick refreshes to complete transformations, we have a solution that fits your property and budget.
          </p>
        </div>

        {/* Desktop: Sticky Rail + Panels | Mobile: Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12">
          {/* LEFT: Sticky Package Rail */}
          <aside
            className="lg:sticky lg:top-20 lg:self-start space-y-6 h-fit"
            style={{ containerType: 'inline-size', containerName: 'rail' }}
          >
            {/* Package Rail Cards */}
            <nav aria-label="Package navigation" className="space-y-4">
              {PACKAGES.map((pkg, index) => (
                <button
                  key={pkg.id}
                  onClick={() => scrollToPanel(index)}
                  aria-controls={`panel-${pkg.id}`}
                  aria-current={activeIndex === index ? 'true' : 'false'}
                  className={`
                    group w-full text-left p-5 rounded-2xl border-2 transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-[#F16022]/50
                    ${activeIndex === index
                      ? 'bg-white border-[#F16022] shadow-xl scale-[1.02]'
                      : 'bg-white/60 border-gray-200 hover:border-gray-300 hover:shadow-lg hover:bg-white'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`
                        flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-all duration-300
                        ${activeIndex === index ? 'bg-[#F16022] scale-110' : 'bg-[#1B3764] group-hover:bg-[#F16022]'}
                      `}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl font-bold mb-1 transition-colors ${activeIndex === index ? 'text-[#F16022]' : 'text-[#1B3764]'}`}>
                        {pkg.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{pkg.tagline}</p>
                      <p className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-[#1B3764]' : 'text-gray-700'}`}>
                        {pkg.price}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Theme Rooms Add-Ons */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <i className="fas fa-sparkles text-[#F16022] text-lg"></i>
                <h4 className="text-sm font-bold text-[#1B3764] uppercase tracking-wide">Theme Rooms Add-Ons</h4>
              </div>
              <div className="space-y-2 mb-3">
                {THEME_ROOMS.map((theme, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">{theme.name}</span>
                    <span className="text-[#F16022] font-bold">{theme.range}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Pricing varies by mural, props, AV & built-ins.
              </p>
            </div>

            {/* Quick Estimator Button */}
            <button
              onClick={() => setShowEstimator(true)}
              className="w-full bg-gradient-to-r from-[#1B3764] to-[#2A4A6B] hover:from-[#2A4A6B] hover:to-[#1B3764] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#F16022]/50"
            >
              <i className="fas fa-calculator mr-2"></i>
              Get Fast Quote
            </button>
          </aside>

          {/* RIGHT: Scrolling Story Panels with Parallax */}
          <div className="space-y-8">
            {PACKAGES.map((pkg, index) => (
              <article
                key={pkg.id}
                id={`panel-${pkg.id}`}
                ref={(el) => (panelRefs.current[index] = el)}
                aria-labelledby={`panel-title-${pkg.id}`}
                className={`
                  relative min-h-[600px] lg:min-h-[800px] rounded-3xl overflow-hidden shadow-2xl
                  scroll-snap-align-start
                  ${isReducedMotion ? 'animate-fadeIn' : ''}
                `}
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Multi-Layer Parallax */}
                <div className="absolute inset-0">
                  {/* BG Layer: Deepest parallax */}
                  <div
                    data-parallax="bg"
                    className="absolute inset-[-12%] w-full h-[124%]"
                    style={{
                      willChange: isReducedMotion ? 'auto' : 'transform',
                      animation: !isReducedMotion && supportsScrollTimeline() ? 'parallax-bg linear' : 'none',
                      animationTimeline: !isReducedMotion && supportsScrollTimeline() ? 'scroll()' : 'auto'
                    }}
                  >
                    <picture>
                      <source
                        srcSet={pkg.image.replace('q=90', 'q=90&fm=avif')}
                        type="image/avif"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <source
                        srcSet={pkg.image.replace('q=90', 'q=90&fm=webp')}
                        type="image/webp"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <img
                        src={pkg.image}
                        alt={pkg.imageAlt}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        width="1200"
                        height="1600"
                      />
                    </picture>
                  </div>

                  {/* Mid Layer: Texture overlay */}
                  <div
                    data-parallax="mid"
                    className="absolute inset-[-6%] w-full h-[112%] bg-gradient-to-br from-[#1B3764]/60 via-[#1B3764]/30 to-transparent"
                    style={{
                      willChange: isReducedMotion ? 'auto' : 'transform',
                      animation: !isReducedMotion && supportsScrollTimeline() ? 'parallax-mid linear' : 'none',
                      animationTimeline: !isReducedMotion && supportsScrollTimeline() ? 'scroll()' : 'auto'
                    }}
                  />

                  {/* FG Layer: Lightest parallax with scale */}
                  <div
                    data-parallax="fg"
                    className="absolute inset-0"
                    style={{
                      willChange: isReducedMotion ? 'auto' : 'transform',
                      animation: !isReducedMotion && supportsScrollTimeline() ? 'parallax-fg linear' : 'none',
                      animationTimeline: !isReducedMotion && supportsScrollTimeline() ? 'scroll()' : 'auto'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="relative h-full flex flex-col justify-end p-6 md:p-10">
                  {/* Package Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm border border-white/30">
                      <span className="w-6 h-6 rounded-full bg-[#F16022] flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      Package {index + 1}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50 max-w-2xl">
                    <h3
                      id={`panel-title-${pkg.id}`}
                      className="text-3xl md:text-4xl font-bold text-[#1B3764] mb-2"
                    >
                      {pkg.title}
                    </h3>
                    <p className="text-lg text-[#F16022] font-semibold mb-6">{pkg.tagline}</p>

                    {/* Bullets */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {pkg.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <i className="fas fa-check-circle text-[#F16022] mt-1 flex-shrink-0"></i>
                          <span className="text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pricing */}
                    <div className="flex items-end justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Investment</p>
                        <p className="text-2xl md:text-3xl font-bold text-[#1B3764]">{pkg.price}</p>
                        {pkg.priceSecondary && (
                          <p className="text-sm text-gray-600 mt-1">{pkg.priceSecondary}</p>
                        )}
                      </div>
                      <button
                        onClick={() => setShowEstimator(true)}
                        className="text-[#F16022] hover:text-[#E55A1A] font-semibold text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#F16022] rounded-lg px-3 py-2"
                      >
                        <i className="fas fa-calculator"></i>
                        Calculate
                      </button>
                    </div>

                    {/* CTA */}
                    <a
                      href={pkg.ctaHref}
                      className="block w-full text-center bg-[#F16022] hover:bg-[#E55A1A] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#F16022]/50"
                    >
                      {pkg.ctaText}
                      <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Estimator Modal */}
      <EstimatorModal isOpen={showEstimator} onClose={() => setShowEstimator(false)} />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Vacation Rental Furniture Packages',
            brand: { '@type': 'Brand', name: 'Furniture Packages USA' },
            description: 'Turn-key and per-room furniture packages for vacation rentals in Orlando and Central Florida.',
            areaServed: ['Orlando', 'Kissimmee', 'Central Florida'],
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '5000',
              highPrice: '60000',
              offerCount: '3'
            }
          })
        }}
      />

      {/* CSS Keyframes for Scroll-Linked Animations */}
      <style jsx>{`
        @keyframes parallax-bg {
          from { transform: translateY(-6%); }
          to { transform: translateY(6%); }
        }
        @keyframes parallax-mid {
          from { transform: translateY(-3%); }
          to { transform: translateY(3%); }
        }
        @keyframes parallax-fg {
          from { transform: translateY(-1%) scale(0.98); }
          to { transform: translateY(1%) scale(1.0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}


