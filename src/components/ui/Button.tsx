'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  disabled = false,
  type = 'button',
  ariaLabel,
  target,
  rel,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  // Base classes
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-8 py-3.5',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  // Icon classes
  const iconClasses = icon ? (iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse') : '';
  const iconSpacing = icon ? (iconPosition === 'left' ? 'space-x-2' : 'space-x-reverse space-x-2') : '';
  
  // Combine all classes
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${iconClasses} ${iconSpacing} ${className}`;
  
  // Glow effect animation variants
  const glowVariants = {
    initial: { 
      opacity: 0,
      scale: 0.8,
    },
    hover: { 
      opacity: [0.5, 0.4, 0.5],
      scale: 1.35,
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
      {icon && (
        <span className="flex items-center justify-center">{icon}</span>
      )}
      <span>{children}</span>
      
      {/* Glow effect element */}
      <motion.span 
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 blur-xl -z-10"
        initial="initial"
        whileHover="hover"
        variants={glowVariants}
      />
    </>
  );
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link 
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
      >
        {buttonContent}
      </Link>
    );
  }
  
  // Render as button otherwise
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {buttonContent}
    </button>
  );
}
