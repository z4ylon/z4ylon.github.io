// Bus de eventos mínimo entre los botones "Escuchar" y el reproductor persistente.
export const PLAY_EVENT = 'z4:play';
export const STATE_EVENT = 'z4:player-state';

export type PlayerSession = {
  key: string;
  title: string;
  edition: string;
  cover: string;
  seconds: number;
};

export type PlayerState = { key: string | null; open: boolean };

export function requestPlay(key: string) {
  window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: { key } }));
}

export function mixcloudWidgetUrl(key: string, autoplay = true) {
  const params = new URLSearchParams({ hide_cover: '1', mini: '1', hide_artwork: '1', feed: key });
  if (autoplay) params.set('autoplay', '1');
  return `https://player-widget.mixcloud.com/widget/iframe/?${params}`;
}

export const mixcloudPage = (key: string) => `https://www.mixcloud.com${key}`;

export function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h} h ${String(m).padStart(2, '0')} min` : `${m} min`;
}
