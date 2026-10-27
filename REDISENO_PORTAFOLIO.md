# Rediseño del portafolio de Sebastián Solórzano

## Resultado

La portada empieza con los seis proyectos, siguiendo la última indicación del propietario. Después aparecen la presentación, servicios, proceso, sobre mí, archivo y contacto. Se mantiene la aplicación existente: Next.js 16.3.5, React 19.3.0, TypeScript, Tailwind y Supabase. No se publicó ni se hizo push.

Diseño crema/blanco con azul profundo, Manrope y fuentes de sistema para chino/japonés. Capturas grandes, tarjetas con acceso al caso y al sitio externo, menú móvil, selector de ocho idiomas con banderas SVG, navegación por teclado y paleta de comandos. Las pantallas del administrador comparten la nueva paleta.

## Catálogo y medios

| Orden | Proyecto | URL conservada | Portada |
|---|---|---|---|
| 1 | Crepes & Waffles | https://crepes-and-waffles.vercel.app/cliente | Captura real |
| 2 | Tolentino IA | https://web-tolentino-ia.vercel.app/ | Captura real |
| 3 | Tetr Adventure Club | https://tetr-adventure-club.vercel.app/ | Captura real |
| 4 | Netflix Tetr · Nostalgia Lab | https://netflix-tetr.vercel.app/ | Captura real |
| 5 | Perrote y Gatote | https://www.perroteygatote.com/ | Captura real |
| 6 | La Parrilla | https://restaurante-nvei44549-tolentinosftw-dotcoms-projects.vercel.app/cliente | Pendiente |

Los cinco primeros sitios se inspeccionaron mediante navegador y devolvieron HTTP 200. La Parrilla redirige al acceso de Vercel: su nombre y descripción proceden de la captura aportada por el propietario. No se utilizó la pantalla de login como portada ni se fabricó una interfaz. Hace falta el archivo de esa captura o acceso público al sitio para completar el sexto medio.

No se proporcionaron videos. Se conserva la carga de videos y galerías en el administrador; la portada elegida también actúa como imagen de presentación del video. Los videos tienen controles, no se reproducen automáticamente y usan `preload="none"` en los casos públicos.

No se inventaron resultados, clientes, afiliaciones, fechas de ejecución ni tecnologías de los sitios externos. Los campos internos obligatorios de año/estado de las nuevas fichas no se presentan como datos verificados: las fichas importadas se identifican con `project_type=showcase` y omiten esos datos en la vista pública.

## Datos, idiomas y administración

- Once proyectos conservados: seis públicos y cinco demos privadas. Las demos mantienen IDs y archivos.
- Orden persistente mediante `featured_order` y `display_order`; archivo con búsqueda, categorías, tecnología y ordenación explícita.
- Importación local repetible: `scripts/import-portfolio.mjs`. Coincide por URL o slug y no duplica registros. Se comprobó repitiéndola y verificando IDs, orden y archivos.
- Traducciones guardadas para español, inglés, francés, alemán, italiano, chino simplificado, japonés y portugués de Brasil. Los seis proyectos tienen título, resumen, descripción e instrucciones de uso en esos idiomas.
- Campos adicionales editables para proyectos, datos personales, experiencia, métricas y textos alternativos. Previsualización privada en ocho idiomas.
- Se conservan las columnas originales EN/ES. Una columna JSONB `translations` amplía cada entidad; fallback: idioma solicitado, inglés, español, cadena vacía. Las secciones opcionales vacías se omiten.
- Se actualizaron `lang`, metadatos, canonical, alternativos, sitemap y OpenGraph. La preferencia se guarda en una cookie y el cambio de idioma mantiene el proyecto.
- WhatsApp y Gmail son enlaces de apertura: no envían mensajes ni escriben en la bandeja. El formulario existente sí guarda mensajes privados; no se añadió envío de correos.
- Analytics permanece desactivado. Se mantienen RLS, autorización de servidor, bucket privado y validación de origen.

Migración aditiva: `supabase/migrations/20261026174435_portfolio_translations.sql`. Aplicada únicamente al contenedor local, sin resetear datos. No se modificó ningún proyecto remoto. La migración queda revisable para un despliegue futuro; no se marcó como aplicada en un entorno remoto.

Respaldo previo local e ignorado por Git: `.local/redesign-backup/` (código y datos privados). No compartir ese directorio públicamente.

## Verificación

Resultados finales:

- TypeScript, ESLint y build de producción con Webpack: correctos.
- Vitest: **21 pruebas aprobadas**.
- Playwright sobre producción: **23 aprobadas y 1 omitida**. La omitida es una prueba optativa que detiene PostgREST para simular una caída; no se provocó esa interrupción en la verificación final.
- El ciclo de administrador verificó login, creación, edición, traducción francesa persistida y visible públicamente, carga y portada de imagen, publicación, duplicación, borrador, eliminación y cierre de sesión.
- Formulario: mensaje de prueba guardado en la bandeja local privada y eliminado después. No se enviaron correos ni mensajes externos.
- Axe: sin infracciones automáticas WCAG A/AA en las portadas ES/EN tras corregir contrastes. Esto no equivale a una auditoría manual exhaustiva.
- Los ocho idiomas conservan catálogo, orden, URLs y proyecto al cambiar y recargar. Se comprobó sitemap, cookies y textos administrados.
- RLS: denegación de escritura anónima/no administradora, privacidad de borradores e hijos, prevención de elevación de permisos, RPC restringidos y contador atómico: correctos.
- Storage: carga/descarga real, privacidad de borrador, acceso publicado y retirada de publicación: correctos.
- Capturas y revisión visual: 1440 px, 768 px, 390 px y 320 px, sin desbordamiento. Playwright también comprobó 375, 430, 1024 y 1920 px.
- OpenGraph: HTTP 200 e imagen PNG en los ocho idiomas.

La primera pasada detectó contrastes insuficientes en textos secundarios y numeraciones: se corrigieron. También se alineó el origen de las pruebas con `http://localhost:4563` para mantener la validación de origen de los formularios. Una prueba inicial de Auth sufrió un timeout mientras compilaba; su repetición pasó.

## Rendimiento medido

Lighthouse **12.8.2**, Chrome 156, emulación móvil 412 × 823, CPU ×4, RTT 150 ms y 1638,4 Kbps simulados, sobre la compilación de producción en `http://localhost:4563/es`. Tres ejecuciones consecutivas sin Playwright ni compilación simultáneos:

| Ejecución | Performance | Accesibilidad | Buenas prácticas | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 82 | 100 | 100 | 100 | 3,84 s | 276 ms | 0 |
| 2 | 84 | 100 | 100 | 100 | 3,39 s | 310 ms | 0 |
| 3 | 86 | 100 | 100 | 100 | 3,33 s | 270 ms | 0 |

**Mediana móvil: 84. No se alcanzó el objetivo de 95.** El diagnóstico señala la presentación de la primera imagen como LCP y trabajo de JavaScript en el hilo principal. Queda pendiente una optimización adicional de la carga inicial para alcanzar ese objetivo. No se alteró la medición para simular una mejor puntuación.

Se optimizaron capturas a WebP, tamaños responsivos, prioridad únicamente para la primera portada, carga diferida del resto, videos sin precarga, espacio reservado para medios y datos reducidos del archivo. Se mantienen las funciones y el backend.

Estas cifras describen este equipo Windows y los servicios locales; no garantizan resultados en hosting, redes o dispositivos reales. Una medición exploratoria anterior, concurrente con otras verificaciones y antes de los ajustes finales, dio 35; no forma parte de la mediana final. El detalle de condiciones y resultados está en [performance.json](docs/redesign/performance.json).

## Abrir y arrancar

URL: **http://localhost:4563/es**. Administrador: **http://localhost:4563/admin**.

Con Docker/Supabase local activos y `.env.local` configurado, desde la raíz:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-local.ps1
```

Para recompilar antes de arrancar:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-local.ps1 -Build
```

El script usa Node 22 y el puerto 4563, con el origen correcto. No ejecuta migraciones ni publica. El puerto debe estar libre si se inicia una segunda instancia.

## Capturas

Capturas finales: [escritorio](docs/redesign/desktop.png), [móvil](docs/redesign/mobile.png), [tablet](docs/redesign/tablet.png), [320 px](docs/redesign/narrow.png), [página completa de escritorio](docs/redesign/desktop-full.png), [página completa móvil](docs/redesign/mobile-full.png) y [caso en japonés](docs/redesign/case-japanese.png).

Se generan con `scripts/capture-redesign.mjs`. Los archivos detallados de Lighthouse y la verificación del catálogo quedan en `.local/redesign-media/`.

## Límites

La portada de La Parrilla se capturó desde su proyecto local original. No se verificó el comportamiento interno de los seis sitios ni se realizaron compras, votos o mensajes externos. Las traducciones son editables y no usan servicios remotos por visita; conviene revisión editorial nativa antes de publicar. El CV de CvSolGLOBAL está integrado después de los proyectos: contenido original en español, inglés y chino (inglés para los demás idiomas), foto circular y PDF en español e inglés.

## Ajustes solicitados: CV, contacto e imágenes

- Proyectos primero; después CV con perfil y stack originales, foto y ambos PDF.
- Banderas siempre visibles, sin desplegable. Foto circular en cabecera y pie.
- Logos de WhatsApp y Gmail en botones fijos. El formulario no enviaba emails, solo guardaba mensajes privados, por lo que se retiró de la página. Gmail abre la redacción; el usuario envía desde su cuenta.
- Seis proyectos con capturas reales; La Parrilla capturada desde el menú local original. Las imágenes públicas usan una ruta estable que aplica RLS al consultar y descargar; ya no se incrustan URLs que caducan a los cinco minutos.
- Verificación: TypeScript, ESLint, build y 21 pruebas públicas de navegador correctas. Se comprobaron las seis imágenes, idiomas, accesibilidad, anchos móviles/escritorio, PDF descargables y rechazo de imágenes privadas.
