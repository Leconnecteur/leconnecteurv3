'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion';
import ButtonGlow from '@/components/ui/ButtonGlow';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

interface ResponsiveCarouselProps {
  projects: Project[];
}

const ResponsiveCarousel: React.FC<ResponsiveCarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const glowControls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // Start glow animation when in view
      glowControls.start({
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.05, 1],
        transition: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    }
  }, [controls, glowControls, inView]);
  
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
  
  // Auto-play functionality for mobile
  useEffect(() => {
    if (!isMobile || !autoPlayEnabled) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isMobile, currentIndex, autoPlayEnabled]);
  
  // Pause auto-play when user interacts with carousel
  const pauseAutoPlay = () => {
    setAutoPlayEnabled(false);
    // Resume after 10 seconds of inactivity
    setTimeout(() => setAutoPlayEnabled(true), 10000);
  };
  
  const nextSlide = () => {
    setSwipeDirection(1);
    setCurrentIndex((prevIndex) => 
      isMobile 
        ? (prevIndex + 1) % projects.length
        : Math.min(prevIndex + 1, projects.length - 3)
    );
  };
  
  const prevSlide = () => {
    setSwipeDirection(-1);
    setCurrentIndex((prevIndex) => 
      isMobile 
        ? (prevIndex - 1 + projects.length) % projects.length
        : Math.max(0, prevIndex - 1)
    );
  };
  
  // Improved drag handling with Framer Motion
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    pauseAutoPlay();
    
    if (info.offset.x > 100) {
      prevSlide();
    } else if (info.offset.x < -100) {
      nextSlide();
    }
  };
  
  const visibleProjects = isMobile 
    ? [projects[currentIndex]]
    : projects.slice(currentIndex, currentIndex + 3);
  
  const canGoNext = isMobile 
    ? true 
    : currentIndex < projects.length - 3;
  
  const canGoPrev = isMobile 
    ? true 
    : currentIndex > 0;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  // Mobile card animation variants
  const mobileCardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    })
  };
  
  // Glow effect variants
  const glowVariants = {
    initial: { 
      opacity: 0.3,
      scale: 1,
    },
    animate: { 
      opacity: [0.3, 0.6, 0.3],
      scale: 1.05,
      transition: {
        opacity: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        },
        scale: {
          duration: 0.4,
          ease: "easeOut"
        }
      }
    }
  };
  
  // Track swipe direction
  const [[page, direction], setPage] = useState([0, 0]);
  
  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    setPage([page + newDirection, newDirection]);
  };
  
  return (
    <div className="relative w-full overflow-hidden py-8" ref={ref}>
      <motion.div 
        ref={carouselRef}
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Mobile carousel with improved animations */}
        {isMobile ? (
          <div className="overflow-hidden relative">
            <AnimatePresence initial={false} custom={swipeDirection}>
              <motion.div 
                key={currentIndex}
                custom={swipeDirection}
                variants={mobileCardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="w-full px-4 mb-8 cursor-grab active:cursor-grabbing"
                onTap={pauseAutoPlay}
              >
                <motion.div 
                  className="group h-full"
                  whileTap={{ 
                    scale: 0.98,
                    rotateY: 5,
                    rotateX: -5,
                    z: 20
                  }}
                >
                  <div className={`relative overflow-hidden rounded-2xl shadow-lg h-full bg-gray-900/80 backdrop-blur-lg border border-gray-800 transition-all duration-500 
                    ${projects[currentIndex].category === 'Site Web' 
                      ? 'group-hover:border-sky-500/50 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                      : projects[currentIndex].category === 'Social Ads'
                        ? 'group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'group-hover:border-green-500/50 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    }`}>
                    {/* Glow effect for mobile */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl"
                      animate={glowControls}
                    />
                    
                    <div className="relative h-64 overflow-hidden rounded-t-xl">
                      <Image 
                        src={projects[currentIndex].image} 
                        alt={projects[currentIndex].title} 
                        width={600} 
                        height={400}
                        priority={true}
                        unoptimized={true}
                        className="w-full h-full object-cover transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-6 w-full">
                          <h3 className="text-xl font-bold text-white mb-2">{projects[currentIndex].title}</h3>
                          <p className="text-gray-200 mb-4">{projects[currentIndex].description}</p>
                          <div className="mt-4">
                            <ButtonGlow 
                              href={projects[currentIndex].link}
                              size="sm"
                              variant="outline"
                              icon={
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visiter le site
                            </ButtonGlow>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile navigation buttons with glow effect */}
            <div className="flex justify-between absolute top-1/2 left-0 right-0 -mt-6 px-2 z-10">
              <motion.button
                onClick={() => {
                  pauseAutoPlay();
                  prevSlide();
                }}
                className="w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-lg flex items-center justify-center text-white border border-gray-700 relative overflow-hidden"
                whileTap={{ scale: 0.9 }}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                
                {/* Button glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sky-500/30 to-purple-500/30 rounded-full z-[-1]"
                  variants={glowVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.button>
              
              <motion.button
                onClick={() => {
                  pauseAutoPlay();
                  nextSlide();
                }}
                className="w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-lg flex items-center justify-center text-white border border-gray-700 relative overflow-hidden"
                whileTap={{ scale: 0.9 }}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
                
                {/* Button glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full z-[-1]"
                  variants={glowVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.button>
            </div>
            
            {/* Mobile indicators with glow effect */}
            <div className="flex justify-center mt-6">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    pauseAutoPlay();
                    setSwipeDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 relative overflow-hidden ${
                    index === currentIndex 
                      ? 'bg-gradient-to-r from-sky-500 to-purple-500 scale-125' 
                      : 'bg-gray-600'
                  }`}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === currentIndex && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full z-[-1]"
                      variants={glowVariants}
                      initial="initial"
                      animate="animate"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          // Desktop carousel 
          <div className="overflow-hidden">
            <motion.div 
              className="flex transition-all duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * 33.33}%)`,
                width: `${Math.ceil(projects.length / 3) * 100}%`
              }}
            >
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="w-1/3 px-4 mb-8"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="group h-full"
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: -5,
                      z: 20
                    }}
                  >
                    <div className={`relative overflow-hidden rounded-2xl shadow-lg h-full bg-gray-900/80 backdrop-blur-lg border border-gray-800 transition-all duration-500 
                      ${project.category === 'Site Web' 
                        ? 'group-hover:border-sky-500/50 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                        : project.category === 'Social Ads'
                          ? 'group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'group-hover:border-green-500/50 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      }`}>
                      <div className="relative h-64 overflow-hidden rounded-t-xl">
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          width={600} 
                          height={400}
                          priority={true}
                          unoptimized={true}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-gray-200 mb-4">{project.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 bg-gray-900/80 backdrop-blur-sm rounded-b-xl">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            project.category === 'Site Web' 
                              ? 'bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-sky-300 border-sky-500/30' 
                              : project.category === 'Social Ads'
                                ? 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/30'
                                : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30'
                          }`}>
                            {project.category}
                          </span>
                          
                          <ButtonGlow 
                            href={project.link}
                            size="sm"
                            variant="outline"
                            icon={
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visiter
                          </ButtonGlow>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Desktop navigation buttons */}
            <div className="flex justify-center mt-8 space-x-4">
              <motion.button
                onClick={prevSlide}
                disabled={!canGoPrev}
                className={`px-4 py-2 rounded-full flex items-center justify-center space-x-2 ${
                  canGoPrev 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={canGoPrev ? { scale: 1.05 } : {}}
                whileTap={canGoPrev ? { scale: 0.95 } : {}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                <span>Précédent</span>
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                disabled={!canGoNext}
                className={`px-4 py-2 rounded-full flex items-center justify-center space-x-2 ${
                  canGoNext 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={canGoNext ? { scale: 1.05 } : {}}
                whileTap={canGoNext ? { scale: 0.95 } : {}}
              >
                <span>Suivant</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ResponsiveCarousel;
