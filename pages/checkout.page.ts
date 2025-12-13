import { Locator, Page } from "@playwright/test"

export class CheckoutPage {
    page: Page;
    productQuantity: Locator;
    productTitle: Locator;
    proceedToCheckout: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productQuantity = this.page.getByTestId("product-quantity");
        this.productTitle = this.page.getByTestId("product-title")
        this.proceedToCheckout = this.page.getByTestId("proceed-1");
    }
}