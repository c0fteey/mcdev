"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Download, Link2, Loader2, Terminal, TriangleAlert, X } from "lucide-react";
import type { GuiPage } from "@/lib/gui/pages";
import { IconButton } from "./ui";

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

type Share = { status: "sending" } | { status: "ready"; code: string } | { status: "failed"; message: string };

export function SendDialog({
  pages,
  openCommand,
  onExport,
  onClose,
}: {
  pages: GuiPage[];
  openCommand: string;
  onExport: () => void;
  onClose: () => void;
}) {
  // What was on screen when the dialog opened is what gets shared.
  const [snapshot] = useState(pages);
  const [share, setShare] = useState<Share>({ status: "sending" });

  useEffect(() => {
    const request = new AbortController();
    fetch("/api/shares", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pages: snapshot.map(({ title, file, html }) => ({ title, file, html })) }),
      signal: request.signal,
    })
      .then(async (response) => {
        const data = (await response.json()) as { code?: string; error?: string };
        if (response.ok && data.code) setShare({ status: "ready", code: data.code });
        else setShare({ status: "failed", message: data.error ?? "Could not share right now. Try again." });
      })
      .catch(() => {
        if (!request.signal.aborted) setShare({ status: "failed", message: "Could not reach the server. Check your connection and try again." });
      });
    return () => request.abort();
  }, [snapshot]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const title = share.status === "ready" ? "Shared" : share.status === "sending" ? "Sharing…" : "Could not share";

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
          <h2 id="send-title" aria-live="polite" className="text-[15px] font-semibold">
            {title}
          </h2>
          <IconButton label="Close" icon={X} onClick={onClose} />
        </div>

        <div className="flex flex-col gap-4 p-4">
          {share.status === "sending" && (
            <p className="flex items-center gap-2 text-[13px] text-muted">
              <Loader2 className="size-3.5 animate-spin" aria-hidden />
              Saving a copy of this project…
            </p>
          )}

          {share.status === "failed" && (
            <p className="flex gap-2 rounded-lg border border-gold/30 bg-gold/10 p-2.5 text-[13px] leading-snug">
              <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden />
              <span>{share.message} Export still works for moving your pages.</span>
            </p>
          )}

          {share.status === "ready" && (
            <>
              <section className="flex flex-col gap-2">
                <h3 className="label flex items-center gap-1.5">
                  <Link2 className="size-3.5" aria-hidden />
                  Link to this version
                </h3>
                <CopyField label="the link" value={`${window.location.origin}/?s=${share.code}`} />
                <p className="text-[13px] leading-relaxed text-muted">Anyone with the link opens their own copy to change.</p>
              </section>

              <section className="flex flex-col gap-2">
                <h3 className="label flex items-center gap-1.5">
                  <Terminal className="size-3.5" aria-hidden />
                  Put it on your server
                </h3>
                <CopyField label="the import command" value={`/mcgui import ${share.code}`} />
                <p className="text-[13px] leading-relaxed text-muted">
                  This works once our plugin is out. The files will land in <span className={CODE_STYLE}>plugins/MCGUI/pages/</span>, then <span className={CODE_STYLE}>{openCommand}</span> shows it.
                </p>
              </section>
            </>
          )}

          <button type="button" className={share.status === "failed" ? "btn-gold h-10" : "btn-ghost h-10 border border-line"} onClick={onExport}>
            <Download className="size-3.5" aria-hidden />
            Export instead
          </button>
        </div>
      </div>
    </div>
  );
}
