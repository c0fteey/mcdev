"use client";

import { createLocalList } from "@/lib/localList";
import type { Template } from "./templateLibrary";
import { BLANK_HTML, inlineStylesheet, PAGE_CSS } from "./templates";

export interface GuiPage {
  id: string;
  title: string;
  file: string;
  html: string;
}

const isPage = (v: unknown): v is GuiPage => {
  const p = v as GuiPage | null;
  return !!p && typeof p.id === "string" && typeof p.title === "string" && typeof p.file === "string" && typeof p.html === "string";
};

const store = createLocalList<GuiPage>("mcgui:pages", isPage);
export const savePages = store.save;

// Shown until the first edit is saved. The fixed id keeps the server and client render equal.
const FIRST_PAGE: GuiPage[] = [{ id: "first", title: "New page", file: "menu.html", html: BLANK_HTML }];

// True while there is nothing to lose by replacing the pages.
export const isUntouched = (pages: GuiPage[]) => pages.length === 1 && pages[0].html === BLANK_HTML;

export function usePages() {
  const pages = store.useList();
  return pages.length > 0 ? pages : FIRST_PAGE;
}

function uniqueFile(name: string, pages: GuiPage[]) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "page";
  const taken = new Set(pages.map((p) => p.file));
  let file = `${slug}.html`;
  for (let n = 2; taken.has(file); n++) file = `${slug}-${n}.html`;
  return file;
}

export const blankPage = (pages: GuiPage[]): GuiPage => ({
  id: crypto.randomUUID(),
  title: "New page",
  file: uniqueFile("page", pages),
  html: BLANK_HTML,
});

export const pagesFromTemplate = (template: Template): GuiPage[] => template.pages.map((page) => ({ id: crypto.randomUUID(), ...page }));

// The command that opens a page in game: the file name without .html.
export const pageCommand = (page: GuiPage) => `/mcgui open ${page.file.replace(/\.html$/, "")}`;

function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadZip(pages: GuiPage[]) {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  zip.file("minecraft.css", PAGE_CSS);
  for (const page of pages) zip.file(page.file, page.html);
  saveBlob(await zip.generateAsync({ type: "blob" }), "mcgui-pages.zip");
}

// A lone file has no minecraft.css next to it, so the styles go inside it.
export function downloadPage(page: GuiPage) {
  saveBlob(new Blob([inlineStylesheet(page.html)], { type: "text/html" }), page.file);
}
