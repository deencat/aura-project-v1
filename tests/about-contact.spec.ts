import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('loads correctly with TreatmentImage components', async ({ page }) => {
    // Navigate to the about page
    await page.goto('/about');
    
    // Verify page title
    await expect(page.locator('h1')).toContainText('About Aura Beauty');
    
    // Check for team member TreatmentImage components (3 of them)
    const teamImages = page.locator('.aspect-\\[3\\/4\\].object-cover');
    await expect(teamImages).toHaveCount(3);
    
    // Verify key sections are present
    await expect(page.locator('h2:has-text("Our Story")')).toBeVisible();
    await expect(page.locator('h2:has-text("Our Mission")')).toBeVisible();
    await expect(page.locator('h2:has-text("Our Values")')).toBeVisible();
    await expect(page.locator('h2:has-text("Expert Team")')).toBeVisible();
    
    // Check that sections have appropriate content
    await expect(page.locator('h3:has-text("Client-Centered")')).toBeVisible();
    await expect(page.locator('h3:has-text("Safety First")')).toBeVisible();
    await expect(page.locator('h3:has-text("Innovation")')).toBeVisible();
  });
});

test.describe('Contact Page', () => {
  test('loads correctly with TreatmentImage component', async ({ page }) => {
    // Navigate to the contact page
    await page.goto('/contact');
    
    // Verify page title
    await expect(page.locator('h1')).toContainText('Contact Us');
    
    // Check for the map TreatmentImage component
    const mapImage = page.locator('.aspect-\\[16\\/9\\].object-cover');
    await expect(mapImage).toBeVisible();
    
    // Verify form fields are present
    await expect(page.locator('input#first-name')).toBeVisible();
    await expect(page.locator('input#last-name')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#phone')).toBeVisible();
    await expect(page.locator('textarea#message')).toBeVisible();
    
    // Check for contact information
    await expect(page.locator('h3:has-text("Main Location")')).toBeVisible();
    await expect(page.locator('h3:has-text("Opening Hours")')).toBeVisible();
    
    // Verify social media links are present
    const socialLinks = page.locator('a.flex.h-10.w-10');
    await expect(socialLinks).toHaveCount(6);
  });
}); 