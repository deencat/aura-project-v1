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
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Category' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Price' })).toBeVisible();
    
    // Verify at least one service from each category is shown
    await expect(page.getByText('Lymphatic Detox')).toBeVisible();
    await expect(page.getByText('V-Line Perfection')).toBeVisible();
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
  
  test('can navigate to edit service page and see pre-populated data', async ({ page }) => {
    // Start from the services page
    await page.goto('/admin/services');
    
    // Click on the edit button for the first service (Lymphatic Detox)
    await page.locator('a[href="/admin/services/edit/1"]').click();
    
    // Check that we're on the edit service page with the correct service name
    await expect(page.getByRole('heading', { name: /Edit Service: Lymphatic Detox/i })).toBeVisible();
    
    // Check that the form is pre-populated with service data
    await expect(page.getByLabel('Service Name')).toHaveValue('Lymphatic Detox');
    await expect(page.getByLabel('URL Slug')).toHaveValue('body-care/lymphatic-detox');
    await expect(page.getByLabel('Price')).toHaveValue('$980');
    await expect(page.getByLabel('Duration')).toHaveValue('90 min');
    
    // Test that we can edit a field
    await page.getByLabel('Price').clear();
    await page.getByLabel('Price').fill('$995');
    
    // Make sure the save button is visible
    await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
  });
  
  test('can work with section-based images on the service edit page', async ({ page }) => {
    // Start from the edit page for the Lymphatic Detox service
    await page.goto('/admin/services/edit/1');
    
    // Wait for the page to fully load
    await expect(page.getByRole('heading', { name: /Edit Service: Lymphatic Detox/i })).toBeVisible();
    
    // Check that the page template info is visible
    await expect(page.getByText(/Using template: Body Care Template/i)).toBeVisible();
    
    // Check that the Page Images tab section is visible
    await expect(page.getByRole('heading', { name: 'Page Images' })).toBeVisible();
    
    // Check the initial tab (Hero Section) is selected
    await expect(page.getByRole('tab', { name: 'Hero Section', selected: true })).toBeVisible();
    
    // Test changing image for the Hero Section
    await page.getByRole('button', { name: /Change Hero Section Image|Select Hero Section Image/i }).click();
    
    // Check that the media library dialog appears with correct context
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/Select image for Hero Section/i)).toBeVisible();
    
    // Select an image from the media library
    await page.locator('.grid-cols-3 > div').first().click();
    
    // Confirm the selection
    await page.getByRole('button', { name: 'Select Image' }).click();
    
    // Check that the dialog is closed
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    // Switch to a different tab (How It Works)
    await page.getByRole('tab', { name: 'How It Works' }).click();
    
    // Verify the tab switched
    await expect(page.getByRole('tab', { name: 'How It Works', selected: true })).toBeVisible();
    
    // Add an image to this section
    await page.locator('.border-dashed').first().click();
    
    // Check that the media library dialog appears with correct context
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/Select image for How It Works/i)).toBeVisible();
    
    // Select a different image
    await page.locator('.grid-cols-3 > div').nth(2).click();
    
    // Confirm the selection
    await page.getByRole('button', { name: 'Select Image' }).click();
    
    // Check another tab (Benefits)
    await page.getByRole('tab', { name: 'Benefits' }).click();
    
    // Verify the tab switched
    await expect(page.getByRole('tab', { name: 'Benefits', selected: true })).toBeVisible();
    
    // Make sure we can save the form with the updated section images
    await page.getByRole('button', { name: 'Save Changes' }).click();
    
    // We should be redirected back to the services page
    await expect(page.url()).toContain('/admin/services');
  });
  
  test('can filter services by category', async ({ page }) => {
    // Start from the services page
    await page.goto('/admin/services');
    
    // Filter by category: New Doublo
    await page.selectOption('select:near(:text("All Categories"))', 'New Doublo');
    
    // Check that only New Doublo services are shown
    await expect(page.getByText('V-Line Perfection')).toBeVisible();
    await expect(page.getByText('Sculpt & Lift')).toBeVisible();
    await expect(page.getByText('Lymphatic Detox')).not.toBeVisible();
    
    // Reset filters
    await page.getByRole('button', { name: 'Reset Filters' }).click();
    
    // Filter by category: Body Care
    await page.selectOption('select:near(:text("All Categories"))', 'Body Care');
    
    // Check that only Body Care services are shown
    await expect(page.getByText('Lymphatic Detox')).toBeVisible();
    await expect(page.getByText('Breast Enhancement')).toBeVisible();
    await expect(page.getByText('V-Line Perfection')).not.toBeVisible();
  });
  
  test('can search for services by name', async ({ page }) => {
    // Start from the services page
    await page.goto('/admin/services');
    
    // Search for "Lymphatic"
    await page.getByPlaceholder('Search services...').fill('Lymphatic');
    
    // Check that only matching services are shown
    await expect(page.getByText('Lymphatic Detox')).toBeVisible();
    await expect(page.getByText('V-Line Perfection')).not.toBeVisible();
    
    // Clear search and search for "V-Line"
    await page.getByPlaceholder('Search services...').clear();
    await page.getByPlaceholder('Search services...').fill('V-Line');
    
    // Check that only matching services are shown
    await expect(page.getByText('V-Line Perfection')).toBeVisible();
    await expect(page.getByText('Lymphatic Detox')).not.toBeVisible();
  });
}); 