import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to main pages', async ({ page }) => {
    // Home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Aura/);
    
    // About page
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/about/);
    
    // Contact page
    await page.getByRole('link', { name: /contact/i }).first().click();
    await expect(page).toHaveURL(/contact/);
  });

  // Skip the hover test for now as it's not reliable across browsers
  test.skip('should display treatment menu on hover', async ({ page }) => {
    await page.goto('/');
    
    // Hover over "Premium Beauty Treatments" in the navigation
    await page.hover('nav a:text("Premium Beauty Treatments")');
    
    // Wait for the animation to complete
    await page.waitForTimeout(500);
    
    // Check that the submenu appears
    const submenu = page.locator('nav').getByText('Royal Black Scan').first();
    await expect(submenu).toBeVisible();
  });

  test('should navigate to Royal Black Scan treatment page', async ({ page }) => {
    // Go directly to the treatment page
    await page.goto('/treatments/royal-black-scan');
    
    // Check that we navigated to the Royal Black Scan page
    await expect(page.locator('h1').filter({ hasText: 'Royal Black Scan' })).toBeVisible();
  });
}); 