'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ScrollAnimation = dynamic(() => import('@/components/ui/ScrollAnimation'), { 
  ssr: false 
});

const AnimatedCounter = dynamic(() => import('@/components/ui/AnimatedCounter').then(mod => mod.AnimatedCounter), { 
  ssr: false,
  loading: () => <div className="text-3xl md:text-4xl font-bold text-blue-600">0</div>
});

const ButtonGlow = dynamic(() => import('@/components/ui/ButtonGlow'), { 
  ssr: false 
});

export default function WhyWebsite() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Ajouter les styles d'animation
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
        }
        25% {
          transform: translateY(-20px) translateX(10px);
        }
        50% {
          transform: translateY(0) translateX(20px);
        }
        75% {
          transform: translateY(20px) translateX(10px);
        }
        100% {
          transform: translateY(0) translateX(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 0.1;
          transform: scale(1);
        }
        50% {
          opacity: 0.2;
          transform: scale(1.05);
        }
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section avec style moderne et fond bleu foncé uni */}
      <section className="relative py-16 overflow-hidden bg-[#0c1425]">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {isLoaded && [...Array(20)].map((_, i) => (
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
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Pourquoi votre entreprise a <span className="text-blue-400">besoin</span> d&#39;un site web ?
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Dans l&#39;ère numérique actuelle, un site web n&#39;est plus un luxe mais une nécessité pour toute entreprise qui souhaite prospérer.
            </p>
          </motion.div>
          
          {/* Stats Cards - Intégrées directement dans la première section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-4">
            {isLoaded && (
              <>
                <ScrollAnimation className="p-8 bg-gray-800/40 backdrop-blur-md rounded-lg shadow-xl border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-all duration-700"></div>
                  <AnimatedCounter 
                    end={81} 
                    duration={2.5} 
                    className="text-4xl font-bold text-blue-400 mb-2"
                    suffix="%"
                  />
                  <p className="text-gray-300">des consommateurs recherchent un produit en ligne avant d&#39;acheter</p>
                </ScrollAnimation>
                
                <ScrollAnimation 
                  className="p-8 bg-gray-800/40 backdrop-blur-md rounded-lg shadow-xl border border-gray-700/50 relative overflow-hidden group"
                  delay={0.2}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-400/30 transition-all duration-700"></div>
                  <AnimatedCounter 
                    end={75} 
                    duration={2.5} 
                    className="text-4xl font-bold text-purple-400 mb-2"
                    suffix="%"
                  />
                  <p className="text-gray-300">jugent la crédibilité d&#39;une entreprise selon son site web</p>
                </ScrollAnimation>
                
                <ScrollAnimation 
                  className="p-8 bg-gray-800/40 backdrop-blur-md rounded-lg shadow-xl border border-gray-700/50 relative overflow-hidden group"
                  delay={0.4}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl group-hover:bg-teal-400/30 transition-all duration-700"></div>
                  <div className="text-4xl font-bold text-teal-400 mb-2">24/7</div>
                  <p className="text-gray-300">votre site web travaille pour vous, même quand vous dormez</p>
                </ScrollAnimation>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section avec style moderne */}
      <section className="py-16 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Les <span className="text-blue-400">avantages</span> d&#39;un site web professionnel
            </h2>
            <p className="text-lg text-gray-300">
              Un site web bien conçu offre de nombreux avantages qui peuvent transformer votre entreprise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoaded && (
              <>
                <ScrollAnimation className="bg-gray-800/40 backdrop-blur-md rounded-lg p-6 shadow-xl border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-700"></div>
                  <div className="flex items-start mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Visibilité mondiale</h3>
                      <p className="text-gray-300">
                        Un site web vous permet d&#39;atteindre des clients potentiels dans le monde entier, 24h/24 et 7j/7.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation 
                  className="bg-gray-800/40 backdrop-blur-md rounded-lg p-6 shadow-xl border border-gray-700/50 relative overflow-hidden group"
                  delay={0.2}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-400/20 transition-all duration-700"></div>
                  <div className="flex items-start mb-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Rentabilité</h3>
                      <p className="text-gray-300">
                        Un site web est l&#39;un des moyens les plus rentables pour promouvoir votre entreprise et générer des leads.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation 
                  className="bg-gray-800/40 backdrop-blur-md rounded-lg p-6 shadow-xl border border-gray-700/50 relative overflow-hidden group"
                  delay={0.4}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-400/20 transition-all duration-700"></div>
                  <div className="flex items-start mb-4">
                    <div className="bg-gradient-to-br from-green-500 to-lime-600 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Crédibilité professionnelle</h3>
                      <p className="text-gray-300">
                        Aujourd&#39;hui, une entreprise sans site web est considérée comme moins professionnelle et moins fiable.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation 
                  className="bg-gray-800/40 backdrop-blur-md rounded-lg p-6 shadow-xl border border-gray-700/50 relative overflow-hidden group"
                  delay={0.6}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all duration-700"></div>
                  <div className="flex items-start mb-4">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Communication efficace</h3>
                      <p className="text-gray-300">
                        Un site web vous permet de communiquer rapidement et efficacement avec vos clients et prospects.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section avec style moderne */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-purple-900 relative">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Prêts à donner un coup de boost à votre entreprise ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Contactez-nous pour discuter de votre projet et obtenir un devis gratuit.
              </p>
              <ButtonGlow 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Créer mon site web
              </ButtonGlow>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
