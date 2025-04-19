import { test, expect } from '@playwright/test';

test.describe('Royal Black Scan Treatment Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the page before each test
    await page.goto('/treatments/royal-black-scan');
    // Wait for content to be fully loaded
    await page.waitForSelector('h1:has-text("Royal Black Scan")');
  });

  test('should load Royal Black Scan page with correct content', async ({ page }) => {
    // Check main heading
    await expect(page.locator('h1').filter({ hasText: 'Royal Black Scan' })).toBeVisible();
    
    // Check for treatment tags - use more specific selectors
    await expect(page.locator('span.rounded-full').filter({ hasText: 'Hormonal Spots' })).toBeVisible();
    await expect(page.locator('span.rounded-full').filter({ hasText: 'Age Spots' })).toBeVisible();
    
    // Check for main sections
    await expect(page.getByRole('heading', { name: 'Restore Flawless Skin' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Technology Advantages' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Treatment Process' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Expected Results' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
    
    // Check that booking button exists
    await expect(page.getByRole('button', { name: /book/i })).toBeVisible();
  });
  
  test('should display accordion items when clicked', async ({ page }) => {
    // Find the FAQ section
    const faqSection = page.getByRole('heading', { name: 'Frequently Asked Questions' }).locator('..').locator('..');
    
    // Find and click on the first FAQ item within the FAQ section
    const firstQuestion = faqSection.getByRole('button').first();
    await firstQuestion.click();
    
    // Wait for animation to complete
    await page.waitForTimeout(300);
    
    // Verify some answer content is visible
    await expect(page.getByText('sessions required varies')).toBeVisible();
  });
}); 