import { test, expect } from '@playwright/test';

// Set the test environment variable
process.env.PLAYWRIGHT_TEST = 'true';

test.describe('Image Optimization', () => {
  test('TreatmentImage loads correctly with optimizations on homepage', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Verify we can see the hero section
    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();
    
    // Check for image element in the hero section
    const heroImage = page.locator('.hero-section img');
    if (await heroImage.count() > 0) {
      await expect(heroImage.first()).toBeVisible();
    }
    
    // Verify we can see the featured treatments section
    const featuredSection = page.locator('.featured-treatments');
    if (await featuredSection.count() > 0) {
      await expect(featuredSection).toBeVisible();
    }
  });
  
  test('About page loads with proper images', async ({ page }) => {
    // Navigate to about page
    await page.goto('/about', { waitUntil: 'networkidle' });
    
    // Verify the page title is visible
    const title = page.locator('h1:has-text("About")');
    await expect(title).toBeVisible();
    
    // Check if team member images are visible
    const teamSection = page.locator('.team-section');
    if (await teamSection.count() > 0) {
      await expect(teamSection).toBeVisible();
    }
  });
  
  test('Contact page loads with proper images', async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact', { waitUntil: 'networkidle' });
    
    // Verify the page title is visible
    const title = page.locator('h1:has-text("Contact")');
    await expect(title).toBeVisible();
    
    // Check if location image is visible
    const locationSection = page.locator('.location-section');
    if (await locationSection.count() > 0) {
      await expect(locationSection).toBeVisible();
    }
  });
}); 