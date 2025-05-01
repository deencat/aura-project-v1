import { test, expect } from '@playwright/test';

test.describe('Hair Removal New Page', () => {
  test('should display the page correctly', async ({ page }) => {
    // Navigate to the hair removal new page
    await page.goto('/body-care/hair-removal-new');

    // Verify the page title is present and correct
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toContainText('SnowGlow Smooth');
    await expect(pageTitle).toContainText('Full-Body Laser Hair Removal');

    // Verify main sections are present
    // Hero section
    await expect(page.locator('section').filter({ hasText: 'SnowGlow Smooth' }).first()).toBeVisible();
    
    // Urban Women section
    const urbanWomenSection = page.locator('section h2', { hasText: 'For the Urban Woman' });
    await expect(urbanWomenSection).toBeVisible();
    
    // Technology section
    const technologySection = page.locator('section h2', { hasText: 'Triple Wavelength Technology' });
    await expect(technologySection).toBeVisible();
    
    // Benefits section
    const benefitsSection = page.locator('section h2', { hasText: 'Revolutionary Benefits' });
    await expect(benefitsSection).toBeVisible();
    
    // Premium Experience section
    const premiumSection = page.locator('section h2', { hasText: 'The Premium Experience' });
    await expect(premiumSection).toBeVisible();
    
    // Call to action section
    const ctaSection = page.locator('section h2', { hasText: 'Experience Silky-Smooth, Hair-Free Skin Today' });
    await expect(ctaSection).toBeVisible();
  });

  test('should have functioning CTA buttons', async ({ page }) => {
    await page.goto('/body-care/hair-removal-new');
    
    // Use a more specific selector for the main CTA button in the hero section
    const heroSection = page.locator('section').first();
    const bookNowButton = heroSection.locator('button', { hasText: 'BOOK NOW' });
    await expect(bookNowButton).toBeVisible();
    
    // Use a more specific selector for the consultation button in the CTA section
    const ctaSection = page.locator('section').filter({ hasText: 'Experience Silky-Smooth, Hair-Free Skin Today' });
    const scheduleButton = ctaSection.locator('button', { hasText: 'SCHEDULE CONSULTATION' });
    await expect(scheduleButton).toBeVisible();
  });

  test('should load TreatmentImage components correctly', async ({ page }) => {
    await page.goto('/body-care/hair-removal-new');
    
    // Verify the hero image is loaded
    const heroImageContainer = page.locator('section').first().locator('.relative.h-\\[500px\\]');
    await expect(heroImageContainer).toBeVisible();
    
    // Verify the how-it-works image
    const howItWorksSection = page.locator('section', { hasText: 'For the Urban Woman' });
    const howItWorksImage = howItWorksSection.locator('.rounded-xl.overflow-hidden');
    await expect(howItWorksImage).toBeVisible();
    
    // Verify the technology image
    const technologySection = page.locator('section', { hasText: 'Triple Wavelength Technology' });
    const technologyImage = technologySection.locator('.rounded-xl.overflow-hidden');
    await expect(technologyImage).toBeVisible();
    
    // Verify the benefits image
    const benefitsSection = page.locator('section', { hasText: 'Revolutionary Benefits' });
    const benefitsImage = benefitsSection.locator('.rounded-xl.overflow-hidden');
    await expect(benefitsImage).toBeVisible();
  });
  
  test('should display testimonial correctly', async ({ page }) => {
    await page.goto('/body-care/hair-removal-new');
    
    // Verify testimonial section
    const testimonialSection = page.locator('.bg-gray-800\\/80.rounded-xl');
    await expect(testimonialSection).toBeVisible();
    
    // Verify testimonial content
    await expect(testimonialSection).toContainText('Life-changing results');
    await expect(testimonialSection).toContainText('Michelle T.');
    
    // Verify 5-star rating
    const stars = testimonialSection.locator('svg.text-teal-400');
    await expect(stars).toHaveCount(5);
  });
}); 