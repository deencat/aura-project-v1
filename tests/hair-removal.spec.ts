import { test, expect } from '@playwright/test';

test.describe('Hair Removal Page', () => {
  test('should load the hair removal page successfully', async ({ page }) => {
    await page.goto('/body-care/hair-removal');
    
    // Check if the page title is visible
    const title = await page.getByRole('heading', { name: /Permanent Hair Removal/i });
    await expect(title).toBeVisible();
    
    // Check if booking button is available
    const bookButton = await page.getByRole('button', { name: /BOOK NOW/i });
    await expect(bookButton).toBeVisible();
    
    // Check if benefits section exists
    const benefitsHeading = await page.getByRole('heading', { name: /Benefits of SHR Technology/i });
    await expect(benefitsHeading).toBeVisible();
    
    // Check if ideal for section exists
    const idealForHeading = await page.getByRole('heading', { name: /Ideal For/i });
    await expect(idealForHeading).toBeVisible();
    
    // Check if FAQ section exists
    const faqHeading = await page.getByRole('heading', { name: /FAQs/i });
    await expect(faqHeading).toBeVisible();
  });
  
  test('should navigate to hair removal page from navigation', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to body care
    await page.getByRole('link', { name: /Body Care/i }).click();
    
    // Check if we're on the body care page
    await expect(page).toHaveURL(/body-care/);
    
    // Check if hair removal card exists
    const hairRemovalCard = await page.getByRole('heading', { name: 'Hair Removal' });
    await expect(hairRemovalCard).toBeVisible();
    
    // Navigate to the hair removal page
    await page.getByRole('link', { name: 'Hair Removal' }).first().click();
    
    // Check if we're on the hair removal page
    await expect(page).toHaveURL(/body-care\/hair-removal/);
    
    // Check for key content elements
    const shrTechnologyText = await page.getByText(/SHR Technology/i);
    await expect(shrTechnologyText).toBeVisible();
    
    const permanentText = await page.getByText(/Permanent solution/i);
    await expect(permanentText).toBeVisible();
  });
}); 