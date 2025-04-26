import { test, expect } from '@playwright/test';

test.describe('Lymphatic Detox Page', () => {
  test('page loads successfully and displays key elements', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Check page title
    await expect(page.getByRole('heading', { name: /Dual-Action Lymphatic Detox/i })).toBeVisible();
    
    // Check booking button
    await expect(page.getByText('BOOK NOW')).toBeVisible();
    
    // Check main description text
    await expect(page.getByText(/Urban life means stress/i)).toBeVisible();
    
    // Check "Triple Pathway Technology" section
    await expect(page.getByRole('heading', { name: /Triple Pathway Technology/i })).toBeVisible();
    
    // Check cards in the Unique Value Proposition section
    await expect(page.getByText('Magnetic Fork Technology')).toBeVisible();
    await expect(page.getByText('Triple Detox Pathways')).toBeVisible();
    await expect(page.getByText('Expert Manual Techniques')).toBeVisible();
    
    // Check "Immediate Tangible Results" section
    await expect(page.getByRole('heading', { name: /Immediate Tangible Results/i })).toBeVisible();
    
    // Check tabs in the Benefits section
    const tabsList = page.getByRole('tablist');
    await expect(tabsList).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Immediate' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Metabolic' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Non-Invasive' })).toBeVisible();
  });
  
  test('navigation from homepage works', async ({ page }) => {
    // Start from homepage
    await page.goto('/');
    
    // Hover on Body Care in the menu to show dropdown
    await page.getByRole('link', { name: /Body Care/i }).hover();
    
    // Wait for dropdown to appear
    await page.waitForTimeout(500);
    
    // Click on Lymphatic Detox in the dropdown
    await page.getByRole('link', { name: /2-in-1 Lymphatic Detox/i }).click();
    
    // Verify we reached the correct page
    await expect(page).toHaveURL(/.*\/body-care\/lymphatic-detox/);
    await expect(page.getByRole('heading', { name: /Dual-Action Lymphatic Detox/i })).toBeVisible();
  });
  
  test('fade-in animations are applied correctly', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Check for FadeInSection components
    await page.waitForTimeout(1000); // Allow time for animations to be applied
    
    // Use a more targeted selector - look for elements containing the animate-fade-in class
    await expect(page.locator('.animate-fade-in')).toHaveCount({ min: 1 });
  });
  
  test('book now button navigates to contact page', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Click the primary booking button
    await page.getByText('BOOK NOW', { exact: true }).click();
    
    // Verify navigation to contact page
    await page.waitForTimeout(1000); // Allow time for navigation
    await expect(page).toHaveURL(/.*\/contact/);
  });
});
