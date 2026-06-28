Ya dejé armado el front visual con componentes separados. La conexión con back debería hacerse principalmente desde `src/lib/api.js`, porque todos los componentes consumen funciones desde ahí.

Los puntos a conectar serían:

`getAllBodies()` para traer las imágenes/cuerpos de la home.
`addFavorite(bodyId)` y `removeFavorite(bodyId)` para favoritos.
`getUserFavorites()` para la pantalla de favoritos.
`getComments(bodyId)` para mostrar comentarios de cada imagen.
`addComment(bodyId, content)` para guardar comentarios.
`signIn(email, password)` para login.
`signUp(email, password)` para registro.
`signOut()` y `getUser()` para sesión.

La idea es reemplazar los mocks de `api.js` por llamadas reales a Supabase sin tocar los componentes visuales.


# NASA Space Explorer


Mayte Calvert
Curso: 5A


# Descripción

El proyecto consiste en una aplicación web sobre el espacio (NASA), donde se pueden ver imágenes de cuerpos celestes, interactuar con ellas y gestionar contenido del usuario.

El trabajo está dividido en dos partes:
- Frontend (visual)
- Backend (serverless)

En este caso se desarrolló la parte visual.



# Qué hice

- Diseño general de la página
- Cards para mostrar imágenes del espacio
- Estructura de componentes reutilizables
- Pantallas de login y registro
- Página de favoritos (estructura base)
- Sistema de comentarios (visual)
- Botón de favoritos (visual)



# Funcionalidades

- Ver imágenes del espacio organizadas en cards
- Agregar una imagen a favoritos
- Ver comentarios en cada imagen
- Escribir comentarios
- Navegar a login y register
- Interfaz responsive básica


# Estructura

src/
components/
pages/
layouts/
lib/

# Cómo ejecutar

1. Entrar a la carpeta del frontend:

cd nasa-space-explorer

2. Instalar dependencias:

npm install

3. Ejecutar el proyecto:

npm run dev

4. Abrir en el navegador:

http://localhost:4321

---

# TP3 — Calidad y CI/CD (lado frontend)

## Qué se agregó

- `src/lib/validation.js`: funciones de validación de formularios (email de registro, contraseña, username, comentarios)
- `src/tests/validation.test.js`: tests unitarios con Vitest sobre esas validaciones
- `eslint.config.js`: configuración de lint
- Scripts nuevos en `package.json`: `lint`, `test`, `test:coverage`

## Cómo correr los tests

```bash
npm install
npm run test
npm run lint
```

## Pendiente de integrar con la parte de Timo

- Fusionar este `CALIDAD-FRONTEND.md` dentro del `CALIDAD.md` general (sección de herramientas, tests y casos de uso del lado frontend)
- El pipeline (`.github/workflows/ci.yml`) y la config de E2E (`e2e/`, `playwright.config.js`) ya están copiados acá como referencia, pero corren sobre `main`/`develop`, no sobre esta rama individual — no hace falta correrlos localmente salvo `npm run lint` y `npm run test`
- Una vez que las ramas se mergeen, los componentes (`CommentForm`, `register`, `profile`) van a llamar a las funciones de `api.js` de Timo en vez de `supabase` directo — ahí hay que mantener las validaciones que se agregaron en este TP3 (`validateRegisterEmail`, `validatePassword`, `validateUsername`, `validateCommentInput`)