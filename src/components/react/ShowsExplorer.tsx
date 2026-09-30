import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import Icon from './Icon';
import s from './ShowsExplorer.module.css';
import type { ShowEvent } from '@/lib/events';
import { cleanPlace, isFuture, parts, privateInfo, titleCase } from '@/lib/format';

type Props = {
  upcoming: ShowEvent[];
  past: ShowEvent[];
  /** URL de la API pública para refrescar los próximos shows sin recompilar */
  refreshUrl?: string;
  variant?: 'full' | 'compact';
  bandsintownUrl: string;
};

const PAGE = 18;

function genresOf(e: ShowEvent) {
  const line = e.description.split('\n').find((l) => /^[A-ZÁÉÍÓÚÑ&' ]+( ?[-–] ?[A-ZÁÉÍÓÚÑ&' ]+){1,}$/.test(l.trim()));
  return line ? line.split(/ ?[-–] ?/).map((g) => g.trim()).filter(Boolean).slice(0, 4) : [];
}

function EventRow({ e, upcoming }: { e: ShowEvent; upcoming?: boolean }) {
  const p = parts(e.date);
  const priv = privateInfo(e.title) ?? privateInfo(e.venue);
  const name = priv ? priv.kind : titleCase(e.venue || e.title);
  const place = priv?.place ?? cleanPlace([e.city, e.region].filter(Boolean).join(', '));
  const genres = genresOf(e);
  const online = !e.city;

  return (
    <li className={s.row}>
      <time className={s.date} dateTime={e.date}>
        <span className={s.weekday}>{p.weekday}</span>
        <span className={s.day}>{String(p.day).padStart(2, '0')}</span>
        <span className={s.month}>
          {p.month} {p.year}
        </span>
      </time>
      <div className={s.info}>
        <h3 className={s.name}>
          {priv && <span className={s.badge}>Privado</span>}
          {online && <span className={s.badge}>Online</span>}
          {name}
        </h3>
        <p className={s.place}>
          <Icon name="mapPin" size={15} />
          {online ? 'Actuality FM · Emisión online' : place || cleanPlace(e.city)}
          {upcoming && p.time !== '00:00' && (
            <>
              <span aria-hidden="true">·</span>
              <Icon name="clock" size={15} />
              {p.time} h
            </>
          )}
        </p>
        {genres.length > 0 && (
          <ul className={s.genres} role="list" aria-label="Estilos">
            {genres.map((g) => (
              <li key={g}>{titleCase(g)}</li>
            ))}
          </ul>
        )}
      </div>
      <div className={s.cta}>
        {upcoming ? (
          priv ? (
            <span className={s.status}>Evento privado</span>
          ) : e.url ? (
            <a className="btn btn--sm" href={e.url} target="_blank" rel="noopener noreferrer">
              Info y entradas
              <span className="sr-only"> de {name} (Bandsintown, nueva pestaña)</span>
            </a>
          ) : null
        ) : e.url ? (
          <a className={s.more} href={e.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${name} en Bandsintown (nueva pestaña)`}>
            <Icon name="arrowUpRight" size={18} />
          </a>
        ) : null}
      </div>
    </li>
  );
}

export default function ShowsExplorer({ upcoming: initialUpcoming, past: initialPast, refreshUrl, variant = 'full', bandsintownUrl }: Props) {
  const uid = useId();
  const [upcoming, setUpcoming] = useState(initialUpcoming);
  const [past, setPast] = useState(initialPast);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<string>('all');
  const [limit, setLimit] = useState(PAGE);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Al hidratar: mueve al archivo los shows que ya pasaron y refresca desde Bandsintown
  useEffect(() => {
    const now = new Date();
    const expired = initialUpcoming.filter((e) => !isFuture(e.date, now));
    if (expired.length) {
      setUpcoming((u) => u.filter((e) => isFuture(e.date, now)));
      setPast((p) => [...expired, ...p].sort((a, b) => b.date.localeCompare(a.date)));
    }
    if (!refreshUrl) return;
    const ctrl = new AbortController();
    fetch(refreshUrl, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((list: any[]) => {
        if (!Array.isArray(list)) return;
        const fresh: ShowEvent[] = list.map((e) => ({
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
          soldOut: false,
        }));
        setUpcoming(fresh.filter((e) => isFuture(e.date)).sort((a, b) => a.date.localeCompare(b.date)));
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, [initialUpcoming, refreshUrl]);

  const years = useMemo(() => [...new Set(past.map((e) => e.date.slice(0, 4)))].sort((a, b) => b.localeCompare(a)), [past]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return past.filter((e) => {
      if (year !== 'all' && !e.date.startsWith(year)) return false;
      if (!q) return true;
      const hay = `${e.title} ${e.venue} ${e.city} ${e.description}`.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
      return hay.includes(q);
    });
  }, [past, query, year]);

  const grouped = useMemo(() => {
    const out: [string, ShowEvent[]][] = [];
    for (const e of filtered.slice(0, limit)) {
      const y = e.date.slice(0, 4);
      const last = out[out.length - 1];
      if (last && last[0] === y) last[1].push(e);
      else out.push([y, [e]]);
    }
    return out;
  }, [filtered, limit]);

  const upcomingList =
    upcoming.length > 0 ? (
      <ol className={s.list} role="list">
        {upcoming.map((e) => (
          <EventRow key={e.id} e={e} upcoming />
        ))}
      </ol>
    ) : (
      <div className={s.empty}>
        <p>
          <strong>No hay fechas públicas anunciadas ahora mismo.</strong> Sigue a Z4YLON en Bandsintown para recibir un aviso en cuanto se publique un show.
        </p>
        <a className="btn btn--ghost btn--sm" href={bandsintownUrl} target="_blank" rel="noopener noreferrer">
          Seguir en Bandsintown
        </a>
      </div>
    );

  if (variant === 'compact') return <div className={s.root}>{upcomingList}</div>;

  const tabs = [
    { id: 'upcoming', label: 'Próximos', count: upcoming.length },
    { id: 'past', label: 'Archivo', count: past.length },
  ] as const;

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={s.root}>
      <div className={s.tabs} role="tablist" aria-label="Shows">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${t.id}`}
            aria-controls={`${uid}-panel-${t.id}`}
            aria-selected={tab === t.id}
            tabIndex={tab === t.id ? 0 : -1}
            className={s.tab}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            {t.label}
            <span className={s.count}>{t.count}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-panel-upcoming`} aria-labelledby={`${uid}-tab-upcoming`} hidden={tab !== 'upcoming'}>
        {upcomingList}
      </div>

      <div role="tabpanel" id={`${uid}-panel-past`} aria-labelledby={`${uid}-tab-past`} hidden={tab !== 'past'}>
        <div className={s.filters}>
          <div className={s.search}>
            <Icon name="search" size={18} />
            <label className="sr-only" htmlFor={`${uid}-q`}>
              Buscar en el archivo de shows
            </label>
            <input
              id={`${uid}-q`}
              type="search"
              placeholder="Buscar sala, ciudad o estilo…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE);
              }}
            />
          </div>
          <div className={s.years} role="group" aria-label="Filtrar por año">
            {['all', ...years].map((y) => (
              <button
                key={y}
                type="button"
                className={s.year}
                aria-pressed={year === y}
                onClick={() => {
                  setYear(y);
                  setLimit(PAGE);
                }}
              >
                {y === 'all' ? 'Todos' : y}
              </button>
            ))}
          </div>
        </div>

        <p className={s.resultCount} role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'show' : 'shows'}
          {year !== 'all' ? ` en ${year}` : ' desde 2015'}
          {query ? ` que coinciden con “${query}”` : ''}
        </p>

        {grouped.map(([y, list]) => (
          <section key={y} className={s.yearGroup} aria-labelledby={`${uid}-y-${y}`}>
            <h3 id={`${uid}-y-${y}`} className={s.yearTitle}>
              {y}
            </h3>
            <ol className={s.list} role="list">
              {list.map((e) => (
                <EventRow key={e.id} e={e} />
              ))}
            </ol>
          </section>
        ))}

        {filtered.length === 0 && <p className={s.empty}>No hay shows que coincidan con la búsqueda.</p>}

        {filtered.length > limit && (
          <div className={s.moreWrap}>
            <button type="button" className="btn btn--ghost" onClick={() => setLimit((l) => l + PAGE * 2)}>
              <Icon name="plus" /> Mostrar más ({filtered.length - limit} restantes)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
