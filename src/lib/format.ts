const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const WEEKDAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

/** Las fechas de Bandsintown son hora local sin zona: se parsean a mano para no desplazarlas. */
export function parts(iso: string) {
  const [d, t = '00:00'] = iso.split('T');
  const [y, m, day] = d.split('-').map(Number);
  const [hh, mm] = t.split(':');
  const wd = new Date(Date.UTC(y, m - 1, day)).getUTCDay();
  return { year: y, month: MONTHS[m - 1], monthIndex: m - 1, day, weekday: WEEKDAYS[wd], time: `${hh}:${mm}` };
}

export function longDate(iso: string) {
  const p = parts(iso);
  return `${p.weekday} ${p.day} ${p.month} ${p.year}`;
}

/** Compara con "ahora" en hora local del visitante */
export function isFuture(iso: string, now = new Date()) {
  const p = parts(iso);
  const end = new Date(p.year, p.monthIndex, p.day, 23, 59);
  return end >= now;
}

export function cleanPlace(s: string) {
  return s.replace(/,?\s*Spain$/i, '').trim();
}

/** "EVENTO PRIVADO: Boda (Córdoba, Spain)" → { kind: 'Boda', place: 'Córdoba' } */
export function privateInfo(title: string) {
  const m = title.match(/evento privado\]?:?\s*(.+?)(?:\s*\(([^)]+)\))?\s*$/i);
  if (!m) return null;
  return { kind: m[1].trim(), place: m[2] ? cleanPlace(m[2]) : null };
}

export function titleCase(s: string) {
  if (s !== s.toUpperCase()) return s;
  return s.toLowerCase().replace(/(^|[\s(“"'-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
}
