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
        await expect(homePage.sortingCompleted).toBeVisible();
        const productNames = await homePage.productName.allInnerTexts();
        const sortedNames = [...productNames];
        if (product.sortOrder === 'asc') {
            sortedNames.sort((a, b) => a.localeCompare(b)); 
        } else {
            sortedNames.sort((a, b) => b.localeCompare(a)); 
        }
        expect(productNames).toEqual(sortedNames);
    });
}
