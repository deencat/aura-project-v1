import { test, expect } from '@playwright/test';

test.describe('Collagen Regeneration Page', () => {
  test.beforeEach(async ({ baseURL }) => {
    console.log(`Using base URL: ${baseURL}`);
  });

  test('loads correctly with TreatmentImage components', async ({ page, baseURL }) => {
    // Navigate to the Collagen Regeneration page
    await page.goto('/treatments/collagen-regeneration');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1, name: /Collagen/i })).toBeVisible();
    
    // Check if images are visible rather than checking for broken images
    const visibleImages = await page.locator('img').filter({ hasText: '' }).count();
    console.log(`Found ${visibleImages} visible images on the page`);
    expect(visibleImages).toBeGreaterThan(0);
    
    // Verify the hero image is loaded
    const heroSection = await page.locator('section').first();
    const heroImage = await heroSection.locator('img').first();
    await expect(heroImage).toBeVisible();
    
    // Verify carousel images are loaded if present
    const carouselImages = await page.locator('div.aspect-square img');
    const imagesCount = await carouselImages.count();
    if (imagesCount > 0) {
      console.log(`Found ${imagesCount} carousel images`);
      await expect(carouselImages.first()).toBeVisible();
    }
    
    // Verify carousel navigation works if there's a carousel
    const carouselIndicators = await page.locator('button[aria-label^="Go to slide"]').count();
    if (carouselIndicators > 0) {
      await page.locator('button[aria-label="Go to slide 2"]').click();
    }
    
    // Check if the Treatment Benefits section is visible
    await expect(page.getByRole('heading', { name: /Benefits|Treatment Benefits/i })).toBeVisible();
    
    // Check if the FAQ section is visible
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
    
    // Check if the Book Now button is visible
    const bookButtons = await page.getByRole('button', { name: /Book/i }).count();
    expect(bookButtons).toBeGreaterThan(0);
  });
  
  test('TreatmentImage components are used on the page', async ({ page }) => {
    // Navigate to the page
    await page.goto('/treatments/collagen-regeneration');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check for images with src attribute (to ensure images are loaded)
    const visibleImages = await page.locator('img[src]').count();
    console.log(`Found ${visibleImages} images with src attribute`);
    expect(visibleImages).toBeGreaterThan(0);
    
    // Verify the hero section has an image
    const heroSection = page.locator('section').first();
    const heroImage = heroSection.locator('img');
    await expect(heroImage).toBeVisible();
    
    // Verify the src attribute exists for the hero image
    const heroSrc = await heroImage.getAttribute('src');
    expect(heroSrc).toBeTruthy();
    console.log(`Hero image src: ${heroSrc}`);
    
    // Verify at least one benefits section image is visible if present
    const benefitsSection = page.getByRole('heading', { name: /Benefits/i }).locator('xpath=../../../../..');
    if (await benefitsSection.count() > 0) {
      const benefitsImages = benefitsSection.locator('img');
      if (await benefitsImages.count() > 0) {
        await expect(benefitsImages.first()).toBeVisible();
      }
    }
  });
}); 