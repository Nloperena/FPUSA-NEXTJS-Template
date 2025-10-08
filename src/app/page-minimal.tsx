import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';

// Simple dynamic import for testing
const InteractiveSections = dynamic(() => import('@/components/InteractiveSections-minimal'), { 
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-br from-[#1B3764] to-[#115B87] flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div className="h-screen bg-gradient-to-br from-[#1B3764] to-[#115B87] flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-lg font-medium">Loading...</p>
          </div>
        </div>
      }>
        <InteractiveSections />
      </Suspense>
    </div>
  );
}
