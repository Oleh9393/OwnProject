import { Locator, Page } from "@playwright/test"

export class ProductDetailsPage {
    page: Page;
    unitPrice: Locator;
    addToFavourites: Locator;
    addToCart: Locator;
    quantityIcon:Locator;
    navCart:Locator;

    constructor(page: Page) {
        this.page = page;
        this.unitPrice = this.page.getByTestId("unit-price")
        this.addToFavourites = this.page.getByTestId("add-to-favorites")
        this.addToCart = this.page.getByTestId("add-to-cart")
        this.quantityIcon = this.page.getByTestId("cart-quantity")
        this.navCart = this.page.getByTestId("nav-cart")
    }
}
