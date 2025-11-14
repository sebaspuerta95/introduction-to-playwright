import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/.*intro/);
});

test('check Java page', async ({ page }) => {
  // 1. Open the page
  await page.goto('https://playwright.dev/'); 

  // 2. Click at Get started
  await page.getByRole('link', { name : 'Get Started' }).click();

  // 3. Mouse hover the language dropdown
  await page.getByRole('button', { name : 'Node.js' }).hover();

  // 4. Click at Java
  await page.getByRole('navigation', { name : 'Main' }).getByText('Java').click();

  // 5. Check the URL
  await expect(page).toHaveURL('https://playwright.dev/java/docs/intro') ; 

  // 6. Check the text "Installing Playwright" is not being displayed
  await expect(page.getByRole('heading', { name :'Installing Playwright' })).not.toBeVisible();
  
  // 7. Check the text below is displayed: “Playwright is distributed as a set of Maven modules”.
  const javaDocumentation = `Playwright is distributed as a set of Maven modules.`;
  await expect(page.getByText(javaDocumentation)).toBeVisible();

});
