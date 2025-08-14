import { test, expect } from '@playwright/test';
test('my first test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.locator('id=email').fill('customer@practicesoftwaretesting.com');
  await page.locator('id=password').fill('welcome01');
  await page.locator('data-test=login-submit').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  const titleText = await page.locator('data-test=page-title').innerText();
  expect(titleText).toBe('My account');
  const userMenuText = await page.locator('data-test=nav-menu').innerText();
  expect(userMenuText).toContain('Jane Doe');
});