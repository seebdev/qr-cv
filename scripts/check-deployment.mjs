// Render supplies these variables before build; never load local credentials here.
const errors = [];
for (const name of ['NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_SUPABASE_URL']) {
  try {
    const url = new URL(process.env[name] || '');
    if (url.protocol !== 'https:' || url.username || url.password ||
        url.pathname !== '/' || url.search || url.hash ||
        /^(localhost|127\.|0\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[::1\])/.test(url.hostname) ||
        url.hostname.endsWith('.local')) throw new Error();
  } catch {
    errors.push(name + ' debe ser un origen HTTPS público, sin ruta ni credenciales.');
  }
}
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
if (!key) errors.push('Falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.');
if (key.startsWith('sb_secret_')) errors.push('La clave pública no puede ser una clave secreta.');
if (key.split('.').length === 3) {
  try {
    const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString());
    if (payload.role !== 'anon') errors.push('La clave JWT pública debe tener rol anon.');
  } catch { errors.push('La clave pública JWT no es válida.'); }
}
if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true' &&
    (!process.env.SUPABASE_SECRET_KEY || !process.env.CONTACT_RATE_LIMIT_SECRET)) {
  errors.push('Analytics requiere las dos variables privadas de servidor.');
}
if (errors.length) {
  console.error('Configuración de despliegue incompleta:\n- ' + errors.join('\n- '));
  process.exitCode = 1;
} else {
  console.log('Variables de despliegue válidas. No se han comprobado credenciales ni conectividad remota.');
}
