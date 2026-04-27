# 🌌 NASA Space Explorer

Aplicación web tipo museo digital del espacio, donde podés explorar cuerpos celestes con imágenes reales, guardar tus favoritos y dejar comentarios.

Desarrollada como Trabajo Práctico N°2 para la materia UX.

---

## 👥 Equipo

| Integrante | Rama | Responsabilidad |
|---|---|---|
| Timoteo Czerwiak | `timoteo-czerwiak` | Backend: base de datos, autenticación y API con Supabase |
| Mayte Calvert | `mayte-calvert` | Frontend: diseño, páginas y componentes con Astro |

---

## 🚀 Stack tecnológico

- **Frontend:** [Astro](https://astro.build/)
- **Base de datos y autenticación:** [Supabase](https://supabase.com/)
- **Deploy:** [Vercel](https://vercel.com/)

---

## ✨ Funcionalidades

- Registro, inicio y cierre de sesión de usuarios
- Exploración de cuerpos celestes con imágenes (planetas, estrellas, agujeros negros, galaxias, nebulosas)
- Guardar cuerpos celestes como favoritos
- Comentar en cada cuerpo celeste
- Perfil de usuario

---

## 🗄️ Base de datos

El proyecto usa Supabase con las siguientes tablas:

- `celestial_bodies` — contenido del museo (nombre, categoría, descripción, imagen)
- `profiles` — perfil de cada usuario registrado
- `favorites` — favoritos asociados a cada usuario
- `comments` — comentarios por cuerpo celeste y usuario

Todos los accesos están protegidos con Row Level Security (RLS).

---

## ⚙️ Cómo correr el proyecto localmente

```bash
# Clonar el repositorio
git clone https://github.com/t-czerwiak/tp2-aplicacion-serverless-timoteoczeriwak-maytecalvert.git

# Entrar a la carpeta del proyecto
cd nasa-space-explorer

# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev
```

---

## 🌿 Estructura de ramas

```
main              ← versión estable y desplegada
develop           ← integración de ambas partes
timoteo-czerwiak  ← desarrollo del backend
mayte-calvert     ← desarrollo del frontend
```

---

## 🔗 Deploy

La aplicación está desplegada en Vercel: [link acá cuando esté disponible]