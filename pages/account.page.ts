import { Locator, Page } from "@playwright/test"

export class AccountPage {
    page: Page;
    pageTitle: Locator;
    navigationMenu: Locator;
    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('[data-test="page-title"]');
        this.navigationMenu = this.page.locator('[data-test="nav-menu"]');


    }


}