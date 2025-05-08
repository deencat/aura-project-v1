'use client'

import React from 'react'
import Image from 'next/image'

interface PlaceholderImageProps {
  type?: string
  number?: number
  page?: string
  section?: string
  aspectRatio?: string
  className?: string
  imageUrl?: string
}

/**
 * Placeholder image component used when a TreatmentImage fails to load
 * or during loading states
 */
export default function PlaceholderImage({
  type = 'beauty',
  number = 1,
  page,
  section,
  aspectRatio = 'aspect-[16/9]',
  className = '',
  imageUrl,
}: PlaceholderImageProps) {
  // Default placeholder for fallback
  const defaultPlaceholder = 'data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmOGY4ZjgiIC8+Cjwvc3ZnPg==';
  
  // Determine image source
  let src = imageUrl;
  
  if (!src) {
    // If no imageUrl is provided, use the type/number-based path
    if (page && section) {
      src = `/images/placeholders/${page}/${section}-${number}.jpg`;
    } else {
      src = `/images/placeholders/${type}-${number}.jpg`;
    }
  }
  
  // Image doesn't exist or failed to load
  const handleImageError = () => {
    console.warn(`Failed to load placeholder image: ${src}`);
    // We'll keep the default styling and use the SVG placeholder
  };
  
  return (
    <div className={`relative ${aspectRatio} overflow-hidden bg-gray-100 ${className}`}>
      {src.startsWith('data:') ? (
        // If it's a data URL (base64 SVG), render it directly
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-50"
          aria-label="Image placeholder"
        >
          <svg 
            className="w-10 h-10 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ) : (
        // Otherwise, use next/image
        <Image
          src={src}
          alt="Placeholder image"
          fill
          onError={handleImageError}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
          quality={60}
        />
      )}
    </div>
  );
} 