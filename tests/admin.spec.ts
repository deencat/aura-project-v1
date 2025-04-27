import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test('admin dashboard page loads with statistics cards', async ({ page }) => {
    // Navigate to the admin dashboard
    await page.goto('/admin');
    
    // Check that we're on the admin page
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Check that statistics cards are visible
    await expect(page.getByText('Total Services')).toBeVisible();
    await expect(page.getByText('Team Members')).toBeVisible();
    await expect(page.getByText('Blog Posts')).toBeVisible();
    await expect(page.getByText('Active Promotions')).toBeVisible();
    
    // Check that Recent Activity section is visible
    await expect(page.getByRole('heading', { name: 'Recent Activity' })).toBeVisible();
    
    // Check that Quick Actions section is visible
    await expect(page.getByRole('heading', { name: 'Quick Actions' })).toBeVisible();
    await expect(page.getByText('Add New Service')).toBeVisible();
    await expect(page.getByText('Write Blog Post')).toBeVisible();
  });
  
  test('navigate to services page and view services table', async ({ page }) => {
    // Start from the admin dashboard
    await page.goto('/admin');
    
    // Navigate to services page
    await page.getByRole('link', { name: /Total Services/i }).click();
    
    // Check that we're on the services page
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();
    
    // Check that services table is visible
    await expect(page.getByRole('columnheader', { name: 'Service Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Category' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Price' })).toBeVisible();
    
    // Verify at least one service is shown
    await expect(page.getByText('Royal Black Scan')).toBeVisible();
  });
  
  test('can navigate to add new service page', async ({ page }) => {
    // Start from the services page
    await page.goto('/admin/services');
    
    // Click on the Add New Service button
    await page.getByRole('link', { name: 'Add New Service' }).click();
    
    // Check that we're on the add new service page
    await expect(page.getByRole('heading', { name: 'Add New Service' })).toBeVisible();
    
    // Check that the form is visible
    await expect(page.getByLabel('Service Name')).toBeVisible();
    await expect(page.getByLabel('URL Slug')).toBeVisible();
    
    // Test auto-generation of slug
    await page.getByLabel('Service Name').fill('Test New Service');
    await expect(page.getByLabel('URL Slug')).toHaveValue('test-new-service');
  });
  
  test('can navigate to edit service page', async ({ page }) => {
    // Start from the services page
    await page.goto('/admin/services');
    
    // Click on the Edit button for the first service
    await page.locator('button[aria-label="Edit"]').first().click();
    
    // Check that we're on the edit service page
    await expect(page.getByRole('heading', { name: 'Edit Service' })).toBeVisible();
    
    // Verify form is populated with service data
    await expect(page.getByLabel('Service Name')).not.toHaveValue('');
    await expect(page.getByLabel('URL Slug')).not.toHaveValue('');
    
    // Test that we can edit the service name
    const currentName = await page.getByLabel('Service Name').inputValue();
    await page.getByLabel('Service Name').fill(`${currentName} (Edited)`);
    
    // Check save button is visible
    await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
  });
  
  test('filtering services works correctly', async ({ page }) => {
    // Start from the services page
    await page.goto('/admin/services');
    
    // Filter by search term
    await page.getByPlaceholder('Search services...').fill('facial');
    
    // Check that filtered results are shown
    await expect(page.getByText('Facial Treatments')).toBeVisible();
    
    // Clear filter
    await page.getByPlaceholder('Search services...').clear();
    
    // Filter by category
    await page.selectOption('select:near(:text("All Categories"))', 'Facial Treatments');
    
    // Check that filtered results are shown
    await expect(page.getByText('Facial Treatments')).toBeVisible();
  });
}); 