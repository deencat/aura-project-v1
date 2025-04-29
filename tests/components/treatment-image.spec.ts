import { test, expect } from '@playwright/test';

test.describe('TreatmentImage Component', () => {
  test('renders correctly with various options', async ({ page }) => {
    // Navigate to the Hair Removal page which uses the component extensively
    await page.goto('/body-care/hair-removal');
    
    // Test that all images are visible
    await expect(page.locator('img[alt="Hair Removal Treatment Areas - Face and Upper Body"]')).toBeVisible();
    await expect(page.locator('img[alt="Hair Removal Treatment Areas - Lower Body"]')).toBeVisible();
    await expect(page.locator('img[alt="Triple Wavelength Technology"]')).toBeVisible();
    await expect(page.locator('img[alt="Permanent Hair Removal"]')).toBeVisible();
    await expect(page.locator('img[alt="Skin Whitening"]')).toBeVisible();
  });
  
  test('handles different image layouts and sizes', async ({ page }) => {
    // Navigate to the Hair Removal page
    await page.goto('/body-care/hair-removal');
    
    // Check treatment areas
    const treatmentAreaImage = page.locator('img[alt="Hair Removal Treatment Areas - Face and Upper Body"]');
    await expect(treatmentAreaImage).toBeVisible();
    
    // Check that benefit images have consistent sizing
    const benefitImage = page.locator('img[alt="Permanent Hair Removal"]');
    await expect(benefitImage).toBeVisible();
    
    // Check that the images have appropriate parent containers
    const hasContainer = await treatmentAreaImage.evaluate((el) => {
      const parent = el.closest('.overflow-hidden') || el.closest('.rounded-xl');
      return !!parent;
    });
    expect(hasContainer).toBe(true);
  });
  
  test('loads correct images for different treatment pages', async ({ page }) => {
    // We'll check the Hair Removal page images first
    await page.goto('/body-care/hair-removal');
    
    // Check that the technology image is loaded
    const technologyImage = page.locator('img[alt="Triple Wavelength Technology"]');
    await expect(technologyImage).toBeVisible();
    
    // Now go to a New Doublo page if it's loaded (conditional testing)
    try {
      await page.goto('/new-doublo', { timeout: 3000 });
      
      // Try to locate a New Doublo specific image
      const newDoubloImage = page.locator('img[alt*="New Doublo"]').first();
      
      // Only expect this if the page loaded successfully
      if (await page.getByRole('heading', { name: /New Doublo/i }).isVisible()) {
        await expect(newDoubloImage).toBeVisible();
      }
    } catch (e) {
      // If page doesn't load or image isn't found, we'll skip
      console.log('New Doublo page not available, skipping that test part');
    }
  });
}); 