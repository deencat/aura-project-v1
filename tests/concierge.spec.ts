import { test, expect } from "@playwright/test"

test.describe("Concierge (smoke)", () => {
  test("loads page, heading, chat region, and composer", async ({ page }) => {
    await page.goto("/concierge", { waitUntil: "domcontentloaded" })
    await expect(page).toHaveURL(/\/concierge/)

    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Aura/i)

    await expect(page.getByRole("region", { name: /Chat messages|聊天/ })).toBeVisible()

    await expect(page.locator("#concierge-input-page")).toBeVisible()
    await expect(page.getByRole("button", { name: /Send|送出|发送/ })).toBeVisible()
  })
})
