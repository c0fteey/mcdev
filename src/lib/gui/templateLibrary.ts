import { TEMPLATE_PAGES } from "./templatePages";

export interface TemplatePage {
  title: string;
  file: string;
  html: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  // The first page opens first; the others are linked from it.
  pages: TemplatePage[];
}

const page = (title: string, file: string): TemplatePage => ({ title, file, html: TEMPLATE_PAGES[file] });

const ICON_NAMES = [
  "apple", "book", "bread", "chest", "clock", "compass", "diamond", "emerald", "gold", "heart",
  "key", "map", "pickaxe", "potion", "potion-gold", "potion-green", "potion-pink", "potion-red", "shield", "sword",
];

const ICON_SLOTS = ICON_NAMES.map(
  (name) => `<div class="tip mc-slot big"><i class="mc-icon i-${name}"></i><div class="mc-tooltip"><div class="cf">i-${name}</div><div class="c7">mc-icon i-${name}</div></div></div>`,
).join("");

const STYLE_GUIDE = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="ui:size" content="16x9">
<meta name="ui:overlay" content="rgba(0, 0, 0, 0.25) blur">
<meta name="ui:scroll-step" content="tile">
<meta name="ui:open-sound" content="item.book.page_turn">
<title>Minecraft style guide</title>
<link rel="stylesheet" href="minecraft.css">
<style>
  html, body { overflow: visible; height: auto; background: transparent; }
  .page { position: relative; min-height: 576px; padding: 28px 112px 40px; }
  .head { position: relative; text-align: center; margin-bottom: 20px; }
  .head .big { margin-bottom: 6px; }
  section { position: relative; margin-bottom: 16px; }
  h2 { margin: 0 0 2px; font-size: 16px; font-weight: 400; color: #404040; }
  .why { margin: 0 0 10px; color: #6b6b6b; font-size: 12px; line-height: 14px; }
  .code { color: #2a5ba8; font-size: 12px; text-shadow: none; }
  .well-code { color: #8fb4ff; font-size: 12px; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .cell { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
  .swatches span { display: inline-block; margin-right: 14px; }
  .tip-demo { display: inline-block; }
  .tip-demo .mc-tooltip { display: block; position: relative; left: 0; top: 0; margin: 0 0 0 8px; }
  .rules div { margin-bottom: 6px; }
  .rules b { color: #1f1f1f; }
  .foot { position: relative; display: flex; justify-content: center; gap: 8px; margin-top: 18px; }
</style>
</head>
<body>
<div class="page">

  <div class="head">
    <div class="cf big">Minecraft style guide</div>
    <div class="c7">The game's own look for MC GUI pages: <span class="code">minecraft.css</span>, no textures, scroll for more</div>
  </div>

  <section class="mc-panel">
    <h2>The rules</h2>
    <div class="rules label">
      <div><b>One game pixel is 2 CSS px.</b> Every edge, gap and size is a multiple of 2, most of 4. Hard edges, no soft shadows, no fades.</div>
      <div><b>One spacing system.</b> A panel's padding is 16px on every side, groups inside it are 12px apart, things in a group 8px. Nothing is placed absolutely inside a panel; <span class="code">mc-grow</span> takes the height left over.</div>
      <div><b>One font, three sizes.</b> Minecraft (the game's own letters) at 16px, 24px for titles (<span class="code">big</span>), 12px for fine print (<span class="code">small</span>).</div>
      <div><b>A screen is the world, dimmed, with one panel on it.</b> Title at the top, the panel in the middle, buttons below, a hint at the bottom.</div>
      <div><b>New tools in the game's words.</b> Guides, menus and dashboards the game doesn't have, never copies of its own screens.</div>
      <div><b>No script.</b> Picking is a hidden radio and a label; a tooltip is :hover; a click runs a command.</div>
    </div>
  </section>

  <section class="mc-panel">
    <h2>Screen</h2>
    <p class="why"><span class="code">mc-screen</span> stacks what follows as a centred column 12px apart: <span class="code">mc-title</span>, the panel, a row of buttons, a <span class="code">mc-hint</span>. Behind it is the player's own world, blurred, with <span class="code">ui:overlay</span> and a transparent body; for a drawn one instead, start the screen with <span class="code">mc-world</span> (or <span class="code">nether</span>, <span class="code">end</span>) and <span class="code">mc-dim</span>:</p>
    <div class="mc-row">
      <div style="position:relative;z-index:0;width:200px;height:112px;overflow:hidden;border:2px solid #000"><div class="mc-world" style="position:absolute"></div><div class="mc-dim" style="position:absolute"></div><div class="cf" style="position:absolute;top:8px;width:100%;text-align:center">Overworld</div></div>
      <div style="position:relative;z-index:0;width:200px;height:112px;overflow:hidden;border:2px solid #000"><div class="mc-world nether" style="position:absolute"></div><div class="mc-dim" style="position:absolute"></div><div class="cf" style="position:absolute;top:8px;width:100%;text-align:center">Nether</div></div>
      <div style="position:relative;z-index:0;width:200px;height:112px;overflow:hidden;border:2px solid #000"><div class="mc-world end" style="position:absolute"></div><div class="mc-dim" style="position:absolute"></div><div class="cf" style="position:absolute;top:8px;width:100%;text-align:center">The End</div></div>
    </div>
  </section>

  <section class="mc-panel">
    <h2>Text</h2>
    <p class="why">The chat colours, each with the game's shadow (its own colour at a quarter brightness, one game pixel down and right). On a grey panel, labels are <span class="code">label</span>: dark and flat.</p>
    <div class="mc-well swatches">
      <span class="cf">cf white</span><span class="ce">ce yellow</span><span class="c6">c6 gold</span><span class="ca">ca green</span><span class="cb">cb aqua</span><span class="c9">c9 blue</span><span class="cd">cd pink</span><span class="cc">cc red</span><span class="c7">c7 grey</span><span class="c8">c8 dark</span>
    </div>
  </section>

  <section class="mc-panel">
    <h2>Panels</h2>
    <p class="why"><span class="code">mc-panel</span> is the container. Inside it, <span class="code">mc-well</span> is sunken and dark (lists, tables), <span class="code">mc-well light</span> sunken and grey, and <span class="code">mc-rule</span> divides.</p>
    <div class="grid2">
      <div class="mc-well"><div class="cf">Inside a well</div><div class="c7">White text, dark ground</div></div>
      <div class="mc-well light"><div class="label">A light well</div><div class="label">Dark labels</div></div>
    </div>
    <div class="mc-rule"></div>
    <div class="label small">That line is mc-rule.</div>
  </section>

  <section class="mc-panel">
    <h2>Buttons</h2>
    <p class="why"><span class="code">mc-btn</span>: 40px tall, white edge and yellow text on hover. <span class="code">on</span> is the chosen one of a group, <span class="code">off</span> can't be pressed. Sizes: <span class="code">wide</span> 400px, <span class="code">half</span> 196px, <span class="code">small</span> 28px tall. Keys: <span class="code">mc-key</span>.</p>
    <div class="mc-row">
      <a class="mc-btn half" data-message="<gray>That's an mc-btn.">Done</a>
      <div class="mc-btn on">Chosen</div>
      <div class="mc-btn off">Locked</div>
      <div class="mc-btn small">Small</div>
      <span class="mc-key">E</span><span class="mc-key">1</span>
    </div>
  </section>

  <section class="mc-panel">
    <h2>Slots and icons</h2>
    <p class="why"><span class="code">mc-slot</span> (36px) or <span class="code">mc-slot big</span> (52px), touching in rows. An icon is <span class="code">&lt;i class="mc-icon i-NAME"&gt;</span>, a count is <span class="code">&lt;span class="n"&gt;</span>. Hover a slot for its name: that's a <span class="code">tip</span> with an <span class="code">mc-tooltip</span> inside.</p>
    <div class="mc-slots">${ICON_SLOTS}</div>
    <div class="mc-row" style="margin-top:10px">
      <div class="mc-slots">
        <div class="mc-slot"><i class="mc-icon i-bread"></i><span class="n">16</span></div>
        <div class="mc-slot"><i class="mc-icon i-apple"></i><span class="n">3</span></div>
        <div class="mc-slot"><i class="mc-icon i-emerald"></i><span class="n">64</span></div>
        <div class="mc-slot"></div>
      </div>
      <span class="label small">Counts sit bottom right, like the inventory's.</span>
    </div>
  </section>

  <section class="mc-panel">
    <h2>Lists and tooltips</h2>
    <p class="why"><span class="code">mc-choice</span> is a pickable row (<span class="code">on</span> when chosen). A tooltip names an item in its rarity colour: cf common, ce uncommon, cb rare, cd epic.</p>
    <div class="mc-row" style="align-items:flex-start">
      <div style="width:260px">
        <div class="mc-choice on"><i class="mc-icon i-potion-red"></i>Healing</div>
        <div class="mc-choice"><i class="mc-icon i-potion"></i>Swiftness</div>
        <div class="mc-choice"><i class="mc-icon i-potion-green"></i>Poison</div>
      </div>
      <div class="tip-demo"><div class="mc-tooltip">
        <div class="cb">Frostbite</div><div class="c9">Sharpness III</div><div class="gap"></div><div class="c7">When in Main Hand:</div><div class="c2">7 Attack Damage</div>
      </div></div>
    </div>
  </section>

  <section class="mc-panel">
    <h2>Bars, ticks, toasts and paper</h2>
    <p class="why"><span class="code">mc-bar</span> with <span class="code">--v</span> from 0 to 1 (green; <span class="code">red</span>, <span class="code">blue</span>, <span class="code">gold</span>). <span class="code">mc-check</span> after a checkbox. <span class="code">mc-toast</span> pops up. <span class="code">mc-paper</span> is a book page.</p>
    <div class="grid2">
      <div class="cell" style="width:100%">
        <div style="width:100%"><span class="label small">Experience</span><div class="mc-bar" style="--v:.68"><i></i></div></div>
        <div style="width:100%"><span class="label small">Health</span><div class="mc-bar red" style="--v:.4"><i></i></div></div>
        <div style="width:100%"><span class="label small">Mana</span><div class="mc-bar blue" style="--v:.85"><i></i></div></div>
        <label class="mc-row" style="cursor:pointer"><input type="checkbox" checked style="display:none"><span class="mc-check"></span><span class="label">Show particles</span></label>
      </div>
      <div class="cell">
        <div class="mc-toast"><i class="mc-icon i-book"></i><div><div class="ce">Advancement Made!</div><div class="cf">Read the guide</div></div></div>
        <div class="mc-paper" style="width:320px"><div>Dear traveller,</div><div style="margin-top:6px">Paper is for letters, books and long reads. Links are <a>blue</a>.</div></div>
      </div>
    </div>
  </section>

  <div class="foot">
    <a class="mc-btn half" data-action="top">Back to top</a>
    <a class="mc-btn half" data-action="close" data-key="q">Done</a>
  </div>
</div>
</body>
</html>
`;

export const TEMPLATES: Template[] = [
  {
    id: "server-menu",
    name: "Server menu",
    description: "A hub with the player's level and who's online, opening Daily Rewards, Kits and Profile.",
    pages: [page("Server menu", "menu.html"), page("Daily Rewards", "rewards.html"), page("Kits", "kits.html"), page("Profile", "profile.html")],
  },
  {
    id: "shop",
    name: "Shop",
    description: "A market of items to buy with emeralds, linked to crates to open with keys.",
    pages: [page("Market", "shop.html"), page("Crates", "crates.html")],
  },
  {
    id: "server-selector",
    name: "Server selector",
    description: "Six game modes as cards, each with who's playing and a Join button.",
    pages: [page("Choose a Mode", "servers.html")],
  },
  {
    id: "leaderboard",
    name: "Leaderboard",
    description: "A podium with player heads, the rest of the top ten and three boards.",
    pages: [page("Leaderboard", "leaderboard.html")],
  },
  {
    id: "rules",
    name: "Rules",
    description: "Six numbered rules with a line of detail each and an I agree button.",
    pages: [page("Server Rules", "rules.html")],
  },
  {
    id: "style-guide",
    name: "Style guide",
    description: "Every piece of minecraft.css with its class name: panels, buttons, slots, icons and tooltips.",
    pages: [{ title: "Style guide", file: "style-guide.html", html: STYLE_GUIDE }],
  },
];
