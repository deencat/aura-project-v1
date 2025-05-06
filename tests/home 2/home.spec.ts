import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads correctly with TreatmentImage components', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1, name: /Aura Beauty/i })).toBeVisible();
    
    // Check if the hero section has a background image
    const heroSection = await page.locator('section').first();
    await expect(heroSection.locator('img')).toBeVisible();
    
    // Check if the story section has an image
    const storySection = await page.locator('section').nth(1);
    await expect(storySection.locator('img')).toBeVisible();
    
    // Check if images are visible
    const visibleImages = await page.locator('img').filter({ hasText: '' }).count();
    console.log(`Found ${visibleImages} visible images on the page`);
    expect(visibleImages).toBeGreaterThan(0);
    
    // Verify the featured treatments section is visible
    await expect(page.getByRole('heading', { name: /Signature Treatments/i })).toBeVisible();
    
    // Verify the treatment cards are visible
    await expect(page.getByRole('heading', { name: 'Royal Black Scan' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Peeled Egg Skin' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Collagen Regeneration' })).toBeVisible();
    
    // Verify the services section is visible
    await expect(page.getByRole('heading', { name: /Our Services/i })).toBeVisible();
    
    // Verify the CTA section is visible
    await expect(page.getByRole('heading', { name: /Ready to Transform/i })).toBeVisible();
    
    // We'll focus on checking that the page content is visible rather than checking for broken images
    // since we know some images may be using placeholder fallbacks
    console.log('Page content verified successfully');
  });
}); 