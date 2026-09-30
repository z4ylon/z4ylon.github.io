import fallback from '@/data/events.json';
import { site } from '@/data/site';

export type ShowEvent = {
  id: string;
  date: string;
  end: string | null;
  title: string;
  venue: string;
  city: string;
  region: string;
  country: string;
  description: string;
  lineup: string[];
  url: string | null;
  soldOut: boolean;
};

export type EventsData = { upcoming: ShowEvent[]; past: ShowEvent[]; fetchedAt: string };

const API = 'https://rest.bandsintown.com/artists/Z4YLON/events';

// Convierte la respuesta cruda de Bandsintown al formato de la web
export function normalizeEvent(e: any): ShowEvent {
  return {
    id: String(e.id),
    date: e.datetime,
    end: e.ends_at || null,
    title: (e.title || e.venue?.name || '').trim(),
    venue: (e.venue?.name || '').trim(),
    city: e.venue?.city || '',
    region: e.venue?.region || '',
    country: e.venue?.country || '',
    description: (e.description || '').trim(),
    lineup: e.lineup || [],
    url: e.url ? String(e.url).split('?')[0] : null,
    soldOut: Array.isArray(e.offers) && e.offers.some((o: any) => o.status === 'sold out'),
  };
}

export const upcomingUrl = `${API}?app_id=${site.bandsintownAppId}&date=upcoming`;

let cache: Promise<EventsData> | undefined;

/** Eventos en tiempo de build: intenta Bandsintown y, si falla, usa la copia local. */
export function getEvents(): Promise<EventsData> {
  cache ??= (async () => {
    try {
      const get = async (d: string) => {
        const res = await fetch(`${API}?app_id=${site.bandsintownAppId}&date=${d}`, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error(String(res.status));
        return ((await res.json()) as any[]).map(normalizeEvent);
      };
      const [upcoming, past] = await Promise.all([get('upcoming'), get('past')]);
      return { upcoming, past, fetchedAt: new Date().toISOString() };
    } catch {
      return fallback as EventsData;
    }
  })().then((d) => ({
    ...d,
    upcoming: [...d.upcoming].sort((a, b) => a.date.localeCompare(b.date)),
    past: [...d.past].sort((a, b) => b.date.localeCompare(a.date)),
  }));
  return cache;
}

/** Los eventos privados se muestran sin datos personales, igual que en Bandsintown */
export const isPrivate = (e: ShowEvent) => /evento privado/i.test(e.title) || /evento privado/i.test(e.venue);

/** Extrae la línea de géneros de la descripción (p. ej. "COMERCIAL - LATINO - TECH HOUSE") */
export function genresOf(e: ShowEvent): string[] {
  const line = e.description.split('\n').find((l) => /^[A-ZÁÉÍÓÚÑ&' ]+( ?[-–] ?[A-ZÁÉÍÓÚÑ&' ]+){1,}$/.test(l.trim()));
  return line ? line.split(/ ?[-–] ?/).map((g) => g.trim()).filter(Boolean) : [];
}

export function cityStats(events: ShowEvent[]) {
  const map = new Map<string, number>();
  for (const e of events) {
    const c = e.city || 'Online';
    map.set(c, (map.get(c) ?? 0) + 1);
  }
  return [...map.entries()].map(([city, count]) => ({ city, count })).sort((a, b) => b.count - a.count);
}
