"use client";

import { ArrowRight } from "lucide-react";
import { findLinks } from "@/lib/gui/links";
import type { GuiPage } from "@/lib/gui/pages";
import { Preview } from "./Preview";

// Only rendered after a click on Map, so DOMParser is always there.
export function MapView({ pages, onOpen }: { pages: GuiPage[]; onOpen: (id: string) => void }) {
  return (
    <div className="canvas-dots min-h-0 flex-1 overflow-y-auto p-6">
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pages.map((page, index) => {
          const targets = findLinks(page.html).flatMap(({ link }) => (link.kind === "page" ? (pages.find((p) => p.file === link.file) ?? []) : []));
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => onOpen(page.id)}
              className="flex cursor-pointer flex-col gap-3 rounded-xl border border-line bg-surface p-3 text-left transition-colors hover:border-gold"
            >
              <Preview html={page.html} title={`${page.title} preview`} />
              <span className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-semibold">{page.title}</span>
                {index === 0 && <span className="shrink-0 text-xs text-gold-soft">Opens first</span>}
              </span>
              <span className="flex min-h-4 flex-wrap items-center gap-1.5 text-xs text-muted">
                {targets.length === 0 && "Links to no other page"}
                {targets.map((target) => (
                  <span key={target.id} className="inline-flex items-center gap-1">
                    <ArrowRight className="size-3 text-gold" aria-hidden />
                    {target.title}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
