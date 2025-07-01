import { test, expect } from '@playwright/test';

test.describe('Header Navigation', () => {
  test('desktop header displays correctly', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Navigate to homepage
    await page.goto('/');
    
    // Verify main header exists
    const header = page.locator('[data-testid="main-header"]');
    await expect(header).toBeVisible();
    
    // Check logo is visible
    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();
    
    // Check Book Now button is visible (use specific desktop button)
    const bookButton = page.locator('[data-testid="header-book-now-desktop"]');
    await expect(bookButton).toBeVisible();
    
    // Verify at least some nav items are visible
    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
  });
  
  test('mobile header shows hamburger menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Navigate to homepage
    await page.goto('/');
    
    // Verify main header exists
    const header = page.locator('[data-testid="main-header"]');
    await expect(header).toBeVisible();
    
    // Logo should be visible on mobile
    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();
    
    // Desktop navigation should be hidden on mobile
    const desktopNav = page.locator('nav.lg\\:block');
    await expect(desktopNav).not.toBeVisible();
  });
}); 