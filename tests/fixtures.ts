import { test as base, request } from '@playwright/test';
import { App } from '../pages/app';
import { usersCreds } from '../data/creds';

type MyFixtures = {
    app: App;
    loggedInApp: App;
};

export const test = base.extend<MyFixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

    loggedInApp: async ({ browser }, use) => {

        const requestContext = await request.newContext({
            baseURL: 'https://api.practicesoftwaretesting.com',
        });


        const loginResponse = await requestContext.post('/users/login', {
            data: {
                email: usersCreds.customer.email,
                password: usersCreds.customer.password,
            },
        });

        const { access_token } = await loginResponse.json() as { access_token: string };


        const context = await browser.newContext({
            storageState: {
                cookies: [],
                origins: [
                    {
                        origin: 'https://practicesoftwaretesting.com',
                        localStorage: [
                            { name: 'auth-token', value: access_token },
                        ],
                    },
                ],
            },
        });

        const page = await context.newPage();
        const app = new App(page);
        await page.goto('.');


        await use(app);
        await context.close();
        await requestContext.dispose();
    },
});

export { expect } from '@playwright/test';
