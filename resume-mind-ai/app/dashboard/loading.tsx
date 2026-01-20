import {
  PipelineStatusSkeleton,
  RecentAnalysesListSkeleton,
  KnowledgeGraphSkeleton,
  InsightCardSkeleton,
} from "@/app/components/dashboard/skeletons";

export default function DashboardLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark">
      {/* Sidebar placeholder */}
      <div className="hidden lg:flex lg:flex-col w-64 bg-slate-900/50 border-r border-slate-700/50">
        {/* Logo area */}
        <div className="h-16 border-b border-slate-700/50 flex items-center px-6">
          <div className="h-8 w-32 bg-slate-700/50 rounded animate-pulse" />
        </div>
        {/* Nav items */}
        <div className="flex-1 p-4 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 bg-slate-700/30 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header placeholder */}
        <div className="h-16 border-b border-slate-700/50 bg-slate-900/50 flex items-center justify-between px-6">
          <div className="h-6 w-40 bg-slate-700/50 rounded animate-pulse" />
          <div className="h-8 w-8 bg-slate-700/50 rounded-full animate-pulse" />
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Row 1: Upload + Pipeline Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Upload card skeleton */}
              <div className="glass-card rounded-2xl p-6">
                <div className="h-5 w-28 bg-slate-700/50 rounded animate-pulse mb-4" />
                <div className="border-2 border-dashed border-slate-700/50 rounded-xl p-8 flex flex-col items-center justify-center min-h-[180px]">
                  <div className="h-12 w-12 bg-slate-700/50 rounded-xl animate-pulse mb-4" />
                  <div className="h-4 w-40 bg-slate-700/50 rounded animate-pulse mb-2" />
                  <div className="h-3 w-32 bg-slate-700/50 rounded animate-pulse" />
                </div>
              </div>
              <PipelineStatusSkeleton />
            </div>

            {/* Row 2: Recent Analyses + Knowledge Graph */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentAnalysesListSkeleton />
              </div>
              <KnowledgeGraphSkeleton />
            </div>

            {/* Row 3: Insight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <InsightCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
