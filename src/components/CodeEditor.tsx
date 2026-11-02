"use client";

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";

// Everything reads the site's theme tokens, so it follows the light and dark themes.
const theme = EditorView.theme({
  "&": { height: "100%", fontSize: "12.5px", color: "var(--color-ink)", backgroundColor: "var(--color-surface)" },
  "&.cm-focused": { outline: "none" },
  ".cm-scroller": { fontFamily: "var(--font-mono)", lineHeight: "1.65" },
  ".cm-content": { caretColor: "var(--color-gold)", padding: "12px 0" },
  ".cm-cursor": { borderLeftColor: "var(--color-gold)" },
  ".cm-gutters": { color: "var(--color-muted)", backgroundColor: "var(--color-surface)", border: "none", opacity: "0.7" },
  ".cm-lineNumbers .cm-gutterElement": { padding: "0 12px 0 16px", minWidth: "44px" },
  ".cm-activeLine, .cm-activeLineGutter": { backgroundColor: "var(--color-raised)" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: "rgb(226 179 60 / 0.25)" },
  ".cm-matchingBracket, &.cm-focused .cm-matchingBracket": { backgroundColor: "rgb(226 179 60 / 0.2)", color: "inherit" },
});

const highlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: [t.tagName, t.keyword], color: "var(--color-gold)" },
    { tag: t.string, color: "var(--color-gold-soft)" },
    { tag: [t.comment, t.angleBracket, t.punctuation, t.documentMeta], color: "var(--color-muted)" },
    { tag: [t.attributeName, t.propertyName], color: "var(--color-ink)" },
  ]),
);

const extensions = [html(), highlight, EditorView.contentAttributes.of({ "aria-label": "HTML code of this page" })];

export default function CodeEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <CodeMirror
      className="absolute inset-0"
      height="100%"
      theme={theme}
      extensions={extensions}
      basicSetup={{ foldGutter: false, highlightSelectionMatches: false }}
      value={value}
      onChange={onChange}
    />
  );
}
