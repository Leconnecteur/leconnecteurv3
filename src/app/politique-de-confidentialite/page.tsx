'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ScrollAnimation = dynamic(() => import('@/components/ui/ScrollAnimation'), { 
  ssr: false 
});

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section avec titre animé */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
        
        {/* Cercles flous décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Politique de Confidentialité
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          ></motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-800">
            <ScrollAnimation>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Introduction</h2>
                  <p className="text-gray-300 mb-4">
                    Le Connecteur Digital s&#39;engage à protéger la vie privée des utilisateurs de son site web. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations personnelles lorsque vous visitez notre site web ou utilisez nos services.
                  </p>
                  <p className="text-gray-300">
                    En utilisant notre site, vous acceptez les pratiques décrites dans la présente politique de confidentialité. Nous vous encourageons à la lire attentivement pour comprendre nos pratiques concernant vos informations personnelles.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Informations que nous collectons</h2>
                  <p className="text-gray-300 mb-4">
                    Nous collectons les types d&#39;informations suivants :
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li><span className="font-medium text-white">Informations que vous nous fournissez :</span> Lorsque vous remplissez un formulaire de contact, vous nous fournissez des informations telles que votre nom, adresse e-mail, numéro de téléphone et le contenu de votre message.</li>
                    <li><span className="font-medium text-white">Informations de navigation :</span> Nous collectons automatiquement certaines informations lorsque vous visitez notre site, notamment votre adresse IP, type de navigateur, pages consultées, temps passé sur ces pages, et autres statistiques de navigation.</li>
                    <li><span className="font-medium text-white">Cookies et technologies similaires :</span> Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre site, analyser comment vous l&#39;utilisez et personnaliser notre contenu.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. Utilisation des informations</h2>
                  <p className="text-gray-300 mb-4">
                    Nous utilisons les informations que nous collectons pour :
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Fournir, maintenir et améliorer nos services</li>
                    <li>Répondre à vos demandes, commentaires ou questions</li>
                    <li>Vous envoyer des informations techniques, des mises à jour, des alertes de sécurité et des messages de support et administratifs</li>
                    <li>Communiquer avec vous au sujet de nos produits, services, offres, promotions et événements</li>
                    <li>Surveiller et analyser les tendances, l&#39;utilisation et les activités liées à notre site web</li>
                    <li>Détecter, prévenir et résoudre les problèmes techniques ou de sécurité</li>
                    <li>Se conformer aux obligations légales</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Partage des informations</h2>
                  <p className="text-gray-300 mb-4">
                    Nous ne vendons pas vos informations personnelles à des tiers. Nous pouvons partager vos informations dans les circonstances suivantes :
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li><span className="font-medium text-white">Avec des prestataires de services :</span> Nous pouvons partager vos informations avec des prestataires de services tiers qui nous aident à fournir nos services (hébergement, analyse de données, traitement des paiements, etc.)</li>
                    <li><span className="font-medium text-white">Pour des raisons légales :</span> Nous pouvons partager vos informations si nous estimons que leur divulgation est nécessaire pour se conformer à une obligation légale, protéger nos droits ou la sécurité d&#39;autrui</li>
                    <li><span className="font-medium text-white">Avec votre consentement :</span> Nous pouvons partager vos informations avec votre consentement ou selon vos instructions</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Cookies et technologies similaires</h2>
                  <p className="text-gray-300 mb-4">
                    Notre site utilise des cookies et des technologies similaires pour collecter des informations sur votre activité, votre navigateur et votre appareil. Les cookies sont de petits fichiers texte stockés sur votre navigateur qui nous permettent de reconnaître votre navigateur ou appareil lors de visites ultérieures.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Nous utilisons les types de cookies suivants :
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li><span className="font-medium text-white">Cookies strictement nécessaires :</span> Ces cookies sont essentiels au fonctionnement de notre site</li>
                    <li><span className="font-medium text-white">Cookies de performance :</span> Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site</li>
                    <li><span className="font-medium text-white">Cookies de fonctionnalité :</span> Ces cookies permettent à notre site de se souvenir des choix que vous faites</li>
                    <li><span className="font-medium text-white">Cookies de ciblage :</span> Ces cookies sont utilisés pour diffuser des publicités plus pertinentes</li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé. Cependant, certaines fonctionnalités de notre site peuvent ne pas fonctionner correctement sans cookies.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Sécurité des données</h2>
                  <p className="text-gray-300 mb-4">
                    Nous prenons des mesures raisonnables pour protéger vos informations personnelles contre la perte, le vol, l&#39;utilisation abusive, l&#39;accès non autorisé, la divulgation, l&#39;altération et la destruction. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n&#39;est totalement sécurisée.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Vos droits</h2>
                  <p className="text-gray-300 mb-4">
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Droit d&#39;accès à vos données personnelles</li>
                    <li>Droit de rectification des données inexactes</li>
                    <li>Droit à l&#39;effacement de vos données</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit à la portabilité des données</li>
                    <li>Droit d&#39;opposition au traitement</li>
                    <li>Droit de retirer votre consentement à tout moment</li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    Pour exercer ces droits, veuillez nous contacter à l&#39;adresse email suivante : contact@leconnecteurdigital.fr
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">8. Modifications de notre politique de confidentialité</h2>
                  <p className="text-gray-300 mb-4">
                    Nous pouvons modifier cette politique de confidentialité de temps à autre. Si nous apportons des modifications importantes, nous vous en informerons par email ou par un avis sur notre site web. La date de la dernière mise à jour sera indiquée en haut de cette page.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">9. Contact</h2>
                  <p className="text-gray-300 mb-4">
                    Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à :
                  </p>
                  <p className="text-gray-300">
                    Email : contact@leconnecteurdigital.fr<br />
                    Adresse : 22 Impasse des Aubépines, 64210 Bidart
                  </p>
                </div>
              </div>
            </ScrollAnimation>
            
            <div className="mt-12 text-center">
              <a 
                href="/mentions-legales" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Voir nos mentions légales
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
