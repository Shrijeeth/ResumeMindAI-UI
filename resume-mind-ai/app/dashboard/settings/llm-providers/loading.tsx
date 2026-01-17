import { ProviderCardSkeleton } from '@/app/components/dashboard/skeletons';

export default function LLMProvidersLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="h-6 w-44 bg-slate-700/50 rounded animate-pulse mb-2" />
          <div className="h-4 w-72 bg-slate-700/50 rounded animate-pulse" />
        </div>
        <div className="h-10 w-40 bg-slate-700/50 rounded-lg animate-pulse" />
      </div>

      {/* Provider cards skeleton grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <ProviderCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
