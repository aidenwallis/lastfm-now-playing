import { animated, useTransition } from "react-spring";
import "./index.css";
import { FC } from "react";

export const AlbumArt: FC<{ albumURL?: string }> = ({ albumURL }) => {
  const transitions = useTransition(albumURL || "", {
    key: albumURL,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 150 },
  });

  return (
    <div className="album-art">
      {transitions((style, url) =>
        url ? (
          <animated.img src={url} style={style} />
        ) : (
          <animated.div className="default-art" style={style}>
            <MusicNote />
          </animated.div>
        ),
      )}
    </div>
  );
};

function MusicNote() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width={50}
      height={50}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
      />
    </svg>
  );
}
