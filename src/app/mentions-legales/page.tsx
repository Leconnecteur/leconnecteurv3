'use client';

import React, { useEffect, useState } from 'react';

export default function MentionsLegales() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Mentions légales</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">1. Éditeur du site</h2>
          <p className="text-gray-300 mb-4">
            Le site <span className="font-semibold">leconnecteur.fr</span> est édité par :
          </p>
          <p className="text-gray-300 mb-4">
            Le Connecteur Digital<br />
            21 rue de la République<br />
            64100 Bayonne<br />
            France
          </p>
          <p className="text-gray-300 mb-4">
            SIRET : 951 865 156 00011<br />
            Numéro de TVA : FR45 951 865 156
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">2. Directeur de la publication</h2>
          <p className="text-gray-300 mb-4">
            Le directeur de la publication est M. Geremy Lourenco.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">3. Hébergeur</h2>
          <p className="text-gray-300 mb-4">
            Le site est hébergé par Vercel, Inc.<br />
            100 California Street, Suite 900<br />
            San Francisco, CA 94111<br />
            États-Unis
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">4. Propriété intellectuelle</h2>
          <p className="text-gray-300 mb-4">
            Tous les éléments du site (textes, images, logos, marques, etc.) sont la propriété exclusive de Le Connecteur Digital.
          </p>
          <p className="text-gray-300 mb-4">
            Toute reproduction ou représentation totale ou partielle de ce site, par quelque procédé que ce soit, sans l&#39;autorisation expresse de l&#39;éditeur est interdite.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">5. Responsabilité</h2>
          <p className="text-gray-300 mb-4">
            Le Connecteur Digital s&#39;efforce de fournir des informations exactes et à jour sur le site. Cependant, il ne peut être tenu responsable des erreurs, omissions ou inexactitudes qui pourraient subsister.
          </p>
          <p className="text-gray-300 mb-4">
            L&#39;utilisation du site se fait sous la responsabilité exclusive de l&#39;utilisateur. Le Connecteur Digital ne peut être tenu responsable des dommages directs ou indirects qui pourraient résulter de l&#39;accès ou de l&#39;utilisation du site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">6. Protection des données personnelles</h2>
          <p className="text-gray-300 mb-4">
            Le Connecteur Digital respecte la vie privée de ses utilisateurs et s&#39;engage à protéger leurs données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
          <p className="text-gray-300 mb-4">
            Pour plus d&#39;informations, consultez notre <a href="/politique-de-confidentialite" className="text-blue-400 hover:text-blue-300">Politique de Confidentialité</a>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">7. Liens hypertextes</h2>
          <p className="text-gray-300 mb-4">
            Le Connecteur Digital ne peut être tenu responsable du contenu des sites tiers auxquels il pourrait être fait référence par des liens hypertextes.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">8. Modification des mentions légales</h2>
          <p className="text-gray-300 mb-4">
            Le Connecteur Digital se réserve le droit de modifier à tout moment les présentes mentions légales. Les utilisateurs sont invités à les consulter régulièrement.
          </p>
        </section>
      </div>
    </div>
  );
}
