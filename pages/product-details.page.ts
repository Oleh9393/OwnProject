import { Locator, Page } from "@playwright/test"

export class ProductDetailsPage {
    page: Page;
    unitPrice: Locator;
    addToFavourites: Locator;
    addToCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.unitPrice = this.page.getByTestId("unit-price")
        this.addToFavourites = this.page.getByTestId("add-to-favorites")
        this.addToCart = this.page.getByTestId("add-to-cart")
    }
}
