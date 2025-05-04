import { test, expect } from '@playwright/test';

test.describe('Farewell Puffy Page', () => {
  test.beforeEach(async ({ baseURL }) => {
    console.log(`Using base URL: ${baseURL}`);
  });

  test('loads correctly with TreatmentImage components', async ({ page, baseURL }) => {
    // Navigate to the Farewell Puffy page
    await page.goto('/treatments/farewell-puffy');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1, name: /Farewell Puffy/i })).toBeVisible();
    
    // Check if all images are loaded without broken images
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => !img.complete || img.naturalWidth === 0).length;
    });
    
    // There should be no broken images on the page
    expect(brokenImages).toBe(0);
    
    // Verify the hero image is loaded
    const heroSection = await page.locator('section').first();
    const heroImage = await heroSection.locator('img').first();
    await expect(heroImage).toBeVisible();
    
    // Verify carousel images are loaded if present
    const carouselImages = await page.locator('div.aspect-square img');
    const imagesCount = await carouselImages.count();
    expect(imagesCount).toBeGreaterThan(0);
    
    // Check the first carousel image if it exists
    if (imagesCount > 0) {
      await expect(carouselImages.first()).toBeVisible();
    }
    
    // Verify carousel navigation works if there's a carousel
    const carouselIndicators = await page.locator('button[aria-label^="Go to slide"]').count();
    if (carouselIndicators > 0) {
      await page.locator('button[aria-label="Go to slide 2"]').click();
    }
    
    // Check if the Treatment Benefits section is visible
    await expect(page.getByRole('heading', { name: /Benefits of Farewell Puffy/i })).toBeVisible();
    
    // Check if the FAQ section is visible
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
    
    // Check if the Book Now button is visible
    const bookButtons = await page.getByRole('link', { name: /Book/i }).count();
    expect(bookButtons).toBeGreaterThan(0);
  });
  
  test('TreatmentImage fallbacks work properly', async ({ page }) => {
    // Navigate to the page
    await page.goto('/treatments/farewell-puffy');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check for images with src attribute (to ensure images are loaded)
    const visibleImages = await page.locator('img[src]').count();
    expect(visibleImages).toBeGreaterThan(0);
    
    // Verify that there are no broken images on the page
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => !img.complete || img.naturalWidth === 0).length;
    });
    
    // There should be no broken images, verifying fallbacks work
    expect(brokenImages).toBe(0);
    
    // Check for placeholder images in case fallbacks are used
    const fallbackImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => 
        img.src.includes('placeholder') || 
        img.src.includes('/images/placeholders/')
      ).length;
    });
    
    // Log the results for debugging
    console.log(`Found ${fallbackImages} fallback images out of ${visibleImages} total images`);
  });
}); 