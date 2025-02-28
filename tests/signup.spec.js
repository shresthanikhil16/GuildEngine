// @ts-check
import { expect, test } from '@playwright/test';

test.describe('Signup Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/register'); // Update with your actual route
    });

    test('should display registration form', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
        await expect(page.getByPlaceholder('Enter your full name')).toBeVisible();
        await expect(page.getByPlaceholder('Enter your email')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();
        await expect(page.getByPlaceholder('Confirm Password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    });

    test('should show error when passwords do not match', async ({ page }) => {
        await page.fill('input[name="username"]', 'Test User');
        await page.fill('input[name="email"]', 'testuser@example.com');
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'password321'); // Mismatched password

        await page.click('button:has-text("Sign up")');

        await expect(page.locator('text=Passwords do not match.')).toBeVisible();
    });

    test('should successfully register a new user', async ({ page }) => {
        // Fill in the registration form with valid data
        await page.fill('input[name="username"]', 'Test User');
        await page.fill('input[name="email"]', 'testuser2@example.com');
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'password123');

        // Click the Sign Up button and wait for API response
        const responsePromise = page.waitForResponse((response) =>
            response.url().includes('/api/auth/register') && response.status() === 201
        );

        await page.click('button:has-text("Sign up")');
        await responsePromise; // Wait for the response

        // Expect success message
        await expect(page.locator('text=User registered successfully!')).toBeVisible();

        // Ensure redirection to login page
        await page.waitForTimeout(2000); // Wait for redirect
        await expect(page).toHaveURL(/\/login$/);
    });

    test('should show an error for existing user', async ({ page }) => {
        await page.fill('input[name="username"]', 'Existing User');
        await page.fill('input[name="email"]', 'existinguser@example.com'); // Assume this email already exists
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'password123');

        // Wait for API response
        const responsePromise = page.waitForResponse((response) =>
            response.url().includes('/api/auth/register') && response.status() === 400
        );

        await page.click('button:has-text("Sign up")');
        await responsePromise;

        // Expect error message
        await expect(page.locator('text=Registration failed. Try again.')).toBeVisible();
    });

    test('should navigate to login page when clicking login link', async ({ page }) => {
        await page.getByText('Already have an account? Login').click();
        await expect(page).toHaveURL(/\/login/);
    });
});
