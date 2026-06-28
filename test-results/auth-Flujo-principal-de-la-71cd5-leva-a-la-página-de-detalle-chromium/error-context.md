# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> Flujo principal de la app >> hacer click en una imagen lleva a la página de detalle
- Location: e2e\auth.spec.js:53:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.image-card a').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - link "✦ NASA Explorer" [ref=e3] [cursor=pointer]:
      - /url: /
      - generic [ref=e4]: ✦
      - text: NASA Explorer
    - navigation [ref=e5]:
      - link "Inicio" [ref=e6] [cursor=pointer]:
        - /url: /
      - link "Favoritos" [ref=e7] [cursor=pointer]:
        - /url: /favorites
      - link "Ingresar" [ref=e8] [cursor=pointer]:
        - /url: /login
  - main [ref=e9]:
    - generic [ref=e10]:
      - heading "Explorá el universo" [level=1] [ref=e11]
      - paragraph [ref=e12]: Descubrí imágenes del espacio, guardá tus favoritas y compartí comentarios.
  - generic [ref=e15]:
    - button "Menu" [ref=e16]:
      - img [ref=e18]
      - generic: Menu
    - button "Inspect" [ref=e22]:
      - img [ref=e24]
      - generic: Inspect
    - button "Audit" [ref=e26]:
      - img [ref=e28]
      - generic: Audit
    - button "Settings" [ref=e31]:
      - img [ref=e33]
      - generic: Settings
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
  21 |     await expect(page).toHaveURL("/");
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
> 55 |     await page.locator(".image-card a").first().click();
     |                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  56 |     await expect(page).toHaveURL(/\/image\/.+/);
  57 |   });
  58 | });
  59 | 
```