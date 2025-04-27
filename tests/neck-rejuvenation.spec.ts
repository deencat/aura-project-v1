import { test as base, expect } from '@playwright/test';

// Define a test that uses headless browser
const test = base.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  }
});

test.describe('Neck Rejuvenation Page', () => {
  test('page loads successfully with placeholder images', async ({ page }) => {
    // Set a longer timeout for this test
    test.setTimeout(90000);
    
    try {
      // Navigate to the page with explicit base URL
      await page.goto('http://localhost:3000/new-doublo/neck-rejuvenation', { 
        timeout: 60000,
        waitUntil: 'domcontentloaded'
      });
      
      // Wait a moment for content to render
      await page.waitForTimeout(2000);
      
      // Check if we've reached the neck rejuvenation page
      await expect(page).toHaveURL(/.*\/new-doublo\/neck-rejuvenation/);
      
      // Check if page has content
      const content = await page.textContent('body');
      expect(content?.length).toBeGreaterThan(0);
      
      // Check for placeholder images being loaded correctly
      const images = await page.locator('img[src*="new-doublo-neck"]').all();
      console.log(`Found ${images.length} neck placeholder images`);
      expect(images.length).toBeGreaterThan(0);
      
      // Check for major elements on the page
      await expect(page.locator('h1', { hasText: 'Neck' })).toBeVisible();
      await expect(page.locator('h2', { hasText: 'Your Age' })).toBeVisible();
      await expect(page.locator('h2', { hasText: 'Dual-Technology' })).toBeVisible();
      
      console.log('Test completed successfully - page loads with all major elements visible');
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });
}); 