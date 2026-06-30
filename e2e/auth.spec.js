import { test, expect } from "@playwright/test";

const TEST_EMAIL = process.env.E2E_TEST_EMAIL ?? "test@gmail.com";
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD ?? "testpassword123";

test.describe("Flujo de autenticación", () => {
  test("usuario no autenticado es redirigido al login al intentar ver favoritos", async ({ page }) => {
    await page.goto("/favorites");
    // La página de favoritos muestra mensaje de no autenticado (no redirige, muestra aviso)
    await expect(page.locator("text=iniciar sesión")).toBeVisible();
  });

  test("usuario puede iniciar sesión con credenciales válidas", async ({ page }) => {
    await page.goto("/login");

    await page.locator('input[type="email"]').fill(TEST_EMAIL);
    await page.locator('input[type="password"]').fill(TEST_PASSWORD);
    await page.locator('button[type="submit"]').click();

    // Después del login exitoso vuelve al index
    await expect(page).toHaveURL("/");
  });

  test("login con credenciales inválidas muestra error", async ({ page }) => {
    await page.goto("/login");

    await page.locator('input[type="email"]').fill("noexiste@gmail.com");
    await page.locator('input[type="password"]').fill("clavemal");
    await page.locator('button[type="submit"]').click();

    await expect(page.locator("#error-msg")).toBeVisible();
    await expect(page.locator("#error-msg")).not.toBeEmpty();
  });

  test("registro con email que no es Gmail muestra error", async ({ page }) => {
    await page.goto("/register");

    await page.locator('input[type="email"]').fill("usuario@hotmail.com");
    await page.locator('input[type="password"]').fill("password123");
    await page.locator('button[type="submit"]').click();

    await expect(page.locator("#error-msg")).toContainText("Gmail");
  });
});

test.describe("Flujo principal de la app", () => {
  test("la home muestra cuerpos celestes", async ({ page }) => {
    await page.goto("/");
    // Espera que haya al menos una ImageCard
    await expect(page.locator(".image-card").first()).toBeVisible({ timeout: 8000 });
  });

  test("hacer click en una imagen lleva a la página de detalle", async ({ page }) => {
    await page.goto("/");
    await page.locator(".image-card a").first().click();
    await expect(page).toHaveURL(/\/image\/.+/);
  });
});
