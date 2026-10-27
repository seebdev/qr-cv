# Preparación para Render

La aplicación se despliega como **Web Service de Node**, no como sitio estático. `render.yaml` incluye Node 22, instalación desde el lockfile, validación de variables, compilación con Webpack, `npm start` y health check en `/api/health`. El plan configurado es **Starter (de pago)**; se puede cambiar antes de crear el servicio.

## Estado actual

- Código y configuración preparados localmente. No se ha creado ni publicado un servicio.
- Repositorio de destino: https://github.com/seebdev/qr-cv, cuenta `seebdev`, rama `main`.
- Los seis proyectos, sus registros e imágenes están en **Supabase local**. Render no puede acceder al localhost de este equipo.
- Los PDF del CV y la foto están en `public/cv` y viajan con el código.

## Antes del primer despliegue

1. Crear un repositorio en la cuenta de GitHub elegida y subir el código con `package-lock.json`. `.gitignore` excluye `.env.local`, `.local`, dependencias y resultados de pruebas. No subir copias de la base, claves ni credenciales de pruebas.
2. Preparar un proyecto Supabase alojado. Para un proyecto vacío, ejecutar `supabase/setup-new-project.sql` en SQL Editor: contiene las tres migraciones en una transacción y se detiene si ya hay tablas públicas. Alternativamente, aplicar los tres archivos de `supabase/migrations` en orden. No ejecutar ambas opciones. Configurar Auth para la cuenta administradora, sin registro público.
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

El build no ejecuta migraciones. La importación del catálogo se activa explícitamente como se describe abajo; no sobrescribe proyectos existentes.

## Restaurar los seis proyectos en el Supabase de qr-cv

El repositorio incluye `content/portfolio/catalog.json` y seis capturas WebP, exportadas exclusivamente de los proyectos públicos locales. No incluye usuarios, mensajes, contraseñas ni proyectos privados.

En Render → Environment:

1. Configurar `SUPABASE_SECRET_KEY` con la clave secreta del proyecto `xmuwahdcpujesxcykqrt` (también se admite su clave legacy `service_role`). Nunca colocarla en una variable `NEXT_PUBLIC_*`.
2. Añadir `IMPORT_PORTFOLIO=true` y guardar/desplegar el último commit.
3. Mantener `Start Command` en `npm start`. Su paso `prestart` importará el catálogo y las imágenes al bucket privado antes de arrancar Next.js.
4. Buscar `Catálogo: 6/6 proyectos publicados.` en los logs y comprobar `/es`.
5. Quitar `IMPORT_PORTFOLIO` o cambiarla a `false` después de completar la importación.

También puede ejecutarse una vez desde Render Shell con `npm run content:import`. La herramienta solo admite el proyecto de destino mencionado, inspecciona las tablas antes de escribir y conserva registros/cubiertas existentes. No crea tablas ni altera RLS. Si una importación se interrumpe después de insertar un proyecto, el siguiente intento puede completar su portada sin cambiar su estado de publicación.

Referencias oficiales: [Next.js en Render](https://render.com/docs/deploy-nextjs-app), [Blueprint](https://render.com/docs/blueprint-spec), [Node](https://render.com/docs/node-version).
