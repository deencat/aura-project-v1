'use client'

import React from 'react'
import Image from 'next/image'

interface PlaceholderImageProps {
  type?: string
  number?: number
  page?: string
  section?: string
  aspectRatio?: string
  className?: string
}

type GradientType = 'beauty' | 'treatment' | 'benefits' | 'avatar' | 'about' | 'team' | 'map';

// Move this outside the component and make it a regular function
function checkForRealImage(type: string | undefined, page: string | undefined, section: string | undefined): boolean {
  // For treatment images or specific page sections, we'll use real images
  if (type === 'treatment' || (page && section)) {
    return true;
  }
  
  // For other types, continue to use placeholder styling
  return false;
}

export default function PlaceholderImage({
  type = 'beauty',
  number = 1,
  page,
  section,
  aspectRatio = 'aspect-square',
  className = '',
}: PlaceholderImageProps) {
  // Build image path based on provided params
  let imagePath = '/images/placeholders/'
  
  // If page and section are provided, use the new naming convention
  if (page && section) {
    imagePath += `${page}-${section}-${number}.jpg`
  } else {
    // Fall back to the old naming convention
    imagePath += `${type}-${number}.jpg`
  }

  // Check if we should use a real image
  const hasRealImage = checkForRealImage(type, page, section);
  
  // Different background gradients for different placeholder types
  const gradients: Record<GradientType, string> = {
    beauty: 'bg-gradient-to-r from-rose-100 to-pink-100',
    treatment: 'bg-gradient-to-br from-amber-50 to-orange-100',
    benefits: 'bg-gradient-to-r from-violet-100 to-fuchsia-100',
    avatar: 'bg-gradient-to-r from-sky-50 to-indigo-100',
    about: 'bg-gradient-to-r from-lime-50 to-emerald-100',
    team: 'bg-gradient-to-r from-pink-50 to-rose-100',
    map: 'bg-gradient-to-r from-gray-100 to-gray-200'
  }
  
  // Get section or type for gradient
  const getGradientType = (): GradientType => {
    if (section) {
      // Map section names to existing gradient types
      const sectionToGradient: Record<string, GradientType> = {
        hero: 'treatment',
        benefits: 'benefits',
        team: 'team',
        about: 'about',
        avatar: 'avatar',
        map: 'map',
      };
      return sectionToGradient[section] || 'beauty';
    }
    return type as GradientType;
  }
  
  // Different decorative elements for different placeholder types
  const getDecorativeElements = () => {
    // Use section if available, otherwise fall back to type
    const displayType = section || type;
    
    switch(displayType) {
      case 'hero':
      case 'beauty':
        return (
          <>
            <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-primary/20"></div>
            <div className="absolute bottom-4 left-4 h-10 w-10 rounded-full bg-secondary/30"></div>
            <div className="absolute left-1/4 top-1/3 h-8 w-8 rounded-full bg-pink-200/50"></div>
            <svg className="absolute bottom-8 right-8 h-12 w-12 text-primary/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
          </>
        )
      case 'treatment':
        return (
          <>
            <div className="absolute left-6 top-6 h-12 w-12 rounded-full bg-primary/20"></div>
            <div className="absolute bottom-6 right-10 h-8 w-8 rounded-full bg-secondary/30"></div>
            <svg className="absolute bottom-10 left-10 h-10 w-10 text-primary/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"></path><path d="M17 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"></path><path d="M12 12a9 9 0 0 0 9 9"></path><path d="M12 12a9 9 0 0 1-9 9"></path><path d="M7 21H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3"></path><path d="M20 21h-3a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3"></path><path d="M12 7v5"></path></svg>
          </>
        )
      case 'benefits':
        return (
          <>
            <div className="absolute bottom-6 left-6 h-16 w-16 rounded-full bg-primary/20"></div>
            <div className="absolute right-10 top-10 h-10 w-10 rounded-full bg-secondary/30"></div>
            <svg className="absolute left-1/2 top-1/3 h-12 w-12 -translate-x-1/2 text-primary/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="4" height="4" x="10" y="10" rx="1"></rect><path d="M4 12h4"></path><path d="M16 12h4"></path><path d="M12 4v4"></path><path d="M12 16v4"></path></svg>
          </>
        )
      case 'avatar':
        return (
          <>
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300"></div>
            <svg className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </>
        )
      case 'about':
        return (
          <>
            <div className="absolute bottom-8 left-8 h-16 w-16 rounded-full bg-primary/20"></div>
            <div className="absolute right-8 top-8 h-12 w-12 rounded-full bg-secondary/30"></div>
            <svg className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-primary/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
          </>
        )
      case 'team':
        const teamNumber = number > 4 ? 1 : number;
        const teamIcons = [
          <svg key="1" className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
          <svg key="2" className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 3a2.5 2.5 0 0 1 2.5 2.5"></path><path d="M7 3a2.5 2.5 0 0 0-2.5 2.5"></path><path d="M19 10a7.5 7.5 0 1 0-10 7"></path><path d="M9 17c.6 2 2.4 3.5 4.8 3.5.3 0 .7 0 1-.1"></path><path d="M22 22a3.5 3.5 0 0 0-5.3-3"></path></svg>,
          <svg key="3" className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
          <svg key="4" className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 22h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-4"></path><path d="m9 16 4-4-4-4"></path><path d="M12 12H3"></path></svg>
        ];
        
        return (
          <>
            <div className="absolute left-1/2 top-1/3 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300"></div>
            {teamIcons[teamNumber - 1]}
            <div className="absolute bottom-8 w-full text-center text-sm font-medium text-gray-500">Team Member {teamNumber}</div>
          </>
        )
      case 'map':
        return (
          <>
            <svg className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"></circle><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8Z"></path></svg>
            <div className="absolute left-1/2 top-6 -translate-x-1/2 text-sm font-medium text-gray-500">Map Location</div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-primary">7/F, Cameron Commercial Building</div>
          </>
        )
      default:
        return null
    }
  }
  
  // Function to create image label
  const getImageLabel = () => {
    if (page && section) {
      if (page === 'peeled-egg-skin') {
        if (section === 'hero') {
          return 'Peeled Egg Skin Treatment';
        } else if (section === 'benefits') {
          const benefitLabels = [
            'Before & After',
            'Treatment Process',
            'Skin Transformation',
            'Client Results',
            'Application Technique'
          ];
          return number <= benefitLabels.length ? benefitLabels[number - 1] : `${page} ${section}`;
        }
      }
      else if (page === 'laser-treatment') {
        if (section === 'hero') {
          return 'Advanced Laser Treatment';
        } else if (section === 'benefits') {
          const benefitLabels = [
            'Before & After',
            'Treatment Process',
            'Skin Rejuvenation',
            'Client Results',
            'Advanced Technology'
          ];
          return number <= benefitLabels.length ? benefitLabels[number - 1] : `${page} ${section}`;
        }
      }
      else if (page === 'mole-wart-removal') {
        if (section === 'hero') {
          return 'Mole Wart Skin Growth Removal';
        } else if (section === 'benefits') {
          const benefitLabels = [
            'Before & After',
            'Treatment Process',
            'Precision Technology',
            'Healing Process',
            'Final Results'
          ];
          return number <= benefitLabels.length ? benefitLabels[number - 1] : `${page} ${section}`;
        }
      }
      else if (page === 'new-doublo') {
        if (section === 'hero') {
          return 'SD微雕拉提 (Micro-Sculpting Lift)';
        } else if (section === 'device') {
          return 'New Doublo™ SD Synergy Lifting';
        } else if (section === 'results') {
          return 'Visible Rejuvenation Results';
        }
      }
      return `${page} ${section}`;
    } 
    // Handle old format
    else if (type === 'treatment') {
      const treatmentLabels = [
        'Royal Black Scan',
        'Peeled Egg Skin',
        'Collagen Regeneration',
        '360 Smart Rescue',
        'Farewell Puffy Face',
        'Ultimate Stemcell Hydrating Repair',
        'Ceramic Skin Renewal',
        'Crystal Micro-Needling'
      ];
      
      return number <= treatmentLabels.length ? treatmentLabels[number - 1] : 'Treatment';
    }
    
    return `${type} image ${number}`;
  }
  
  const imageLabel = getImageLabel();
  
  // If using a real image
  if (hasRealImage) {
    return (
      <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-lg ${className}`}>
        <Image 
          src={imagePath}
          alt={imageLabel}
          fill
          style={{objectFit: 'cover'}}
          priority={number === 1}
        />
        {imageLabel && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-2 text-center">
            <div className="text-center text-base font-medium text-white">{imageLabel}</div>
          </div>
        )}
      </div>
    );
  }
  
  // Otherwise use the placeholder styling
  const gradientType = getGradientType();
  return (
    <div className={`relative ${aspectRatio} w-full ${gradients[gradientType]} overflow-hidden rounded-lg ${className}`}>
      {getDecorativeElements()}
    </div>
  )
} 