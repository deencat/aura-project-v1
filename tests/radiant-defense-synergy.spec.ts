import { test, expect } from '@playwright/test';

test.describe('Radiant Defense Synergy Treatment Page', () => {
  test('page loads correctly with all essential elements', async ({ page }) => {
    // Navigate to the Radiant Defense Synergy page
    await page.goto('/treatments/radiant-defense-synergy');

    // Verify page title with new format
    const pageTitle = await page.locator('h1:has-text("Radiant Defense Synergy Treatment")');
    await expect(pageTitle).toBeVisible();
    
    // Verify subtitle with new joint benefits mention
    await expect(page.locator('h1 span.text-primary:has-text("Joint Benefits of Resveratrol & Immune Probiotics")')).toBeVisible();

    // Check for hero section
    await expect(page.locator('section').first()).toBeVisible();
    
    // Check for treatment tags - now we have 5 tags including Antioxidant and Anti-Aging
    await expect(page.locator('.mt-6.flex.flex-wrap.gap-3')).toBeVisible();
    const tags = await page.locator('.inline-block.bg-primary\\/10.text-primary.rounded-full');
    await expect(tags).toHaveCount(5);
    
    // Check for Book Now button
    const bookButton = await page.locator('[data-testid="hero-book-now"]');
    await expect(bookButton).toBeVisible();
    
    // Check for Key Joint Benefits section
    const benefitsSectionTitle = await page.locator('h2:has-text("Key Joint")');
    await expect(benefitsSectionTitle).toBeVisible();
    
    // Check for specific benefits
    await expect(page.locator('h3:has-text("Deep Purification & Renewal")')).toBeVisible();
    await expect(page.locator('h3:has-text("Strengthened Skin Immunity")')).toBeVisible();
    await expect(page.locator('h3:has-text("Antioxidant & Anti-Aging Power")')).toBeVisible();
    await expect(page.locator('h3:has-text("Soothing & Repairing")')).toBeVisible();
    
    // Check for Key Ingredients section
    await expect(page.locator('h3:has-text("Key Ingredients")')).toBeVisible();
    
    // Check for target audience section
    await expect(page.locator('h3:has-text("Who Is It For?")')).toBeVisible();
    
    // Check for benefits section
    const treatmentBenefitsTitle = await page.locator('h2:has-text("Benefits of")');
    await expect(treatmentBenefitsTitle).toBeVisible();
    
    // Check for benefit icons - these replace the carousel
    const benefitIcons = await page.locator('.mx-auto.mb-6.flex.h-16.w-16.items-center.justify-center.rounded-full.bg-primary\\/10.text-primary');
    const count = await benefitIcons.count();
    expect(count).toBeGreaterThan(0);
    
    // Check for FAQ section
    const faqTitle = await page.locator('h2:has-text("Frequently Asked")');
    await expect(faqTitle).toBeVisible();
    
    // Check for booking section at the bottom
    const bookingTitle = await page.locator('h2:has-text("Ready for")');
    await expect(bookingTitle).toBeVisible();
    const bookingButton = await page.locator('[data-testid="final-cta-book-treatment"]');
    await expect(bookingButton).toBeVisible();
  });

  test('page navigation works correctly from treatments page', async ({ page }) => {
    // Navigate to the treatments page
    await page.goto('/treatments');
    
    // Find the Radiant Defense Synergy card and click its Learn More button
    const radiantDefenseCard = await page.locator('h3:has-text("Radiant Defense Synergy")').locator('..');
    const learnMoreButton = await radiantDefenseCard.locator('text=Learn More');
    await learnMoreButton.click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/.*\/treatments\/radiant-defense-synergy/);
    
    // Verify the page title is visible
    const pageTitle = await page.locator('h1:has-text("Radiant Defense Synergy Treatment")');
    await expect(pageTitle).toBeVisible();
  });
}); 