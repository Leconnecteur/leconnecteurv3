'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ButtonGlow from '@/components/ui/ButtonGlow';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/pourquoi-un-site-web', label: 'Pourquoi un site web' },
    { href: '/nos-services', label: 'Services' },
    { href: '/realisations', label: 'Réalisations' },
    { href: '/temoignages', label: 'Témoignages' },
    { href: '/contact', label: 'Contact' },
  ];

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      height: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      height: "100vh",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const glowVariants = {
    initial: { 
      opacity: 0.3,
      scale: 1,
    },
    animate: { 
      opacity: [0.3, 0.6, 0.3],
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

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-gray-900 to-black py-3 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <img 
              src="/logossfond.png" 
              alt="Le Connecteur Digital" 
              width={150} 
              height={40} 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`font-medium text-lg transition-colors relative group ${
                    pathname === link.href ? 'text-white font-semibold' : 'text-white hover:text-white'
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 transition-all duration-300 group-hover:w-full ${
                      pathname === link.href ? 'w-full' : 'w-0'
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
            
            <ButtonGlow 
              href="/contact"
              size="sm"
              variant="primary"
            >
              Devis gratuit
            </ButtonGlow>
          </nav>

          {/* Mobile Menu Button - Animated Hamburger */}
          <motion.button
            className="md:hidden relative z-50 p-2 touch-manipulation"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            whileTap={{ scale: 0.9 }}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <div className="w-8 h-8 flex flex-col items-center justify-center">
              <motion.span 
                className="block h-0.5 w-6 bg-white rounded-full"
                variants={{
                  closed: { rotate: 0, translateY: 0 },
                  open: { rotate: 45, translateY: 8 }
                }}
                transition={{ duration: 0.3 }}
              ></motion.span>
              <motion.span 
                className="block h-0.5 w-6 bg-white mt-1.5 rounded-full"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              ></motion.span>
              <motion.span 
                className="block h-0.5 w-6 bg-white mt-1.5 rounded-full"
                variants={{
                  closed: { rotate: 0, translateY: 0 },
                  open: { rotate: -45, translateY: -8 }
                }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </div>
            
            {/* Effet de lueur sur mobile */}
            {isMobile && (
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 z-[-1]"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-40 md:hidden overflow-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 min-h-screen flex flex-col justify-center items-center py-20">
              <div className="flex flex-col items-center mb-8">
                <img 
                  src="/logossfond.png" 
                  alt="Le Connecteur Digital" 
                  width={180} 
                  height={50} 
                  className="h-16 w-auto mb-4"
                />
              </div>
              <nav className="flex flex-col items-center space-y-8 py-8">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={linkVariants}
                    className="overflow-hidden"
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-bold transition-colors relative group block py-2 px-4 ${
                        pathname === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                      <span 
                        className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 transition-all duration-300 group-hover:w-full ${
                          pathname === link.href ? 'w-full' : 'w-0'
                        }`}
                      ></span>
                    </Link>
                  </motion.div>
                ))}
                
                <div className="mt-8 flex flex-col items-center space-y-4">
                  <ButtonGlow 
                    href="/contact"
                    size="md"
                    variant="primary"
                    onClick={closeMenu}
                  >
                    Demander un devis gratuit
                  </ButtonGlow>
                  
                  <div className="flex space-x-4 mt-6">
                    <motion.a 
                      href="https://instagram.com/leconnecteurdigital" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative text-white hover:text-purple-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="https://facebook.com/leconnecteurdigital" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative text-white hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="https://linkedin.com/company/leconnecteurdigital" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative text-white hover:text-blue-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
