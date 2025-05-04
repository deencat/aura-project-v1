import { test, expect } from '@playwright/test';

test.describe('Breast Enhancement Page', () => {
  test('loads correctly with TreatmentImage component', async ({ page }) => {
    // Navigate to the Breast Enhancement page
    await page.goto('/body-care/breast-enhancement');
    
    // Verify page title is visible
    await expect(page.locator('h1')).toContainText('Goddess Curves');
    
    // Check that the hero section content is visible
    await expect(page.getByText('Natural enhancement')).toBeVisible();
    await expect(page.getByText('Non-invasive solution')).toBeVisible();
    
    // Check that key sections are present
    await expect(page.getByText('Triple Deep Restoration')).toBeVisible();
    await expect(page.getByText('Visible Transformations')).toBeVisible();
    
    // Verify the technologies are present
    await expect(page.getByText('Cellular-Level Activation')).toBeVisible();
    await expect(page.getByText('Natural Energy Infusion')).toBeVisible();
    
    // Verify the Book Now button is present
    await expect(page.getByRole('button', { name: 'BOOK NOW' })).toBeVisible();
  });
}); 