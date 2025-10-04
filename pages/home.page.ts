import { Locator, Page } from "@playwright/test"

export class HomePage {
    page: Page;
    combinationPliersProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.combinationPliersProduct = this.page.getByText("Combination Pliers")
    }
}
