// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Define SITE_URL con el dominio definitivo al desplegar (lo usan el sitemap, las URLs canónicas y Open Graph).
const site = process.env.SITE_URL || 'http://localhost:4321';
// Subdirectorio de publicación (p. ej. "/z4ylon-web" en GitHub Pages). Vacío o "/" para la raíz del dominio.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'never',
  integrations: [react(), sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  build: { format: 'file' },
  devToolbar: { enabled: false },
});
