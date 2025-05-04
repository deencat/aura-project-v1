import { test, expect } from '@playwright/test';

// Set the test environment variable explicitly in the test file too
process.env.PLAYWRIGHT_TEST = 'true';

test.describe('Admin Authentication Bypass', () => {
  test('can access admin dashboard with auth bypass', async ({ page }) => {
    // Navigate to admin dashboard
    await page.goto('/admin');
    
    // Check that we're on the admin page instead of a login screen
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Check for admin navigation elements
    await expect(page.getByText('Total Services')).toBeVisible();
    await expect(page.getByText('Team Members')).toBeVisible();
  });
  
  test('can access admin services page with auth bypass', async ({ page }) => {
    // Navigate to admin services page
    await page.goto('/admin/services');
    
    // Check we're on the services page
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();
    
    // Check for unique elements on the services page
    await expect(page.getByRole('button', { name: 'Add New Service' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset Filters' })).toBeVisible();
    
    // Check for table existence
    const tableExists = await page.locator('table').isVisible();
    expect(tableExists).toBeTruthy();
    
    // Simply verify the page structure has loaded properly
    await expect(page.locator('table tbody tr').first()).toBeVisible();
  });
  
  test('can access admin team page with auth bypass', async ({ page }) => {
    // Navigate to admin team page
    await page.goto('/admin/team');
    
    // Check we're on the team page
    await expect(page.getByRole('heading', { name: 'Team' })).toBeVisible();
    
    // Basic assertions to verify we're on the right page
    await expect(page.getByText('Manage team members')).toBeVisible();
  });
  
  test('can access admin settings page with auth bypass', async ({ page }) => {
    // Navigate to admin settings page
    await page.goto('/admin/settings');
    
    // Check we're on the settings page
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    
    // Basic assertions for settings page
    await expect(page.getByText('General Settings')).toBeVisible();
  });
}); 