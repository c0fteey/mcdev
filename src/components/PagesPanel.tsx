"use client";

import { Copy, Monitor, Plus, Send, Trash2 } from "lucide-react";
import { pageCommand, type GuiPage } from "@/lib/gui/pages";
import { Preview } from "./Preview";
import { IconButton } from "./ui";

export function PagesPanel({
  pages,
  active,
  onOpen,
  onAdd,
  onDelete,
  onCopyCommand,
}: {
  pages: GuiPage[];
  active: GuiPage;
  onOpen: (id: string) => void;
  onAdd: () => void;
  onDelete: (page: GuiPage) => void;
  onCopyCommand: () => void;
}) {
  return (
    <aside className="flex shrink-0 flex-col gap-3 border-b border-line bg-bg p-3 md:min-h-0 md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-2 pl-1">
        <h2 className="text-sm font-semibold">
          Pages <span className="ml-1 font-normal text-muted">{pages.length}</span>
        </h2>
        <IconButton label="New page" icon={Plus} onClick={onAdd} />
      </div>

      <nav aria-label="Pages" className="flex min-h-0 flex-1 gap-1 overflow-x-auto md:flex-col md:overflow-y-auto md:overflow-x-hidden">
        {pages.map((p, index) => {
          const isActive = p.id === active.id;
          return (
            <div key={p.id} className={`flex shrink-0 items-center rounded-xl transition-colors ${isActive ? "bg-gold/10" : "hover:bg-raised"}`}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onOpen(p.id)}
                className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 p-2 text-left"
              >
                <span className="w-10 shrink-0" aria-hidden>
                  <Preview html={p.html} title="" />
                </span>
                <span className={`max-w-28 truncate text-sm font-medium md:max-w-none ${isActive ? "text-gold" : ""}`}>{p.title}</span>
                {index === 0 && <span className="ml-auto hidden shrink-0 pl-1 text-xs text-gold-soft md:inline">Opens first</span>}
              </button>
              {isActive && pages.length > 1 && <IconButton label={`Delete ${p.title}`} icon={Trash2} onClick={() => onDelete(p)} />}
            </div>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface p-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Monitor className="size-4 text-muted" aria-hidden />
          In game
        </h2>
        <div className="flex items-center gap-1 rounded-lg border border-line bg-raised pl-3">
          <code className="min-w-0 flex-1 truncate font-mono text-xs">{pageCommand(active)}</code>
          <IconButton label="Copy the command" icon={Copy} onClick={onCopyCommand} />
        </div>
        <button type="button" className="btn-gold w-full" disabled title="Coming soon: this needs the server connection">
          <Send className="size-4" aria-hidden />
          Send to server
        </button>
      </div>
    </aside>
  );
}
