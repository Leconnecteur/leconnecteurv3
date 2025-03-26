'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  highlightColor?: string;
}

export const AnimatedText = ({ 
  text, 
  className = "", 
  once = false,
  highlightColor = "rgb(37, 99, 235)" 
}: AnimatedTextProps) => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    setIsInView(true);
  }, []);

  // Split text into words
  const words = text.split(" ");

  // Animation variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Animation variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          className="mr-2 inline-block"
          variants={child}
          key={index}
        >
          {word.includes("*") ? (
            <span className="relative inline-block group">
              <span 
                className="relative z-10"
                style={{ color: highlightColor }}
              >
                {word.replace(/\*/g, "")}
              </span>
              <span 
                className="absolute bottom-0 left-0 w-full h-[30%] bg-blue-200 opacity-50 group-hover:h-[50%] transition-all duration-300"
                style={{ backgroundColor: `${highlightColor}40` }}
              ></span>
            </span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
