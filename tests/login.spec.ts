import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';

const validUsers = [
    { username: 'admin@practicesoftwaretesting.com', password: 'welcome01', expectedUserName: 'John Doe' },
    { username: 'customer@practicesoftwaretesting.com', password: 'welcome01', expectedUserName: 'Jane Doe' },
    { username: 'customer2@practicesoftwaretesting.com', password: 'welcome01', expectedUserName: 'Jack Howe' },
];

const invalidUsers = [
    { username: 'admin@practicesoftwaretesting.com', password: 'wrongPassword' },
    { username: 'wrongUsername@practicesoftwaretesting.com', password: 'welcome01' },
];

test.describe('Login Page', () => {
    validUsers.forEach(({ username, password, expectedUserName }) => {
        test(`should login with valid credentials for ${username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            
            await loginPage.login(username, password);
            
            // Check if the user is redirected to the My Account page
            const accountPage = new AccountPage(page);
            expect(await accountPage.userName()).toBe(expectedUserName);
        });
    });

    invalidUsers.forEach(({ username, password }) => {
        test(`should not login with invalid credentials for ${username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            
            await loginPage.login(username, password);
            
            // For security, the error message is generic for invalid username or password
            await expect(await loginPage.loginErrorMsg()).toBe('Invalid email or password');
        });
    });
});