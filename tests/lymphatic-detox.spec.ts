import { test, expect } from '@playwright/test';

test.describe('Lymphatic Detox Page', () => {
  test('page loads successfully and displays key elements', async ({ page }) => {
    // Navigate to the lymphatic detox page with a longer timeout
    await page.goto('/body-care/lymphatic-detox', { timeout: 60000 });
    
    // Verify we reached the right URL
    await expect(page).toHaveURL(/.*\/body-care\/lymphatic-detox/);
    
    // Check for the page title
    await expect(page.getByRole('heading', { name: /Dual-Action Lymphatic Detox/i })).toBeVisible();
    
    // Check for the booking button
    await expect(page.getByRole('button', { name: 'BOOK NOW', exact: true })).toBeVisible();
    
    // Check for main description text
    await expect(page.getByText(/urban life takes a toll on our body/i)).toBeVisible();
    
    // Check for "How It Works" section
    await expect(page.getByRole('heading', { name: /How It Works/i })).toBeVisible();
    
    // Check for "Benefits" section
    await expect(page.getByRole('heading', { name: /Benefits/i })).toBeVisible();
    
    // Check for FAQ section
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
  });
  
  test('navigates from homepage to lymphatic detox page', async ({ page }) => {
    // Start from homepage
    await page.goto('/');
    
    // Navigate to the Body Care section (hover on treatments)
    await page.getByRole('link', { name: 'Treatments' }).hover();
    
    // Wait for dropdown and click on Body Care
    await page.getByRole('link', { name: 'Body Care' }).click();
    await expect(page).toHaveURL(/.*\/body-care/);
    
    // Find and click on the Lymphatic Detox link
    await page.getByRole('link', { name: /Lymphatic Detox/i }).click();
    
    // Verify navigation to the correct page
    await expect(page).toHaveURL(/.*\/body-care\/lymphatic-detox/);
    await expect(page.getByRole('heading', { name: /Dual-Action Lymphatic Detox/i })).toBeVisible();
  });
  
  test('fade-in animations are applied', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox', { timeout: 60000 });
    
    // Check for elements with fade-in animation classes
    const fadeElements = await page.locator('.animate-fade-in').count();
    expect(fadeElements).toBeGreaterThan(0);
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
