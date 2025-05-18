import { test, expect } from '@playwright/test';

test.describe('Micro-Needling Treatment Page', () => {
  test('should load the page and display correct content', async ({ page }) => {
    // Navigate to the micro-needling page
    await page.goto('/treatments/micro-needling');
    
    // Check if the page title is present
    await expect(page.locator('h1')).toContainText('Advanced Micro-Needling Therapy');
    
    // Verify hero section elements
    await expect(page.getByRole('link', { name: 'Book Now' })).toBeVisible();
    
    // Check if TreatmentImage is loaded in hero section
    const heroImage = page.locator('.relative.h-\\[500px\\] img');
    await expect(heroImage).toBeVisible();
    await expect(heroImage).toHaveAttribute('alt', 'Advanced Micro-Needling Therapy');
  });

  test('should display all treatment benefits', async ({ page }) => {
    await page.goto('/treatments/micro-needling');
    
    // Check if the benefits section is present
    await expect(page.locator('h2')).toContainText('Benefits of Micro-Needling Therapy');
    
    // Check if the carousel is present
    const carousel = page.locator('div[role="region"]');
    await expect(carousel).toBeVisible();
    
    // Check if carousel navigation buttons are present
    await expect(page.getByRole('button', { name: 'Previous slide' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next slide' })).toBeVisible();
    
    // Check if benefit cards are present
    const benefitCards = page.locator('.bg-white.rounded-lg.p-8.text-center');
    await expect(benefitCards).toHaveCount(6);
    
    // Verify specific benefit headings
    const benefitHeadings = page.locator('.bg-white.rounded-lg.p-8.text-center h3');
    await expect(benefitHeadings.nth(0)).toContainText('Targets Multiple Concerns');
    await expect(benefitHeadings.nth(1)).toContainText('Natural Results');
    await expect(benefitHeadings.nth(2)).toContainText('Safe for All Skin Types');
  });

  test('should display and interact with the how it works section', async ({ page }) => {
    await page.goto('/treatments/micro-needling');
    
    // Check if the how it works section is present
    await expect(page.locator('h2')).toContainText('How Micro-Needling Works');
    
    // Check if all steps are present
    const steps = page.locator('.bg-gray-50.rounded-lg.p-8.pt-12');
    await expect(steps).toHaveCount(6);
    
    // Verify step numbers
    const stepNumbers = page.locator('.absolute.-top-4.-left-4.w-12.h-12');
    await expect(stepNumbers).toHaveCount(6);
    await expect(stepNumbers.nth(0)).toContainText('1');
    await expect(stepNumbers.nth(5)).toContainText('6');
    
    // Verify specific step headings
    const stepHeadings = page.locator('.bg-gray-50.rounded-lg.p-8.pt-12 h3');
    await expect(stepHeadings.nth(0)).toContainText('Preparation');
    await expect(stepHeadings.nth(2)).toContainText('Serum Application');
    await expect(stepHeadings.nth(5)).toContainText('Progressive Results');
  });

  test('should display and interact with FAQ accordion', async ({ page }) => {
    await page.goto('/treatments/micro-needling');
    
    // Check if the FAQ section is present
    await expect(page.locator('h2')).toContainText('Frequently Asked Questions');
    
    // Check if accordion items are present
    const accordionItems = page.locator('[data-state="closed"]');
    await expect(accordionItems).toHaveCount(5);
    
    // Click on the first FAQ item
    await page.locator('[data-state="closed"]').first().click();
    
    // Verify that the content is now visible
    await expect(page.locator('[data-state="open"]')).toBeVisible();
    
    // Check the content of the opened accordion
    const openedContent = page.locator('[data-state="open"] div[data-state="open"]');
    await expect(openedContent).toContainText('Most clients report minimal discomfort');
    
    // Close the first item and open another
    await page.locator('[data-state="open"]').click();
    await page.locator('[data-state="closed"]').nth(2).click();
    
    // Verify the new opened content
    const newOpenedContent = page.locator('[data-state="open"] div[data-state="open"]');
    await expect(newOpenedContent).toContainText('One of the advantages of micro-needling is its minimal downtime');
  });

  test('should have a working booking call-to-action', async ({ page }) => {
    await page.goto('/treatments/micro-needling');
    
    // Check if the booking section is present
    await expect(page.locator('section').last()).toContainText('Ready for Transformative Results?');
    
    // Check if the booking button is present and links to contact page
    const bookingButton = page.locator('section').last().getByRole('link', { name: 'Book Your Treatment' });
    await expect(bookingButton).toBeVisible();
    await expect(bookingButton).toHaveAttribute('href', '/contact');
  });
}); 