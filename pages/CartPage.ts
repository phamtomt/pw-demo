import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartTotal: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartTotal = page.locator('[data-test="cart-total"]');
        this.cartItems = page.locator('tr.ng-star-inserted');
    }

    async goto() {
        await this.page.goto('https://practicesoftwaretesting.com/checkout');
    }

    async getCartTotal(): Promise<string | null> {
        return this.cartTotal.textContent();
    }

    async getCartItems(): Promise<Array<{ title: string, quantity: string, price: string, linePrice: string }>> {
        const items: Array<{ title: string, quantity: string, price: string, linePrice: string }> = [];
        const itemElements = await this.cartItems.elementHandles();

        for (const itemElement of itemElements) {
            const title = await itemElement.$eval('[data-test="product-title"]', el => el.textContent?.trim() || '');
            const quantity = await itemElement.$eval('[data-test="product-quantity"]', el => (el as HTMLInputElement).value || '');
            const price = await itemElement.$eval('[data-test="product-price"]', el => el.textContent?.trim() || '');
            const linePrice = await itemElement.$eval('[data-test="line-price"]', el => el.textContent?.trim() || '');
            items.push({ title, quantity, price, linePrice });
        }

        return items;
    }

    async removeItem(index: number): Promise<void> {
        const itemElement = this.cartItems.nth(index);
        // Add the logic to remove the item here
    }

    async updateQuantity(index: number, quantity: number): Promise<void> {
        const itemElement = this.cartItems.nth(index);
        const quantityInput = itemElement.locator('[data-test="product-quantity"]');
        await quantityInput.fill(quantity.toString());
    }
}