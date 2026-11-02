"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Download, Link2, Terminal, TriangleAlert, X } from "lucide-react";
import { IconButton } from "./ui";

// Stands in for the code the server will issue. The same project always gets the same one.
function draftCode(projectId: string) {
  const letters = "abcdefghjkmnpqrstuvwxyz";
  let hash = 2166136261;
  let code = "";
  for (let i = 0; i < 8; i++) {
    for (const char of projectId + i) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
    code += letters[hash % letters.length];
  }
  return code;
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: the text can still be selected by hand.
    }
  };
  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-raised py-1 pl-3 pr-1">
      <code className="min-w-0 flex-1 select-all truncate font-mono text-[13px]">{value}</code>
      <button type="button" aria-label={`Copy ${label}`} onClick={copy} className="btn-ghost h-7 border border-line bg-surface">
        {copied ? <Check className="size-3.5 text-gold" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

const CODE_STYLE = "font-mono text-ink";

export function SendDialog({
  projectId,
  openCommand,
  onExport,
  onClose,
}: {
  projectId: string;
  openCommand: string;
  onExport: () => void;
  onClose: () => void;
}) {
  const code = draftCode(projectId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 backdrop-blur-[2px]" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="send-title"
        className="flex max-h-full w-full max-w-lg flex-col overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.3),0_24px_64px_rgb(0_0_0/0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-line pl-4 pr-2.5">
          <h2 id="send-title" className="text-[15px] font-semibold">
            Send to server
          </h2>
          <IconButton label="Close" icon={X} onClick={onClose} />
        </div>

        <div className="flex flex-col gap-4 p-4">
          <p className="flex gap-2 rounded-lg border border-gold/30 bg-gold/10 p-2.5 text-[13px] leading-snug">
            <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden />
            <span>Not live yet. Nothing is uploaded, so this code and link won&apos;t work until the plugin is ready. Use Export to move your pages today.</span>
          </p>

          <section className="flex flex-col gap-2">
            <h3 className="label flex items-center gap-1.5">
              <Terminal className="size-3.5" aria-hidden />
              Put it on your server
            </h3>
            <CopyField label="the import command" value={`/mcgui import ${code}`} />
            <p className="text-[13px] leading-relaxed text-muted">
              Run it in game or in the console on a server with the plugin. The files land in <span className={CODE_STYLE}>plugins/MCGUI/pages/</span>, then{" "}
              <span className={CODE_STYLE}>{openCommand}</span> shows it.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="label flex items-center gap-1.5">
              <Link2 className="size-3.5" aria-hidden />
              Link to this version
            </h3>
            <CopyField label="the link" value={`${window.location.origin}/?s=${code}`} />
            <p className="text-[13px] leading-relaxed text-muted">Anyone with the link will open their own copy to change.</p>
          </section>

          <button type="button" className="btn-gold h-10" onClick={onExport}>
            <Download className="size-3.5" aria-hidden />
            Export instead
          </button>
        </div>
      </div>
    </div>
  );
}
