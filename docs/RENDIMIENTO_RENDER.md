# Optimización de carga

La medición del servidor activo, antes del cambio, mostró HTML en 0,27–0,86 s y algunas imágenes iniciales terminando cerca de 3 s desde la navegación. Son observaciones puntuales, no una medición de arranque después de inactividad.

Se eliminan dos pasos para las seis capturas iniciales: consultar objetos inexistentes en Storage y recodificar a AVIF/WebP durante la visita. Las imágenes ahora tienen variantes WebP de 480 y 960 píxeles preparadas con `scripts/prepare-cover-sizes.mjs`; el navegador elige según ancho y densidad de pantalla. Las de 480 px pesan 10–19 KB cada una.

Las portadas iniciales siguen pasando por la consulta anónima de medios y RLS antes de servirse. No se cachean permisos ni se hacen públicas las imágenes de borradores. Las imágenes nuevas del administrador mantienen su carga desde Storage y la optimización de Next.js; se usa WebP para reducir el coste de la primera conversión.

El tiempo de arranque de una instancia dormida es independiente de estas mejoras. Según [Render](https://render.com/docs/free#spinning-down-on-idle), un servicio Free puede suspenderse tras 15 minutos sin tráfico y tardar aproximadamente un minuto en arrancar. No se ha confirmado el plan de esta instancia ni se ha cambiado su facturación.
