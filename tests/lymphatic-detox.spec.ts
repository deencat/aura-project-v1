import { test, expect } from '@playwright/test';

test.describe('Lymphatic Detox Page', () => {
  test('page loads successfully and displays key elements', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Check page title
    await expect(page.getByRole('heading', { name: /Dual-Action Lymphatic Detox/i })).toBeVisible();
    
    // Check booking button
    await expect(page.getByRole('link', { name: /BOOK NOW/i })).toBeVisible();
    
    // Check main description text
    await expect(page.getByText(/urban life takes a toll on our bodies/i)).toBeVisible();
    
    // Check "How It Works" section
    await expect(page.getByRole('heading', { name: /How It Works/i })).toBeVisible();
    const howItWorksSection = page.locator('#how-it-works');
    await expect(howItWorksSection).toBeVisible();
    
    // Check "Benefits" section
    await expect(page.getByRole('heading', { name: /Benefits/i })).toBeVisible();
    const benefitsSection = page.locator('#benefits');
    await expect(benefitsSection).toBeVisible();
    
    // Verify benefits are displayed
    const benefitItems = page.locator('#benefits .benefit-item');
    await expect(benefitItems).toBeVisible();
    
    // Check "Results" section
    await expect(page.getByRole('heading', { name: /Results/i })).toBeVisible();
    const resultsGallery = page.locator('#results-gallery');
    await expect(resultsGallery).toBeVisible();
    
    // Check FAQ section
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
    const faqSection = page.locator('#faq-section');
    await expect(faqSection).toBeVisible();
    
    // Verify FAQ items are present
    const faqItems = page.locator('#faq-section .faq-item');
    await expect(faqItems).toBeVisible();
    
    // Check call-to-action section at the bottom
    await expect(page.getByRole('link', { name: /Book Your Lymphatic Detox/i })).toBeVisible();
  });
  
  test('navigation from homepage works', async ({ page }) => {
    // Start from homepage
    await page.goto('/');
    
    // Navigate to Body Care in the menu
    await page.getByRole('link', { name: /Body Care/i }).click();
    
    // From the Body Care page or dropdown, click on Lymphatic Detox
    await page.getByRole('link', { name: /Lymphatic Detox/i }).click();
    
    // Verify we reached the correct page
    await expect(page).toHaveURL(/.*\/body-care\/lymphatic-detox/);
    await expect(page.getByRole('heading', { name: /Dual-Action Lymphatic Detox/i })).toBeVisible();
  });
  
  test('fade-in animations are applied correctly', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Check for animation classes on page sections
    const fadeInSections = page.locator('.animate-fade-in');
    await expect(fadeInSections).toBeVisible();
    
    // Verify at least one of the sections has the animation class
    const howItWorksSection = page.locator('#how-it-works');
    await expect(howItWorksSection.locator('..').or(howItWorksSection)).toHaveClass(/animate-fade-in/);
    
    // Verify benefits section has animation
    const benefitsSection = page.locator('#benefits');
    await expect(benefitsSection.locator('..').or(benefitsSection)).toHaveClass(/animate-fade-in/);
  });
  
  test('book now button navigates to contact page', async ({ page }) => {
    // Navigate to the lymphatic detox page
    await page.goto('/body-care/lymphatic-detox');
    
    // Click the primary booking button
    await page.getByRole('link', { name: /BOOK NOW/i }).first().click();
    
    // Verify navigation to contact page
    await expect(page).toHaveURL(/.*\/contact/);
    await expect(page.getByRole('heading', { name: /Contact/i, exact: false })).toBeVisible();
  });
}); 