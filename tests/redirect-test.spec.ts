import { test, expect } from '@playwright/test';

test.describe('URL Redirects', () => {
  test('redirects work from cell-beauty to body-care paths', async ({ page }) => {
    // Test breast-enhancement redirect
    await page.goto('/cell-beauty/breast-enhancement');
    await expect(page).toHaveURL('/body-care/breast-enhancement');
    
    // Test hair-removal redirect
    await page.goto('/cell-beauty/hair-removal');
    await expect(page).toHaveURL('/body-care/hair-removal');
    
    // Test lymphatic-detox redirect
    await page.goto('/cell-beauty/lymphatic-detox');
    await expect(page).toHaveURL('/body-care/lymphatic-detox');
    
    // Test perfect-buttocks redirect
    await page.goto('/cell-beauty/perfect-buttocks');
    await expect(page).toHaveURL('/body-care/perfect-buttocks');
  });
  
  test('non-redirect paths work normally', async ({ page }) => {
    // Test body-care path works normally (no redirect)
    await page.goto('/body-care/stretch-mark');
    await expect(page).toHaveURL('/body-care/stretch-mark');
    
    // Test treatments path works normally
    await page.goto('/treatments');
    await expect(page).toHaveURL('/treatments');
  });
}); 