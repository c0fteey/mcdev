"use client";

import type { ClickEffect, ClickEffectKind } from "@/lib/gui/links";

export interface ClickLogLine extends ClickEffect {
  id: number;
}

// The lines sit on a fixed dark chip over the page, so these do not follow the site theme.
const KINDS: Record<ClickEffectKind, { label: string; color: string }> = {
  run: { label: "Runs", color: "#f0c75e" },
  console: { label: "Console", color: "#ff9d6e" },
  message: { label: "Says", color: "#8fd6a0" },
  event: { label: "Event", color: "#8fc8f0" },
  page: { label: "Opens", color: "#f0c75e" },
  close: { label: "Closes", color: "#c9c5bb" },
  sound: { label: "Sound", color: "#c4a6ff" },
};

export function ClickLog({ lines, onExpire }: { lines: ClickLogLine[]; onExpire: (id: number) => void }) {
  return (
    <div aria-live="polite" className="pointer-events-none absolute bottom-2 left-2 z-10 flex max-w-[calc(100%-1rem)] flex-col items-start gap-0.5 md:bottom-16 md:left-3">
      {lines.map(({ id, kind, text }) => (
        <div
          key={id}
          onAnimationEnd={() => onExpire(id)}
          className="log-line max-w-full truncate rounded bg-black/85 px-1.5 py-0.5 font-mono text-[11px] leading-4 text-white"
        >
          <span style={{ color: KINDS[kind].color }}>{KINDS[kind].label}</span> {text}
        </div>
      ))}
    </div>
  );
}
