import { useChain, useSpring, useSpringRef, useTransition } from "react-spring";
import { animated } from "@react-spring/web";
import "./index.css";
import { AlbumArt } from "../album-art";
import { useEffect, useState } from "react";
import { ScrollableText } from "../scrollable-text";
import { CurrentTrack, useCurrentTrack } from "../song/service";

const FULL_WIDTH = 350;

function useAnimations(currentTrack: CurrentTrack | null) {
  const open = !!currentTrack;
  const upperRef = useSpringRef();
  const upper = useSpring({
    ref: upperRef,
    from: { transform: `translateY(${open ? "70" : "0"}px)` },
    to: { transform: `translateY(${open ? "0" : "70"}px)` },
  });

  const stretchRef = useSpringRef();
  const stretch = useSpring({
    ref: stretchRef,
    from: {
      width: open ? 70 : FULL_WIDTH,
    },
    to: {
      width: open ? FULL_WIDTH : 70,
    },
  });

  const artist = useTransition(currentTrack?.artist || "", {
    from: { opacity: 0, transform: "translateX(-10px)" },
    enter: { opacity: 1, transform: "translateX(0px)" },
    leave: { opacity: 0, transform: "translateX(-10px)" },
    exitBeforeEnter: true,
  });

  const name = useTransition(currentTrack?.title || "", {
    from: { opacity: 0, transform: "translateX(-10px)" },
    enter: { opacity: 1, transform: "translateX(0px)" },
    leave: { opacity: 0, transform: "translateX(-10px)" },
    exitBeforeEnter: true,
  });

  useChain(open ? [upperRef, stretchRef] : [stretchRef, upperRef]);

  return { upper, stretch, artist, name };
}

const PlayerRenderer: React.FC<{ currentTrack: CurrentTrack | null }> = ({ currentTrack }) => {
  const { stretch, upper, artist, name } = useAnimations(currentTrack);

  return (
    <animated.div className="core-container">
      <animated.div className="player-shell" style={{ ...stretch, ...upper }}>
        <div className="player-content">
          <div className="player-sections">
            <AlbumArt albumURL={currentTrack?.albumURL} />
            <div className="song-meta">
              <div className="song-meta-content">
                {artist((style, artist) => (
                  <animated.div className="song-artist" style={style}>
                    <div className="song-artist-container">
                      <ScrollableText text={artist} />
                    </div>
                  </animated.div>
                ))}
                {name((style, title) => (
                  <animated.div className="song-title" style={style}>
                    <ScrollableText text={title} />
                  </animated.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export const Player: React.FC = () => {
  const currentTrack = useCurrentTrack();
  const open = !!currentTrack;
  const [hasTrackOnce, setHasTrackOnce] = useState(false);

  useEffect(() => {
    open && !hasTrackOnce && setHasTrackOnce(true);
  }, [open, hasTrackOnce]);

  if (!hasTrackOnce) {
    return null;
  }

  return <PlayerRenderer currentTrack={currentTrack} />;
};
