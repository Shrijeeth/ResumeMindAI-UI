export default function KnowledgeGraphBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <svg
        className="absolute w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="graph-pattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {/* Graph nodes */}
            <circle className="glow-node" cx="20" cy="20" r="2" />
            <circle className="glow-node" cx="150" cy="60" r="1.5" />
            <circle className="glow-node" cx="80" cy="140" r="2" />
            <circle className="glow-node" cx="180" cy="180" r="1" />

            {/* Connecting lines */}
            <line
              className="glow-line"
              x1="20"
              y1="20"
              x2="150"
              y2="60"
              strokeWidth="0.5"
            />
            <line
              className="glow-line"
              x1="20"
              y1="20"
              x2="80"
              y2="140"
              strokeWidth="0.5"
            />
            <line
              className="glow-line"
              x1="80"
              y1="140"
              x2="150"
              y2="60"
              strokeWidth="0.5"
            />
            <line
              className="glow-line"
              x1="150"
              y1="60"
              x2="180"
              y2="180"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#graph-pattern)" />
      </svg>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-transparent to-[#0f172a] opacity-90" />
    </div>
  );
}
