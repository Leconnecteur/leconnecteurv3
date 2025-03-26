'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const GlowingGradientSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Animation des particules
    const particles = containerRef.current.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: gsap.utils.random(-30, 30),
        x: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1
      });
    });
    
    // Animation de la sphère
    gsap.to('.sphere-inner', {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
    
    // Animation du glow
    gsap.to('.glow', {
      opacity: 0.7,
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    // Animation des lignes de code
    const codeLines = containerRef.current.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
      gsap.fromTo(line, 
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.3, 
          delay: 0.5 + (index * 0.1),
          ease: 'power2.out'
        }
      );
    });
  }, []);
  
  // Générer des particules aléatoires
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div 
      key={`particle-${i}`}
      className="particle absolute rounded-full"
      style={{
        width: `${Math.random() * 6 + 2}px`,
        height: `${Math.random() * 6 + 2}px`,
        backgroundColor: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#818cf8' : '#ec4899',
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
        filter: 'blur(1px)'
      }}
    />
  ));
  
  // Générer des lignes de code simulées
  const codeLines = [
    '<div className="hero">',
    '  <h1>Le Connecteur Digital</h1>',
    '  <p>Des sites qui convertissent</p>',
    '  <Button>Créer mon site</Button>',
    '</div>',
    'const animate = () => {',
    '  gsap.to(".sphere", { rotate: 360 })',
    '}'
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center">
      {/* Sphère principale avec dégradé */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative"
      >
        <div className="sphere-inner relative w-[300px] h-[300px] rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(56,189,248,0.8) 0%, rgba(79,70,229,0.8) 50%, rgba(236,72,153,0.8) 100%)',
            boxShadow: '0 0 50px rgba(56,189,248,0.5), 0 0 100px rgba(79,70,229,0.3), 0 0 150px rgba(236,72,153,0.2)'
          }}
        >
          {/* Effet de brillance */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{ 
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 20%, transparent 60%)'
            }}
          />
          
          {/* Effet de texture */}
          <div 
            className="absolute inset-0 rounded-full opacity-20"
            style={{ 
              backgroundImage: 'url("/images/grid.svg")',
              backgroundSize: '100px 100px'
            }}
          />
        </div>
        
        {/* Effet de glow externe */}
        <div 
          className="glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full opacity-50 -z-10"
          style={{ 
            background: 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(79,70,229,0.2) 50%, rgba(236,72,153,0.1) 70%, transparent 100%)',
            filter: 'blur(30px)'
          }}
        />
      </motion.div>
      
      {/* Particules flottantes */}
      {particles}
      
      {/* Écran de code simulé */}
      <div className="absolute top-[60%] -right-[5%] w-[200px] bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 shadow-xl transform rotate-6 z-10">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs font-mono text-gray-300">
          {codeLines.map((line, index) => (
            <div key={index} className="code-line whitespace-nowrap">
              {line}
            </div>
          ))}
        </div>
      </div>
      
      {/* Écran de design simulé */}
      <div className="absolute bottom-[10%] -left-[5%] w-[180px] bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-xl transform -rotate-6 z-10">
        <div className="w-full h-4 bg-sky-500/30 rounded mb-2"></div>
        <div className="w-3/4 h-3 bg-white/20 rounded mb-2"></div>
        <div className="w-full h-20 bg-gradient-to-br from-sky-500/30 via-indigo-500/30 to-pink-500/30 rounded mb-2"></div>
        <div className="w-1/2 h-3 bg-white/20 rounded mb-1"></div>
        <div className="w-3/4 h-3 bg-white/20 rounded"></div>
      </div>
    </div>
  );
};

export default GlowingGradientSphere;
