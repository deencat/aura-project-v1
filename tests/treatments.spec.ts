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
}); 