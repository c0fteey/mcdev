"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { TEMPLATES, type Template } from "@/lib/gui/templates";
import { Preview } from "./Preview";
import { IconButton } from "./ui";

export function TemplatePicker({ onPick, onClose }: { onPick: (template: Template) => void; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="templates-title"
        className="flex max-h-full w-full max-w-lg flex-col gap-4 overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface p-4 sm:max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="templates-title" className="text-[15px] font-semibold">
              Templates
            </h2>
            <p className="text-[13px] text-muted">Adds a new page. Your other pages stay as they are.</p>
          </div>
          <IconButton label="Close templates" icon={X} onClick={onClose} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onPick(template)}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-line bg-raised/40 p-2 text-left transition-colors hover:border-gold"
            >
              <Preview html={template.html} title={`${template.name} template preview`} />
              <span className="px-1 pb-0.5">
                <span className="block text-[13px] font-semibold">{template.name}</span>
                <span className="block text-xs text-muted">{template.description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
