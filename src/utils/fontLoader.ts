import { Inter, Poppins } from 'next/font/google';

// Optimisation des polices avec font-display: swap pour un chargement plus rapide
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Fonction pour charger les polices de manière optimisée
export function getFontVariables() {
  return `${inter.variable} ${poppins.variable}`;
}
