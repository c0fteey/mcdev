"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LINK_SELECTOR, readLink, type PageLink } from "@/lib/gui/links";
import { inlineStylesheet } from "@/lib/gui/templates";

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

// PlaceholderAPI values the templates and pasted pages commonly use.
const SAMPLE_PLACEHOLDERS: Record<string, string> = { "%vault_eco_balance%": "12,450" };

// Browsers do not have MC GUI's built-in fonts, so the preview serves them itself.
// "Minecraft" is Mac's Minecraft, the same font MC GUI bundles under that name.
// The matching color-scheme lets a transparent page show the world behind the iframe.
const PREVIEW_HEAD = `<style>
@font-face { font-family: Minecraft; src: url("/fonts/MacsMinecraft-Regular.woff2") format("woff2"); font-display: swap; }
@font-face { font-family: Minecraft; font-weight: 700; src: url("/fonts/MacsMinecraft-Bold.woff2") format("woff2"); font-display: swap; }
@font-face { font-family: Monocraft; src: url("/fonts/Monocraft.ttf") format("truetype"); font-display: swap; }
:root { color-scheme: dark; }
</style>`;

// A blurred sky, grass and earth, standing in for the world behind an overlay page.
const WORLD_BACKDROP = "linear-gradient(#6d94bd, #8dabc6 40%, #6e9153 52%, #3f6a2e 64%, #4b3a26 84%, #2c2016)";
// Dashed outlines show what can be linked; preview only, never exported.
const LINK_OUTLINES = `<style>${LINK_SELECTOR} { outline: 2px dashed #e2b33c; outline-offset: 2px; }</style>`;

function toPreviewDocument(html: string, showLinks: boolean) {
  const page = inlineStylesheet(html, PREVIEW_HEAD)
    .replace(/\{(\w+)\}/g, (match, key: string) => SAMPLE_VALUES[key] ?? match)
    .replace(/%\w+%/g, (match) => SAMPLE_PLACEHOLDERS[match] ?? match);
  return showLinks ? page + LINK_OUTLINES : page;
}

// Fits the page inside its parent: fill takes the parent's whole box, otherwise it keeps 16:9 at full width.
// Without allow-scripts the page's own scripts never run; allow-same-origin lets us hear its clicks.
export function Preview({
  html,
  title,
  onClickLink,
  fill,
  thumbnail,
  showLinks = false,
}: {
  html: string;
  title: string;
  onClickLink?: (link: PageLink, index: number, element: Element) => void;
  fill?: boolean;
  thumbnail?: boolean;
  showLinks?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const srcDoc = useMemo(() => toPreviewDocument(html, showLinks), [html, showLinks]);

  const latestOnClick = useRef(onClickLink);
  useEffect(() => {
    latestOnClick.current = onClickLink;
  });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(width / WIDTH, height / HEIGHT));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={box} className={`flex items-center justify-center overflow-hidden ${fill ? "size-full" : "aspect-video w-full"}`}>
      <div
        className={`relative shrink-0 overflow-hidden ${
          thumbnail ? "rounded-[3px]" : fill ? "rounded-lg shadow-[0_1px_2px_rgb(0_0_0/0.3),0_16px_48px_rgb(0_0_0/0.35)]" : "rounded-md"
        }`}
        style={{ width: WIDTH * scale, height: HEIGHT * scale, background: WORLD_BACKDROP, visibility: scale ? undefined : "hidden" }}
      >
        <iframe
          title={title}
          srcDoc={srcDoc}
          sandbox="allow-same-origin"
          tabIndex={onClickLink ? undefined : -1}
          className={`absolute left-0 top-0 origin-top-left border-0 ${onClickLink ? "" : "pointer-events-none"}`}
          style={{ width: WIDTH, height: HEIGHT, transform: `scale(${scale})`, colorScheme: "dark" }}
          onLoad={(e) => {
            const doc = e.currentTarget.contentDocument;
            doc?.addEventListener("click", (click) => {
              const el = (click.target as Element).closest(LINK_SELECTOR);
              if (!el) return;
              click.preventDefault();
              latestOnClick.current?.(readLink(el), [...doc.querySelectorAll(LINK_SELECTOR)].indexOf(el), el);
            });
          }}
        />
      </div>
    </div>
  );
}
