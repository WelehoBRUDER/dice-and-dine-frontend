import {test, expect} from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:5173");
  });

  // Check if the page is loaded
  test("has correct page title", async ({page}) => {
    await expect(page).toHaveTitle(/Dice & Dine/);
  });

  // Check for the main header text
  test("shows main header text", async ({page}) => {
    await expect(
      page.getByRole("heading", {name: "Dice & Dine"})
    ).toBeVisible();
  });

  // Check that has links to the other pages
  test("has working navigation buttons", async ({page}) => {
    await expect(page.getByRole("link", {name: "Menu"})).toBeVisible();
    await expect(page.getByRole("link", {name: "Games"})).toBeVisible();
    await expect(page.getByRole("link", {name: "About"})).toBeVisible();
  });

  // Check that the map is visible
  test("loads transportation info/map", async ({page}) => {
    const map = page.locator("div.leaflet-container");
    await expect(map).toBeVisible();
  });
});
