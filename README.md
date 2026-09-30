# Z4YLON · Web oficial

Rediseño de la web de Z4YLON (antes en Wix) con **Astro 7 + React 19**. Mismo contenido que la web original y el dossier 2026, reorganizado y ampliado.

## Puesta en marcha

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera la web estática en dist/
npm run preview    # sirve dist/ en local
npm run check      # comprobación de tipos
```

Copia `.env.example` a `.env` y completa:

| Variable | Para qué sirve |
| --- | --- |
| `SITE_URL` | Dominio definitivo. Lo usan el sitemap, las URLs canónicas y las tarjetas de redes sociales. |
| `PUBLIC_FORM_ENDPOINT` | Servicio que recibe el formulario (Formspree, Web3Forms…). Sin él, el formulario abre el correo del visitante con el mensaje ya redactado. |
| `BASE_PATH` | Subdirectorio si la web no está en la raíz del dominio (p. ej. `/z4ylon-web`). En GitHub Pages lo pone el flujo automáticamente. |
| `PUBLIC_NOINDEX` | `true` para que los buscadores no indexen la web (útil en demos). |

## Publicación en GitHub Pages

El flujo `.github/workflows/deploy.yml` compila y publica la web en cada push a `main` y, además, una vez al día para refrescar la agenda de Bandsintown.

1. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Haz push a `main` (o lanza el flujo a mano desde la pestaña **Actions**).
3. La web queda en `https://<usuario>.github.io/<repositorio>/`. Con dominio propio, configúralo en la misma pantalla de Pages y las rutas se ajustan solas.

Mientras sea una demo, el flujo publica con `PUBLIC_NOINDEX=true`; quítalo cuando sea la web oficial. Para el formulario, crea la variable `PUBLIC_FORM_ENDPOINT` en **Settings → Secrets and variables → Actions → Variables**.

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| Textos, bio, FAQs, redes, contacto, rider, servicios, sesiones y playlists | `src/data/site.ts` |
| Shows | Se leen de **Bandsintown** al compilar y se refrescan en el navegador. Copia de respaldo en `src/data/events.json`. Para añadir un show, publícalo en Bandsintown. |
| Imágenes | `src/assets/…` (Astro genera AVIF/WebP en varios tamaños) |
| Vídeos | `public/media/…` |
| Dossier PDF | `public/press/z4ylon-dossier-2026.pdf` y sus páginas en `src/assets/dossier/` |
| Colores y tipografía | tokens al principio de `src/styles/global.css` |

`npm run fetch:assets` vuelve a descargar las imágenes y los vídeos de la web de Wix si hiciera falta.

## Estructura

```
src/
  pages/          index, shows, musica, press-kit, diseno, contacto, faqs, legal, 404
  layouts/        Base.astro (SEO, datos estructurados, navegación entre páginas, reproductor)
  components/     Componentes Astro (sin JavaScript en el navegador)
    react/        Islas interactivas: MixPlayer, ShowsExplorer, MediaGallery, BookingForm…
  data/           Contenido (site.ts) y copia de eventos (events.json)
  lib/            Utilidades: eventos, imágenes, formato de fechas, iconos
```

## Mejoras respecto a la web de Wix

- **Reproductor persistente**: las sesiones de Mixcloud siguen sonando mientras navegas (Astro `ClientRouter` + `transition:persist`).
- **Shows**: agenda sincronizada con Bandsintown, archivo completo de 80 eventos con búsqueda y filtro por año, y mapa de eventos por ciudad y región.
- **Press kit**: el dossier se puede consultar online página a página (no solo como PDF de 16 MB), con fotos de prensa descargables en alta resolución, rider, equipo y guía de marca.
- **Formulario**: validación accesible, preselección según el servicio pulsado (`/contacto?servicio=logo`, `visuales`, `flyers`, `show`…) y alternativa por email.
- **Rendimiento**: HTML estático, imágenes AVIF/WebP responsive, vídeos con carga diferida, fuentes locales (sin Google Fonts), JavaScript solo en las islas interactivas.
- **Accesibilidad**: HTML semántico, enlace "Saltar al contenido", foco visible, contraste AA, navegación por teclado en menús, pestañas y visor; textos alternativos en todas las imágenes; se respeta `prefers-reduced-motion`; el vídeo de fondo se puede pausar.
- **Privacidad**: sin cookies propias ni analítica; Mixcloud y Spotify solo se cargan al pulsar play, así que no hace falta banner de cookies al entrar.
- **SEO**: títulos y descripciones por página, Open Graph, sitemap, `robots.txt` y datos estructurados (Person, MusicEvent, FAQPage).

## Antes de publicar

1. **Textos legales**: revisa `src/pages/legal.astro` y añade nombre completo y NIF del titular (lo exige la LSSI-CE).
2. **Formulario**: configura `PUBLIC_FORM_ENDPOINT` si quieres recibir los mensajes sin depender del correo del visitante.
3. **Dominio**: define `SITE_URL`.
4. **Hosting**: GitHub Pages ya está preparado (ver arriba); también vale cualquier hosting estático (Netlify, Vercel, Cloudflare Pages…). En Cloudflare Pages cada archivo debe pesar menos de 25 MB y `public/media/visuals/visual-11.mp4` pesa 34 MB: comprímelo o súbelo a otro sitio.
