'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// Chargement dynamique des composants pour éviter les erreurs d'hydratation
const TypewriterText = dynamic(() => import('@/components/ui/TypewriterText'), { 
  ssr: false,
  loading: () => <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Créez une <span className="text-blue-400">présence digitale</span> qui vous démarque.</div>
});

const AnimatedCounter = dynamic(() => import('@/components/ui/AnimatedCounter').then(mod => mod.AnimatedCounter), { 
  ssr: false,
  loading: () => <div className="text-3xl md:text-4xl font-bold text-blue-600">0</div>
});

// Remplaçons le Computer3D par une animation plus moderne
const WebsiteCreation = dynamic(() => import('@/components/ui/WebsiteCreation'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-blue-900/20 rounded-lg animate-pulse"></div>
});

// Import des composants d'animation
const ScrollAnimation = dynamic(() => import('@/components/ui/ScrollAnimation'), { 
  ssr: false 
});

// Import des nouvelles sections
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-900 animate-pulse"></div>
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-black animate-pulse"></div>
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // GSAP animations on page load
  useEffect(() => {
    setIsLoaded(true);
    
    const tl = gsap.timeline();
    
    tl.from('.hero-gradient', {
      opacity: 0,
      scale: 0.8,
      duration: 1.5,
      ease: 'power3.out'
    });
    
    tl.from('.hero-content', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=1');
    
    // Animate the light effect
    gsap.to('.light-effect', {
      x: '100%',
      repeat: -1,
      duration: 5,
      ease: 'power1.inOut',
      yoyo: true
    });
    
    // Intersection Observer pour détecter les sections visibles
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animation spécifique pour la section visible
          gsap.to(entry.target, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    }, { threshold: 0.3 });
    
    // Observer toutes les sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
      
      // État initial des sections (sauf hero)
      if (section.id !== 'hero') {
        gsap.set(section, {
          y: 30,
          opacity: 0.8
        });
      }
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="overflow-hidden">
      {/* Hero Section with WOW effect - Design plus audacieux */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pb-16 md:pb-0">
        {/* Animated gradient background - Plus vibrant et moderne */}
        <div className="hero-gradient absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.3),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.4),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.3),transparent_60%)]"></div>
        </div>
        
        {/* Grille futuriste */}
        <div className="absolute inset-0 bg-[url('/public/images/grid.svg')] opacity-10"></div>
        
        {/* Light beam effect - Plus prononcé */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="light-effect absolute -inset-[100%] skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
        </div>
        
        {/* Floating particles - Plus nombreuses et variées */}
        <div className="absolute inset-0">
          {isLoaded && [...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                backgroundColor: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#818cf8' : '#ec4899',
                opacity: Math.random() * 0.7,
                filter: 'blur(1px)',
                animation: `float ${Math.random() * 10 + 10}s linear infinite, pulse ${Math.random() * 2 + 2}s ease-in-out infinite`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 z-10 hero-content">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
              {isLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <TypewriterText 
                    text="Créez une présence digitale qui vous démarque." 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                    highlightWords={["présence digitale"]}
                    highlightColor="rgb(56, 189, 248)"
                    speed={50}
                    delay={500}
                  />
                  
                  <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                    Nous concevons des expériences web immersives qui captent l&#39;attention et transforment vos visiteurs en clients fidèles.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block relative group mb-8 md:mb-0"
                  >
                    <Link 
                      href="/contact"
                      className="px-8 py-4 bg-transparent text-white font-bold rounded-full text-lg relative z-10 overflow-hidden border-2 border-white/30 backdrop-blur-sm inline-flex items-center gap-2 group-hover:border-white/50 transition-all duration-300"
                    >
                      <span className="relative z-10">Créer mon site</span>
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
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
                      <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                    </Link>
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
                  </motion.div>
                </motion.div>
              )}
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
              {isLoaded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative"
                >
                  <WebsiteCreation />
                </motion.div>
              )}
            </div>
          </div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: [0, 8, 0] 
            }}
            transition={{ 
              delay: 2, 
              duration: 0.5,
              y: {
                repeat: Infinity,
                duration: 2
              }
            }}
            whileHover={{ y: 5 }}
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
              className="text-white"
            >
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Design plus moderne */}
      <section id="why-choose-us" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          {isLoaded && (
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
                Pourquoi choisir <span className="text-sky-400">Le Connecteur Digital</span> ?
              </h2>
            </ScrollAnimation>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {isLoaded && (
              <ScrollAnimation direction="up" delay={0.1}>
                <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 border border-gray-800 h-full group">
                  <div className="w-16 h-16 bg-sky-900/50 text-sky-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="M2 2l7.586 7.586"></path>
                      <circle cx="11" cy="11" r="2"></circle>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">Design sur mesure</h3>
                  <p className="text-gray-400">
                    Nous créons des designs uniques qui reflètent votre identité et répondent parfaitement à vos besoins spécifiques.
                  </p>
                </div>
              </ScrollAnimation>
            )}
            
            {isLoaded && (
              <ScrollAnimation direction="up" delay={0.2}>
                <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-[0_0_15px_rgba(79,70,229,0.15)] hover:shadow-[0_0_25px_rgba(79,70,229,0.25)] transition-all duration-300 border border-gray-800 h-full group">
                  <div className="w-16 h-16 bg-indigo-900/50 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">Expérience utilisateur</h3>
                  <p className="text-gray-400">
                    Nous optimisons chaque aspect de votre site pour offrir une expérience fluide et intuitive qui convertit les visiteurs en clients.
                  </p>
                </div>
              </ScrollAnimation>
            )}
            
            {isLoaded && (
              <ScrollAnimation direction="up" delay={0.3}>
                <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:shadow-[0_0_25px_rgba(236,72,153,0.25)] transition-all duration-300 border border-gray-800 h-full group">
                  <div className="w-16 h-16 bg-pink-900/50 text-pink-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">Performance optimale</h3>
                  <p className="text-gray-400">
                    Des sites rapides, optimisés pour tous les appareils et qui respectent les meilleures pratiques techniques.
                  </p>
                </div>
              </ScrollAnimation>
            )}
          </div>
          
          {/* Bouton "Pourquoi un site web" */}
          {isLoaded && (
            <ScrollAnimation delay={0.7}>
              <div className="mt-16 mb-24 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block relative group"
                >
                  <Link 
                    href="/contact"
                    className="px-8 py-4 bg-transparent text-white font-bold rounded-full text-lg relative z-10 overflow-hidden border-2 border-white/30 backdrop-blur-sm inline-flex items-center gap-2 group-hover:border-white/50 transition-all duration-300"
                  >
                    <span className="relative z-10">Pourquoi un site web ?</span>
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
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
                    <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  </Link>
                  <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
                </motion.div>
              </div>
            </ScrollAnimation>
          )}
        </div>
        
        {/* Key Metrics - Design plus futuriste */}
        <div className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/50 via-indigo-900/50 to-pink-900/50"></div>
          <div className="absolute inset-0 bg-[url('/public/images/circuit-pattern.svg')] opacity-10"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              {isLoaded && (
                <>
                  <motion.div
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 0 20px rgba(56,189,248,0.3)",
                      scale: 1.03
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <AnimatedCounter 
                      end={150} 
                      suffix="+" 
                      title="Sites créés" 
                      delay={0.1}
                      className="backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                      scale: 1.03
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <AnimatedCounter 
                      end={98} 
                      suffix="%" 
                      title="Clients satisfaits" 
                      delay={0.3}
                      className="backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 0 20px rgba(236,72,153,0.3)",
                      scale: 1.03
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <AnimatedCounter 
                      end={1.2} 
                      suffix="s" 
                      title="Temps de chargement moyen" 
                      delay={0.5}
                      className="backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 0 20px rgba(34,211,238,0.3)",
                      scale: 1.03
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <AnimatedCounter 
                      end={24} 
                      suffix="/7" 
                      title="Support client" 
                      delay={0.7}
                      className="backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full"
                    />
                  </motion.div>
                </>
              )}
            </div>
            
            {/* Bouton "Découvrir nos réalisations" */}
            
          </div>
        </div>
      </section>
      
      {/* Services Preview - Design plus immersif */}
      <section id="services" className="py-8 pt-4 md:py-12 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-[url('/public/images/noise.png')] opacity-5 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          {isLoaded && (
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                Nos Services
              </h2>
              <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
                Des solutions digitales complètes pour développer votre présence en ligne
              </p>
            </ScrollAnimation>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoaded && (
              <ScrollAnimation direction="left" delay={0.1}>
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-800 h-full"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 0 30px rgba(56,189,248,0.3)",
                    borderColor: "rgba(56,189,248,0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src="/professional-website.jpg" 
                      alt="Création de Sites Web" 
                      width={600} 
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                    <motion.h3 
                      className="absolute bottom-4 left-4 text-2xl font-bold text-white"
                      whileHover={{ x: 5, textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                    >
                      Création de Sites Web
                    </motion.h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">
                      Des sites sur mesure, responsive et optimisés pour convertir vos visiteurs en clients.
                    </p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Link 
                        href="/nos-services#sites-web"
                        className="text-sky-400 font-medium flex items-center hover:text-sky-300 transition-colors"
                      >
                        En savoir plus
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            )}
            
            {isLoaded && (
              <ScrollAnimation delay={0.3}>
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-800 h-full"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 0 30px rgba(139,92,246,0.3)",
                    borderColor: "rgba(139,92,246,0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src="/service-ecommerce.jpg" 
                      alt="E-commerce" 
                      width={600} 
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                    <motion.h3 
                      className="absolute bottom-4 left-4 text-2xl font-bold text-white"
                      whileHover={{ x: 5, textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                    >
                      E-commerce
                    </motion.h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">
                      Boutiques en ligne performantes avec gestion des stocks, paiements sécurisés et expérience d&#39;achat optimisée.
                    </p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Link 
                        href="/nos-services#ecommerce"
                        className="text-purple-400 font-medium flex items-center hover:text-purple-300 transition-colors"
                      >
                        En savoir plus
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            )}
            
            {isLoaded && (
              <ScrollAnimation direction="right" delay={0.5}>
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-800 h-full"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 0 30px rgba(236,72,153,0.3)",
                    borderColor: "rgba(236,72,153,0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src="/service-marketing.jpg" 
                      alt="Marketing Digital" 
                      width={600} 
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                    <motion.h3 
                      className="absolute bottom-4 left-4 text-2xl font-bold text-white"
                      whileHover={{ x: 5, textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                    >
                      Marketing Digital
                    </motion.h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">
                      Stratégies de marketing digital pour augmenter votre visibilité en ligne et attirer plus de clients.
                    </p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Link 
                        href="/nos-services#marketing"
                        className="text-pink-400 font-medium flex items-center hover:text-pink-300 transition-colors"
                      >
                        En savoir plus
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            )}
          </div>
          
          {/* Bouton "Voir tous nos services" */}
          {isLoaded && (
            <ScrollAnimation delay={0.7}>
              <div className="mt-16 text-center">
                <motion.div
                  className="relative inline-block group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/nos-services"
                    className="px-8 py-4 bg-transparent text-white font-bold rounded-full text-lg relative z-10 overflow-hidden border-2 border-white/30 backdrop-blur-sm inline-flex items-center gap-2 group-hover:border-white/50 transition-all duration-300"
                  >
                    <span className="relative z-10">Voir tous nos services</span>
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
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
                    <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  </Link>
                  <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
                </motion.div>
              </div>
            </ScrollAnimation>
          )}
        </div>
      </section>
      
      {/* Témoignages */}
      <section id="testimonials" className="py-8 pt-4 pb-0 md:py-12 md:pb-0 bg-gray-900 relative">
        {isLoaded && (
          <TestimonialsSection />
        )}
      </section>
      
      {/* Contact */}
      <section id="contact" className="py-8 pt-0 md:py-12 md:pt-0 bg-black relative">
        {isLoaded && (
          <ContactSection />
        )}
      </section>
      
      {/* CTA Section - Design plus futuriste */}
      <section id="cta" className="py-8 pt-4 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-indigo-900 to-pink-900"></div>
        
        {isLoaded && (
          <>
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute rounded-full bg-white/10 backdrop-blur-sm"
                  initial={{ 
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 100 + 50}px`,
                    height: `${Math.random() * 100 + 50}px`,
                    opacity: 0.1 + Math.random() * 0.2
                  }}
                  animate={{ 
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0]
                  }}
                  transition={{ 
                    duration: 10 + Math.random() * 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <div className="absolute inset-0 bg-[url('/public/images/circuit-pattern.svg')] opacity-10 mix-blend-overlay"></div>
          </>
        )}
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {isLoaded && (
              <ScrollAnimation>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Prêt à transformer votre présence en ligne ?
                </h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  Discutons de votre projet et créons ensemble une expérience digitale qui vous démarque.
                </p>
                
                <motion.div
                  className="relative inline-block group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/contact"
                    className="px-10 py-5 bg-transparent text-white font-bold rounded-full text-xl relative z-10 overflow-hidden border-2 border-white/30 backdrop-blur-sm inline-flex items-center gap-3 group-hover:border-white/50 transition-all duration-300"
                  >
                    <span className="relative z-10">Démarrer mon projet</span>
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
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
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                    <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  </Link>
                  <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
                </motion.div>
              </ScrollAnimation>
            )}
          </div>
        </div>
      </section>
      
      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </main>
  );
}
