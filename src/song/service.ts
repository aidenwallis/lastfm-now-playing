import { createContext, useContext } from "react";

const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const POLLING_RATE = 3000;

interface APILastfmText {
  mbid: string;
  "#text": string;
}

interface APILastfmImage {
  "#text"?: string;
  size: "small" | "medium" | "large" | "extralarge";
}

interface APITrack {
  artist?: APILastfmText;
  name: string;
  "@attr"?: {
    nowplaying?: "true";
  };
  image?: APILastfmImage[];
}

export interface CurrentTrack {
  artist: string;
  title: string;
  albumURL?: string;
  isPlaying: boolean;
}

function fromAPI(track: APITrack): CurrentTrack | null {
  const artist = track?.artist?.["#text"];
  if (!artist) return null;

  const title = track?.name;
  if (!title) return null;

  const albumURL = track?.image?.[track.image.length - 1]?.["#text"];

  return { artist, title, albumURL, isPlaying: track["@attr"]?.nowplaying === "true" };
}

function isEqual(o: CurrentTrack, n: CurrentTrack) {
  return o.albumURL === n.albumURL && o.artist === n.artist && o.title === n.title;
}

function preloadImage(url: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = (error) => reject(error);
    img.src = url;
  });
}

export function createSongService() {
  let userId: string;
  let timeout: ReturnType<typeof setTimeout>;
  let currentTrack: CurrentTrack | null = null;
  const callbacks = new Set<() => void>();

  function getCurrentTrack() {
    return currentTrack;
  }
  function subscribe(fn: () => void) {
    callbacks.add(fn);
    fn();
    return () => {
      callbacks.delete(fn);
    };
  }
  function setUserId(newUserId: string) {
    if (newUserId === userId) return;
    userId = newUserId;

    timeout && clearTimeout(timeout);
    request();
  }

  async function request() {
    await doRequest();
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => request(), POLLING_RATE);
  }

  async function doRequest() {
    if (!userId) return;

    const params = new URLSearchParams({
      method: "user.getrecenttracks",
      user: userId,
      api_key: LASTFM_API_KEY,
      limit: "1",
      format: "json",
    });

    try {
      const r = await fetch("https://ws.audioscrobbler.com/2.0?" + params.toString());
      if (r.status !== 200) {
        throw new Error(`Non 2xx status code received: ${r.status}`);
      }

      const body = (await r.json()) as {
        recenttracks?: {
          track?: APITrack[];
        };
      };

      const latest = body?.recenttracks?.track?.[0];
      if (!latest) return;

      const parsed = fromAPI(latest);
      if (!parsed) return;

      const final = parsed?.isPlaying ? parsed : null;
      if (final === currentTrack) return;
      if (final && currentTrack && isEqual(currentTrack, final)) return;

      setCurrentTrack(final);
    } catch (e) {
      console.error(`Failed to poll Last.fm API`, e);
    }
  }

  async function setCurrentTrack(track: CurrentTrack | null) {
    currentTrack = track;
    if (track?.albumURL) {
      await preloadImage(track?.albumURL || "").catch((error) => console.warn(`Failed to preload image`, error));
    }

    callbacks.forEach((fn) => {
      fn();
    });
  }

  return { getCurrentTrack, subscribe, setUserId };
}

export const SongContext = createContext<{ currentTrack: CurrentTrack | null }>({ currentTrack: null });

export function useCurrentTrack() {
  return useContext(SongContext).currentTrack;
}
