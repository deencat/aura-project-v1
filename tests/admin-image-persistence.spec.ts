import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

// Helper to generate unique identifiers
function uniqueId() {
  return uuidv4().substring(0, 8);
}

test.describe('Admin Service Data Persistence', () => {
  // Test variables to share between tests
  const serviceId = 9; // New Doublo: Sculpt Lift service
  
  // Simplified test for service data persistence
  test('service data changes persist after refresh', async ({ page }) => {
    // Navigate to the services page
    await page.goto('/admin/services');
    
    // Navigate to the edit page for service ID 9
    await page.goto(`/admin/services/edit/${serviceId}`);
    
    // Verify we're on an edit page
    await expect(page.getByRole('heading', { name: /Edit Service/i })).toBeVisible();
    
    // Generate a unique service name to verify persistence
    const uniqueSuffix = uniqueId();
    const newTitle = `Sculpt & Lift Test ${uniqueSuffix}`;
    
    // Change the service name
    await page.getByLabel('Service Name').fill(newTitle);
    
    // Save the changes
    await page.getByRole('button', { name: 'Save Changes' }).click();
    
    // Verify success message
    await expect(page.getByText(/Service updated successfully/i)).toBeVisible();
    
    // Navigate back to the edit page
    await page.goto(`/admin/services/edit/${serviceId}`);
    
    // Verify we're on the edit page
    await expect(page.getByRole('heading', { name: /Edit Service/i })).toBeVisible();
    
    // Verify the service name persisted
    await expect(page.getByLabel('Service Name')).toHaveValue(newTitle);
    
    // Reset to original name for future tests
    await page.getByLabel('Service Name').fill('Sculpt & Lift');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText(/Service updated successfully/i)).toBeVisible();
  });
  
  // Test localStorage versioning
  test('service data changes increment version counter', async ({ page }) => {
    // Navigate to the edit page for the service
    await page.goto(`/admin/services/edit/${serviceId}`);
    
    // Verify we're on the edit page
    await expect(page.getByRole('heading', { name: /Edit Service/i })).toBeVisible();
    
    // Get the initial version
    const initialVersion = await page.evaluate(() => {
      return localStorage.getItem('adminServicesVersion') || '0';
    });
    
    // Change the short description
    const newDescription = `Updated description ${uniqueId()}`;
    await page.getByLabel('Short Description').fill(newDescription);
    
    // Save the changes
    await page.getByRole('button', { name: 'Save Changes' }).click();
    
    // Verify success message
    await expect(page.getByText(/Service updated successfully/i)).toBeVisible();
    
    // Get the updated version
    const updatedVersion = await page.evaluate(() => {
      return localStorage.getItem('adminServicesVersion') || '0';
    });
    
    // Verify the version increased
    expect(parseInt(updatedVersion)).toBeGreaterThan(parseInt(initialVersion));
  });
  
  // Test session storage backup
  test('session storage serves as backup for localStorage', async ({ page }) => {
    // Navigate to the edit page for the service
    await page.goto(`/admin/services/edit/${serviceId}`);
    
    // Verify we're on the edit page
    await expect(page.getByRole('heading', { name: /Edit Service/i })).toBeVisible();
    
    // Create a unique description to track
    const uniqueDescription = `Session storage test ${uniqueId()}`;
    await page.getByLabel('Short Description').fill(uniqueDescription);
    
    // Save the changes
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText(/Service updated successfully/i)).toBeVisible();
    
    // Clear localStorage but keep sessionStorage
    await page.evaluate(() => {
      localStorage.removeItem('adminServices');
      return sessionStorage.getItem('adminServicesBackup') !== null;
    });
    
    // Reload the page
    await page.reload();
    
    // Verify we're on the edit page
    await expect(page.getByRole('heading', { name: /Edit Service/i })).toBeVisible();
    
    // Check if our description was recovered from session storage
    await expect(page.getByLabel('Short Description')).toHaveValue(uniqueDescription);
  });
  
  // Very basic test to verify the "Refresh Images" button exists
  test('refresh images button exists on edit page', async ({ page }) => {
    // Navigate to the edit page for the service
    await page.goto(`/admin/services/edit/${serviceId}`);
    
    // Verify we're on the edit page
    await expect(page.getByRole('heading', { name: /Edit Service/i })).toBeVisible();
    
    // Check if the Refresh Images button exists
    await expect(page.getByRole('button', { name: 'Refresh Images' })).toBeVisible();
  });
}); 