import { ICON_CSS } from "./icons";

// The stylesheet every template links to. It is exported beside the pages as minecraft.css.
export const PAGE_CSS = `* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; background: transparent; }
body {
  font-family: Minecraft, Monocraft, monospace;
  font-size: 16px;
  line-height: 1.25;
  color: #ffffff;
}
p { margin: 0; }
.pick { display: none; }
.small { font-size: 12px; }

.mc-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
}
.mc-title { font-size: 24px; color: #ffffff; text-shadow: 2px 2px 0 #3f3f3f; }
.mc-title.big { font-size: 32px; text-shadow: 3px 3px 0 #3f3f3f; }

.mc-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 480px;
  max-width: 100%;
  padding: 14px;
  color: #3f3f3f;
  background: #c6c6c6;
  border: 2px solid #000000;
  border-radius: 3px;
  box-shadow: inset 2px 2px 0 #ffffff, inset -2px -2px 0 #555555;
}
.mc-well {
  padding: 8px;
  color: #e0e0e0;
  background: #373737;
  border: 2px solid #555555;
}

.mc-stack, .mc-col { display: flex; flex-direction: column; }
.mc-stack { gap: 8px; }
.mc-col { gap: 2px; min-width: 0; }
.mc-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.mc-spread { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.mc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }

.mc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  font: inherit;
  text-decoration: none;
  text-shadow: 2px 2px 0 #3f3f3f;
  color: #ffffff;
  background: #6f6f6f;
  border: 2px solid #000000;
  box-shadow: inset 2px 2px 0 #a8a8a8, inset -2px -2px 0 #484848;
  cursor: pointer;
}
.mc-btn:hover { color: #ffffa0; border-color: #ffffff; }
.mc-btn.half { width: 204px; }
.mc-btn.off, .mc-btn[disabled] {
  color: #a0a0a0;
  text-shadow: none;
  background: #2f2f2f;
  border-color: #000000;
  box-shadow: none;
  cursor: default;
}
.mc-item { flex-direction: column; gap: 4px; padding: 10px 6px; }

.mc-slot {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #8b8b8b;
  border-style: solid;
  border-width: 2px;
  border-color: #373737 #ffffff #ffffff #373737;
}
.mc-slot.big { width: 54px; height: 54px; }
.mc-slot .n {
  position: absolute;
  right: 1px;
  bottom: -2px;
  color: #ffffff;
  text-shadow: 2px 2px 0 #3f3f3f;
}

.mc-icon {
  display: inline-block;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  image-rendering: pixelated;
}
.mc-icon.sm { width: 12px; height: 12px; }
.mc-icon.lg { width: 40px; height: 40px; }
${ICON_CSS}

.c0 { color: #000000; }
.c1 { color: #0000aa; }
.c2 { color: #00aa00; }
.c3 { color: #00aaaa; }
.c4 { color: #aa0000; }
.c5 { color: #aa00aa; }
.c6 { color: #ffaa00; }
.c7 { color: #aaaaaa; }
.c8 { color: #555555; }
.c9 { color: #5555ff; }
.ca { color: #55ff55; }
.cb { color: #55ffff; }
.cc { color: #ff5555; }
.cd { color: #ff55ff; }
.ce { color: #ffff55; }
.cf { color: #ffffff; }
`;

// For a page that travels without minecraft.css beside it.
export const inlineStylesheet = (html: string, extraHead = "") =>
  html.replace(/<link[^>]*href=["']minecraft\.css["'][^>]*>/i, () => `${extraHead}<style>${PAGE_CSS}</style>`);

const page = (title: string, body: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <title>${title}</title>
    <link rel="stylesheet" href="minecraft.css">
  </head>
  <body>
    <div class="mc-screen">
${body}
    </div>
  </body>
</html>
`;

export interface Template {
  id: string;
  name: string;
  description: string;
  html: string;
}

export const TEMPLATES: Template[] = [
  {
    id: "blank",
    name: "Blank",
    description: "A title, a panel and a close button.",
    html: page(
      "New page",
      `      <div class="mc-title big">New page</div>
      <div class="mc-panel"><div class="mc-well">Hello, {player}!</div></div>
      <a class="mc-btn half" data-action="close" data-key="q">Done</a>`,
    ),
  },
  {
    id: "menu",
    name: "Server menu",
    description: "A hub with buttons that run commands.",
    html: page(
      "Server menu",
      `      <div class="mc-title big">Server menu</div>
      <div class="mc-panel">Welcome back, {player}. {online} of {max} players are online.</div>
      <div class="mc-stack">
        <a class="mc-btn half" data-command="spawn" data-close data-sound="ui.button.click">Spawn</a>
        <a class="mc-btn half" data-command="kit daily" data-close data-sound="ui.button.click">Daily kit</a>
        <a class="mc-btn half" data-action="close" data-key="q">Close</a>
      </div>`,
    ),
  },
  {
    id: "shop",
    name: "Shop",
    description: "A grid of items that each run a buy command.",
    html: page(
      "Shop",
      `      <div class="mc-title big">Shop</div>
      <div class="mc-panel mc-grid">
        <button class="mc-btn mc-item" data-command="buy bread" data-sound="entity.villager.yes"><i class="mc-icon lg i-bread"></i>Bread<span class="ca">5 coins</span></button>
        <button class="mc-btn mc-item" data-command="buy apple" data-sound="entity.villager.yes"><i class="mc-icon lg i-apple"></i>Apple<span class="ca">2 coins</span></button>
        <button class="mc-btn mc-item" data-command="buy iron_pickaxe" data-sound="entity.villager.yes"><i class="mc-icon lg i-pickaxe"></i>Pickaxe<span class="ca">40 coins</span></button>
      </div>
      <a class="mc-btn half" data-action="close" data-key="q">Close</a>`,
    ),
  },
  {
    id: "rules",
    name: "Rules",
    description: "A numbered list and an agree button.",
    html: page(
      "Rules",
      `      <div class="mc-title big">Server rules</div>
      <div class="mc-panel mc-stack">
        <div>1. Be kind in chat.</div>
        <div>2. No cheats or hacked clients.</div>
        <div>3. Do not grief other players.</div>
      </div>
      <a class="mc-btn half" data-action="close">I agree</a>`,
    ),
  },
];
