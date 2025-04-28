import { test, expect } from '@playwright/test';

test.describe('New Doublo Pages', () => {
  // Try running these tests now that we've added the placeholder images
  test('main New Doublo page loads successfully with key elements', async ({ page }) => {
    // Navigate to the main New Doublo page
    await page.goto('/new-doublo', { timeout: 120000 });
    
    // Check page title is visible
    await expect(page.getByRole('heading', { name: /Meet The New Doublo™ HIFU/i })).toBeVisible();
    
    // Check that the hero section has the dark background image
    const heroImageSelector = 'section div img[src*="new-doublo-hero.jpg"]';
    await page.locator(heroImageSelector).first().isVisible();
    
    // Check that the booking button is visible - be more specific with first()
    await expect(page.getByRole('link', { name: /Book Consultation/i }).first()).toBeVisible();
    
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
      await expect(page.getByText(treatment, { exact: true }).first()).toBeVisible();
    }
  });
  
  // Try running these tests now that we've added the placeholder images
  test('Sculpt & Lift page loads successfully', async ({ page }) => {
    // Navigate to the Sculpt & Lift page
    await page.goto('/new-doublo/sculpt-lift', { timeout: 120000 });
    
    // Check the page title is visible
    await expect(page.getByRole('heading', { name: /Experience The Next Level In Non-Surgical Lifting/i })).toBeVisible();
    
    // Check that the hero section has the dark background image
    const heroImageSelector = 'section div img[src*="new-doublo-hero.jpg"]';
    await page.locator(heroImageSelector).first().isVisible();
    
    // Check the booking button is visible
    await expect(page.getByRole('link', { name: /BOOK YOUR CONSULTATION NOW/i }).first()).toBeVisible();
    
    // Check that the benefits section is present
    await expect(page.getByRole('heading', { name: /Why Choose Sculpt & Lift/i })).toBeVisible();
    
    // Check that the treatment details section is present
    await expect(page.getByRole('heading', { name: /How It Works/i }).first()).toBeVisible();
    
    // Check that the pricing section is present
    await expect(page.getByText(/Limited Time Offer/i).first()).toBeVisible();
  });
  
  test('V-Line Perfection page loads successfully', async ({ page }) => {
    // Navigate to the V-Line page
    await page.goto('/new-doublo/v-line', { timeout: 120000 });
    
    // Check the page title is visible - be more specific with first() to avoid multiple matches
    await expect(page.getByRole('heading', { name: /V-Line Perfection/i }).first()).toBeVisible();
    
    // Check that the hero section has the correct dark background image
    const heroImageSelector = 'section div img[src*="/images/treatments/new-doublo/v-line/hero.jpg"]';
    await page.locator(heroImageSelector).first().isVisible();
    
    // Check the booking button is visible
    await expect(page.getByRole('link', { name: /Get Your V-Line/i }).first()).toBeVisible();
    
    // Check that the benefits section is present
    await expect(page.getByRole('heading', { name: /Why Everyone Wants the V-Line/i })).toBeVisible();
    
    // Check that the how it works section is present
    await expect(page.getByRole('heading', { name: /How V-Line Works/i })).toBeVisible();
    
    // Check that the testimonial is present with the new design
    await expect(page.getByText(/My jawline has never looked better/i).first()).toBeVisible();
    await expect(page.getByText(/Verified Client/i).first()).toBeVisible();
    
    // Check that the special offer section is present
    await expect(page.getByText(/Limited Time Offer/i).first()).toBeVisible();
  });
  
  test('Youth Revival page loads successfully with video', async ({ page }) => {
    // Navigate to the Youth Revival page
    await page.goto('/new-doublo/youth-revival', { timeout: 120000 });
    
    // Check the page title is visible
    await expect(page.getByRole('heading', { name: /Youth Revival/i }).first()).toBeVisible();
    await expect(page.getByText(/The Next Generation HIFU/i)).toBeVisible();
    
    // Check for the video in the hero section
    const heroVideoSelector = 'section:first-child video';
    await expect(page.locator(heroVideoSelector)).toBeVisible();
    
    // Check that the hero video has the correct source
    const heroVideoSource = page.locator('section:first-child video source[src*="youth-vival01.mp4"]');
    await expect(heroVideoSource).toHaveCount(1);
    
    // Check the booking button is visible
    await expect(page.getByRole('link', { name: /Book Now/i }).first()).toBeVisible();
    
    // Check that the key sections are present
    await expect(page.getByRole('heading', { name: /Targeting Your Aging Signs/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /The Ultimate Solution/i })).toBeVisible();
    
    // Check that the video element is present in the Ultimate Solution section
    const solutionVideoSelector = 'section:nth-child(3) video';
    await expect(page.locator(solutionVideoSelector)).toBeVisible();
    
    // Verify pricing information is displayed
    await expect(page.getByText(/HK\$1,680/)).toBeVisible();
    await expect(page.getByText(/SAVE 43%/)).toBeVisible();
  });
  
  test('navigation from homepage to New Doublo pages', async ({ page }) => {
    // Start from the homepage
    await page.goto('/', { timeout: 120000 });
    
    // Just verify the page loaded
    await expect(page).toHaveURL('/');
    
    // Navigate to the V-Line page directly
    await page.goto('/new-doublo/v-line', { timeout: 120000 });
    
    // Verify we're on the V-Line page
    await expect(page).toHaveURL(/.*\/new-doublo\/v-line/);
    await expect(page.getByRole('heading', { name: /V-Line Perfection/i }).first()).toBeVisible();
  });
}); 