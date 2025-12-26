import { Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { HomePage } from './home.page';
import { AccountPage } from './account.page';
import { CheckoutPage } from './checkout.page';
import { ProductDetailsPage } from './product-details.page';

export class App {
    page: Page;
    loginPage: LoginPage;
    homePage: HomePage;
    accountPage: AccountPage;
    checkout: CheckoutPage;
    productDetails: ProductDetailsPage;

    constructor(page: Page) {
        this.page = page;


        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.accountPage = new AccountPage(page)
        this.checkout = new CheckoutPage(page)
        this.productDetails = new ProductDetailsPage(page)
    }
}