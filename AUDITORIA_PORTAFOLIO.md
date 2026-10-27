# Auditoría del portafolio

Fecha: 10 de octubre de 2026, America/Bogota. Proyecto: Sebastián Solórzano Carvajal.

## Estado y entorno

**Estado: funcional y verificado en local.** Se completaron 22 pruebas distintas de navegador en varias ejecuciones: 20 de la suite general, una adicional de navegación administrativa y una de recuperación real. El evento original que originó la inconsistencia del servidor sigue sin determinarse.

La portada original volvió a funcionar tanto en desarrollo como en una compilación de producción ejecutada localmente. Se conserva el diseño, las traducciones, los textos y los controles de acceso. No se desplegó, publicó ni hizo push; tampoco se aplicaron migraciones ni se reseteó ninguna base de datos.

La carpeta real es `C:\Users\sebas\OneDrive\Escritorio\sebastian solorzano carvajal`. Es una aplicación Next.js con App Router en `src/app`, sin monorepo ni otra raíz efectiva. El gestor es npm y el lockfile es `package-lock.json`.

| Componente | Comprobación |
| --- | --- |
| Next.js | 16.3.5 en package.json, lockfile e instalación |
| React | 19.3.0 en lockfile e instalación |
| Supabase JS / SSR | 2.116.0 / 0.12.7, sin actualizar dependencias |
| Node global inicial | 20.19.6; no cumple el rango declarado `>=22.16.0 <23` |
| Node usado para la auditoría | `.local/node.exe`, 22.16.0 |
| npm / Supabase CLI | 10.8.2 / 2.75.0 |
| Base de datos | Supabase local, API en 127.0.0.1:54321, PostgreSQL 17.6 en Docker |
| Navegador | Chrome real mediante los tests Playwright del repositorio |
| Git | Todo el proyecto ya estaba sin seguimiento al comenzar; no había una base de archivos versionados para un diff convencional |

Se leyeron README, INICIO, documentación de arquitectura/verificación, configuración, scripts y pruebas. No había AGENTS.md aplicable al inicio. Next.js generó posteriormente AGENTS.md y CLAUDE.md; se leyeron sus instrucciones y la documentación de la versión instalada antes de las correcciones.

## 404: evidencia, recuperación y límite causal

**Hecho reproducido:** el proceso de desarrollo original en 127.0.0.1:3000 devolvía HTTP 404 para `/`, `/en`, `/es`, `/admin/login` y `/api/health`. Incluso el endpoint de salud, que sí tiene archivo de ruta, terminaba en la página 404. Se confirmó que era este proyecto mediante el PID 7188, su proceso padre y el comando con la ruta completa del repositorio. Solo se detuvieron procesos identificados de este portafolio.

**Estado defectuoso observado:** `.next/dev/types/routes.d.ts` declaraba `AppRoutes = never` y `LayoutRoutes = never`, aunque los archivos existían y algunos aparecían compilados en `.next/dev/server/app-paths-manifest.json`. Además, ese archivo de tipos y `validator.ts` contenían fragmentos duplicados/truncados. TypeScript produjo TS1128, TS1109, TS1005 y TS1002 en esos artefactos. La copia conservada está en `.local/next-before-audit-20261010/dev/types/`.

El problema se localizó en el estado de descubrimiento de rutas del servidor de desarrollo, no en una portada ausente. En la implementación instalada, `node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js` construye el inventario de rutas desde Watchpack y vacía/rellena `appFiles`. Un inventario vacío deja las rutas de aplicación sin reconocimiento. El archivo de tipos es evidencia de ese inventario; **no se afirma que Next.js lea ese `.d.ts` para resolver las peticiones**.

`src/app/page.tsx` existe y solamente lee `portfolio_locale`, redirigiendo a `/es` si vale `es`, o a `/en` en los demás casos. No contiene `notFound()`. El layout y la página de `[locale]` solo rechazan idiomas distintos de `en` y `es`. El proxy original no redirige `/` y no hay basePath, pageExtensions personalizadas ni reescrituras que expliquen el 404 global.

**Corrección mínima de recuperación:** reiniciar el proceso identificado usando Node 22, detenerlo después para conservar íntegramente `.next` en una carpeta local de respaldo y generar artefactos nuevos. La raíz ya recuperó HTTP 307 tras el primer reinicio, antes de modificar lógica de la aplicación. La compilación limpia registró todas las rutas. Una segunda sesión de desarrollo con caché nueva también respondió correctamente en el puerto 3001; luego fue cerrada. El archivo `src/app/page.tsx` y la estructura de rutas públicas permanecieron intactos.

**Límite:** no se pudo demostrar qué evento original dejó vacío/inconsistente el inventario del proceso anterior ni qué originó la corrupción de archivos generados. No hay una condición defectuosa demostrada en un archivo de portada que justifique cambiarla. Node 20 fuera del rango requerido y la ubicación en OneDrive son datos del entorno, no causas probadas. No se atribuye el incidente a Console Ninja, a OneDrive ni a `serverActions`. El aviso de Console Ninja reapareció durante el arranque de desarrollo que sí funcionó; la configuración `experimental.serverActions.bodySizeLimit` es válida en la documentación instalada y se conservó.

## Hallazgos y correcciones

| Severidad | Hallazgo y evidencia | Corrección / resultado |
| --- | --- | --- |
| Alta | Todas las rutas del proceso inicial daban 404, con inventario generado vacío | Reinicio controlado, respaldo y regeneración de artefactos; portada original recuperada |
| Alta | Docker estaba apagado; después PostgreSQL pasó por recuperación automática tras un cierre no limpio. Salud devolvió 503 | Arranque de Docker, conservación de los volúmenes y espera de la recuperación. PostgreSQL, Auth, Storage y gateway quedaron saludables; `/api/health` pasó a 200 |
| Alta | Tipos generados corruptos impedían TypeScript | Conservación de `.next` antiguo y compilación limpia; typecheck volvió a terminar con código 0 |
| Media | Editor y vista previa descartaban el error de consulta y respondían `notFound()` si no había datos | Distinguir fallo de consulta de fila inexistente; UUID inválido sigue dando 404 tras exigir autorización |
| Media | Fallos de la consulta del perfil podían cerrar la sesión y presentarse como acceso denegado | `maybeSingle()` distingue perfil ausente de error; el error se muestra sin conceder permisos ni cerrar una sesión por un fallo de consulta |
| Media | Errores al firmar URLs de imágenes/CV se ocultaban como recursos ausentes | Propagar un error descriptivo sin credenciales a la pantalla de recuperación |
| Media | Botón de error usaba `reset`, que solo limpia el límite de error en esta versión | Usar `retry`, API instalada que vuelve a solicitar los datos del segmento |
| Media | JSON malformado y cuerpos excesivos en contacto devolvían 503 con la base de datos sana; reproducido por HTTP | Respuestas 400 y 413, respectivamente. Mismo tratamiento en eventos, conservando analytics desactivado |
| Media | Acciones de proyecto/medio confiaban en la unión TypeScript para valores recibidos en ejecución | Validación Zod de las acciones permitidas, además de la autorización existente |
| Media | Marcar mensajes leídos y retirar archivos podía ocultar fallos | Comprobar errores de consulta y eliminación; informar cuando se quitó la referencia pero falló la limpieza en Storage |
| Media | E2E de escritura no exigían explícitamente destino local y el ciclo admin no limpiaba si una aserción fallaba | Guardia de entorno, limpieza en `finally` limitada al slug único de la prueba; trazas de login desactivadas para no registrar contraseñas/sesiones |

La lectura de catálogos públicos ya distinguía conexión fallida de lista vacía. Se conservó ese comportamiento y se comprobaron los estados vacíos reales: el catálogo no contenía proyectos al comenzar.

## Archivos modificados

- `src/app/error.tsx`: reintento que solicita nuevamente los datos.
- `src/lib/data.ts`: errores explícitos de Storage.
- `src/lib/auth.ts`: distinguir error de consulta y falta de autorización.
- `src/lib/http.ts`: tipo identificable para cuerpo excesivo.
- `src/app/api/contact/route.ts`: códigos HTTP para JSON inválido y límite de tamaño.
- `src/app/api/events/route.ts`: igual validación y manejo del error de consulta del proyecto.
- `src/app/admin/actions.ts`: validar nombres de acciones y comprobar resultados antes de informar éxito.
- `src/app/admin/(protected)/projects/[id]/page.tsx` y `preview/[id]/page.tsx`: errores de datos distintos de 404.
- `tests/e2e/public.spec.ts`: regresiones de raíz, cookie de idioma, 404, subida anónima y validación HTTP.
- `tests/e2e/admin.spec.ts`: recarga de sesión/datos, logout, navegación del estudio, limpieza y protección de trazas.
- `tests/e2e/contact.spec.ts`: guardia del entorno y limpieza del mensaje y del contador de prueba únicamente si fue creado por esa ejecución.
- Nuevos `tests/e2e/test-environment.ts`, `diagnostics.spec.ts` y `recovery.spec.ts`: guardia compartida, consola/red/capturas y prueba opcional de caída real de PostgREST local.
- `INICIO.md`: instrucciones de Node, arranque y diagnóstico de salud para esta máquina.
- `AUDITORIA_PORTAFOLIO.md`: este informe.

Cambios generados/locales: AGENTS.md y CLAUDE.md creados por Next.js; next-env.d.ts actualizado por sus comandos; token local de aprovisionamiento renovado mediante el script existente, sin imprimirlo. Se conservaron versiones originales de los archivos editados en `.local/audit-original/`. No se modificaron package.json, package-lock.json, next.config.ts ni las migraciones.

## Comandos y resultados

Todos los comandos npm de esta auditoría utilizaron el Node 22 local anteponiendo `.local` al PATH de su proceso.

| Comando / comprobación | Resultado observado |
| --- | --- |
| HTTP inicial en puerto 3000 | FAIL: 404 global reproducido |
| Primer `npm run typecheck` con artefactos antiguos | FAIL: sintaxis corrupta en `.next/dev/types` |
| `npm run lint` final | PASS, código 0 |
| `npm run typecheck` tras regenerar | PASS, código 0 |
| `npm test` | PASS, 18/18 |
| `npm run build` final | PASS, compilación, TypeScript y generación de 13 páginas estáticas; rutas dinámicas y proxy registrados |
| `npm run start -- --hostname 127.0.0.1 --port 3000` | PASS, arranque de la compilación final y respuestas HTTP reales |
| `node scripts/refresh-local-auth.mjs` | PASS; renovación del token ya existente exclusivamente para pruebas locales |
| `npm run test:db` | PASS, RLS y Storage reales, sin mocks |
| `npm run test:e2e -- --grep-invert 'real database API outage'` | PASS, 20/20 en la primera ejecución completa tras corregir la configuración de trazas |
| Prueba opt-in de caída real y recuperación (`E2E_LOCAL_RECOVERY=true`, `recovery.spec.ts --reporter=list`) | PASS, 1/1: salud 503, pantalla de error real, arranque de PostgREST y recuperación mediante Reintentar |
| Navegación administrativa adicional (`admin.spec.ts --grep 'all studio sections' --reporter=list`) | PASS, 1/1: ajustes, tecnologías, experiencia, mensajes, analytics y nuevo proyecto; UUID inválido conserva 404 |
| Repetición de contacto después de reforzar limpieza (`contact.spec.ts --reporter=list`) | PASS, envío 201 y eliminación del mensaje y de su contador nuevo; sin filas temporales restantes |
| Escaneo de `.next/static` contra secretos configurados | PASS, ninguna coincidencia de credenciales privadas |
| Comparación de IDs con el estado previo | PASS, proyectos, medios, mensajes, experiencia, tecnologías y perfiles originales conservados |
| Desarrollo limpio en 3001 | PASS: `/` 307; `/en`, `/es`, login y salud 200; ruta inexistente 404 |

Se registró un intento inicial de E2E que falló antes de abrir el navegador por colocar `test.use({ trace })` dentro de un describe. Se movió al nivel superior del archivo y se repitió con éxito. Una comprobación de conservación ejecutada durante la interrupción intencional recibió el error real del servicio y se repitió después de restaurarlo; entonces pasó. La primera prueba de caída mostró correctamente la pantalla de error, pero agotó el tiempo esperando el evento `load` de un documento fallido en streaming; se ajustó para observar la pantalla interactiva tras `commit`, sin eliminar la aserción ni ocultar el error.

Los avisos de colores NO_COLOR/FORCE_COLOR y el aviso PRO de Console Ninja son informativos. Los mensajes de error de conexión provocados deliberadamente durante la prueba de caída son esperados y se separan de los flujos normales.

## Rutas y flujos verificados

| Ruta / flujo | Evidencia |
| --- | --- |
| `/` | 307 a `/en`; cookie `es` lleva a `/es`; cookie inválida vuelve a `/en` |
| `/en`, `/es` | 200 y encabezados originales “I build systems…” / “Construyo sistemas…” |
| `/projects` | 307 a `/en#archive` |
| `/projects/[slug]` | Alias hacia `/en/projects/[slug]`; proyecto ausente conserva 404 |
| `/en/projects/[slug]` | Borrador 404; publicado visible con imagen decodificada; tras despublicar vuelve a quedar privado |
| `/fr`, ruta desconocida, proyecto inexistente | 404 legítimo |
| `/resume` sin PDF | 200 con el estado previsto de CV en actualización y alternativa de contacto |
| `/admin` y rutas protegidas sin sesión | Redirección al login |
| `/api/admin/upload` sin sesión | Rechazo mediante redirección al login antes de procesar archivos |
| Ciclo admin | Login, cookie HttpOnly, recarga conservando sesión, crear/editar/recargar, archivo dañado rechazado, PNG real subido y publicado, duplicar, despublicar, borrar solo fixtures, logout y bloqueo posterior |
| Contacto | Envío visible 201, mensaje comprobado en inbox privado y eliminado por su nombre único; origen ajeno 403, campos inválidos 400, JSON inválido 400, cuerpo excesivo 413 |
| `/api/health` | 503 cuando la API no está disponible, 200 `status: ok` con servicio real |
| OG, sitemap, robots e icono | 200, con tipos de contenido adecuados |
| Idiomas y navegación | Persistencia del idioma, atributo html lang, menú móvil y paleta de comandos |
| Escritorio/móvil | 375, 390, 430, 768, 1024, 1440 y 1920 px, sin desbordamiento horizontal |
| Accesibilidad | Axe sin infracciones automáticas WCAG A/AA evaluadas en ambas portadas |
| Consola/red | Cero errores de página/consola y cero recursos HTTP fallidos en las capturas normales EN/escritorio y ES/móvil |

La prueba de base de datos utiliza sesiones reales anon, miembro y service: comprueba aislamiento de borradores y sus hijos, rechazo de escrituras y de escalada de privilegios, RPC restringidas y límite de frecuencia atómico. Storage comprueba subida/descarga real, privacidad del borrador, acceso al publicar, bloqueo de enlaces nuevos al despublicar y registro público deshabilitado.

## Datos, límites y arranque

Estado previo confirmado: 0 proyectos, 0 medios, 0 mensajes, 0 experiencias, 14 tecnologías y 1 perfil. El contenido temporal de las pruebas se identificó explícitamente y se eliminó; no se inventaron proyectos para llenar el portafolio. La verificación de IDs preserva los registros iniciales. También se eliminó exclusivamente el contador de contacto de un solo hit creado por esta prueba después de la captura inicial; no se tocaron límites históricos o compartidos. Las credenciales solo se consumieron desde `.env.local`, sin mostrarlas; `.env.example` sigue sin secretos.

La comprobación es local, incluso cuando se denomina “producción”: significa `next build` seguido de `next start`. No valida Render, un dominio público ni un Supabase remoto. No se probó una cartera poblada con contenidos profesionales reales. CV y foto reales no existían para comprobar su visualización; no se sustituyeron ajustes del usuario por fixtures. Analytics permanece desactivado; no se afirma que se haya probado la recepción de eventos con esa función activada. No se volvieron a medir Lighthouse ni las puntuaciones históricas de septiembre. Axe no reemplaza una revisión manual con tecnologías de asistencia.

Para abrir: http://127.0.0.1:3000/ o http://127.0.0.1:3000/es. Administrador: http://127.0.0.1:3000/admin/login, con la cuenta local ya indicada en INICIO.md y su contraseña guardada en `.env.local`.

Para volver a arrancar desde PowerShell en esta carpeta, con Docker y Supabase local saludables:

```powershell
$env:PATH = (Join-Path (Get-Location) '.local') + ';' + $env:PATH
node --version
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

Para desarrollo, detén el servidor que ocupa 3000 y usa `npm run dev`. No ejecutes dos servidores sobre el mismo puerto ni dos escritores sobre los mismos artefactos. No hace falta resetear datos para reparar archivos generados de Next.js.

Evidencias locales: `.local/audit-build.log`, `.local/audit-http.json`, `.local/audit-dev-http.json`, `.local/audit-screenshots/`, `playwright-report/` y el respaldo de artefactos. Los archivos auxiliares de diagnóstico y las copias originales permanecen excluidos de Git.

Referencias contrastadas: documentación incluida en Next.js 16.3.5 para error/retry, distDir y serverActions; [serverActions oficial](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions), [Supabase maybeSingle](https://supabase.com/docs/reference/javascript/maybesingle), [URLs firmadas](https://supabase.com/docs/reference/javascript/storage-from-createsignedurl) y [changelog de Supabase](https://supabase.com/changelog.md). No se introdujo una actualización de versión para solucionar el incidente.
