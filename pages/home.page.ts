import { Locator, Page } from "@playwright/test"

export class HomePage {
    page: Page;
    sortingButton: Locator;
    productName: Locator;
    productPrice: Locator;
    sanderLabel: Locator;
    filterCompleted: Locator;
    sortingCompleted: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortingButton = this.page.getByTestId("sort");
        this.productName = this.page.getByTestId("product-name");
        this.productPrice = this.page.getByTestId("product-price")
        this.sanderLabel = page.locator('label:has-text("Sander")');
        this.filterCompleted = this.page.getByTestId('filter_completed');
        this.sortingCompleted = this.page.getByTestId('sorting_completed')
    }
    getProductByText(text: string) {
        return this.page.locator(`[data-test="product-name"]:has-text("${text}")`);
    }
}
