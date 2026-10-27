'use client';
import Image, { type ImageProps, type ImageLoaderProps } from 'next/image';

function bundledLoader({ src, width }: ImageLoaderProps) {
  const size = width <= 480 ? 480 : width <= 960 ? 960 : 1440;
  return src + '?w=' + size;
}

// These WebP variants are prepared once, not encoded again on each cold deployment.
export function PortfolioImage({ bundled, ...props }: ImageProps & { bundled: boolean }) {
  return <Image {...props} loader={bundled ? bundledLoader : undefined} />;
}
