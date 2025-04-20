import { test, expect } from '@playwright/test';

test.describe('Ultimate Stemcell Hydrating Repair Treatment Page', () => {
  test('page loads correctly with all essential elements', async ({ page }) => {
    // Navigate to the Ultimate Stemcell Hydrating Repair page
    await page.goto('/treatments/ultimate-stemcell-hydrating-repair');

    // Verify page title
    const pageTitle = await page.locator('h1:has-text("Ultimate Stemcell Hydrating Repair")');
    await expect(pageTitle).toBeVisible();

    // Verify hero section
    const heroSection = await page.locator('section').filter({ hasText: /Ultimate Stemcell Hydrating Repair/ }).first();
    await expect(heroSection).toBeVisible();
    
    // Verify treatment tags are present
    const tags = await page.locator('.bg-primary\\/10.text-primary.rounded-full');
    await expect(tags).toHaveCount(3);
    
    // Verify Book Now button
    const bookNowButton = await page.locator('text=Book Now');
    await expect(bookNowButton).toBeVisible();

    // Verify Treatment Description section
    const treatmentDescSection = await page.locator('h2:has-text("Profound Rejuvenation")').first();
    await expect(treatmentDescSection).toBeVisible();
    
    // Verify the four key aspects
    const keyAspects = [
      'Deep Cellular Hydration',
      'Stem Cell Activation',
      'Barrier Reinforcement',
      'Radiance Enhancement'
    ];
    
    for (const aspect of keyAspects) {
      const aspectHeading = await page.locator(`h3:has-text("${aspect}")`);
      await expect(aspectHeading).toBeVisible();
    }

    // Verify Benefits section
    const benefitsSection = await page.locator('h2:has-text("Benefits of Ultimate Stemcell Hydrating Repair")');
    await expect(benefitsSection).toBeVisible();
    
    // Verify carousel exists
    const carousel = await page.locator('.carousel');
    await expect(carousel).toBeVisible();
    
    // Verify carousel buttons
    const prevButton = await page.locator('button[aria-label="Previous slide"]');
    const nextButton = await page.locator('button[aria-label="Next slide"]');
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
    
    // Verify grid of benefits
    const benefitItems = await page.locator('.bg-white.rounded-lg.p-8.text-center.shadow-sm');
    await expect(benefitItems).toHaveCount(6);

    // Verify FAQ section
    const faqSection = await page.locator('h2:has-text("Frequently Asked Questions")');
    await expect(faqSection).toBeVisible();
    
    // Verify FAQ items
    const faqItems = await page.locator('.rounded-lg.border.border-gray-200.p-6');
    const faqCount = await faqItems.count();
    expect(faqCount).toBeGreaterThanOrEqual(5);
    
    // Verify Book Now section at bottom
    const bookNowSection = await page.locator('h2:has-text("Ready for Ultimate Stemcell Hydrating Repair?")');
    await expect(bookNowSection).toBeVisible();
    
    const bookTreatmentButton = await page.locator('text=Book Your Treatment');
    await expect(bookTreatmentButton).toBeVisible();
  });

  test('page navigation works correctly from treatments page', async ({ page }) => {
    // First navigate to the treatments page
    await page.goto('/treatments');
    
    // Find and click on the Ultimate Stemcell Hydrating Repair card
    const ultimateStemcellCard = await page.locator('h3:has-text("Ultimate Stemcell Hydrating")').first();
    await expect(ultimateStemcellCard).toBeVisible();
    
    const learnMoreButton = await page.locator('h3:has-text("Ultimate Stemcell Hydrating")').first()
      .locator('xpath=../..').locator('text=Learn More');
    
    // Click the button to navigate to the Ultimate Stemcell Hydrating Repair page
    await learnMoreButton.click();
    
    // Verify we landed on the correct page
    await expect(page).toHaveURL(/.*\/treatments\/ultimate-stemcell-hydrating-repair/);
    
    // Verify the page title to confirm we're on the right page
    const pageTitle = await page.locator('h1:has-text("Ultimate Stemcell")');
    await expect(pageTitle).toBeVisible();
  });
}); 