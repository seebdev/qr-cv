# Tu portafolio

La vista local está disponible en http://127.0.0.1:3000/en y http://127.0.0.1:3000/es.
El administrador está en http://127.0.0.1:3000/admin/login.

## Acceso local

- Correo: portfolio-admin@example.test
- Contraseña: el valor ADMIN_PASSWORD de tu archivo local .env.local.
- Ese archivo está excluido de Git y no debe publicarse.
- La cuenta es únicamente para revisar esta instalación local.

Supabase local debe estar activo en Docker Desktop. El sitio utiliza PostgreSQL, Auth y Storage reales. El formulario guarda los mensajes en /admin/messages.

## Primero, carga tu contenido

1. En Settings, añade tu correo, GitHub, LinkedIn, CV en PDF y fotografía opcional. Puedes editar los textos en inglés y español.
2. Crea un proyecto como borrador. Completa ambas traducciones, tecnologías, contenido del caso de estudio y métricas comprobables.
3. Sube las imágenes, define sus textos alternativos y selecciona una portada.
4. Usa Preview y publica cuando esté listo. Marca Featured y asigna el orden para los destacados.
5. Repite con tus mejores proyectos. La web muestra hasta seis destacados.

No se incluyeron proyectos, experiencia, clientes ni resultados profesionales inventados. Los archivos de prueba temporales fueron eliminados.

## Reiniciar la web local en esta máquina

Desde esta carpeta, con Supabase local activo:

```powershell
& .\.local\node.exe .\node_modules\next\dist\bin\next start --hostname 127.0.0.1 --port 3000
```

Para desarrollo, utiliza Node 22.16 o superior dentro de la rama 22 y npm run dev. El ejecutable de .local es una herramienta local excluida de Git.

En esta máquina, el Node global era 20.19.6. Para que npm también use el Node 22 del proyecto, abre PowerShell en esta carpeta y ejecuta:

```powershell
$env:PATH = (Join-Path (Get-Location) '.local') + ';' + $env:PATH
node --version
npm run dev
```

Usa un solo servidor en el puerto 3000. Para abrir la compilación de producción local, detén antes desarrollo y ejecuta:

```powershell
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

Docker Desktop debe estar iniciado; los contenedores locales conservados del portafolio deben estar saludables. Comprueba http://127.0.0.1:3000/api/health: debe devolver `{"status":"ok"}`. Un 503 indica que la conexión todavía no está disponible; no es un catálogo vacío y no requiere resetear la base de datos.

La auditoría del 10 de octubre de 2026 recuperó el servidor que devolvía 404, conservó los artefactos anteriores en `.local/next-before-audit-20261010` y verificó desarrollo y producción local. Consulta [AUDITORIA_PORTAFOLIO.md](AUDITORIA_PORTAFOLIO.md) para resultados y límites de la causa identificada.

## Publicar

El proyecto incluye render.yaml, migraciones SQL y .env.example. Antes de desplegar, hay que seleccionar el proyecto remoto de Supabase y configurar sus credenciales y el dominio real. No se modificó el proyecto remoto existente ni se creó un servicio de pago.

Consulta README.md para instalación y Render, docs/ARCHITECTURE.md para la arquitectura, y docs/VERIFICATION.md para las pruebas y limitaciones verificadas.
