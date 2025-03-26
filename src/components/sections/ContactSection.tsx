'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaComments } from 'react-icons/fa';
import ButtonGlow from '@/components/ui/ButtonGlow';

// Options pour le budget
const budgetOptions = [
  "< 2 000 €",
  "2 000 € - 5 000 €",
  "5 000 € - 10 000 €",
  "> 10 000 €",
  "Je ne sais pas encore"
];

const ContactSection = () => {
  // États pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    budget: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null
  });
  
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Focus et blur pour les animations
  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: "Veuillez remplir tous les champs obligatoires."
      });
      return;
    }
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });
    
    // Simulation d'envoi (à remplacer par votre API réelle)
    try {
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Réinitialiser le formulaire après succès
      setFormData({
        name: '',
        email: '',
        phone: '',
        project: '',
        budget: '',
        message: ''
      });
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      // Réinitialiser le statut après 5 secondes
      setTimeout(() => {
        setFormStatus(prev => ({
          ...prev,
          isSubmitted: false
        }));
      }, 5000);
      
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: "Une erreur est survenue. Veuillez réessayer."
      });
    }
  };

  // Wrapper pour le bouton qui n'attend pas de paramètres
  const handleButtonSubmit = () => {
    // Créer un faux événement pour satisfaire handleSubmit
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSubmit(fakeEvent);
  };

  // Effet de lueur pour les boutons sur mobile
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

  // Animation pour les champs du formulaire
  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)",
      transition: { duration: 0.3 }
    },
    blur: {
      scale: 1,
      boxShadow: "0 0 0px rgba(79, 70, 229, 0)",
      transition: { duration: 0.3 }
    },
    mobileFocus: {
      scale: 1.02,
      boxShadow: "0 0 25px rgba(79, 70, 229, 0.6)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="contact" className="py-8 pt-0 md:py-12 md:pt-0 bg-black relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 pt-12 md:pt-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Démarrons votre projet ensemble
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Parlez-nous de votre projet et découvrez comment nous pouvons vous aider à atteindre vos objectifs digitaux.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl"
          >
            {formStatus.isSubmitted ? (
              <div className="text-center py-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto flex items-center justify-center mb-6"
                >
                  <FaCheck className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">Message envoyé avec succès !</h3>
                <p className="text-gray-300 mb-6">
                  Merci de nous avoir contacté. Notre équipe vous répondra dans les plus brefs délais.
                </p>
                <div className="flex justify-center">
                  <ButtonGlow
                    onClick={() => setFormStatus(prev => ({ ...prev, isSubmitted: false }))}
                    variant="primary"
                    size="md"
                    icon={<FaPaperPlane />}
                  >
                    Envoyer un autre message
                  </ButtonGlow>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nom */}
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Nom complet *</label>
                    <motion.div
                      variants={inputVariants}
                      animate={isMobile ? (activeField === 'name' ? 'mobileFocus' : 'blur') : (activeField === 'name' ? 'focus' : 'blur')}
                    >
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        placeholder="Votre nom"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email *</label>
                    <motion.div
                      variants={inputVariants}
                      animate={isMobile ? (activeField === 'email' ? 'mobileFocus' : 'blur') : (activeField === 'email' ? 'focus' : 'blur')}
                    >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        placeholder="votre@email.com"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="phone" className="block text-white mb-2">Téléphone</label>
                    <motion.div
                      variants={inputVariants}
                      animate={isMobile ? (activeField === 'phone' ? 'mobileFocus' : 'blur') : (activeField === 'phone' ? 'focus' : 'blur')}
                    >
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => handleFocus('phone')}
                        onBlur={handleBlur}
                        placeholder="Votre numéro de téléphone"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Type de projet */}
                  <div>
                    <label htmlFor="project" className="block text-white mb-2">Type de projet</label>
                    <motion.div
                      variants={inputVariants}
                      animate={isMobile ? (activeField === 'project' ? 'mobileFocus' : 'blur') : (activeField === 'project' ? 'focus' : 'blur')}
                    >
                      <input
                        type="text"
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        onFocus={() => handleFocus('project')}
                        onBlur={handleBlur}
                        placeholder="Ex: Site vitrine, e-commerce, refonte..."
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      />
                    </motion.div>
                  </div>
                </div>
                
                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-white mb-2">Budget estimé</label>
                  <motion.div
                    variants={inputVariants}
                    animate={isMobile ? (activeField === 'budget' ? 'mobileFocus' : 'blur') : (activeField === 'budget' ? 'focus' : 'blur')}
                  >
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      onFocus={() => handleFocus('budget')}
                      onBlur={handleBlur}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    >
                      <option value="" className="bg-gray-900">Sélectionnez votre budget</option>
                      {budgetOptions.map((option, index) => (
                        <option key={index} value={option} className="bg-gray-900">
                          {option}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-white mb-2">Votre message *</label>
                  <motion.div
                    variants={inputVariants}
                    animate={isMobile ? (activeField === 'message' ? 'mobileFocus' : 'blur') : (activeField === 'message' ? 'focus' : 'blur')}
                  >
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      placeholder="Décrivez votre projet et vos besoins..."
                      rows={5}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
                      required
                    ></textarea>
                  </motion.div>
                </div>
                
                {/* Message d'erreur */}
                {formStatus.error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    {formStatus.error}
                  </motion.div>
                )}
                
                {/* Bouton d'envoi */}
                <div className="w-full flex justify-center">
                  <ButtonGlow
                    onClick={handleButtonSubmit}
                    disabled={formStatus.isSubmitting}
                    variant="primary"
                    size="lg"
                    className="max-w-xs"
                    icon={formStatus.isSubmitting ? null : <FaPaperPlane />}
                  >
                    {formStatus.isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : formStatus.isSubmitted ? (
                      <>
                        <FaCheck className="mr-2" />
                        Message envoyé !
                      </>
                    ) : (
                      <>
                        Envoyer mon message
                      </>
                    )}
                  </ButtonGlow>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
