import { test, expect } from '@playwright/test';

test.describe('360 Smart Rescue Treatment Page', () => {
  test('page loads correctly with all essential elements', async ({ page }) => {
    // Navigate to the Smart Rescue page
    await page.goto('/treatments/smart-rescue');

    // Verify page title
    const pageTitle = await page.getByRole('heading', { level: 1, name: /360° Smart Rescue/i });
    await expect(pageTitle).toBeVisible();

    // Verify treatment tags are present
    const tags = await page.locator('.inline-block.bg-primary\\/10.text-primary.rounded-full');
    expect(await tags.count()).toBeGreaterThan(3); // We have at least 4, but may be more
    
    // Verify images are loading - check for image elements with src
    const imagesWithSrc = await page.locator('img[src]').count();
    expect(imagesWithSrc).toBeGreaterThan(0);
    
    // Verify Book Now button
    const bookNowButton = await page.getByRole('link', { name: /Book Now/i }).first();
    await expect(bookNowButton).toBeVisible();

    // Verify Treatment Description section
    const treatmentDescSection = await page.getByText(/Complete Skin Salvation/i);
    await expect(treatmentDescSection).toBeVisible();
    
    // Verify key aspects are present
    await expect(page.getByText(/Immediate Soothing Relief/i)).toBeVisible();
    await expect(page.getByText(/Multi-Layer Skin Repair/i)).toBeVisible();
    await expect(page.getByText(/Deep Hydration Infusion/i)).toBeVisible();
    await expect(page.getByText(/Barrier Function Restoration/i)).toBeVisible();

    // Verify Benefits section
    const benefitsSection = await page.getByText(/Benefits of 360° Smart Rescue/i);
    await expect(benefitsSection).toBeVisible();
    
    // Verify FAQ section is present
    const faqSection = await page.getByText(/Frequently Asked Questions/i);
    await expect(faqSection).toBeVisible();
    
    // Verify bottom CTA
    const ctaSection = await page.getByText(/Ready for 360° Smart Rescue/i);
    await expect(ctaSection).toBeVisible();
    
    const bookTreatmentButton = await page.getByRole('link', { name: /Book Your Treatment/i });
    await expect(bookTreatmentButton).toBeVisible();
  });

  test('images are visible on the page', async ({ page }) => {
    // Navigate to the Smart Rescue page
    await page.goto('/treatments/smart-rescue');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check for presence of image elements
    const imgCount = await page.locator('img').count();
    expect(imgCount).toBeGreaterThan(0);
    
    // Verify hero image is visible
    await expect(page.locator('section:first-child img')).toBeVisible();
    
    // Count img elements with src attribute
    const imgsWithSrc = await page.locator('img[src]').count();
    expect(imgsWithSrc).toBeGreaterThan(0);
  });
}); 