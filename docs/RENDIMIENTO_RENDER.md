# Optimización de carga

## Portadas públicas estáticas

Las seis capturas del catálogo publicado usan ahora archivos estáticos en `public/project-previews`, con tres tamaños, nombres derivados del contenido y caché de un año. El navegador no llama a `/api/media`, Supabase ni al optimizador de Next.js para estas portadas. Las dos primeras se precargan y todas tienen una miniatura borrosa visible mientras llega la imagen.

Son recursos públicos de presentación que ya forman parte del repositorio público. Ocultar un proyecto retira su tarjeta del catálogo, pero no revoca una URL estática o una copia en caché de esas seis capturas. Las imágenes nuevas o privadas del administrador no entran en este conjunto: conservan la ruta protegida. Regenerar estas portadas con `node scripts/prepare-static-covers.mjs` cambia sus URLs y evita caché obsoleta.

La mejora anterior, descrita debajo, permanece para las rutas de medios protegidas. La navegación normal de las seis tarjetas usa ahora las portadas estáticas.

La medición del servidor activo, antes del cambio, mostró HTML en 0,27–0,86 s y algunas imágenes iniciales terminando cerca de 3 s desde la navegación. Son observaciones puntuales, no una medición de arranque después de inactividad.

Se eliminan dos pasos para las seis capturas iniciales: consultar objetos inexistentes en Storage y recodificar a AVIF/WebP durante la visita. Las imágenes ahora tienen variantes WebP de 480 y 960 píxeles preparadas con `scripts/prepare-cover-sizes.mjs`; el navegador elige según ancho y densidad de pantalla. Las de 480 px pesan 10–19 KB cada una.

Las portadas iniciales siguen pasando por la consulta anónima de medios y RLS antes de servirse. No se cachean permisos ni se hacen públicas las imágenes de borradores. Las imágenes nuevas del administrador mantienen su carga desde Storage y la optimización de Next.js; se usa WebP para reducir el coste de la primera conversión.

El usuario confirmó que la instancia usa el plan de pago de 7 USD de Render. Esta optimización se centra en las imágenes; no se ha cambiado el plan ni la facturación.
