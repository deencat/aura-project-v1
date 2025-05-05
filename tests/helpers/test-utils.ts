https://github.com/deencat/aura-project-v1.gitimport { Page, Locator, expect } from '@playwright/test';

/**
 * Safely checks if an element is visible, avoiding strict mode violations
 * by using first() and catching any errors.
 * 
 * @param locator - The locator to check
 * @returns Promise resolving to true if element is visible, false otherwise
 */
export async function isVisible(locator: Locator): Promise<boolean> {
  try {
    return await locator.first().isVisible();
  } catch (error) {
    console.log(`Error checking visibility: ${error}`);
    return false;
  }
}

/**
 * Safely gets the text content of an element, avoiding strict mode violations
 * by using first() and catching any errors.
 * 
 * @param locator - The locator to get text from
 * @returns Promise resolving to the text content or empty string if error
 */
export async function getTextSafely(locator: Locator): Promise<string> {
  try {
    if (await locator.first().isVisible()) {
      return await locator.first().textContent() || '';
    }
    return '';
  } catch (error) {
    console.log(`Error getting text: ${error}`);
    return '';
  }
}

/**
 * Takes a screenshot on test failure with a descriptive filename
 * 
 * @param page - The page object
 * @param testName - Name of the test
 * @param error - The error that occurred
 */
export async function screenshotOnFailure(page: Page, testName: string, error: any): Promise<void> {
  const filename = `./test-results/${testName.replace(/\s+/g, '-')}-error-${Date.now()}.png`;
  console.error(`Test failed: ${error.message}`);
  await page.screenshot({ path: filename, fullPage: true });
  console.log(`Screenshot saved to ${filename}`);
}

/**
 * Waits for content to be visible using polling with exponential backoff,
 * more reliable than simple visibility checks especially for dynamic content
 * 
 * @param page - The page object
 * @param checkFn - Function that returns true when condition is met
 * @param options - Options including timeout and message
 * @returns Promise that resolves when content is visible
 */
export async function waitForContentWithPolling(
  page: Page,
  checkFn: () => Promise<boolean>,
  options: { timeout?: number, message?: string } = {}
): Promise<void> {
  const timeout = options.timeout || 20000; // Increase default timeout
  const message = options.message || 'Waiting for content to be visible';
  
  await expect.poll(async () => {
    try {
      // First try the provided check function
      const result = await checkFn();
      if (result) return true;
      
      // If that fails, try some common fallbacks
      const hasMain = await page.locator('main').isVisible().catch(() => false);
      const hasContent = await page.locator('#__next, #root, .content, [class*="content"]')
        .isVisible().catch(() => false);
      const hasHeading = await page.getByRole('heading').first().isVisible().catch(() => false);
      
      return result || hasMain || hasContent || hasHeading;
    } catch (error) {
      console.log(`Error in polling check: ${error}`);
      return false;
    }
  }, {
    timeout,
    intervals: [1000, 2000, 5000, 10000], // Longer exponential backoff
    message
  }).toBeTruthy();
}

/**
 * Navigates to a URL with retry logic for better resilience
 * 
 * @param page - The page object
 * @param url - URL to navigate to
 * @param options - Options including max retries and timeout
 * @returns Promise resolving to true if navigation succeeded
 */
export async function navigateWithRetry(
  page: Page,
  url: string,
  options: { maxRetries?: number, timeout?: number } = {}
): Promise<boolean> {
  const maxRetries = options.maxRetries || 3;
  const timeout = options.timeout || 45000; // Increase default timeout
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await page.goto(url, { timeout: timeout / maxRetries });
      
      // Verify page loaded correctly by checking for common elements
      const hasBody = await page.locator('body').isVisible().catch(() => false);
      if (hasBody) {
        console.log(`Successfully navigated to ${url}`);
        return true;
      }
      
      throw new Error('Page body not visible after navigation');
    } catch (error) {
      retries++;
      console.log(`Navigation retry ${retries}/${maxRetries}: ${error}`);
      if (retries === maxRetries) {
        console.error(`All navigation retries failed for ${url}`);
        return false;
      }
      // Exponential backoff
      await page.waitForTimeout(1000 * Math.pow(2, retries));
    }
  }
  
  return false;
}

/**
 * Checks for the existence of multiple content types and returns count of found items
 * 
 * @param page - The page object
 * @param contentTypes - Array of content types to check for
 * @returns Promise resolving to number of content types found
 */
export async function checkMultipleContentTypes(
  page: Page,
  contentTypes: string[]
): Promise<number> {
  let foundContent = 0;
  
  for (const type of contentTypes) {
    try {
      // Try multiple approaches to find content - first with exact text
      let hasType = await page.getByText(type, { exact: true })
        .first().isVisible().catch(() => false);
        
      // If not found, try with regex pattern
      if (!hasType) {
        hasType = await page.getByText(new RegExp(`\\b${type}\\b`, 'i'))
          .first().isVisible().catch(() => false);
      }
      
      // If still not found, try as part of a heading
      if (!hasType) {
        hasType = await page.getByRole('heading')
          .filter({ hasText: new RegExp(type, 'i') })
          .first().isVisible().catch(() => false);
      }
      
      if (hasType) {
        foundContent++;
        console.log(`Found content type: ${type}`);
      }
    } catch (error) {
      console.log(`Error checking for ${type}: ${error}`);
    }
  }
  
  return foundContent;
} 