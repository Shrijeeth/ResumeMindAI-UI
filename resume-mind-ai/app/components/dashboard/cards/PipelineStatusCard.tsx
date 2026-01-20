import Link from "next/link";

interface PipelineStats {
  tokensUsed: number;
  tokensLimit: number;
  resumesProcessed: number;
  graphNodes: number;
}

interface PipelineStatusCardProps {
  status?: "active" | "idle" | "processing" | "not_configured";
  llmProvider?: string | null;
  stats?: PipelineStats | null;
}

export default function PipelineStatusCard({
  status = "not_configured",
  llmProvider,
  stats,
}: PipelineStatusCardProps) {
  const isConfigured = llmProvider && status !== "not_configured";

  // Empty state - no LLM provider configured
  if (!isConfigured) {
    return (
      <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">
            Pipeline Status
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-500">
              Not Configured
            </span>
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-500" />
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {/* Empty State Message */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-orange-400 text-lg mt-0.5">
                warning
              </span>
              <div>
                <p className="text-sm text-orange-300 font-medium mb-1">
                  LLM Provider Required
                </p>
                <p className="text-xs text-slate-400">
                  Configure an LLM provider to start analyzing resumes.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href="/dashboard/settings"
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-violet-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-sm">settings</span>
            Configure LLM Provider
          </Link>
        </div>
      </div>
    );
  }

  // Active state with data
  const tokenPercentage = stats
    ? Math.round((stats.tokensUsed / stats.tokensLimit) * 100)
    : 0;

  const statusConfig = {
    active: { label: "Active", color: "bg-emerald-500" },
    idle: { label: "Idle", color: "bg-slate-500" },
    processing: { label: "Processing", color: "bg-blue-500" },
    not_configured: { label: "Not Configured", color: "bg-slate-500" },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">
          Pipeline Status
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-white">
            {currentStatus.label}
          </span>
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.color} opacity-75`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${currentStatus.color}`}
            ></span>
          </span>
        </div>
        <p className="text-sm text-slate-400">
          LLM Provider:{" "}
          <span className="text-primary font-medium">{llmProvider}</span>
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {/* Token Usage */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">Tokens Used</span>
            <span className="font-medium text-white">{tokenPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${tokenPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex gap-3">
          <div className="flex-1 bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">
              {stats?.resumesProcessed ?? 0}
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">
              Resumes
            </div>
          </div>
          <div className="flex-1 bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">
              {stats
                ? stats.graphNodes >= 1000
                  ? `${(stats.graphNodes / 1000).toFixed(1)}k`
                  : stats.graphNodes
                : 0}
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">
              Entities
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
