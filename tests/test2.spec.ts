import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';


test('my second', async ({ page }) => {
    //  test.skip(!!process.env.CI, 'Test file is skipped in CI due to Cloudflare protection.');

    await page.goto('/');
    const homePage = new HomePage(page);

    await homePage.combinationPliersProduct.click();
    await expect(page).toHaveURL(/\/01K38KHCXMQT0VKHA6VBWHEWZ1/);
    await expect(homePage.combinationPliersPrice).toContainText('14.15');
    await expect(homePage.addToFavourites).toBeVisible();
    await expect(homePage.addToCart).toBeVisible();
});