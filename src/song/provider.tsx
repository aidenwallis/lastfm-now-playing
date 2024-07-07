import { FC, ReactNode, useSyncExternalStore } from "react";
import { createSongService, SongContext } from "./service";

const songService = createSongService();

export const SongProvider: FC<{ children: ReactNode; username: string }> = ({ children, username }) => {
  const currentTrack = useSyncExternalStore(
    songService.subscribe,
    songService.getCurrentTrack,
    songService.getCurrentTrack,
  );

  // song service will dedupe these calls
  songService.setUserId(username);

  return <SongContext.Provider value={{ currentTrack }}>{children}</SongContext.Provider>;
};
