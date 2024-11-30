import { test, expect } from '@playwright/test';

test('page loads', async ({ page }) => {
  await page.goto('/pages');
  await expect(page).toHaveTitle(/xmth/);
});

test('xmth script', async ({ page }) => {
  await page.goto('/pages');

  const msgPromise = page.waitForEvent('console');
  const msg = await msgPromise;
  expect(msg.text()).toBe("xmth loaded !");
});

test('load fragments on load', async ({ page }) => {
  await page.goto('/pages');

  const contacts = await page.waitForSelector('[data-testid="contacts"]');
  const h1 = await contacts.$('h1');
  expect(h1).not.toBeNull();

  let h1Text = await h1?.innerText();
  expect(h1Text).toBe("Contacts");
});

;

