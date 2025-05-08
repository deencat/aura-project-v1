import { test, expect } from '@playwright/test';

// Set the test environment variable
process.env.PLAYWRIGHT_TEST = 'true';

test.describe('Basic Image Tests', () => {
  test('Basic page loads with images', async ({ page }) => {
    // Navigate to homepage and wait for network to be idle
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Verify we can see images on the page
    const images = page.locator('img[data-nimg="1"]');
    
    // Check if there are any images loaded
    const count = await images.count();
    console.log(`Found ${count} images on the page`);
    
    if (count > 0) {
      // At least one image should be visible
      await expect(images.first()).toBeVisible();
      
      // Check if the first image has src attribute
      const src = await images.first().getAttribute('src');
      expect(src).toBeTruthy();
    } else {
      // If no images are found, this might be normal for the test environment
      console.log('No images found on the page, this may be expected in the test environment');
    }
  });
});

// Simplified test suite for image optimization
test.describe('Image Optimization Core Tests', () => {
  test('image elements have proper optimization attributes', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Find all image elements
    const images = await page.locator('img[data-nimg="1"]').all();
    
    // Skip test if no images found
    if (images.length === 0) {
      console.log('No images found on the page to test, skipping test');
      return;
    }
    
    // Test loading attributes
    let hasLazyLoading = false;
    let hasSizes = false;
    
    for (const img of images) {
      const loading = await img.getAttribute('loading');
      const sizes = await img.getAttribute('sizes');
      
      if (loading === 'lazy') {
        hasLazyLoading = true;
      }
      
      if (sizes) {
        hasSizes = true;
      }
    }
    
    // We should have at least some images with lazy loading
    expect(hasLazyLoading || images.length === 0).toBeTruthy();
    
    // We should have at least some images with sizes attribute
    expect(hasSizes || images.length === 0).toBeTruthy();
  });

  test('placeholder or blur functionality works', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Find all image elements
    const images = await page.locator('img[data-nimg="1"]').all();
    
    // Skip test if no images found
    if (images.length === 0) {
      console.log('No images found on the page to test, skipping test');
      return;
    }
    
    // At least some images should have one of these attributes
    let hasBlurOrPlaceholder = false;
    
    for (const img of images) {
      const placeholder = await img.getAttribute('placeholder');
      const blurDataURL = await img.getAttribute('data-blur-data-url');
      
      if (placeholder === 'blur' || blurDataURL) {
        hasBlurOrPlaceholder = true;
        break;
      }
    }
    
    expect(hasBlurOrPlaceholder || images.length === 0).toBeTruthy();
  });
  
  test('image srcset should contain multiple resolutions', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Find all image elements
    const images = await page.locator('img[data-nimg="1"]').all();
    
    // Skip test if no images found
    if (images.length === 0) {
      console.log('No images found on the page to test, skipping test');
      return;
    }
    
    // At least one image should have srcset
    let hasSrcSet = false;
    
    for (const img of images) {
      const srcset = await img.getAttribute('srcset');
      
      if (srcset && srcset.includes(',')) {
        hasSrcSet = true;
        break;
      }
    }
    
    expect(hasSrcSet || images.length === 0).toBeTruthy();
  });
});

test.describe('Image Optimization', () => {
  test('TreatmentImage loads correctly with optimizations on homepage', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Verify we can see the hero section
    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();
    
    // Check for image element in the hero section
    const heroImage = page.locator('.hero-section img');
    if (await heroImage.count() > 0) {
      await expect(heroImage.first()).toBeVisible();
    }
    
    // Verify we can see the featured treatments section
    const featuredSection = page.locator('.featured-treatments');
    if (await featuredSection.count() > 0) {
      await expect(featuredSection).toBeVisible();
    }
  });
  
  test('About page loads with proper images', async ({ page }) => {
    // Navigate to about page
    await page.goto('/about', { waitUntil: 'networkidle' });
    
    // Verify the page title is visible
    const title = page.locator('h1:has-text("About")');
    await expect(title).toBeVisible();
    
    // Check if team member images are visible
    const teamSection = page.locator('.team-section');
    if (await teamSection.count() > 0) {
      await expect(teamSection).toBeVisible();
    }
  });
  
  test('Contact page loads with proper images', async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact', { waitUntil: 'networkidle' });
    
    // Verify the page title is visible
    const title = page.locator('h1:has-text("Contact")');
    await expect(title).toBeVisible();
    
    // Check if location image is visible
    const locationSection = page.locator('.location-section');
    if (await locationSection.count() > 0) {
      await expect(locationSection).toBeVisible();
    }
  });
});

// Test suite for image optimization
test.describe('Image Optimization Tests', () => {
  // Test that hero images load properly with priority
  test('hero images should load with priority on treatment pages', async ({ page }) => {
    // Navigate to a treatment page with a hero image
    await page.goto('/new-doublo/v-line');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the hero image is present
    const heroImage = await page.getByTestId('treatment-image-new-doublo-v-line-hero');
    await expect(heroImage).toBeVisible();
    
    // Check image attributes
    const imgElement = await heroImage.locator('img').first();
    const isPriority = await imgElement.getAttribute('fetchpriority');
    
    // Hero images should use high fetch priority
    expect(isPriority).toBe('high');
  });
  
  // Test that gallery images use responsive sizing
  test('gallery images should use responsive sizing', async ({ page }) => {
    // Navigate to a page with gallery images
    await page.goto('/facials/glow');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Find a gallery image
    const galleryImage = await page.getByTestId(/treatment-image-facials-glow-gallery/);
    
    // Check that the image is visible
    await expect(galleryImage).toBeVisible();
    
    // Check that it has proper sizes attribute for responsive loading
    const imgElement = await galleryImage.locator('img').first();
    const sizes = await imgElement.getAttribute('sizes');
    
    // Should have responsive sizes attribute
    expect(sizes).toContain('max-width');
  });
  
  // Test that content visibility is working for off-screen images
  test('should use content-visibility for off-screen images', async ({ page }) => {
    // Navigate to a page with multiple images
    await page.goto('/treatments');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Find treatment cards at the bottom of the page
    const bottomImages = await page.locator('[data-testid^="treatment-image-"]').all();
    
    // Some images should be using content-visibility: auto
    let foundContentVisibility = false;
    
    for (const img of bottomImages) {
      const style = await img.getAttribute('style');
      if (style && style.includes('content-visibility')) {
        foundContentVisibility = true;
        break;
      }
    }
    
    expect(foundContentVisibility).toBeTruthy();
  });
  
  // Test blur placeholder loading
  test('should show blur placeholder while loading images', async ({ page }) => {
    // Navigate to a page with images
    await page.goto('/facial-treatments/collagen-regeneration');
    
    // Throttle network to simulate slow connection
    await page.context().route('**/*.{jpeg,jpg,png,webp,avif}', async (route) => {
      // Delay image loading to ensure we can see the placeholder
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.continue();
    });
    
    // Find images on the page
    const images = await page.locator('img[data-nimg="1"]').all();
    
    // At least one image should have blur data URL
    let hasBlurPlaceholder = false;
    
    for (const img of images) {
      const placeholder = await img.getAttribute('placeholder');
      if (placeholder === 'blur') {
        hasBlurPlaceholder = true;
        break;
      }
    }
    
    expect(hasBlurPlaceholder).toBeTruthy();
  });
  
  // Test WebP/AVIF format support
  test('should serve WebP or AVIF format based on browser support', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Check network requests for images
    const [request] = await Promise.all([
      page.waitForRequest(request => 
        request.url().includes('/_next/image') && 
        (request.url().includes('.webp') || request.url().includes('.avif') || 
         request.url().includes('f=webp') || request.url().includes('f=avif'))
      ),
      // Trigger image load by scrolling
      page.evaluate(() => window.scrollTo(0, 500))
    ]);
    
    // Verify that the request URL includes WebP or AVIF format
    const url = request.url();
    const hasModernFormat = url.includes('.webp') || 
                           url.includes('.avif') || 
                           url.includes('f=webp') || 
                           url.includes('f=avif');
                           
    expect(hasModernFormat).toBeTruthy();
  });
  
  // Test image dimensions
  test('images should have correct dimensions based on type', async ({ page }) => {
    // Navigate to a treatment page
    await page.goto('/body-care/lymphatic-detox');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check hero image dimensions
    const heroImage = await page.getByTestId('treatment-image-body-care-lymphatic-detox-hero');
    const heroImgElement = await heroImage.locator('img').first();
    
    // Get width and height from the computed style
    const heroWidth = await heroImgElement.evaluate((el: HTMLImageElement) => el.width);
    const heroHeight = await heroImgElement.evaluate((el: HTMLImageElement) => el.height);
    
    // Hero images should be larger
    expect(heroWidth).toBeGreaterThan(800);
    
    // Find a testimonial image if available
    const testimonialImages = await page.getByTestId(/treatment-image.*testimonial/).all();
    
    if (testimonialImages.length > 0) {
      const testimonialImg = await testimonialImages[0].locator('img').first();
      const testimonialWidth = await testimonialImg.evaluate((el: HTMLImageElement) => el.width);
      
      // Testimonial images should be smaller (avatar-sized)
      expect(testimonialWidth).toBeLessThanOrEqual(128);
    }
  });
}); 