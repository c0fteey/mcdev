import { ICON_CSS } from "./icons";

// The stylesheet pages link to. It is exported beside the pages as minecraft.css.
// One game pixel is 2 CSS px, so every edge and gap is a multiple of 2.
export const PAGE_CSS = `* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; overflow: hidden; background: transparent; }
body {
  font-family: Minecraft, Monocraft, monospace;
  font-size: 16px;
  line-height: 1.25;
  color: #ffffff;
}
p { margin: 0; }
.pick { display: none; }
.big { font-size: 24px; }
.small { font-size: 12px; }
.gap { height: 8px; }
.label { color: #404040; text-shadow: none; }

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
.mc-hint { font-size: 12px; color: #aaaaaa; text-shadow: 2px 2px 0 #2a2a2a; }

.mc-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 100%;
  padding: 16px;
  color: #404040;
  background: #c6c6c6;
  border: 2px solid #000000;
  border-radius: 2px;
  box-shadow: inset 2px 2px 0 #ffffff, inset -2px -2px 0 #555555;
}
.mc-well {
  padding: 8px;
  color: #e0e0e0;
  background: #373737;
  border: 2px solid #555555;
}
.mc-well.light { color: #404040; background: #b4b4b4; border-color: #8b8b8b; }
.mc-paper { padding: 16px; color: #404040; background: #f3ecd3; border: 2px solid #000000; }
.mc-paper a { color: #2a5ba8; }
.mc-rule { flex-shrink: 0; height: 2px; background: #8b8b8b; }

.mc-col, .mc-stack { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.mc-row { display: flex; align-items: flex-start; gap: 8px; }
.mc-spread { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.mc-split { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.mc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.mc-grow { flex: 1; }

.mc-world { inset: 0; width: 100%; height: 100%; background: linear-gradient(#6d94bd, #8dabc6 40%, #6e9153 52%, #3f6a2e 64%, #4b3a26 84%, #2c2016); }
.mc-world.nether { background: linear-gradient(#3a0f0f, #6b1c12 50%, #2a0a0a); }
.mc-world.end { background: linear-gradient(#17102b, #2a1f47 55%, #0d0a18); }
.mc-dim { inset: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.4); }

.mc-btn {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
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
.mc-btn.half { width: 196px; }
.mc-btn.wide { width: 400px; }
.mc-btn.small { height: 28px; font-size: 12px; }
.mc-btn.on {
  color: #ffff55;
  text-shadow: 2px 2px 0 #3f3f15;
  background: #4c4c4c;
  box-shadow: inset 2px 2px 0 #7a7a7a, inset -2px -2px 0 #3a3a3a;
}
.mc-btn.off, .mc-btn[disabled] {
  color: #a0a0a0;
  text-shadow: none;
  background: #2f2f2f;
  border-color: #000000;
  box-shadow: none;
  cursor: default;
}
.mc-item { flex-direction: column; gap: 4px; height: auto; padding: 8px 6px; }

.mc-choice {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  padding: 6px 8px;
  color: #e0e0e0;
  background: #4a4a4a;
  border: 2px solid #000000;
  cursor: pointer;
}
.mc-choice:hover { border-color: #aaaaaa; }
.mc-choice.on { background: #373737; border-color: #ffffff; }

.mc-key {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  font-size: 12px;
  color: #ffffff;
  text-shadow: none;
  background: #373737;
  border: 2px solid #000000;
}

.mc-slots { display: flex; flex-wrap: wrap; }
.mc-slot {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #8b8b8b;
  box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #ffffff;
}
.mc-slot.big { width: 52px; height: 52px; }
.mc-slot .n {
  position: absolute;
  right: 2px;
  bottom: 0;
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
.mc-slot .mc-icon { width: 28px; height: 28px; }
.mc-slot.big .mc-icon, .mc-icon.lg { width: 40px; height: 40px; }
.mc-icon.sm { width: 12px; height: 12px; }
${ICON_CSS}

.mc-bar { width: 100%; height: 10px; background: #2b2b2b; border: 2px solid #000000; }
.mc-bar > i { display: block; width: calc(var(--v, 0) * 100%); height: 100%; background: #55ff55; }
.mc-bar.red > i { background: #ff5555; }
.mc-bar.blue > i { background: #5555ff; }
.mc-bar.gold > i { background: #ffaa00; }

input[type="checkbox"]:has(+ .mc-check) { display: none; }
.mc-check {
  display: inline-block;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  background: #8b8b8b;
  box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #ffffff;
}
input:checked + .mc-check { background: #55ff55; }

.mc-toast {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: #ffffff;
  background: #212121;
  border: 2px solid #000000;
}

.mc-tooltip {
  display: inline-block;
  padding: 6px 8px;
  white-space: nowrap;
  color: #ffffff;
  background: #100010;
  border: 2px solid #28007f;
}
.tip { position: relative; }
.tip > .mc-tooltip {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  z-index: 10;
  margin-left: 8px;
}
.tip:hover > .mc-tooltip { display: block; }

.c0 { color: #000000; text-shadow: 2px 2px 0 #000000; }
.c1 { color: #0000aa; text-shadow: 2px 2px 0 #00002a; }
.c2 { color: #00aa00; text-shadow: 2px 2px 0 #002a00; }
.c3 { color: #00aaaa; text-shadow: 2px 2px 0 #002a2a; }
.c4 { color: #aa0000; text-shadow: 2px 2px 0 #2a0000; }
.c5 { color: #aa00aa; text-shadow: 2px 2px 0 #2a002a; }
.c6 { color: #ffaa00; text-shadow: 2px 2px 0 #3f2a00; }
.c7 { color: #aaaaaa; text-shadow: 2px 2px 0 #2a2a2a; }
.c8 { color: #555555; text-shadow: 2px 2px 0 #151515; }
.c9 { color: #5555ff; text-shadow: 2px 2px 0 #15153f; }
.ca { color: #55ff55; text-shadow: 2px 2px 0 #153f15; }
.cb { color: #55ffff; text-shadow: 2px 2px 0 #153f3f; }
.cc { color: #ff5555; text-shadow: 2px 2px 0 #3f1515; }
.cd { color: #ff55ff; text-shadow: 2px 2px 0 #3f153f; }
.ce { color: #ffff55; text-shadow: 2px 2px 0 #3f3f15; }
.cf { color: #ffffff; text-shadow: 2px 2px 0 #3f3f3f; }
`;

// For a page that travels without minecraft.css beside it.
export const inlineStylesheet = (html: string, extraHead = "") =>
  html.replace(/<link[^>]*href=["']minecraft\.css["'][^>]*>/i, () => `${extraHead}<style>${PAGE_CSS}</style>`);

// What New and the plus button add.
export const BLANK_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="ui:size" content="16x9">
    <meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
    <title>New page</title>
    <link rel="stylesheet" href="minecraft.css">
  </head>
  <body>
    <div class="mc-screen">
      <div class="mc-title big">New page</div>
      <div class="mc-panel" style="width: 480px">
        <div class="label">Hello, {player}!</div>
      </div>
      <div class="mc-row">
        <a class="mc-btn half" data-action="close" data-key="q">Done</a>
      </div>
    </div>
  </body>
</html>
`;
