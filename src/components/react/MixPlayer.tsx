import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import s from './MixPlayer.module.css';
import { PLAY_EVENT, STATE_EVENT, formatDuration, mixcloudPage, mixcloudWidgetUrl, type PlayerSession, type PlayerState } from '@/lib/player';

type Props = { sessions: PlayerSession[] };

/**
 * Reproductor de sesiones persistente (se mantiene entre páginas con transition:persist).
 * El iframe de Mixcloud solo se carga tras una acción del usuario: nada de terceros ni cookies antes.
 * Al minimizar, la barra se oculta pero el iframe sigue montado para que la música no se corte.
 */
export default function MixPlayer({ sessions }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<PlayerSession>(sessions[0]);
  const [loaded, setLoaded] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const minimizeRef = useRef<HTMLButtonElement>(null);

  const broadcast = useCallback((state: PlayerState) => {
    window.dispatchEvent(new CustomEvent(STATE_EVENT, { detail: state }));
  }, []);

  // Reserva espacio bajo el contenido cuando la barra está abierta
  useEffect(() => {
    const apply = () => {
      const h = open ? (barRef.current?.offsetHeight ?? 0) : 0;
      document.documentElement.style.setProperty('--player-h', `${h}px`);
    };
    apply();
    document.addEventListener('astro:after-swap', apply);
    window.addEventListener('resize', apply);
    return () => {
      document.removeEventListener('astro:after-swap', apply);
      window.removeEventListener('resize', apply);
    };
  }, [open, loaded]);

  useEffect(() => {
    broadcast({ key: loaded ? current.key : null, open });
    const onAsk = () => broadcast({ key: loaded ? current.key : null, open });
    window.addEventListener('z4:player-ask', onAsk);
    return () => window.removeEventListener('z4:player-ask', onAsk);
  }, [loaded, current, open, broadcast]);

  useEffect(() => {
    const onPlay = (e: Event) => {
      const next = sessions.find((x) => x.key === (e as CustomEvent<{ key: string }>).detail.key);
      if (!next) return;
      setCurrent(next);
      setLoaded(true);
      setOpen(true);
    };
    window.addEventListener(PLAY_EVENT, onPlay);
    return () => window.removeEventListener(PLAY_EVENT, onPlay);
  }, [sessions]);

  const expand = () => {
    setOpen(true);
    requestAnimationFrame(() => minimizeRef.current?.focus());
  };
  const minimize = () => {
    setOpen(false);
    requestAnimationFrame(() => fabRef.current?.focus());
  };
  const stop = () => {
    setLoaded(false);
    minimize();
  };

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className={s.fab}
        data-hidden={open || undefined}
        tabIndex={open ? -1 : 0}
        aria-hidden={open || undefined}
        aria-expanded={open}
        aria-controls="mix-player"
        onClick={expand}
      >
        <span className={s.fabDisc} data-spin={loaded || undefined} aria-hidden="true">
          <img src={current.cover} alt="" width={40} height={40} />
        </span>
        <span className={s.fabText}>
          <span className={s.fabLabel}>{loaded ? 'Sonando' : 'Escuchar sesión'}</span>
          <span className={s.fabTitle}>{current.title}</span>
        </span>
        {loaded && (
          <span className={s.eq} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
      </button>

      <div
        ref={barRef}
        id="mix-player"
        className={s.bar}
        data-open={open || undefined}
        role="region"
        aria-label="Reproductor de sesiones DJ"
        aria-hidden={!open || undefined}
        {...(!open ? { inert: true } : {})}
      >
        <div className={s.inner}>
          <div className={s.now}>
            <img className={s.cover} src={current.cover} alt="" width={56} height={56} />
            <div className={s.meta}>
              <span className={s.kicker}>
                {loaded ? 'Sonando ahora' : 'Sesión DJ'} · {current.edition}
              </span>
              <strong className={s.title}>{current.title}</strong>
              <span className={s.sub}>{formatDuration(current.seconds)} · Mixcloud</span>
            </div>
          </div>

          <div className={s.widget}>
            {loaded ? (
              <iframe
                key={current.key}
                title={`Reproductor de Mixcloud: ${current.title}`}
                src={mixcloudWidgetUrl(current.key)}
                width="100%"
                height="60"
                allow="autoplay; encrypted-media; fullscreen"
              />
            ) : (
              <button type="button" className={s.start} onClick={() => setLoaded(true)}>
                <Icon name="play" size={18} />
                <span>Reproducir</span>
                <span className={s.startNote}>Carga el reproductor de Mixcloud</span>
              </button>
            )}
          </div>

          <div className={s.actions}>
            <label className="sr-only" htmlFor="mix-select">
              Elegir sesión
            </label>
            <select
              id="mix-select"
              className={s.select}
              value={current.key}
              onChange={(e) => {
                const next = sessions.find((x) => x.key === e.target.value);
                if (next) setCurrent(next);
              }}
            >
              {sessions.map((x) => (
                <option key={x.key} value={x.key}>
                  {x.title} · {x.edition}
                </option>
              ))}
            </select>
            <a className={s.iconBtn} href={mixcloudPage(current.key)} target="_blank" rel="noopener noreferrer" aria-label="Abrir la sesión en Mixcloud (nueva pestaña)">
              <Icon name="arrowUpRight" />
            </a>
            <button ref={minimizeRef} type="button" className={s.iconBtn} onClick={minimize} aria-label="Minimizar reproductor (la música sigue sonando)">
              <Icon name="chevronDown" />
            </button>
            <button type="button" className={s.iconBtn} onClick={stop} aria-label="Cerrar reproductor y detener la música">
              <Icon name="close" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
