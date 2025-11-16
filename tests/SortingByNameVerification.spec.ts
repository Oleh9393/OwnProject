import { test, expect } from '@playwright/test';
import { HomePage} from '../pages/home.page';
test.use({ storageState: 'auth/session.json' });


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
    test(product.testName, async ({ page }) => {
       
        await page.goto('/');
        const homePage = new HomePage(page);
        await homePage.sortingButton.selectOption({ label: product.sortOption });
        await page.waitForTimeout(2000);
        const productNames = await homePage.productName.allInnerTexts();
        const sortedNames = [...productNames];
        if (product.sortOrder === 'asc') {
            sortedNames.sort((a, b) => a.localeCompare(b)); // A to Z
        } else {
            sortedNames.sort((a, b) => b.localeCompare(a)); // Z to A
        }
        expect(productNames).toEqual(sortedNames);
    });
}
