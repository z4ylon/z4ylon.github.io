import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

type Props = { src: string; poster: string; className?: string };

/**
 * Vídeo decorativo de fondo. No se reproduce si el usuario prefiere movimiento reducido
 * e incluye un botón de pausa (WCAG 2.2.2: pausar, detener, ocultar).
 */
export default function AmbientVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const wantsPlay = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as any).connection?.saveData;
    if (!reduce.matches && !saveData) {
      wantsPlay.current = true;
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    const onVis = () => (document.hidden ? v.pause() : wantsPlay.current && v.play().catch(() => {}));
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      wantsPlay.current = true;
      v.play().then(() => setPlaying(true)).catch(() => {});
    }
    else {
      wantsPlay.current = false;
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video ref={ref} className={className} src={src} poster={poster} loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />
      <button type="button" className="ambient-toggle" onClick={toggle} aria-label={playing ? 'Pausar vídeo de fondo' : 'Reproducir vídeo de fondo'}>
        <Icon name={playing ? 'pause' : 'play'} size={14} />
      </button>
    </>
  );
}
