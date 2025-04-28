import { test as base, expect } from '@playwright/test';

// Define a test that uses headless browser
const test = base.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  }
});

test.describe('Admin Image Management', () => {
  test('page loads successfully with image gallery', async ({ page }) => {
    // Navigate to the page
    await page.goto('/admin/images');
    
    // Check if we've reached the images page
    await expect(page).toHaveURL(/.*\/admin\/images/);
    
    // Check page title
    await expect(page.locator('h1:has-text("Image Library")')).toBeVisible();
    
    // Verify upload button exists
    await expect(page.locator('button:has-text("Upload Images")')).toBeVisible();
    
    // Check if the image gallery is displayed
    const images = await page.locator('.aspect-square').count();
    expect(images).toBeGreaterThan(0);
    
    // Test search functionality
    await page.locator('input[placeholder="Search images..."]').fill('hero');
    await page.waitForTimeout(500);
    
    // Verify filtering works
    await page.locator('button:has-text("All")').click();
    await page.waitForTimeout(500);
    
    // Verify view mode switching
    await page.locator('button:has-text("List")').click();
    await expect(page.locator('table')).toBeVisible();
    
    // Switch back to grid view
    await page.locator('button:has-text("Grid")').click();
    await expect(page.locator('.grid')).toBeVisible();
  });
  
  test('image action menu works correctly', async ({ page }) => {
    // Navigate to the page
    await page.goto('/admin/images');
    
    // Click on the first image's menu
    await page.locator('.aspect-square').first().hover();
    await page.locator('button:has-text("More")').first().click();
    
    // Verify dropdown menu appears
    await expect(page.locator('div[role="menu"]')).toBeVisible();
    
    // Verify edit option exists
    await expect(page.locator('div[role="menuitem"]:has-text("Edit details")')).toBeVisible();
    
    // Click edit option
    await page.locator('div[role="menuitem"]:has-text("Edit details")').click();
    
    // Verify edit dialog appears
    await expect(page.locator('div[role="dialog"]')).toBeVisible();
    await expect(page.locator('h2:has-text("Edit Image")')).toBeVisible();
    
    // Close the dialog
    await page.locator('button:has-text("Cancel")').click();
  });
  
  test('blog editor can access media library', async ({ page }) => {
    // Navigate to new blog page
    await page.goto('/admin/blog/new');
    
    // Click on featured image area
    await page.locator('.cursor-pointer').first().click();
    
    // Verify media library dialog appears
    await expect(page.locator('h2:has-text("Media Library")')).toBeVisible();
    
    // Check tabs exist
    await expect(page.locator('button[role="tab"]:has-text("Library")')).toBeVisible();
    await expect(page.locator('button[role="tab"]:has-text("Upload New")')).toBeVisible();
    
    // Select an image
    await page.locator('.aspect-square').first().click();
    
    // Verify dialog closed and image is selected
    await expect(page.locator('h2:has-text("Media Library")')).not.toBeVisible();
    
    // Test rich text editor image insertion
    await page.locator('button:has-text("🖼️")').click();
    
    // Verify media library dialog appears again
    await expect(page.locator('h2:has-text("Media Library")')).toBeVisible();
    
    // Switch to upload tab
    await page.locator('button[role="tab"]:has-text("Upload New")').click();
    
    // Verify upload area is visible
    await expect(page.locator('text=Click to upload or drag and drop')).toBeVisible();
    
    // Close the dialog
    await page.locator('button:has-text("Cancel")').click();
  });
}); 