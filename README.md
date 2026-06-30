# NASA Space Explorer

Aplicación web tipo museo digital del espacio, donde podés explorar cuerpos celestes con imágenes reales, guardar tus favoritos y dejar comentarios.

Desarrollada como Trabajo Práctico para la materia UX (TP2: aplicación serverless, TP3: calidad y CI/CD).

---

## Equipo

| Integrante | Rama | Responsabilidad |
|---|---|---|
| Timoteo Czerwiak | `timoteo-czerwiak` | Backend: base de datos, autenticación y API con Supabase |
| Mayte Calvert | `mayte-calvert` | Frontend: diseño, páginas y componentes con Astro |

---

## Stack tecnológico

- **Frontend:** Astro
- **Base de datos y autenticación:** Supabase
- **Deploy:** Vercel
- **CI/CD:** GitHub Actions
- **Tests unitarios:** Vitest
- **Tests E2E:** Playwright
- **Lint:** ESLint

---

## Funcionalidades

- Registro, inicio y cierre de sesión de usuarios
- Exploración de cuerpos celestes con imágenes (planetas, estrellas, agujeros negros, galaxias, nebulosas)
- Guardar cuerpos celestes como favoritos
- Comentar en cada cuerpo celeste, con edición y borrado de comentarios propios
- Perfil de usuario con nombre editable

---

## Base de datos

El proyecto usa Supabase con las siguientes tablas:

- `celestial_bodies` — contenido del museo (nombre, categoría, descripción, imagen)
- `profiles` — perfil de cada usuario registrado
- `favorites` — favoritos asociados a cada usuario
- `comments` — comentarios por cuerpo celeste y usuario

Todos los accesos están protegidos con Row Level Security (RLS).

---

## URL de producción

> Se completa una vez deployado en Vercel.

---

## Setup local

```bash
git clone https://github.com/t-czerwiak/tp2-aplicacion-serverless-timoteoczeriwak-maytecalvert.git
cd tp2-aplicacion-serverless-timoteoczeriwak-maytecalvert
npm install
cp .env.example .env   # completar con las keys de Supabase
npm run dev
```

## Variables de entorno

```
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

## Scripts

```bash
npm run dev            # servidor de desarrollo
npm run build          # build de producción
npm run lint           # lint del código
npm run test           # tests unitarios
npm run test:e2e       # tests E2E (requiere app corriendo)
npm run test:coverage  # cobertura de tests
```

---

## Estructura de ramas

```
main              ← versión estable y desplegada
develop           ← integración de ambas partes
timoteo-czerwiak  ← desarrollo del backend
mayte-calvert     ← desarrollo del frontend
```

### Branch naming

| Tipo | Convención | Ejemplo |
|---|---|---|
| Feature | `feature/nombre` | `feature/favoritos` |
| Fix | `fix/nombre` | `fix/login-error` |
| Refactor | `refactor/nombre` | `refactor/api-layer` |
| Chore | `chore/nombre` | `chore/ci-setup` |

Ningún cambio se mergea directo a `main` o `develop`. Todo pasa por un PR aprobado por el otro integrante.

---

## Pipeline CI/CD

`lint → test → build → e2e → deploy`

El deploy a producción solo ocurre si todos los pasos anteriores pasan y el push es a `main`.

Ver [CALIDAD.md](./CALIDAD.md) para la documentación completa de calidad: estrategia, herramientas, tests desarrollados, casos de uso críticos y limitaciones.
>>>>>>> origin/develop
