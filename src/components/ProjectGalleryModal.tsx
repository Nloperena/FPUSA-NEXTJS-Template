"use client";

import React, { useState, useEffect } from 'react';
import { Project } from '@/data/flickr-projects-full';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectGalleryModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectGalleryModal({ project, isOpen, onClose }: ProjectGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') previousPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, currentIndex, project]);

  if (!isOpen || !project) return null;

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % project.photos.length);
  };

  const previousPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + project.photos.length) % project.photos.length);
  };

  const currentPhoto = project.photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm animate-modalFadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-0 flex flex-col animate-modalScaleIn">
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {project.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              {project.location} • {currentIndex + 1} of {project.photos.length}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-4 p-3 md:p-4 text-white hover:text-gray-200 transition-all duration-200 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-110 active:scale-95 shadow-xl"
            aria-label="Close gallery"
            title="Close (Esc)"
          >
            <X className="w-6 h-6 md:w-8 md:h-8 stroke-[3]" />
          </button>
        </div>

        {/* Main Image */}
        <div
          className="flex-1 flex items-center justify-center p-4 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        {project.photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                previousPhoto();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </>
        )}

        {/* Thumbnail Strip */}
        <div
          className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2">
            {project.photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-4 ring-[#F16022] scale-110'
                    : 'ring-2 ring-white/20 hover:ring-white/40 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Photo Title */}
        <div
          className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/60 backdrop-blur-md rounded-full"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-white text-sm md:text-base font-medium">
            {currentPhoto.title}
          </p>
        </div>
      </div>
    </div>
  );
}

