"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface QuoteEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoomCounts {
  living: number;
  primary: number;
  kids: number;
  dining: number;
}

const ROOM_PRICES = {
  living: [4000, 7500],
  primary: [3500, 6500],
  kids: [4500, 8500],
  dining: [2500, 5000],
  theme: [6000, 18000]
} as const;

export default function QuoteEstimator({ isOpen, onClose }: QuoteEstimatorProps) {
  const [rooms, setRooms] = useState<RoomCounts>({
    living: 1,
    primary: 1,
    kids: 0,
    dining: 0
  });
  const [hasTheme, setHasTheme] = useState(false);
  const [estimate, setEstimate] = useState({ low: 0, high: 0 });

  useEffect(() => {
    calculateEstimate();
  }, [rooms, hasTheme]);

  const calculateEstimate = () => {
    let low = 0;
    let high = 0;

    (Object.keys(rooms) as Array<keyof RoomCounts>).forEach(room => {
      const count = rooms[room];
      low += ROOM_PRICES[room][0] * count;
      high += ROOM_PRICES[room][1] * count;
    });

    if (hasTheme) {
      low += ROOM_PRICES.theme[0];
      high += ROOM_PRICES.theme[1];
    }

    setEstimate({ low, high });
  };

  const handleRoomChange = (room: keyof RoomCounts, value: number) => {
    setRooms(prev => ({ ...prev, [room]: Math.max(0, value) }));
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#1B3764]">Fast Quote (Range)</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Room Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-1">Living Room</span>
            <input
              type="number"
              min="0"
              value={rooms.living}
              onChange={(e) => handleRoomChange('living', parseInt(e.target.value) || 0)}
              className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
            />
            <span className="text-xs text-gray-500 mt-1">Range: $4k–$7.5k</span>
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-1">Primary Bedroom</span>
            <input
              type="number"
              min="0"
              value={rooms.primary}
              onChange={(e) => handleRoomChange('primary', parseInt(e.target.value) || 0)}
              className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
            />
            <span className="text-xs text-gray-500 mt-1">Range: $3.5k–$6.5k</span>
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-1">Kids / Bunk Room</span>
            <input
              type="number"
              min="0"
              value={rooms.kids}
              onChange={(e) => handleRoomChange('kids', parseInt(e.target.value) || 0)}
              className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
            />
            <span className="text-xs text-gray-500 mt-1">Range: $4.5k–$8.5k</span>
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-1">Dining / Kitchen Nook</span>
            <input
              type="number"
              min="0"
              value={rooms.dining}
              onChange={(e) => handleRoomChange('dining', parseInt(e.target.value) || 0)}
              className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
            />
            <span className="text-xs text-gray-500 mt-1">Range: $2.5k–$5k</span>
          </label>

          <label className="col-span-2 flex items-center gap-3 mt-2 p-3 rounded-lg border border-gray-200 hover:border-[#F16022] transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={hasTheme}
              onChange={(e) => setHasTheme(e.target.checked)}
              className="rounded text-[#F16022] focus:ring-[#F16022]"
            />
            <span className="flex-1 text-sm font-medium text-gray-700">
              Theme Add-On (Princess / Galaxy / Ocean / Arcade)
            </span>
            <span className="text-xs text-gray-500">+$6k–$18k</span>
          </label>
        </div>

        {/* Estimate Display */}
        <div className="p-4 rounded-xl bg-[#F16022]/5 border border-[#F16022]/20 mb-6">
          <p className="text-sm text-gray-600 mb-1">Estimated Range</p>
          <p className="text-3xl font-extrabold text-[#F16022] mb-2">
            {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
          </p>
          <p className="text-xs text-gray-500">
            Final proposal depends on finish level, lead times, and current vendor pricing.
          </p>
        </div>

        {/* Contact Form */}
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" action="/api/quote" method="post">
          <input
            type="hidden"
            name="estimate"
            value={`${formatCurrency(estimate.low)} – ${formatCurrency(estimate.high)}`}
          />
          <input
            name="name"
            placeholder="Full Name"
            className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022]"
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022] sm:col-span-2"
          />
          <textarea
            name="notes"
            placeholder="Tell us about bed/bath count and goals…"
            rows={3}
            className="rounded-lg border-gray-300 focus:border-[#F16022] focus:ring-[#F16022] sm:col-span-2"
          />
          <button
            type="submit"
            className="sm:col-span-2 bg-[#F16022] hover:bg-[#E55A1A] text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Send My Quote Request
          </button>
        </form>
      </div>
    </div>
  );
}


