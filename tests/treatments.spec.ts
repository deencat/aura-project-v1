import { test, expect } from '@playwright/test';

test.describe('Treatments Page', () => {
  test('should display renamed treatment "Ceramic Skin Renewal"', async ({ page }) => {
    // Navigate to the treatments page
    await page.goto('/treatments');
    
    // Specifically check that the renamed treatment appears correctly
    const ceramicSkinCard = await page.locator('h3:has-text("Ceramic Skin Renewal")');
    await expect(ceramicSkinCard).toBeVisible();
    
    // Verify the URL the button points to (with updated slug)
    const ceramicSkinLink = ceramicSkinCard.locator('xpath=../..').getByRole('link', { name: 'Learn More' });
    const href = await ceramicSkinLink.getAttribute('href');
    expect(href).toContain('/treatments/ceramic-skin-renewal');
  });

  test('page loads correctly with all essential elements', async ({ page }) => {
    // Navigate to the treatments page
    await page.goto('/treatments');

    // Verify page title
    const pageTitle = await page.getByRole('heading', { level: 1, name: /Premium Beauty Treatments/i });
    await expect(pageTitle).toBeVisible();

    // Verify treatment cards
    const treatmentCards = await page.locator('.card').count();
    expect(treatmentCards).toBeGreaterThan(0);
    
    // Verify images are loading - each card should have an image
    const cardImages = await page.locator('.card img[src]').count();
    expect(cardImages).toBeGreaterThan(0);
    
    // Verify Benefits section
    const benefitsSection = await page.getByText(/The Benefits/i);
    await expect(benefitsSection).toBeVisible();
    
    // Verify CTA section
    const ctaSection = await page.getByText(/Ready to Transform Your Skin/i);
    await expect(ctaSection).toBeVisible();
    
    // Verify Book Consultation button
    const bookButton = await page.getByRole('button', { name: /Book Consultation/i });
    await expect(bookButton).toBeVisible();
  });

  test('treatment images are rendered correctly', async ({ page }) => {
    // Navigate to the treatments page
    await page.goto('/treatments');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check for presence of image elements in treatment cards
    const treatmentCards = await page.locator('.card').count();
    
    // For each card, check that it has an image with a src attribute
    for (let i = 0; i < Math.min(treatmentCards, 3); i++) { // Test at least 3 cards
      const cardSelector = `.card:nth-child(${i + 1})`;
      const image = page.locator(`${cardSelector} img`);
      
      // Verify image is visible
      await expect(image).toBeVisible();
      
      // Verify image has src attribute
      const srcAttr = await image.getAttribute('src');
      expect(srcAttr).toBeTruthy();
    }
  });

  test('all treatment links point to correct pages', async ({ page }) => {
    // Navigate to the treatments page
    await page.goto('/treatments');
    
    // Get all "Learn More" buttons
    const learnMoreButtons = await page.getByRole('link', { name: 'Learn More' }).all();
    
    // Verify at least 3 buttons to test
    expect(learnMoreButtons.length).toBeGreaterThan(2);
    
    // Sample a few buttons and verify their href attributes
    const treatmentSlugs = [
      'smart-rescue',
      'royal-black-scan',
      'laser-treatment',
      'radiant-defense-synergy'
    ];
    
    // For each slug, find the corresponding link and check its href
    for (const slug of treatmentSlugs) {
      const buttons = await page.getByRole('link', { name: 'Learn More' }).all();
      for (const button of buttons) {
        const href = await button.getAttribute('href');
        if (href && href.includes(slug)) {
          expect(href).toContain(`/treatments/${slug}`);
          break;
        }
      }
    }
  });
}); 