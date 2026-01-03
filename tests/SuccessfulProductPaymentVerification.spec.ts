import { test, expect } from './fixtures';
import { BILLING_ADDRESS, TEST_CARD } from './checkout.data';


test('Successful product payment verification', async ({ loggedInApp }) => {

// Skip test in CI environment due to Cloudflare protection
    test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');



    const { accountPage, homePage, productDetails } = loggedInApp;
    await accountPage.homeButton.click();
    await homePage.verifyProductIsVisible();
    const price = await homePage.getProductPrice();
    const productName = await homePage.getProductName();

    await homePage.openFirstProduct();
    await expect(loggedInApp.page).toHaveURL(/\/product\//);
    await productDetails.addToCart.click();
    await expect(loggedInApp.alert.container).toBeVisible();
    await loggedInApp.productDetails.navCart.click();

    await expect(loggedInApp.checkout.productTitle).toHaveText(productName);
    await expect(loggedInApp.checkout.productPrice).toHaveText(price);
    await expect(loggedInApp.checkout.cartTotal).toContainText(price);
    await loggedInApp.checkout.proceedToCheckout.click();
    await expect(loggedInApp.checkout.loginMessage).toBeVisible();
    await loggedInApp.checkout.proceedToCheckout2.click();

    await loggedInApp.checkout.street.fill(BILLING_ADDRESS.street);
    await loggedInApp.checkout.city.fill(BILLING_ADDRESS.city);
    await loggedInApp.checkout.state.fill(BILLING_ADDRESS.state);
    await loggedInApp.checkout.postalCode.fill(BILLING_ADDRESS.postalCode);
    await loggedInApp.checkout.proceedToCheckout3.click();

    await loggedInApp.checkout.paymentMethod.selectOption('credit-card');
    await loggedInApp.checkout.creditcardnumber.fill(TEST_CARD.number);
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    const expDate = `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    await loggedInApp.checkout.expirationDate.fill(expDate);
    await loggedInApp.checkout.cvv.fill(TEST_CARD.cvv);
    await loggedInApp.checkout.cardHolderName.fill(TEST_CARD.holderName);
    await loggedInApp.checkout.finishButton.click();
    await expect(loggedInApp.checkout.paymentSuccessMessage).toBeVisible();
});
