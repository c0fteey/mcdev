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
    <aside className="flex shrink-0 flex-col gap-1.5 border-b border-line bg-bg p-2 md:min-h-0 md:w-64 md:border-b-0 md:border-r lg:w-[17rem]">
      <div className="flex h-8 items-center justify-between gap-2 pl-2 pr-0.5">
        <h2 className="text-[13px] font-semibold">
          Pages <span className="ml-0.5 font-normal tabular-nums text-muted">{pages.length}</span>
        </h2>
        <IconButton label="New page" icon={Plus} onClick={onAdd} />
      </div>

      <nav aria-label="Pages" className="flex min-h-0 flex-1 gap-0.5 overflow-x-auto md:flex-col md:overflow-y-auto md:overflow-x-hidden">
        {pages.map((p, index) => {
          const isActive = p.id === active.id;
          return (
            <div key={p.id} className={`group flex shrink-0 items-center rounded-lg transition-colors ${isActive ? "bg-gold/10" : "hover:bg-raised"}`}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onOpen(p.id)}
                className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1.5 text-left"
              >
                <span className="w-9 shrink-0" aria-hidden>
                  <Preview thumbnail html={p.html} title="" />
                </span>
                <span className={`max-w-28 truncate text-[13px] font-medium md:max-w-none md:flex-1 ${isActive ? "text-gold" : ""}`}>{p.title}</span>
                {index === 0 && <span className="hidden shrink-0 pl-1 text-[11px] text-gold-soft md:inline">Opens first</span>}
              </button>
              {/* Takes no room until it is needed, so names have the whole row */}
              {isActive && pages.length > 1 && (
                <span className="w-0 shrink-0 overflow-hidden group-focus-within:w-auto group-focus-within:pr-0.5 group-hover:w-auto group-hover:overflow-visible group-hover:pr-0.5 pointer-coarse:w-auto pointer-coarse:pr-0.5">
                  <IconButton label={`Delete ${p.title}`} icon={Trash2} onClick={() => onDelete(p)} />
                </span>
              )}
            </div>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 rounded-xl border border-line bg-surface p-2">
        <h2 className="flex items-center gap-1.5 px-0.5 text-[13px] font-semibold">
          <Monitor className="size-3.5 text-muted" aria-hidden />
          In game
        </h2>
        <div className="flex h-8 items-center rounded-lg border border-line bg-raised pl-2.5 pr-0.5 pointer-coarse:h-10">
          <code className="min-w-0 flex-1 truncate font-mono text-xs">{pageCommand(active)}</code>
          <IconButton label="Copy the command" icon={Copy} onClick={onCopyCommand} />
        </div>
        <button type="button" className="btn-gold w-full" disabled title="Coming soon: this needs the server connection">
          <Send className="size-3.5" aria-hidden />
          Send to server
        </button>
      </div>
    </aside>
  );
}
