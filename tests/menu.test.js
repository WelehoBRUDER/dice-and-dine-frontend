// tests/menu.test.js
import {test, expect} from "@playwright/test";

test.describe("Menu Page", () => {
  test.beforeEach(async ({page}) => {
    await page.addInitScript(() => {
      localStorage.setItem("language", "en");
    });
    await page.goto("http://localhost:5173");
  });

  // Check if the page is loaded
  test("menu page has correct heading and categories", async ({page}) => {
    await page.getByRole("link", {name: /menu/i}).click();
    await page.waitForSelector("h2");

    // h1 check
    await expect(
      page.getByRole("heading", {level: 1, name: /menu/i})
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {level: 2, name: /starter/i})
    ).toBeVisible({timeout: 10000});
  });
});
