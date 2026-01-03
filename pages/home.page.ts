import {expect, Locator, Page } from "@playwright/test"

export class HomePage {
    page: Page;
    sortingButton: Locator;
    productName: Locator;
    productPrice: Locator;
    sanderLabel: Locator;
    filterCompleted: Locator;
    sortingCompleted: Locator;
    productCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortingButton = this.page.getByTestId("sort");
        this.productName = this.page.getByTestId("product-name");
        this.productPrice = this.page.getByTestId("product-price")
        this.sanderLabel = page.locator('label:has-text("Sander")');
        this.filterCompleted = this.page.getByTestId('filter_completed');
        this.sortingCompleted = this.page.getByTestId('sorting_completed');
        this.productCard = page.locator('.card').first();
    }
    getProductByText(text: string) {
        return this.page.locator(`[data-test="product-name"]:has-text("${text}")`);
    }

    async getProductPrice(): Promise<string> {
        return await this.productCard.getByTestId('product-price').innerText();
    }

    async getProductName(): Promise<string> {
        return await this.productCard.locator('.card-title').innerText();
    }

    async openFirstProduct() {
        await this.productCard.click();
    }

    async verifyProductIsVisible() {
        await expect(this.productCard).toBeVisible();
    }
}
