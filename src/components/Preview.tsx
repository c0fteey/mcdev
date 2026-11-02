"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { elementAtPath, LINK_SELECTOR, readLink, type PageLink } from "@/lib/gui/links";
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
const SAMPLE_PLACEHOLDERS: Record<string, string> = {
  "%vault_eco_balance%": "12,450",
  "%luckperms_primary_group_name%": "Member",
  "%statistic_player_kills%": "1,284",
  "%statistic_deaths%": "37",
  "%statistic_mine_block%": "48,210",
  "%statistic_time_played%": "86h",
};

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
const SELECTED = "data-mcgui-selected";
const HOVERED = "data-mcgui-hovered";
// One screen pixel in the page's own pixels, so the hover line stays thin at any preview size.
const HAIRLINE = "--mcgui-hairline";
const LINK_OUTLINES = `<style>
${LINK_SELECTOR} { outline: 2px dashed #e2b33c; outline-offset: 2px; }
[${HOVERED}] { outline: var(${HAIRLINE}, 1px) solid rgb(255 255 255 / 0.5); outline-offset: calc(var(${HAIRLINE}, 1px) * 2); }
[${SELECTED}] { outline: 2px solid #ffffff; outline-offset: 1px; }
</style>`;

function setHairline(doc: Document | null | undefined, scale: number) {
  if (scale > 0) doc?.documentElement?.style.setProperty(HAIRLINE, `${1 / scale}px`);
}

function markSelected(doc: Document | null | undefined, path: number[] | null) {
  if (!doc?.body) return;
  doc.querySelector(`[${SELECTED}]`)?.removeAttribute(SELECTED);
  if (path) elementAtPath(doc.body, path)?.setAttribute(SELECTED, "");
}

function toPreviewDocument(html: string, showLinks: boolean) {
  const page = inlineStylesheet(html, PREVIEW_HEAD)
    .replace(/\{(\w+)\}/g, (match, key: string) => SAMPLE_VALUES[key] ?? match)
    .replace(/%\w+%/g, (match) => SAMPLE_PLACEHOLDERS[match] ?? match)
    // MC GUI draws head:NAME itself; the browser asks a public skin service for the face.
    .replace(/src=(["'])head:([\w-]+)\1/g, (_, quote: string, name: string) => `src=${quote}https://mc-heads.net/avatar/${name}/64${quote}`);
  return showLinks ? page + LINK_OUTLINES : page;
}

// Fits the page inside its parent: fill takes the parent's whole box, otherwise it keeps 16:9 at full width.
// Without allow-scripts the page's own scripts never run; allow-same-origin lets us hear its clicks.
export function Preview({
  html,
  title,
  onClickLink,
  onSelect,
  selectedPath = null,
  fill,
  thumbnail,
  flush,
  showLinks = false,
}: {
  html: string;
  title: string;
  onClickLink?: (link: PageLink, element: Element) => void;
  // When set, clicks choose an element instead of acting like the game; null means the page itself.
  onSelect?: (element: Element | null) => void;
  selectedPath?: number[] | null;
  fill?: boolean;
  thumbnail?: boolean;
  flush?: boolean;
  showLinks?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const srcDoc = useMemo(() => toPreviewDocument(html, showLinks), [html, showLinks]);

  const frame = useRef<HTMLIFrameElement>(null);
  const latest = useRef({ onClickLink, onSelect, selectedPath, scale });
  useEffect(() => {
    latest.current = { onClickLink, onSelect, selectedPath, scale };
  });

  useEffect(() => {
    markSelected(frame.current?.contentDocument, selectedPath);
  }, [selectedPath]);

  useEffect(() => {
    setHairline(frame.current?.contentDocument, scale);
  }, [scale]);

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
          flush ? "" : thumbnail ? "rounded-[3px]" : fill ? "rounded-lg shadow-[0_1px_2px_rgb(0_0_0/0.3),0_16px_48px_rgb(0_0_0/0.35)]" : "rounded-md"
        }`}
        style={{ width: WIDTH * scale, height: HEIGHT * scale, background: WORLD_BACKDROP, visibility: scale ? undefined : "hidden" }}
      >
        <iframe
          ref={frame}
          title={title}
          srcDoc={srcDoc}
          sandbox="allow-same-origin"
          tabIndex={onClickLink ? undefined : -1}
          className={`absolute left-0 top-0 origin-top-left border-0 ${onClickLink ? "" : "pointer-events-none"}`}
          style={{ width: WIDTH, height: HEIGHT, transform: `scale(${scale})`, colorScheme: "dark" }}
          onLoad={(e) => {
            const doc = e.currentTarget.contentDocument;
            if (!doc) return;
            markSelected(doc, latest.current.selectedPath);
            setHairline(doc, latest.current.scale);
            // The screen behind everything counts as the page, not as something to link.
            const choosable = (target: Element) => {
              const el = target.closest(LINK_SELECTOR) ?? target;
              return el.matches("html, body, .mc-screen") ? null : el;
            };
            doc.addEventListener("click", (click) => {
              const target = click.target as Element;
              const link = target.closest(LINK_SELECTOR);
              // Labels keep working, so hidden tabs can be reached and their contents chosen.
              if (link) click.preventDefault();
              const { onClickLink: act, onSelect: select } = latest.current;
              if (select) select(choosable(target));
              else if (link) act?.(readLink(link), link);
            });
            doc.addEventListener("mouseover", (event) => {
              doc.querySelector(`[${HOVERED}]`)?.removeAttribute(HOVERED);
              if (latest.current.onSelect) choosable(event.target as Element)?.setAttribute(HOVERED, "");
            });
            doc.addEventListener("mouseleave", () => doc.querySelector(`[${HOVERED}]`)?.removeAttribute(HOVERED));
          }}
        />
      </div>
    </div>
  );
}
