// Example test file structure
// Import necessary libraries and models
import { test } from '@playwright/test';
import LoginPage from './support/pages/login';

test.describe('Checking Login', () => {
    test('check that login is successfully done when informing valid username and password', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.visitURL()
        await loginPage.login("Admin", "admin123")
        await loginPage.checkDestinationPage()
    });

    test('check that user cannot login when informing invalid username and password', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.visitURL()
        await loginPage.login("paulo", "123456")
        await loginPage.checkInvalidCredentialsMessage()
    });
});


