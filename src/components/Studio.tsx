"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Code, Copy, Download, Eye, FileText, LayoutTemplate, Plus, Trash2 } from "lucide-react";
import type { PageLink } from "@/lib/gui/links";
import { downloadZip, pageCommand, pageFromTemplate, savePages, usePages, type GuiPage } from "@/lib/gui/pages";
import { TEMPLATES, type Template } from "@/lib/gui/templates";
import { COPYRIGHT_YEAR, SITE_NAME } from "@/lib/site";
import { LinksPanel } from "./LinksPanel";
import { Logo } from "./Logo";
import { Preview } from "./Preview";
import { TemplatePicker } from "./TemplatePicker";
import { ThemeToggle } from "./ThemeToggle";
import { Field, IconButton, Section, Segmented } from "./ui";

type View = "page" | "code";
const VIEWS: { value: View; label: string }[] = [
  { value: "page", label: "Page" },
  { value: "code", label: "Code" },
];

export default function Studio() {
  const pages = usePages();
  const [activeId, setActiveId] = useState(pages[0].id);
  const [backStack, setBackStack] = useState<string[]>([]);
  const [view, setView] = useState<View>("page");
  const [picking, setPicking] = useState(false);
  const [notice, setNotice] = useState("Click a button in the preview to try it.");
  const closePicker = useCallback(() => setPicking(false), []);

  // Stored pages arrive after hydration, so the first page is the fallback until one is chosen.
  const page = pages.find((p) => p.id === activeId) ?? pages[0];

  const open = (id: string) => {
    setActiveId(id);
    setBackStack([]);
  };

  const updatePage = (patch: Partial<GuiPage>) => savePages(pages.map((p) => (p.id === page.id ? { ...p, ...patch } : p)));

  const addFromTemplate = (template: Template) => {
    const created = pageFromTemplate(template, pages);
    savePages([...pages, created]);
    open(created.id);
    setPicking(false);
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
    if (link.kind === "none") setNotice("This button does nothing yet. Pick an action under Links.");
    if (link.kind === "back") {
      const previous = backStack.at(-1);
      if (!previous) return setNotice("There is no page to go back to.");
      setActiveId(previous);
      setBackStack(backStack.slice(0, -1));
      setNotice("Went back a page.");
    }
    if (link.kind === "page") {
      const target = pages.find((p) => p.file === link.file);
      if (!target) return setNotice(`There is no page called ${link.file}.`);
      setBackStack([...backStack, page.id]);
      setActiveId(target.id);
      setNotice(`Opened ${target.title}.`);
    }
  };

  const preview = (
    <Section
      icon={Eye}
      title="Live preview"
      description={notice}
      actions={<Segmented label="Editor view" value={view} onChange={setView} options={VIEWS} />}
    >
      <Preview html={page.html} title={`${page.title} preview`} onLink={tryLink} />
    </Section>
  );

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-line bg-bg/80 px-4 backdrop-blur sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <span className="text-lg font-semibold tracking-tight text-gold">{SITE_NAME}</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="btn" aria-label="Templates" onClick={() => setPicking(true)}>
            <LayoutTemplate className="size-4" aria-hidden />
            <span className="hidden sm:inline">Templates</span>
          </button>
          <button type="button" className="btn-gold" aria-label="Export pages" onClick={() => downloadZip(pages)}>
            <Download className="size-4" aria-hidden />
            <span className="hidden sm:inline">Export</span>
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="shrink-0 border-b border-line p-3 md:w-56 md:border-b-0 md:border-r md:p-4">
          <div className="flex items-center justify-between gap-2 md:sticky md:top-20">
            <span className="label">Pages</span>
            <IconButton label="New page" icon={Plus} onClick={() => addFromTemplate(TEMPLATES[0])} />
          </div>
          <nav aria-label="Pages" className="mt-2 flex gap-1 overflow-x-auto md:sticky md:top-30 md:flex-col md:overflow-visible">
            {pages.map((p) => {
              const active = p.id === page.id;
              return (
                <div key={p.id} className={`flex shrink-0 items-center rounded-xl transition-colors ${active ? "bg-gold/10 text-gold" : "text-ink hover:bg-raised"}`}>
                  <button
                    type="button"
                    aria-current={active ? "page" : undefined}
                    onClick={() => open(p.id)}
                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 whitespace-nowrap px-3 py-2.5 text-left text-sm font-medium"
                  >
                    <FileText className="size-4 shrink-0" aria-hidden />
                    <span className="truncate md:max-w-28">{p.title}</span>
                  </button>
                  {active && pages.length > 1 && <IconButton label={`Delete ${p.title}`} icon={Trash2} onClick={() => deletePage(p)} />}
                </div>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className={`mx-auto grid w-full max-w-7xl items-start gap-5 px-4 py-8 sm:px-6 ${view === "code" ? "xl:grid-cols-2" : "xl:grid-cols-[minmax(0,1fr)_20rem]"}`}>
            <div className="min-w-0">
              {view === "page" ? (
                preview
              ) : (
                <Section icon={Code} title="Code" description={page.file} actions={<Segmented label="Editor view" value={view} onChange={setView} options={VIEWS} />}>
                  <textarea
                    aria-label={`HTML of ${page.title}`}
                    className="input min-h-[34rem] resize-y whitespace-pre font-mono text-xs leading-relaxed"
                    spellCheck={false}
                    value={page.html}
                    onChange={(e) => updatePage({ html: e.target.value })}
                  />
                </Section>
              )}
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              {view === "code" && (
                <Section icon={Eye} title="Live preview" description={notice}>
                  <Preview html={page.html} title={`${page.title} preview`} onLink={tryLink} />
                </Section>
              )}
              <Section icon={FileText} title="Page" description={page.file}>
                <Field label="Title">
                  <input aria-label="Page title" className="input" value={page.title} maxLength={40} onChange={(e) => updatePage({ title: e.target.value })} />
                </Field>
                <Field label="Open in game">
                  <div className="flex items-center gap-2">
                    <code className="min-w-0 flex-1 truncate rounded-xl border border-line bg-raised px-4 py-2.5 font-mono text-xs">{pageCommand(page)}</code>
                    <IconButton label="Copy the command" icon={Copy} onClick={copyCommand} />
                  </div>
                </Field>
              </Section>
              <LinksPanel page={page} pages={pages} onChange={(html) => updatePage({ html })} />
            </div>
          </main>
          <footer className="mt-auto py-8 text-center text-sm text-muted">
            © {COPYRIGHT_YEAR} {SITE_NAME}. All rights reserved.
          </footer>
        </div>
      </div>

      {picking && <TemplatePicker onPick={addFromTemplate} onClose={closePicker} />}
    </>
  );
}
