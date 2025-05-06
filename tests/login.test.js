import {test, expect} from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({page}) => {
    await page.addInitScript(() => {
      localStorage.setItem("language", "en");
    });
    await page.goto("http://localhost:5173");
  });

  test("can login with valid credentials", async ({page}) => {
    // Click "Login" in nav
    await page.getByRole("link", {name: /login/i}).click();

    // Ensure login form is loaded
    await expect(page.getByRole("heading", {name: /login/i})).toBeVisible();

    // Fill form
    await page.getByPlaceholder("Enter your username").fill("robdoe");
    await page.getByPlaceholder("Enter your password").fill("newpass");

    // Click login button
    await page.getByRole("button", {name: /login/i}).click();

    // Expect redirect to homepage
    await expect(page).toHaveURL("http://localhost:5173/");
    await expect(
      page.getByRole("heading", {name: "Dice & Dine"})
    ).toBeVisible();
  });

  test("shows alert with error message on unsuccessful login", async ({
    page,
  }) => {
    // Click "Login" in nav
    await page.getByRole("link", {name: /login/i}).click();

    // Ensure login form is loaded
    await expect(page.getByRole("heading", {name: /login/i})).toBeVisible();

    // Fill form with invalid credentials
    await page.getByPlaceholder("Enter your username").fill("invalidUser");
    await page.getByPlaceholder("Enter your password").fill("wrongPassword");

    // Listen for alert dialog and capture it
    page.once("dialog", async (dialog) => {
      // Assert the dialog message
      expect(dialog.message()).toBe(
        "Login failed. Please check your credentials."
      );
      await dialog.accept(); // Close the alert
    });

    // Click login button
    await page.getByRole("button", {name: /login/i}).click();

    // Wait for the alert to be shown and handled
    await page.waitForTimeout(1000); // Give time for the alert to appear
  });
});
