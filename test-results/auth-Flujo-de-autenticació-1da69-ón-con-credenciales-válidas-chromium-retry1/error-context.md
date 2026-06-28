# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> Flujo de autenticación >> usuario puede iniciar sesión con credenciales válidas
- Location: e2e\auth.spec.js:13:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:4321/"
Received: "http://localhost:4321/login"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × unexpected value "http://localhost:4321/login"

```

```yaml
- banner:
  - link "✦ NASA Explorer":
    - /url: /
  - navigation:
    - link "Inicio":
      - /url: /
    - link "Favoritos":
      - /url: /favorites
    - link "Ingresar":
      - /url: /login
- main:
  - heading "Ingresar" [level=1]
  - paragraph: Accedé para guardar favoritos y comentar imágenes.
  - textbox "Email": test@gmail.com
  - textbox "Contraseña": testpassword123
  - paragraph: Failed to fetch
  - button "Ingresar"
  - link "Crear una cuenta":
    - /url: /register
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const TEST_EMAIL = process.env.E2E_TEST_EMAIL ?? "test@gmail.com";
  4  | const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD ?? "testpassword123";
  5  | 
  6  | test.describe("Flujo de autenticación", () => {
  7  |   test("usuario no autenticado es redirigido al login al intentar ver favoritos", async ({ page }) => {
  8  |     await page.goto("/favorites");
  9  |     // La página de favoritos muestra mensaje de no autenticado (no redirige, muestra aviso)
  10 |     await expect(page.locator("text=iniciar sesión")).toBeVisible();
  11 |   });
  12 | 
  13 |   test("usuario puede iniciar sesión con credenciales válidas", async ({ page }) => {
  14 |     await page.goto("/login");
  15 | 
  16 |     await page.locator('input[type="email"]').fill(TEST_EMAIL);
  17 |     await page.locator('input[type="password"]').fill(TEST_PASSWORD);
  18 |     await page.locator('button[type="submit"]').click();
  19 | 
  20 |     // Después del login exitoso vuelve al index
> 21 |     await expect(page).toHaveURL("/");
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  22 |   });
  23 | 
  24 |   test("login con credenciales inválidas muestra error", async ({ page }) => {
  25 |     await page.goto("/login");
  26 | 
  27 |     await page.locator('input[type="email"]').fill("noexiste@gmail.com");
  28 |     await page.locator('input[type="password"]').fill("clavemal");
  29 |     await page.locator('button[type="submit"]').click();
  30 | 
  31 |     await expect(page.locator("#error-msg")).toBeVisible();
  32 |     await expect(page.locator("#error-msg")).not.toBeEmpty();
  33 |   });
  34 | 
  35 |   test("registro con email que no es Gmail muestra error", async ({ page }) => {
  36 |     await page.goto("/register");
  37 | 
  38 |     await page.locator('input[type="email"]').fill("usuario@hotmail.com");
  39 |     await page.locator('input[type="password"]').fill("password123");
  40 |     await page.locator('button[type="submit"]').click();
  41 | 
  42 |     await expect(page.locator("#error-msg")).toContainText("Gmail");
  43 |   });
  44 | });
  45 | 
  46 | test.describe("Flujo principal de la app", () => {
  47 |   test("la home muestra cuerpos celestes", async ({ page }) => {
  48 |     await page.goto("/");
  49 |     // Espera que haya al menos una ImageCard
  50 |     await expect(page.locator(".image-card").first()).toBeVisible({ timeout: 8000 });
  51 |   });
  52 | 
  53 |   test("hacer click en una imagen lleva a la página de detalle", async ({ page }) => {
  54 |     await page.goto("/");
  55 |     await page.locator(".image-card a").first().click();
  56 |     await expect(page).toHaveURL(/\/image\/.+/);
  57 |   });
  58 | });
  59 | 
```