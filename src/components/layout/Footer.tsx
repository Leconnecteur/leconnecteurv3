'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement newsletter subscription logic
    console.log('Newsletter subscription for:', email);
    setEmail('');
    // Show success message or toast notification
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-blob"></div>
        <div className="absolute top-60 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="block mb-6">
                <img 
                  src="/logossfond.png" 
                  alt="Le Connecteur Digital" 
                  width={180} 
                  height={50} 
                  className="h-10 w-auto"
                />
              </Link>
            </motion.div>
            <p className="text-gray-400 mb-4 max-w-md">
              Votre agence de création de sites internet, social ads et visuels pour entreprises. Nous connectons votre entreprise au monde digital.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://www.linkedin.com/in/geremy-lourenco-350945b2" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 relative z-10">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/leconnecteurdigital?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center transition-all duration-300 relative z-10">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-pink-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </motion.a>
              <motion.a 
                href="https://www.facebook.com/profile.php?id=61566337440874&locale=fr_FR" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center transition-all duration-300 relative z-10">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.988c4.781-.75 8.437-4.887 8.437-9.878z"/>
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-blue-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Liens rapides
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-sky-500 to-indigo-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/pourquoi-un-site-web', label: 'Pourquoi un site web ?' },
                { href: '/nos-services', label: 'Nos services' },
                { href: '/realisations', label: 'Réalisations' },
                { href: '/temoignages', label: 'Témoignages' },
                { href: '/contact', label: 'Contact' }
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors group flex items-center">
                    <span className="w-0 h-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 mr-0 opacity-0 group-hover:w-3 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Informations légales
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-sky-500 to-indigo-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' }
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors group flex items-center">
                    <span className="w-0 h-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 mr-0 opacity-0 group-hover:w-3 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-sky-500 to-indigo-500"></span>
            </h3>
            <p className="text-gray-400 mb-4">
              Restez informé de nos dernières actualités et offres
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="w-full px-4 py-2 bg-gray-800/80 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700 transition-all duration-300"
                  required
                />
              </div>
              <motion.div
                className="relative inline-block group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-transparent text-white font-medium rounded-md relative z-10 overflow-hidden border border-indigo-500/30 group-hover:border-indigo-500/50 transition-all duration-300"
                >
                  <span className="relative z-10">S&apos;abonner</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 opacity-30 group-hover:opacity-80 transition-opacity duration-300"></span>
                </button>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 rounded-md blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
              </motion.div>
            </form>
          </div>
        </div>

        {/* Copyright with spotlight effect */}
        <div className="pt-8 border-t border-gray-800 text-center relative">
          {/* Spotlight effect */}
          <div className="absolute left-1/2 -top-[100px] w-[200px] h-[300px] -translate-x-1/2 bg-gradient-to-b from-indigo-400 via-blue-500/40 to-transparent rounded-[50%] blur-xl opacity-50 spotlight-animation"></div>
          
          <p className="text-white text-sm relative z-10 py-4">
            {currentYear} Le Connecteur Digital. Tous droits réservés.
          </p>
          
          {/* Liens légaux avec animation au survol */}
          <div className="flex justify-center space-x-6 mt-2 mb-4">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/mentions-legales" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm relative group">
                Mentions légales
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/politique-de-confidentialite" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm relative group">
                Politique de confidentialité
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Add CSS for spotlight animation */}
      <style jsx>{`
        @keyframes spotlight {
          0% {
            opacity: 0.4;
            transform: translate(-50%, 0) scale(0.95);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -5px) scale(1.05);
          }
          100% {
            opacity: 0.4;
            transform: translate(-50%, 0) scale(0.95);
          }
        }
        
        .spotlight-animation {
          animation: spotlight 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
