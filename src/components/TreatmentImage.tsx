"use client"

import React, { useEffect, useState, useRef, Component, ErrorInfo } from 'react';
import Image from 'next/image';
import { getValidImagePath, getFallbackImage } from '@/utils/imageUtils';
import { imageLoader, getResponsiveSizes, getImageDimensions, getImagePriority, createBlurPlaceholder } from '@/utils/imageLoader';
import PlaceholderImage from './PlaceholderImage';

// Type for contentVisibility CSS property
type ContentVisibility = 'auto' | 'hidden' | 'visible';

// Error Boundary Component
class ImageErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TreatmentImage Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Define component props
export interface TreatmentImageProps {
  category: string;
  treatment: string;
  type: string;
  index?: number;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  style?: React.CSSProperties;
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Enhanced TreatmentImage component with advanced image optimization
 * - Lazy loading with Intersection Observer
 * - Blur placeholder
 * - WebP and AVIF image formats
 * - Responsive sizes for different devices
 * - Error handling and retry functionality
 */
export default function TreatmentImage({
  category,
  treatment,
  type,
  index = 1,
  alt,
  className = '',
  width,
  height,
  fill = false,
  priority = false,
  quality = 80,
  sizes,
  style,
  loading,
  onLoad,
  onError,
}: TreatmentImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Construct the image path - use a simpler version that doesn't return a Promise
  let imagePath = `/images/treatments/${category}/${treatment}/${type}${index > 1 ? `-${index}` : ''}.jpg`;
  
  // Determine the image type for responsive sizing
  const imageType = type === 'hero' ? 'hero' : 
                   type === 'gallery' ? 'gallery' : 
                   type === 'avatar' || type === 'testimonial' ? 'avatar' : 'card';
  
  // Get recommended dimensions if not explicitly provided
  const recommendedDimensions = getImageDimensions(imageType);
  const finalWidth = width || recommendedDimensions.width;
  const finalHeight = height || recommendedDimensions.height;
  
  // Get recommended sizes attribute if not explicitly provided
  const finalSizes = sizes || getResponsiveSizes(imageType);
  
  // Get priority settings
  const prioritySettings = getImagePriority(imageType);
  const finalPriority = priority || prioritySettings.priority;
  const finalLoading = loading || prioritySettings.loading;
  const fetchPriority = prioritySettings.fetchPriority;
  
  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    if (!imageRef.current || finalPriority) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px 0px', // Load images when they're 200px from viewport
        threshold: 0.01,
      }
    );
    
    observer.observe(imageRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [finalPriority]);
  
  // Handle image load event
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad();
  };
  
  // Handle image error with retry logic
  const handleError = () => {
    if (retryCount < 3) {
      // Retry loading the image
      setRetryCount(retryCount + 1);
      setHasError(false);
    } else {
      setHasError(true);
      if (onError) onError();
    }
  };
  
  // Create a test ID for automated testing
  const testId = `treatment-image-${category}-${treatment}-${type}${index > 1 ? `-${index}` : ''}`;
  
  // Fallback image in case of error
  if (hasError) {
    const fallbackImage = getFallbackImage(category, type);
    return (
      <PlaceholderImage
        type={category}
        section={type}
        number={index}
        className={className}
        aspectRatio={fill ? 'aspect-auto' : `aspect-[${finalWidth}/${finalHeight}]`}
      />
    );
  }
  
  // Apply content visibility optimization for images that will load lazily
  const visibilityStyle = !isVisible && !finalPriority
    ? { 
        ...style, 
        contentVisibility: 'auto' as ContentVisibility,
        containIntrinsicSize: `${finalWidth}px ${finalHeight}px`
      }
    : style;
  
  // Create a wrapper with correct aspect ratio to prevent layout shift
  return (
    <div 
      ref={imageRef} 
      className={`overflow-hidden ${className}`} 
      style={visibilityStyle}
      data-testid={testId}
    >
      <ImageErrorBoundary
        fallback={
          <PlaceholderImage
            type={category}
            section={type}
            number={index}
            className={className}
            aspectRatio={fill ? 'aspect-auto' : `aspect-[${finalWidth}/${finalHeight}]`}
          />
        }
      >
        {isVisible && (
          <Image
            src={imagePath}
            alt={alt}
            width={fill ? undefined : finalWidth}
            height={fill ? undefined : finalHeight}
            fill={fill}
            className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority={finalPriority}
            quality={quality}
            sizes={finalSizes}
            loading={finalLoading}
            fetchPriority={fetchPriority}
            placeholder="blur"
            blurDataURL={createBlurPlaceholder()}
            onLoad={handleLoad}
            onError={handleError}
            loader={imageLoader}
          />
        )}
      </ImageErrorBoundary>
    </div>
  );
} 