import { test, expect } from '@playwright/test';

test.describe('Lymphatic Detox Page', () => {
  test('should load the lymphatic detox page successfully', async ({ page }) => {
    await page.goto('/body-care/lymphatic-detox');
    
    // Check if the page title is visible
    const title = await page.getByRole('heading', { name: /Dual-Action Lymphatic Detox/i });
    await expect(title).toBeVisible();
    
    // Check if booking button is available
    const bookButton = await page.getByRole('button', { name: /BOOK NOW/i });
    await expect(bookButton).toBeVisible();
    
    // Check if how it works section exists
    const howItWorksHeading = await page.getByRole('heading', { name: /How It Works/i });
    await expect(howItWorksHeading).toBeVisible();
    
    // Check if benefits section exists
    const benefitsHeading = await page.getByRole('heading', { name: /Benefits/i });
    await expect(benefitsHeading).toBeVisible();
    
    // Check if FAQ section exists
    const faqHeading = await page.getByRole('heading', { name: /Frequently Asked Questions/i });
    await expect(faqHeading).toBeVisible();
  });
  
  test('should navigate to lymphatic detox page from navigation', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to body care
    await page.getByRole('link', { name: /Body Care/i }).click();
    
    // Check if we're on the body care page
    await expect(page).toHaveURL(/body-care/);
    
    // Check if lymphatic detox card exists
    const lymphaticDetoxCard = await page.getByRole('heading', { name: 'Lymphatic Detox' });
    await expect(lymphaticDetoxCard).toBeVisible();
    
    // Navigate to the lymphatic detox page
    await page.getByRole('link', { name: 'Lymphatic Detox' }).first().click();
    
    // Check if we're on the lymphatic detox page
    await expect(page).toHaveURL(/body-care\/lymphatic-detox/);
    
    // Check for key content elements
    const magneticForkText = await page.getByText(/magnetic fork technology/i);
    await expect(magneticForkText).toBeVisible();
    
    const detoxText = await page.getByText(/eliminate toxins/i);
    await expect(detoxText).toBeVisible();
  });
}); 