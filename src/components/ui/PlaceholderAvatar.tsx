'use client';

import React from 'react';

interface PlaceholderAvatarProps {
  name: string;
  className?: string;
}

const PlaceholderAvatar: React.FC<PlaceholderAvatarProps> = ({ name, className = "w-16 h-16" }) => {
  // Générer une couleur de fond basée sur le nom
  const getColorFromName = (name: string) => {
    const colors = [
      'from-purple-500 to-blue-500',
      'from-blue-500 to-teal-500',
      'from-teal-500 to-green-500',
      'from-green-500 to-yellow-500',
      'from-yellow-500 to-orange-500',
      'from-orange-500 to-red-500',
      'from-red-500 to-pink-500',
      'from-pink-500 to-purple-500'
    ];
    
    // Générer un index basé sur la somme des codes de caractères du nom
    const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  // Obtenir les initiales du nom (maximum 2 caractères)
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const bgColor = getColorFromName(name);
  const initials = getInitials(name);

  return (
    <div className={`rounded-full bg-gradient-to-r ${bgColor} flex items-center justify-center text-white font-bold ${className}`}>
      {initials}
    </div>
  );
};

export default PlaceholderAvatar;
