export default function ProviderCardSkeleton() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Logo skeleton */}
          <div className="w-10 h-10 rounded-lg bg-slate-700/50 animate-pulse" />
          <div className="space-y-1.5">
            {/* Name skeleton */}
            <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse" />
            {/* Model skeleton */}
            <div className="h-3 w-16 bg-slate-700/50 rounded animate-pulse" />
          </div>
        </div>
        {/* Badge skeleton */}
        <div className="h-5 w-16 bg-slate-700/50 rounded-md animate-pulse" />
      </div>

      {/* Latency section skeleton */}
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <div className="h-3 w-12 bg-slate-700/50 rounded animate-pulse" />
          <div className="h-3 w-8 bg-slate-700/50 rounded animate-pulse" />
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1" />
      </div>

      {/* Actions skeleton */}
      <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end gap-2">
        <div className="h-7 w-7 bg-slate-700/50 rounded animate-pulse" />
        <div className="h-7 w-7 bg-slate-700/50 rounded animate-pulse" />
        <div className="h-7 w-7 bg-slate-700/50 rounded animate-pulse" />
      </div>
    </div>
  );
}
