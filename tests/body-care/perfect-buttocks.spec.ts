import { test, expect } from '@playwright/test';

test.describe('Perfect Buttocks Page', () => {
  test('loads correctly with TreatmentImage components', async ({ page }) => {
    // Navigate to the Perfect Buttocks page
    await page.goto('/body-care/perfect-buttocks');
    
    // Verify page title is visible
    await expect(page.locator('h1')).toContainText('Peach Lift Sculpting Machine');
    
    // Check that the hero section content is visible
    await expect(page.getByText('Natural enhancement')).toBeVisible();
    await expect(page.getByText('Non-invasive solution')).toBeVisible();
    
    // Check that key sections are present
    await expect(page.getByText('Revolutionary Sculpting Technology')).toBeVisible();
    await expect(page.getByText('Clinically Proven Results')).toBeVisible();
    await expect(page.getByText('Ready to enhance your curves?')).toBeVisible();
    
    // Verify FAQ section
    await expect(page.getByText('How does the Peach Lift work?')).toBeVisible();
  });
}); 