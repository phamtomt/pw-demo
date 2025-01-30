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

    async gridCount() {
        return await this.productGrid.getByRole("link").count();
    }

    async searchFor(term: string) {
        await this.searchInput.click();
        await this.searchInput.fill(term);
        await this.searchButton.click();
        await this.page.getByTestId('search_completed').waitFor({ state: 'visible' });
    }
    
    async getProducts() {
        const products: { name: string; price: string }[] = [];
        const productElements = await this.productGrid.getByRole("link").elementHandles();
        
        for (const productElement of productElements) {
            const name = await productElement.$eval('[data-test="product-name"]', el => el.textContent.trim());
            const price = await productElement.$eval('[data-test="product-price"]', el => el.textContent.trim());
            products.push({ name, price });
        }
        
        return products;
    }

    async filterByCategory(categoryName: string) {
        const categoryFilter = this.page.locator(`label:has-text("${categoryName}") input[type="checkbox"]`);
        await categoryFilter.click();
        await this.page.getByTestId('filter_completed').waitFor({ state: 'visible' });
    }

    async sortProducts(sortOption: string) {
        const sortSelect = this.page.locator('[data-test="sort"]');
        await sortSelect.selectOption(sortOption);
        await this.page.getByTestId('sorting_completed').waitFor({ state: 'visible' });
    }
}