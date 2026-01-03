import { Locator, Page } from '@playwright/test';

export class Alert {
  readonly container: Locator;

  constructor(page: Page) {
    this.container = page.getByRole('alert');
  }

  async getText(): Promise<string> {
    return (await this.container.textContent()) ?? '';
  }

  async isVisible(): Promise<boolean> {
    return this.container.isVisible();
  }
}
