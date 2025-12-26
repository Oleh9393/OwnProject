import { test, expect } from './fixtures';

test('verifying product data', async ({ app }) => {
    await app.page.goto('/');
   // const homePage = new HomePage();
    await app.homePage.getProductByText('Combination Pliers').click();
    //const productDetails = new ProductDetailsPage(page);
    await expect(app.page).toHaveURL(/\/product\//);
    await expect(app.productDetails.unitPrice).toContainText('14.15');
    await expect(app.productDetails.addToFavourites).toBeVisible();
    await expect(app.productDetails.addToCart).toBeVisible();
});
