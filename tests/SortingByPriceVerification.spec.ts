import { test, expect } from './fixtures';


const priceSortTestCases = [
    {
        testName: 'Verify sorting by price (High - Low)',
        sortOption: 'Price (High - Low)',
        sortOrder: 'desc',
    },
    {
        testName: 'Verify sorting by price (Low - High)',
        sortOption: 'Price (Low - High)',
        sortOrder: 'asc',
    },
];

for (const testCase of priceSortTestCases) {
    test(testCase.testName, async ({ app }) => {

        // Skip test in CI environment due to Cloudflare protection
        test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

        await app.page.goto('/');
        await app.homePage.sortingButton.selectOption({ label: testCase.sortOption });
        await expect(app.homePage.sortingCompleted).toBeVisible();
        const priceStrings = await app.homePage.productPrice.allInnerTexts();
        const prices = priceStrings.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...prices];
        if (testCase.sortOrder === 'asc') {
            sortedPrices.sort((a, b) => a - b);
        } else {
            sortedPrices.sort((a, b) => b - a);
        }
        expect(prices).toEqual(sortedPrices);
    });
}
