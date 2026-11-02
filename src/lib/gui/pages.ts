"use client";

import { useEffect, useRef } from "react";
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

export interface GuiProject {
  id: string;
  pages: GuiPage[];
  updatedAt: number;
}

const isProject = (v: unknown): v is GuiProject => {
  const p = v as GuiProject | null;
  return !!p && typeof p.id === "string" && typeof p.updatedAt === "number" && Array.isArray(p.pages) && p.pages.length > 0 && p.pages.every(isPage);
};

const projectStore = createLocalList<GuiProject>("mcgui:projects", isProject);
const currentStore = createLocalList<string>("mcgui:current", (v): v is string => typeof v === "string");
// Pages saved before there were projects; they become the first project on their next save.
const legacyStore = createLocalList<GuiPage>("mcgui:pages", isPage);

// Shown until the first edit is saved. The fixed id keeps the server and client render equal.
const FIRST_PAGE: GuiPage[] = [{ id: "first", title: "New page", file: "menu.html", html: BLANK_HTML }];

// True while there is nothing to lose by replacing the pages.
export const isUntouched = (pages: GuiPage[]) => pages.length === 1 && pages[0].html === BLANK_HTML;

// A short id for the address bar, like 585i1o4g6i.
function randomProjectId() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(10)), (byte) => alphabet[byte % alphabet.length]).join("");
}

// Opens someone's shared project as your own copy. It runs after a network wait, so it reads the
// saved projects fresh rather than trusting what a render saw earlier.
export function addSharedProject(shared: Omit<GuiPage, "id">[]) {
  const pages = shared.map((page) => ({ ...page, id: crypto.randomUUID() }));
  const id = randomProjectId();
  const saved = projectStore.read();
  const legacy = legacyStore.read();
  // Pages from before projects existed must not vanish when the first project is saved.
  const earlier = saved.length === 0 && legacy.length > 0 ? [{ id: randomProjectId(), pages: legacy, updatedAt: Date.now() }] : saved;
  projectStore.save([{ id, pages, updatedAt: Date.now() }, ...earlier]);
  currentStore.save([id]);
  return pages[0].id;
}

// Keeps ?p= in the address bar on the open project, and opens the project a link names.
export function useProjectUrl(currentId: string, savedIds: string[]) {
  const read = useRef(false);
  const known = savedIds.join();
  useEffect(() => {
    if (!known) return;
    const url = new URL(window.location.href);
    if (!read.current) {
      read.current = true;
      const wanted = url.searchParams.get("p");
      if (wanted && wanted !== currentId && known.split(",").includes(wanted)) {
        currentStore.save([wanted]);
        return;
      }
    }
    if (url.searchParams.get("p") === currentId) return;
    url.searchParams.set("p", currentId);
    window.history.replaceState(null, "", url);
  }, [currentId, known]);
}

const dated = (projects: GuiProject[]) => projects.map((p) => (p.updatedAt > 0 ? p : { ...p, updatedAt: Date.now() }));

export function useProjects() {
  const saved = projectStore.useList();
  const legacy = legacyStore.useList();
  const [currentId] = currentStore.useList();

  const current: GuiProject = saved.find((p) => p.id === currentId) ??
    saved[0] ?? { id: "first", pages: legacy.length > 0 ? legacy : FIRST_PAGE, updatedAt: 0 };

  // A project nobody has touched is not worth keeping once you move on from it.
  const worthKeeping = () => {
    const known = saved.length > 0 ? saved : [current];
    return known.filter((p) => !isUntouched(p.pages));
  };

  return {
    pages: current.pages,
    currentId: current.id,
    savedIds: saved.map((p) => p.id),
    recent: worthKeeping().sort((a, b) => b.updatedAt - a.updatedAt),
    savePages(pages: GuiPage[]) {
      // The very first project gets a real id the moment there is something to keep.
      const id = saved.length > 0 ? current.id : randomProjectId();
      projectStore.save([{ id, pages, updatedAt: Date.now() }, ...saved.filter((p) => p.id !== current.id)]);
      currentStore.save([id]);
    },
    openProject(id: string) {
      projectStore.save(dated(worthKeeping()));
      currentStore.save([id]);
    },
    createProject(pages: GuiPage[]) {
      const id = randomProjectId();
      projectStore.save([{ id, pages, updatedAt: Date.now() }, ...dated(worthKeeping())]);
      currentStore.save([id]);
      return id;
    },
  };
}

function uniqueFile(name: string, pages: GuiPage[]) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "page";
  const taken = new Set(pages.map((p) => p.file));
  let file = `${slug}.html`;
  for (let n = 2; taken.has(file); n++) file = `${slug}-${n}.html`;
  return file;
}

// The page a blank project starts with.
export const firstBlankPage = (): GuiPage => ({ id: crypto.randomUUID(), title: "New page", file: "menu.html", html: BLANK_HTML });

export const blankPage = (pages: GuiPage[]): GuiPage => ({
  id: crypto.randomUUID(),
  title: "New page",
  file: uniqueFile("page", pages),
  html: BLANK_HTML,
});

export const pagesFromTemplate = (template: Template): GuiPage[] => template.pages.map((page) => ({ id: crypto.randomUUID(), ...page }));

// A page's name lives in its <title>, so the code and the page list always agree.
export const titleInHtml = (html: string) => new DOMParser().parseFromString(html, "text/html").title.trim();

const escapeTitle = (title: string) => title.replace(/&/g, "&amp;").replace(/</g, "&lt;");

export const htmlWithTitle = (html: string, title: string) => html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${escapeTitle(title)}</title>`);

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
