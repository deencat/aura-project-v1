"use client";

import { StaticImageData } from "next/image";

export type ImageFormat = 'image/webp' | 'image/avif' | 'image/jpeg' | 'image/png';

interface ImageLoaderProps {
  src: string | StaticImageData;
  width: number;
  quality?: number;
  format?: ImageFormat;
}

/**
 * Custom image loader that formats URLs for optimal loading with explicit format support
 * Can be used with Next.js Image component's loader prop
 */
export function imageLoader({ src, width, quality = 75, format }: ImageLoaderProps): string {
  // Handle StaticImageData objects
  let srcString: string;
  if (typeof src !== 'string') {
    srcString = src.src;
  } else {
    srcString = src;
  }
  
  // For external URLs
  if (srcString.startsWith('http')) {
    // Check for supported CDNs and optimize accordingly
    if (srcString.includes('cloudinary.com')) {
      // Cloudinary optimization format
      const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality}`];
      return `${srcString.split('upload/')[0]}upload/${params.join(',')}/${srcString.split('upload/')[1]}`;
    }
    
    // Generic URL params for other hosts - just append width and quality
    const separator = srcString.includes('?') ? '&' : '?';
    let url = `${srcString}${separator}w=${width}&q=${quality}`;
    
    // Add format param if specified
    if (format) {
      url += `&fm=${format.split('/')[1]}`;
    }
    
    return url;
  }
  
  // For local images
  // If internal Next.js URLs (starting with _next/image)
  if (srcString.startsWith('/_next/image')) {
    return srcString;
  }
  
  // For other local images, prepare them for Next.js image API
  return `/_next/image?url=${encodeURIComponent(srcString)}&w=${width}&q=${quality}${format ? `&f=${format.split('/')[1]}` : ''}`;
}

/**
 * Returns breakpoint sizes string for responsive images
 * @param type Different preset size configurations for different image types
 * @returns sizes attribute string
 */
export function getResponsiveSizes(type: 'hero' | 'gallery' | 'card' | 'avatar' | 'full' | 'half' | 'third'): string {
  switch (type) {
    case 'hero':
      return '100vw';
    case 'gallery':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px';
    case 'avatar':
      return '(max-width: 640px) 64px, 128px';
    case 'full':
      return '100vw';
    case 'half':
      return '(max-width: 640px) 100vw, 50vw';
    case 'third':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    default:
      return '100vw';
  }
}

/**
 * Returns device-specific dimensions for responsive images
 * @param type Different preset dimensions for different image types
 */
export function getImageDimensions(type: 'hero' | 'gallery' | 'card' | 'avatar' | 'full' | 'half' | 'third'): { width: number, height: number } {
  switch (type) {
    case 'hero':
      return { width: 1920, height: 1080 };
    case 'gallery':
      return { width: 800, height: 600 };
    case 'card':
      return { width: 384, height: 256 };
    case 'avatar':
      return { width: 128, height: 128 };
    case 'full':
      return { width: 1200, height: 800 };
    case 'half':
      return { width: 600, height: 400 };
    case 'third':
      return { width: 384, height: 256 };
    default:
      return { width: 800, height: 600 };
  }
}

/**
 * Constructs a blur placeholder data URL for images that don't have one
 * @param color Background color in hex format
 * @returns Base64 encoded SVG image
 */
export function createBlurPlaceholder(color: string = '#f8f8f8'): string {
  // Create a simple SVG with the specified background color
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="${color}" /></svg>`;
  
  // In browser environments, use window.btoa
  if (typeof window !== 'undefined') {
    return `data:image/svg+xml;base64,${window.btoa(svg)}`;
  }
  
  // In Node.js environments, use Buffer
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Returns prioritization info for different image types
 * @param type Image type
 * @returns Object with priority flag and loading strategy
 */
export function getImagePriority(type: 'hero' | 'gallery' | 'card' | 'avatar' | 'full' | 'half' | 'third'): {
  priority: boolean,
  loading: 'eager' | 'lazy',
  fetchPriority: 'high' | 'auto' | 'low'
} {
  switch (type) {
    case 'hero':
      return { priority: true, loading: 'eager', fetchPriority: 'high' };
    case 'avatar':
      return { priority: false, loading: 'eager', fetchPriority: 'auto' };
    default:
      return { priority: false, loading: 'lazy', fetchPriority: 'auto' };
  }
} 