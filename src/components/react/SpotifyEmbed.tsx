import { useState } from 'react';
import Icon from './Icon';

type Props = { id: string; title: string; edition: string; cover: { src: string; srcset?: string } };

/** Carga el reproductor de Spotify solo cuando el usuario lo pide (sin cookies de terceros antes). */
export default function SpotifyEmbed({ id, title, edition, cover }: Props) {
  const [load, setLoad] = useState(false);
  const url = `https://open.spotify.com/playlist/${id}`;

  return (
    <article className="playlist">
      {load ? (
        <iframe
          title={`Playlist de Spotify: ${title} ${edition}`}
          src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <div className="playlist__cover">
          <img src={cover.src} srcSet={cover.srcset} sizes="(min-width: 900px) 40vw, 100vw" alt="" loading="lazy" decoding="async" />
          <div className="playlist__overlay">
            <button type="button" className="play-round" onClick={() => setLoad(true)} aria-label={`Cargar y escuchar ${title} ${edition} en Spotify`}>
              <Icon name="play" size={26} />
            </button>
            <p className="playlist__note">Al pulsar se cargará el reproductor de Spotify</p>
          </div>
        </div>
      )}
      <div className="playlist__meta">
        <div>
          <h3 className="playlist__title">{title}</h3>
          <p className="playlist__edition">{edition}</p>
        </div>
        <a className="link-arrow" href={url} target="_blank" rel="noopener noreferrer">
          Abrir en Spotify
          <span className="sr-only"> (nueva pestaña)</span>
          <Icon name="arrowUpRight" />
        </a>
      </div>
    </article>
  );
}
