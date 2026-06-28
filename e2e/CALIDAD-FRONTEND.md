# Aporte de Frontend a CALIDAD.md

> Este archivo se debe fusionar con la sección correspondiente que ya armó Timo en `CALIDAD.md`.

## Herramientas seleccionadas (lado frontend)

**Vitest** para tests unitarios de validación de formularios. Se usa la misma herramienta que en el backend para mantener consistencia en todo el proyecto y no requerir configuración duplicada.

## Tests desarrollados (lado frontend)

### Tests unitarios (`src/tests/validation.test.js`)

Las funciones de `src/lib/validation.js` concentran toda la lógica de validación de inputs de formularios (registro, perfil, comentarios) para que sea testeable de forma aislada, sin depender del DOM ni de Supabase.

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

## Casos de uso críticos (lado frontend)

**Validación de email en el registro.** Es la primera línea de defensa antes de llegar a Supabase: evita una llamada innecesaria a la API si el email ya es inválido localmente.

**Validación de username en el perfil.** Previene nombres de usuario vacíos, demasiado largos o con caracteres que podrían romper la UI en otras partes de la app (como el listado de comentarios).

**Validación de comentarios antes de enviarlos.** Evita comentarios vacíos o excesivamente largos que rompan el diseño de las cards de comentarios.

## Limitaciones (lado frontend)

Las validaciones del front son una primera barrera, pero no reemplazan ninguna validación que deba existir del lado del servidor/Supabase (constraints de base de datos, RLS policies). Si alguien bypassea el frontend (ej. llamando a la API directamente), estas validaciones no protegen nada — esa responsabilidad es de Supabase.
