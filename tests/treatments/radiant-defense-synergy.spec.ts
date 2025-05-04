import { test, expect } from '@playwright/test';

test.describe('Radiant Defense Synergy Treatment Page', () => {
  test('page loads correctly with content', async ({ page }) => {
    // Navigate to the Radiant Defense Synergy page
    await page.goto('/treatments/radiant-defense-synergy');

    // Verify page title 
    const pageTitle = await page.getByRole('heading', { level: 1, name: /Radiant Defense Synergy/i });
    await expect(pageTitle).toBeVisible();
    
    // Verify subtitle with joint benefits mention
    await expect(page.getByText(/Joint Benefits of Resveratrol & Immune Probiotics/i)).toBeVisible();

    // Check for treatment tags
    const tags = await page.locator('.inline-block.bg-primary\\/10').count();
    expect(tags).toBeGreaterThan(0);
    
    // Verify presence of key content sections
    await expect(page.getByText(/Key Joint Benefits/i)).toBeVisible();
    await expect(page.getByText(/Deep Purification & Renewal/i)).toBeVisible();
    await expect(page.getByText(/Strengthened Skin Immunity/i)).toBeVisible();
    await expect(page.getByText(/Key Ingredients/i)).toBeVisible();
    await expect(page.getByText(/Who Is It For/i)).toBeVisible();
    await expect(page.getByText(/Benefits of Radiant Defense Synergy/i)).toBeVisible();
    await expect(page.getByText(/Frequently Asked Questions/i)).toBeVisible();
    
    // Check for a book/contact button
    const bookingButton = await page.getByRole('link', { name: /book/i }).first();
    await expect(bookingButton).toBeVisible();
  });
  
  test('images are present on page', async ({ page }) => {
    // Navigate to the page
    await page.goto('/treatments/radiant-defense-synergy');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check for presence of image elements
    const imgCount = await page.locator('img').count();
    expect(imgCount).toBeGreaterThan(0);
    
    // Count img elements with src attribute
    const imgsWithSrc = await page.locator('img[src]').count();
    expect(imgsWithSrc).toBeGreaterThan(0);
    
    // Simply verify that image elements exist and are visible
    await expect(page.locator('img').first()).toBeVisible();
  });
}); 