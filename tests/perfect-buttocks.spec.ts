import { test, expect } from '@playwright/test';

test.describe('Perfect Buttocks (Peach Lift) Page', () => {
  test('should load the perfect buttocks page successfully', async ({ page }) => {
    await page.goto('/body-care/perfect-buttocks');
    
    // Check if the page title is visible
    const title = await page.getByRole('heading', { name: /Peach Lift Sculpting Machine/i });
    await expect(title).toBeVisible();
    
    // Check if booking button is available
    const bookButton = await page.getByRole('button', { name: /BOOK NOW/i });
    await expect(bookButton).toBeVisible();
    
    // Check if benefits section exists
    const revolutionaryHeading = await page.getByRole('heading', { name: /Revolutionary Sculpting Technology/i });
    await expect(revolutionaryHeading).toBeVisible();
    
    // Check if clinically proven section exists
    const clinicallyHeading = await page.getByRole('heading', { name: /Clinically Proven Results/i });
    await expect(clinicallyHeading).toBeVisible();
    
    // Check if FAQ section exists
    const faqHeading = await page.getByRole('heading', { name: /FAQs/i });
    await expect(faqHeading).toBeVisible();
  });
  
  test('should navigate to perfect buttocks page from navigation', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to body care
    await page.getByRole('link', { name: /Body Care/i }).click();
    
    // Check if we're on the body care page
    await expect(page).toHaveURL(/body-care/);
    
    // Check if perfect buttocks card exists
    const perfectButtocksCard = await page.getByRole('heading', { name: 'Perfect Buttocks' });
    await expect(perfectButtocksCard).toBeVisible();
    
    // Navigate to the perfect buttocks page
    await page.getByRole('link', { name: 'Perfect Buttocks' }).first().click();
    
    // Check if we're on the perfect buttocks page
    await expect(page).toHaveURL(/body-care\/perfect-buttocks/);
    
    // Check for key content elements
    const muscleBuildingText = await page.getByText(/Muscle Building/i);
    await expect(muscleBuildingText).toBeVisible();
    
    const fatReductionText = await page.getByText(/Fat Reduction/i);
    await expect(fatReductionText).toBeVisible();
  });
}); 