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
  priority = false
}: TreatmentImageProps) {
  const [imageSrc, setImageSrc] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  
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
  
  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className || 'object-cover'}
        priority={priority}
      />
    );
  }
  
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
    />
  );
} 