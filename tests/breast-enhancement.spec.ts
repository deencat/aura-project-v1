import { test, expect } from '@playwright/test';

test.describe('Breast Enhancement (Goddess Curves) Page', () => {
  test('should load the breast enhancement page successfully', async ({ page }) => {
    await page.goto('/body-care/breast-enhancement');
    
    // Check if the page title is visible
    const title = await page.getByRole('heading', { name: /Goddess Curves/i });
    await expect(title).toBeVisible();
    
    // Check if booking button is available
    const bookButton = await page.getByRole('button', { name: /BOOK NOW/i });
    await expect(bookButton).toBeVisible();
    
    // Check if benefits section exists
    const benefitsHeading = await page.getByRole('heading', { name: /Visible Transformations/i });
    await expect(benefitsHeading).toBeVisible();
    
    // Check if testimonial section exists
    const testimonialHeading = await page.getByRole('heading', { name: /Transformation You Can Trust/i });
    await expect(testimonialHeading).toBeVisible();
    
    // Check if FAQ section exists
    const faqHeading = await page.getByRole('heading', { name: /FAQs/i });
    await expect(faqHeading).toBeVisible();
  });
  
  test('should navigate to breast enhancement page from navigation', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to body care
    await page.getByRole('link', { name: /Body Care/i }).click();
    
    // Check if we're on the body care page
    await expect(page).toHaveURL(/body-care/);
    
    // Check if breast enhancement card exists
    const breastEnhancementCard = await page.getByRole('heading', { name: 'Breast Enhancement' });
    await expect(breastEnhancementCard).toBeVisible();
    
    // Navigate to the breast enhancement page
    await page.getByRole('link', { name: 'Breast Enhancement' }).first().click();
    
    // Check if we're on the breast enhancement page
    await expect(page).toHaveURL(/body-care\/breast-enhancement/);
    
    // Check for key content elements
    const cellularLevel = await page.getByText(/Cellular-Level Activation/i);
    await expect(cellularLevel).toBeVisible();
    
    const tripleDeep = await page.getByText(/Triple Deep Restoration/i);
    await expect(tripleDeep).toBeVisible();
  });
}); 