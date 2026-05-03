import { test, expect } from "@playwright/test"

test.describe("Trends (public KB-3)", () => {
  test("index loads with heading and language switcher", async ({ page }) => {
    await page.goto("/trends", { waitUntil: "domcontentloaded" })
    await expect(page).toHaveURL(/\/trends/)

    await expect(
      page.getByText(/美容趨勢摘要|美容趋势摘要|Beauty trend summaries/)
    ).toBeVisible({ timeout: 15_000 })
    await expect(page.getByRole("link", { name: "zh-HK", exact: true })).toBeVisible()
    await expect(page.getByRole("link", { name: "en", exact: true })).toBeVisible()
  })
})
