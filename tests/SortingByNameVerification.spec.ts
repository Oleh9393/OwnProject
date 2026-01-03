import { test, expect } from './fixtures';

const sortProducts = [
    {
        testName: 'Verify sorting by name (A-Z)',
        sortOption: 'Name (A - Z)',
        sortOrder: 'asc',
    },
    {
        testName: 'Verify sorting by name (Z-A)',
        sortOption: 'Name (Z - A)',
        sortOrder: 'desc',
    },
];

for (const product of sortProducts) {
    test(product.testName, async ({ app }) => {

        // Skip test in CI environment due to Cloudflare protection
        test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

        await app.page.goto('/');
        await app.homePage.sortingButton.selectOption({ label: product.sortOption });
        await expect(app.homePage.sortingCompleted).toBeVisible();
        const productNames = await app.homePage.productName.allInnerTexts();
        const sortedNames = [...productNames];
        if (product.sortOrder === 'asc') {
            sortedNames.sort((a, b) => a.localeCompare(b));
        } else {
            sortedNames.sort((a, b) => b.localeCompare(a));
        }
        expect(productNames).toEqual(sortedNames);
    });
}
