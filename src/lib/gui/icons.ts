// Our own 12x12 pixel icons, drawn here rather than taken from the game's textures.
// Each letter is a colour from the icon's palette; a dot is transparent.
type Palette = Record<string, string>;

function toDataUri(rows: string[], palette: Palette) {
  const rects = rows.flatMap((row, y) =>
    [...row].flatMap((char, x) => (palette[char] ? [`<rect x="${x}" y="${y}" width="1" height="1" fill="${palette[char]}"/>`] : [])),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" shape-rendering="crispEdges">${rects.join("")}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const POTION = [
  ".....bb.....",
  ".....ww.....",
  ".....ww.....",
  "....w..w....",
  "...w....w...",
  "..wccccccw..",
  "..wclccccw..",
  "..wccccccw..",
  "..wccccccw..",
  "..wccccccw..",
  "...wccccw...",
  "....wwww....",
];

const potion = (liquid: string, shine: string): [string[], Palette] => [POTION, { b: "#8a5a2b", w: "#dcecf2", c: liquid, l: shine }];

const ICONS: Record<string, [string[], Palette]> = {
  emerald: [
    [
      "............",
      ".....ll.....",
      "....lggd....",
      "...lgggdd...",
      "..lggggddd..",
      ".lgggggdddd.",
      ".dgggggdddd.",
      "..dggggddd..",
      "...dgggdd...",
      "....dggd....",
      ".....dd.....",
      "............",
    ],
    { l: "#a6f7c3", g: "#27d96b", d: "#0f8f42" },
  ],
  pickaxe: [
    [
      "...cccccc...",
      "..ccllllccc.",
      "........bccc",
      ".......bb.cc",
      "......bb..cc",
      ".....bb...cc",
      "....bb....c.",
      "...bb.......",
      "..bb........",
      ".bb.........",
      "bb..........",
      "b...........",
    ],
    { c: "#35c9d4", l: "#a5f1f5", b: "#7a5230" },
  ],
  sword: [
    [
      "..........ww",
      ".........wws",
      "........wws.",
      ".......wws..",
      "......wws...",
      ".....wws....",
      "....wws.....",
      ".g.wws......",
      ".ggws.......",
      "..ggg.......",
      ".b..gg......",
      "b...........",
    ],
    { w: "#eeeeee", s: "#a5a5a5", g: "#c9a227", b: "#6b4726" },
  ],
  shield: [
    [
      "..gggggggg..",
      ".gwwwwwwwwg.",
      ".gwwwwwwwwg.",
      ".gwwwddwwwg.",
      ".gwwwddwwwg.",
      ".gwwwddwwwg.",
      ".gwwwwwwwwg.",
      "..gwwwwwwg..",
      "..gwwwwwwg..",
      "...gwwwwg...",
      "....gwwg....",
      ".....gg.....",
    ],
    { g: "#6f6f6f", w: "#a9713a", d: "#7d5228" },
  ],
  bread: [
    [
      "............",
      "............",
      "...cccccc...",
      "..cllllllcc.",
      ".cllhllhlllc",
      ".clllhllhllc",
      ".cllllllllcc",
      ".cddddddddc.",
      "..cccccccc..",
      "............",
      "............",
      "............",
    ],
    { c: "#7d4e1e", l: "#d29a4f", h: "#8f5f28", d: "#a8712f" },
  ],
  apple: [
    [
      "......b.gg..",
      "......bgg...",
      "..rrr.b.rr..",
      ".rlrrrrrrrr.",
      ".rlrrrrrrrr.",
      ".rrrrrrrrrr.",
      ".rrrrrrrrrr.",
      ".rrrrrrrrrr.",
      "..rrrrrrrd..",
      "..rrrrrrdd..",
      "...rr..dd...",
      "............",
    ],
    { b: "#5b3a1a", g: "#3fa535", r: "#d8232a", l: "#f58a8a", d: "#9c1419" },
  ],
  "potion-red": potion("#d9303a", "#f59aa0"),
  "potion-green": potion("#3fbf45", "#a5eaa8"),
  "potion-gold": potion("#e0a51e", "#f7dc8c"),
  map: [
    [
      "eeeeeeeeeeee",
      "eppppppppppe",
      "eppggppbbppe",
      "epgggppbbbpe",
      "epgggppbbbpe",
      "eppggpppbppe",
      "eppppprpppe.",
      "epbbppprpppe",
      "epbbbppgggpe",
      "eppbbpggggpe",
      "eppppppppppe",
      "eeeeeeeeeeee",
    ],
    { e: "#8a6a3a", p: "#ecdfb5", g: "#6fae4c", b: "#4f8fd1", r: "#d8232a" },
  ],
  compass: [
    [
      "...gggggg...",
      "..gffffffg..",
      ".gffffffrrg.",
      "gfffffrrrffg",
      "gffffrrrfffg",
      "gffffwwffffg",
      "gffffwwffffg",
      "gfffwwwffffg",
      "gffwwwfffffg",
      ".gffffffffg.",
      "..gffffffg..",
      "...gggggg...",
    ],
    { g: "#8d8d8d", f: "#2c2c2c", r: "#e0332f", w: "#e8e8e8" },
  ],
  book: [
    [
      ".rrrrrrrrrr.",
      ".rlllllllrrw",
      ".rlrrrrrrrrw",
      ".rlrggggrrrw",
      ".rlrggggrrrw",
      ".rlrrrrrrrrw",
      ".rlrrrrrrrrw",
      ".rlrrrrrrrrw",
      ".rlrrrrrrrrw",
      ".rlrrrrrrrrw",
      ".rrrrrrrrrrw",
      "..wwwwwwwwww",
    ],
    { r: "#8e2020", l: "#b83a3a", g: "#e9d9a8", w: "#efe7d2" },
  ],
  key: [
    [
      "............",
      "..yyyy......",
      ".yllyyy.....",
      ".yy..yy.....",
      ".yy..yyyyyyy",
      ".yy..yyddddd",
      ".yyyyyy..y.y",
      "..yyyy...y.y",
      "............",
      "............",
      "............",
      "............",
    ],
    { y: "#e3b327", l: "#f7e08a", d: "#a87f12" },
  ],
};

export const ICON_CSS = Object.entries(ICONS)
  .map(([name, [rows, palette]]) => `.i-${name} { background-image: url("${toDataUri(rows, palette)}"); }`)
  .join("\n");
