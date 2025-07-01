import { test, expect } from '@playwright/test';

test.describe('Admin Promotions Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/promotions');
  });

  test('should display promotions management page', async ({ page }) => {
    // Check main heading
    await expect(page.locator('h1').filter({ hasText: 'Promotions & Coupons' })).toBeVisible();
    
    // Check subheading
    await expect(page.getByText('Manage discount codes and promotional offers')).toBeVisible();
    
    // Check "New Promotion" button
    await expect(page.getByRole('link', { name: 'New Promotion' })).toBeVisible();
  });

  test('should display statistics cards', async ({ page }) => {
    // Check for statistics cards
    await expect(page.getByText('Active Promotions')).toBeVisible();
    await expect(page.getByText('Total Uses')).toBeVisible();
    await expect(page.getByText('Expiring Soon')).toBeVisible();
    await expect(page.getByText('Draft Promotions')).toBeVisible();
  });

  test('should display search and filter controls', async ({ page }) => {
    // Check search input
    await expect(page.getByPlaceholder('Search promotions...')).toBeVisible();
    
    // Check filter dropdowns
    await expect(page.locator('select').first()).toBeVisible(); // Status filter
    await expect(page.locator('select').nth(1)).toBeVisible(); // Type filter
  });

  test('should display promotions table with data', async ({ page }) => {
    // Check table headers by text content
    await expect(page.locator('th:has-text("Code")')).toBeVisible();
    await expect(page.locator('th:has-text("Name")')).toBeVisible();
    await expect(page.locator('th:has-text("Type")')).toBeVisible();
    await expect(page.locator('th:has-text("Value")')).toBeVisible();
    await expect(page.locator('th:has-text("Usage")')).toBeVisible();
    await expect(page.locator('th:has-text("Valid Period")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();
    await expect(page.locator('th:has-text("Actions")')).toBeVisible();
    
    // Check for sample data
    await expect(page.getByText('WELCOME20')).toBeVisible();
    await expect(page.getByText('New Client Welcome Offer')).toBeVisible();
  });

  test('should have functional search', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search promotions...');
    
    // Test search functionality
    await searchInput.fill('WELCOME');
    await expect(searchInput).toHaveValue('WELCOME');
    
    // Clear search
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
  });

  test('should have functional filters', async ({ page }) => {
    // Test status filter
    const statusFilter = page.locator('select').first();
    await statusFilter.selectOption('active');
    await expect(statusFilter).toHaveValue('active');
    
    // Test type filter
    const typeFilter = page.locator('select').nth(1);
    await typeFilter.selectOption('percentage');
    await expect(typeFilter).toHaveValue('percentage');
  });

  test('should have copy code functionality', async ({ page }) => {
    // Check for copy buttons
    const copyButtons = page.getByTitle('Copy code');
    await expect(copyButtons.first()).toBeVisible();
  });

  test('should have action buttons for promotions', async ({ page }) => {
    // Check for edit buttons
    await expect(page.getByTitle('Edit promotion').first()).toBeVisible();
    
    // Check for view/pause buttons  
    await expect(page.getByTitle('Pause promotion').first()).toBeVisible();
    
    // Check for delete buttons
    await expect(page.getByTitle('Delete promotion').first()).toBeVisible();
  });

  test('should navigate to new promotion page', async ({ page }) => {
    // Click "New Promotion" button
    await page.getByRole('link', { name: 'New Promotion' }).click();
    
    // Should navigate to new promotion page
    await expect(page).toHaveURL('/admin/promotions/new');
  });

  test('should navigate to edit promotion page', async ({ page }) => {
    // Click edit link for New Client Welcome Offer
    await page.getByRole('link', { name: 'New Client Welcome Offer' }).click();
    
    // Should navigate to edit page (URL will contain edit path)
    await expect(page.url()).toContain('/admin/promotions/edit/');
  });
});

test.describe('New Promotion Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/promotions/new');
  });

  test('should display new promotion form', async ({ page }) => {
    // Check page heading
    await expect(page.locator('h1').filter({ hasText: 'Create New Promotion' })).toBeVisible();
    
    // Check subtitle
    await expect(page.getByText('Set up a new promotional offer or coupon code')).toBeVisible();
    
    // Check back button
    await expect(page.getByRole('link', { name: 'Back to Promotions' })).toBeVisible();
  });

  test('should have basic information fields', async ({ page }) => {
    // Check required fields
    await expect(page.getByLabel('Promotion Title *')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
    await expect(page.getByLabel('Coupon Code *')).toBeVisible();
    
    // Check generate button
    await expect(page.getByRole('button', { name: 'Generate' })).toBeVisible();
  });

  test('should have discount configuration fields', async ({ page }) => {
    // Check discount type select
    await expect(page.getByText('Discount Type')).toBeVisible();
    
    // Check value input label
    await expect(page.getByLabel('Percentage (%)')).toBeVisible();
    
    // Check minimum spend
    await expect(page.getByLabel('Minimum Spend ($)')).toBeVisible();
    
    // Check usage limit
    await expect(page.getByLabel('Usage Limit')).toBeVisible();
  });

  test('should have validity and conditions fields', async ({ page }) => {
    // Check date fields
    await expect(page.getByLabel('Start Date')).toBeVisible();
    await expect(page.getByLabel('End Date')).toBeVisible();
    
    // Check customer type
    await expect(page.getByText('Customer Type')).toBeVisible();
  });

  test('should have status and preview sections', async ({ page }) => {
    // Check status toggle
    await expect(page.getByText('Active')).toBeVisible();
    
    // Check preview section
    await expect(page.getByText('Preview')).toBeVisible();
    await expect(page.locator('.font-bold:has-text("Promotion Title")')).toBeVisible();
  });

  test('should have action buttons', async ({ page }) => {
    // Check create button
    await expect(page.getByRole('button', { name: 'Create Promotion' })).toBeVisible();
    
    // Check cancel link
    await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
  });

  test('should generate random coupon codes', async ({ page }) => {
    const codeInput = page.getByLabel('Coupon Code *');
    const generateButton = page.getByRole('button', { name: 'Generate' });
    
    // Click generate button
    await generateButton.click();
    
    // Check that a code was generated
    const generatedCode = await codeInput.inputValue();
    expect(generatedCode).toBeTruthy();
    expect(generatedCode.length).toBeGreaterThan(0);
  });

  test('should update preview when form changes', async ({ page }) => {
    const titleInput = page.getByLabel('Promotion Title *');
    const descriptionInput = page.getByLabel('Description');
    const codeInput = page.getByLabel('Coupon Code *');
    
    // Fill in form fields
    await titleInput.fill('Test Promotion');
    await descriptionInput.fill('Test description');
    await codeInput.fill('TEST123');
    
    // Check that preview updates - look in the preview card area
    await expect(page.locator('.font-bold:has-text("Test Promotion")')).toBeVisible();
    await expect(page.locator('.text-gray-600:has-text("Test description")')).toBeVisible();
    await expect(page.locator('.font-mono:has-text("TEST123")')).toBeVisible();
  });

  test('should handle form submission', async ({ page }) => {
    // Fill required fields
    await page.getByLabel('Promotion Title *').fill('Test Promotion');
    await page.getByLabel('Coupon Code *').fill('TEST123');
    
    // Submit form
    await page.getByRole('button', { name: 'Create Promotion' }).click();
    
    // Should show success message (mocked alert)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Promotion created successfully');
      await dialog.accept();
    });
  });
});

test.describe('Edit Promotion Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to edit page with a test ID
    await page.goto('/admin/promotions/edit/1');
  });

  test('should display edit promotion form with pre-filled data', async ({ page }) => {
    // Check page heading
    await expect(page.locator('h1').filter({ hasText: 'Edit Promotion' })).toBeVisible();
    
    // Check subtitle
    await expect(page.getByText('Modify promotional offer settings')).toBeVisible();
    
    // Check delete button
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  });

  test('should show usage statistics', async ({ page }) => {
    // Check usage statistics section
    await expect(page.getByText('Status & Usage')).toBeVisible();
    await expect(page.getByText('Times Used:')).toBeVisible();
    await expect(page.getByText('Usage Limit:')).toBeVisible();
    await expect(page.getByText('Remaining:')).toBeVisible();
  });

  test('should have pre-filled form fields', async ({ page }) => {
    // Check that form has pre-filled data
    const titleInput = page.getByLabel('Promotion Title *');
    const codeInput = page.getByLabel('Coupon Code *');
    
    await expect(titleInput).toHaveValue('New Client Special');
    await expect(codeInput).toHaveValue('WELCOME20');
  });

  test('should warn about code changes if promotion has been used', async ({ page }) => {
    // Should show warning about changing used codes
    await expect(page.getByText('This code has been used')).toBeVisible();
    await expect(page.getByText('Changing it may affect existing customers')).toBeVisible();
  });

  test('should handle update submission', async ({ page }) => {
    // Modify a field
    await page.getByLabel('Promotion Title *').fill('Updated Promotion Title');
    
    // Submit form
    await page.getByRole('button', { name: 'Update Promotion' }).click();
    
    // Should show success message (mocked alert)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Promotion updated successfully');
      await dialog.accept();
    });
  });

  test('should handle deletion with confirmation', async ({ page }) => {
    // Click delete button
    await page.getByRole('button', { name: 'Delete' }).click();
    
    // Should show confirmation dialog
    await expect(page.getByRole('heading', { name: 'Delete Promotion' })).toBeVisible();
    await expect(page.getByText('Are you sure you want to delete this promotion?')).toBeVisible();
    
    // Check for usage warning
    await expect(page.getByText('This promotion has been used')).toBeVisible();
    
    // Cancel deletion
    await page.getByRole('button', { name: 'Cancel' }).click();
  });
});

test.describe('Promotion Navigation', () => {
  test('should navigate between promotion pages correctly', async ({ page }) => {
    // Start at main promotions page
    await page.goto('/admin/promotions');
    await expect(page.locator('h1').filter({ hasText: 'Promotions & Coupons' })).toBeVisible();
    
    // Navigate to new promotion
    await page.getByRole('link', { name: 'New Promotion' }).click();
    await expect(page.locator('h1').filter({ hasText: 'Create New Promotion' })).toBeVisible();
    
    // Navigate back to promotions
    await page.getByRole('link', { name: 'Back to Promotions' }).click();
    await expect(page.locator('h1').filter({ hasText: 'Promotions & Coupons' })).toBeVisible();
    
    // Navigate to edit promotion
    await page.getByTitle('Edit promotion').first().click();
    await expect(page.locator('h1').filter({ hasText: 'Edit Promotion' })).toBeVisible();
    
    // Navigate back again
    await page.getByRole('link', { name: 'Back to Promotions' }).click();
    await expect(page.locator('h1').filter({ hasText: 'Promotions & Coupons' })).toBeVisible();
  });
}); 