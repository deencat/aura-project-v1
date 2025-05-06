import { test } from '@playwright/test';

test('debug glow treatment page', async ({ page }) => {
  // Navigate to the Glow Treatment page
  await page.goto('/treatments/glow');
  
  // Log the current URL
  console.log('Current URL:', page.url());
  
  // Take a screenshot
  await page.screenshot({ path: 'glow-page-debug.png' });
  
  // Log page HTML structure for debugging
  const html = await page.content();
  console.log('Page HTML length:', html.length);
  
  // Log title and headings
  const title = await page.title();
  console.log('Page title:', title);
  
  const h1Count = await page.locator('h1').count();
  console.log('h1 count:', h1Count);
  
  if (h1Count > 0) {
    const h1Text = await page.locator('h1').first().textContent();
    console.log('First h1 text:', h1Text);
  }
  
  const h2Count = await page.locator('h2').count();
  console.log('h2 count:', h2Count);
  
  // Check for images
  const imgCount = await page.locator('img').count();
  console.log('img count:', imgCount);
  
  // Log image alt attributes
  for (let i = 0; i < Math.min(imgCount, 5); i++) {
    const alt = await page.locator('img').nth(i).getAttribute('alt');
    const src = await page.locator('img').nth(i).getAttribute('src');
    console.log(`Image ${i+1} alt: ${alt}, src: ${src ? src.substring(0, 50) + '...' : 'none'}`);
  }
  
  // Check for buttons
  const buttonCount = await page.locator('button, a.button, a[role="button"]').count();
  console.log('Button count:', buttonCount);
  
  // Check for sections or main layout divs
  const sectionCount = await page.locator('section, main > div, body > div > div').count();
  console.log('Section/main div count:', sectionCount);
}); 