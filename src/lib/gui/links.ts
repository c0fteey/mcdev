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

function writeLink(el: Element, link: PageLink) {
  for (const name of ["href", "data-action", "data-command"]) el.removeAttribute(name);
  // data-close only means something next to a command, so editing a command keeps it.
  if (link.kind !== "command") el.removeAttribute("data-close");
  if (link.kind === "close" || link.kind === "back") el.setAttribute("data-action", link.kind);
  if (link.kind === "page") el.setAttribute("data-action", `page:${link.file.replace(/\.html$/, "")}`);
  if (link.kind === "command") el.setAttribute("data-command", link.command);
}

const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");

export function findLinks(html: string) {
  return [...parse(html).querySelectorAll(LINK_SELECTOR)].map((el) => ({
    label: el.textContent?.trim().replace(/\s+/g, " ").slice(0, 40) || el.tagName.toLowerCase(),
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
