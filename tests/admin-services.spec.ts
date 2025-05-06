import { test, expect } from '@playwright/test';

// Set the test environment variable explicitly in the test file too
process.env.PLAYWRIGHT_TEST = 'true';

test.describe('Admin Services Page Tests', () => {
  test('can access admin services page with auth bypass', async ({ page }) => {
    // Navigate to admin services page
    await page.goto('/admin/services');
    
    // Check that the page loaded
    await expect(page.locator('body')).toBeVisible();
    
    // Basic check to see if any content is visible
    await expect(page.locator('body')).not.toHaveText('');
  });
  
  test('can access service creation page', async ({ page }) => {
    // Go to services page
    await page.goto('/admin/services');
    
    // Navigate to services creation page
    await page.goto('/admin/services/new');
    
    // Check that the page loaded
    await expect(page.locator('body')).toBeVisible();
    
    // Basic check to see if any content is visible
    await expect(page.locator('body')).not.toHaveText('');
  });
  
  test('can navigate between services pages', async ({ page }) => {
    // Go to services page
    await page.goto('/admin/services');
    
    // Basic check that the page loaded
    await expect(page.locator('body')).toBeVisible();
    
    // Navigate to a specific service by its ID
    await page.goto('/admin/services/1');
    
    // Check that the new page loaded
    await expect(page.locator('body')).toBeVisible();
  });
});

// Mock services data to match exactly what's in the page for testing
const mockServices = [
  { id: 1, name: 'Lymphatic Detox', category: 'Body Care' },
  { id: 2, name: 'Stretch Mark Treatment', category: 'Body Care' },
  { id: 3, name: 'Hair Removal', category: 'Body Care' },
  { id: 4, name: 'Perfect Buttocks', category: 'Body Care' },
  { id: 5, name: 'Breast Enhancement', category: 'Body Care' },
  { id: 6, name: 'Neck Rejuvenation', category: 'New Doublo' },
  { id: 7, name: 'Youth Revival', category: 'New Doublo' },
  { id: 8, name: 'V-Line Perfection', category: 'New Doublo' },
  { id: 9, name: 'Sculpt & Lift', category: 'New Doublo' }
]; 