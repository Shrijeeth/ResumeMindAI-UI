interface KnowledgeGraphCardProps {
  topNode?: string;
  matchScore?: number;
  onExplore?: () => void;
}

export default function KnowledgeGraphCard({
  topNode = 'Python',
  matchScore = 98,
  onExplore,
}: KnowledgeGraphCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-white">Career Knowledge Graph</h3>
        <p className="text-sm text-slate-400">Visual summary of your top skills & relations.</p>
      </div>

      {/* Graph Visualization */}
      <div className="flex-1 bg-slate-900/50 rounded-xl relative overflow-hidden flex items-center justify-center min-h-[200px] border border-slate-700/50">
        {/* SVG Graph */}
        <div className="absolute inset-0 opacity-60">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Connection lines */}
            <line x1="100" y1="100" x2="60" y2="50" className="glow-line" strokeWidth="1" />
            <line x1="100" y1="100" x2="140" y2="50" className="glow-line" strokeWidth="1" />
            <line x1="100" y1="100" x2="50" y2="100" className="glow-line" strokeWidth="1" />
            <line x1="100" y1="100" x2="150" y2="100" className="glow-line" strokeWidth="1" />
            <line x1="100" y1="100" x2="60" y2="150" className="glow-line" strokeWidth="1" />
            <line x1="100" y1="100" x2="140" y2="150" className="glow-line" strokeWidth="1" />

            {/* Secondary connections */}
            <line x1="60" y1="50" x2="50" y2="100" className="glow-line" strokeWidth="0.5" />
            <line x1="140" y1="50" x2="150" y2="100" className="glow-line" strokeWidth="0.5" />
            <line x1="50" y1="100" x2="60" y2="150" className="glow-line" strokeWidth="0.5" />
            <line x1="150" y1="100" x2="140" y2="150" className="glow-line" strokeWidth="0.5" />

            {/* Center node (main skill) */}
            <circle cx="100" cy="100" r="10" className="glow-node" />
            <circle cx="100" cy="100" r="6" fill="#8B5CF6" />

            {/* Outer nodes */}
            <circle cx="60" cy="50" r="5" className="glow-node" />
            <circle cx="140" cy="50" r="5" className="glow-node" />
            <circle cx="50" cy="100" r="4" className="glow-node" />
            <circle cx="150" cy="100" r="4" className="glow-node" />
            <circle cx="60" cy="150" r="5" className="glow-node" />
            <circle cx="140" cy="150" r="5" className="glow-node" />

            {/* Tertiary nodes */}
            <circle cx="30" cy="70" r="3" className="glow-node" />
            <circle cx="170" cy="70" r="3" className="glow-node" />
            <circle cx="30" cy="130" r="3" className="glow-node" />
            <circle cx="170" cy="130" r="3" className="glow-node" />
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
