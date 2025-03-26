'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonGlowProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

export default function ButtonGlow({
  children,
  href,
  onClick,
  className = '',
  ariaLabel,
  target,
  rel,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  disabled = false
}: ButtonGlowProps) {
  // Base classes
  const baseClasses = 'relative inline-flex items-center justify-center font-bold rounded-full overflow-hidden transition-all duration-300 z-10';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-4 py-2 gap-1.5',
    md: 'text-base px-6 py-3 gap-2',
    lg: 'text-lg px-8 py-4 gap-3',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-transparent text-white border-2 border-white/30 backdrop-blur-sm group-hover:border-white/50',
    secondary: 'bg-transparent text-white border-2 border-pink-500/30 backdrop-blur-sm group-hover:border-pink-500/50',
    outline: 'bg-transparent text-white border-2 border-sky-500/30 backdrop-blur-sm group-hover:border-sky-500/50',
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  // Icon classes
  const iconClasses = icon ? (iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse') : '';
  
  // Combine all classes
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${iconClasses} ${disabledClasses} ${className}`;
  
  // Glow effect animation variants
  const glowVariants = {
    initial: { 
      opacity: 0.3,
      scale: 1,
    },
    hover: { 
      opacity: [0.5, 0.8, 0.5],
      scale: 1.05,
      transition: {
        opacity: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        },
        scale: {
          duration: 0.4,
          ease: "easeOut"
        }
      }
    }
  };
  
  // Button content with icon
  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      
      {icon && (
        <motion.span 
          className="relative z-10 flex items-center justify-center"
          initial={{ x: 0 }}
          animate={{ x: iconPosition === 'right' ? [0, 5, 0] : [0, -5, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {icon}
        </motion.span>
      )}
      
      <motion.span 
        className="absolute inset-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ 
          opacity: [0.3, 0.5, 0.3],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />
    </>
  );
  
  // Render as link if href is provided
  if (href) {
    return (
      <motion.div
        className="relative inline-block group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          href={href}
          className={classes}
          aria-label={ariaLabel}
          target={target}
          rel={rel}
        >
          {buttonContent}
        </Link>
        <motion.div 
          className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
        />
      </motion.div>
    );
  }
  
  // Render as button otherwise
  return (
    <motion.div
      className="relative inline-block group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={onClick}
        className={classes}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {buttonContent}
      </button>
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"
        variants={glowVariants}
        initial="initial"
        whileHover="hover"
      />
    </motion.div>
  );
}
