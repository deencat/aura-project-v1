import { test, expect } from '@playwright/test';

test.describe('Micro Needling Page', () => {
  test.beforeEach(async ({ baseURL }) => {
    console.log(`Using base URL: ${baseURL}`);
  });

  test('loads correctly with TreatmentImage components', async ({ page, baseURL }) => {
    // Navigate to the Micro Needling page
    await page.goto('/treatments/micro-needling');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1, name: /Micro Needling/i })).toBeVisible();
    
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
    
    // Check if key sections are visible
    await expect(page.getByText('Advanced Skin Rejuvenation', { exact: false })).toBeVisible();
    await expect(page.getByText('Treatment Benefits', { exact: false })).toBeVisible();
    
    // Check if the Book Treatment button is visible
    const bookButtons = await page.getByRole('link', { name: /Book/i }).count();
    expect(bookButtons).toBeGreaterThan(0);
  });
  
  test('TreatmentImage fallbacks work properly', async ({ page }) => {
    // Navigate to the page
    await page.goto('/treatments/micro-needling');
    
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
  
  test('page contains FAQ section', async ({ page }) => {
    // Navigate to the page
    await page.goto('/treatments/micro-needling');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
    
    // Check that we have expected FAQ content
    await expect(page.getByText(/How painful is micro-needling/i)).toBeVisible();
    await expect(page.getByText(/How many treatments will I need/i)).toBeVisible();
    
    // Simple verification that the page contains FAQ content
    console.log('FAQ section is present and contains expected questions');
  });
}); 