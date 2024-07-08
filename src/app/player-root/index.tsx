import { Player } from "../player";
import { SongProvider } from "../song/provider";

const username = window.location.pathname.substring(1)?.trim() || "";

export function PlayerRoot() {
  return (
    <SongProvider username={username}>
      <Player />
    </SongProvider>
  );
}
