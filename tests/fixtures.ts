import { test as base } from '@playwright/test';
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
    loggedInApp: async ({ app }, use) => {
        await app.page.goto('/auth/login');
        await app.loginPage.performLogin(usersCreds.customer.email, usersCreds.customer.password);
        await app.page.waitForURL(/\/account/);
        await use(app);
    },

});

export { expect } from '@playwright/test';