import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('verifying product data', async ({ page }) => {
    await page.goto('/');
    const homePage = new HomePage(page);

    await homePage.combinationPliersProduct.click();
    await expect(page).toHaveURL(/\/product\//);
    await expect(homePage.combinationPliersPrice).toContainText('14.15');
    await expect(homePage.addToFavourites).toBeVisible();
    await expect(homePage.addToCart).toBeVisible();
});
