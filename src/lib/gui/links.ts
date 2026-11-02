// What a click on an element does, read from and written to the attributes MC GUI understands.
export type PageLink =
  | { kind: "none" }
  | { kind: "close" }
  | { kind: "back" }
  | { kind: "page"; file: string }
  | { kind: "command"; command: string };

export const LINK_SELECTOR = "a, button, [data-action], [data-command]";

export function readLink(el: Element): PageLink {
  const action = el.getAttribute("data-action");
  if (action === "close") return { kind: "close" };
  if (action === "back") return { kind: "back" };
  if (action?.startsWith("page:")) return { kind: "page", file: `${action.slice(5)}.html` };
  const command = el.getAttribute("data-command");
  if (command !== null) return { kind: "command", command };
  const href = el.getAttribute("href");
  if (href && !/^[a-z]+:|^#/i.test(href)) return { kind: "page", file: href };
  return { kind: "none" };
}

export type ClickEffectKind = "run" | "console" | "message" | "event" | "page" | "close" | "sound";
export interface ClickEffect {
  kind: ClickEffectKind;
  text: string;
}

// Everything one click would do in game, in the order it happens.
export function describeClick(el: Element): ClickEffect[] {
  const effects: ClickEffect[] = [];
  const attribute = (name: string) => el.getAttribute(name)?.trim();
  const link = readLink(el);
  const add = (kind: ClickEffectKind, text?: string) => {
    if (text) effects.push({ kind, text });
  };

  if (link.kind === "command") add("run", link.command.trim() && `/${link.command.trim()}`);
  add("console", attribute("data-console") && `/${attribute("data-console")}`);
  add("message", attribute("data-message"));
  add("event", attribute("data-event"));
  if (link.kind === "page") add("page", link.file);
  if (link.kind === "back") add("page", "the previous page");
  if (link.kind === "close" || el.hasAttribute("data-close")) add("close", "the page");
  add("sound", attribute("data-sound"));
  return effects;
}

function writeLink(el: Element, link: PageLink) {
  for (const name of ["href", "data-action", "data-command"]) el.removeAttribute(name);
  // data-close only means something next to a command, so editing a command keeps it.
  if (link.kind !== "command") el.removeAttribute("data-close");
  if (link.kind === "close" || link.kind === "back") el.setAttribute("data-action", link.kind);
  if (link.kind === "page") el.setAttribute("data-action", `page:${link.file.replace(/\.html$/, "")}`);
  if (link.kind === "command") el.setAttribute("data-command", link.command);
}

const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");

// A button's words, without the key hint drawn inside it.
function buttonText(el: Element) {
  const copy = el.cloneNode(true) as Element;
  copy.querySelectorAll(".mc-key").forEach((key) => key.remove());
  return copy.textContent?.trim().replace(/\s+/g, " ").slice(0, 40) ?? "";
}

// Points every link in a page at a renamed file.
export function renameLinks(html: string, from: string, to: string) {
  const name = (file: string) => file.replace(/\.html$/, "");
  return html
    .replace(/(href=["'])([^"']+)(["'])/g, (match, open: string, target: string, close: string) => (target === from ? open + to + close : match))
    .replace(/(data-action=["']page:)([^"']+)(["'])/g, (match, open: string, target: string, close: string) => (target === name(from) ? open + name(to) + close : match));
}

export function findLinks(html: string) {
  return [...parse(html).querySelectorAll(LINK_SELECTOR)].map((el) => ({
    label: buttonText(el) || el.tagName.toLowerCase(),
    tag: el.tagName === "A" ? "link" : el.tagName.toLowerCase(),
    key: el.getAttribute("data-key"),
    link: readLink(el),
  }));
}

export function setLink(html: string, index: number, link: PageLink) {
  const doc = parse(html);
  const el = doc.querySelectorAll(LINK_SELECTOR)[index];
  if (!el) return html;
  writeLink(el, link);
  return `<!doctype html>\n${doc.documentElement.outerHTML}\n`;
}
