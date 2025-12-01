
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.use({ storageState: 'auth/session.json' });

enum Category {
    HAND_TOOLS = 'Hand Tools',
    POWER_TOOLS = 'Power Tools',
    OTHER = 'Other'
}

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('/');
    await homePage.sanderLabel.click();
    await expect(homePage.filterCompleted).toBeVisible();
    const productNames = await homePage.productName.allInnerTexts();
    for (const name of productNames) {
        expect(name.toLowerCase()).toContain('sander');
    }
});
