import { test, expect } from './fixtures';



test('login as a customer', async ({ loggedInApp }) => {

  // Skip test in CI environment due to Cloudflare protection
  test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

  await expect(loggedInApp.page).toHaveURL(/\/account/);
  await expect(loggedInApp.accountPage.pageTitle).toHaveText('My account');
  await expect(loggedInApp.accountPage.navigationMenu).toContainText('Jane Doe');
});
