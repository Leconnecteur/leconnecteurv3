'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ResponsiveCarousel from '@/components/ui/ResponsiveCarousel';
import ButtonGlow from '@/components/ui/ButtonGlow';
import dynamic from 'next/dynamic';

const ScrollAnimation = dynamic(() => import('@/components/ui/ScrollAnimation'), { 
  ssr: false 
});

// Données des projets
const projects = [
  {
    id: "clem-detailing",
    title: "Clem Detailing",
    category: "Site Web",
    description: "Mise en place d'un système de réservation en ligne pour faciliter la prise de rendez-vous et augmenter le chiffre d'affaire",
    image: "/images/realisations/clem-detailing.png",
    link: "https://clemdetailing.fr/"
  },
  {
    id: "classic-auto-vintage",
    title: "Classic Auto Vintage",
    category: "Site Web",
    description: "Site e-commerce dédié aux voitures de collection",
    image: "/images/realisations/classic-auto-vintage.png",
    link: "https://classicautovintage.fr/"
  },
  {
    id: "publicom64",
    title: "Publicom 64",
    category: "Site Web",
    description: "Site vitrine pour une agence de communication locale",
    image: "/images/realisations/publicom64.png",
    link: "https://publicom64.com/"
  },
  {
    id: "lifespa",
    title: "Life Spa",
    category: "Site Web",
    description: "Création d'un site vitrine pour l'ouverture d'un magasin de spas, permettant de présenter les produits et d'attirer de nouveaux clients",
    image: "/images/realisations/lifespa.png",
    link: "https://lifespa.fr/"
  },
  {
    id: "aquarevet",
    title: "Aquarevet",
    category: "Site Web",
    description: "Site vitrine pour un service vétérinaire spécialisé en aquariophilie",
    image: "/images/realisations/aquarevet.png",
    link: "https://aquarevet.fr/"
  },
  {
    id: "clem-detailing-instagram",
    title: "Clem Detailing Instagram",
    category: "Social Ads",
    description: "Gestion des réseaux sociaux pour Clem Detailing",
    image: "/images/realisations/clem-detailing-instagram.png",
    link: "https://www.instagram.com/clem_detailingcar/"
  },
  {
    id: "classic-auto-vintage-pub",
    title: "Classic Auto Vintage Publicité",
    category: "Visuels",
    description: "Création de panneaux publicitaires pour une entreprise de voitures de collection",
    image: "/images/realisations/classic-auto-vintage-pub.png",
    link: "https://classicautovintage.fr/"
  },
  {
    id: "classic-auto-vintage-carte",
    title: "Classic Auto Vintage Carte",
    category: "Visuels",
    description: "Création de carte de visite pour Classic Auto Vintage",
    image: "/images/realisations/classic-auto-vintage-carte.png",
    link: "https://classicautovintage.fr/"
  },
  {
    id: "clem-detailing-pub",
    title: "Clem Detailing Publicité",
    category: "Visuels",
    description: "Conception de panneaux publicitaires pour un service de detailing automobile",
    image: "/images/realisations/clem-detailing-pub.png",
    link: "https://clemdetailing.fr/"
  },
  {
    id: "pergolife-logo",
    title: "PergoLife Logo",
    category: "Visuels",
    description: "Création d'un logo pour l'entreprise PergoLife",
    image: "/images/realisations/pergolife-logo.png",
    link: "#"
  },
  {
    id: "vert-renov",
    title: "VertRénov",
    category: "Visuels",
    description: "Création d'identité visuelle complète pour une entreprise de multiservice",
    image: "/images/realisations/vertrenov.png",
    link: "#"
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => {
        if (activeFilter === 'sites-web') return project.category === 'Site Web';
        if (activeFilter === 'social-ads') return project.category === 'Social Ads';
        if (activeFilter === 'visuels') return project.category === 'Visuels';
        return true;
      });
  
  return (
    <main className="overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('/public/images/grid.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Nos Réalisations</h1>
            <p className="text-xl text-pink-100 mb-8">
              Découvrez nos derniers projets qui ont transformé la présence en ligne de nos clients
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Filter */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-[url('/public/images/noise.png')] opacity-5 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.button 
                className={`px-6 py-3 rounded-full text-white backdrop-blur-sm border-2 transition-all duration-300 ${activeFilter === 'all' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'}`}
                onClick={() => setActiveFilter('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tous les projets
              </motion.button>
              <motion.button 
                className={`px-6 py-3 rounded-full text-white backdrop-blur-sm border-2 transition-all duration-300 ${activeFilter === 'sites-web' ? 'border-sky-500 bg-sky-500/20' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'}`}
                onClick={() => setActiveFilter('sites-web')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sites Web
              </motion.button>
              <motion.button 
                className={`px-6 py-3 rounded-full text-white backdrop-blur-sm border-2 transition-all duration-300 ${activeFilter === 'social-ads' ? 'border-purple-500 bg-purple-500/20' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'}`}
                onClick={() => setActiveFilter('social-ads')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Social Ads
              </motion.button>
              <motion.button 
                className={`px-6 py-3 rounded-full text-white backdrop-blur-sm border-2 transition-all duration-300 ${activeFilter === 'visuels' ? 'border-green-500 bg-green-500/20' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'}`}
                onClick={() => setActiveFilter('visuels')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visuels
              </motion.button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Portfolio Carousel */}
      <section className="py-8 mb-20">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <ResponsiveCarousel projects={filteredProjects} />
          </ScrollAnimation>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-[url('/public/images/circuit-pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Vous avez un projet en tête ?
              </h2>
              <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto">
                Discutons ensemble de votre vision et transformons-la en réalité digitale.
              </p>
              
              <div className="mt-8 text-center">
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
                  Démarrer votre projet
                </ButtonGlow>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  );
}
