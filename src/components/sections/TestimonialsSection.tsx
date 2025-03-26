'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

// Type pour les témoignages
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Fabien Segas',
    role: 'Client',
    company: 'QMI',
    content: "Je suis très satisfait du travail de Geremy en tant que concepteur de site web. Il a rapidement cerné mes besoins et a su y répondre de manière efficace. Le résultat est à la hauteur de mes attentes, et le projet a été réalisé dans des délais très courts. Je le recommande sans hésitation !",
    rating: 5
  },
  {
    id: 2,
    name: 'Hugo Fabre',
    role: 'Client',
    company: '',
    content: "Je recommande Le connecteur Digital. Très professionnel, résultats correspondants à mes attentes et très bon relationnel. N&apos;hésitez pas !",
    rating: 5
  },
  {
    id: 3,
    name: 'Clement Petrau',
    role: 'Client',
    company: '',
    content: "J&apos;ai beaucoup aimé.",
    rating: 5
  },
  {
    id: 4,
    name: 'Mathieu Vasset',
    role: 'Client',
    company: '',
    content: "Très bon contact, à l&apos;écoute des besoins et avec de bonnes idées pour améliorer ma visibilité. Je recommande",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`inline-block ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  useEffect(() => {
    if (!autoPlayEnabled) return;
    
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlayEnabled]);

  const pauseAutoPlay = () => {
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 10000);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    pauseAutoPlay();
    
    if (info.offset.x > 100) {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    } else if (info.offset.x < -100) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
  };

  const goToSlide = (index: number) => {
    pauseAutoPlay();
    setActiveIndex(index);
  };

  const testimonialVariants = {
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

  return (
    <section id="temoignages" className="py-8 pt-4 pb-0 md:py-12 md:pb-0 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ce que nos clients disent</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez les retours d'expérience de ceux qui nous ont fait confiance pour leur présence digitale.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div 
              key={activeIndex}
              custom={activeIndex}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              className={`w-full px-4 ${isMobile ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl relative overflow-hidden"
                whileTap={isMobile ? { scale: 0.98 } : undefined}
              >
                {isMobile && (
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-r from-indigo-600/10 to-pink-600/10 rounded-2xl z-0"
                    variants={{
                      initial: { opacity: 0.1 },
                      animate: { 
                        opacity: [0.1, 0.2, 0.1],
                        transition: {
                          duration: 2,
                          repeat: Infinity
                        }
                      }
                    }}
                    animate="animate"
                  />
                )}

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${testimonials[activeIndex].name}&size=128&background=ffffff&color=000000`} 
                          alt={testimonials[activeIndex].name} 
                          className="w-12 h-12"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{testimonials[activeIndex].name}</h3>
                        <p className="text-gray-400">{testimonials[activeIndex].role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {renderStars(testimonials[activeIndex].rating)}
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {testimonials[activeIndex].content}
                  </p>
                  {testimonials[activeIndex].company && (
                    <p className="mt-4 text-sm text-gray-400">{testimonials[activeIndex].company}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>

            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-gradient-to-r from-blue-400 to-blue-600 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
