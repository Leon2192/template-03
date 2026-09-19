import { test, expect } from '@playwright/test';

const banner = page => page.getByRole('region', { name: 'Instalar invitación' });

async function offerInstall(page, outcome = 'accepted') {
  await page.evaluate((choice) => {
    window.installPromptCalls = 0;
    const event = new Event('beforeinstallprompt', { cancelable: true });
    event.prompt = async () => { window.installPromptCalls += 1; };
    event.userChoice = Promise.resolve({ outcome: choice });
    window.dispatchEvent(event);
  }, outcome);
}

test('manifest, images and invitation work offline after first visit', async ({ page, context }) => {
  const failedAssets = [];
  page.on('response', response => {
    if (response.url().startsWith('http://localhost:4173') && response.status() >= 400) failedAssets.push(response.url());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Confirmación de asistencia', exact: true })).toBeVisible();
  const manifest = await page.evaluate(async () => {
    const response = await fetch(document.querySelector('link[rel="manifest"]').href);
    return response.json();
  });
  expect(manifest.display).toBe('standalone');
  expect(manifest.icons.map(icon => icon.sizes)).toEqual(['192x192', '512x512', '512x512']);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise(resolve => {
      navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
    });
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Confirmación de asistencia', exact: true })).toBeVisible();
  await page.getByText('Ver datos bancarios', { exact: true }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Ver datos bancarios' }).click();
  await expect(page.getByRole('heading', { name: 'Datos Bancarios', exact: true })).toBeVisible();
  const iconAvailable = await page.evaluate(async () => (await fetch('/icons/icon-192.png')).ok);
  expect(iconAvailable).toBe(true);
  expect(failedAssets).toEqual([]);
});

test('asks to install and opens the native prompt only on click', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Confirmación de asistencia', exact: true })).toBeVisible();
  await offerInstall(page);
  await expect(banner(page)).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: testInfo.outputPath('installation-prompt.png') });
  expect(await page.evaluate(() => window.installPromptCalls)).toBe(0);
  await banner(page).getByRole('button', { name: 'Instalar', exact: true }).click();
  expect(await page.evaluate(() => window.installPromptCalls)).toBe(1);
  await expect(banner(page)).toBeHidden();
});

test('dismissal is remembered and native cancellation also hides the invitation', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Confirmación de asistencia', exact: true })).toBeVisible();
  await offerInstall(page, 'dismissed');
  await expect(banner(page)).toBeVisible({ timeout: 10000 });
  await banner(page).getByRole('button', { name: 'Instalar', exact: true }).click();
  await expect(banner(page)).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('invitation-install-dismissed'))).toBeTruthy();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Confirmación de asistencia', exact: true })).toBeVisible();
  await offerInstall(page);
  await page.waitForTimeout(5500);
  await expect(banner(page)).toBeHidden();
});

test('Ahora no remembers dismissal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Confirmación de asistencia', exact: true })).toBeVisible();
  await offerInstall(page);
  await expect(banner(page)).toBeVisible({ timeout: 10000 });
  await banner(page).getByRole('button', { name: 'Ahora no' }).click();
  await expect(banner(page)).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('invitation-install-dismissed'))).toBeTruthy();
});

test('iPhone gets manual instructions', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'userAgent', { get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1' });
  });
  await page.goto('/');
  await expect(banner(page)).toBeVisible({ timeout: 10000 });
  await banner(page).getByRole('button', { name: 'Cómo instalar' }).click();
  await expect(page.getByRole('dialog')).toContainText('Agregar a pantalla de inicio');
  await page.getByRole('button', { name: 'Entendido' }).click();
  await expect(banner(page)).toBeHidden();
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('installed iPhone does not show the banner', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'standalone', { get: () => true });
    Object.defineProperty(navigator, 'userAgent', { get: () => 'iPhone' });
  });
  await page.goto('/');
  await page.waitForTimeout(5500);
  await expect(banner(page)).toBeHidden();
});

test('portada remains fully visible on mobile and desktop', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Ver información de la ceremonia' })).toBeVisible();
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => {
      const hero = [...document.querySelectorAll('div')].find(element => getComputedStyle(element).backgroundImage.includes('PORTADA2.webp'));
      return { fit: getComputedStyle(hero).backgroundSize, width: hero.getBoundingClientRect().width, viewport: window.innerWidth };
    });
    expect(layout.fit).toBe('contain');
    expect(layout.width).toBeLessThanOrEqual(layout.viewport);
    await page.screenshot({ path: testInfo.outputPath(`portada-${width}.png`) });
  }
  await page.getByRole('link', { name: 'Ver información de la ceremonia' }).click();
  await expect(page).toHaveURL(/#info$/);
  await expect(page.locator('#info')).toBeInViewport();
});
