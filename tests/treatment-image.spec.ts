import { test, expect } from '@playwright/test';

test.describe('TreatmentImage Component', () => {
  test('should render the example page with all TreatmentImage variants', async ({ page }) => {
    // Navigate to the example page
    await page.goto('/treatments/example');
    
    // Check if the page title is present
    await expect(page.locator('h1')).toContainText('TreatmentImage Component Example');
    
    // Check if all tabs are present
    await expect(page.locator('button[role="tab"]')).toHaveCount(3);
    
    // Test basic usage tab
    await expect(page.locator('button[role="tab"]').nth(0)).toContainText('Basic Usage');
    
    // Check if images in the basic tab are rendered
    const basicTabImages = page.locator('[data-state="active"] img');
    await expect(basicTabImages).toHaveCount(2);
    
    // Click on advanced options tab
    await page.locator('button[role="tab"]').nth(1).click();
    
    // Check if images in the advanced tab are rendered
    const advancedTabImages = page.locator('[data-state="active"] img');
    await expect(advancedTabImages).toHaveCount(2);
    
    // Click on fallbacks tab
    await page.locator('button[role="tab"]').nth(2).click();
    
    // Check if fallback images are rendered
    const fallbackTabImages = page.locator('[data-state="active"] img');
    await expect(fallbackTabImages).toHaveCount(2); // The third one has fallbackBehavior="none"
  });
});

test.describe('TreatmentImage Fallback Behavior', () => {
  test('should render placeholder images for non-existent treatments', async ({ page }) => {
    // Navigate to the example page and go to fallbacks tab
    await page.goto('/treatments/example');
    await page.locator('button[role="tab"]').nth(2).click();
    
    // Check if placeholder fallback is rendered
    const placeholderFallback = page.locator('[data-state="active"] div').filter({ hasText: 'Placeholder Fallback' }).locator('img');
    await expect(placeholderFallback).toBeVisible();
    
    // Check if generic fallback is rendered
    const genericFallback = page.locator('[data-state="active"] div').filter({ hasText: 'Generic Fallback' }).locator('img');
    await expect(genericFallback).toBeVisible();
    
    // Check if no fallback section contains the expected text
    const noFallback = page.locator('[data-state="active"] div').filter({ hasText: 'No Fallback' });
    await expect(noFallback).toContainText('No image displayed');
  });
});

test.describe('TreatmentImage Attributes', () => {
  test('should render images with correct attributes', async ({ page }) => {
    // Navigate to the example page
    await page.goto('/treatments/example');
    
    // Check the first image in the basic tab
    const heroImage = page.locator('[data-state="active"] img').first();
    await expect(heroImage).toHaveAttribute('alt', 'Glow Facial Treatment');
    
    // Click on advanced options tab
    await page.locator('button[role="tab"]').nth(1).click();
    
    // Check the image with custom dimensions
    const customDimensionsImage = page.locator('[data-state="active"] img').first();
    await expect(customDimensionsImage).toHaveAttribute('width', '400');
    await expect(customDimensionsImage).toHaveAttribute('height', '300');
    
    // Check the fill mode image
    const fillModeImageContainer = page.locator('[data-state="active"] div.relative');
    await expect(fillModeImageContainer).toHaveClass(/relative/);
    
    const fillModeImage = fillModeImageContainer.locator('img');
    await expect(fillModeImage).toHaveAttribute('style', /position: absolute/);
  });
}); 