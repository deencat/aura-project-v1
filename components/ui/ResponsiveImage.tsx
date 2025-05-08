import React, { useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { 
  imageLoader, 
  getPlaceholder, 
  getSizes, 
  getLoadingStrategy 
} from '@/lib/utils/image-utils';

export interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: string | 'blur' | 'empty';
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * ResponsiveImage Component
 * 
 * A generic responsive image component with:
 * - Modern format support (WebP/AVIF)
 * - Lazy loading with Intersection Observer
 * - Placeholder support
 * - Error handling
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder: customPlaceholder,
  sizes = '100vw',
  objectFit = 'cover',
  onLoad,
  onError,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  
  // Use Intersection Observer to detect when image is in viewport
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Load images 200px before they enter viewport
  });

  // Determine loading strategy based on priority and visibility
  const loading = getLoadingStrategy(priority, inView);
  
  // Get placeholder
  const placeholderSrc = customPlaceholder && customPlaceholder !== 'blur' && customPlaceholder !== 'empty'
    ? customPlaceholder
    : getPlaceholder(src);

  // Handle image load
  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle image error
  const handleError = () => {
    setError(true);
    if (onError) onError();
  };

  // Show fallback for errors
  if (error) {
    return (
      <div 
        className={`relative bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400">Image not available</span>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={`relative ${className}`}
      style={{ 
        width: '100%',
        maxWidth: width,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      {inView || priority ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-auto ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          loader={imageLoader}
          quality={quality}
          priority={priority}
          loading={loading}
          sizes={sizes}
          placeholder={customPlaceholder === 'blur' || (!customPlaceholder && placeholderSrc) ? 'blur' : 'empty'}
          blurDataURL={placeholderSrc}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit,
            width: '100%',
            height: 'auto',
          }}
        />
      ) : null}
      
      {/* Placeholder while image is loading */}
      {!loaded && placeholderSrc && customPlaceholder !== 'empty' && (
        <div 
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ 
            backgroundImage: `url(${placeholderSrc})`,
            opacity: 0.5,
          }}
        />
      )}
    </div>
  );
};

export default ResponsiveImage; 