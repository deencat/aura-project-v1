import { test, expect } from '@playwright/test';

test.describe('Treatments Landing Page', () => {
  test('page loads correctly with all essential content', async ({ page }) => {
    // Navigate to the treatments page
    await page.goto('/treatments');

    // Verify page title
    const pageTitle = await page.getByRole('heading', { level: 1, name: /Premium Beauty Treatments/i });
    await expect(pageTitle).toBeVisible();
    
    // Verify treatment titles are visible (sample a few)
    await expect(page.getByRole('heading', { name: 'Royal Black Scan' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Peeled Egg Skin' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Collagen Regeneration' })).toBeVisible();
    
    // Verify some descriptions are present
    await expect(page.getByText(/Advanced technology that targets/i)).toBeVisible();
    await expect(page.getByText(/Revolutionary treatment that creates silky/i)).toBeVisible();
    
    // Verify Learn More text exists
    await expect(page.getByRole('button', { name: 'Learn More' }).first()).toBeVisible();
    
    // Verify Benefits section exists
    await expect(page.getByRole('heading', { name: /The Benefits/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Safe & Effective' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Personalized Care' })).toBeVisible();
    
    // Verify CTA section exists
    await expect(page.getByRole('heading', { name: /Ready to Transform Your Skin/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Book Consultation' })).toBeVisible();
  });

  test('page contains images', async ({ page }) => {
    // Navigate to the treatments page
    await page.goto('/treatments');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check for presence of image elements
    const imgCount = await page.locator('img').count();
    expect(imgCount).toBeGreaterThan(0);
    
    // Verify images have src attributes
    const imgsWithSrc = await page.locator('img[src]').count();
    expect(imgsWithSrc).toBeGreaterThan(0);
  });
}); 