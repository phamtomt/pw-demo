import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productGrid: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit');
        this.productGrid = page.locator(".col-md-9")
    }

    async goto() {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }

    async searchFor(term: string) {
        await this.searchInput.click();
        await this.searchInput.fill(term);
        await this.searchButton.click();
        await this.page.getByTestId('search_completed').waitFor({ state: 'visible' });
    }
    
    async gridCount() {
        return await this.productGrid.getByRole("link").count();
    }
}