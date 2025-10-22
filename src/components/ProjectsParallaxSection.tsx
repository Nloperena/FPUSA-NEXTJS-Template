"use client";

import React, { useState } from 'react';
import { HeroParallax } from '@/components/ui/hero-parallax';
import ProjectGalleryModal from '@/components/ProjectGalleryModal';
import { Project } from '@/data/flickr-projects-full';
import BlurText from '@/components/ui/blur-text';
import Link from 'next/link';

interface ProjectsParallaxSectionProps {
  projects: Project[];
}

export default function ProjectsParallaxSection({ projects }: ProjectsParallaxSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  // Convert projects to HeroParallax format
  const parallaxProducts = projects.map((project) => ({
    title: project.title,
    link: '#',
    thumbnail: project.coverPhoto,
    id: project.id
  }));

  return (
    <>
      <section className="py-12 bg-white">
        <div className="w-full px-4">
          {/* Content without header - header moved to main page */}
          
          {/* 3D Parallax Effect with Project Photos */}
          <div className="relative w-full">
            <HeroParallax 
              products={parallaxProducts}
              onProductClick={handleProjectClick}
            />
          </div>
        </div>
      </section>

      {/* Project Gallery Modal */}
      <ProjectGalleryModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

