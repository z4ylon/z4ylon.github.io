/**
 * Antepone la ruta base del sitio (config `base`) a las rutas internas.
 * Permite publicar la web en un subdirectorio, p. ej. GitHub Pages: usuario.github.io/repositorio
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function u(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  if (path === '/') return base || '/';
  return `${base}${path}`;
}
