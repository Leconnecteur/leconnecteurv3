'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ButtonGlow from '@/components/ui/ButtonGlow';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  hoverColor,
  delay = 0 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  const iconControls = useAnimation();
  const glowControls = useAnimation();
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Mobile animations
  useEffect(() => {
    if (isMobile) {
      // Subtle animation loop for mobile
      const animateMobile = async () => {
        await controls.start({ 
          y: -5, 
          boxShadow: `0 0 20px ${hoverColor}`,
          borderColor: hoverColor,
          transition: { duration: 1.5, ease: "easeInOut" }
        });
        await controls.start({ 
          y: 0, 
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          borderColor: "rgba(75, 85, 99, 0.2)",
          transition: { duration: 1.5, ease: "easeInOut" }
        });
      };
      
      // Animate icon for mobile
      const animateIcon = async () => {
        await iconControls.start({ 
          scale: 1.1,
          transition: { duration: 1, ease: "easeInOut" }
        });
        await iconControls.start({ 
          scale: 1,
          transition: { duration: 1, ease: "easeInOut" }
        });
      };
      
      // Animate glow effect
      const animateGlow = async () => {
        await glowControls.start({
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.05, 1],
          transition: { 
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      };
      
      // Run animations in sequence with delays between cards
      const timeout = setTimeout(() => {
        animateGlow(); // Start glow animation immediately
        const iconInterval = setInterval(animateIcon, 4000);
        const cardInterval = setInterval(animateMobile, 6000);
        
        return () => {
          clearInterval(iconInterval);
          clearInterval(cardInterval);
        };
      }, delay * 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isMobile, controls, iconControls, glowControls, hoverColor, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      <motion.div 
        className={`bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-800 h-full relative overflow-hidden group transition-all duration-300 flex flex-col`}
        whileHover={!isMobile ? { 
          y: -10,
          boxShadow: `0 0 30px ${hoverColor}`,
          borderColor: `${hoverColor}`
        } : {}}
        whileTap={isMobile ? {
          scale: 0.98,
          transition: { duration: 0.2 }
        } : {}}
        animate={controls}
      >
        {/* Glow effect for mobile */}
        {isMobile && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br"
            style={{ 
              background: `linear-gradient(135deg, ${hoverColor}00, ${hoverColor}40, ${hoverColor}00)`,
              borderRadius: "inherit",
              zIndex: 0
            }}
            animate={glowControls}
          />
        )}
        
        {/* Card content */}
        <div className="relative z-10 flex flex-col h-full">
          <motion.div 
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white`}
            style={{ backgroundColor: color }}
            animate={iconControls}
          >
            <div className="text-2xl">
              {icon}
            </div>
          </motion.div>
          
          <h3 className="text-xl font-bold mb-4 text-white group-hover:text-white transition-colors">{title}</h3>
          
          <p className="text-gray-300 mb-6 group-hover:text-white/90 transition-colors flex-grow">
            {description}
          </p>
          
          <div className="mt-auto">
            <ButtonGlow
              href="/contact"
              variant="outline"
              size="sm"
            >
              En savoir plus
            </ButtonGlow>
          </div>
        </div>
        
        {/* Background gradient hover effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"
          style={{ background: `linear-gradient(135deg, ${color}, ${hoverColor})` }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;
