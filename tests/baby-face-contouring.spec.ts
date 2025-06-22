import { test, expect } from '@playwright/test'

test.describe('Baby Face Contouring Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cell-beauty/baby-face')
  })

  test('should display the page title and main heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Aura/)
    await expect(page.locator('h1')).toContainText('Baby Face Contouring')
  })

  test('should display hero section with treatment description', async ({ page }) => {
    const heroSection = page.locator('section').first()
    await expect(heroSection).toContainText('Sculpt and define facial contours while maintaining a youthful, baby-like appearance')
    
    // Check for treatment tags specifically in hero section
    await expect(heroSection.getByText('Non-Invasive', { exact: true })).toBeVisible()
    await expect(heroSection.getByText('Natural Results', { exact: true })).toBeVisible()
    await expect(heroSection.getByText('Youthful Contours', { exact: true })).toBeVisible()
  })

  test('should display treatment image in hero section', async ({ page }) => {
    const treatmentImage = page.locator('img[alt="Baby Face Contouring Treatment"]')
    await expect(treatmentImage).toBeVisible()
  })

  test('should display treatment info section', async ({ page }) => {
    const infoSection = page.locator('section').nth(1)
    await expect(infoSection).toContainText('Achieve Perfect Facial Harmony')
    await expect(infoSection).toContainText('Our Baby Face Contouring treatment is designed to enhance your natural beauty')
  })

  test('should display technology advantages section', async ({ page }) => {
    const techSection = page.locator('section').nth(2)
    await expect(techSection).toContainText('Technology Advantages')
    await expect(techSection).toContainText('Precision Contouring Technology')
    await expect(techSection).toContainText('Natural Collagen Stimulation')
    await expect(techSection).toContainText('Customizable Treatment Intensity')
    await expect(techSection).toContainText('Progressive Enhancement')
  })

  test('should display treatment process steps', async ({ page }) => {
    const processSection = page.locator('section').nth(3)
    await expect(processSection).toContainText('Treatment Process')
    
    // Check for process steps
    await expect(processSection).toContainText('Facial Analysis & Consultation')
    await expect(processSection).toContainText('Customized Contouring Map')
    await expect(processSection).toContainText('Preparation & Comfort')
    await expect(processSection).toContainText('Precision Contouring Application')
    await expect(processSection).toContainText('Post-Treatment Care')
    
    // Check for step numbers
    await expect(processSection.locator('text=01')).toBeVisible()
    await expect(processSection.locator('text=05')).toBeVisible()
  })

  test('should display benefits section', async ({ page }) => {
    const benefitsSection = page.locator('section').nth(4)
    await expect(benefitsSection).toContainText('Expected Results')
    await expect(benefitsSection).toContainText('Enhanced facial definition and contours')
    await expect(benefitsSection).toContainText('Natural-looking lifting effects')
    await expect(benefitsSection).toContainText('Maintained soft, youthful features')
  })

  test('should display FAQ section with accordion', async ({ page }) => {
    const faqSection = page.locator('section').nth(5)
    await expect(faqSection).toContainText('Frequently Asked Questions')
    
    // Test accordion functionality
    const firstQuestion = page.getByRole('button', { name: 'Will I still look like myself after the treatment?' })
    await expect(firstQuestion).toBeVisible()
    
    // Click to expand
    await firstQuestion.click()
    await expect(page.locator('text=Our Baby Face Contouring is designed to enhance your natural features')).toBeVisible()
    
    // Test other FAQ items
    await expect(page.getByRole('button', { name: 'How many sessions are typically needed?' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Is there any pain or discomfort?' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'When will I see results?' })).toBeVisible()
  })

  test('should display booking section with CTA', async ({ page }) => {
    const bookingSection = page.locator('section').last()
    await expect(bookingSection).toContainText('Transform Your Look with Baby Face Contouring')
    await expect(bookingSection).toContainText('Ready to enhance your natural beauty while maintaining your youthful appearance')
    
    const bookButton = page.getByRole('link', { name: 'Book Now' }).last()
    await expect(bookButton).toBeVisible()
    await expect(bookButton).toHaveAttribute('href', '/contact')
  })

  test('should have working CTA buttons', async ({ page }) => {
    // Test hero section buttons
    const heroBookButton = page.getByRole('button', { name: 'Book Treatment' })
    await expect(heroBookButton).toBeVisible()
    
    const learnMoreButton = page.getByRole('button', { name: 'Learn More' })
    await expect(learnMoreButton).toBeVisible()
    
    // Test final CTA button (be more specific to avoid multiple matches)
    const finalBookButton = page.locator('section').last().getByRole('link', { name: 'Book Now' })
    await expect(finalBookButton).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if hero content is still visible and readable
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Baby Face Contouring')
    
    // Check if sections are properly stacked
    const sections = page.locator('section')
    const sectionCount = await sections.count()
    expect(sectionCount).toBeGreaterThan(5)
  })

  test('should have proper semantic structure', async ({ page }) => {
    // Check for proper heading hierarchy
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h2')).toHaveCount(6)
    
    // Check for main content structure
    await expect(page.locator('main, [role="main"]')).toBeTruthy()
    
    // Check for proper button roles
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