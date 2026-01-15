interface PipelineStats {
  tokensUsed: number;
  tokensLimit: number;
  resumesProcessed: number;
  graphNodes: number;
}

interface PipelineStatusCardProps {
  status: 'active' | 'idle' | 'processing';
  llmProvider: string;
  stats: PipelineStats;
}

export default function PipelineStatusCard({
  status,
  llmProvider,
  stats,
}: PipelineStatusCardProps) {
  const tokenPercentage = Math.round((stats.tokensUsed / stats.tokensLimit) * 100);

  const statusConfig = {
    active: { label: 'Active', color: 'bg-emerald-500' },
    idle: { label: 'Idle', color: 'bg-slate-500' },
    processing: { label: 'Processing', color: 'bg-blue-500' },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">
          Pipeline Status
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-white">{currentStatus.label}</span>
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
          LLM Provider: <span className="text-primary font-medium">{llmProvider}</span>
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
            <div className="text-lg font-bold text-white">{stats.resumesProcessed}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Resumes</div>
          </div>
          <div className="flex-1 bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">
              {stats.graphNodes >= 1000
                ? `${(stats.graphNodes / 1000).toFixed(1)}k`
                : stats.graphNodes}
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Entities</div>
          </div>
        </div>
      </div>
    </div>
  );
}
