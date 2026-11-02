"use client";

import { createContext, useContext, useMemo } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useViewport,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Home, Maximize } from "lucide-react";
import { findLinks } from "@/lib/gui/links";
import type { GuiPage } from "@/lib/gui/pages";
import { Preview } from "./Preview";

const COLUMN_WIDTH = 288;
const ROW_HEIGHT = 146;
const FIT = { padding: 0.25, maxZoom: 1.15 };

// Nodes read live values from here, so typing in a page never rebuilds the graph.
const MapContext = createContext<{ pages: GuiPage[]; selectedId: string }>({ pages: [], selectedId: "" });

const pageTargets = (page: GuiPage, pages: GuiPage[]) =>
  findLinks(page.html).flatMap(({ label, key, link }) => {
    if (link.kind !== "page") return [];
    const target = pages.find((p) => p.file === link.file);
    // A button with a key is named by the key, which is what the player presses.
    return target && target.id !== page.id ? [{ label: key?.toUpperCase() ?? label, target }] : [];
  });

// Walks out from the page that opens first; each step away from it is a column to the right.
function buildGraph(pages: GuiPage[]) {
  const depth = new Map([[pages[0].id, 0]]);
  const queue = [pages[0]];
  for (const page of queue) {
    for (const { target } of pageTargets(page, pages)) {
      if (depth.has(target.id)) continue;
      depth.set(target.id, (depth.get(page.id) ?? 0) + 1);
      queue.push(target);
    }
  }
  const ordered = [...queue, ...pages.filter((p) => !depth.has(p.id))];

  const columns = new Map<number, GuiPage[]>();
  for (const page of ordered) {
    const column = depth.get(page.id) ?? 0;
    columns.set(column, [...(columns.get(column) ?? []), page]);
  }
  const nodes: Node[] = [...columns].flatMap(([column, list]) =>
    list.map((page, row) => ({
      id: page.id,
      type: "page",
      data: {},
      position: { x: column * COLUMN_WIDTH, y: (row - (list.length - 1) / 2) * ROW_HEIGHT },
    })),
  );

  // A pair of pages linked both ways is one line, named by the button that leads away from the start.
  const seen = new Set<string>();
  const edges: Edge[] = ordered.flatMap((page) =>
    pageTargets(page, pages).flatMap(({ label, target }) => {
      const pair = [page.id, target.id].sort().join("|");
      if (seen.has(pair)) return [];
      seen.add(pair);
      return [
        {
          id: pair,
          type: "page",
          source: page.id,
          target: target.id,
          label,
        },
      ];
    }),
  );
  return { nodes, edges };
}

const HIDDEN_HANDLE = "!pointer-events-none !opacity-0";

function PageNode({ id }: NodeProps) {
  const { pages, selectedId } = useContext(MapContext);
  const index = pages.findIndex((p) => p.id === id);
  const page = pages[index];
  if (!page) return null;
  const links = findLinks(page.html).filter(({ link }) => link.kind === "page").length;
  return (
    <div className={`w-40 cursor-pointer overflow-hidden rounded-xl border bg-surface transition-colors ${page.id === selectedId ? "border-gold" : "border-line hover:border-muted"}`}>
      <Handle type="target" position={Position.Left} isConnectable={false} className={HIDDEN_HANDLE} />
      <Preview flush html={page.html} title={`${page.title} preview`} />
      <div className="flex items-center justify-between gap-2 px-2 py-1.5">
        <span className="min-w-0">
          <span className="block truncate text-xs font-semibold text-ink">{page.title}</span>
          <span className="block text-[11px] leading-tight text-muted">
            {links} {links === 1 ? "link" : "links"}
          </span>
        </span>
        {index === 0 && <Home className="size-3.5 shrink-0 text-gold" aria-label="Opens first" />}
      </div>
      <Handle type="source" position={Position.Right} isConnectable={false} className={HIDDEN_HANDLE} />
    </div>
  );
}

const NODE_TYPES = { page: PageNode };

// Square elbows with the button's name on a chip; lines touching the chosen page turn gold.
function PageEdge({ id, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label }: EdgeProps) {
  const { selectedId } = useContext(MapContext);
  const active = source === selectedId || target === selectedId;
  const [path, labelX, labelY] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius: 8 });
  return (
    <>
      <BaseEdge id={id} path={path} style={{ stroke: active ? "var(--color-gold)" : "var(--color-muted)", strokeWidth: 1.5 }} />
      <EdgeLabelRenderer>
        <div
          className={`pointer-events-none absolute max-w-28 truncate rounded-md border bg-raised px-1.5 py-0.5 text-[11px] font-semibold leading-4 ${active ? "border-gold text-gold" : "border-line text-ink"}`}
          style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

const EDGE_TYPES = { page: PageEdge };

function MapBar() {
  const { fitView } = useReactFlow();
  const { zoom } = useViewport();
  return (
    <div className="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-line pl-3 pr-2">
      <h2 className="text-[13px] font-semibold">Map</h2>
      <div className="flex items-center gap-2">
        <button type="button" className="btn-ghost h-7 border border-line" onClick={() => fitView({ ...FIT, duration: 200 })}>
          <Maximize className="size-3.5" aria-hidden />
          Fit
        </button>
        <span className="w-10 text-right text-[11px] tabular-nums text-muted">{Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
}

export default function MapView({
  pages,
  selectedId,
  onSelect,
  onOpen,
  children,
}: {
  pages: GuiPage[];
  selectedId: string;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  children?: React.ReactNode;
}) {
  const graph = useMemo(() => buildGraph(pages), [pages]);
  // Only a change of pages or links rebuilds the graph, which also keeps any node you dragged in place.
  const shape = JSON.stringify([graph.nodes.map((n) => n.id), graph.edges.map((e) => [e.id, e.label])]);
  const context = useMemo(() => ({ pages, selectedId }), [pages, selectedId]);

  return (
    <MapContext.Provider value={context}>
      <ReactFlowProvider key={shape}>
        <MapBar />
        <div className="canvas-dots relative min-h-96 flex-1">
          <ReactFlow
            defaultNodes={graph.nodes}
            defaultEdges={graph.edges}
            nodeTypes={NODE_TYPES}
            edgeTypes={EDGE_TYPES}
            nodesConnectable={false}
            edgesFocusable={false}
            fitView
            fitViewOptions={FIT}
            minZoom={0.2}
            maxZoom={2}
            style={{ background: "transparent" }}
            onNodeClick={(_, node) => onSelect(node.id)}
            onNodeDoubleClick={(_, node) => onOpen(node.id)}
          />
          {children}
        </div>
      </ReactFlowProvider>
    </MapContext.Provider>
  );
}
