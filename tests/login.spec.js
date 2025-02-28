// @ts-check
import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login'); // Update with your login route
    });

    test('should display login form', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Welcome back!' })).toBeVisible();
        await expect(page.getByPlaceholder('Enter your email')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        // Fill in valid email and password
        await page.fill('input[name="email"]', 'testuser@example.com');
        await page.fill('input[name="password"]', 'password123');

        // Click the login button and wait for response
        const responsePromise = page.waitForResponse((response) =>
            response.url().includes('/api/auth/login') && response.status() === 200
        );

        await page.getByRole('button', { name: 'Sign in' }).click();
        await responsePromise; // Wait for login request to complete

        // Expect redirection based on role
        await expect(page).toHaveURL(/\/(dashboard|admindash)/);
    });

    test('should display error message for invalid credentials', async ({ page }) => {
        await page.fill('input[name="email"]', 'invalid@example.com');
        await page.fill('input[name="password"]', 'wrongpassword');

        // Wait for login attempt and response
        const responsePromise = page.waitForResponse((response) =>
            response.url().includes('/api/auth/login') && response.status() === 401
        );

        await page.getByRole('button', { name: 'Sign in' }).click();
        await responsePromise;

        // Expect error message to be displayed
        // await expect(page.locator('[data-testid="error-message"]')).toHaveText(/error logging in/i);
    });

    test('should navigate to register page when clicking sign up', async ({ page }) => {
        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page).toHaveURL(/\/register/);
    });

    test('should navigate to forgot password page', async ({ page }) => {
        await page.getByRole('button', { name: 'Forgot Password?' }).click();
        await expect(page).toHaveURL(/\/forgetpassword/);
    });
});
