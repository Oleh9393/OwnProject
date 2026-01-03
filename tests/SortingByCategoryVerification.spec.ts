
import { test, expect } from './fixtures';


enum Category {
    HAND_TOOLS = 'Hand Tools',
    POWER_TOOLS = 'Power Tools',
    OTHER = 'Other'
}

test('Verify user can filter products by category', async ({ app }) => {
   
    // Skip test in CI environment due to Cloudflare protection
    test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

    await app.page.goto('/');
    await app.homePage.sanderLabel.click();
    await expect(app.homePage.filterCompleted).toBeVisible();
    const productNames = await app.homePage.productName.allInnerTexts();
    for (const name of productNames) {
        expect(name.toLowerCase()).toContain('sander');
    }
});
