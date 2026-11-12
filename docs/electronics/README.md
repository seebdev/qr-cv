# Electronic Parts Intelligence — presentación pública

Fecha de revisión: 12 de noviembre de 2026. Rama: `feature/demo-electronics-showcase`.

Vistas de la presentación local: [escritorio](preview-desktop.png), [módulos](preview-modules.png), [IA](preview-ai.png), [videos pendientes](preview-videos.png), [móvil chino](preview-mobile-zh.png) y [móvil japonés](preview-mobile-ja.png).

## Rutas e integración

`/{locale}/projects/demo-electronics` está disponible en `es`, `en`, `fr`, `de`, `it`, `zh`, `ja` y `pt`. Conserva el encabezado, selector de idioma, pie de página y contacto del portafolio. Las rutas incluyen canonical, nueve alternativas de idioma (incluido `x-default`), metadatos sociales y datos estructurados de estudio de caso, sin precios, calificaciones ni clientes inventados.

La tarjeta editorial aparece antes de las seis tarjetas existentes. Su enlace principal ocupa toda la tarjeta mediante CSS; el enlace externo es un enlace hermano situado encima de esa superficie, sin elementos interactivos anidados. Ambos funcionan con teclado. El archivo también incluye el proyecto primero en el orden destacado. Las demás tarjetas conservan su comportamiento.

La presentación es contenido editorial versionado, independiente de las filas de la base de datos. No se crea ningún registro ni se cambia una migración. Si hay un proyecto publicado con slug `demo-electronics`, sus videos pueden alimentar los espacios de demostración. No se duplica su entrada en el archivo público. Despublicar ese registro retira sus medios administrados; la página editorial sigue siendo pública. El CRUD y los proyectos ajenos no se modifican.

## Videos: un solo lugar de configuración

Editar **`src/lib/electronics/media.json`**. Hay dos entradas permanentes, `english` y `chinese`. Sus idiomas son `en` y `zh-Hans`, independientemente del idioma de la página. Los campos `title` y `description` son claves de las ocho traducciones en `src/lib/electronics/copy/`; los títulos originales del video se identifican con su atributo `lang`.

### Archivos locales

1. Crear `public/electronics/videos/` y colocar allí `english.mp4` y `chinese.webm` (también se admite MP4 para chino y WebM para inglés).
2. Colocar imágenes de portada en `public/electronics/posters/` y, opcionalmente, subtítulos WebVTT en `public/electronics/captions/`.
3. Modificar únicamente la entrada correspondiente del JSON, por ejemplo:

```json
{
  "id": "english",
  "language": "en",
  "title": "videoEnglish",
  "description": "videoEnglishBody",
  "src": "/electronics/videos/english.mp4",
  "poster": "/electronics/posters/english.webp",
  "adminOrder": 10,
  "captions": [{ "src": "/electronics/captions/english.vtt", "language": "en", "label": "English" }]
}
```

4. Recompilar y publicar mediante el procedimiento normal del repositorio. No cambiar los componentes.

Los archivos locales se comprueban en el servidor antes de emitir una URL. Un `src` nulo, inválido o inexistente muestra «Video próximamente» en el idioma seleccionado, sin crear un elemento `video` ni solicitudes al archivo. Las portadas y pistas inexistentes se omiten. El reproductor utiliza controles nativos, `playsInline`, `preload="none"` y no reproduce automáticamente. Los errores de reproducción muestran un mensaje localizado. Los subtítulos son opcionales; para videos hablados, añadir una transcripción revisada.

### URL HTTPS autorizada

Añadir el origen exacto a `allowedOrigins`, por ejemplo `https://media.example.com`, y colocar la URL HTTPS del MP4/WebM en `src`. El mismo JSON alimenta la validación y las directivas `img-src` y `media-src` de la CSP. No se permiten HTTP, credenciales en la URL, comodines ni orígenes no listados. El servidor no hace peticiones a URLs externas para probarlas; verificar su disponibilidad antes de publicarlas. Usar URLs estables y públicas, no secretos ni enlaces de corta duración. Las pistas WebVTT se sirven localmente para evitar requisitos de CORS inconsistentes entre proveedores.

### Administrador existente

Alternativa sin nuevo backend:

1. En `/admin`, crear o abrir un proyecto con slug exacto `demo-electronics` y publicarlo siguiendo sus validaciones existentes.
2. Subir los videos mediante **Cover & gallery**. Se conserva el límite actual de 25 MB por video.
3. Asignar **Order 10** al video inglés y **Order 20** al video chino.
4. Dejar `src: null` en el JSON para utilizar el video administrado. Un archivo configurado válido tiene prioridad sobre el administrador.

Solo se usan videos de un proyecto publicado, con un único video en cada orden. Si hay dos videos en el mismo orden, ese espacio permanece vacío. La entrega utiliza `/api/media/{id}` y sus verificaciones anónimas existentes; no se publican claves ni URLs firmadas. Para sustituir un video sin editar código, subir el nuevo y cambiar el orden del anterior. La configuración de `poster` y subtítulos permanece centralizada en el JSON.

## Capturas e ilustraciones

Las seis entradas de `screenshots` corresponden a clientes, oportunidades, stock, búsqueda, IA y chat. Colocar capturas autorizadas y revisadas en `public/electronics/screenshots/` y configurar su `src`. La entrada `clients` alimenta también el hero y la tarjeta. Se admiten WebP, AVIF, PNG y JPEG. Las imágenes locales usan optimización de Next.js y espacios con proporción reservada; la galería incluye ampliación, flechas, Escape y retorno de foco.

No se recibió un archivo de imagen reutilizable de la captura pegada en el chat. Tampoco se obtuvo una nueva captura de la demo autenticada: la herramienta de uso del navegador se detuvo al no poder validar con confianza la URL de Windows. Los archivos encontrados en la copia local eran capturas antiguas de otra identidad visual o tablas de QA; no se reutilizaron como si correspondieran a la interfaz actual.

Por ello, las seis fuentes quedan vacías y se muestran **ilustraciones identificadas**, nunca capturas supuestamente auténticas. La portada también indica «Vista ilustrativa». No se inventan clientes, cifras ni resultados. Antes de incorporar una captura, eliminar datos privados y comprobar que las marcas de demostración no sugieran una relación comercial. La imagen aportada fue referencia de organización visual, no un recurso publicado.

## Contenido y evidencia

Ver [EVIDENCE.md](EVIDENCE.md). Los textos distinguen funciones revisadas en código de configuración y comportamiento no comprobados en producción. El asistente descrito pertenece a Demo Electronics: esta página no abre un chat, consulta bases comerciales ni ejecuta modelos.

Cada idioma contiene los mismos campos, once módulos y todos los mensajes de interacción. Solo las marcas, nombres técnicos y títulos originales identificados de los videos conservan su idioma propio. El contenido completo se importa en componentes de servidor; las islas interactivas reciben únicamente el idioma actual. Se reutiliza Manrope y la cadena de fuentes CJK del portafolio.

## Verificación

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e -- tests/e2e/electronics.spec.ts
```

Usar Node 22.16+ de la rama 22 según `package.json`. En este equipo existe `.local/node.exe`; ante un Node global de otra versión, anteponer `.local` al PATH solo del proceso. Las pruebas de base de datos requieren la instancia local y no deben apuntar a producción.

Para la suite completa de navegador, compilar **y** arrancar con `NEXT_PUBLIC_SITE_URL=http://localhost:4563` en el proceso local. Next.js incorpora las variables `NEXT_PUBLIC_*` durante la compilación; cambiarlas solo al arrancar no actualiza el origen usado por las comprobaciones de solicitudes. No es necesario editar `.env.local` ni variables de servicios remotos. Después ejecutar `npm run test:e2e`.

Resultados ejecutados y límites: [VERIFICATION.md](VERIFICATION.md).
