import { expect, test } from '@playwright/test';

test.describe('GetStarted Page', () => {
    test('should display GuidEngine heading', async ({ page }) => {
        await page.goto('http://localhost:5173'); // Adjust this URL if needed

        // Expect to see the GuidEngine heading
        await expect(page.locator('text=GuidEngine')).toBeVisible();
    });

    test('should render Get Started button', async ({ page }) => {
        await page.goto('http://localhost:5173/');

        // Expect the Get Started button to be visible
        await expect(page.locator('button', { hasText: 'Get Started' })).toBeVisible();
    });

    test('should navigate to /welcomepage when Get Started button is clicked', async ({ page }) => {
        await page.goto('http://localhost:5173/');

        // Click the "Get Started" button
        await page.locator('button', { hasText: 'Get Started' }).click();

        // Expect to be redirected to the /welcomepage route
        await expect(page).toHaveURL(/\/welcomepage/);
    });

    test('should display logo image', async ({ page }) => {
        await page.goto('http://localhost:5173/');

        // Check if the image is visible
        const imgLocator = page.locator('img[alt="GuidEngine Logo"]');
        await expect(imgLocator).toBeVisible();
    });
});
