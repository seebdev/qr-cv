# Evidencia del producto

## Identificación del código

Se localizaron varias versiones relacionadas. La carpeta sugerida inicialmente, `base-demo`, es un worktree de otro estado del repositorio; no se aceptó su nombre como prueba de identidad.

Fuente final revisada, solo lectura:

- Carpeta local: `quik sol global general/base de datos interfaz empleados quiksol/base quick`.
- Repositorio configurado: `https://github.com/sebastiannn1110-dotcom/quick-sol.git`.
- Rama: `rebrand/electronic-parts-demo`.
- HEAD: `e00164f3e1f95d64ce689a10d16cb346bc8bbe3a`.
- `app/layout.tsx`: nombre de aplicación y metadatos «Electronic Parts Demo».
- `lib/i18n.ts`: «Electronic Parts Intelligence» en el título principal.
- `components/Sidebar.tsx`: marca Electronic Parts, indicador DEMO y módulos coincidentes con la imagen aportada.
- El informe local `QUIKSOL_VERSION_NARANJA_AUDITORIA.md` distingue expresamente esta variante azul de las versiones Quiksol. Se usó como orientación; las afirmaciones publicadas se contrastaron con código.

La coincidencia de nombre, rama e interfaz identifica una fuente local apropiada. **No acredita que ese commit exacto esté desplegado en `demo-electronics.onrender.com`.** No se accedió a secretos, datos de clientes ni credenciales para comprobarlo.

## Matriz de afirmaciones

Rutas relativas a la fuente de Demo Electronics, no al portafolio:

| Área                       | Evidencia revisada                                                                                          | Alcance de la presentación                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Clientes                   | `app/clients/page.tsx`, `components/clients/ClientsDirectory.tsx`, captura aportada                         | Directorio y consulta de organizaciones; datos demo no equivalen a clientes reales.                                                                                      |
| Oportunidades              | `lib/opportunity-finder/matcher.ts`, `normalization.ts`, `classifier.ts`, `app/opportunity-finder/page.tsx` | Normalización y comparación MPN; clases de oportunidad, sin ventas o precisión garantizadas.                                                                             |
| Stock y necesidades        | `lib/stock-needs/stock-needs.ts`, `data-source.ts`                                                          | Stock, cobertura parcial, faltantes, estado desconocido y fuente de carga.                                                                                               |
| Búsqueda                   | `app/api/search/route.ts`, `app/executive-search/page.tsx`, `lib/security/business-records.ts`              | Búsqueda estructurada con contexto autenticado y campos permitidos, separada de IA generativa.                                                                           |
| IA                         | `app/api/assistant/route.ts`, `lib/ai/assistantCore.ts`, `database-tools.ts`, `ai-permissions.ts`           | Sesión, límites de solicitudes, herramientas autorizadas, ámbito, respuestas deterministas, contexto filtrado y OpenAI opcional. No acceso irrestricto ni certificación. |
| Chat                       | `app/chat/page.tsx`, `lib/chat/access.ts`                                                                   | Conversaciones, participantes y diferenciación del acceso de auditoría.                                                                                                  |
| Cargas                     | `app/upload/page.tsx`, `lib/upload/import-worker.ts`, dependencias `exceljs`, `xlsx`, `csv-parse`           | Excel/CSV, validación y procesos de fondo. No se ejecutaron importaciones ni benchmarks.                                                                                 |
| Usuarios                   | `lib/auth/roles.ts`, `components/Sidebar.tsx`, `app/profile/page.tsx`                                       | Roles y capacidades comprobadas en código, no auditadas en producción.                                                                                                   |
| Registros                  | `app/records/page.tsx`, `app/api/records/route.ts`                                                          | Consulta de registros y procedencia.                                                                                                                                     |
| Administración de clientes | `app/admin/clients/page.tsx`, rutas `new` y `[clientId]/edit`, `lib/auth/roles.ts`                          | Alta/edición y capacidad de gestión.                                                                                                                                     |
| Sourcing                   | `app/api/sourcing/requests/route.ts`, `requests/[requestId]/offers/route.ts`, `lib/sourcing/auth.ts`        | Solicitudes, ofertas y autorizaciones de gestión. No compra cerrada ni integración externa prometida.                                                                    |
| Stack                      | `package.json`, `app/layout.tsx`, imports del servidor                                                      | Next.js, React, TypeScript, Supabase/PostgreSQL, OpenAI. No se afirma la versión desplegada.                                                                             |

No se incluyeron como capacidades operativas verificadas las cotizaciones/RFQ: las variantes locales difieren y la presencia de bibliotecas o texto de metadatos no demuestra un flujo completo. Tampoco se atribuyeron al producto los controles de seguridad del repositorio del portafolio.

## Producción y acceso

El origen Git del portafolio coincide con `https://github.com/seebdev/qr-cv.git`. Se creó `feature/demo-electronics-showcase` antes de cambios significativos.

La consulta del servicio suministrado `srv-dbggcr8473hc73dv7fjg` devolvió 404 en el conector Render. La consulta del contexto indicó que no hay workspace seleccionado. Esto **no prueba que el servicio no exista**; significa que no se pudo establecer su correspondencia en la conexión disponible. No se cambió workspace, repositorio, rama desplegada, variables, configuración ni datos de servicios remotos. No se publicó.
