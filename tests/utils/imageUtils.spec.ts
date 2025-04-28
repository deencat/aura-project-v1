import { test, expect } from '@playwright/test';
import { fetchActualPageImages, createPlaceholderImage, getValidImagePath } from '../../src/utils/imageUtils';

test.describe('Image Utility Functions', () => {
  test('fetchActualPageImages returns correct paths for lymphatic-detox', async () => {
    const images = fetchActualPageImages('lymphatic-detox');
    
    expect(images.hero).toBe('/images/actual/body-care/lymphatic-detox/hero.jpg');
    expect(images.testimonials.length).toBe(2);
    expect(images.gallery.length).toBe(3);
    expect(images.gallery[0]).toBe('/images/actual/body-care/lymphatic-detox/gallery-1.jpg');
  });

  test('fetchActualPageImages returns correct paths for v-line', async () => {
    const images = fetchActualPageImages('v-line');
    
    expect(images.hero).toBe('/images/actual/new-doublo/v-line/hero.jpg');
    expect(images.howItWorks).toBe('/images/actual/new-doublo/v-line/how-it-works.jpg');
  });

  test('createPlaceholderImage returns correct URL', async () => {
    const url = createPlaceholderImage(300, 200, 'Test Image');
    
    expect(url).toBe('https://via.placeholder.com/300x200?text=Test%20Image');
  });

  test('getValidImagePath returns fallback for actual images', async () => {
    const actualPath = '/images/actual/body-care/lymphatic-detox/hero.jpg';
    const fallback = '/images/fallback.jpg';
    
    const result = await getValidImagePath(actualPath, fallback);
    
    expect(result).toBe(fallback);
  });

  test('getValidImagePath uses function fallback when provided', async () => {
    const actualPath = '/images/actual/facials/glow/hero.jpg';
    const fallbackFn = (width: number, height: number) => {
      return `/images/fallback-${width}x${height}.jpg`;
    };
    
    const result = await getValidImagePath(actualPath, fallbackFn);
    
    expect(result).toBe('/images/fallback-800x600.jpg');
  });

  test('getValidImagePath returns original path for non-actual images', async () => {
    const normalPath = '/images/regular-image.jpg';
    const fallback = '/images/fallback.jpg';
    
    const result = await getValidImagePath(normalPath, fallback);
    
    expect(result).toBe(normalPath);
  });
}); 