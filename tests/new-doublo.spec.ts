import { test, expect } from '@playwright/test';

test.describe('New Doublo Pages', () => {
  test('main New Doublo page loads successfully with key elements', async ({ page }) => {
    // Navigate to the main New Doublo page
    await page.goto('/new-doublo');
    
    // Check page title is visible
    await expect(page.getByRole('heading', { name: /Meet The New Doublo™ HIFU/i })).toBeVisible();
    
    // Check that the hero section has the dark background image
    const heroImageSelector = 'section div img[src*="new-doublo-hero.jpg"]';
    await expect(page.locator(heroImageSelector).first()).toBeVisible();
    
    // Check that the booking button is visible
    await expect(page.getByRole('link', { name: /Book Consultation/i })).toBeVisible();
    
    // Check that the technology section is visible
    await expect(page.getByRole('heading', { name: /World's First Dual-Action Technology/i })).toBeVisible();
    
    // Check that the treatments section is visible
    await expect(page.getByRole('heading', { name: /Sculpt Your Perfect Look/i })).toBeVisible();
    
    // Verify all four treatment options are shown
    const treatmentOptions = [
      'Sculpt & Lift',
      'V-Line Perfection',
      'Youth Revival',
      'Neck Rejuvenation'
    ];
    
    for (const treatment of treatmentOptions) {
      await expect(page.getByText(treatment, { exact: true })).toBeVisible();
    }
  });
  
  test('Sculpt & Lift page loads successfully', async ({ page }) => {
    // Navigate to the Sculpt & Lift page
    await page.goto('/new-doublo/sculpt-lift');
    
    // Check the page title is visible
    await expect(page.getByRole('heading', { name: /Experience The Next Level In Non-Surgical Lifting/i })).toBeVisible();
    
    // Check that the hero section has the dark background image
    const heroImageSelector = 'section div img[src*="new-doublo-hero.jpg"]';
    await expect(page.locator(heroImageSelector).first()).toBeVisible();
    
    // Check the booking button is visible
    await expect(page.getByRole('link', { name: /BOOK YOUR CONSULTATION NOW/i })).toBeVisible();
    
    // Check that the benefits section is present
    await expect(page.getByRole('heading', { name: /Why Choose Sculpt & Lift/i })).toBeVisible();
    
    // Check that the treatment details section is present
    await expect(page.getByRole('heading', { name: /How It Works/i })).toBeVisible();
    
    // Check that the pricing section is present
    await expect(page.getByText(/Limited Time Offer/i)).toBeVisible();
  });
  
  test('V-Line Perfection page loads successfully', async ({ page }) => {
    // Navigate to the V-Line page
    await page.goto('/new-doublo/v-line');
    
    // Check the page title is visible
    await expect(page.getByRole('heading', { name: /V-Line Perfection/i })).toBeVisible();
    
    // Check that the hero section has the correct dark background image
    const heroImageSelector = 'section div img[src*="new-doublo-hero-1.jpg"]';
    await expect(page.locator(heroImageSelector).first()).toBeVisible();
    
    // Check the booking button is visible
    await expect(page.getByRole('link', { name: /Get Your V-Line/i })).toBeVisible();
    
    // Check that the benefits section is present
    await expect(page.getByRole('heading', { name: /Why Everyone Wants the V-Line/i })).toBeVisible();
    
    // Check that the how it works section is present
    await expect(page.getByRole('heading', { name: /How V-Line Works/i })).toBeVisible();
    
    // Check that the testimonial is present with the new design
    await expect(page.getByText(/My jawline has never looked better/i)).toBeVisible();
    await expect(page.getByText(/Verified Client/i)).toBeVisible();
    
    // Check that the special offer section is present
    await expect(page.getByText(/Limited Time Offer/i)).toBeVisible();
  });
  
  test('navigation from homepage to New Doublo pages', async ({ page }) => {
    // Start from the homepage
    await page.goto('/');
    
    // Navigate to the New Doublo section via the navigation menu
    await page.getByRole('link', { name: /New Doublo/i }).first().hover();
    
    // Click on the Sculpt & Lift option in the dropdown
    await page.getByRole('link', { name: /Sculpt & Lift/i }).click();
    
    // Verify we're on the Sculpt & Lift page
    await expect(page).toHaveURL(/.*\/new-doublo\/sculpt-lift/);
    await expect(page.getByRole('heading', { name: /Experience The Next Level/i })).toBeVisible();
    
    // Navigate back to the homepage
    await page.goto('/');
    
    // Navigate to the New Doublo section again
    await page.getByRole('link', { name: /New Doublo/i }).first().hover();
    
    // Click on the V-Line Perfection option
    await page.getByRole('link', { name: /V-Line Perfection/i }).click();
    
    // Verify we're on the V-Line page
    await expect(page).toHaveURL(/.*\/new-doublo\/v-line/);
    await expect(page.getByRole('heading', { name: /V-Line Perfection/i })).toBeVisible();
  });
}); 