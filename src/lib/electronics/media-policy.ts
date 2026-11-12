export type MediaKind = 'video' | 'image' | 'captions';
const extensions = {
  video: /\.(mp4|webm)$/i,
  image: /\.(png|jpe?g|webp|avif)$/i,
  captions: /\.vtt$/i,
};

export function isMediaSource(
  value: unknown,
  kind: MediaKind,
  origins: readonly string[],
): value is string {
  if (typeof value !== 'string' || !value || /[\s\\]/.test(value)) return false;
  if (value.startsWith('/')) {
    return (
      /^\/electronics\/[a-zA-Z0-9/_.-]+$/.test(value) &&
      !value.split('/').some((part) => part === '.' || part === '..') &&
      extensions[kind].test(value)
    );
  }
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !url.hash &&
      origins.includes(url.origin) &&
      extensions[kind].test(url.pathname)
    );
  } catch {
    return false;
  }
}

export function validMediaOrigins(origins: readonly string[]) {
  return origins.filter((origin) => {
    try {
      const u = new URL(origin);
      return u.protocol === 'https:' && u.origin === origin;
    } catch {
      return false;
    }
  });
}
