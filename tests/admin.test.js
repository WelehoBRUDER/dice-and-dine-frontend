import {test, expect} from "@playwright/test";

test.describe("Admin Page", () => {
  test.beforeEach(async ({page}) => {
    await page.addInitScript(() => {
      localStorage.setItem("language", "en");
    });
    // Go to the homepage
    await page.goto("http://localhost:5173");
  });

  test("can login as admin and access admin page", async ({page}) => {
    // Click "Login" in nav
    await page.getByRole("link", {name: /login/i}).click();

    // Ensure login form is loaded
    await expect(page.getByRole("heading", {name: /login/i})).toBeVisible();

    // Fill login form with admin credentials
    await page.getByPlaceholder("Enter your username").fill("prudoe");
    await page.getByPlaceholder("Enter your password").fill("newpass");

    // Click login button
    await page.getByRole("button", {name: /login/i}).click();

    // Ensure we are redirected to homepage after login
    await expect(page).toHaveURL("http://localhost:5173/");
    await expect(
      page.getByRole("heading", {name: "Dice & Dine"})
    ).toBeVisible();

    // Check if the "Admin" link is visible in the header
    await expect(page.getByRole("link", {name: /admin/i})).toBeVisible();

    // Click the "Admin" link
    await page.getByRole("link", {name: /admin/i}).click();

    // Ensure we're on the /admin page
    await expect(page).toHaveURL("http://localhost:5173/admin");

    // Check if the heading on the admin page is visible
    await expect(
      page.getByRole("heading", {name: /admin page/i})
    ).toBeVisible();
  });
});
