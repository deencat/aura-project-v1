import React from 'react';
import { render, screen } from '@testing-library/react';
import TreatmentImage from '@/components/ui/TreatmentImage';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

// Mock the useInView hook
jest.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: jest.fn(), inView: true }),
}));

// Mock the image-utils functions
jest.mock('@/lib/utils/image-utils', () => ({
  imageLoader: ({ src }) => src,
  getPlaceholder: () => 'data:image/gif;base64,placeholder',
  getSizes: () => '100vw',
  getLoadingStrategy: () => 'eager',
}));

describe('Image Components', () => {
  describe('TreatmentImage', () => {
    it('renders correctly with required props', () => {
      render(
        <TreatmentImage
          src="/test-image.jpg"
          alt="Test image"
          width={500}
          height={300}
        />
      );
      
      const img = screen.getByAltText('Test image');
      expect(img).toBeInTheDocument();
    });
    
    it('handles error state', () => {
      render(
        <TreatmentImage
          src="/non-existent.jpg"
          alt="Missing image"
          width={500}
          height={300}
          onError={() => {
            // Trigger error manually for testing
            const event = new Event('error');
            const img = screen.getByAltText('Missing image');
            img.dispatchEvent(event);
          }}
        />
      );
      
      // After error, we should see the fallback
      const fallback = screen.getByText('Image not available');
      expect(fallback).toBeInTheDocument();
    });
  });
  
  describe('ResponsiveImage', () => {
    it('renders correctly with required props', () => {
      render(
        <ResponsiveImage
          src="/test-image.jpg"
          alt="Test responsive image"
          width={800}
          height={600}
        />
      );
      
      const img = screen.getByAltText('Test responsive image');
      expect(img).toBeInTheDocument();
    });
    
    it('applies custom objectFit style', () => {
      render(
        <ResponsiveImage
          src="/test-image.jpg"
          alt="Test responsive image"
          width={800}
          height={600}
          objectFit="contain"
        />
      );
      
      const img = screen.getByAltText('Test responsive image');
      expect(img).toHaveStyle('object-fit: contain');
    });
  });
}); 