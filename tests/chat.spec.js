import { expect, test } from '@playwright/test';

test.describe('ChatPage', () => {

    test.beforeEach(async ({ page }) => {
        await page.context().storageState({ path: 'storageState.json' });
    });

    test('renders ChatPage and displays users', async ({ page }) => {
        await page.goto('http://localhost:5173/chat');

        // Wait for API to respond and the UI to update
        await page.waitForTimeout(2000); // Adjust if necessary

        const userList = page.locator('.user-list');

        // Ensure the user list is present
        await expect(userList).toBeVisible();

        // Check if at least one user exists
        const userCount = await userList.locator('li').count();
        expect(userCount).toBeGreaterThan(0);
    });

    test('navigates to the correct chat page when a user is clicked', async ({ page }) => {
        await page.goto('http://localhost:5173/chat');

        // Ensure users are loaded before interacting
        await page.waitForTimeout(2000);

        const userItem = page.locator('.user-list li').first();
        await userItem.waitFor({ state: 'visible', timeout: 10000 });

        // Get the user's ID dynamically
        const userId = await userItem.getAttribute('data-user-id');
        expect(userId).toBeTruthy(); // Ensure userId is not null or undefined

        // Click the user to navigate
        await userItem.click();

        // Validate correct navigation
        await expect(page).toHaveURL(`http://localhost:5173/chat/${userId}`);

        // Ensure the chat page actually loads
        await expect(page.locator('.chat-container')).toBeVisible();
    });

    test('displays no users message when there are no users available', async ({ page }) => {
        await page.route('**/api/auth/users', async route => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ users: [] }),
            });
        });

        await page.goto('http://localhost:5173/chat');

        await expect(page.locator('text=No users available.')).toBeVisible();
    });

});
