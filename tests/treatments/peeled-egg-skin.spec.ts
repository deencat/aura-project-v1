import { test, expect } from '@playwright/test';

test.describe('Peeled Egg Skin Page', () => {
  test.beforeEach(async ({ baseURL }) => {
    console.log(`Using base URL: ${baseURL}`);
  });

  test('loads correctly with TreatmentImage components', async ({ page, baseURL }) => {
    // Navigate to the Peeled Egg Skin page
    await page.goto('/treatments/peeled-egg-skin');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1, name: /Peeled Egg Skin/i })).toBeVisible();
    
    // Check if all images are loaded (either actual or placeholder images)
    const imagesStatus = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const broken = images.filter(img => !img.complete || img.naturalWidth === 0).length;
      const total = images.length;
      const withSrc = images.filter(img => img.hasAttribute('src')).length;
      return { broken, total, withSrc };
    });
    
    console.log(`Image status: ${JSON.stringify(imagesStatus)}`);
    
    // Verify we have some images with src attributes
    expect(imagesStatus.withSrc).toBeGreaterThan(0);
    
    // Verify the hero image section exists
    const heroSection = await page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Check if the Treatment Benefits section is visible
    await expect(page.getByRole('heading', { name: /Benefits of Peeled Egg Skin/i })).toBeVisible();
    
    // Check if the FAQ section is visible
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
    
    // Check if the Book Now button is visible
    const bookButtons = await page.getByRole('link', { name: /Book/i }).count();
    expect(bookButtons).toBeGreaterThan(0);
  });
  
  test('TreatmentImage fallbacks work properly', async ({ page }) => {
    // Navigate to the page
    await page.goto('/treatments/peeled-egg-skin');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check for images with src attribute (to ensure images are loaded)
    const imagesStatus = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const broken = images.filter(img => !img.complete || img.naturalWidth === 0).length;
      const total = images.length;
      const withSrc = images.filter(img => img.hasAttribute('src')).length;
      const fallbacks = images.filter(img => 
        img.src.includes('placeholder') || 
        img.src.includes('/images/placeholders/')
      ).length;
      return { broken, total, withSrc, fallbacks };
    });
    
    console.log(`Image status: ${JSON.stringify(imagesStatus)}`);
    
    // Verify we have images
    expect(imagesStatus.total).toBeGreaterThan(0);
    
    // Verify we have some images with src attributes
    expect(imagesStatus.withSrc).toBeGreaterThan(0);
  });
}); 