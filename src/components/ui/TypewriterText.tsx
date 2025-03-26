'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  highlightWords = [],
  highlightColor = 'rgb(56, 189, 248)',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour mettre en évidence les mots spécifiés
  const highlightText = (text: string) => {
    if (highlightWords.length === 0) return text;

    let highlightedText = text;
    highlightWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span style="color: ${highlightColor}">$1</span>`);
    });
    
    return highlightedText;
  };

  // Effet pour l'animation de machine à écrire
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Délai initial avant de commencer à taper
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  // Effet pour l'animation de machine à écrire
  useEffect(() => {
    if (!isTyping) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      // Animation terminée
      if (onComplete) onComplete();
    }
  }, [currentIndex, isTyping, onComplete, speed, text]);

  // Variantes pour l'animation du curseur
  const cursorVariants: Variants = {
    blinking: {
      opacity: [0, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div className={className}>
      <div className="inline">
        <span 
          dangerouslySetInnerHTML={{ 
            __html: highlightText(displayText) 
          }} 
        />
        {currentIndex < text.length && (
          <motion.span
            variants={cursorVariants}
            animate="blinking"
            className="inline-block w-[2px] h-[1em] bg-white ml-1 align-middle"
          />
        )}
      </div>
    </div>
  );
};

export default TypewriterText;
