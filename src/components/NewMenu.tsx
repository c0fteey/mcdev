"use client";

import * as Popover from "@radix-ui/react-popover";
import { FileCode, FilePlus, LayoutTemplate, Plus } from "lucide-react";
import type { GuiProject } from "@/lib/gui/pages";

// Pages from before projects existed have no date yet, and they get today's on their next save.
function formatDate(time: number) {
  const date = time > 0 ? new Date(time) : new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

const ITEM = "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors hover:bg-raised";

export function NewMenu({
  recent,
  currentId,
  onBlank,
  onTemplate,
  onOpen,
}: {
  recent: GuiProject[];
  currentId: string;
  onBlank: () => void;
  onTemplate: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger className="btn-ghost data-[state=open]:bg-raised data-[state=open]:text-ink" aria-label="New">
        <Plus className="size-3.5" aria-hidden />
        <span className="hidden lg:inline">New</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          collisionPadding={8}
          className="z-[60] flex max-h-[min(28rem,var(--radix-popover-content-available-height))] w-64 flex-col gap-0.5 overflow-y-auto rounded-xl border border-line bg-surface p-1 shadow-[0_1px_2px_rgb(0_0_0/0.25),0_12px_32px_rgb(0_0_0/0.4)]"
        >
          <Popover.Close className={ITEM} onClick={onBlank}>
            <FilePlus className="size-4 shrink-0 text-muted" aria-hidden />
            Blank project
          </Popover.Close>
          <Popover.Close className={ITEM} onClick={onTemplate}>
            <LayoutTemplate className="size-4 shrink-0 text-muted" aria-hidden />
            From a template…
          </Popover.Close>

          {recent.length > 0 && (
            <>
              <div className="mx-1 my-1 h-px shrink-0 bg-line" />
              <h2 className="label px-2.5 pb-1 pt-1">Recent in this browser</h2>
              {recent.map((project) => {
                const isCurrent = project.id === currentId;
                return (
                  <Popover.Close key={project.id} className={ITEM} aria-current={isCurrent ? "true" : undefined} onClick={() => onOpen(project.id)}>
                    <FileCode className={`size-4 shrink-0 ${isCurrent ? "text-gold" : "text-muted"}`} aria-hidden />
                    <span className={`min-w-0 flex-1 truncate ${isCurrent ? "text-gold" : ""}`}>{project.pages[0].title}</span>
                    <span className="shrink-0 font-plex text-[11px] font-normal text-muted">{formatDate(project.updatedAt)}</span>
                  </Popover.Close>
                );
              })}
            </>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
