import { Metadata } from 'next';

// Métadonnées par défaut pour tout le site
export const defaultMetadata: Metadata = {
  title: "Le Connecteur Digital | Agence de création de sites web et marketing digital",
  description: "Le Connecteur Digital est une agence spécialisée dans la création de sites internet, social ads et visuels pour entreprises. Boostez votre présence en ligne avec nos solutions digitales sur mesure.",
  keywords: "création site web, agence web, marketing digital, social ads, visuels entreprise, site internet professionnel",
  authors: [{ name: "Le Connecteur Digital" }],
  creator: "Le Connecteur Digital",
  publisher: "Le Connecteur Digital",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://leconnecteurdigital.fr"),
  alternates: {
    canonical: "/",
    languages: {
      'fr-FR': "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://leconnecteurdigital.fr",
    title: "Le Connecteur Digital | Agence de création de sites web et marketing digital",
    description: "Le Connecteur Digital est une agence spécialisée dans la création de sites internet, social ads et visuels pour entreprises. Boostez votre présence en ligne avec nos solutions digitales sur mesure.",
    siteName: "Le Connecteur Digital",
    images: [
      {
        url: "/images/logossfond.png",
        width: 1200,
        height: 630,
        alt: "Le Connecteur Digital - Agence Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Connecteur Digital | Agence de création de sites web et marketing digital",
    description: "Le Connecteur Digital est une agence spécialisée dans la création de sites internet, social ads et visuels pour entreprises. Boostez votre présence en ligne avec nos solutions digitales sur mesure.",
    images: ["/images/logossfond.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
};

// Métadonnées spécifiques par page
export const pageMetadata = {
  home: {
    title: "Le Connecteur Digital | Agence de création de sites web et marketing digital",
    description: "Le Connecteur Digital est une agence spécialisée dans la création de sites internet, social ads et visuels pour entreprises. Boostez votre présence en ligne avec nos solutions digitales sur mesure.",
    keywords: "création site web, agence web, marketing digital, social ads, visuels entreprise, site internet professionnel",
    path: "/",
  },
  pourquoiUnSiteWeb: {
    title: "Pourquoi un site web ? | Le Connecteur Digital",
    description: "Découvrez pourquoi un site web professionnel est essentiel pour votre entreprise. Visibilité, crédibilité et croissance assurées avec Le Connecteur Digital.",
    keywords: "importance site web, avantages site internet, présence en ligne, site web professionnel, visibilité internet",
    path: "/pourquoi-un-site-web",
  },
  nosServices: {
    title: "Nos Services | Création de sites web, Social Ads, Visuels | Le Connecteur Digital",
    description: "Découvrez nos services de création de sites web, social ads, création de visuels et community management pour booster votre présence en ligne.",
    keywords: "création site web, social ads, création visuels, community management, services digitaux",
    path: "/nos-services",
  },
  realisations: {
    title: "Nos Réalisations | Portfolio de sites web | Le Connecteur Digital",
    description: "Explorez notre portfolio de sites web et projets digitaux réalisés pour nos clients. Des solutions sur mesure et des designs modernes.",
    keywords: "portfolio, réalisations, sites web, projets digitaux, exemples sites internet",
    path: "/realisations",
  },
  temoignages: {
    title: "Témoignages Clients | Le Connecteur Digital",
    description: "Découvrez ce que nos clients disent de nos services. Témoignages et avis sur nos créations de sites web et solutions digitales.",
    keywords: "témoignages, avis clients, retours d'expérience, satisfaction client, références",
    path: "/temoignages",
  },
  contact: {
    title: "Contact | Le Connecteur Digital",
    description: "Contactez Le Connecteur Digital pour discuter de votre projet de site web ou de marketing digital. Devis gratuit et sans engagement.",
    keywords: "contact agence web, devis site internet, contact marketing digital, demande d'information",
    path: "/contact",
  },
  mentionsLegales: {
    title: "Mentions Légales | Le Connecteur Digital",
    description: "Mentions légales du site Le Connecteur Digital. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation du site.",
    keywords: "mentions légales, informations légales, conditions utilisation",
    path: "/mentions-legales",
  },
  politiqueConfidentialite: {
    title: "Politique de Confidentialité | Le Connecteur Digital",
    description: "Politique de confidentialité du site Le Connecteur Digital. Informations sur la collecte et le traitement des données personnelles.",
    keywords: "politique confidentialité, données personnelles, RGPD, protection données",
    path: "/politique-de-confidentialite",
  },
};

// Fonction utilitaire pour générer les métadonnées d'une page spécifique
export function generateMetadata(pageName: keyof typeof pageMetadata): Metadata {
  const page = pageMetadata[pageName];
  
  return {
    ...defaultMetadata,
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: page.path,
      languages: {
        'fr-FR': page.path,
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: page.title,
      description: page.description,
      url: `https://leconnecteurdigital.fr${page.path}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: page.title,
      description: page.description,
    },
  };
}
