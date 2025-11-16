import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
test.use({ storageState: 'auth/session.json' });


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

    test(testCase.testName, async ({ page }) => {

        await page.goto('/');
        const homePage = new HomePage(page);
        await homePage.sortingButton.selectOption({ label: testCase.sortOption });
        await page.waitForTimeout(2000);
        const priceStrings = await homePage.productPrice.allInnerTexts();
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
