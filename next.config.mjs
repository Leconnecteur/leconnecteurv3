/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false, // Désactiver l'optimisation non optimisée
    domains: ['localhost', 'leconnecteur.vercel.app'],
    path: '/_next/image/', // Chemin par défaut pour les images optimisées
    minimumCacheTTL: 60,
  },
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
