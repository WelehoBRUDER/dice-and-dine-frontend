import {test, expect} from "@playwright/test";

test.describe("Games", () => {
  test.beforeEach(async ({page}) => {
    await page.addInitScript(() => {
      localStorage.setItem("language", "en");
    });
    // Ensure we start at the homepage
    await page.goto("http://localhost:5173");
  });

  test("can navigate to games page", async ({page}) => {
    // Click "Games" in nav
    await page.getByRole("link", {name: /games/i}).click();

    // Ensure games page is loaded by checking the heading
    await expect(page.getByRole("heading", {name: /games/i})).toBeVisible();
  });

  test("has correct page title", async ({page}) => {
    // Click the "Games" link to navigate to the games page
    await page.getByRole("link", {name: /games/i}).click();

    // Wait for the games page to fully load
    await expect(page.locator('h1:has-text("Games")')).toBeVisible(); // Wait for games heading

    // Ensure the page title contains "Games"
    await expect(page).toHaveTitle(/Games/);
  });

  test("shows header links", async ({page}) => {
    // Make sure all header links are visible
    await expect(page.getByRole("link", {name: /about/i})).toBeVisible();
    await expect(page.getByRole("link", {name: /menu/i})).toBeVisible();
    await expect(page.getByRole("link", {name: /games/i})).toBeVisible();
    await expect(page.getByRole("link", {name: /reviews/i})).toBeVisible();
    await expect(page.getByRole("link", {name: /register/i})).toBeVisible();
    await expect(page.getByRole("link", {name: /login/i})).toBeVisible();

    // Optional: Click the "Menu" link to verify the navigation works
    await page.getByRole("link", {name: /menu/i}).click();
    // Make sure you navigated correctly to the menu page
    await expect(page).toHaveURL(/menu/); // Adjust this based on your URL structure
  });
});
