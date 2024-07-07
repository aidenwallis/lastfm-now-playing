import { Player } from "../player";
import { SongProvider } from "../song/provider";
import { Welcome } from "../welcome";
import "./index.css";

const username = window.location.pathname.substring(1)?.trim() || null;

export function App() {
  if (!username) {
    return <Welcome />;
  }

  return (
    <SongProvider username={username}>
      <Player />
    </SongProvider>
  );
}
