import { Locator, Page } from "@playwright/test"

export class LoginPage {
    page: Page;
    emailField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.locator('[data-test="email"]');
        this.passwordField = this.page.locator('[data-test="password"]')
        this.loginButton = this.page.locator('[data-test="login-submit"]')

    }
    async performLogin(email: string, password: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();

    }
}