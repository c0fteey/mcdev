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
    <div className="flex flex-col gap-3 p-3">
      <div className="flex h-5 items-center justify-between gap-2">
        <h2 className="label">Links on this page</h2>
        <span className="text-[11px] tabular-nums text-muted">{links.length}</span>
      </div>

      {links.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {links.map(({ label, tag, key, link }, index) => (
            <div
              key={index}
              ref={index === selected ? selectedCard : undefined}
              className={`flex flex-col gap-2 rounded-xl border bg-surface p-2.5 transition-colors ${index === selected ? "border-gold" : "border-line"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-[13px] font-semibold">{label}</span>
                <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted">
                  {tag}
                  {key && <kbd className="rounded border border-line px-1 font-mono text-[11px] uppercase text-gold">{key}</kbd>}
                </span>
              </div>
              <Select compact label={`Action for ${label}`} value={linkValue(link)} onChange={(v) => onChange(setLink(page.html, index, linkFromValue(v, link)))}>
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
                  {/* A pasted page can link to a file this project does not have */}
                  {link.kind === "page" && !pages.some((p) => p.file === link.file) && <SelectItem value={`page:${link.file}`}>{link.file} (missing)</SelectItem>}
                </SelectGroup>
              </Select>
              {link.kind === "command" && (
                <input
                  aria-label={`Command for ${label}`}
                  className="input-sm font-mono !text-xs"
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

      <p className="text-[13px] leading-snug text-muted">
        {links.length > 0
          ? "Click a button on the page to find it here, then choose what it does."
          : "This page has no buttons or links yet. Add one in the Code view."}
      </p>

      <div className="flex flex-col gap-1.5 pt-3">
        <h2 className="label">Reached from</h2>
        {opensFirst && <p className="text-[13px] text-muted">It opens first.</p>}
        {reachedFrom.map((p) => (
          <p key={p.id} className="truncate text-[13px]">
            {p.title}
          </p>
        ))}
        {!opensFirst && reachedFrom.length === 0 && <p className="text-[13px] text-muted">No page links here yet.</p>}
      </div>
    </div>
  );
}
