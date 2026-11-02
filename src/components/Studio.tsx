"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUp, Code, LayoutPanelTop, LayoutTemplate, Link2, MousePointerClick, Network, Paperclip, Play, Send, Sparkles } from "lucide-react";
import { describeClick, elementPath, renameLinks, type PageLink } from "@/lib/gui/links";
import { blankPage, firstBlankPage, pageCommand, pagesFromTemplate, useProjects, type GuiPage } from "@/lib/gui/pages";
import type { Template } from "@/lib/gui/templateLibrary";
import { SITE_NAME } from "@/lib/site";
import { ClickLog, type ClickLogLine } from "./ClickLog";
import { ExportMenu } from "./ExportMenu";
import { LinksPanel } from "./LinksPanel";
import { Logo } from "./Logo";
import { NewMenu } from "./NewMenu";
import { PageDetails } from "./PageDetails";
import { PagesPanel } from "./PagesPanel";
import { Preview } from "./Preview";
import { ThemeToggle } from "./ThemeToggle";
import { Segmented } from "./ui";

// The editor is heavy and only the Code view needs it.
const CodeEditor = dynamic(() => import("./CodeEditor"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse bg-surface" />,
});
// So are the map and the template pages, which only load when opened.
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <div className="canvas-dots flex-1" />,
});
const TemplatePicker = dynamic(() => import("./TemplatePicker").then((m) => m.TemplatePicker), { ssr: false });

const MAX_LOG_LINES = 8;
const UNDO_MS = 8000;

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
  links: "Click anything to link it",
  try: "Click a button to try it",
};

export default function Studio() {
  const { pages, currentId, recent, savePages, openProject, createProject } = useProjects();
  const [activeId, setActiveId] = useState(pages[0].id);
  const [backStack, setBackStack] = useState<string[]>([]);
  const [view, setView] = useState<View>("page");
  const [mode, setMode] = useState<Mode>("links");
  const [selectedPath, setSelectedPath] = useState<number[] | null>(null);
  const [picking, setPicking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [log, setLog] = useState<ClickLogLine[]>([]);
  const [undo, setUndo] = useState<{ message: string; pages: GuiPage[]; activeId: string } | null>(null);
  const nextLogId = useRef(0);
  const closePicker = useCallback(() => setPicking(false), []);

  // Stored pages arrive after hydration, so the first page is the fallback until one is chosen.
  const page = pages.find((p) => p.id === activeId) ?? pages[0];

  const showPage = (id: string) => {
    setActiveId(id);
    setSelectedPath(null);
  };

  const open = (id: string) => {
    showPage(id);
    setBackStack([]);
    setNotice(null);
  };

  const changeMode = (next: Mode) => {
    setMode(next);
    setSelectedPath(null);
    setNotice(null);
    setLog([]);
    setBackStack([]);
  };

  const updatePage = (patch: Partial<GuiPage>) => savePages(pages.map((p) => (p.id === page.id ? { ...p, ...patch } : p)));

  // Deleting happens at once, with a moment to take it back.
  const offerUndo = (message: string) => setUndo({ message, pages, activeId: page.id });

  const takeBack = () => {
    if (!undo) return;
    savePages(undo.pages);
    open(undo.activeId);
    setUndo(null);
  };

  useEffect(() => {
    if (!undo) return;
    const timer = setTimeout(() => setUndo(null), UNDO_MS);
    return () => clearTimeout(timer);
  }, [undo]);

  const addBlankPage = () => {
    const created = blankPage(pages);
    savePages([...pages, created]);
    open(created.id);
    if (view === "map") setView("page");
  };

  // Moving to another project clears everything that belonged to the last one.
  const enterProject = (firstPageId: string) => {
    open(firstPageId);
    setLog([]);
    setUndo(null);
    setPicking(false);
  };

  const startProject = (created: GuiPage[]) => {
    createProject(created);
    enterProject(created[0].id);
  };

  const openRecent = (id: string) => {
    const project = recent.find((p) => p.id === id);
    if (!project || id === currentId) return;
    openProject(id);
    enterProject(project.pages[0].id);
  };

  const applyTemplate = (template: Template) => startProject(pagesFromTemplate(template));

  const deletePage = (target: GuiPage) => {
    offerUndo(`Deleted ${target.title}.`);
    savePages(pages.filter((p) => p.id !== target.id));
  };

  // Links in every page follow the new name, so nothing on the map comes apart.
  const renameFile = (input: HTMLInputElement) => {
    const slug = input.value.trim().toLowerCase().replace(/\.html$/, "").replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    const file = `${slug}.html`;
    if (!slug || pages.some((p) => p.id !== page.id && p.file === file)) {
      setNotice(slug ? `There is already a page called ${file}.` : "A file needs a name.");
      input.value = page.file;
      return;
    }
    input.value = file;
    if (file === page.file) return;
    savePages(pages.map((p) => ({ ...p, file: p.id === page.id ? file : p.file, html: renameLinks(p.html, page.file, file) })));
  };

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(pageCommand(page));
      setNotice("Command copied.");
    } catch {
      setNotice("Could not copy. Select the command and copy it by hand.");
    }
  };

  // The same click in game, acted out in the browser and listed in the click log.
  const tryLink = (link: PageLink, element: Element) => {
    const effects = describeClick(element);
    setNotice(effects.length === 0 ? "This button does nothing yet." : null);
    const firstId = nextLogId.current;
    nextLogId.current += effects.length;
    setLog((current) => [...current, ...effects.map((effect, i) => ({ ...effect, id: firstId + i }))].slice(-MAX_LOG_LINES));

    if (link.kind === "back") {
      const previous = backStack.at(-1);
      if (!previous) return setNotice("There is no page to go back to.");
      showPage(previous);
      setBackStack(backStack.slice(0, -1));
    }
    if (link.kind === "page") {
      const target = pages.find((p) => p.file === link.file);
      if (!target) return setNotice(`There is no page called ${link.file}.`);
      setBackStack([...backStack, page.id]);
      showPage(target.id);
    }
  };

  // The Code view has no links panel, so clicks there always try the button.
  const choosing = view === "page" && mode === "links";

  const expireLogLine = (id: number) => setLog((current) => current.filter((line) => line.id !== id));

  const preview = (
    <Preview
      fill
      html={page.html}
      title={`${page.title} preview`}
      showLinks={choosing}
      selectedPath={choosing ? selectedPath : null}
      onClickLink={tryLink}
      onSelect={choosing ? (element) => setSelectedPath(element && elementPath(element)) : undefined}
    />
  );

  return (
    <div className="flex min-h-dvh flex-col md:h-dvh md:min-h-0 md:overflow-hidden">
      <header className="sticky top-0 z-40 flex h-13 shrink-0 items-center gap-0.5 border-b border-line bg-bg/90 px-2 backdrop-blur sm:gap-1 sm:px-3">
        <Link href="/" className="mr-1 flex shrink-0 items-center gap-2 rounded-lg sm:mr-2">
          <Logo size={28} />
          <span className="hidden text-[15px] font-semibold tracking-tight text-gold lg:inline">{SITE_NAME}</span>
        </Link>
        <NewMenu recent={recent} currentId={currentId} onBlank={() => startProject([firstBlankPage()])} onTemplate={() => setPicking(true)} onOpen={openRecent} />
        <button type="button" className="btn-ghost" aria-label="Templates" onClick={() => setPicking(true)}>
          <LayoutTemplate className="size-3.5" aria-hidden />
          <span className="hidden lg:inline">Templates</span>
        </button>
        <div className="mx-1 sm:mx-2">
          <Segmented label="Editor view" value={view} onChange={setView} options={VIEWS} />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
          <ExportMenu pages={pages} active={page} />
          <button type="button" className="btn-gold hidden sm:inline-flex" disabled title="Coming soon: this needs the server connection">
            <Send className="size-3.5" aria-hidden />
            Send to server
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <PagesPanel pages={pages} active={page} onOpen={open} onAdd={addBlankPage} onDelete={deletePage} onCopyCommand={copyCommand} />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          {view === "map" && (
            <MapView
              pages={pages}
              selectedId={page.id}
              onSelect={open}
              onOpen={(id) => {
                open(id);
                setView("page");
              }}
            >
              <AiComposer pageTitle={page.title} />
            </MapView>
          )}

          {view === "page" && (
            <>
              <div className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1.5 border-b border-line px-2 py-1.5">
                <div className="flex min-w-0 items-center gap-1">
                  <input
                    aria-label="Page title"
                    size={Math.max(page.title.length, 4)}
                    maxLength={40}
                    className="h-7 min-w-0 max-w-44 rounded-md border border-transparent bg-transparent px-1.5 text-[13px] font-semibold outline-none transition-colors [field-sizing:content] hover:border-line focus:border-gold"
                    value={page.title}
                    onChange={(e) => updatePage({ title: e.target.value })}
                  />
                  <input
                    key={page.file}
                    aria-label="File name"
                    title="The file name other pages link to"
                    defaultValue={page.file}
                    spellCheck={false}
                    size={Math.max(page.file.length, 4)}
                    className="mr-1 h-7 min-w-0 max-w-44 rounded-md border border-transparent bg-transparent px-1.5 font-mono text-[11px] text-muted outline-none transition-colors [field-sizing:content] hover:border-line focus:border-gold focus:text-ink"
                    onBlur={(e) => renameFile(e.currentTarget)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </div>
                <Segmented label="Preview mode" value={mode} onChange={changeMode} options={MODES} />
                <p aria-live="polite" className="ml-auto flex min-w-0 items-center gap-1.5 pr-1 text-xs text-muted">
                  <MousePointerClick className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">{notice ?? HINTS[mode]}</span>
                </p>
              </div>
              <div className="canvas-dots relative h-[64vw] min-h-0 shrink-0 p-4 md:h-auto md:flex-1 md:px-8 md:pb-22 md:pt-8">
                {preview}
                <ClickLog lines={log} onExpire={expireLogLine} />
              </div>
              <AiComposer pageTitle={page.title} />
            </>
          )}

          {view === "code" && (
            <div className="grid min-h-0 flex-1 md:grid-cols-2">
              <div className="flex min-h-0 flex-col border-b border-line md:border-b-0 md:border-r">
                <div className="relative h-96 min-h-0 flex-1 md:h-auto">
                  {/* A new key per page, so undo never brings back another page's code */}
                  <CodeEditor key={page.id} value={page.html} onChange={(html) => updatePage({ html })} />
                </div>
                <p className="flex h-8 shrink-0 items-center justify-between gap-2 border-t border-line px-3 text-[11px] text-muted">
                  <span className="truncate font-mono">{page.file}</span>
                  <span className="shrink-0">Saved in this browser</span>
                </p>
              </div>
              <div className="canvas-dots relative flex min-h-0 flex-col">
                <div className="h-[64vw] min-h-0 p-4 md:h-auto md:flex-1 md:px-6 md:pb-22 md:pt-6">{preview}</div>
                <ClickLog lines={log} onExpire={expireLogLine} />
                <AiComposer pageTitle={page.title} />
              </div>
            </div>
          )}
        </main>

        {view !== "code" && (
          <aside className="shrink-0 overflow-y-auto border-t border-line bg-bg md:w-64 md:border-l md:border-t-0 lg:w-72">
            {view === "map" ? (
              <PageDetails page={page} pages={pages} onChange={(html) => updatePage({ html })} onOpen={() => setView("page")} onDelete={() => deletePage(page)} />
            ) : (
              <LinksPanel page={page} pages={pages} selectedPath={choosing ? selectedPath : null} onChange={(html) => updatePage({ html })} />
            )}
          </aside>
        )}
      </div>

      {picking && <TemplatePicker onPick={applyTemplate} onClose={closePicker} />}

      {undo && (
        <div role="status" className="fixed bottom-4 left-1/2 z-[60] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-xl border border-line bg-raised py-1.5 pl-3 pr-1.5 text-[13px] shadow-[0_1px_2px_rgb(0_0_0/0.25),0_12px_32px_rgb(0_0_0/0.4)]">
          <span className="min-w-0 truncate">{undo.message}</span>
          <button type="button" className="btn-ghost h-7 text-gold hover:text-gold" onClick={takeBack}>
            Undo
          </button>
        </div>
      )}
    </div>
  );
}

// Shown so the layout is final; it turns on when the AI backend exists.
function AiComposer({ pageTitle }: { pageTitle: string }) {
  return (
    <div className="p-2 md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:flex md:justify-center md:p-4">
      <div className="pointer-events-auto flex h-10 w-full max-w-xl items-center gap-1.5 rounded-xl border border-line bg-surface pl-3 pr-1.5 shadow-[0_1px_2px_rgb(0_0_0/0.25),0_8px_24px_rgb(0_0_0/0.3)]">
        <Sparkles className="size-3.5 shrink-0 text-gold" aria-hidden />
        <input
          disabled
          aria-label={`Describe a change to ${pageTitle}`}
          placeholder="AI editing is coming soon"
          className="min-w-0 flex-1 bg-transparent px-1 text-[13px] outline-none placeholder:text-muted disabled:cursor-not-allowed"
        />
        <span className="hidden h-6 shrink-0 items-center rounded-md border border-line bg-raised px-1.5 text-xs font-medium text-muted sm:inline-flex">Minecraft</span>
        <button type="button" disabled aria-label="Attach a picture" className="grid size-7 shrink-0 cursor-not-allowed place-items-center rounded-md text-muted opacity-40">
          <Paperclip className="size-3.5" aria-hidden />
        </button>
        <button type="button" disabled aria-label="Send" className="grid size-7 shrink-0 cursor-not-allowed place-items-center rounded-md bg-raised text-muted opacity-40">
          <ArrowUp className="size-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
