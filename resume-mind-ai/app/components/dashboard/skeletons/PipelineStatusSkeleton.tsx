export default function PipelineStatusSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between md:col-span-2">
      <div>
        {/* Header label skeleton */}
        <div className="h-3 w-24 bg-slate-700/50 rounded animate-pulse mb-4" />
        <div className="flex items-center justify-between mb-2">
          {/* Status text skeleton */}
          <div className="h-8 w-32 bg-slate-700/50 rounded animate-pulse" />
          {/* Status indicator skeleton */}
          <div className="h-3 w-3 bg-slate-700/50 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Message box skeleton */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 bg-slate-700/50 rounded animate-pulse mt-0.5" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse" />
              <div className="h-3 w-48 bg-slate-700/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
        {/* Button skeleton */}
        <div className="h-10 w-full bg-slate-700/50 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
