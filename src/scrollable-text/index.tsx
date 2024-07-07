import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import "./index.css";

export const ScrollableText: React.FC<{ text: string }> = ({ text }) => {
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !textRef.current) {
      return;
    }

    void containerRef.current.offsetWidth;
    void textRef.current.offsetWidth;

    const containerWidth = containerRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;

    setTextWidth(textWidth);
    setContainerWidth(containerWidth);
  }, [text]);

  const scrolling = textWidth > containerWidth;

  return (
    <div
      className={["scrollable-text", scrolling ? "scrollable-text--scrolling" : ""].filter(Boolean).join(" ")}
      ref={containerRef}
    >
      <div
        className={["scrollable-text-inner", scrolling ? "scrollable-text-inner--scrolling" : ""]
          .filter(Boolean)
          .join(" ")}
        style={{ "--text-width": `${textWidth}px` } as CSSProperties}
      >
        <span className="scrollable-text-content" ref={textRef}>
          {text}
        </span>
        {scrolling && <span className="scrollable-text-content">{text}</span>}
      </div>
    </div>
  );
};
