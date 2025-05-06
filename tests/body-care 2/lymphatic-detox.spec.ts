import { test, expect } from '@playwright/test';

test.describe('Lymphatic Detox Page', () => {
  test('loads correctly with TreatmentImage component', async ({ page }) => {
    // Navigate to the Lymphatic Detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Verify page title is visible
    await expect(page.locator('h1')).toContainText('Dual-Action Lymphatic Detox');
    
    // Check that the hero section content is visible
    await expect(page.getByText('Complete wellness solution')).toBeVisible();
    await expect(page.getByText('Gentle treatment')).toBeVisible();
    
    // Check that key sections are present
    await expect(page.getByText('Triple Pathway Technology')).toBeVisible();
    await expect(page.getByText('Immediate Tangible Results')).toBeVisible();
    
    // Verify the technologies are present
    await expect(page.getByText('Magnetic Fork Technology')).toBeVisible();
    await expect(page.getByText('Triple Detox Pathways')).toBeVisible();
    await expect(page.getByText('Expert Manual Techniques')).toBeVisible();
    
    // Verify the Book Now button is present
    await expect(page.getByRole('button', { name: 'BOOK NOW' })).toBeVisible();
  });
}); 