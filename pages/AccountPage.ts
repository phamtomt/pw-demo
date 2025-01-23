import { Locator, Page } from '@playwright/test';

export class AccountPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('page-title');
        this.logoutButton = page.locator('button#logout');
    }

    async goto() {
        await this.page.goto('https://practicesoftwaretesting.com/account');
    }

    async userName() {
        const username = await this.page.locator('[data-test="nav-menu"]').textContent();
        return username ? username.trim() : ''
    }

    async logout() {
        await this.logoutButton.click();
    }
}