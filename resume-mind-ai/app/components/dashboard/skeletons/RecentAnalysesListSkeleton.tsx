export default function RecentAnalysesListSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header skeleton */}
      <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
        <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse" />
        <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse" />
      </div>

      {/* List items skeleton */}
      <div className="divide-y divide-slate-700/50">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            {/* File icon skeleton */}
            <div className="h-10 w-10 bg-slate-700/50 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              {/* File name skeleton */}
              <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse" />
              {/* Timestamp skeleton */}
              <div className="h-3 w-24 bg-slate-700/50 rounded animate-pulse" />
            </div>
            {/* Action button skeleton */}
            <div className="h-8 w-16 bg-slate-700/50 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
