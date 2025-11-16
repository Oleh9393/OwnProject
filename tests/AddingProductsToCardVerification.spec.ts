import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import {CheckoutPage} from '../pages/checkout.page';
test.use({ storageState: 'auth/session.json' });

test('adding products to the card', async ({ page }) => {

    await page.goto('/');
    const homePage = new HomePage(page);
    await homePage.slipJointPliersProduct.click();

    const productDetails = new ProductDetailsPage(page);
    await expect(page).toHaveURL(/\/product\//);
    await expect(productDetails.unitPrice).toContainText('9.17');
    await productDetails.addToCart.click();

    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText("Product added to shopping cart.");
    await expect(alert).toBeHidden({ timeout: 8000 });
    await expect(productDetails.quantityIcon).toHaveText('1');
    await productDetails.navCart.click();

    const checkout = new CheckoutPage(page);
    await expect(page).toHaveURL(/\/checkout/);
    await expect(checkout.productQuantity).toHaveValue('1');
    await expect(checkout.productTitle).toContainText('Slip Joint Pliers');
    await expect(checkout.proceedToCheckout).toBeVisible;
});
