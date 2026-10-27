# Preparación para Render

La aplicación se despliega como **Web Service de Node**, no como sitio estático. `render.yaml` incluye Node 22, instalación desde el lockfile, validación de variables, compilación con Webpack, `npm start` y health check en `/api/health`. El plan configurado es **Starter (de pago)**; se puede cambiar antes de crear el servicio.

## Estado actual

- Código y configuración preparados localmente. No se ha creado ni publicado un servicio.
- Repositorio de destino: https://github.com/seebdev/qr-cv, cuenta `seebdev`, rama `main`.
- Los seis proyectos, sus registros e imágenes están en **Supabase local**. Render no puede acceder al localhost de este equipo.
- Los PDF del CV y la foto están en `public/cv` y viajan con el código.

## Antes del primer despliegue

1. Crear un repositorio en la cuenta de GitHub elegida y subir el código con `package-lock.json`. `.gitignore` excluye `.env.local`, `.local`, dependencias y resultados de pruebas. No subir copias de la base, claves ni credenciales de pruebas.
2. Preparar un proyecto Supabase alojado. Aplicar, en orden, los tres archivos de `supabase/migrations`. Configurar Auth para la cuenta administradora, sin registro público.
3. Trasladar los registros del catálogo, ajustes, relaciones e imágenes al proyecto alojado, conservando IDs y `storage_path`. El bucket `portfolio` debe seguir siendo privado y usar las políticas de las migraciones. No copiar usuarios de pruebas, mensajes privados, contadores ni claves del entorno local. Los scripts `import-portfolio.mjs` y `import-parrilla-cover.mjs` son intencionalmente locales: no usarlos contra producción ni retirar su protección.
4. Crear una cuenta administradora de producción mediante `scripts/create-admin.mjs` con credenciales de producción en el entorno de una sesión de confianza. No añadir `ADMIN_PASSWORD` a Render ni a Git.
5. En Render: **New → Blueprint**, conectar el repositorio y revisar el plan. Introducir las variables solicitadas antes de compilar.

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Origen HTTPS del Supabase alojado |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave publishable o anon de ese proyecto; nunca secret/service_role |
| `NEXT_PUBLIC_SITE_URL` | URL HTTPS final del servicio Render o dominio propio, sin barra final |
| `SUPABASE_SECRET_KEY` | Clave privada del proyecto alojado; solo en Render |
| `CONTACT_RATE_LIMIT_SECRET` | Render la genera automáticamente |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | `false` por defecto |

Las variables `NEXT_PUBLIC_*` quedan incorporadas durante la compilación: si cambia el dominio o Supabase, reconstruir el servicio. `next start` escucha en `0.0.0.0` y utiliza el `PORT` asignado por Render. No fijar el puerto local 4563 en producción.

## Comprobación final

- `/api/health` devuelve 200 y `status: ok`.
- `/es` muestra seis proyectos con imágenes, CV, PDF y banderas visibles.
- Login, subida de medios y vista previa funcionan; proyectos sin publicar no aparecen públicamente.
- Los botones de WhatsApp y Gmail abren sus destinos. No existe formulario de envío de emails.
- Canonical, sitemap, OG y cookies usan el dominio HTTPS final.

El build de Render no ejecuta migraciones ni importa contenido automáticamente. Esto evita sobrescribir datos al redesplegar. La transferencia a Supabase alojado y la publicación quedan pendientes hasta elegir las cuentas y proyectos de destino.

Referencias oficiales: [Next.js en Render](https://render.com/docs/deploy-nextjs-app), [Blueprint](https://render.com/docs/blueprint-spec), [Node](https://render.com/docs/node-version).
