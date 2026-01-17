export default function InsightCardSkeleton() {
  return (
    <div className="glass-card p-5 rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        {/* Icon container skeleton */}
        <div className="p-2 bg-slate-700/50 rounded-lg">
          <div className="h-5 w-5 bg-slate-600/50 rounded animate-pulse" />
        </div>
        {/* Title skeleton */}
        <div className="h-5 w-24 bg-slate-700/50 rounded animate-pulse" />
      </div>

      {/* Description skeleton */}
      <div className="space-y-2 mb-3">
        <div className="h-3 w-full bg-slate-700/50 rounded animate-pulse" />
        <div className="h-3 w-3/4 bg-slate-700/50 rounded animate-pulse" />
      </div>

      {/* Action link skeleton */}
      <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse" />
    </div>
  );
}
