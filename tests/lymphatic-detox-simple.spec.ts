import { test, expect } from '@playwright/test';
import { fetchActualPageImages, getValidImagePath } from '../src/utils/imageUtils';

test.describe('Lymphatic Detox Page Simple Tests', () => {
  test('page loads successfully', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Check page title and button
    await expect(page.getByRole('heading', { name: /Dual-Action Lymphatic Detox/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'BOOK NOW', exact: true })).toBeVisible();
  });
  
  test('book now button navigates to contact page', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Click the booking button
    await page.getByRole('button', { name: 'BOOK NOW', exact: true }).click();
    
    // Verify navigation to contact page
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/.*\/contact/);
  });
  
  test('image paths are correctly formatted and processed', async () => {
    // Get the image paths for the lymphatic detox page
    const imagePaths = fetchActualPageImages('lymphatic-detox');
    
    // Verify the hero image path
    expect(imagePaths.hero).toBe('/images/actual/body-care/lymphatic-detox/hero.jpg');
    
    // Test that getValidImagePath returns fallback for actual images
    const fallbackPath = '/images/fallback-hero.jpg';
    const processedPath = await getValidImagePath(imagePaths.hero, fallbackPath);
    expect(processedPath).toBe(fallbackPath);
    
    // Verify gallery images
    expect(imagePaths.gallery.length).toBeGreaterThan(0);
    expect(imagePaths.gallery[0]).toContain('/images/actual/body-care/lymphatic-detox/gallery-');
  });
}); 