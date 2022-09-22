import { expect, test } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running "${testInfo.title}" test`);
    await page.goto('http://localhost:3000/');
  });

  test('Login success', async ({ page }) => {
    // Click button:has-text("Login")
    await page.locator('button:has-text("Login")').click();
    await expect(page).toHaveURL('http://localhost:3000/login');

    await expect(page.locator('[data-testid="login-form"]')).toBeVisible();

    // Click [data-testid="login-email"]
    await page.locator('[data-testid="login-email"]').click();

    // Fill [data-testid="login-email"]
    await page.locator('[data-testid="login-email"]').fill('zrna@gmail.com');

    // Click [data-testid="login-password"]
    await page.locator('[data-testid="login-password"]').click();

    // Fill [data-testid="login-password"]
    await page.locator('[data-testid="login-password"]').fill('abc123');

    // Click [data-testid="login-confirm"]
    await page.locator('[data-testid="login-confirm"]').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');

    // Click text=Dashboard
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

    // Click [placeholder="Search review\.\.\."]
    await expect(page.locator('[placeholder="Search review\\.\\.\\."]')).toBeEmpty();
  });

  test('Login failed', async ({ page }) => {
    // Click button:has-text("Login")
    await page.locator('button:has-text("Login")').click();
    await expect(page).toHaveURL('http://localhost:3000/login');

    // Click [data-testid="login-email"]
    await page.locator('[data-testid="login-email"]').click();

    // Fill [data-testid="login-email"]
    await page.locator('[data-testid="login-email"]').fill('dummy@email.com');

    // Press Tab
    await page.locator('[data-testid="login-email"]').press('Tab');

    // Fill [data-testid="login-password"]
    await page.locator('[data-testid="login-password"]').fill('dummy123');

    // Click [data-testid="login-confirm"]
    await page.locator('[data-testid="login-confirm"]').click();

    // Click text=User does not exist
    await expect(page.locator('text=User does not exist')).toHaveText('User does not exist');
  });
});
