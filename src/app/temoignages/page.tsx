'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    content: `Je suis très satisfait du travail de Geremy en tant que concepteur de site web. Il a rapidement cerné mes besoins et a su y répondre de manière efficace. Le résultat est à la hauteur de mes attentes, et le projet a été réalisé dans des délais très courts. Je le recommande sans hésitation !`,
    rating: 5
  },
  {
    id: 2,
    name: 'Hugo Fabre',
    role: 'Client',
    company: '',
    content: `Je recommande Le connecteur Digital. Très professionnel, résultats correspondants à mes attentes et très bon relationnel. N&apos;hésitez pas !`,
    rating: 5
  },
  {
    id: 3,
    name: 'Clement Petrau',
    role: 'Client',
    company: '',
    content: `J&apos;ai beaucoup aimé.`,
    rating: 5
  },
  {
    id: 4,
    name: 'Mathieu Vasset',
    role: 'Client',
    company: '',
    content: `Très bon contact, à l&apos;écoute des besoins et avec de bonnes idées pour améliorer ma visibilité. Je recommande`,
    rating: 5
  }
];

// Fonction pour générer les étoiles de notation
const renderStars = (rating: number) => {
  return Array(5).fill(0).map((_, i) => (
    <FaStar 
      key={i} 
      className={`inline-block ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
    />
  ));
};

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-slider
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section avec style amélioré */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        {/* Grille futuriste */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ils nous font <span className="text-blue-400">confiance</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez ce que nos clients disent de notre travail et pourquoi ils nous recommandent pour leurs projets digitaux.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section avec style amélioré */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-indigo-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {isLoaded && [...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 80 + 30}px`,
                height: `${Math.random() * 80 + 30}px`,
                opacity: 0.1 + Math.random() * 0.15,
                animation: `float ${Math.random() * 10 + 10}s linear infinite, pulse ${Math.random() * 2 + 2}s ease-in-out infinite`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {isLoaded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Slider Controls avec style amélioré */}
                <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 z-20 hidden md:block">
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button 
                      onClick={prevSlide}
                      className="w-12 h-12 rounded-full bg-transparent text-white flex items-center justify-center transition-all duration-300 border-2 border-white/30 backdrop-blur-sm group-hover:border-white/50 relative z-10 overflow-hidden"
                      aria-label="Previous testimonial"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                    </button>
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
                  </motion.div>
                </div>
                <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 z-20 hidden md:block">
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button 
                      onClick={nextSlide}
                      className="w-12 h-12 rounded-full bg-transparent text-white flex items-center justify-center transition-all duration-300 border-2 border-white/30 backdrop-blur-sm group-hover:border-white/50 relative z-10 overflow-hidden"
                      aria-label="Next testimonial"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                    </button>
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
                  </motion.div>
                </div>

                {/* Testimonials Slider avec style amélioré */}
                <div className="overflow-hidden rounded-xl">
                  <div 
                    className="flex transition-transform duration-700 ease-in-out" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {testimonials.map((testimonial) => (
                      <div 
                        key={testimonial.id} 
                        className="min-w-full p-4"
                      >
                        <div className="relative">
                          <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                  <img 
                                    src={`https://ui-avatars.com/api/?name=${testimonial.name}&size=128&background=ffffff&color=000000`} 
                                    alt={testimonial.name} 
                                    className="w-12 h-12"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                                  <p className="text-gray-400">{testimonial.role}</p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {renderStars(testimonial.rating)}
                              </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                              {testimonial.content}
                            </p>
                            {testimonial.company && (
                              <p className="mt-4 text-sm text-gray-400">{testimonial.company}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
