# Panel de Administrador — Guía de Configuración

Este documento explica cómo dejar funcionando el panel de administrador
(proyectos, blog, likes/comentarios públicos y gestión de accesos) una vez
que subas el proyecto a Vercel.

## 1. Conectar la base de datos (Postgres)

1. En tu proyecto de Vercel, ve a **Storage → Create Database**.
2. Elige **Postgres** (actualmente provisto por Neon a través del
   Marketplace de Vercel).
3. Conéctalo a tu proyecto. Vercel agrega automáticamente la variable de
   entorno `POSTGRES_URL` — no necesitas configurarla a mano.
4. Al primer request que use la base de datos, el sitio crea las tablas
   automáticamente y siembra:
   - El primer administrador: **habzerl753@gmail.com** / **77513278**
   - Los proyectos y publicaciones de blog que ya tenía el sitio, para
     que no pierdas el contenido actual al pasar a base de datos.

> Nota: el paquete `@vercel/postgres` que usa este proyecto está en modo
> mantenimiento a favor de Neon, pero sigue funcionando igual — solo usa
> la misma variable `POSTGRES_URL` que te da el Marketplace de Vercel.

## 2. Conectar el almacenamiento de imágenes (Blob)

1. En **Storage → Create Database**, elige **Blob**.
2. Conéctalo a tu proyecto. Vercel agrega automáticamente
   `BLOB_READ_WRITE_TOKEN`.
3. Esto es lo que usa el panel de admin para subir fotos de proyectos y
   portadas de blog — sin esto, el botón de "Subir imagen" mostrará un
   error explicando que falta conectar el Blob Store.

## 3. Variable de sesión del admin

En **Settings → Environment Variables**, agrega:

```
ADMIN_JWT_SECRET = <una cadena aleatoria larga>
```

Puedes generar una con `openssl rand -base64 32` en tu terminal, o
cualquier generador de contraseñas largas. Esta variable firma la cookie
de sesión del panel — sin ella, el login no funcionará.

## 4. Primer acceso

1. Ve a `tudominio.com` → scroll hasta el pie de página → **Acceso Admin**.
2. Entra con:
   - Correo: `habzerl753@gmail.com`
   - Contraseña: `77513278`
3. Desde ahí puedes:
   - **Proyectos**: agregar, editar o eliminar proyectos de "Proyectos que
     Hablan por Sí Mismos" (título, descripción, imágenes, m², ubicación,
     fecha, categoría). Los cambios se ven al instante para todos los
     visitantes, en cualquier dispositivo.
   - **Blog**: lo mismo para las publicaciones del blog.
   - **Moderar** (dentro de cada proyecto): ver y borrar comentarios
     públicos, o reiniciar el contador de likes a cero.
   - **Administradores**: agregar o quitar correos con acceso al panel, y
     cambiar contraseñas. Cualquier correo que agregues aquí podrá entrar
     al mismo panel con su propia contraseña.

## 5. Cómo funcionan los likes y comentarios públicos

- Los likes y comentarios de cada proyecto se guardan en la base de datos,
  **no en el navegador** — cualquier persona, desde cualquier dispositivo,
  ve el mismo conteo y los mismos comentarios.
- Para evitar que alguien dé "like" varias veces sin querer desde el mismo
  navegador, se guarda un identificador aleatorio (sin datos personales)
  en `localStorage` — esto es solo una ayuda de interfaz, el dato real
  (cuántos likes tiene el proyecto) siempre vive en la base de datos y es
  público para todos.
- El admin puede borrar cualquier comentario o reiniciar los likes de un
  proyecto desde el botón **Moderar** en el panel.

## 6. Idioma automático

El sitio ya no tiene botón de idioma. Detecta el idioma del navegador de
quien visita la página: si el navegador está en inglés, se muestra en
inglés; en cualquier otro caso, se muestra en español (idioma por
defecto).

## 7. Resumen de variables de entorno necesarias

| Variable | Cómo se obtiene |
|---|---|
| `POSTGRES_URL` | Automática al conectar Storage → Postgres |
| `BLOB_READ_WRITE_TOKEN` | Automática al conectar Storage → Blob |
| `ADMIN_JWT_SECRET` | La agregas tú manualmente (cadena aleatoria) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Tu ID de Google Analytics 4 (ver README-SEO-ANALYTICS.md) |

Sin `POSTGRES_URL` y `BLOB_READ_WRITE_TOKEN`, el sitio sigue funcionando
en modo de solo lectura mostrando el contenido original, pero el panel de
administrador no podrá guardar cambios ni likes/comentarios.
