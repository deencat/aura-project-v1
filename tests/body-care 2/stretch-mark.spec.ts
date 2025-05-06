import { test, expect } from '@playwright/test';

test.describe('Stretch Mark Page', () => {
  test('loads correctly with TreatmentImage components', async ({ page }) => {
    // Navigate to the Stretch Mark page
    await page.goto('/body-care/stretch-mark');
    
    // Verify page title is visible
    await expect(page.locator('h1')).toContainText('CellRevive Stretch Mark Repair');
    
    // Check that the hero section content is visible
    await expect(page.getByText('Advanced treatment')).toBeVisible();
    await expect(page.getByText('Cellular regeneration')).toBeVisible();
    
    // Check that key sections are present
    await expect(page.getByText('Understanding Stretch Marks')).toBeVisible();
    await expect(page.getByText('Dual Approach Technology')).toBeVisible();
    
    // Verify the benefits section is present
    await expect(page.getByText('These marks can appear anywhere the skin has been stretched')).toBeVisible();
    
    // Check that the technology section is present
    await expect(page.getByText('Cellular Regeneration')).toBeVisible();
    await expect(page.getByText('Microneedling Matrix')).toBeVisible();
    
    // Verify the Book Now button is present
    await expect(page.getByRole('button', { name: 'BOOK NOW' })).toBeVisible();
  });
}); 