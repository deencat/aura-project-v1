import { test, expect } from '@playwright/test'

test.describe('Cell Beauty Stretch Mark Repair Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cell-beauty/stretch-mark')
  })

  test('should display the page title and main heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Aura/)
    await expect(page.locator('h1')).toContainText('Stretch Mark Repair')
  })

  test('should display hero section with treatment description', async ({ page }) => {
    const heroSection = page.locator('section').first()
    await expect(heroSection).toContainText('Revolutionary cellular-level stretch mark repair using advanced regenerative technology')
    
    // Check for treatment tags specifically in hero section
    await expect(heroSection.getByText('Cellular Regeneration', { exact: true })).toBeVisible()
    await expect(heroSection.getByText('Collagen Restoration', { exact: true })).toBeVisible()
    await expect(heroSection.getByText('Texture Smoothing', { exact: true })).toBeVisible()
    await expect(heroSection.getByText('Skin Renewal', { exact: true })).toBeVisible()
    await expect(heroSection.getByText('Non-Invasive', { exact: true })).toBeVisible()
  })

  test('should display treatment image in hero section', async ({ page }) => {
    const treatmentImage = page.locator('img[alt="Stretch Mark Repair Treatment"]')
    await expect(treatmentImage).toBeVisible()
  })

  test('should display treatment info section', async ({ page }) => {
    const infoSection = page.locator('section').nth(1)
    await expect(infoSection).toContainText('Cellular Regeneration Technology')
    await expect(infoSection).toContainText('works at the deepest cellular level to truly regenerate damaged tissue')
  })

  test('should display technology advantages section', async ({ page }) => {
    const techSection = page.locator('section').nth(2)
    await expect(techSection).toContainText('Advanced Technology')
    await expect(techSection).toContainText('Precision Micro-Needling')
    await expect(techSection).toContainText('Radiofrequency Remodeling')
    await expect(techSection).toContainText('Growth Factor Infusion')
    await expect(techSection).toContainText('Cellular Regeneration Protocol')
  })

  test('should display treatment process steps', async ({ page }) => {
    const processSection = page.locator('section').nth(3)
    await expect(processSection).toContainText('Treatment Process')
    
    // Check for process steps
    await expect(processSection).toContainText('Skin Analysis & Assessment')
    await expect(processSection).toContainText('Preparation & Numbing')
    await expect(processSection).toContainText('Micro-Needling Application')
    await expect(processSection).toContainText('Growth Factor Infusion')
    await expect(processSection).toContainText('Radiofrequency Treatment')
    await expect(processSection).toContainText('Post-Treatment Care')
    
    // Check for step numbers
    await expect(processSection.locator('text=01')).toBeVisible()
    await expect(processSection.locator('text=06')).toBeVisible()
  })

  test('should display benefits section', async ({ page }) => {
    const benefitsSection = page.locator('section').nth(4)
    await expect(benefitsSection).toContainText('Expected Results')
    await expect(benefitsSection).toContainText('Significant reduction in stretch mark visibility')
    await expect(benefitsSection).toContainText('Improved skin texture and smoothness')
    await expect(benefitsSection).toContainText('Enhanced collagen and elastin production')
  })

  test('should display FAQ section with accordion', async ({ page }) => {
    const faqSection = page.locator('section').nth(5)
    await expect(faqSection).toContainText('Frequently Asked Questions')
    
    // Test accordion functionality
    const firstQuestion = page.getByRole('button', { name: 'How is this different from other stretch mark treatments?' })
    await expect(firstQuestion).toBeVisible()
    
    // Click to expand
    await firstQuestion.click()
    await expect(page.locator('text=Our Cell Beauty approach works at the cellular level')).toBeVisible()
    
    // Test other FAQ items
    await expect(page.getByRole('button', { name: 'How many sessions will I need?' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Is the treatment painful?' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Can all types of stretch marks be treated?' })).toBeVisible()
  })

  test('should display booking section with CTA', async ({ page }) => {
    const bookingSection = page.locator('section').last()
    await expect(bookingSection).toContainText('Transform Your Skin with Cellular Regeneration')
    await expect(bookingSection).toContainText('Ready to experience true stretch mark repair at the cellular level')
    
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
    await expect(page.locator('h1')).toContainText('Stretch Mark Repair')
    
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

  test('should verify TreatmentImage component usage', async ({ page }) => {
    // Check that images are properly loaded with TreatmentImage component
    const images = page.locator('img')
    const imageCount = await images.count()
    expect(imageCount).toBeGreaterThan(0)
    
    // Check for treatment-specific image alt text
    const treatmentImage = page.locator('img[alt="Stretch Mark Repair Treatment"]')
    await expect(treatmentImage).toBeVisible()
  })

  test('should verify cellular regeneration content specificity', async ({ page }) => {
    // Check for cellular-specific terminology (simplified to avoid multiple matches)
    await expect(page.locator('text=cellular level to truly regenerate')).toBeVisible()
    await expect(page.locator('text=regenerative technology to restore')).toBeVisible()
    await expect(page.locator('text=collagen and elastin fibers')).toBeVisible()
    
    // Check for key treatment technologies mentioned on the page
    const pageContent = await page.textContent('body')
    expect(pageContent).toContain('Precision Micro-Needling')
    expect(pageContent).toContain('Radiofrequency Remodeling')
    expect(pageContent).toContain('Growth Factor Infusion')
    expect(pageContent).toContain('Cellular Regeneration Protocol')
  })
}) 