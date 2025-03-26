'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaFacebook, FaInstagram, FaArrowRight } from 'react-icons/fa';
import ButtonGlow from '@/components/ui/ButtonGlow';

// Import dynamique du composant ContactSection
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-black animate-pulse"></div>
});

const ScrollAnimation = dynamic(() => import('@/components/ui/ScrollAnimation'), { 
  ssr: false 
});

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section avec style amélioré */}
      <section className="py-16 bg-gray-900 relative">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Parlons de votre <span className="text-blue-400">projet</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nous sommes à votre écoute pour transformer vos idées en solutions digitales performantes et attractives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        <ContactSection />
      </section>

      {/* Map Section avec style moderne */}
      <section className="py-16 bg-gray-900 relative">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoaded && (
              <>
                <ScrollAnimation className="bg-gray-800/40 backdrop-blur-md rounded-lg p-8 shadow-xl border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-700"></div>
                  <h2 className="text-2xl font-bold text-white mb-4">Nos coordonnées</h2>
                  <div className="space-y-4 text-gray-300">
                    <p className="flex items-center group">
                      <span className="mr-3 bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                        <FaMapMarkerAlt />
                      </span>
                      <span>22 Impasse des Aubépines 64 210 Bidart</span>
                    </p>
                    <p className="flex items-center group">
                      <span className="mr-3 bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                        <FaPhone />
                      </span>
                      <span>06 13 63 09 84</span>
                    </p>
                    <p className="flex items-center group">
                      <span className="mr-3 bg-gradient-to-br from-teal-500 to-green-600 p-2 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                        <FaEnvelope />
                      </span>
                      <span>contact@leconnecteurdigital.fr</span>
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mt-8 mb-4">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/geremy-lourenco-350945b2" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-lg text-white hover:scale-110 transition-transform duration-300">
                      <FaLinkedin />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61566337440874&locale=fr_FR" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-lg text-white hover:scale-110 transition-transform duration-300">
                      <FaFacebook />
                    </a>
                    <a href="https://www.instagram.com/leconnecteurdigital?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-lg text-white hover:scale-110 transition-transform duration-300">
                      <FaInstagram />
                    </a>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation delay={0.2} className="relative h-80 bg-gray-800/40 backdrop-blur-md rounded-lg shadow-xl border border-gray-700/50 overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-400/20 transition-all duration-700"></div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.3362152864257!2d-1.5874908234375158!3d43.4371064710892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51152b0af31e2d%3A0x2c2d0c9c74f0bc96!2s22%20Imp.%20des%20Aub%C3%A9pines%2C%2064210%20Bidart!5e0!3m2!1sfr!2sfr!4v1711381916183!5m2!1sfr!2sfr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="relative z-10"
                    title="Le Connecteur Digital - Localisation"
                  ></iframe>
                </ScrollAnimation>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section avec style moderne */}
      <section className="py-16 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions <span className="text-blue-400">fréquentes</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Nous avons rassemblé les questions les plus courantes pour vous aider.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {isLoaded && (
              <>
                <ScrollAnimation className="mb-6 bg-gray-800/40 backdrop-blur-md rounded-lg p-6 shadow-xl border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-700"></div>
                  <h3 className="text-xl font-bold text-white mb-2">Combien coûte un site web ?</h3>
                  <p className="text-gray-300">
                    Le coût d&apos;un site web varie en fonction de vos besoins spécifiques, de la complexité du projet et des fonctionnalités requises. Nous proposons des solutions adaptées à tous les budgets. Contactez-nous pour obtenir un devis personnalisé.
                  </p>
                </ScrollAnimation>
                
                <ScrollAnimation delay={0.1} className="mb-6 bg-gray-800/40 backdrop-blur-md rounded-lg p-6 shadow-xl border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-400/20 transition-all duration-700"></div>
                  <h3 className="text-xl font-bold text-white mb-2">Combien de temps faut-il pour créer un site web ?</h3>
                  <p className="text-gray-300">
                    La durée de création d&apos;un site web dépend de sa complexité. Un site vitrine simple peut être réalisé en 2-3 semaines, tandis qu&apos;un site e-commerce ou une application web plus complexe peut prendre 2-3 mois ou plus.
                  </p>
                </ScrollAnimation>
                
                <ScrollAnimation delay={0.2} className="mb-6 bg-gray-800/40 backdrop-blur-md rounded-lg p-6 shadow-xl border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-400/20 transition-all duration-700"></div>
                  <h3 className="text-xl font-bold text-white mb-2">Proposez-vous des services de maintenance ?</h3>
                  <p className="text-gray-300">
                    Oui, nous proposons des forfaits de maintenance pour assurer le bon fonctionnement de votre site, effectuer des mises à jour régulières et garantir sa sécurité. Nous pouvons également vous former à la gestion de votre site.
                  </p>
                </ScrollAnimation>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section avec style moderne et animation de bouton */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-indigo-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                opacity: 0.1 + Math.random() * 0.2,
                animation: `float ${Math.random() * 10 + 10}s linear infinite, pulse ${Math.random() * 2 + 2}s ease-in-out infinite`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à lancer votre projet digital ?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              N&apos;attendez plus pour transformer votre vision en réalité. Notre équipe est prête à vous accompagner à chaque étape.
            </p>
            
            <div className="flex justify-center">
              <ButtonGlow
                href="#contact"
                variant="primary"
                size="lg"
                icon={<FaArrowRight />}
              >
                Démarrer mon projet
              </ButtonGlow>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
