"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, Link2 } from "lucide-react";
import { describeElement, findLinks, isNavigation, setCommandAt, setLink, setLinkAt, type PageLink } from "@/lib/gui/links";
import type { GuiPage } from "@/lib/gui/pages";
import { Select, SelectGroup, SelectItem } from "./ui";

const noSubscribe = () => () => {};

const linkValue = (link: PageLink) => (link.kind === "page" ? `page:${link.file}` : link.kind);

function linkFromValue(value: string): PageLink {
  if (value.startsWith("page:")) return { kind: "page", file: value.slice(5) };
  if (value === "command") return { kind: "command", command: "" };
  return { kind: value as "none" | "close" | "back" };
}

const MENU_ITEM = "w-full cursor-pointer truncate rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors hover:bg-gold/10";

function MakeLink({ pages, onPick }: { pages: GuiPage[]; onPick: (link: PageLink) => void }) {
  const actions: { label: string; link: PageLink }[] = [
    { label: "Close the page", link: { kind: "close" } },
    { label: "Go back", link: { kind: "back" } },
    { label: "Run a command", link: { kind: "command", command: "" } },
  ];
  return (
    <Popover.Root>
      <Popover.Trigger className="btn-gold w-full">
        <Link2 className="size-3.5" aria-hidden />
        Make it a link
        <ChevronDown className="size-3.5" aria-hidden />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          collisionPadding={8}
          className="z-[60] flex max-h-80 w-[var(--radix-popover-trigger-width)] flex-col gap-0.5 overflow-y-auto rounded-xl border border-line bg-raised p-1 shadow-[0_1px_2px_rgb(0_0_0/0.25),0_12px_32px_rgb(0_0_0/0.4)]"
        >
          {actions.map(({ label, link }) => (
            <Popover.Close key={label} className={MENU_ITEM} onClick={() => onPick(link)}>
              {label}
            </Popover.Close>
          ))}
          <span className="label px-2.5 pb-0.5 pt-2">Open a page</span>
          {pages.map((p) => (
            <Popover.Close key={p.id} className={MENU_ITEM} onClick={() => onPick({ kind: "page", file: p.file })}>
              {p.title}
            </Popover.Close>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// The one thing you clicked: what it is, what it runs, and how to make it a link.
function SelectedCard({
  html,
  path,
  pages,
  onChange,
}: {
  html: string;
  path: number[];
  pages: GuiPage[];
  onChange: (html: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const selection = describeElement(html, path);
  if (!selection) return null;
  const { label, tag, command, asConsole } = selection;
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gold bg-surface p-2.5">
      <div className="min-w-0">
        <h2 className="label">Selected</h2>
        <p className="mt-1 truncate text-[13px] font-semibold">{label}</p>
        <p className="truncate font-mono text-[11px] text-muted">{tag}</p>
      </div>

      {command !== null && (
        <div className="flex flex-col gap-1 rounded-lg border border-line bg-raised p-2.5">
          <span className="text-[11px] text-muted">Runs as {asConsole ? "the console" : "the player"}</span>
          {editing || command === "" ? (
            <input
              autoFocus
              aria-label="Command"
              className="input-sm bg-surface font-mono !text-xs"
              placeholder="spawn"
              spellCheck={false}
              value={command}
              onChange={(e) => onChange(setCommandAt(html, path, e.target.value))}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setEditing(false);
              }}
            />
          ) : (
            <code className="break-all font-mono text-xs">/{command}</code>
          )}
          <div className="mt-1 flex gap-3 text-xs">
            <button type="button" className="cursor-pointer font-medium text-gold hover:underline" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button type="button" className="cursor-pointer text-muted hover:text-ink" onClick={() => onChange(setLinkAt(html, path, { kind: "none" }))}>
              Remove
            </button>
          </div>
        </div>
      )}

      <MakeLink pages={pages} onPick={(link) => onChange(setLinkAt(html, path, link))} />
    </div>
  );
}

export function LinksPanel({
  page,
  pages,
  selectedPath = null,
  onSelect,
  onHover,
  onOpenPage,
  onChange,
  heading = "Links on this page",
}: {
  page: GuiPage;
  pages: GuiPage[];
  selectedPath?: number[] | null;
  onSelect?: (path: number[]) => void;
  onHover?: (path: number[] | null) => void;
  onOpenPage?: (id: string) => void;
  onChange: (html: string) => void;
  heading?: string;
}) {
  // Links are read with DOMParser, which only exists in the browser.
  const inBrowser = useSyncExternalStore(noSubscribe, () => true, () => false);
  // Each keeps its place among all the page's buttons, which is how edits find it.
  const links = inBrowser
    ? findLinks(page.html)
        .map((found, index) => ({ ...found, index }))
        .filter(({ link }) => isNavigation(link))
    : [];
  const selection = inBrowser && selectedPath ? describeElement(page.html, selectedPath) : null;
  const selectedLink = selection && links.some((l) => l.index === selection.linkIndex) ? selection.linkIndex : null;
  const opensFirst = pages[0].id === page.id;
  const reachedFrom = inBrowser
    ? pages.flatMap((p) => {
        if (p.id === page.id) return [];
        const from = findLinks(p.html).find(({ link }) => link.kind === "page" && link.file === page.file);
        return from ? [{ page: p, label: from.label }] : [];
      })
    : [];

  const selectedCard = useRef<HTMLDivElement>(null);
  useEffect(() => {
    selectedCard.current?.scrollIntoView({ block: "nearest" });
  }, [selectedLink]);

  return (
    <div className="flex flex-col gap-3 p-3">
      {selection && selectedLink === null && selectedPath && <SelectedCard key={selectedPath.join()} html={page.html} path={selectedPath} pages={pages} onChange={onChange} />}

      <div className="flex h-5 items-center justify-between gap-2">
        <h2 className="label">{heading}</h2>
        <span className="text-[11px] tabular-nums text-muted">{links.length}</span>
      </div>

      {links.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {links.map(({ label, tag, key, link, index, path }) => {
            const target = link.kind === "page" ? pages.find((p) => p.file === link.file) : undefined;
            return (
              <div
                key={index}
                ref={index === selectedLink ? selectedCard : undefined}
                onClick={() => onSelect?.(path)}
                onMouseEnter={() => onHover?.(path)}
                onMouseLeave={() => onHover?.(null)}
                className={`flex flex-col gap-2 rounded-xl border bg-surface p-2.5 transition-colors ${onSelect ? "cursor-pointer" : ""} ${index === selectedLink ? "border-gold" : "border-line hover:border-muted"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-[13px] font-semibold">{label}</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted">
                    {tag}
                    {key && <kbd className="rounded border border-line px-1 font-mono text-[11px] uppercase text-gold">{key}</kbd>}
                  </span>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <Select compact label={`Action for ${label}`} value={linkValue(link)} onChange={(v) => onChange(setLink(page.html, index, linkFromValue(v)))}>
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
                      {link.kind === "page" && !target && <SelectItem value={`page:${link.file}`}>{link.file} (missing)</SelectItem>}
                    </SelectGroup>
                  </Select>
                </div>
                {link.kind === "page" && !target && <p className="text-xs text-gold-soft">{link.file} is not made yet.</p>}
                {target && index === selectedLink && onOpenPage && (
                  <button
                    type="button"
                    className="w-fit cursor-pointer text-xs font-medium text-gold hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPage(target.id);
                    }}
                  >
                    Open {target.title}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[13px] leading-snug text-muted">Click anything on the page to make it a link: to another page, back, closing the page, or running a command.</p>

      <div className="flex flex-col gap-1.5 pt-3">
        <h2 className="label">Reached from</h2>
        {opensFirst && <p className="text-[13px] text-muted">It opens first.</p>}
        {reachedFrom.map(({ page: from, label }) => (
          <p key={from.id} className="truncate text-[13px]">
            <span className="font-medium">{from.title}</span> <span className="text-muted">· &quot;{label}&quot;</span>
          </p>
        ))}
        {!opensFirst && reachedFrom.length === 0 && <p className="text-[13px] text-muted">No page links here yet.</p>}
      </div>
    </div>
  );
}
