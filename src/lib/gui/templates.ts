// The stylesheet every template links to. It is exported beside the pages as minecraft.css.
export const PAGE_CSS = `* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; }
body {
  font-family: Minecraft, "Pixelify Sans", monospace;
  font-size: 16px;
  color: #ffffff;
  background: linear-gradient(#27364a, #1c2a1e 60%, #241b14);
}
.mc-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
}
.mc-title { font-size: 32px; text-shadow: 3px 3px 0 #3f3f3f; }
.mc-panel {
  width: 480px;
  padding: 16px;
  color: #3f3f3f;
  background: #c6c6c6;
  border: 2px solid #000000;
  box-shadow: inset 3px 3px 0 #ffffff, inset -3px -3px 0 #555555;
}
.mc-stack { display: flex; flex-direction: column; gap: 8px; }
.mc-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.mc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.mc-btn {
  display: block;
  min-width: 200px;
  padding: 10px 24px;
  font: inherit;
  text-align: center;
  text-decoration: none;
  text-shadow: 2px 2px 0 #3f3f3f;
  color: #ffffff;
  background: #6f6f6f;
  border: 2px solid #000000;
  box-shadow: inset 2px 2px 0 #aaaaaa, inset -2px -2px 0 #444444;
  cursor: pointer;
}
.mc-btn:hover { background: #7d8ec9; }
.mc-item { min-width: 0; padding: 12px 8px; }
.mc-price { display: block; margin-top: 4px; color: #ffe066; }
`;

// For a page that travels without minecraft.css beside it.
export const inlineStylesheet = (html: string, extraHead = "") =>
  html.replace(/<link[^>]*href=["']minecraft\.css["'][^>]*>/i, () => `${extraHead}<style>${PAGE_CSS}</style>`);

const page = (title: string, body: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="ui:size" content="16x9">
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
      `      <div class="mc-title">New page</div>
      <div class="mc-panel">Hello, {player}!</div>
      <a class="mc-btn" data-action="close">Done</a>`,
    ),
  },
  {
    id: "menu",
    name: "Server menu",
    description: "A hub with buttons that run commands.",
    html: page(
      "Server menu",
      `      <div class="mc-title">Server menu</div>
      <div class="mc-panel">Welcome back, {player}. {online} of {max} players are online.</div>
      <div class="mc-stack">
        <a class="mc-btn" data-command="spawn" data-close>Spawn</a>
        <a class="mc-btn" data-command="kit daily" data-close>Daily kit</a>
        <a class="mc-btn" data-action="close">Close</a>
      </div>`,
    ),
  },
  {
    id: "shop",
    name: "Shop",
    description: "A grid of items that each run a buy command.",
    html: page(
      "Shop",
      `      <div class="mc-title">Shop</div>
      <div class="mc-panel mc-grid">
        <button class="mc-btn mc-item" data-command="buy bread">Bread<span class="mc-price">5 coins</span></button>
        <button class="mc-btn mc-item" data-command="buy torch">Torch<span class="mc-price">2 coins</span></button>
        <button class="mc-btn mc-item" data-command="buy iron_pickaxe">Iron pickaxe<span class="mc-price">40 coins</span></button>
      </div>
      <a class="mc-btn" data-action="close">Close</a>`,
    ),
  },
  {
    id: "rules",
    name: "Rules",
    description: "A numbered list and an agree button.",
    html: page(
      "Rules",
      `      <div class="mc-title">Server rules</div>
      <div class="mc-panel mc-stack">
        <div>1. Be kind in chat.</div>
        <div>2. No cheats or hacked clients.</div>
        <div>3. Do not grief other players.</div>
      </div>
      <a class="mc-btn" data-action="close">I agree</a>`,
    ),
  },
];
