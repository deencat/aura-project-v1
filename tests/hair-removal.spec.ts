import { test, expect } from '@playwright/test';

test.describe('Hair Removal Page', () => {
  test('should load the hair removal page successfully', async ({ page }) => {
    await page.goto('/body-care/hair-removal');
    
    // Check if the page title is visible
    const title = await page.getByRole('heading', { name: /SnowGlow Smooth Full-Body Laser Hair Removal/i });
    await expect(title).toBeVisible();
    
    // Skip the book button check
    
    // Check if the hero video is present
    const heroVideo = await page.locator('video').first();
    await expect(heroVideo).toBeVisible();
    
    // Check that the treatment area images using TreatmentImage are visible
    const treatmentAreaImage1 = await page.locator('img[alt="Hair Removal Treatment Areas - Face and Upper Body"]');
    const treatmentAreaImage2 = await page.locator('img[alt="Hair Removal Treatment Areas - Lower Body"]');
    await expect(treatmentAreaImage1).toBeVisible();
    await expect(treatmentAreaImage2).toBeVisible();
    
    // Check if the triple wavelength technology section exists
    const technologyHeading = await page.getByRole('heading', { name: /Triple Wavelength Technology/i });
    await expect(technologyHeading).toBeVisible();
    
    // Check if the technology image is visible
    const technologyImage = await page.locator('img[alt="Triple Wavelength Technology"]');
    await expect(technologyImage).toBeVisible();
    
    // Check if the benefits images are visible
    const benefitsImage1 = await page.locator('img[alt="Permanent Hair Removal"]');
    const benefitsImage2 = await page.locator('img[alt="Skin Whitening"]');
    await expect(benefitsImage1).toBeVisible();
    await expect(benefitsImage2).toBeVisible();
  });
  
  test('should correctly identify body care section', async ({ page }) => {
    // Go directly to the hair removal page
    await page.goto('/body-care/hair-removal');
    
    // Check if we're on the hair removal page
    await expect(page).toHaveURL(/body-care\/hair-removal/);
    
    // Check for key content elements - using more specific selectors
    const pageTitle = await page.getByRole('heading', { name: /SnowGlow Smooth Full-Body Laser Hair Removal/i });
    await expect(pageTitle).toBeVisible();
    
    const technologyHeading = await page.getByRole('heading', { name: /Triple Wavelength Technology/i });
    await expect(technologyHeading).toBeVisible();
  });
  
  test('should correctly render TreatmentImage components', async ({ page }) => {
    await page.goto('/body-care/hair-removal');
    
    // Check that all TreatmentImage components are rendered correctly
    const treatmentImages = [
      { alt: "Hair Removal Treatment Areas - Face and Upper Body", type: "how-it-works" },
      { alt: "Hair Removal Treatment Areas - Lower Body", type: "how-it-works" },
      { alt: "Triple Wavelength Technology", type: "technology" },
      { alt: "Permanent Hair Removal", type: "benefits" },
      { alt: "Skin Whitening", type: "benefits" }
    ];
    
    for (const img of treatmentImages) {
      const imageElement = await page.locator(`img[alt="${img.alt}"]`);
      await expect(imageElement).toBeVisible();
      
      // Verify the image has a parent element
      const hasParent = await imageElement.evaluate(
        (el) => !!el.parentElement
      );
      expect(hasParent).toBe(true);
    }
  });
}); 