import { test, expect } from '@playwright/test';
test('my first test', async ({ page }) => {
  
  test.skip(!!process.env.CI, 'Test file is skipped in CI due to Cloudflare protection.');
  await page.goto('/auth/login');
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  await expect(page).toHaveURL(/\/account/);
  const titleText = await page.getByTestId('page-title').innerText();
  expect(titleText).toBe('My account');
  const userMenuText = await page.getByTestId('nav-menu').innerText();
  expect(userMenuText).toContain('Jane Doe');
});