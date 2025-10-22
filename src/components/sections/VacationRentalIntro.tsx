"use client";

import { useState } from 'react';

export default function VacationRentalIntro() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: copy + video */}
          <div className="lg:col-span-8 lg:pr-20">
            <p className="mb-3 text-lg font-medium text-gray-600">
              Turn-Key VACATION RENTAL PACKAGES
            </p>

            <h2 className="mb-4 text-[clamp(2.25rem,6vw,5.5rem)] font-bold leading-[1.05] text-[#1B3764]">
              <span className="inline-block">Furnish&nbsp;</span>
              <span className="inline-block">and&nbsp;Stage&nbsp;</span>
              <span className="inline-block">Your&nbsp;Short-Term&nbsp;Rental</span>
            </h2>

            <div className="relative mb-8 aspect-video overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-[#1B3764] to-[#115B87]">
              <iframe
                className="absolute inset-0 h-full w-full z-10"
                src="https://www.youtube.com/embed/1_tueZ5zC3w?rel=0&modestbranding=1&showinfo=0"
                title="Outfitting Your Vacation Rental — Before/After"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => setVideoLoaded(true)}
              />
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div className="text-center text-white">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Video Loading</p>
                  </div>
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 prose-p:leading-relaxed">
              <p>
                We furnish and stage short-term rentals end-to-end—design, delivery, setup,
                and photo-ready styling—so you launch faster and earn sooner.
              </p>
              <p>
                Packages are tailored by property type, bedroom count, and guest profile to
                maximize ADR and reviews while keeping maintenance simple.
              </p>
            </div>

            <a
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#1B3764] px-8 py-4 font-semibold text-white transition-all hover:bg-[#1B3764]/90 group"
            >
              LEARN MORE ABOUT US
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right: sticky lead card */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl bg-[#fff7ef] p-8 shadow-lg">
              <p className="mb-2 text-lg font-medium text-[#F16022]">Have Questions? Get in Touch.</p>
              <h3 className="mb-6 text-3xl font-bold text-[#1B3764]">Request a Vacation Rental Quote</h3>

              <form className="space-y-5" action="/api/contact" method="post" noValidate>
                <p className="text-sm text-gray-600"><span className="text-red-500">*</span> indicates required fields</p>

                {/* honeypot */}
                <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div>
                  <label htmlFor="first_name" className="mb-2 block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input id="first_name" name="first_name" required autoComplete="given-name"
                    className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2" />
                </div>

                <div>
                  <label htmlFor="last_name" className="mb-2 block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input id="last_name" name="last_name" required autoComplete="family-name"
                    className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input id="email" name="email" type="email" inputMode="email" required autoComplete="email"
                    className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2" />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required
                    className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Property Type</label>
                    <select name="property_type" className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2">
                      <option>Condo</option><option>Single-Family</option><option>Townhome</option>
                      <option>Multi-Unit</option><option>Boutique Hotel</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Bedrooms</label>
                    <input name="bedrooms" type="number" min="0" className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Timeline</label>
                    <select name="timeline" className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2">
                      <option>ASAP</option><option>2–4 weeks</option><option>1–3 months</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Budget</label>
                    <select name="budget" className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2">
                      <option>$5k–$10k</option><option>$10k–$20k</option><option>$20k–$40k</option><option>$40k+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea id="message" name="message" required rows={5}
                    placeholder="Tell us the address, target guest profile, and go-live date…"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2" />
                </div>

                <button type="submit"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#1B3764] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1B3764]/90 focus:outline-none focus:ring-2 focus:ring-[#1B3764] focus:ring-offset-2">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

