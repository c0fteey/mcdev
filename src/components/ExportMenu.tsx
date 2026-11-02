"use client";

import * as Popover from "@radix-ui/react-popover";
import { Download, FileCode } from "lucide-react";
import { downloadPage, downloadZip, type GuiPage } from "@/lib/gui/pages";

const ITEM = "flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors hover:bg-raised";

export function ExportMenu({ pages, active }: { pages: GuiPage[]; active: GuiPage }) {
  return (
    <Popover.Root>
      <Popover.Trigger className="btn-ghost data-[state=open]:bg-raised data-[state=open]:text-ink" aria-label="Export">
        <Download className="size-3.5" aria-hidden />
        <span className="hidden lg:inline">Export</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          collisionPadding={8}
          className="z-[60] flex w-60 flex-col gap-0.5 rounded-xl border border-line bg-surface p-1 shadow-[0_1px_2px_rgb(0_0_0/0.25),0_12px_32px_rgb(0_0_0/0.4)]"
        >
          <Popover.Close className={ITEM} onClick={() => downloadZip(pages)}>
            <Download className="size-4 shrink-0 text-muted" aria-hidden />
            <span className="min-w-0">
              Everything (.zip)
              <span className="block truncate text-[11px] font-normal text-muted">For plugins/MCGUI/pages/</span>
            </span>
          </Popover.Close>
          <Popover.Close className={ITEM} onClick={() => downloadPage(active)}>
            <FileCode className="size-4 shrink-0 text-muted" aria-hidden />
            <span className="min-w-0 truncate">Just {active.file}</span>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
