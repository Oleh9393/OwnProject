import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
test('my first test', async ({ page }) => {
  test.skip(!!process.env.CI, 'Test file is skipped in CI due to Cloudflare protection.');

  const loginPage = new LoginPage(page);
  await page.goto('/auth/login');
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
  await expect(page).toHaveURL(/\/account/);

  const accountPage = new AccountPage(page);
  await expect(accountPage.pageTitle).toHaveText('My account');
  const userMenuText = await accountPage.navigationMenu.innerText()
  expect(userMenuText).toContain('Jane Doe');
});
