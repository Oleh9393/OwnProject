import { test, expect } from '@playwright/test';
import { usersCreds } from '../data/creds';

const authFile = 'auth/session.json';

test('login via API', async ({ request, page }) => {

    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: usersCreds.customer.email,
            password: usersCreds.customer.password,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });


    expect(response.status()).toBe(200);

  
    const loginResponse = await response.json() as { access_token: string };
    const token = loginResponse.access_token;

    await page.goto('/');
    await page.evaluate((accessToken) => {
        localStorage.setItem('access_token', accessToken);
    }, token);


    await page.context().storageState({ path: authFile });
});
