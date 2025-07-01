/**
 * Utility functions for handling images across the application
 */

/**
 * Fetches images for a given treatment
 * 
 * @param category - The treatment category (e.g., "body-care", "new-doublo", "facials")
 * @param slug - The treatment slug (e.g., "lymphatic-detox", "v-line", "sculpt-lift")
 * @returns Object containing paths to images for different page sections
 */
export function getPageImages(category: string, slug: string) {
  // Base path for all treatment images
  const basePath = `/images/treatments/${category}/${slug}`;
  
  // Return structured image paths
  return {
    hero: `${basePath}/hero.jpg`,
    howItWorks: [1, 2, 3].map(n => `${basePath}/how-it-works-${n}.jpg`),
    benefits: [1, 2].map(n => `${basePath}/benefits-${n}.jpg`),
    results: [1, 2].map(n => `${basePath}/results-${n}.jpg`),
    testimonials: [1, 2].map(n => `${basePath}/testimonial-${n}.jpg`),
    gallery: [1, 2, 3].map(n => `${basePath}/gallery-${n}.jpg`),
    beforeAfter: [1, 2].map(n => `${basePath}/before-after-${n}.jpg`),
    technology: `${basePath}/technology.jpg`,
    comparison: `${basePath}/comparison.jpg`
  };
}

/**
 * Legacy function - maintained for backward compatibility
 * Use getPageImages instead for new code
 */
export function fetchActualPageImages(slug: string) {
  // Determine category from slug
  let category = 'body-care';
  
  if (slug.includes('doublo') || slug === 'v-line' || slug === 'sculpt-lift') {
    category = 'new-doublo';
  } else if (slug.includes('facial') || slug.includes('glow')) {
    category = 'facials';
  }
  
  // Return actual image paths (tests expect these to use /images/actual/ prefix)
  const basePath = `/images/actual/${category}/${slug}`;
  
  return {
    hero: `${basePath}/hero.jpg`,
    howItWorks: [1, 2, 3].map(n => `${basePath}/how-it-works-${n}.jpg`),
    benefits: [1, 2].map(n => `${basePath}/benefits-${n}.jpg`),
    results: [1, 2].map(n => `${basePath}/results-${n}.jpg`),
    testimonials: [1, 2].map(n => `${basePath}/testimonial-${n}.jpg`),
    gallery: [1, 2, 3].map(n => `${basePath}/gallery-${n}.jpg`),
    beforeAfter: [1, 2].map(n => `${basePath}/before-after-${n}.jpg`),
    technology: `${basePath}/technology.jpg`,
    comparison: `${basePath}/comparison.jpg`
  };
}

/**
 * Creates placeholder images for development and testing
 * 
 * @param width - Width of the placeholder image
 * @param height - Height of the placeholder image
 * @param text - Text to display on the placeholder image
 * @returns URL string for the placeholder image
 */
export function createPlaceholderImage(width: number, height: number, text: string = 'Placeholder') {
  const encodedText = encodeURIComponent(text);
  return `https://via.placeholder.com/${width}x${height}?text=${encodedText}`;
}

/**
 * Checks if an image exists and returns a fallback if it doesn't
 * 
 * @param imagePath - Path to the image to check
 * @param fallback - Fallback image path or function to generate a fallback
 * @returns Promise resolving to the valid image path or fallback
 */
export async function getValidImagePath(
  imagePath: string, 
  fallback: string | ((width?: number, height?: number) => string)
): Promise<string> {
  try {
    // If the path includes '/actual/', these are test images that don't exist
    // Return the fallback immediately for actual paths
    if (imagePath.includes('/actual/')) {
      throw new Error('Actual image path - use fallback');
    }
    
    // For treatment images, check if they exist
    if (imagePath.includes('/treatments/') && !imagePath.includes('/placeholders/')) {
      // Add cache busting parameter using the cache version
      const cacheVersion = getImageCacheVersion();
      const imagePathWithCacheBuster = `${imagePath}?v=${cacheVersion}`;
      
      const response = await fetch(imagePathWithCacheBuster, { 
        method: 'HEAD',
        cache: 'no-cache' // Avoid cache when checking for the image
      });
      
      if (!response.ok) {
        throw new Error('Image not found');
      }
      
      // Return path with cache buster to force browser to load the newest version
      return imagePathWithCacheBuster;
    }
    
    return imagePath;
  } catch (error) {
    if (typeof fallback === 'function') {
      return fallback(800, 600);
    }
    return fallback;
  }
}

/**
 * Helper function to get a fallback image for missing treatment images
 * 
 * @param category - The treatment category
 * @param section - The section name (hero, benefits, etc.)
 * @returns Path to the fallback image
 */
export function getFallbackImage(category: string, section: string): string {
  return `/images/placeholders/${category}/${section}.jpg`;
}

// Map to store timestamps for purged images
const imageCacheMap = new Map<string, number>();

// Constants
const CACHE_VERSION_KEY = 'imageCacheVersion';
const IMAGE_CACHE_MAP_KEY = 'imageCacheMap';
const DEBUG_MODE = process.env.NODE_ENV === 'development';

/**
 * Debug logging helper - only logs in development mode
 */
function logDebug(message: string, data?: any): void {
  if (!DEBUG_MODE) return;
  
  if (data) {
    console.log(`🖼️ [ImageUtils] ${message}`, data);
  } else {
    console.log(`🖼️ [ImageUtils] ${message}`);
  }
}

// Load image cache map from storage if available
if (typeof window !== 'undefined') {
  try {
    const storedCacheMap = localStorage.getItem(IMAGE_CACHE_MAP_KEY);
    if (storedCacheMap) {
      const cacheEntries = JSON.parse(storedCacheMap);
      Object.entries(cacheEntries).forEach(([key, value]) => {
        imageCacheMap.set(key, value as number);
      });
      logDebug(`Loaded image cache map with ${imageCacheMap.size} entries`);
    }
  } catch (error) {
    console.error('Error loading image cache map:', error);
  }
}

/**
 * Saves the image cache map to localStorage
 */
function saveImageCacheMap(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheObject: Record<string, number> = {};
    imageCacheMap.forEach((value, key) => {
      cacheObject[key] = value;
    });
    
    localStorage.setItem(IMAGE_CACHE_MAP_KEY, JSON.stringify(cacheObject));
    logDebug(`Saved image cache map with ${imageCacheMap.size} entries`);
  } catch (error) {
    console.error('Error saving image cache map:', error);
  }
}

/**
 * Purges the image cache for a specific treatment by updating the cache version
 * This forces the browser to reload images rather than using cached versions
 * 
 * @param category - The treatment category
 * @param treatment - The treatment name
 */
export function purgeImageCache(category?: string, treatment?: string): void {
  if (typeof window === 'undefined') return;
  
  // Generate new timestamp
  const timestamp = Date.now();
  
  // Set new cache version
  localStorage.setItem(CACHE_VERSION_KEY, timestamp.toString());
  
  // If category and treatment are provided, update the imageCacheMap as well
  if (category && treatment) {
    const key = `${category}/${treatment}`;
    imageCacheMap.set(key, timestamp);
    
    // Save updated map to storage
    saveImageCacheMap();
    
    logDebug(`Purged image cache for ${key} (timestamp: ${timestamp})`);
  } else {
    logDebug(`Purged global image cache (timestamp: ${timestamp})`);
  }
  
  // If we're in development mode, log this action
  if (process.env.NODE_ENV === 'development') {
    console.log(`🧹 Image cache purged${category ? ` for ${category}/${treatment}` : ''}. New version: ${timestamp}`);
  }
}

/**
 * Gets a cache-busting URL for an image based on its service
 * 
 * @param imagePath The path of the image
 * @param category The service category
 * @param slug The service slug
 * @returns A cache-busting URL for the image
 */
export function getCacheBustedImageUrl(
  imagePath: string, 
  category?: string, 
  slug?: string
): string {
  if (!imagePath) return '';
  
  // If no category/slug provided, use the full image path to extract it
  let cacheKey = '';
  
  if (category && slug) {
    cacheKey = `${category}/${slug}`;
  } else {
    // Try to extract from image path
    const match = imagePath.match(/\/([\w-]+)\/([\w-]+)\//);
    if (match && match.length >= 3) {
      cacheKey = `${match[1]}/${match[2]}`;
    }
  }
  
  let timestamp: number | undefined;
  
  // Add timestamp parameter for cache busting if we have a key
  if (cacheKey && imageCacheMap.has(cacheKey)) {
    timestamp = imageCacheMap.get(cacheKey);
  } else {
    // Fallback to global cache version
    try {
      if (typeof window !== 'undefined') {
        const cacheVersion = localStorage.getItem(CACHE_VERSION_KEY);
        if (cacheVersion) {
          timestamp = parseInt(cacheVersion);
        } else {
          timestamp = Date.now();
          localStorage.setItem(CACHE_VERSION_KEY, timestamp.toString());
        }
      } else {
        timestamp = Date.now();
      }
    } catch (error) {
      timestamp = Date.now();
      console.error('Error accessing cache version:', error);
    }
  }
  
  if (timestamp) {
    const separator = imagePath.includes('?') ? '&' : '?';
    const cachedUrl = `${imagePath}${separator}t=${timestamp}`;
    
    // Log in debug mode
    if (DEBUG_MODE && cacheKey) {
      logDebug(`Cache-busted URL for ${cacheKey}: ${cachedUrl}`);
    }
    
    return cachedUrl;
  }
  
  return imagePath;
}

// Add a cache version timestamp in localStorage to help with cache busting
export function getImageCacheVersion(): string {
  // Initialize if not set
  if (typeof window !== 'undefined' && !localStorage.getItem(CACHE_VERSION_KEY)) {
    const timestamp = Date.now().toString();
    localStorage.setItem(CACHE_VERSION_KEY, timestamp);
    logDebug(`Initialized cache version: ${timestamp}`);
    return timestamp;
  }
  
  // Return current version or generate a new one
  if (typeof window !== 'undefined') {
    const version = localStorage.getItem(CACHE_VERSION_KEY) || Date.now().toString();
    return version;
  }
  
  return Date.now().toString();
} 