import { test, expect } from '@playwright/test';

test.describe('Fluxo de Autenticação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('deve exibir erros de validação ao enviar formulário vazio', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('text=O nome deve ter pelo menos 3 caracteres')).toBeVisible();
    await expect(page.locator('text=E-mail inválido')).toBeVisible();
    await expect(page.locator('text=A senha deve ter pelo menos 6 caracteres')).toBeVisible();
  });

  test('deve exibir erro para e-mail inválido', async ({ page }) => {
    await page.fill('input[name="fullName"]', 'Teste Usuário');
    await page.fill('input[name="email"]', 'email-invalido');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=E-mail inválido')).toBeVisible();
  });

  test('deve exibir erro para senha curta', async ({ page }) => {
    await page.fill('input[name="fullName"]', 'Teste Usuário');
    await page.fill('input[name="email"]', 'teste@exemplo.com');
    await page.fill('input[name="password"]', '123');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=A senha deve ter pelo menos 6 caracteres')).toBeVisible();
  });

  test('deve navegar para a página de login', async ({ page }) => {
    await page.click('text=Entrar');
    await expect(page).toHaveURL(/\/login/);
  });
});
