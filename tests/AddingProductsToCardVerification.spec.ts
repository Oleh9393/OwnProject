import { test, expect } from './fixtures';



test('adding products to the card', async ({ app }) => {


    // Skip test in CI environment due to Cloudflare protection
    test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

    await app.page.goto('/');
    await app.homePage.getProductByText('Slip Joint Pliers').click();
    await expect(app.page).toHaveURL(/\/product\//);

    const priceText = await app.productDetails.unitPrice.innerText();
    expect(parseFloat(priceText)).toBeGreaterThan(0);
    await app.productDetails.addToCart.click();
    await expect(app.alert.container).toBeVisible();
    await expect(app.alert.container).toHaveText("Product added to shopping cart.");
    await expect(app.alert.container).toBeHidden({ timeout: 8000 });
    await expect(app.productDetails.quantityIcon).toHaveText('1');
    await app.productDetails.navCart.click();
    await expect(app.page).toHaveURL(/\/checkout/);
    await expect(app.checkout.productQuantity).toHaveValue('1');
    await expect(app.checkout.productTitle).toContainText('Slip Joint Pliers');
    await expect(app.checkout.proceedToCheckout).toBeVisible();
});
