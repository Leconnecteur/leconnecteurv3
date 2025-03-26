'use client';

import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
}

const ScrollAnimation = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  once = true,
  threshold = 0.1,
}: ScrollAnimationProps) => {
  const ref = useRef(null);
  
  // Determine the initial position based on direction
  let initialX = 0;
  let initialY = 0;
  
  switch (direction) {
    case 'up':
      initialY = distance;
      break;
    case 'down':
      initialY = -distance;
      break;
    case 'left':
      initialX = distance;
      break;
    case 'right':
      initialX = -distance;
      break;
  }
  
  const variants = {
    hidden: { 
      opacity: 0,
      x: initialX,
      y: initialY,
    },
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
