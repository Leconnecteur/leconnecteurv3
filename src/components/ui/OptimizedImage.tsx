'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  className?: string;
  imgClassName?: string;
  animation?: boolean;
  blurEffect?: boolean;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
  animation = true,
  blurEffect = true,
  priority = false,
  ...rest
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  if (!isMounted) return null;

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={animation ? "hidden" : false}
      animate={isLoaded && animation ? "visible" : false}
      variants={containerVariants}
    >
      {blurEffect && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${imgClassName} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        {...rest}
      />
    </motion.div>
  );
}
