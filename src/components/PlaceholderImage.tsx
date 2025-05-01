'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getCacheBustedImageUrl } from '@/utils/imageUtils'

interface PlaceholderImageProps {
  type?: string
  number?: number
  page?: string
  section?: string
  aspectRatio?: string
  className?: string
  imageUrl?: string
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
  imageUrl,
}: PlaceholderImageProps) {
  // Add state to track image loading errors
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Add dependency on key image caching props to force re-render when they change
  useEffect(() => {
    // Reset error state when imageUrl changes
    if (imageUrl) {
      setImageError(false);
      setIsLoading(true);
    }
  }, [imageUrl]);

  // Helper function to extract filename from path for debugging
  const getFilenameFromPath = (path: string) => {
    return path.split('/').pop() || path;
  };
  
  // Improve the category and slug extraction logic
  const extractCategoryAndSlug = (url: string): { category?: string, slug?: string } => {
    if (!url) return {};
    
    // Try to match treatment paths like /images/treatments/category/slug/image.jpg
    const match = url.match(/\/treatments\/([^\/]+)\/([^\/]+)\//);
    if (match && match.length >= 3) {
      return {
        category: match[1],
        slug: match[2]
      };
    }
    
    // Try to match from page and section props if available
    if (page) {
      // For new-doublo pages, extract the specific treatment
      if (page === 'new-doublo' && section) {
        return {
          category: 'new-doublo',
          slug: section
        };
      }
      return {
        category: page
      };
    }
    
    return {};
  };

  // If imageUrl is provided, use it directly
  if (imageUrl && !imageError) {
    // Apply cache busting to image URL
    const { category, slug } = extractCategoryAndSlug(imageUrl);
    const cachedImageUrl = getCacheBustedImageUrl(imageUrl, category, slug);
    
    return (
      <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-lg ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        <Image 
          src={cachedImageUrl}
          alt={`Image ${number}`}
          fill
          style={{objectFit: 'cover'}}
          priority={number === 1}
          onError={() => {
            console.log(`Image failed to load: ${cachedImageUrl}`);
            setImageError(true);
          }}
          onLoad={() => setIsLoading(false)}
        />
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <p>Image failed to load</p>
              <p className="text-xs text-gray-400">{getFilenameFromPath(imageUrl)}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Build image path based on provided params
  let imagePath = '/images/placeholders/'
  
  // Special handling for new-doublo pages
  if (page === 'new-doublo') {
    // For new-doublo sections, we need custom placeholder paths
    if (section === 'hero') {
      imagePath = '/images/placeholders/new-doublo-hero.jpg';
    } else if (section === 'before_after') {
      imagePath = `/images/placeholders/new-doublo-before-after-${number}.jpg`;
    } else if (section === 'technology') {
      imagePath = '/images/placeholders/new-doublo-technology.jpg';
    } else if (section === 'comparison') {
      imagePath = '/images/placeholders/new-doublo-comparison.jpg';
    } else if (section === 'testimonials') {
      imagePath = '/images/placeholders/new-doublo-testimonial.jpg';
    } else {
      // Default section fallback
      imagePath += `new-doublo-${section}-${number}.jpg`;
    }
  }
  // If page and section are provided, use the new naming convention
  else if (page && section) {
    imagePath += `${page}-${section}-${number}.jpg`;
  } else {
    // Fall back to the old naming convention
    imagePath += `${type}-${number}.jpg`;
  }

  // Check if we should attempt to use a real image
  const shouldUseRealImage = checkForRealImage(type, page, section) && !imageError;
  
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
        neck: 'treatment',  // Add mapping for neck section
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
          </>
        )
      case 'treatment':
      case 'neck': // Add specific handling for neck
        return (
          <>
            <div className="absolute left-6 top-6 h-12 w-12 rounded-full bg-primary/20"></div>
            <div className="absolute bottom-6 right-10 h-8 w-8 rounded-full bg-secondary/30"></div>
          </>
        )
      case 'benefits':
        return (
          <>
            <div className="absolute bottom-6 left-6 h-16 w-16 rounded-full bg-primary/20"></div>
            <div className="absolute right-10 top-10 h-10 w-10 rounded-full bg-secondary/30"></div>
          </>
        )
      case 'avatar':
        return (
          <>
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300"></div>
          </>
        )
      case 'about':
        return (
          <>
            <div className="absolute bottom-8 left-8 h-16 w-16 rounded-full bg-primary/20"></div>
            <div className="absolute right-8 top-8 h-12 w-12 rounded-full bg-secondary/30"></div>
          </>
        )
      case 'team':
        return (
          <>
            <div className="absolute left-1/2 top-1/3 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300"></div>
            <div className="absolute bottom-8 w-full text-center text-sm font-medium text-gray-500">Team Member {number}</div>
          </>
        )
      case 'map':
        return (
          <>
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
    // Special handling for v-line page
    if (page === 'v-line' || (typeof imageUrl === 'string' && imageUrl.includes('/v-line/'))) {
      if (section === 'hero' || imageUrl?.includes('/hero.jpg')) {
        return 'V-Line Perfect Jawline';
      } else if (section === 'before_after' || imageUrl?.includes('/before-after')) {
        return `V-Line Before & After ${number}`;
      } else if (section === 'technology' || imageUrl?.includes('/technology')) {
        return 'V-Line Technology';
      } else if (section === 'comparison' || imageUrl?.includes('/comparison')) {
        return 'V-Line Comparison';
      } else if (section === 'testimonials' || imageUrl?.includes('/testimonial')) {
        return 'Client Testimonial';
      }
      return 'V-Line Treatment';
    }
    // Special handling for new-doublo pages
    else if (page === 'new-doublo' || (typeof imageUrl === 'string' && imageUrl.includes('/new-doublo/'))) {
      if (section === 'hero' || imageUrl?.includes('/hero.jpg')) {
        return 'New Doublo Treatment';
      } else if (section === 'before_after' || imageUrl?.includes('/before-after')) {
        return `Before & After ${number}`;
      } else if (section === 'technology' || imageUrl?.includes('/technology')) {
        return 'Technology Showcase';
      } else if (section === 'comparison' || imageUrl?.includes('/comparison')) {
        return 'Treatment Comparison';
      } else if (section === 'testimonials' || imageUrl?.includes('/testimonial')) {
        return 'Client Testimonial';
      }
      
      // Try to extract the service name for better labeling
      if (typeof imageUrl === 'string') {
        const parts = imageUrl.split('/');
        const serviceIndex = parts.findIndex(p => p === 'new-doublo');
        if (serviceIndex >= 0 && parts.length > serviceIndex + 1) {
          const serviceName = parts[serviceIndex + 1];
          if (serviceName === 'sculpt-lift') return 'Sculpt & Lift';
          if (serviceName === 'neck-rejuvenation') return 'Neck Rejuvenation';
          if (serviceName === 'youth-revival') return 'Youth Revival';
          return serviceName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
      }
      return 'New Doublo Treatment';
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
        'Ceramic Skin Renewal'
      ];
      
      return number <= treatmentLabels.length ? treatmentLabels[number - 1] : 'Treatment';
    }
    
    return `${type} image ${number}`;
  }
  
  const imageLabel = getImageLabel();
  
  // If using a real image and we should attempt to load it
  if (shouldUseRealImage) {
    return (
      <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-lg ${className}`}>
        <Image 
          src={imagePath}
          alt={imageLabel}
          fill
          style={{objectFit: 'cover'}}
          priority={number === 1}
          onError={() => setImageError(true)}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-2 text-center">
          <div className="text-center text-base font-medium text-white">{imageLabel}</div>
        </div>
      </div>
    );
  }
  
  // If image failed to load or wasn't provided, show a placeholder
  // Get the gradient type
  const gradientType = getGradientType();
  const gradient = gradients[gradientType] || gradients.beauty;
  
  return (
    <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-lg ${gradient} ${className} flex items-center justify-center`}>
      {/* Decorative elements */}
      {getDecorativeElements()}
      
      {/* Placeholder content */}
      <div className="text-center p-4 z-10">
        <div className="font-medium text-gray-700 mb-2">{imageError ? "Image failed to load" : imageLabel}</div>
        <div className="text-sm text-gray-500">{imageError ? imageUrl?.split('/').pop() || "Placeholder" : "Image placeholder"}</div>
      </div>
      
      {/* Image label */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-2 text-center">
        <div className="text-center text-base font-medium text-white">{imageLabel}</div>
      </div>
    </div>
  );
} 