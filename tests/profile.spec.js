import { expect, test } from '@playwright/test';

test('Profile page should show user data', async ({ page }) => {
    // Mocking localStorage to simulate authentication (set token)
    await page.evaluate(() => {
        localStorage.setItem('token', 'your-token');  // Replace 'your-token' with a valid token for your test
    });

    // Navigate to the profile page
    await page.goto('http://localhost:3000/profile');

    // Wait for the profile elements to load
    await page.waitForSelector('.user-list');  // Wait for the user list to be visible
    await expect(page.locator('.user-list')).toBeVisible();  // Ensure the user list is visible

    // Verify if the profile data is displayed correctly
    const username = await page.locator('.username');  // Modify this locator to match the correct class or ID
    await expect(username).toHaveText('Test User');  // Ensure the username is correct (replace with your test name)

    const email = await page.locator('.email');  // Modify this locator to match the correct class or ID
    await expect(email).toHaveText('test@example.com');  // Ensure the email is correct (replace with your test email)

    // Check if the profile picture has the correct src
    const profilePic = await page.locator('img[alt="Profile"]');  // Modify the selector to match your profile image element
    await expect(profilePic).toHaveAttribute('src', 'http://localhost:3000/profile-picture.jpg');  // Replace with the correct profile picture URL

    // Optional: Take a screenshot for debugging purposes
    await page.screenshot({ path: 'screenshot.png' });  // Save a screenshot for visual debugging
});
