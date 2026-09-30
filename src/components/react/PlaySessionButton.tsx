import { useEffect, useState } from 'react';
import Icon from './Icon';
import { STATE_EVENT, requestPlay, type PlayerState } from '@/lib/player';

type Props = { sessionKey: string; title: string; variant?: 'primary' | 'ghost' | 'round'; label?: string };

export default function PlaySessionButton({ sessionKey, title, variant = 'primary', label = 'Escuchar' }: Props) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onState = (e: Event) => setPlaying((e as CustomEvent<PlayerState>).detail.key === sessionKey);
    window.addEventListener(STATE_EVENT, onState);
    window.dispatchEvent(new Event('z4:player-ask'));
    return () => window.removeEventListener(STATE_EVENT, onState);
  }, [sessionKey]);

  if (variant === 'round') {
    return (
      <button
        type="button"
        className="play-round"
        onClick={() => requestPlay(sessionKey)}
        aria-label={playing ? `Sonando: ${title}` : `Reproducir ${title}`}
        aria-pressed={playing}
      >
        <Icon name={playing ? 'volume' : 'play'} size={26} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`btn ${variant === 'ghost' ? 'btn--ghost' : ''} btn--sm`}
      onClick={() => requestPlay(sessionKey)}
      aria-pressed={playing}
    >
      <Icon name={playing ? 'volume' : 'play'} />
      {playing ? 'Sonando' : label}
      <span className="sr-only">: {title}</span>
    </button>
  );
}
