import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { u } from '@/lib/url';
import type { MediaItem } from '@/components/react/MediaGallery';

const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

/** Devuelve los metadatos de una imagen de src/assets, p. ej. img('presskit/photo-rojo.jpg') */
export function img(path: string): ImageMetadata {
  const m = all[`/src/assets/${path}`];
  if (!m) throw new Error(`Imagen no encontrada: ${path}`);
  return m.default;
}

export function list(folder: string): { path: string; meta: ImageMetadata }[] {
  return Object.entries(all)
    .filter(([k]) => k.startsWith(`/src/assets/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => ({ path: k.replace('/src/assets/', ''), meta: v.default }));
}

/** Miniatura responsive (srcset) para islas React */
export async function thumb(meta: ImageMetadata, widths = [360, 540, 800], format: 'webp' | 'avif' = 'webp') {
  const valid = widths.filter((w) => w <= meta.width);
  const r = await getImage({ src: meta, widths: valid.length ? valid : [meta.width], format, quality: 78 });
  const w = valid.at(-1) ?? meta.width;
  return { src: r.src, srcset: r.srcSet.attribute, width: w, height: Math.round((meta.height / meta.width) * w) };
}

/** Imagen grande para visores y descargas */
export async function large(meta: ImageMetadata, width = 1800, format: 'webp' | 'jpg' | 'png' = 'webp') {
  const r = await getImage({ src: meta, width: Math.min(width, meta.width), format, quality: 85 });
  return r.src;
}

export async function imageItem(path: string, alt: string, opts: { caption?: string; download?: boolean; widths?: number[] } = {}): Promise<MediaItem> {
  const meta = img(path);
  return {
    type: 'image',
    thumb: await thumb(meta, opts.widths),
    full: await large(meta),
    alt,
    caption: opts.caption,
    download: opts.download ? await large(meta, 3000, 'jpg') : undefined,
  };
}

export async function videoItem(name: string, folder: string, alt: string, caption?: string): Promise<MediaItem> {
  const meta = img(`posters/${name}.jpg`);
  return {
    type: 'video',
    thumb: await thumb(meta, [360, 540]),
    full: await large(meta, 1280),
    video: u(`/media/${folder}/${name}.mp4`),
    alt,
    caption,
  };
}
