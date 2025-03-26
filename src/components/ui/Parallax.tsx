'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

const Parallax = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Adjust the movement range based on direction
  const factor = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed * factor]);
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

export default Parallax;
