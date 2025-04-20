import { test, expect } from '@playwright/test';

test.describe('Mole Wart Skin Growth Removal Treatment Page', () => {
  test('page loads correctly with all essential elements', async ({ page }) => {
    // Navigate to the Mole Wart Removal page
    await page.goto('/treatments/mole-wart-removal');

    // Verify page title
    const pageTitle = await page.locator('h1:has-text("Mole Wart Skin Growth")');
    await expect(pageTitle).toBeVisible();

    // Check for hero section
    await expect(page.locator('section').first()).toBeVisible();
    
    // Check for treatment tags
    await expect(page.locator('.mt-6.flex.flex-wrap.gap-3')).toBeVisible();
    const tags = await page.locator('.inline-block.bg-primary\\/10.text-primary.rounded-full');
    await expect(tags).toHaveCount(4);
    
    // Check for Book Now button
    const bookButton = await page.locator('a:has-text("Book Now")');
    await expect(bookButton).toBeVisible();
    
    // Check for treatment description section
    const descriptionTitle = await page.locator('h2:has-text("Mole Wart Removal")');
    await expect(descriptionTitle).toBeVisible();
    
    // Check for treatment features/details
    const featureBoxes = await page.locator('.bg-primary\\/10.rounded-t-lg');
    const featureCount = await featureBoxes.count();
    expect(featureCount).toBeGreaterThan(0);
    
    // Check for benefits section
    const benefitsTitle = await page.locator('h2:has-text("Benefits of")');
    await expect(benefitsTitle).toBeVisible();
    
    // Check for carousel
    await expect(page.locator('.carousel')).toBeVisible();
    
    // Check for FAQ section
    const faqTitle = await page.locator('h2:has-text("Frequently Asked")');
    await expect(faqTitle).toBeVisible();
    
    // Check for booking section at the bottom
    const bookingTitle = await page.locator('h2:has-text("Ready for")');
    await expect(bookingTitle).toBeVisible();
    const bookingButton = await page.locator('a:has-text("Book Your Treatment")');
    await expect(bookingButton).toBeVisible();
  });

  test('page navigation works correctly from treatments page', async ({ page }) => {
    // Navigate to the treatments page
    await page.goto('/treatments');
    
    // Find and click on the Mole Wart Removal card
    await page.locator('h3:has-text("Mole Wart Skin Growth Removal")').click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/.*\/treatments\/mole-wart-removal/);
    
    // Verify the page title is visible
    const pageTitle = await page.locator('h1:has-text("Mole Wart Skin Growth")');
    await expect(pageTitle).toBeVisible();
  });
}); 