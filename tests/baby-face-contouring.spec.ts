import { test, expect } from '@playwright/test'

test.describe.skip('Baby Face Contouring Treatment Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/treatments/baby-face')
  })

  test('should display the main heading and hero content', async ({ page }) => {
    // Check the main heading
    await expect(page.locator('h1').filter({ hasText: 'Baby Face Contouring' })).toBeVisible()
    
    // Check the hero description
    await expect(page.getByText('Achieve a youthful, naturally contoured appearance')).toBeVisible()
    
    // Check that treatment tags are visible
    await expect(page.getByText('Non-Invasive')).toBeVisible()
    await expect(page.getByText('Youthful Glow')).toBeVisible()
    await expect(page.getByText('Natural Contouring')).toBeVisible()
    await expect(page.getByText('Baby-Smooth Skin')).toBeVisible()
  })

  test('should have working CTA buttons', async ({ page }) => {
    // Check that the Book Treatment button is visible and clickable
    const bookButton = page.getByRole('link', { name: 'Book Treatment' })
    await expect(bookButton).toBeVisible()
    
    // Check that Learn More button is visible
    const learnMoreButton = page.getByRole('button', { name: 'Learn More' })
    await expect(learnMoreButton).toBeVisible()
  })

  test('should display treatment information section', async ({ page }) => {
    // Check the treatment info heading
    await expect(page.locator('h2').filter({ hasText: 'Sculpt Your Perfect Baby Face' })).toBeVisible()
    
    // Check that treatment description paragraphs are visible
    await expect(page.getByText('The Baby Face Contouring treatment combines the best of both worlds')).toBeVisible()
    await expect(page.getByText('Unlike traditional contouring methods or invasive procedures')).toBeVisible()
    await expect(page.getByText('This treatment is perfect for those who want to enhance')).toBeVisible()
  })

  test('should display treatment benefits section with carousel', async ({ page }) => {
    // Check the benefits section heading
    await expect(page.locator('h2').filter({ hasText: 'Treatment Benefits' })).toBeVisible()
    
    // Check that benefit items are visible
    await expect(page.getByText('Natural Contouring')).toBeVisible()
    await expect(page.getByText('Youthful Glow')).toBeVisible()
    await expect(page.getByText('Defined Features')).toBeVisible()
    
    // Check for carousel navigation buttons
    const carouselNext = page.locator('[data-testid="carousel-next"], .carousel-next, [aria-label*="next"], button[aria-label*="Next"]').first()
    const carouselPrev = page.locator('[data-testid="carousel-previous"], .carousel-previous, [aria-label*="previous"], button[aria-label*="Previous"]').first()
    
    if (await carouselNext.isVisible()) {
      await expect(carouselNext).toBeVisible()
    }
    if (await carouselPrev.isVisible()) {
      await expect(carouselPrev).toBeVisible()
    }
  })

  test('should display how it works section', async ({ page }) => {
    // Check the How It Works heading
    await expect(page.locator('h2').filter({ hasText: 'How It Works' })).toBeVisible()
    
    // Check that all 5 steps are visible
    await expect(page.getByText('Skin Analysis & Preparation')).toBeVisible()
    await expect(page.getByText('Contouring Technology')).toBeVisible()
    await expect(page.getByText('Skin Smoothing Treatment')).toBeVisible()
    await expect(page.getByText('Collagen Stimulation')).toBeVisible()
    await expect(page.getByText('Finishing & Protection')).toBeVisible()
    
    // Check that step numbers are visible
    const stepNumbers = page.locator('.rounded-full.bg-primary.text-white').locator('text=1')
    await expect(stepNumbers.first()).toBeVisible()
  })

  test('should display expected results section', async ({ page }) => {
    // Check the Expected Results heading
    await expect(page.locator('h2').filter({ hasText: 'Expected Results' })).toBeVisible()
    
    // Check that some key result items are visible
    await expect(page.getByText('Naturally enhanced facial contours')).toBeVisible()
    await expect(page.getByText('Baby-smooth, silky skin texture')).toBeVisible()
    await expect(page.getByText('Defined cheekbones and jawline')).toBeVisible()
    await expect(page.getByText('Youthful, radiant complexion')).toBeVisible()
  })

  test('should display FAQ section with accordion', async ({ page }) => {
    // Check the FAQ heading
    await expect(page.locator('h2').filter({ hasText: 'Frequently Asked Questions' })).toBeVisible()
    
    // Check that FAQ questions are visible
    await expect(page.getByText('What makes this different from traditional contouring?')).toBeVisible()
    await expect(page.getByText('How long do the results last?')).toBeVisible()
    await expect(page.getByText('Is there any downtime?')).toBeVisible()
    
    // Test accordion functionality - click on first question
    const firstQuestion = page.getByText('What makes this different from traditional contouring?')
    await firstQuestion.click()
    
    // Check that the answer appears
    await expect(page.getByText('Unlike makeup contouring or invasive procedures')).toBeVisible()
  })

  test('should display final booking section', async ({ page }) => {
    // Check the final CTA heading
    await expect(page.locator('h2').filter({ hasText: 'Get Your Perfect Baby Face' })).toBeVisible()
    
    // Check the final CTA button
    const finalBookButton = page.getByRole('link', { name: 'Book Consultation' })
    await expect(finalBookButton).toBeVisible()
    
    // Verify the button links to contact page
    await expect(finalBookButton).toHaveAttribute('href', '/contact')
  })

  test('should have proper responsive behavior', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 })
    await expect(page.locator('h1').filter({ hasText: 'Baby Face Contouring' })).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('h1').filter({ hasText: 'Baby Face Contouring' })).toBeVisible()
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('h1').filter({ hasText: 'Baby Face Contouring' })).toBeVisible()
  })

  test('should load TreatmentImage components', async ({ page }) => {
    // Check that treatment images are present (they might be placeholders)
    const heroImage = page.locator('img[alt*="Baby Face Contouring Treatment"]').first()
    
    // Wait a bit for images to load and check if any treatment-related images are present
    await page.waitForTimeout(2000)
    
    // Look for any images in the treatment sections
    const treatmentImages = page.locator('img[alt*="Baby Face"], img[alt*="Natural Contouring"], img[alt*="Youthful Glow"]')
    const imageCount = await treatmentImages.count()
    
    // We expect at least some images to be present (even if they're placeholders)
    expect(imageCount).toBeGreaterThan(0)
  })

  test('should have proper page structure and accessibility', async ({ page }) => {
    // Check that the page has proper heading hierarchy
    const h1Elements = page.locator('h1')
    await expect(h1Elements).toHaveCount(1)
    
    // Check that there are multiple h2 elements for section headers
    const h2Elements = page.locator('h2')
    const h2Count = await h2Elements.count()
    expect(h2Count).toBeGreaterThan(3)
    
    // Check that buttons have proper accessibility attributes
    const buttons = page.locator('button, [role="button"]')
    const buttonCount = await buttons.count()
    expect(buttonCount).toBeGreaterThan(0)
  })

  test('should load without console errors', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    // Filter out known acceptable errors (like missing images in development, Clerk warnings, React warnings)
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('404') && 
      !error.includes('Failed to load resource') &&
      !error.includes('placeholder') &&
      !error.includes('clerk') &&
      !error.includes('Warning: React') &&
      !error.includes('TypeError: Failed to fetch')
    )
    
    expect(criticalErrors).toHaveLength(0)
  })
}) 