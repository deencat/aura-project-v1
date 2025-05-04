"use client"

import React from 'react';
import Image from 'next/image';
import { getValidImagePath, getFallbackImage } from '@/utils/imageUtils';
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
  sizes
}: TreatmentImageProps) {
  const [imageSrc, setImageSrc] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [blurDataUrl, setBlurDataUrl] = React.useState<string | undefined>(undefined);
  
  // Default sizes attribute based on image type if not provided
  const defaultSizes = !sizes ? {
    'hero': '100vw',
    'gallery': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    'benefits': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    'results': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
    'testimonial': '96px',
    'technology': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
    'before-after': '(max-width: 640px) 100vw, 50vw',
    'comparison': '(max-width: 640px) 100vw, 50vw',
    'how-it-works': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  }[type] : sizes;
  
  // Default dimensions based on image type if not provided
  const getDefaultDimensions = () => {
    const defaults = {
      'hero': { width: 1920, height: 1080 },
      'gallery': { width: 800, height: 600 },
      'benefits': { width: 600, height: 600 },
      'results': { width: 800, height: 800 },
      'testimonial': { width: 128, height: 128 },
      'technology': { width: 600, height: 400 },
      'before-after': { width: 800, height: 600 },
      'comparison': { width: 800, height: 500 },
      'how-it-works': { width: 600, height: 400 }
    }[type];
    
    return {
      width: width || defaults.width,
      height: height || defaults.height
    };
  };
  
  const dimensions = getDefaultDimensions();
  
  React.useEffect(() => {
    const loadImage = async () => {
      // Construct image path based on type and index
      let path = '';
      
      // For types that support multiple images
      if (['how-it-works', 'benefits', 'results', 'gallery', 'testimonial', 'before-after', 'technology'].includes(type) && index > 0) {
        path = `/images/treatments/${category}/${treatment}/${type}-${index}.jpg`;
      } else {
        // For hero image, check if this is the youth-revival service which uses a video
        if (type === 'hero' && category === 'new-doublo' && treatment === 'youth-revival') {
          path = `/images/treatments/${category}/${treatment}/${type}.mp4`;
        } else {
          path = `/images/treatments/${category}/${treatment}/${type}.jpg`;
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
        
        // Generate blur placeholder for non-hero images (smaller file size)
        if (type !== 'hero' && !['new-doublo', 'youth-revival'].includes(treatment)) {
          setBlurDataUrl(`/images/placeholders/${category}/${type}-blur.jpg`);
        }
        
        setError(false);
      } catch (err) {
        setError(true);
      }
    };
    
    loadImage();
  }, [category, treatment, type, index]);
  
  if (error || !imageSrc) {
    return (
      <PlaceholderImage 
        className={className} 
        aspectRatio={height && width ? `aspect-[${width}/${height}]` : undefined}
        imageUrl={`/images/placeholders/${category}/${type}.jpg`}
      />
    );
  }
  
  // Handle video for youth-revival
  if (type === 'hero' && category === 'new-doublo' && treatment === 'youth-revival' && imageSrc.endsWith('.mp4')) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className={className || 'w-full h-full object-cover'}
        width={dimensions.width}
        height={dimensions.height}
      >
        <source src={imageSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  
  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={defaultSizes}
        className={className || 'object-cover'}
        priority={priority || type === 'hero'} // Always prioritize hero images
        quality={quality}
        placeholder={blurDataUrl ? 'blur' : undefined}
        blurDataURL={blurDataUrl}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }
  
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      sizes={defaultSizes}
      className={className}
      priority={priority || type === 'hero'} // Always prioritize hero images
      quality={quality}
      placeholder={blurDataUrl ? 'blur' : undefined}
      blurDataURL={blurDataUrl}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
} 