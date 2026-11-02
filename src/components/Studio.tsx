"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowUp, Code, Download, LayoutPanelTop, LayoutTemplate, Link2, Network, Paperclip, Play, Plus, Send, Sparkles } from "lucide-react";
import type { PageLink } from "@/lib/gui/links";
import { downloadZip, pageCommand, pageFromTemplate, savePages, usePages, type GuiPage } from "@/lib/gui/pages";
import { TEMPLATES, type Template } from "@/lib/gui/templates";
import { SITE_NAME } from "@/lib/site";
import { LinksPanel } from "./LinksPanel";
import { Logo } from "./Logo";
import { MapView } from "./MapView";
import { PagesPanel } from "./PagesPanel";
import { Preview } from "./Preview";
import { TemplatePicker } from "./TemplatePicker";
import { ThemeToggle } from "./ThemeToggle";
import { Segmented } from "./ui";

type View = "map" | "page" | "code";
const VIEWS: { value: View; label: string; icon: typeof Code }[] = [
  { value: "map", label: "Map", icon: Network },
  { value: "page", label: "Page", icon: LayoutPanelTop },
  { value: "code", label: "Code", icon: Code },
];

type Mode = "links" | "try";
const MODES: { value: Mode; label: string; icon: typeof Code }[] = [
  { value: "links", label: "Links", icon: Link2 },
  { value: "try", label: "Try it", icon: Play },
];

const HINTS: Record<Mode, string> = {
  links: "Click a button to choose what it does",
  try: "Click a button to try it",
};

export default function Studio() {
  const pages = usePages();
  const [activeId, setActiveId] = useState(pages[0].id);
  const [backStack, setBackStack] = useState<string[]>([]);
  const [view, setView] = useState<View>("page");
  const [mode, setMode] = useState<Mode>("links");
  const [selectedLink, setSelectedLink] = useState<number | null>(null);
  const [picking, setPicking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const closePicker = useCallback(() => setPicking(false), []);

  // Stored pages arrive after hydration, so the first page is the fallback until one is chosen.
  const page = pages.find((p) => p.id === activeId) ?? pages[0];

  const showPage = (id: string) => {
    setActiveId(id);
    setSelectedLink(null);
  };

  const open = (id: string) => {
    showPage(id);
    setBackStack([]);
    setNotice(null);
  };

  const changeMode = (next: Mode) => {
    setMode(next);
    setSelectedLink(null);
    setNotice(null);
    setBackStack([]);
  };

  const updatePage = (patch: Partial<GuiPage>) => savePages(pages.map((p) => (p.id === page.id ? { ...p, ...patch } : p)));

  const addFromTemplate = (template: Template) => {
    const created = pageFromTemplate(template, pages);
    savePages([...pages, created]);
    open(created.id);
    setPicking(false);
    if (view === "map") setView("page");
  };

  const deletePage = (target: GuiPage) => {
    if (window.confirm(`Delete "${target.title}"? This cannot be undone.`)) savePages(pages.filter((p) => p.id !== target.id));
  };

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(pageCommand(page));
      setNotice("Command copied.");
    } catch {
      setNotice("Could not copy. Select the command and copy it by hand.");
    }
  };

  // The same click in game, acted out in the browser.
  const tryLink = (link: PageLink) => {
    if (link.kind === "close") setNotice("In game, this closes the page.");
    if (link.kind === "command") setNotice(link.command ? `In game, this runs /${link.command}` : "This button has no command yet.");
    if (link.kind === "none") setNotice("This button does nothing yet.");
    if (link.kind === "back") {
      const previous = backStack.at(-1);
      if (!previous) return setNotice("There is no page to go back to.");
      showPage(previous);
      setBackStack(backStack.slice(0, -1));
      setNotice("Went back a page.");
    }
    if (link.kind === "page") {
      const target = pages.find((p) => p.file === link.file);
      if (!target) return setNotice(`There is no page called ${link.file}.`);
      setBackStack([...backStack, page.id]);
      showPage(target.id);
      setNotice(`Opened ${target.title}.`);
    }
  };

  const onClickLink = (link: PageLink, index: number) => {
    if (mode === "links") setSelectedLink(index);
    else tryLink(link);
  };

  const preview = <Preview fill html={page.html} title={`${page.title} preview`} showLinks={view === "page" && mode === "links"} onClickLink={onClickLink} />;

  return (
    <div className="flex min-h-dvh flex-col md:h-dvh md:min-h-0 md:overflow-hidden">
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-1 border-b border-line bg-bg/90 px-2 backdrop-blur sm:gap-2 sm:px-4">
        <Link href="/" className="mr-1 flex shrink-0 items-center gap-2.5 sm:mr-3">
          <Logo size={32} />
          <span className="hidden text-lg font-semibold tracking-tight text-gold lg:inline">{SITE_NAME}</span>
        </Link>
        <button type="button" className="btn-ghost" aria-label="New page" onClick={() => addFromTemplate(TEMPLATES[0])}>
          <Plus className="size-4" aria-hidden />
          <span className="hidden lg:inline">New</span>
        </button>
        <button type="button" className="btn-ghost" aria-label="Templates" onClick={() => setPicking(true)}>
          <LayoutTemplate className="size-4" aria-hidden />
          <span className="hidden lg:inline">Templates</span>
        </button>
        <div className="mx-1 sm:mx-2">
          <Segmented label="Editor view" value={view} onChange={setView} options={VIEWS} />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <button type="button" className="btn-ghost" aria-label="Export pages" onClick={() => downloadZip(pages)}>
            <Download className="size-4" aria-hidden />
            <span className="hidden lg:inline">Export</span>
          </button>
          <button type="button" className="btn-gold hidden sm:inline-flex" disabled title="Coming soon: this needs the server connection">
            <Send className="size-4" aria-hidden />
            Send to server
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <PagesPanel pages={pages} active={page} onOpen={open} onAdd={() => addFromTemplate(TEMPLATES[0])} onDelete={deletePage} onCopyCommand={copyCommand} />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          {view === "map" && (
            <MapView
              pages={pages}
              onOpen={(id) => {
                open(id);
                setView("page");
              }}
            />
          )}

          {view === "page" && (
            <>
              <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-3 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <input
                    aria-label="Page title"
                    size={Math.max(page.title.length, 4)}
                    maxLength={40}
                    className="min-w-0 max-w-44 rounded-md border border-transparent bg-transparent px-1.5 py-0.5 text-sm font-semibold outline-none transition-colors hover:border-line focus:border-gold"
                    value={page.title}
                    onChange={(e) => updatePage({ title: e.target.value })}
                  />
                  <span className="hidden truncate font-mono text-xs text-muted sm:inline">{page.file}</span>
                </div>
                <Segmented label="Preview mode" value={mode} onChange={changeMode} options={MODES} />
                <p aria-live="polite" className="ml-auto min-w-0 truncate text-xs text-muted">
                  {notice ?? HINTS[mode]}
                </p>
              </div>
              <div className="canvas-dots relative h-[64vw] min-h-0 shrink-0 p-4 md:h-auto md:flex-1 md:p-6 md:pb-24">{preview}</div>
              <AiComposer pageTitle={page.title} />
            </>
          )}

          {view === "code" && (
            <div className="grid min-h-0 flex-1 md:grid-cols-2">
              <div className="flex min-h-0 flex-col border-b border-line md:border-b-0 md:border-r">
                <textarea
                  aria-label={`HTML of ${page.title}`}
                  className="h-96 min-h-0 w-full flex-1 resize-none whitespace-pre bg-surface p-4 font-mono text-xs leading-relaxed outline-none md:h-auto"
                  spellCheck={false}
                  value={page.html}
                  onChange={(e) => updatePage({ html: e.target.value })}
                />
                <p className="flex shrink-0 items-center justify-between gap-2 border-t border-line px-3 py-2 text-xs text-muted">
                  <span className="truncate font-mono">{page.file}</span>
                  <span className="shrink-0">Saved in this browser</span>
                </p>
              </div>
              <div className="canvas-dots relative flex min-h-0 flex-col">
                <div className="h-[64vw] min-h-0 p-4 md:h-auto md:flex-1 md:p-6 md:pb-24">{preview}</div>
                <AiComposer pageTitle={page.title} />
              </div>
            </div>
          )}
        </main>

        {view !== "code" && (
          <aside className="shrink-0 overflow-y-auto border-t border-line bg-bg md:w-80 md:border-l md:border-t-0">
            <LinksPanel page={page} pages={pages} selected={selectedLink} onChange={(html) => updatePage({ html })} />
          </aside>
        )}
      </div>

      {picking && <TemplatePicker onPick={addFromTemplate} onClose={closePicker} />}
    </div>
  );
}

// Shown so the layout is final; it turns on when the AI backend exists.
function AiComposer({ pageTitle }: { pageTitle: string }) {
  return (
    <div className="p-3 md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:flex md:justify-center md:p-5">
      <div className="pointer-events-auto flex w-full max-w-2xl items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 shadow-2xl shadow-black/30">
        <Sparkles className="size-4 shrink-0 text-gold" aria-hidden />
        <input
          disabled
          aria-label={`Describe a change to ${pageTitle}`}
          placeholder="AI editing is coming soon"
          className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed"
        />
        <span className="hidden shrink-0 rounded-md border border-line bg-raised px-2 py-1 text-xs font-medium text-muted sm:inline">Minecraft</span>
        <button type="button" disabled aria-label="Attach a picture" className="grid size-7 shrink-0 place-items-center rounded-lg text-muted opacity-40">
          <Paperclip className="size-4" aria-hidden />
        </button>
        <button type="button" disabled aria-label="Send" className="grid size-7 shrink-0 place-items-center rounded-lg bg-raised text-muted opacity-40">
          <ArrowUp className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
