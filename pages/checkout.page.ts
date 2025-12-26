import { Locator, Page } from "@playwright/test"

export class CheckoutPage {
    page: Page;
    productQuantity: Locator;
    productTitle: Locator;
    proceedToCheckout: Locator;
    productPrice: Locator;
    cartTotal: Locator;
    loginMessage: Locator;
    proceedToCheckout2: Locator;
    proceedToCheckout3: Locator;
    paymentMethod: Locator;
    paymentSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productQuantity = this.page.getByTestId("product-quantity");
        this.productTitle = this.page.getByTestId("product-title");
        this.proceedToCheckout = this.page.getByTestId("proceed-1");
        this.productPrice = this.page.getByTestId("product-price")
        this.cartTotal = this.page.getByTestId("cart-total");
        this.loginMessage = page.getByText('you are already logged in');
        this.proceedToCheckout2 = this.page.getByTestId("proceed-2");
        this.proceedToCheckout3 = this.page.getByTestId("proceed-3");
        this.paymentMethod = this.page.getByTestId("payment-method");
        this.paymentSuccessMessage = this.page.getByTestId("payment-success-message");

    }
}