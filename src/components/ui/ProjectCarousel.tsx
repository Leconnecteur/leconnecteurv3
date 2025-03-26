'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      isMobile 
        ? (prevIndex + 1) % projects.length
        : Math.min(prevIndex + 3, Math.max(0, projects.length - 3))
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      isMobile 
        ? (prevIndex - 1 + projects.length) % projects.length
        : Math.max(0, prevIndex - 3)
    );
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsDragging(false);
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  const visibleProjects = isMobile 
    ? [projects[currentIndex]]
    : projects.slice(currentIndex, currentIndex + 3);
  
  const canGoNext = isMobile 
    ? true 
    : currentIndex < projects.length - 3;
  
  const canGoPrev = currentIndex > 0;
  
  return (
    <div className="relative w-full overflow-hidden py-8">
      <div 
        ref={carouselRef}
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {visibleProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="group h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                  z: 20
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg h-full bg-gray-900/80 backdrop-blur-lg border border-gray-800 transition-all duration-500 group-hover:border-pink-500/30">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      width={600} 
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-200 mb-4">{project.description}</p>
                        <motion.div
                          className="relative inline-block group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link 
                            href={project.link}
                            className="px-4 py-2 bg-transparent text-white font-bold rounded-full text-sm relative z-10 overflow-hidden border-2 border-white/30 backdrop-blur-sm inline-flex items-center gap-2 group-hover:border-white/50 transition-all duration-300"
                          >
                            <span className="relative z-10">Voir le projet</span>
                            <motion.svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="14" 
                              height="14" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              initial={{ x: 0 }}
                              animate={{ x: [0, 5, 0] }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                repeatType: "reverse",
                                ease: "easeInOut"
                              }}
                            >
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </motion.svg>
                            <motion.span 
                              className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                              initial={{ opacity: 0 }}
                              whileHover={{ 
                                opacity: [0.3, 0.5, 0.3],
                                transition: {
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }
                              }}
                            ></motion.span>
                          </Link>
                          <motion.div 
                            className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"
                            initial={{ opacity: 0.3 }}
                            whileHover={{ 
                              opacity: [0.5, 0.8, 0.5],
                              scale: 1.05,
                              transition: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }
                            }}
                          ></motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">{project.title}</h3>
                    <p className="text-gray-400">{project.category}</p>
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: [0.1, 0.2, 0.1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation Arrows */}
      <div className="flex justify-center mt-8 gap-4">
        <motion.button
          onClick={prevSlide}
          disabled={!canGoPrev}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${canGoPrev ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-800/50 cursor-not-allowed'} transition-colors relative overflow-hidden`}
          whileHover={canGoPrev ? { scale: 1.1 } : {}}
          whileTap={canGoPrev ? { scale: 0.9 } : {}}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="relative z-10"
          >
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          {canGoPrev && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ 
                opacity: [0.3, 0.5, 0.3],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          )}
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          disabled={!canGoNext}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${canGoNext ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-800/50 cursor-not-allowed'} transition-colors relative overflow-hidden`}
          whileHover={canGoNext ? { scale: 1.1 } : {}}
          whileTap={canGoNext ? { scale: 0.9 } : {}}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="relative z-10"
          >
            <path d="M9 18l6-6-6-6"/>
          </svg>
          {canGoNext && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ 
                opacity: [0.3, 0.5, 0.3],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
