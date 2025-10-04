import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetailsPage } from '../pages/product-details.page';

test('verifying product data', async ({ page }) => {
    await page.goto('/');
    const homePage = new HomePage(page);
    await homePage.combinationPliersProduct.click();

    const productDetails = new ProductDetailsPage(page);
    await expect(page).toHaveURL(/\/product\//);
    await expect(productDetails.unitPrice).toContainText('14.15');
    await expect(productDetails.addToFavourites).toBeVisible();
    await expect(productDetails.addToCart).toBeVisible();
});
