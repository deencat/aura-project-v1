"use client"

import React from 'react';
import Image from 'next/image';
import { getValidImagePath, getFallbackImage, purgeImageCache } from '@/utils/imageUtils';
import PlaceholderImage from './PlaceholderImage';

interface TreatmentImageProps {
  category: string;
  treatment: string;
  type: 'hero' | 'how-it-works' | 'benefits' | 'results' | 'testimonial' | 'gallery' | 'technology' | 'comparison' | 'before-after';
  index?: number;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fallbackBehavior?: 'placeholder' | 'generic' | 'none';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  refreshOnError?: boolean;
}

export default function TreatmentImage({
  category,
  treatment,
  type,
  index = 0,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  quality = 80,
  sizes,
  fallbackBehavior = 'placeholder',
  objectFit = 'cover',
  refreshOnError = false
}: TreatmentImageProps) {
  const [imageSrc, setImageSrc] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [retryCount, setRetryCount] = React.useState<number>(0);
  
  // Standardize treatment slug format
  const treatmentSlug = treatment.toLowerCase().replace(/\s+/g, '-');
  
  React.useEffect(() => {
    const loadImage = async () => {
      // Reset error state when props change
      setError(false);
      
      // Construct image path based on type and index
      let path = '';
      
      // For types that support multiple images
      if (['how-it-works', 'benefits', 'results', 'gallery', 'testimonial', 'before-after', 'technology'].includes(type) && index > 0) {
        path = `/images/treatments/${category}/${treatmentSlug}/${type}-${index}.jpg`;
      } else {
        // For hero image, check if this is the youth-revival service which uses a video
        if (type === 'hero' && category === 'new-doublo' && treatmentSlug === 'youth-revival') {
          path = `/images/treatments/${category}/${treatmentSlug}/${type}.mp4`;
        } else {
          path = `/images/treatments/${category}/${treatmentSlug}/${type}.jpg`;
        }
      }
      
      // Get a valid image path or fallback
      try {
        // Force refresh of the cache every time by clearing the image source first
        setImageSrc('');
        
        const validPath = await getValidImagePath(
          path, 
          getFallbackImage(category, type)
        );
        setImageSrc(validPath);
        setError(false);
      } catch (err) {
        console.error(`Error loading image for ${category}/${treatmentSlug}/${type}:`, err);
        setError(true);
        
        // If refreshOnError is enabled and we haven't tried too many times
        if (refreshOnError && retryCount < 2) {
          // Purge the cache for this treatment
          purgeImageCache(category, treatmentSlug);
          setRetryCount(prev => prev + 1);
        }
      }
    };
    
    loadImage();
  }, [category, treatment, treatmentSlug, type, index, retryCount, refreshOnError]);
  
  // Handle error state
  if (error || !imageSrc) {
    // If fallback behavior is none, return null
    if (fallbackBehavior === 'none') {
      return null;
    }
    
    // Use placeholder component
    if (fallbackBehavior === 'placeholder') {
      return (
        <PlaceholderImage 
          className={className} 
          aspectRatio={height && width ? `aspect-[${width}/${height}]` : undefined}
          imageUrl={`/images/placeholders/${category}/${type}.jpg`}
        />
      );
    }
    
    // Use generic fallback image
    return (
      <Image
        src={`/images/placeholders/${category}/${type}.jpg`}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={className}
        priority={priority}
      />
    );
  }
  
  // Handle fill mode
  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={sizes || '100vw'}
        quality={quality}
        className={`${className || ''} ${objectFit === 'cover' ? 'object-cover' : 
          objectFit === 'contain' ? 'object-contain' : 
          objectFit === 'fill' ? 'object-fill' : ''}`}
        priority={priority}
      />
    );
  }
  
  // Standard image
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      quality={quality}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
} 