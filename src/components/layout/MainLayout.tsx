'use client';

import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from '../ui/CookieBanner';
import Chatbot from '../ui/Chatbot';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Add smooth scroll behavior
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (
        anchor && 
        anchor.href && 
        anchor.href.includes('#') && 
        anchor.href.split('#')[0] === window.location.href.split('#')[0]
      ) {
        e.preventDefault();
        const id = anchor.href.split('#')[1];
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          
          // Update URL without page reload
          history.pushState(null, '', `#${id}`);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <Chatbot />
    </div>
  );
};

export default MainLayout;
