"use client";

import { Sparkles, Trash2 } from "lucide-react";
import { pageCommand, type GuiPage } from "@/lib/gui/pages";
import { LinksPanel } from "./LinksPanel";
import { Preview } from "./Preview";
import { IconButton } from "./ui";

// The Map view's side panel: the chosen page and where it leads.
export function PageDetails({
  page,
  pages,
  onChange,
  onOpen,
  onDelete,
}: {
  page: GuiPage;
  pages: GuiPage[];
  onChange: (html: string) => void;
  onOpen: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 p-3 pb-0">
        <Preview html={page.html} title={`${page.title} preview`} />
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{page.title}</h2>
            <p className="truncate font-mono text-[11px] text-muted">
              {page.file} · {pageCommand(page)}
            </p>
          </div>
          {pages.length > 1 && <IconButton label={`Delete ${page.title}`} icon={Trash2} onClick={onDelete} />}
        </div>
      </div>
      <LinksPanel page={page} pages={pages} selected={null} onChange={onChange} heading="Goes to" />
      <div className="flex gap-2 px-3 pb-3">
        <button type="button" className="btn-gold flex-1" onClick={onOpen}>
          Open page
        </button>
        <button type="button" className="btn-ghost flex-1 cursor-not-allowed border border-line opacity-50" disabled title="Coming soon: this needs the AI connection">
          <Sparkles className="size-3.5" aria-hidden />
          Edit with AI
        </button>
      </div>
    </div>
  );
}
