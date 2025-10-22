"use client";

import React, { useState } from 'react';
import BlurText from './ui/blur-text';
import ProjectGalleryModal from './ProjectGalleryModal';
import { Project } from '@/data/flickr-projects-full';

interface ProjectTickerProps {
  projects: Project[];
}

const ProjectTicker: React.FC<ProjectTickerProps> = ({ projects }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Triple the projects for truly seamless infinite loop
  const infiniteProjects = [...projects, ...projects, ...projects];
  
  // Calculate dimensions (keeping exact same dimensions as VideoTicker)
  const projectWidth = 1024; // width of each project card
  const gap = 64; // gap-16 = 64px
  const totalWidth = (projectWidth + gap) * projects.length;

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="relative overflow-hidden py-32 w-screen -mx-4" style={{ backgroundColor: '#334155' }}>
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[18rem] mb-16">
        <div className="text-right">
          <BlurText
            text="Project Videos"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-6xl md:text-8xl font-bold text-white mb-4 justify-end"
          />
          <p className="text-gray-200 text-2xl">Click any project to view gallery - hover to pause</p>
        </div>
      </div>

      <div className="relative">
        <div 
          className="flex gap-16"
          style={{ 
            animation: `scroll-left ${projects.length * 8}s linear infinite`,
            animationPlayState: isHovered ? 'paused' : 'running',
            willChange: 'transform'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {infiniteProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="flex-shrink-0 w-[1024px] cursor-pointer group"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gray-200">
                {/* Project Cover Photo */}
                <img
                  src={project.coverPhoto}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Hover Overlay with Gallery Icon */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-24 h-24 bg-[#1B3764]/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-16 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-4xl font-medium line-clamp-2 mb-2">{project.title}</p>
                  <p className="text-gray-300 text-2xl">{project.location} • {project.photos.length} photos</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Gallery Modal */}
      <ProjectGalleryModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeModal}
      />
      
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${totalWidth}px);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectTicker;


