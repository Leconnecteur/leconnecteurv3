'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ButtonGlow from './ButtonGlow';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    // Only store essential cookies
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto">
            <motion.div 
              className="relative overflow-hidden rounded-xl backdrop-blur-lg bg-gray-900/80 border border-white/10 shadow-2xl p-6"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Effets de lumière */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              {/* Grille futuriste */}
              <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
              
              {/* Light beam effect */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  className="absolute -inset-[100%] skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{ x: ["0%", "200%"] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 8,
                    ease: "linear"
                  }}
                ></motion.div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold mb-2 text-white"
                  >
                    Nous utilisons des cookies
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-blue-100 text-sm"
                  >
                    Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.
                    <Link href="/politique-de-confidentialite" className="text-blue-400 hover:text-blue-300 ml-1 underline transition-colors">
                      En savoir plus
                    </Link>
                  </motion.p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={declineCookies}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-transparent border border-white/30 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Refuser
                  </motion.button>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <ButtonGlow 
                      onClick={acceptCookies} 
                      size="sm"
                      variant="primary"
                    >
                      Accepter
                    </ButtonGlow>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
