"use client";

import { NODE_COLORS, NODE_LABELS, NodeType } from "@/app/lib/types/graph";

interface LegendItem {
  type: NodeType;
  label: string;
  count?: number;
}

interface GraphLegendProps {
  items?: LegendItem[];
  onToggleVisibility?: (type: NodeType) => void;
  hiddenTypes?: NodeType[];
  nodeCounts?: Record<string, number>;
}

const DEFAULT_ITEMS: LegendItem[] = [
  { type: "person", label: NODE_LABELS.person },
  { type: "skill", label: NODE_LABELS.skill },
  { type: "experience", label: NODE_LABELS.experience },
  { type: "education", label: NODE_LABELS.education },
  { type: "company", label: NODE_LABELS.company },
  { type: "certification", label: NODE_LABELS.certification },
  { type: "project", label: NODE_LABELS.project },
  { type: "technology", label: NODE_LABELS.technology },
  { type: "language", label: NODE_LABELS.language },
  { type: "interest", label: NODE_LABELS.interest },
];

export default function GraphLegend({
  items = DEFAULT_ITEMS,
  onToggleVisibility,
  hiddenTypes = [],
  nodeCounts = {},
}: GraphLegendProps) {
  // Filter items to only show those that exist in the graph
  const visibleItems = items.filter(
    (item) => nodeCounts[item.type] !== undefined && nodeCounts[item.type] > 0,
  );

  // If no node counts provided, show all items
  const displayItems =
    Object.keys(nodeCounts).length > 0 ? visibleItems : items;

  return (
    <div className="absolute top-4 left-4 z-10">
      <div className="glass-card p-4 rounded-xl">
        <h4 className="text-sm font-semibold text-white mb-3">Legend</h4>
        <div className="space-y-1.5">
          {displayItems.map((item) => {
            const isHidden = hiddenTypes.includes(item.type);
            const count = nodeCounts[item.type];

            return (
              <button
                key={item.type}
                onClick={() => onToggleVisibility?.(item.type)}
                className={`flex items-center gap-3 w-full px-2 py-1.5 rounded-lg transition-all hover:bg-slate-700/30 ${
                  isHidden ? "opacity-40" : ""
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-transform ${
                    isHidden ? "scale-75" : ""
                  }`}
                  style={{ backgroundColor: NODE_COLORS[item.type] }}
                />
                <span
                  className={`text-sm transition-colors ${
                    isHidden ? "text-slate-500 line-through" : "text-slate-300"
                  }`}
                >
                  {item.label}
                </span>
                {count !== undefined && (
                  <span className="text-xs text-slate-500 ml-auto">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
