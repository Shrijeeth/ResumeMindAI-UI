export default function KnowledgeGraphSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col">
      {/* Header skeleton */}
      <div className="mb-4">
        <div className="h-6 w-40 bg-slate-700/50 rounded animate-pulse mb-2" />
        <div className="h-4 w-56 bg-slate-700/50 rounded animate-pulse" />
      </div>

      {/* Graph visualization area skeleton */}
      <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-700/50 border-dashed min-h-[200px] flex flex-col items-center justify-center">
        <div className="w-14 h-14 bg-slate-800/50 rounded-xl flex items-center justify-center mb-4 animate-pulse">
          <div className="h-6 w-6 bg-slate-700/50 rounded animate-pulse" />
        </div>
        <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse mb-2" />
        <div className="h-3 w-40 bg-slate-700/50 rounded animate-pulse" />
      </div>

      {/* Button skeleton */}
      <div className="h-10 w-full bg-slate-700/50 rounded-lg animate-pulse mt-4" />
    </div>
  );
}
