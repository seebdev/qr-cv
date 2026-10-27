import 'server-only';
import { createHmac } from 'node:crypto';
import { privilegedClient } from './supabase/server';
export class PayloadTooLargeError extends Error {}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const allowed = new URL(process.env.NEXT_PUBLIC_SITE_URL || request.url).origin;
  return origin === allowed;
}
export async function limitedBody(request: Request, max: number) {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > max) throw new PayloadTooLargeError('Payload too large.');
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      throw new PayloadTooLargeError('Payload too large.');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return bytes;
}
export async function rateLimit(request: Request, scope: string, limit: number, seconds: number) {
  const secret = process.env.CONTACT_RATE_LIMIT_SECRET;
  if (!secret) throw new Error('Rate limiter is not configured.');
  // Render appends the verified connecting address to X-Forwarded-For. Never trust the leftmost user-supplied entry.
  const ip = request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() || 'local';
  const day = new Date().toISOString().slice(0, 10);
  const key = createHmac('sha256', secret)
    .update(scope + ':' + day + ':' + ip)
    .digest('hex');
  const { data, error } = await privilegedClient().rpc('consume_rate_limit', {
    p_key: key,
    p_limit: limit,
    p_seconds: seconds,
  });
  if (error) throw error;
  return data === true;
}
