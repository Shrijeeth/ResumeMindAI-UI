import Link from "next/link";

interface KnowledgeGraphCardProps {
  topNode?: string | null;
  matchScore?: number | null;
  nodeCount?: number;
  hasData?: boolean;
  onExplore?: () => void;
}

export default function KnowledgeGraphCard({
  topNode,
  matchScore,
  nodeCount = 0,
  hasData = false,
  onExplore,
}: KnowledgeGraphCardProps) {
  // Empty state - no graph data yet
  if (!hasData || nodeCount === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-lg text-white">
            Career Knowledge Graph
          </h3>
          <p className="text-sm text-slate-400">
            Visual summary of your top skills & relations.
          </p>
        </div>

        {/* Empty Graph Visualization */}
        <div className="flex-1 bg-slate-900/50 rounded-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[200px] border border-slate-700/50 border-dashed">
          <div className="w-14 h-14 bg-slate-800/50 rounded-xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl text-slate-500">
              hub
            </span>
          </div>
          <h4 className="text-white font-medium mb-1">No Graph Data</h4>
          <p className="text-slate-400 text-xs text-center max-w-[200px]">
            Upload and analyze a resume to generate your knowledge graph.
          </p>
        </div>

        {/* Disabled Action Button */}
        <Link
          href="/dashboard/resumes"
          className="mt-4 w-full py-2.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">upload</span>
          Upload Resume First
        </Link>
      </div>
    );
  }

  // Active state with data
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-white">Career Knowledge Graph</h3>
        <p className="text-sm text-slate-400">
          Visual summary of your top skills & relations.
        </p>
      </div>

      {/* Graph Visualization */}
      <div className="flex-1 bg-slate-900/50 rounded-xl relative overflow-hidden flex items-center justify-center min-h-[200px] border border-slate-700/50">
        {/* SVG Graph */}
        <div className="absolute inset-0 opacity-60">
          <svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connection lines */}
            <line
              x1="100"
              y1="100"
              x2="60"
              y2="50"
              stroke="#4b5563"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="140"
              y2="50"
              stroke="#4b5563"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="50"
              y2="100"
              stroke="#4b5563"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="150"
              y2="100"
              stroke="#4b5563"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="60"
              y2="150"
              stroke="#4b5563"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="140"
              y2="150"
              stroke="#4b5563"
              strokeWidth="1"
            />

            {/* Secondary connections */}
            <line
              x1="60"
              y1="50"
              x2="50"
              y2="100"
              stroke="#4b5563"
              strokeWidth="0.5"
            />
            <line
              x1="140"
              y1="50"
              x2="150"
              y2="100"
              stroke="#4b5563"
              strokeWidth="0.5"
            />
            <line
              x1="50"
              y1="100"
              x2="60"
              y2="150"
              stroke="#4b5563"
              strokeWidth="0.5"
            />
            <line
              x1="150"
              y1="100"
              x2="140"
              y2="150"
              stroke="#4b5563"
              strokeWidth="0.5"
            />

            {/* Center node (main skill) */}
            <circle cx="100" cy="100" r="10" fill="#6366f1" opacity="0.3" />
            <circle cx="100" cy="100" r="6" fill="#8B5CF6" />

            {/* Outer nodes */}
            <circle cx="60" cy="50" r="5" fill="#6366f1" />
            <circle cx="140" cy="50" r="5" fill="#6366f1" />
            <circle cx="50" cy="100" r="4" fill="#6366f1" />
            <circle cx="150" cy="100" r="4" fill="#6366f1" />
            <circle cx="60" cy="150" r="5" fill="#6366f1" />
            <circle cx="140" cy="150" r="5" fill="#6366f1" />

            {/* Tertiary nodes */}
            <circle cx="30" cy="70" r="3" fill="#6366f1" />
            <circle cx="170" cy="70" r="3" fill="#6366f1" />
            <circle cx="30" cy="130" r="3" fill="#6366f1" />
            <circle cx="170" cy="130" r="3" fill="#6366f1" />
          </svg>
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10">
          <div className="flex justify-between items-center text-xs">
            <span className="text-white font-medium">Top Node: {topNode}</span>
            <span className="text-primary font-bold">{matchScore}% Match</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onExplore}
        className="mt-4 w-full py-2.5 bg-slate-800/50 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700/50 hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">open_in_new</span>
        Open FalkorDB Explorer
      </button>
    </div>
  );
}
