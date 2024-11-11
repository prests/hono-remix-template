import { expect } from '@playwright/test';

import { test } from 'playwright/playwright-base.fixture';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Remix Hono Template/);
});
