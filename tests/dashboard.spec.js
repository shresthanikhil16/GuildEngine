import { expect, test } from '@playwright/test';

test.describe('DashboardPage', () => {

    test('renders the DashboardPage correctly', async ({ page }) => {
        await page.goto('http://localhost:5173/dashboard'); // Adjust URL if necessary

        // Check if the Popular Games section is present
        await expect(page.locator('text=Popular Games')).toBeVisible();

        // Check if the Registered Games section is present
        await expect(page.locator('h2:has-text("Registered Games")')).toBeVisible(); // More specific to the <h2> element

        // Check if the banner image is rendered
        const bannerImg = page.locator('img[alt="Banner 1"]'); // Adjust if needed
        await expect(bannerImg).toBeVisible();
    });

    test('fetches and displays registered games', async ({ page }) => {
        // Mock the response using the Playwright's API route interception
        await page.route('**/api/player/players', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify([
                    { name: 'Player 1', tournament: 'Tournament A' },
                    { name: 'Player 2', tournament: 'Tournament B' }
                ])
            });
        });

        await page.goto('http://localhost:5173/dashboard'); // Adjust URL if necessary

        // Wait for the data to be fetched and displayed
        await expect(page.locator('h3:text("Player 1")')).toBeVisible(); // Target the <h3> element specifically
        await expect(page.locator('text=Tournament A')).toBeVisible(); // Target the tournament text
        await expect(page.locator('h3:text("Player 2")')).toBeVisible(); // Target the <h3> element specifically
        await expect(page.locator('text=Tournament B')).toBeVisible(); // Target the tournament text
    });

    test('displays message when no registered games are available', async ({ page }) => {
        // Mock an empty response for registered games
        await page.route('**/api/player/players', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify([])
            });
        });

        await page.goto('http://localhost:5173/dashboard'); // Adjust URL if necessary

        // Wait for the component to render and check the specific message
        await expect(page.locator('p:text("No registered games available.")')).toBeVisible(); // Target the <p> tag
    });

    test('banner image changes every 5 seconds', async ({ page }) => {
        await page.goto('http://localhost:5173/dashboard'); // Adjust URL if necessary

        // Check initial banner image
        const initialBanner = page.locator('img[alt="Banner 1"]');
        await expect(initialBanner).toBeVisible();

        // Wait for 5 seconds and check if the banner image changes
        await page.waitForTimeout(5000); // Simulate the 5-second interval for the banner
        const updatedBanner = page.locator('img[alt="Banner 2"]'); // Adjust if needed
        await expect(updatedBanner).toBeVisible();
    });

});
