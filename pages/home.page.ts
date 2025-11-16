import { Locator, Page } from "@playwright/test"

export class HomePage {
    page: Page;
    combinationPliersProduct: Locator;
    slipJointPliersProduct: Locator;
    sortingButton: Locator;
    productName: Locator;
    productPrice: Locator;
    sanderLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.combinationPliersProduct = this.page.locator('[data-test="product-name"]:has-text("Combination Pliers")');
        this.slipJointPliersProduct = this.page.locator('[data-test="product-name"]:has-text("Slip Joint Pliers")');
        this.sortingButton = this.page.getByTestId("sort");
        this.productName = this.page.getByTestId("product-name");
        this.productPrice = this.page.getByTestId("product-price")
        this.sanderLabel = this.page.getByTestId("category-01KA7AXJB4YRD5MAG3ETKNNR5A")
    }
}
