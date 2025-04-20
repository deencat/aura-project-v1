import { test, expect } from '@playwright/test';

test.describe('New Doublo™ Treatment Page', () => {
  test('page loads correctly with all essential elements', async ({ page }) => {
    // Navigate to the New Doublo page
    await page.goto('/treatments/new-doublo');

    // Verify page title
    const pageTitle = await page.locator('h1:has-text("New Doublo™")');
    await expect(pageTitle).toBeVisible();
    
    // Verify subtitle
    await expect(page.locator('h1 span.text-primary:has-text("Patented, World-First SD Synergy Lifting")')).toBeVisible();

    // Check for hero section
    await expect(page.locator('section').first()).toBeVisible();
    
    // Check for treatment tags - should have 5 tags
    await expect(page.locator('.mt-6.flex.flex-wrap.gap-3')).toBeVisible();
    const tags = await page.locator('.inline-block.bg-primary\\/10.text-primary.rounded-full');
    await expect(tags).toHaveCount(5);
    
    // Check for Book Now button
    const bookButton = await page.locator('a:has-text("Book Now")');
    await expect(bookButton).toBeVisible();
    
    // Check for "Why Choose" section
    const whyChooseTitle = await page.locator('h2:has-text("Why Choose")');
    await expect(whyChooseTitle).toBeVisible();
    
    // Check for specific benefits
    await expect(page.locator('h3:has-text("Double Lifting Power")')).toBeVisible();
    await expect(page.locator('h3:has-text("Patented SD Technology")')).toBeVisible();
    await expect(page.locator('h3:has-text("Fully Customizable")')).toBeVisible();
    await expect(page.locator('h3:has-text("Zero Downtime")')).toBeVisible();
    
    // Check for "Who is New Doublo™ Perfect For?" section
    const idealCandidatesTitle = await page.locator('h2:has-text("Who is")');
    await expect(idealCandidatesTitle).toBeVisible();
    
    // Check for "Experience Visible Results" section
    const resultsTitle = await page.locator('h2:has-text("Experience")');
    await expect(resultsTitle).toBeVisible();
    
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
    
    // Find and click on the New Doublo card
    await page.locator('h3:has-text("New Doublo™")').click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/.*\/treatments\/new-doublo/);
    
    // Verify the page title is visible
    const pageTitle = await page.locator('h1:has-text("New Doublo™")');
    await expect(pageTitle).toBeVisible();
  });
}); 