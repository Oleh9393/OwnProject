import { test, expect } from './fixtures';

test('login as a customer', async ({ loggedInApp }) => {

  await expect(loggedInApp.page).toHaveURL(/\/account/);
  await expect(loggedInApp.accountPage.pageTitle).toHaveText('My account');
  await expect(loggedInApp.accountPage.navigationMenu).toContainText('Jane Doe');
});
