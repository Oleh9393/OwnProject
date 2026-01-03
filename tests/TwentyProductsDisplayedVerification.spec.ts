import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('20 products are displayed on the page (mocked API)', async ({ page }) => {
    const mockProducts = {
        current_page: 1,
        data: Array.from({ length: 20 }, () => ({
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price({ min: 5, max: 100 })),
            is_location_offer: faker.datatype.boolean(),
            is_rental: false,
            co2_rating: faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E']),
            in_stock: true,
            is_eco_friendly: faker.datatype.boolean(),
            product_image: {
                id: faker.string.uuid(),
                by_name: faker.person.fullName(),
                by_url: faker.internet.url(),
                source_name: 'Unsplash',
                source_url: faker.internet.url(),
                file_name: 'pliers01.avif',
                title: faker.commerce.productName(),
            },
            category: {
                id: faker.string.uuid(),
                name: faker.commerce.department(),
                slug: faker.helpers.slugify(faker.commerce.department()).toLowerCase(),
            },
            brand: {
                id: faker.string.uuid(),
                name: faker.company.name(),
            },
        })),
        from: 1,
        last_page: 1,
        per_page: 20,
        to: 20,
        total: 20,
    };

    await page.route('**/products*', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: mockProducts,
        });
    });


    await page.goto('/');

    const productCards = page.locator('.card');
    await expect(productCards).toHaveCount(20);

    const firstProductName = mockProducts.data[0].name;
    await expect(page.getByText(firstProductName)).toBeVisible();
});
