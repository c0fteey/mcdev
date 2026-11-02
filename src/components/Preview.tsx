"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LINK_SELECTOR, readLink, type PageLink } from "@/lib/gui/links";
import { PAGE_CSS } from "@/lib/gui/templates";

// MC GUI lays a 16x9 fullscreen page out at this size.
const WIDTH = 1024;
const HEIGHT = 576;

const SAMPLE_VALUES: Record<string, string> = {
  player: "Steve",
  online: "12",
  max: "100",
  world: "world",
  health: "20",
  level: "12",
  x: "0",
  y: "64",
  z: "0",
};

// Browsers do not have the game's font, so the preview alone loads a similar one.
const PREVIEW_FONT = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600&display=swap">`;

function toPreviewDocument(html: string) {
  return html
    .replace(/<link[^>]*href=["']minecraft\.css["'][^>]*>/i, () => `${PREVIEW_FONT}<style>${PAGE_CSS}</style>`)
    .replace(/\{(\w+)\}/g, (match, key: string) => SAMPLE_VALUES[key] ?? match);
}

// Without allow-scripts the page's own scripts never run; allow-same-origin lets us hear its clicks.
export function Preview({ html, title, onLink }: { html: string; title: string; onLink?: (link: PageLink) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const srcDoc = useMemo(() => toPreviewDocument(html), [html]);

  const latestOnLink = useRef(onLink);
  useEffect(() => {
    latestOnLink.current = onLink;
  });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / WIDTH));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={box} className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-black">
      <iframe
        title={title}
        srcDoc={srcDoc}
        sandbox="allow-same-origin"
        tabIndex={onLink ? undefined : -1}
        className={`absolute left-0 top-0 origin-top-left border-0 ${onLink ? "" : "pointer-events-none"}`}
        style={{ width: WIDTH, height: HEIGHT, transform: `scale(${scale})` }}
        onLoad={(e) => {
          e.currentTarget.contentDocument?.addEventListener("click", (click) => {
            const el = (click.target as Element).closest(LINK_SELECTOR);
            if (!el) return;
            click.preventDefault();
            latestOnLink.current?.(readLink(el));
          });
        }}
      />
    </div>
  );
}
