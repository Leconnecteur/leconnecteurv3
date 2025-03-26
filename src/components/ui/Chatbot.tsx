'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaPaperPlane } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';

// Types pour les messages
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: Action[];
};

// Types pour les actions
type Action = {
  label: string;
  type: 'link' | 'function';
  value: string;
};

// Personnalisation du style pour les composants 
const customStyles = {
  container: 'bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700',
  header: 'bg-gradient-to-r from-purple-600 to-blue-500 p-4 flex items-center justify-between',
  messageList: 'p-4 space-y-4 max-h-[400px] overflow-y-auto',
  userMessage: 'bg-blue-600 text-white p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%]',
  botMessage: 'bg-gray-800 text-white p-3 rounded-lg rounded-tl-none mr-auto max-w-[80%]',
  input: 'bg-gray-800 text-white border-t border-gray-700 p-4 flex items-center'
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
      actions: [
        { label: 'Services', type: 'link', value: '#services' },
        { label: 'Demander un devis', type: 'link', value: '#contact' },
        { label: 'Réalisations', type: 'link', value: '#realisations' }
      ]
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Référence pour le conteneur de messages pour le scroll automatique
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fonction pour envoyer un message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessageObj]);
    setNewMessage('');
    setIsLoading(true);
    
    // Simuler une réponse du bot après un court délai
    setTimeout(() => {
      const botResponse = generateBotResponse(newMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  // Fonction pour générer une réponse du bot basée sur le message de l'utilisateur
  const generateBotResponse = (userMessage: string): Message => {
    const userMessageLower = userMessage.toLowerCase();
    let botResponse = "";
    let actions: Action[] = [];
    
    // Réponses conditionnelles basées sur le contenu du message
    if (userMessageLower.includes('prix') || 
        userMessageLower.includes('tarif') || 
        userMessageLower.includes('coût') || 
        userMessageLower.includes('cout') ||
        userMessageLower.includes('combien') ||
        userMessageLower.includes('devis')) {
      botResponse = "Chaque projet est unique et nos tarifs sont adaptés à vos besoins spécifiques. Pour obtenir un devis personnalisé, vous pouvez :";
      actions = [
        { label: 'Remplir un formulaire rapide', type: 'function', value: 'showContactForm' },
        { label: 'Aller au formulaire complet', type: 'link', value: '#contact' }
      ];
    }
    else if (userMessageLower.includes('site') || 
            userMessageLower.includes('web') || 
            userMessageLower.includes('internet')) {
      botResponse = "Nous créons des sites web professionnels et sur mesure pour tous types d'entreprises. Nos services incluent :";
      actions = [
        { label: 'Sites vitrines', type: 'link', value: '#services' },
        { label: 'E-commerce', type: 'link', value: '#services' },
        { label: 'Applications web', type: 'link', value: '#services' }
      ];
    }
    else if (userMessageLower.includes('seo') || 
            userMessageLower.includes('référencement') || 
            userMessageLower.includes('referencement') ||
            userMessageLower.includes('google')) {
      botResponse = "Nous proposons des services de référencement naturel (SEO) pour améliorer votre visibilité sur les moteurs de recherche :";
      actions = [
        { label: 'En savoir plus', type: 'link', value: '#services' },
        { label: 'Demander un audit SEO', type: 'function', value: 'showContactForm' }
      ];
    }
    else if (userMessageLower.includes('contact') || 
            userMessageLower.includes('joindre') || 
            userMessageLower.includes('parler') ||
            userMessageLower.includes('appeler')) {
      botResponse = "Vous pouvez nous contacter de plusieurs façons :";
      actions = [
        { label: 'Formulaire de contact', type: 'link', value: '#contact' },
        { label: 'Remplir un formulaire rapide', type: 'function', value: 'showContactForm' }
      ];
    }
    else if (userMessageLower.includes('merci') || 
            userMessageLower.includes('ok') || 
            userMessageLower.includes('d\'accord')) {
      botResponse = "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
    }
    else {
      botResponse = "Je suis là pour vous aider avec toutes vos questions concernant nos services numériques. Que souhaitez-vous savoir ?";
      actions = [
        { label: 'Services', type: 'link', value: '#services' },
        { label: 'Réalisations', type: 'link', value: '#realisations' },
        { label: 'Contact', type: 'link', value: '#contact' }
      ];
    }
    
    return {
      id: messages.length + 2,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
      actions: actions
    };
  };

  // Gérer les actions des boutons
  const handleActionClick = (action: Action) => {
    if (action.type === 'function') {
      if (action.value === 'showContactForm') {
        setShowContactForm(true);
      }
    }
  };

  // Gérer les changements dans le formulaire de contact
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Soumettre le formulaire de contact
  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler l'envoi du formulaire
    setIsLoading(true);
    
    setTimeout(() => {
      // Ajouter un message de confirmation
      const confirmationMessage: Message = {
        id: messages.length + 1,
        text: `Merci ${contactFormData.nom} ! Nous avons bien reçu votre demande et nous vous contacterons très rapidement.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, confirmationMessage]);
      setShowContactForm(false);
      setContactFormData({
        nom: '',
        email: '',
        telephone: '',
        message: ''
      });
      setIsLoading(false);
    }, 1500);
  };

  // Détecter si l'appareil est mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Scroll automatique vers le bas quand de nouveaux messages sont ajoutés
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Bouton pour ouvrir le chat */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le chat"
      >
        <FaComments className="text-xl" />
      </motion.button>
      
      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed ${isMobile ? 'inset-0' : 'bottom-20 right-6 w-96'} z-50`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className={customStyles.container}>
              {/* En-tête du chat */}
              <div className={customStyles.header}>
                <h3 className="text-white font-bold">Chat avec Le Connecteur Digital</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Fermer le chat"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              
              {/* Liste des messages */}
              <div className={customStyles.messageList}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                    <div className={msg.sender === 'user' ? customStyles.userMessage : customStyles.botMessage}>
                      <p>{msg.text}</p>
                      
                      {/* Actions/boutons pour les messages du bot */}
                      {msg.sender === 'bot' && msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.actions.map((action, index) => (
                            action.type === 'link' ? (
                              <Link 
                                key={index}
                                href={action.value}
                                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-full transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {action.label}
                              </Link>
                            ) : (
                              <button
                                key={index}
                                className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded-full transition-colors"
                                onClick={() => handleActionClick(action)}
                              >
                                {action.label}
                              </button>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Indicateur de chargement */}
                {isLoading && (
                  <div className="message bot">
                    <div className={customStyles.botMessage}>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Formulaire de contact rapide */}
              {showContactForm ? (
                <form onSubmit={handleContactFormSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
                  <h4 className="text-white font-medium mb-3">Formulaire de contact rapide</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="nom"
                      placeholder="Votre nom"
                      value={contactFormData.nom}
                      onChange={handleContactFormChange}
                      className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Votre email"
                      value={contactFormData.email}
                      onChange={handleContactFormChange}
                      className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input
                      type="tel"
                      name="telephone"
                      placeholder="Votre téléphone"
                      value={contactFormData.telephone}
                      onChange={handleContactFormChange}
                      className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      name="message"
                      placeholder="Votre message"
                      value={contactFormData.message}
                      onChange={handleContactFormChange}
                      className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500 min-h-[80px]"
                      required
                    ></textarea>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity"
                      >
                        Envoyer
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="bg-gray-700 text-white px-4 py-2 rounded font-medium hover:bg-gray-600 transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* Champ de saisie de message */
                <form onSubmit={handleSendMessage} className={customStyles.input}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="flex-1 bg-transparent text-white focus:outline-none"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="ml-2 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                    disabled={!newMessage.trim() || isLoading}
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
