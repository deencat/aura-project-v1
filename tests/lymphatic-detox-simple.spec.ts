import { test, expect } from '@playwright/test';

test.describe('Lymphatic Detox Page Simple Tests', () => {
  test('page loads successfully', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Check page title and button
    await expect(page.getByRole('heading', { name: /Dual-Action Lymphatic Detox/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'BOOK NOW', exact: true })).toBeVisible();
  });
  
  test('book now button navigates to contact page', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Click the booking button
    await page.getByRole('button', { name: 'BOOK NOW', exact: true }).click();
    
    // Verify navigation to contact page
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/.*\/contact/);
  });
}); 