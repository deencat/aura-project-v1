import { test, expect } from '@playwright/test';

test.describe('Stretch Mark Treatment Page', () => {
  test('should load the page and display correct content', async ({ page }) => {
    // Navigate to the stretch-mark page
    await page.goto('/treatments/stretch-mark');
    
    // Check if the page title is present
    await expect(page.locator('h1')).toContainText('Advanced Stretch Mark Treatment');
    
    // Verify hero section elements - use a more specific selector
    const bookNowButton = page.locator('[data-testid="hero-book-now"]');
    await expect(bookNowButton).toBeVisible();
    
    // Check if TreatmentImage is loaded in hero section
    const heroImage = page.locator('.relative.h-\\[500px\\] img');
    await expect(heroImage).toBeVisible();
    await expect(heroImage).toHaveAttribute('alt', 'Advanced Stretch Mark Treatment');
  });

  test('should display all treatment benefits', async ({ page }) => {
    await page.goto('/treatments/stretch-mark');
    
    // Check if the benefits section is present - use getByRole with name
    await expect(page.getByRole('heading', { name: 'Benefits of Stretch Mark Treatment' })).toBeVisible();
    
    // Check if the carousel is present - use a more specific selector
    const carousel = page.locator('.relative.rounded-xl.overflow-hidden div[role="region"]');
    await expect(carousel).toBeVisible();
    
    // Check if carousel navigation buttons are present
    await expect(page.getByRole('button', { name: 'Previous slide' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next slide' })).toBeVisible();
    
    // Check if benefit cards are present
    const benefitCards = page.locator('.bg-white.rounded-lg.p-8.text-center');
    await expect(benefitCards).toHaveCount(6);
    
    // Verify specific benefit headings
    const benefitHeadings = page.locator('.bg-white.rounded-lg.p-8.text-center h3');
    await expect(benefitHeadings.nth(0)).toContainText('Effective on All Types');
    await expect(benefitHeadings.nth(1)).toContainText('Natural Healing');
    await expect(benefitHeadings.nth(2)).toContainText('Safe & Comfortable');
  });

  test('should display and interact with the how it works section', async ({ page }) => {
    await page.goto('/treatments/stretch-mark');
    
    // Check if the how it works section is present - use getByRole with name
    await expect(page.getByRole('heading', { name: /How Our Stretch Mark Treatment Works/i })).toBeVisible();
    
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
    await expect(stepHeadings.nth(0)).toContainText('Consultation & Assessment');
    await expect(stepHeadings.nth(2)).toContainText('Micro-Needling');
    await expect(stepHeadings.nth(5)).toContainText('Recovery & Results');
  });

  test('should display and interact with FAQ accordion', async ({ page }) => {
    await page.goto('/treatments/stretch-mark');
    
    // Check if the FAQ section is present - use getByRole with name
    const faqHeading = page.getByRole('heading', { name: 'Frequently Asked Questions' });
    await expect(faqHeading).toBeVisible();
    
    // Find the FAQ section
    const faqSection = page.locator('section').filter({ has: faqHeading });
    
    // Get all accordion triggers
    const accordionTriggers = faqSection.getByRole('button').filter({ has: page.locator('text="Can all stretch marks be treated?"') });
    
    // Click on the first FAQ item
    await accordionTriggers.click();
    
    // Check that the content is now visible - look for the specific answer text
    const firstAnswer = page.getByText('Yes, our treatment is effective on all types of stretch marks, though results may vary');
    await expect(firstAnswer).toBeVisible();
    
    // Close the first item
    await accordionTriggers.click();
    
    // Open the third item - "Is the treatment painful?"
    const thirdTrigger = faqSection.getByRole('button').filter({ has: page.locator('text="Is the treatment painful?"') });
    await thirdTrigger.click();
    
    // Check the content of the third item
    const thirdAnswer = page.getByText('Most clients report minimal discomfort during the procedure');
    await expect(thirdAnswer).toBeVisible();
  });

  test('should have a working booking call-to-action', async ({ page }) => {
    await page.goto('/treatments/stretch-mark');
    
    // Check if the booking section is present
    const lastSection = page.locator('section').last();
    await expect(lastSection).toContainText('Ready to Transform Your Skin?');
    
    // Check if the booking button is present and links to contact page
    const bookingButton = page.locator('[data-testid="final-cta-book-treatment"]');
    await expect(bookingButton).toBeVisible();
    const bookingLink = page.locator('a:has([data-testid="final-cta-book-treatment"])');
    await expect(bookingLink).toHaveAttribute('href', '/contact');
  });
}); 