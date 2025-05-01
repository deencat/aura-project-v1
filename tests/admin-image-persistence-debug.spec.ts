import { test, expect } from '@playwright/test';

test('debug page navigation and structure', async ({ page }) => {
  // Log page changes
  page.on('framenavigated', frame => {
    if (frame === page.mainFrame()) {
      console.log(`Navigation to: ${frame.url()}`);
    }
  });

  // Log all requests
  page.on('request', request => {
    if (request.resourceType() === 'document') {
      console.log(`Page request to: ${request.url()}`);
    }
  });

  // Log all responses
  page.on('response', response => {
    if (response.request().resourceType() === 'document') {
      console.log(`Page response from: ${response.url()} - Status: ${response.status()}`);
    }
  });

  // Start navigation
  console.log('Starting navigation to service edit page...');
  
  // Navigate to edit page for service ID 9
  await page.goto('/admin/services/edit/9');
  
  // Log current URL
  console.log('Current URL:', page.url());
  
  // Take a screenshot
  await page.screenshot({ path: 'debug-service-edit.png', fullPage: true });
  
  // Log all headings
  const headings = page.getByRole('heading');
  const headingCount = await headings.count();
  console.log(`Found ${headingCount} headings on the page`);
  
  for (let i = 0; i < headingCount; i++) {
    const heading = headings.nth(i);
    console.log(`Heading ${i + 1}: ${await heading.textContent()}`);
  }
  
  // Log all form elements on the page
  const forms = page.locator('form');
  const formCount = await forms.count();
  console.log(`Found ${formCount} forms on the page`);
  
  if (formCount > 0) {
    // If we're on the edit form page, check for inputs
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    console.log(`Found ${inputCount} inputs on the page`);
    
    // Try to identify the name input
    const nameInput = page.getByLabel('Service Name', { exact: true });
    if (await nameInput.count() > 0) {
      console.log('Found Service Name input');
      console.log('Service Name value:', await nameInput.inputValue());
    } else {
      console.log('No Service Name input found');
    }
    
    // Look for the image section
    const imageSection = page.getByText('Page Images', { exact: true });
    if (await imageSection.count() > 0) {
      console.log('Found Page Images section');
    } else {
      console.log('No Page Images section found');
    }
    
    // Look for tabs
    const tabs = page.getByRole('tab');
    const tabCount = await tabs.count();
    console.log(`Found ${tabCount} tabs on the page`);
    
    for (let i = 0; i < tabCount; i++) {
      const tab = tabs.nth(i);
      console.log(`Tab ${i + 1}: ${await tab.textContent()}`);
    }
  } else {
    console.log('Not on an edit form page');
  }
  
  // Try to navigate to the admin dashboard first
  console.log('Navigating to admin dashboard...');
  await page.goto('/admin');
  console.log('Admin dashboard URL:', page.url());
  
  // Take a screenshot of the admin dashboard
  await page.screenshot({ path: 'debug-admin-dashboard.png', fullPage: true });
  
  // Try to click on the Services link using a specific href
  const servicesLink = page.locator('a[href="/admin/services"]').first();
  if (await servicesLink.count() > 0) {
    console.log('Found Services link with href="/admin/services"');
    console.log('Clicking on Services link...');
    await servicesLink.click();
    console.log('Services page URL:', page.url());
    
    // Take a screenshot of the services page
    await page.screenshot({ path: 'debug-services-page.png', fullPage: true });
    
    // Try to find the edit link for service ID 9
    const editLinks = page.locator('a[href$="/edit/9"]');
    if (await editLinks.count() > 0) {
      console.log('Found edit link for service ID 9');
      console.log('Clicking on edit link...');
      await editLinks.first().click();
      console.log('Edit page URL:', page.url());
      
      // Take a screenshot of the edit page
      await page.screenshot({ path: 'debug-edit-page.png', fullPage: true });
      
      // Check if we've reached the edit page with forms
      const editForms = page.locator('form');
      const editFormCount = await editForms.count();
      console.log(`Found ${editFormCount} forms on the edit page`);
      
      if (editFormCount > 0) {
        // Now check for Page Images section and tabs
        const pageImagesHeading = page.getByText('Page Images');
        if (await pageImagesHeading.count() > 0) {
          console.log('Found Page Images heading');
          
          // Check for tabs
          const imageTabs = page.getByRole('tab');
          const imageTabCount = await imageTabs.count();
          console.log(`Found ${imageTabCount} tabs in the Page Images section`);
          
          for (let i = 0; i < imageTabCount; i++) {
            const tab = imageTabs.nth(i);
            console.log(`Tab ${i + 1}: ${await tab.textContent()}`);
          }
          
          // Check for image elements
          const images = page.locator('img');
          const imageCount = await images.count();
          console.log(`Found ${imageCount} image elements on the page`);
        } else {
          console.log('No Page Images heading found on the edit page');
        }
      }
    } else {
      console.log('No edit link found for service ID 9');
      
      // Log all hrefs to see what's available
      const allLinks = page.locator('a');
      const linkCount = await allLinks.count();
      console.log(`Found ${linkCount} links on the page`);
      
      // Log up to 10 links
      for (let i = 0; i < Math.min(linkCount, 10); i++) {
        const link = allLinks.nth(i);
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        console.log(`Link ${i + 1}: ${text} - ${href}`);
      }
    }
  } else {
    console.log('No Services link found with href="/admin/services"');
    
    // Log all links to see what's available
    console.log('Listing all links on the admin dashboard:');
    const allDashboardLinks = page.locator('a');
    const dashboardLinkCount = await allDashboardLinks.count();
    
    for (let i = 0; i < Math.min(dashboardLinkCount, 20); i++) {
      const link = allDashboardLinks.nth(i);
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      console.log(`Link ${i + 1}: ${text} - ${href}`);
    }
  }
}); 