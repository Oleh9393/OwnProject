import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { usersCreds } from '../data/creds';

test('login as a customer', async ({ page }) => {
  test.skip(!!process.env.CI, 'Test file is skipped in CI due to Cloudflare protection.');

  const loginPage = new LoginPage(page);
  await page.goto('/auth/login');
  await loginPage.performLogin(usersCreds.customer.email, usersCreds.customer.password);
  await expect(page).toHaveURL(/\/account/);

  const accountPage = new AccountPage(page);
  await expect(accountPage.pageTitle).toHaveText('My account');
  await expect(accountPage.navigationMenu).toContainText('Jane Doe');
});
