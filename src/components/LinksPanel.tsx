"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { findLinks, setLink, type PageLink } from "@/lib/gui/links";
import type { GuiPage } from "@/lib/gui/pages";
import { Select, SelectGroup, SelectItem } from "./ui";

const noSubscribe = () => () => {};

const linkValue = (link: PageLink) => (link.kind === "page" ? `page:${link.file}` : link.kind);

function linkFromValue(value: string, current: PageLink): PageLink {
  if (value.startsWith("page:")) return { kind: "page", file: value.slice(5) };
  if (value === "command") return { kind: "command", command: current.kind === "command" ? current.command : "" };
  return { kind: value as "none" | "close" | "back" };
}

export function LinksPanel({
  page,
  pages,
  selected,
  onChange,
}: {
  page: GuiPage;
  pages: GuiPage[];
  selected: number | null;
  onChange: (html: string) => void;
}) {
  // Links are read with DOMParser, which only exists in the browser.
  const inBrowser = useSyncExternalStore(noSubscribe, () => true, () => false);
  const links = inBrowser ? findLinks(page.html) : [];
  const opensFirst = pages[0].id === page.id;
  const reachedFrom = inBrowser
    ? pages.filter((p) => p.id !== page.id && findLinks(p.html).some(({ link }) => link.kind === "page" && link.file === page.file))
    : [];

  const selectedCard = useRef<HTMLDivElement>(null);
  useEffect(() => {
    selectedCard.current?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="label">Links on this page</h2>
        <span className="text-xs text-muted">{links.length}</span>
      </div>

      {links.length > 0 && (
        <div className="flex flex-col gap-2">
          {links.map(({ label, tag, key, link }, index) => (
            <div
              key={index}
              ref={index === selected ? selectedCard : undefined}
              className={`flex flex-col gap-2 rounded-xl border bg-surface p-3 transition-colors ${index === selected ? "border-gold" : "border-line"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-sm font-semibold">{label}</span>
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
                  {tag}
                  {key && <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] uppercase text-gold">{key}</kbd>}
                </span>
              </div>
              <Select label={`Action for ${label}`} value={linkValue(link)} onChange={(v) => onChange(setLink(page.html, index, linkFromValue(v, link)))}>
                <SelectItem value="none">Nothing</SelectItem>
                <SelectItem value="close">Close the page</SelectItem>
                <SelectItem value="back">Go back</SelectItem>
                <SelectItem value="command">Run a command</SelectItem>
                <SelectGroup label="Open a page">
                  {pages.map((p) => (
                    <SelectItem key={p.id} value={`page:${p.file}`}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </Select>
              {link.kind === "command" && (
                <input
                  aria-label={`Command for ${label}`}
                  className="input font-mono"
                  placeholder="spawn"
                  spellCheck={false}
                  value={link.command}
                  onChange={(e) => onChange(setLink(page.html, index, { kind: "command", command: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted">
        {links.length > 0
          ? "Click a button on the page to find it here, then choose what it does."
          : "This page has no buttons or links yet. Add one in the Code view."}
      </p>

      <div className="flex flex-col gap-2 pt-2">
        <h2 className="label">Reached from</h2>
        {opensFirst && <p className="text-sm text-muted">It opens first.</p>}
        {reachedFrom.map((p) => (
          <p key={p.id} className="truncate text-sm">
            {p.title}
          </p>
        ))}
        {!opensFirst && reachedFrom.length === 0 && <p className="text-sm text-muted">No page links here yet.</p>}
      </div>
    </div>
  );
}
