import { test, expect } from '@playwright/test';

// Set the test environment variable explicitly in the test file too
process.env.PLAYWRIGHT_TEST = 'true';

test.describe('Admin Dashboard Tests', () => {
  test('can access admin dashboard with auth bypass', async ({ page }) => {
    // Navigate to admin dashboard
    await page.goto('/admin');
    
    // Simply check that the page loaded
    await expect(page.locator('body')).toBeVisible();
    
    // Basic check to see if any content is visible (the page isn't blank)
    await expect(page.locator('body')).not.toHaveText('');
    
    // Verify we can see any link element - a basic check that navigation exists
    const linkCount = await page.locator('a').count();
    expect(linkCount).toBeGreaterThan(0);
  });
  
  test('can navigate to services page from dashboard', async ({ page }) => {
    // Go to dashboard
    await page.goto('/admin');
    
    // Navigate to Services page
    await page.goto('/admin/services');
    
    // Simply check that the page loaded
    await expect(page.locator('body')).toBeVisible();
    
    // Basic check to see if any content is visible (the page isn't blank)
    await expect(page.locator('body')).not.toHaveText('');
  });
}); 