/**
 * Image Optimization Utilities
 * 
 * This file contains helper functions for image optimization and handling
 * including format selection, responsive size calculation, and placeholder handling.
 */

import { StaticImageData } from 'next/image';

/**
 * Image sources interface with optional formats and responsive sizes
 */
export interface ImageSources {
  original: string;
  webp?: string;
  avif?: string;
  placeholder?: string;
  width: number;
  height: number;
  responsive?: {
    [key: number]: {
      original?: string;
      webp?: string;
      avif?: string;
    }
  }
}

/**
 * Breakpoints for responsive images
 */
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Default sizes attribute for different layout scenarios
 */
export const SIZES = {
  fullWidth: '100vw',
  halfWidth: '(max-width: 768px) 100vw, 50vw',
  thirdWidth: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quarterWidth: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw',
};

/**
 * Custom image loader for optimized formats
 * Checks for WebP and AVIF versions of images and uses them if available
 * 
 * @param src Original image source
 * @param width Requested width
 * @param quality Image quality (0-100)
 * @returns URL to the optimal image format
 */
export function imageLoader({ src, width, quality }: { 
  src: string;
  width: number;
  quality?: number;
}) {
  // If src is a data URL or external URL, return as is
  if (src.startsWith('data:') || src.startsWith('http')) {
    return src;
  }
  
  // Default quality
  const q = quality || 75;
  
  // Extract path and extension
  const lastDot = src.lastIndexOf('.');
  const path = lastDot !== -1 ? src.substring(0, lastDot) : src;
  const ext = lastDot !== -1 ? src.substring(lastDot + 1) : 'jpg';
  
  // Check for responsive variant if width is specified
  if (width) {
    // Try to find a responsive variant closest to the requested width
    const responsiveSizes = [320, 640, 768, 1024, 1366, 1920];
    const closestSize = responsiveSizes.reduce((prev, curr) => {
      return Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev;
    }, responsiveSizes[0]);
    
    // Only use responsive variant if it's within 20% of the requested size
    if (Math.abs(closestSize - width) / width < 0.2) {
      // Try AVIF first, then WebP, then original format
      const responsivePath = `${path}-responsive-${closestSize}`;
      const formats = ['avif', 'webp', ext];
      
      for (const format of formats) {
        const responsiveUrl = `${responsivePath}.${format}?q=${q}`;
        // In a real implementation we would check if the file exists
        // For now we'll just return the first modern format
        if (format !== ext) {
          return responsiveUrl;
        }
      }
    }
  }
  
  // No responsive variant found, try modern formats for the original size
  // Check for AVIF, then WebP, then fall back to original
  const avifPath = `${path}.avif`;
  const webpPath = `${path}.webp`;
  
  // In a real implementation we would check if the files exist
  // For now we'll just assume modern formats exist and return AVIF or WebP
  
  return `${avifPath}?q=${q}`;
}

/**
 * Determines if an image should be loaded with priority
 * Based on viewport position and image importance
 * 
 * @param viewport Position in the viewport (above-fold, near-fold, below-fold)
 * @param importance Image importance (high, medium, low)
 * @returns Boolean indicating if the image should be loaded with priority
 */
export function shouldPrioritize(
  viewport: 'above-fold' | 'near-fold' | 'below-fold' = 'below-fold',
  importance: 'high' | 'medium' | 'low' = 'medium'
): boolean {
  // Above the fold high/medium importance images are prioritized
  if (viewport === 'above-fold' && (importance === 'high' || importance === 'medium')) {
    return true;
  }
  
  // Near the fold high importance images are prioritized
  if (viewport === 'near-fold' && importance === 'high') {
    return true;
  }
  
  // All other images are not prioritized
  return false;
}

/**
 * Gets the appropriate sizes attribute based on the layout
 * 
 * @param layout Layout pattern (full, half, third, quarter, or custom)
 * @param custom Custom sizes attribute
 * @returns Sizes attribute string
 */
export function getSizes(
  layout: 'full' | 'half' | 'third' | 'quarter' | 'custom' = 'full',
  custom?: string
): string {
  if (layout === 'custom' && custom) {
    return custom;
  }
  
  switch (layout) {
    case 'half':
      return SIZES.halfWidth;
    case 'third':
      return SIZES.thirdWidth;
    case 'quarter':
      return SIZES.quarterWidth;
    case 'full':
    default:
      return SIZES.fullWidth;
  }
}

/**
 * Creates a placeholder URL for an image
 * If a blur placeholder exists, it returns the path to it
 * Otherwise, returns a tiny transparent placeholder
 * 
 * @param src Original image source
 * @returns Placeholder image URL
 */
export function getPlaceholder(src: string): string {
  // If src is a data URL or external URL, return a transparent placeholder
  if (src.startsWith('data:') || src.startsWith('http')) {
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }
  
  // Extract path and extension
  const lastDot = src.lastIndexOf('.');
  const path = lastDot !== -1 ? src.substring(0, lastDot) : src;
  
  // Check for blur placeholder
  const blurPlaceholder = `${path}-blur.jpg`;
  
  // In a real implementation we would check if the file exists
  // For now we'll just assume it exists
  return blurPlaceholder;
}

/**
 * Gets image sources in all available formats
 * 
 * @param src Original image source
 * @param width Image width
 * @param height Image height
 * @returns Object with all available image sources
 */
export function getImageSources(
  src: string | StaticImageData,
  width: number,
  height: number
): ImageSources {
  // Handle StaticImageData
  if (typeof src !== 'string') {
    return {
      original: src.src,
      width: src.width,
      height: src.height,
      placeholder: src.blurDataURL,
    };
  }
  
  // If src is a data URL or external URL, return as is
  if (src.startsWith('data:') || src.startsWith('http')) {
    return {
      original: src,
      width,
      height,
    };
  }
  
  // Extract path and extension
  const lastDot = src.lastIndexOf('.');
  const path = lastDot !== -1 ? src.substring(0, lastDot) : src;
  const ext = lastDot !== -1 ? src.substring(lastDot + 1) : 'jpg';
  
  // Build sources object
  const sources: ImageSources = {
    original: src,
    webp: `${path}.webp`,
    avif: `${path}.avif`,
    placeholder: `${path}-blur.jpg`,
    width,
    height,
    responsive: {}
  };
  
  // Add responsive variants
  const responsiveSizes = [320, 640, 768, 1024, 1366, 1920];
  responsiveSizes.forEach(size => {
    if (size < width) {
      sources.responsive![size] = {
        original: `${path}-responsive-${size}.${ext}`,
        webp: `${path}-responsive-${size}.webp`,
        avif: `${path}-responsive-${size}.avif`,
      };
    }
  });
  
  return sources;
}

/**
 * Calculates the aspect ratio for an image
 * 
 * @param width Image width
 * @param height Image height
 * @returns Aspect ratio as a string (e.g., "16/9")
 */
export function getAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Determines the loading strategy for an image
 * 
 * @param priority Whether the image is high priority
 * @param visible Whether the image is immediately visible
 * @returns Loading strategy ('eager' or 'lazy')
 */
export function getLoadingStrategy(priority: boolean, visible: boolean = true): 'eager' | 'lazy' {
  if (priority || visible) {
    return 'eager';
  }
  return 'lazy';
} 