param([switch]$Build)
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
$runtime = if (Test-Path '.local/node.exe') { Join-Path (Get-Location) '.local/node.exe' } else { 'node' }
$version = & $runtime -p 'process.versions.node'
if ($version -notmatch '^22\.') { throw 'Este proyecto necesita Node.js 22.16 o posterior de la rama 22.' }
$env:PATH = (Split-Path $runtime) + ';' + $env:PATH
$env:NEXT_PUBLIC_SITE_URL = 'http://localhost:4563'
if ($Build -or !(Test-Path '.next/BUILD_ID')) {
  & $runtime node_modules/next/dist/bin/next build --webpack
  if ($LASTEXITCODE -ne 0) { throw 'La compilación falló.' }
}
& $runtime node_modules/next/dist/bin/next start --hostname 0.0.0.0 --port 4563
