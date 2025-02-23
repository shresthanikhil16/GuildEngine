// @ts-check
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login'); // Ensure correct URL
});

test.describe('Login Page', () => {
    test('should render login page correctly', async ({ page }) => {
        await expect(page.getByAltText('Logo')).toBeVisible(); // Logo check
        await expect(page.getByRole('heading', { name: 'Welcome back!' })).toBeVisible(); // Title check
        await expect(page.getByPlaceholder('Enter your email')).toBeVisible(); // Email input
        await expect(page.getByPlaceholder('Password')).toBeVisible(); // Password input
        await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible(); // Login button
        await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible(); // Sign up button
    });

    test('should show error on invalid credentials', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill('wronguser@example.com');
        await page.getByPlaceholder('Password').fill('wrongpassword');
        await page.getByRole('button', { name: 'Sign in' }).click();

        const errorMessage = await page.getByTestId('error-message').textContent();
        expect(errorMessage).toMatch(/Invalid credentials|Error logging in. Please try again./);
    });

    test('should successfully log in with valid credentials', async ({ page }) => {
        await page.getByPlaceholder('Enter your email').fill('correctuser@example.com');
        await page.getByPlaceholder('Password').fill('correctpassword');
        await page.getByRole('button', { name: 'Sign in' }).click();

        // ✅ Wait for navigation before checking URL
        await page.waitForURL('http://localhost:5173/dashboard');
        await expect(page).toHaveURL('http://localhost:5173/dashboard');
    });

    test('should allow navigation to sign-up page', async ({ page }) => {
        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page).toHaveURL('http://localhost:5173/register');
    });
});
