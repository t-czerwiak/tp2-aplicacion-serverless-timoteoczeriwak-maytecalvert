# CALIDAD.md

## Estrategia general

La estrategia de calidad de este proyecto se basa en tres pilares: validar antes de mergear, automatizar todo lo que sea repetible y documentar las decisiones.

Antes de que cualquier cambio llegue a `main`, el pipeline de CI verifica que el código pasa el lint, los tests unitarios, el build y los tests E2E. Esto garantiza que producción nunca recibe código roto, sin depender de que alguien se acuerde de correr los tests manualmente.

Elegimos este enfoque porque la mayor fuente de bugs en el TP2 fue la inconsistencia entre lo que funcionaba localmente y lo que quedaba en el repo. Un pipeline automatizado elimina esa variable.

---

## Herramientas seleccionadas

**Vitest** para tests unitarios. Lo elegimos sobre Jest porque el proyecto usa módulos ES nativos (`type: "module"` en package.json) y Vitest los soporta sin configuración extra. Jest requiere transformaciones adicionales para ESM que agregan complejidad innecesaria.

**Playwright** para tests E2E. Lo evaluamos contra Cypress. Cypress tiene una UI más amigable, pero Playwright es más liviano, corre en CI sin configuración especial y soporta múltiples navegadores. Para un proyecto de este tamaño Playwright es más que suficiente.

**ESLint** para lint. Es el estándar del ecosistema JavaScript. No evaluamos alternativas porque no tiene competencia real para JS/Astro.

**GitHub Actions** para CI/CD. Está integrado en el repositorio sin costo adicional y tiene acceso nativo a los secrets del repo. Evaluamos usar Vercel CI directamente pero no ofrece la granularidad de pasos que necesitábamos (lint → test → build → deploy separados).

**Vercel** para deploy. Tiene integración nativa con Astro y deploy instantáneo. No evaluamos alternativas porque ya lo usábamos en el TP2.

---

## Tests desarrollados

### Tests unitarios (`src/tests/utils.test.js`)

Las funciones de `src/lib/utils.js` concentran la lógica de negocio pura que no depende de Supabase ni del DOM, lo que las hace ideales para tests unitarios rápidos y deterministas.

| Test | Qué valida |
|---|---|
| `isGmailAddress` — email válido | Retorna `true` para `usuario@gmail.com` |
| `isGmailAddress` — otro dominio | Retorna `false` para `@hotmail.com` |
| `isGmailAddress` — dominio similar | Retorna `false` para `@gmail.com.ar` |
| `isGmailAddress` — string vacío | Retorna `false` |
| `isGmailAddress` — null/undefined | No explota, retorna `false` |
| `isGmailAddress` — case insensitive | `@GMAIL.COM` también es válido |
| `validateComment` — válido | `{ valid: true, error: null }` |
| `validateComment` — vacío | Rechaza y devuelve mensaje de error |
| `validateComment` — solo espacios | Los espacios no cuentan como contenido |
| `validateComment` — supera límite | Rechaza y menciona el límite en el error |
| `validateComment` — exactamente en el límite | 500 caracteres es aceptado |
| `validateComment` — límite personalizado | El parámetro `maxLength` funciona |
| `validateComment` — null | No explota, devuelve `valid: false` |
| `formatDate` — fecha ISO | Devuelve fecha en español con mes en letras |
| `formatDate` — null | Devuelve string vacío |
| `formatDate` — fecha inválida | Devuelve string vacío sin tirar error |
| `formatDate` — string vacío | Devuelve string vacío |

### Tests unitarios — validaciones de frontend (`src/tests/validation.test.js`)

Las funciones de `src/lib/validation.js` cubren la validación de inputs de formularios (registro, perfil, comentarios), separadas de la lógica de `utils.js` porque corresponden específicamente a reglas de los formularios del front, no a lógica de negocio general.

| Test | Qué valida |
|---|---|
| `validateRegisterEmail` — email Gmail válido | Acepta `usuario@gmail.com` |
| `validateRegisterEmail` — sin @ | Rechaza formato inválido |
| `validateRegisterEmail` — no Gmail | Rechaza y menciona "Gmail" en el error |
| `validateRegisterEmail` — vacío/null | No explota, rechaza |
| `validatePassword` — longitud válida | Acepta contraseñas de 6+ caracteres |
| `validatePassword` — muy corta | Rechaza y menciona el mínimo |
| `validatePassword` — mínimo personalizado | El parámetro funciona |
| `validateUsername` — válido | Acepta letras, números y guion bajo |
| `validateUsername` — muy corto/largo | Rechaza fuera del rango 3-20 |
| `validateUsername` — caracteres especiales | Rechaza símbolos no permitidos |
| `validateCommentInput` — válido | Acepta texto normal |
| `validateCommentInput` — vacío/espacios | Rechaza contenido sin texto real |
| `validateCommentInput` — supera límite | Rechaza y menciona el límite de 500 |

### Tests E2E (`e2e/auth.spec.js`)

| Test | Qué valida |
|---|---|
| Favoritos sin sesión | Usuario no autenticado ve aviso de login en `/favorites` |
| Login exitoso | Credenciales válidas redirigen al index |
| Login inválido | Credenciales incorrectas muestran `#error-msg` no vacío |
| Registro con no-Gmail | Formulario muestra error mencionando "Gmail" |
| Home carga cuerpos celestes | Aparece al menos una `.image-card` |
| Click en imagen | Navega a `/image/:id` |

---

## Casos de uso críticos

Priorizamos proteger estos flujos:

**Validación de Gmail y formato en el registro (frontend + backend).** El frontend valida el formato antes de llamar a Supabase, evitando una llamada innecesaria a la API si el dato ya es inválido localmente. La regla de negocio en sí (solo Gmail) está duplicada intencionalmente en frontend y a nivel de lógica de negocio para dar feedback inmediato al usuario sin depender de la latencia de red.

**Validación de Gmail en registro.** Si esta validación falla, usuarios con emails de otros dominios pueden registrarse y el sistema queda inconsistente. Es una regla de negocio explícita del TP2.

**Login con credenciales inválidas.** El error tiene que mostrarse en pantalla, no silenciarse. Un fallo aquí deja al usuario confundido sin feedback.

**Acceso a favoritos sin sesión.** El contenido protegido tiene que ser inaccesible sin autenticación. Es el flujo de seguridad más básico de la app.

**Carga de la home.** Si los cuerpos celestes no se renderizan, la app está efectivamente caída. Es el primer punto de contacto del usuario.

No priorizamos testear las funciones de Supabase directamente (`addFavorite`, `getComments`, etc.) porque son wrappers delgados sobre la librería. Testearlos requeriría mockear Supabase, lo que agrega complejidad sin aportar valor real: lo que podría fallar ahí es la conexión a la DB, que es responsabilidad de Supabase, no nuestra.

---

## Pipeline de CI/CD

El workflow corre en cada push y PR a `main` y `develop`. Los pasos son:

```
lint → test (unitarios) → build → e2e → deploy
```

**Lint** primero porque es el paso más rápido. Si hay un error de sintaxis o una variable sin usar, no tiene sentido gastar tiempo en los tests.

**Tests unitarios** antes del build porque son rápidos y deterministas. Si la lógica de negocio está rota, el build no importa.

**Build** antes de E2E porque los tests E2E corren contra la app levantada. Si el build falla, los E2E no pueden correr.

**E2E** antes del deploy por razones obvias: no se despliega algo que no pasa las pruebas de integración.

**Deploy solo en push a `main`**, nunca en PRs. Esto evita deployar código que todavía está en revisión. Si alguno de los pasos anteriores falla, el job de deploy no se ejecuta (condición `needs: [lint, test, build, e2e]`).

Las variables de entorno de Supabase y Vercel se pasan como secrets del repositorio (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `VERCEL_TOKEN`). Nunca están hardcodeadas en el código.

---

## Limitaciones y deuda técnica

**No testeamos las funciones de `api.js`.** Requeriría mockear el cliente de Supabase. Es factible pero agrega una capa de complejidad (vi-mock, interceptores) que no se justifica para el alcance del TP. Con más tiempo lo haríamos.

**Los tests E2E dependen de una cuenta de test real en Supabase.** Si esa cuenta se borra o la contraseña cambia, los tests E2E de login van a fallar. Lo ideal sería tener un entorno de test separado con datos sembrados (`seed`), pero requiere configuración de Supabase que está fuera del alcance.

**El lint solo cubre archivos `.js`.** Los archivos `.astro` tienen bloques de script que no pasan por ESLint. El plugin `eslint-plugin-astro` tiene soporte parcial pero la configuración para frontmatter TypeScript es inestable. Lo aceptamos como riesgo conocido.

**Sin cobertura de tests en componentes UI.** Los `.astro` no son testeables con Vitest sin un DOM completo. Playwright cubre el comportamiento visible pero no la lógica interna de los componentes. Testing Library para Astro existe pero está en beta.
