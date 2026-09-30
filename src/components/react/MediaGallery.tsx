import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import Icon from './Icon';
import s from './MediaGallery.module.css';

export type MediaItem = {
  type: 'image' | 'video';
  thumb: { src: string; srcset?: string; width: number; height: number };
  /** Imagen grande (o póster del vídeo) para el visor */
  full: string;
  video?: string;
  alt: string;
  caption?: string;
  download?: string;
};

type Props = {
  items: MediaItem[];
  layout?: 'grid' | 'masonry' | 'reel';
  /** Relación de aspecto de las miniaturas en grid/reel, p. ej. "9 / 16" */
  ratio?: string;
  min?: string;
  sizes?: string;
  /** Previsualiza los vídeos en silencio al pasar el ratón */
  hoverPreview?: boolean;
  label: string;
};

export default function MediaGallery({ items, layout = 'grid', ratio = '1 / 1', min = '220px', sizes = '(min-width: 1024px) 25vw, 50vw', hoverPreview = false, label }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reelRef = useRef<HTMLUListElement>(null);
  const touchX = useRef<number | null>(null);
  const count = items.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + count) % count)), [count]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    if (index === null && d.open) d.close();
  }, [index]);

  const onClose = () => {
    setIndex(null);
    document.documentElement.style.overflow = '';
  };
  /** Cierre explícito: no depende de que el navegador emita el evento "close" */
  const closeViewer = () => {
    dialogRef.current?.close();
    onClose();
  };

  // Si el componente se desmonta con el visor abierto (p. ej. al navegar), se restaura el scroll
  useEffect(() => () => void (document.documentElement.style.overflow = ''), []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'Escape') {
      e.preventDefault();
      closeViewer();
    }
  };

  const onPointerDown = (e: RPointerEvent) => {
    touchX.current = e.clientX;
  };
  const onPointerUp = (e: RPointerEvent) => {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 60 && e.pointerType !== 'mouse') go(dx < 0 ? 1 : -1);
  };

  const scrollReel = (dir: 1 | -1) => {
    const el = reelRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const canPreview = () => hoverPreview && matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

  const current = index !== null ? items[index] : null;

  return (
    <div className={s.root} data-layout={layout}>
      {layout === 'reel' && (
        <div className={s.reelNav}>
          <button type="button" className={s.navBtn} onClick={() => scrollReel(-1)} aria-label="Desplazar a la izquierda">
            <Icon name="chevronLeft" />
          </button>
          <button type="button" className={s.navBtn} onClick={() => scrollReel(1)} aria-label="Desplazar a la derecha">
            <Icon name="chevronRight" />
          </button>
        </div>
      )}

      <ul ref={reelRef} className={s.list} role="list" aria-label={label} style={{ '--ratio': ratio, '--min': min } as CSSProperties}>
        {items.map((item, i) => (
          <li key={i} className={s.item}>
            <button
              type="button"
              className={s.thumb}
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              onMouseEnter={(e) => {
                if (!canPreview()) return;
                const v = e.currentTarget.querySelector('video');
                v?.play().catch(() => {});
              }}
              onMouseLeave={(e) => {
                const v = e.currentTarget.querySelector('video');
                if (v) {
                  v.pause();
                  v.currentTime = 0;
                }
              }}
            >
              <img src={item.thumb.src} srcSet={item.thumb.srcset} sizes={sizes} width={item.thumb.width} height={item.thumb.height} alt={item.alt} loading="lazy" decoding="async" />
              {item.type === 'video' && hoverPreview && item.video && (
                // "muted" se fija por ref: React no lo serializa en SSR y provocaría un aviso de hidratación
                <video
                  ref={(el) => {
                    if (el) el.muted = true;
                  }}
                  className={s.preview}
                  src={item.video}
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              )}
              {item.type === 'video' && (
                <span className={s.playBadge} aria-hidden="true">
                  <Icon name="play" size={20} />
                </span>
              )}
              <span className="sr-only">{item.type === 'video' ? ' — reproducir vídeo' : ' — ampliar imagen'}</span>
              {item.caption && layout !== 'masonry' && <span className={s.caption}>{item.caption}</span>}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={s.dialog}
        aria-label={current ? `${label}: ${current.alt}` : label}
        onClose={onClose}
        onKeyDown={onKey}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeViewer();
        }}
      >
        {current && (
          <div className={s.viewer} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <div className={s.toolbar}>
              <span className={s.counter} aria-live="polite">
                {index! + 1} / {count}
              </span>
              <div className={s.tools}>
                {current.download && (
                  <a className={s.navBtn} href={current.download} download aria-label="Descargar en alta resolución">
                    <Icon name="download" />
                  </a>
                )}
                <button type="button" className={s.navBtn} onClick={closeViewer} aria-label="Cerrar visor" autoFocus>
                  <Icon name="close" />
                </button>
              </div>
            </div>

            <figure className={s.figure}>
              {current.type === 'video' && current.video ? (
                <video key={current.video} className={s.media} src={current.video} poster={current.full} controls autoPlay playsInline />
              ) : (
                <img key={current.full} className={s.media} src={current.full} alt={current.alt} />
              )}
              {(current.caption || current.alt) && <figcaption className={s.figcaption}>{current.caption ?? current.alt}</figcaption>}
            </figure>

            {count > 1 && (
              <>
                <button type="button" className={`${s.navBtn} ${s.prev}`} onClick={() => go(-1)} aria-label="Anterior">
                  <Icon name="chevronLeft" />
                </button>
                <button type="button" className={`${s.navBtn} ${s.next}`} onClick={() => go(1)} aria-label="Siguiente">
                  <Icon name="chevronRight" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
