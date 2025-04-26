import { test, expect } from '@playwright/test';

test.describe('Stretch Mark Repair Page', () => {
  test('page loads successfully and displays key elements', async ({ page }) => {
    // Navigate to the stretch mark page
    await page.goto('/body-care/stretch-mark');

    // Check if the page title is correct
    await expect(page.getByRole('heading', { name: /Stretch Mark Repair/i })).toBeVisible();

    // Check if the booking button is present
    await expect(page.getByRole('button', { name: /Book Now/i }).first()).toBeVisible();

    // Check if the main sections are present
    await expect(page.getByText(/Understanding Stretch Marks/i)).toBeVisible();
    await expect(page.getByText(/Our Dual Approach Technology/i)).toBeVisible();
    await expect(page.getByText(/Proven Results/i)).toBeVisible();
    await expect(page.getByText(/Your Treatment Journey/i)).toBeVisible();
    await expect(page.getByText(/Frequently Asked Questions/i)).toBeVisible();
    await expect(page.getByText(/Investment in Your Confidence/i)).toBeVisible();

    // Check if the pricing options are present
    await expect(page.getByText(/Single Session/i)).toBeVisible();
    await expect(page.getByText(/Package of 4/i)).toBeVisible();
    await expect(page.getByText(/Package of 6/i)).toBeVisible();
  });

  test('redirect works from cell-beauty to body-care path', async ({ page }) => {
    // Navigate to the cell-beauty stretch mark page
    await page.goto('/cell-beauty/stretch-mark');

    // Check that we are redirected to the body-care path
    await expect(page).toHaveURL('/body-care/stretch-mark');

    // Check if the page title is correct after redirect
    await expect(page.getByRole('heading', { name: /Stretch Mark Repair/i })).toBeVisible();
  });

  test('navigation from homepage to stretch mark page works', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Open the body care menu (since test environment may behave differently than hover effects in production)
    await page.getByRole('link', { name: 'Body Care' }).click();

    // Click on the Stretch Mark Repair link
    await page.getByRole('link', { name: 'Stretch Mark Repair' }).click();

    // Check that we are on the correct page
    await expect(page).toHaveURL('/body-care/stretch-mark');
    await expect(page.getByRole('heading', { name: /Stretch Mark Repair/i })).toBeVisible();
  });

  test('booking buttons navigate to contact page', async ({ page }) => {
    // Navigate to the stretch mark page
    await page.goto('/body-care/stretch-mark');

    // Click on the main booking button
    await page.getByRole('button', { name: /Book Now/i }).first().click();

    // Check that we are on the contact page
    await expect(page).toHaveURL('/contact');
  });
}); 