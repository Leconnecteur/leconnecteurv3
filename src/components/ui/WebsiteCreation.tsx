'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const WebsiteCreation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Timeline pour séquencer les animations
    const tl = gsap.timeline();
    
    // Animation du site desktop - apparaît en premier
    tl.fromTo(desktopRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
    
    // Animation des éléments de design - apparaissent progressivement
    const designElements = containerRef.current.querySelectorAll('.design-element');
    designElements.forEach((element, index) => {
      tl.fromTo(element, 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          ease: 'back.out(1.7)'
        },
        "-=0.2" // Chaque élément apparaît légèrement avant que l'animation précédente soit terminée
      );
    });
    
    // Animation du curseur - se déplace aléatoirement
    const cursor = containerRef.current.querySelector('.cursor');
    if (cursor) {
      gsap.to(cursor, {
        x: gsap.utils.random(50, 250),
        y: gsap.utils.random(50, 150),
        duration: 1.5,
        repeat: -1,
        repeatRefresh: true,
        ease: 'power2.inOut'
      });
    }
    
    // Animation des éléments qui "se construisent"
    const buildingElements = containerRef.current.querySelectorAll('.building-element');
    buildingElements.forEach((element, index) => {
      gsap.fromTo(element,
        { width: 0 },
        { 
          width: '100%', 
          duration: 1.5, 
          delay: 1 + (index * 0.2),
          ease: 'power1.inOut'
        }
      );
    });
  }, []);
  
  // Effet d'animation supplémentaire lors du survol
  useEffect(() => {
    if (!isHovered || !containerRef.current) return;
    
    // Animation des éléments lors du survol
    gsap.to('.hover-animate', {
      y: -5,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.05
    });
    
    return () => {
      // Retour à l'état initial lorsque le survol se termine
      gsap.to('.hover-animate', {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.05
      });
    };
  }, [isHovered]);
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[500px] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Écran d'ordinateur */}
      <motion.div 
        ref={desktopRef} 
        className="relative z-10 bg-gray-800 rounded-xl shadow-2xl overflow-hidden w-[400px] h-[280px] border-4 border-gray-700"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Barre d'adresse */}
        <div className="bg-gray-700 h-8 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover-animate"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover-animate"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover-animate"></div>
          </div>
          <div className="ml-2 bg-gray-600 rounded-md h-5 w-full max-w-[250px] flex items-center px-2">
            <span className="text-xs text-gray-300">leconnecteurdigital.fr</span>
          </div>
        </div>
        
        {/* Contenu du site */}
        <div className="relative h-[calc(100%-2rem)] bg-gradient-to-br from-gray-900 to-blue-900 p-4 overflow-hidden">
          {/* Header */}
          <div className="design-element bg-gray-800/50 h-8 w-full rounded mb-3 flex items-center px-3">
            <div className="w-8 h-4 bg-blue-500/30 rounded mr-auto hover-animate"></div>
            <div className="flex gap-3">
              <div className="w-10 h-3 bg-gray-600/50 rounded hover-animate"></div>
              <div className="w-10 h-3 bg-gray-600/50 rounded hover-animate"></div>
              <div className="w-10 h-3 bg-gray-600/50 rounded hover-animate"></div>
            </div>
          </div>
          
          {/* Hero section */}
          <div className="design-element h-24 w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg mb-3 p-3 flex">
            <div className="w-2/3 flex flex-col justify-center">
              <div className="w-4/5 h-4 bg-white/30 rounded mb-2 building-element"></div>
              <div className="w-3/5 h-3 bg-white/20 rounded mb-2 building-element"></div>
              <div className="w-1/4 h-6 bg-blue-500/40 rounded building-element"></div>
            </div>
            <div className="w-1/3 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-pink-500/40 hover-animate"></div>
            </div>
          </div>
          
          {/* Content sections */}
          <div className="design-element grid grid-cols-3 gap-2 mb-3">
            <div className="h-12 bg-gray-700/30 rounded p-2 hover-animate">
              <div className="w-full h-2 bg-gray-500/30 rounded mb-1 building-element"></div>
              <div className="w-2/3 h-2 bg-gray-500/30 rounded building-element"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default WebsiteCreation;
