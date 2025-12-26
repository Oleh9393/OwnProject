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
    await expect(loggedInApp.page.getByRole('alert')).toBeVisible();
    await loggedInApp.productDetails.navCart.click();

    await expect(loggedInApp.checkout.productTitle).toHaveText(productName);
    await expect(loggedInApp.checkout.productPrice).toHaveText(price);
    await expect(loggedInApp.checkout.cartTotal).toContainText(price);
    await loggedInApp.checkout.proceedToCheckout.click();
    await expect(loggedInApp.checkout.loginMessage).toBeVisible();
    await loggedInApp.checkout.proceedToCheckout2.click();

    await loggedInApp.page.getByTestId('street').fill(BILLING_ADDRESS.street);
    await loggedInApp.page.getByTestId('city').fill(BILLING_ADDRESS.city);
    await loggedInApp.page.getByTestId('state').fill(BILLING_ADDRESS.state);
    await loggedInApp.page.getByTestId('postal_code').fill(BILLING_ADDRESS.postalCode);
    await loggedInApp.checkout.proceedToCheckout3.click();

    await loggedInApp.checkout.paymentMethod.selectOption('credit-card');
    await loggedInApp.page.getByTestId('credit_card_number').fill(TEST_CARD.number);
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    const expDate = `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    await loggedInApp.page.getByTestId('expiration_date').fill(expDate);
    await loggedInApp.page.getByTestId('cvv').fill(TEST_CARD.cvv);
    await loggedInApp.page.getByTestId('card_holder_name').fill(TEST_CARD.holderName);
    await loggedInApp.page.getByTestId('finish').click();
    await expect(loggedInApp.checkout.paymentSuccessMessage).toBeVisible();
});
