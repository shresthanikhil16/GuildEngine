// @ts-check
import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
    test('should display login form', async ({ page }) => {
        await page.goto('http://localhost:5173/login'); // Update with your login route

        // Expect to see the login title
        await expect(page.getByRole('heading', { name: 'Welcome back!' })).toBeVisible();

        // Expect the email and password fields to be present
        await expect(page.getByPlaceholder('Enter your email')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();

        // Expect the login button to be present
        await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();

        // Expect the sign-up button to be present
        await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        await page.goto('http://localhost:5173/login'); // Update with your login route

        // Fill in valid email and password
        await page.fill('input[type="email"]', 'testuser2@example.com'); // Replace with a valid email
        await page.fill('input[type="password"]', 'password123'); // Replace with a valid password

        // Click the login button
        await page.getByRole('button', { name: 'Sign in' }).click();

        // Expect to be redirected based on role
        await expect(page).toHaveURL(/\/dashboard/); // Replace with the expected URL for the dashboard
    });

    test('should display error message for invalid credentials', async ({ page }) => {
        await page.goto('http://localhost:5173/login'); // Update with your login route

        // Fill in invalid email and password
        await page.fill('input[name="email"]', 'invalid-email@example.com');
        await page.fill('input[name="password"]', 'invalid-password');

        // Click the login button
        await page.getByRole('button', { name: 'Sign in' }).click();

        // Expect to see an error message for invalid login (check the error displayed on your page)
        await expect(page.getByText('Error logging in. Please try again.')).toBeVisible(); // Modify the error text based on your actual error message
    });

    test('should navigate to register page when clicking sign up', async ({ page }) => {
        await page.goto('http://localhost:5173/login'); // Update with your login route

        // Click the sign up button
        await page.getByRole('button', { name: 'Sign up' }).click();

        // Expect to be redirected to the register page
        await expect(page).toHaveURL(/\/register/); // Replace with the expected URL for the register page
    });
});
