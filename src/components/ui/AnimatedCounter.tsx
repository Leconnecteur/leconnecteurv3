'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  title?: string;
}

export const AnimatedCounter = ({
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  title = '',
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      let startTime: number;
      let animationFrame: number;
      
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      
      setTimeout(() => {
        animationFrame = requestAnimationFrame(updateCount);
      }, delay * 1000);
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, end, duration, delay, controls]);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="text-3xl md:text-4xl font-bold text-blue-600">
        {prefix}{count}{suffix}
      </div>
      {title && (
        <div className="mt-2 text-gray-600">
          {title}
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedCounter;
