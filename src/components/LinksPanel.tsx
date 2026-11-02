"use client";

import { useSyncExternalStore } from "react";
import { Link2 } from "lucide-react";
import { findLinks, setLink, type PageLink } from "@/lib/gui/links";
import type { GuiPage } from "@/lib/gui/pages";
import { Field, Section, Select, SelectGroup, SelectItem } from "./ui";

const noSubscribe = () => () => {};

const linkValue = (link: PageLink) => (link.kind === "page" ? `page:${link.file}` : link.kind);

function linkFromValue(value: string, current: PageLink): PageLink {
  if (value.startsWith("page:")) return { kind: "page", file: value.slice(5) };
  if (value === "command") return { kind: "command", command: current.kind === "command" ? current.command : "" };
  return { kind: value as "none" | "close" | "back" };
}

export function LinksPanel({ page, pages, onChange }: { page: GuiPage; pages: GuiPage[]; onChange: (html: string) => void }) {
  // Links are read with DOMParser, which only exists in the browser.
  const inBrowser = useSyncExternalStore(noSubscribe, () => true, () => false);
  const links = inBrowser ? findLinks(page.html) : [];

  return (
    <Section icon={Link2} title="Links" description="What each button does when it is clicked.">
      {links.length === 0 && <p className="text-sm text-muted">This page has no buttons or links yet.</p>}
      {links.map(({ label, link }, index) => (
        <Field key={index} label={label}>
          <Select label={`Action for ${label}`} value={linkValue(link)} onChange={(v) => onChange(setLink(page.html, index, linkFromValue(v, link)))}>
            <SelectItem value="none">Nothing</SelectItem>
            <SelectItem value="close">Close the page</SelectItem>
            <SelectItem value="back">Go back</SelectItem>
            <SelectItem value="command">Run a command</SelectItem>
            <SelectGroup label="Open a page">
              {pages.map((p) => (
                <SelectItem key={p.id} value={`page:${p.file}`}>
                  {p.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </Select>
          {link.kind === "command" && (
            <input
              aria-label={`Command for ${label}`}
              className="input font-mono"
              placeholder="spawn"
              spellCheck={false}
              value={link.command}
              onChange={(e) => onChange(setLink(page.html, index, { kind: "command", command: e.target.value }))}
            />
          )}
        </Field>
      ))}
    </Section>
  );
}
