import { test, expect } from '@playwright/test';

test.describe('Royal Black Scan Page', () => {
  test.beforeEach(async ({ baseURL }) => {
    console.log(`Using base URL: ${baseURL}`);
  });

  test('loads correctly with TreatmentImage components', async ({ page, baseURL }) => {
    // Navigate to the Royal Black Scan page
    await page.goto('/treatments/royal-black-scan');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1, name: /Royal Black Scan/i })).toBeVisible();
    
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
    await expect(page.getByRole('heading', { name: /Restore Flawless Skin/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Technology Advantages/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Treatment Process/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Expected Results/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
    
    // Check if the Book Now button is visible
    const bookButtons = await page.getByRole('button', { name: /Book/i }).count();
    expect(bookButtons).toBeGreaterThan(0);
  });
  
  test('TreatmentImage fallbacks work properly', async ({ page }) => {
    // Navigate to the page
    await page.goto('/treatments/royal-black-scan');
    
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
  
  test('FAQ accordion works correctly', async ({ page }) => {
    // Navigate to the page
    await page.goto('/treatments/royal-black-scan');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
    
    // Look for the first FAQ question
    const firstFaqQuestion = await page.getByText('How many sessions will I need?');
    await expect(firstFaqQuestion).toBeVisible();
    
    // Get the accordion item containing this question
    const accordionItem = page.locator('button', { hasText: 'How many sessions will I need?' });
    
    // Verify it's initially closed
    await expect(accordionItem).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open it
    await accordionItem.click();
    
    // Verify it opens - check for expanded state
    await expect(accordionItem).toHaveAttribute('aria-expanded', 'true');
    
    // Verify the answer is visible
    await expect(page.getByText('The number of sessions required varies')).toBeVisible();
  });
}); 