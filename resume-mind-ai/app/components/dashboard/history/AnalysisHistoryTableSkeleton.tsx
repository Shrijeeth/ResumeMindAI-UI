export default function AnalysisHistoryTableSkeleton() {
  return (
    <div className="glass-card rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Table Header */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="h-3 w-20 bg-slate-700/50 rounded animate-pulse" />
          <div className="h-3 w-16 bg-slate-700/50 rounded animate-pulse" />
          <div className="h-3 w-16 bg-slate-700/50 rounded animate-pulse" />
          <div className="h-3 w-16 bg-slate-700/50 rounded animate-pulse ml-auto" />
        </div>
      </div>

      {/* Skeleton Rows */}
      <div className="divide-y divide-slate-700/50">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-6">
            {/* File icon + name */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-slate-700/50 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-40 bg-slate-700/50 rounded animate-pulse" />
                <div className="h-3 w-20 bg-slate-700/50 rounded animate-pulse" />
              </div>
            </div>

            {/* Date */}
            <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse" />

            {/* Status */}
            <div className="h-6 w-20 bg-slate-700/50 rounded-full animate-pulse" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse" />
              <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-700/50 flex items-center justify-between">
        <div className="h-3 w-32 bg-slate-700/50 rounded animate-pulse" />
        <div className="h-8 w-24 bg-slate-700/50 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
