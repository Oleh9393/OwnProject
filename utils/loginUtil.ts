import { request, Browser, Page } from '@playwright/test';


export async function makeLoginRequest(email: string, password: string) {
    const requestContext = await request.newContext({
        baseURL: 'https://api.practicesoftwaretesting.com',
    });

    const loginResponse = await requestContext.post('/users/login', {
        data: {
            email,
            password,
        },
    });

    return { loginResponse, requestContext }; 
}

export async function getAuthToken(email: string, password: string): Promise<string> {
    const { loginResponse, requestContext } = await makeLoginRequest(email, password);
    const { access_token } = await loginResponse.json() as { access_token: string };
    
    await requestContext.dispose();
    
    return access_token;
}

export async function getLoggedInPage(browser: Browser, token: string): Promise<Page> {
    const context = await browser.newContext({
        storageState: {
            cookies: [],
            origins: [
                {
                    origin: 'https://api.practicesoftwaretesting.com',
                    localStorage: [
                        { name: 'auth-token', value: token },
                    ],
                },
            ],
        },
    });

    const page = await context.newPage();
    await page.goto('/');
    
    return page;
}
