import { Locator, Page } from "@playwright/test"

export class AccountPage {
    page: Page;
    pageTitle: Locator;
    navigationMenu: Locator;
    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.getByTestId("page-title");
        this.navigationMenu = this.page.getByTestId("nav-menu");
    }
}
