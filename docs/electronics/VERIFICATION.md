# Verificación de la presentación de Demo Electronics

Fecha: 12 de noviembre de 2026. Entorno: Windows, Node 22.16.0, Next.js 16.3.5, Chrome mediante Playwright y Supabase **local**. Rama: `feature/demo-electronics-showcase`.

## Comprobaciones ejecutadas

| Comprobación                          | Resultado observado                                                                                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Instalación según `package-lock.json` | `npm ci --no-audit --no-fund` completado. Sin cambios de dependencias ni lockfile. El intento inicial con Node global 20 tuvo un error EPERM; la instalación final usó Node 22.16.0. |
| Lint                                  | 0 errores. Una advertencia preexistente `jsx-a11y/alt-text` en `src/components/portfolio-image.tsx:14`, fuera del nuevo componente.                                                  |
| Typecheck                             | `next typegen && tsc --noEmit` completado; la compilación final también terminó su comprobación TypeScript.                                                                          |
| Unitarias                             | 51 pruebas aprobadas en 5 archivos, incluidas 26 nuevas de traducciones, rutas, configuración de medios, estados vacíos y reproductor.                                               |
| Compilación de producción             | `next build` completado. Conserva las rutas públicas, administrador y API; añade la ruta localizada de producto y su imagen Open Graph.                                              |
| Base de datos local                   | `scripts/test-database.mjs` aprobado: RLS anónima/usuario, hijos de borradores, denegación de escritura, escalamiento de privilegios, RPC restringidas y límite atómico.             |
| Storage local                         | `scripts/test-storage.mjs` aprobado: registro público desactivado, carga/descarga real, privacidad de borradores, medios publicados y despublicación.                                |
| Navegador                             | Suite completa: **32 aprobadas, 1 omitida, 0 fallidas** en 4,2 minutos. Las nueve pruebas nuevas de Demo Electronics pasaron.                                                        |
| Formato del diff                      | `git diff --check` sin errores.                                                                                                                                                      |

El token de aprovisionamiento Auth existente estaba caducado. Para ejecutar las pruebas locales se generó un JWT de 15 minutos mediante `supabase gen bearer-jwt`, capturado únicamente en memoria del proceso. No se imprimió ni se guardó. El hash de `.env.local` coincidió antes y después. Las pruebas utilizaron sus rutinas de limpieza; no se apuntó a una base remota.

## Alcance de las pruebas de navegador

- La tarjeta editorial queda primero, mantiene las seis tarjetas existentes y abre el detalle público con clic sobre su ilustración o Enter sobre el enlace.
- El enlace secundario conserva el destino real de la plataforma y abre una pestaña aparte.
- Las ocho rutas devuelven contenido, canonical, hreflang, Open Graph y datos estructurados localizados. El cambio de idioma mantiene la ruta y la preferencia.
- Los once módulos cambian su explicación. La galería permite abrir, avanzar, cerrar con Escape y recuperar el foco.
- Los dos videos pendientes aparecen en todos los idiomas sin elementos de video ni peticiones a MP4/WebM inexistentes.
- Revisión de 360, 768, 1440 y 1920 px en español, chino y japonés, incluyendo desbordamiento y axe WCAG A/AA. El catálogo existente se comprueba también a 375, 390, 430, 768, 1024, 1440 y 1920 px.
- Se ejecuta además el recorrido existente de login, CRUD, traducción, carga de imagen, publicación, privacidad, duplicación, despublicación y borrado de un proyecto temporal local.

La prueba opcional de recuperación tras apagar PostgREST se mantiene desactivada: requiere `E2E_LOCAL_RECOVERY=true` y detiene un contenedor. No se informa como aprobada.

Durante la navegación automatizada el servidor registró mensajes `The destination stream closed early`. Las comprobaciones de respuestas, recursos e interacción pasaron y no se observaron errores de JavaScript en el navegador. No se atribuye aquí una causa confirmada a esos mensajes del servidor.

## Correcciones derivadas de la validación

1. Contraste de los números del diagrama de arquitectura y de la leyenda del hero chino en móvil. La leyenda tiene ahora fondo explícito y texto más legible.
2. Contraste del copyright existente en la portada, conservando su diseño y contenido.
3. Selector desactualizado de la prueba del catálogo: las tarjetas anteriores usan un enlace externo completo desde el commit `a1c696e`. La prueba ahora verifica ese enlace y comprueba por separado la ruta interna existente.
4. El primer lote completo de navegador usó una compilación con origen `localhost:3000` y servidor de prueba en `localhost:4563`, produciendo 403 en comprobaciones de solicitudes. Se recompiló con el origen de pruebas en el **proceso local**, sin editar `.env.local` ni debilitar el control de origen.

## Revisión visual y rendimiento

Las imágenes `preview-*.png` de esta carpeta son capturas de la **nueva presentación pública local**, no capturas de la plataforma operativa. Incluyen escritorio, módulos, IA, videos y móvil chino/japonés. Las capturas completas de prueba permanecen en `.local/`, fuera de Git.

Se utilizan componentes de servidor, imágenes con proporción reservada, optimización local de Next.js, carga de video bajo demanda y respeto por `prefers-reduced-motion`. No se ha medido Core Web Vitals de usuarios reales ni se atribuye una puntuación Lighthouse no ejecutada. Las imágenes y videos definitivos pueden cambiar el rendimiento y necesitan una nueva comprobación al incorporarlos.

Una muestra de Chrome local, escritorio 1440 × 1000, sin limitación artificial de red/CPU, registró LCP de **1,76 s (1.756 ms)**, CLS acumulado de **0** durante la carga inicial y **0** solicitudes de video. Es una observación de laboratorio aislada, no un percentil de producción ni una validación completa de Core Web Vitals; no se midió INP. Los recursos posteriores al documento sumaron 264.468 bytes transferidos en esa muestra.

## Archivos de implementación

Modificados:

- `next.config.ts`: allowlist de medios HTTPS para CSP.
- `src/app/[locale]/page.tsx`: tarjeta principal y entrada del archivo.
- `src/app/layout.tsx`: estilos de la presentación.
- `src/app/sitemap.ts`: ocho rutas nuevas sin duplicados.
- `src/app/redesign.css`: contraste del copyright.
- `src/components/project-archive.tsx`: enlace interno del nuevo caso.
- `src/lib/redesign-copy.ts`: introducción que ya no fija el catálogo en seis proyectos.
- `tests/e2e/redesign.spec.ts`: selectores acordes al catálogo existente.
- `README.md`: enlaces a documentación.

Añadidos:

- `src/app/[locale]/projects/demo-electronics/page.tsx` y `opengraph-image.tsx`.
- `src/app/electronics.css`.
- `src/components/electronics/featured-card.tsx`, `showcase.tsx`, `interactions.tsx`, `visuals.tsx`.
- `src/lib/electronics/types.ts`, `copy.ts`, `links.ts`, `project.ts`, `media.json`, `media.ts`, `media-policy.ts`.
- `src/lib/electronics/copy/{es,en,fr,de,it,zh,ja,pt}.ts`.
- `tests/unit/electronics.test.ts`, `tests/unit/electronics-player.test.ts`, `tests/e2e/electronics.spec.ts`.
- `public/electronics/README.md`.
- `docs/electronics/README.md`, `EVIDENCE.md`, `VERIFICATION.md` y capturas `preview-*.png`.

## Límites de entrega

Los archivos de video no se han proporcionado. Las capturas auténticas publicables también quedan pendientes; los esquemas están identificados como ilustraciones. La configuración y las instrucciones permiten sustituirlos sin editar varios componentes.

El código local de Demo Electronics se identificó por nombre, rama e interfaz, pero no se acreditó que su commit exacto sea el desplegado. La conexión Render disponible no permitió verificar el servicio indicado: 404 y ningún workspace seleccionado. No se hizo push, despliegue, cambio de configuración remota, migración ni edición de datos de producción. La carpeta ajena `qr/` queda intacta y fuera de los commits.
