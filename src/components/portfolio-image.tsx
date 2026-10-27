'use client';
import Image, { type ImageProps, type ImageLoaderProps } from 'next/image';
import assets from '@/lib/public-cover-assets.json';

// The six published marketing captures are static, versioned assets.
// Other media, including private previews, retain the normal protected path.
export function PortfolioImage({ bundled, ...props }: ImageProps & { bundled: boolean }) {
  const id = typeof props.src === 'string' ? props.src.split('/').pop() : undefined;
  const asset = bundled && id ? assets[id as keyof typeof assets] : undefined;
  function staticLoader({ width }: ImageLoaderProps) {
    const size = width <= 480 ? 480 : width <= 960 ? 960 : 1440;
    return asset!.sources[size];
  }
  return <Image {...props} loader={asset ? staticLoader : undefined}
    placeholder={asset ? 'blur' : props.placeholder}
    blurDataURL={asset ? asset.blur : props.blurDataURL} />;
}
