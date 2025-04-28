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
  
  // Use new function with determined category
  return getPageImages(category, slug);
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
    // In a real implementation, this would check if the file exists
    // For now, we'll use a simple heuristic:
    // If the path includes '/treatments/' but not the specific sections,
    // we'll assume it doesn't exist yet and use the fallback
    
    if (imagePath.includes('/treatments/') && !imagePath.includes('/placeholders/')) {
      const response = await fetch(imagePath, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Image not found');
      }
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