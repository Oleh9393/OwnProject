import { test as base } from '@playwright/test';
import { App } from '../pages/app';
import { usersCreds } from '../data/creds';
import { getAuthToken, getLoggedInPage } from '../utils/loginUtil';
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
        const token = await getAuthToken(
            usersCreds.customer.email,
            usersCreds.customer.password
        );

        const page = await getLoggedInPage(browser, token);
        const app = new App(page);

        await use(app);
        await page.context().close();
    },
});

export { expect } from '@playwright/test';
