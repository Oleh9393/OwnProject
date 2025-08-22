import { Locator, Page } from "@playwright/test"

export class HomePage {
    page: Page;
    combinationPliersProduct: Locator;
    combinationPliersPrice: Locator;
    addToFavourites: Locator;
    addToCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.combinationPliersProduct = this.page.getByText("Combination Pliers")
        this.combinationPliersPrice = this.page.locator(('[data-test="unit-price"]'))
        this.addToFavourites = this.page.locator(('[data-test="add-to-favorites"]'))
        this.addToCart = this.page.locator(('[data-test="add-to-cart"]'))

        



    }
}