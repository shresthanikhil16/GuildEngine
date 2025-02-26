// @ts-check
import { expect, test } from '@playwright/test';

test('registration form', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('http://localhost:5173/register'); // Update the URL if needed

    await expect(page).toHaveTitle(/GuidEngine/);

    // Fill out the registration form
    await page.fill('input[placeholder="Enter your full name"]', 'Test User 1');
    await page.fill('input[placeholder="Enter your email"]', 'testuser2@example.com');
    await page.fill('input[placeholder="Password"]', 'password123');
    await page.fill('input[placeholder="Confirm Password"]', 'password123');

    // Click the register button
    await page.click('button:has-text("Sign up")');

    // Wait for success message
    const successMessage = await page.locator('text=User registered successfully');
    await expect(successMessage).toBeVisible();

    // Optionally, check if redirected to login after a delay
    await page.waitForTimeout(2000); // Wait for the redirect
    await expect(page).toHaveURL(/\/login$/); // Verify the URL is now the login page
});