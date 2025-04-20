import { test, expect } from '@playwright/test';

test.describe('Lymphatic Detox Page', () => {
  test('should load the lymphatic detox page successfully', async ({ page }) => {
    await page.goto('/body-care/lymphatic-detox');
    
    // Check if the page title is visible
    const title = await page.getByRole('heading', { name: /2-in-1 Lymphatic Detox/i });
    await expect(title).toBeVisible();
    
    // Check if booking button is available
    const bookButton = await page.getByRole('button', { name: /Book/i });
    await expect(bookButton).toBeVisible();
    
    // Check if benefits section exists
    const benefitsHeading = await page.getByRole('heading', { name: /Transformative Benefits/i });
    await expect(benefitsHeading).toBeVisible();
    
    // Check if FAQ section exists
    const faqHeading = await page.getByRole('heading', { name: /Frequently Asked Questions/i });
    await expect(faqHeading).toBeVisible();
  });
  
  test('should navigate to body care page from navigation', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to body care
    await page.getByRole('link', { name: /Body Care/i }).click();
    
    // Check if we're on the body care page
    await expect(page).toHaveURL(/body-care/);
    
    // Check if lymphatic detox card exists
    const lymphaticDetoxCard = await page.getByRole('heading', { name: '2-in-1 Lymphatic Detox' });
    await expect(lymphaticDetoxCard).toBeVisible();
    
    // Navigate to the lymphatic detox page
    await page.getByRole('link', { name: '2-in-1 Lymphatic Detox' }).first().click();
    
    // Check if we're on the lymphatic detox page
    await expect(page).toHaveURL(/body-care\/lymphatic-detox/);
  });
}); 