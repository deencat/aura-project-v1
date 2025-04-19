import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test('should load the admin dashboard page', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('h1')).toHaveText('Dashboard');
    
    // Check that the statistics cards are displayed
    const statsCards = page.locator('.grid >> .card');
    await expect(statsCards).toHaveCount(4);
    
    // Check that the service statistics card contains the correct data
    const servicesCard = page.locator('text=Total Services').first();
    await expect(servicesCard).toBeVisible();
    
    // Check that the recent activity section is displayed
    await expect(page.locator('text=Recent Activity')).toBeVisible();
    
    // Check that the quick actions section is displayed
    await expect(page.locator('text=Quick Actions')).toBeVisible();
  });
  
  test('should navigate to services page', async ({ page }) => {
    await page.goto('/admin');
    
    // Click on the Services link in the sidebar
    await page.click('text=Services');
    
    // Check that we've navigated to the services page
    await expect(page).toHaveURL('/admin/services');
    await expect(page.locator('h1')).toHaveText('Services');
    
    // Check that the services table is displayed
    const servicesTable = page.locator('table');
    await expect(servicesTable).toBeVisible();
  });
  
  test('should navigate to add new service page', async ({ page }) => {
    await page.goto('/admin/services');
    
    // Click on the Add New Service button
    await page.click('text=Add New Service');
    
    // Check that we've navigated to the add new service page
    await expect(page).toHaveURL('/admin/services/new');
    await expect(page.locator('h1')).toHaveText('Add New Service');
    
    // Check that the form is displayed
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();
    
    // Test that the slug is auto-generated from the name
    await nameInput.fill('Test Service Name');
    const slugInput = page.locator('input[name="slug"]');
    await expect(slugInput).toHaveValue('test-service-name');
    
    // Test that the language tabs work
    await page.click('text=Traditional Chinese');
    await expect(page.locator('button:has-text("Traditional Chinese")')).toHaveClass(/border-primary/);
  });
  
  test('should filter services on the services page', async ({ page }) => {
    await page.goto('/admin/services');
    
    // Enter a search term
    await page.fill('input[type="search"]', 'Facial');
    
    // Check that the filtered results are displayed
    const rows = page.locator('tbody tr');
    
    // Wait for the filtering to apply
    await page.waitForTimeout(500);
    
    // Get the count of rows
    const rowCount = await rows.count();
    
    // Check that at least one row is displayed
    expect(rowCount).toBeGreaterThan(0);
    
    // Check that all displayed rows contain the search term
    for (let i = 0; i < rowCount; i++) {
      const rowText = await rows.nth(i).textContent();
      expect(rowText.toLowerCase()).toContain('facial');
    }
  });
}); 