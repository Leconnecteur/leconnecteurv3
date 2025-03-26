'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/ui/ServiceCard';
import ButtonGlow from '@/components/ui/ButtonGlow';
import dynamic from 'next/dynamic';

const ScrollAnimation = dynamic(() => import('@/components/ui/ScrollAnimation').then(mod => mod.default), { 
  ssr: false 
});

export default function Services() {
  return (
    <main className="overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 py-8 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Nos Services</h1>
            <p className="text-xl text-blue-100 mb-8">
              Des solutions digitales complètes et sur mesure pour propulser votre entreprise vers le succès
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Cards Section */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              Nos <span className="text-sky-400">expertises</span> digitales
            </h2>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <ServiceCard 
              title="Création de Sites Web"
              description="Sites vitrines, e-commerce et landing pages optimisés pour la conversion et adaptés à tous les appareils."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              }
              color="#38bdf8"
              hoverColor="rgba(56,189,248,0.3)"
              delay={0.1}
            />
            
            <ServiceCard 
              title="Social Ads"
              description="Campagnes publicitaires ciblées sur les réseaux sociaux pour maximiser votre retour sur investissement."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Z"></path>
                  <line x1="16" x2="16" y1="8" y2="16"></line>
                  <line x1="8" x2="8" y1="8" y2="16"></line>
                  <line x1="12" x2="12" y1="16" y2="16"></line>
                </svg>
              }
              color="#a855f7"
              hoverColor="rgba(168,85,247,0.3)"
              delay={0.2}
            />
            
            <ServiceCard 
              title="Création de Visuels"
              description="Identités visuelles et supports marketing qui reflètent l'essence de votre marque et captent l'attention."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              }
              color="#ec4899"
              hoverColor="rgba(236,72,153,0.3)"
              delay={0.3}
            />
            
            <ServiceCard 
              title="Community Management"
              description="Gestion professionnelle de vos réseaux sociaux pour développer votre communauté et renforcer votre image de marque."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              }
              color="#10b981"
              hoverColor="rgba(16,185,129,0.3)"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24" id="sites-web">
            <div className="order-2 lg:order-1">
              <ScrollAnimation direction="right">
                <h2 className="text-3xl font-bold mb-6 text-white">Création de Sites Web</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Nous concevons des sites web qui ne sont pas seulement beaux, mais aussi fonctionnels, rapides et optimisés pour convertir vos visiteurs en clients.
                </p>
                <ul className="space-y-4 mb-8">
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-6 w-6 text-sky-400 mr-2 flex-shrink-0 rounded-full bg-sky-400/20 flex items-center justify-center">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Sites vitrines professionnels</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-6 w-6 text-sky-400 mr-2 flex-shrink-0 rounded-full bg-sky-400/20 flex items-center justify-center">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">E-commerce et boutiques en ligne</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-6 w-6 text-sky-400 mr-2 flex-shrink-0 rounded-full bg-sky-400/20 flex items-center justify-center">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Landing pages optimisées pour la conversion</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-6 w-6 text-sky-400 mr-2 flex-shrink-0 rounded-full bg-sky-400/20 flex items-center justify-center">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Refonte de sites existants</span>
                  </motion.li>
                </ul>
                
                <motion.div
                  className="relative inline-block group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ButtonGlow 
                    href="/contact"
                    size="lg"
                    icon={
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    }
                  >
                    Demander un devis
                  </ButtonGlow>
                </motion.div>
              </ScrollAnimation>
            </div>
            <div className="order-1 lg:order-2 relative">
              <ScrollAnimation direction="left">
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <Image 
                      src="/professional-website.jpg" 
                      alt="Création de sites web" 
                      width={600} 
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="w-16 h-16 bg-sky-900/50 text-sky-400 rounded-2xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Sites web professionnels</h3>
                  </div>
                </motion.div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-sky-600/20 rounded-2xl -z-10 blur-xl"></div>
              </ScrollAnimation>
            </div>
          </div>

          {/* Autres sections de services similaires... */}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-indigo-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Prêt à transformer votre présence en ligne ?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Discutons de votre projet et créons ensemble une expérience digitale qui vous démarque.
              </p>
              
              <motion.div
                className="relative inline-block group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonGlow 
                  href="/contact"
                  size="lg"
                  variant="secondary"
                  icon={
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  }
                >
                  Démarrer mon projet
                </ButtonGlow>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  );
}
