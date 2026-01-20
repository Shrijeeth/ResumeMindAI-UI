"use client";

export type ProviderStatus = "connected" | "inactive" | "error";

interface ProviderCardProps {
  id: string;
  name: string;
  model: string;
  status: ProviderStatus;
  latency?: number;
  errorMessage?: string;
  logoInitials: string;
  logoColorClass: string;
  isActive?: boolean;
  onSetActive?: (id: string) => void;
  isSettingActive?: boolean;
  setActiveInProgress?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRetry?: (id: string) => void;
  onTest?: (id: string) => void;
  isTesting?: boolean;
}

const statusConfig = {
  connected: {
    label: "Connected",
    badgeClasses: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    showPulse: true,
    pulseColor: "bg-emerald-500",
    barColor: "bg-emerald-500",
  },
  inactive: {
    label: "Inactive",
    badgeClasses: "bg-slate-700/50 border-slate-600 text-slate-400",
    showPulse: false,
    pulseColor: "",
    barColor: "bg-slate-600",
  },
  error: {
    label: "Error",
    badgeClasses: "bg-red-500/10 border-red-500/20 text-red-400",
    showPulse: false,
    pulseColor: "",
    barColor: "bg-red-500",
  },
};

export default function ProviderCard({
  id,
  name,
  model,
  status,
  latency,
  errorMessage,
  logoInitials,
  logoColorClass,
  isActive = false,
  onSetActive,
  isSettingActive = false,
  setActiveInProgress = false,
  onEdit,
  onDelete,
  onRetry,
  onTest,
  isTesting = false,
}: ProviderCardProps) {
  const config = statusConfig[status];
  const hasLatency = latency !== undefined && latency !== null;
  const latencyPercentage = hasLatency
    ? Math.min(100, Math.max(5, 100 - latency / 5))
    : 0;

  return (
    <div
      className={`group relative glass-card rounded-xl p-5 transition-all duration-300 ${
        status === "error"
          ? "hover:border-red-500/30"
          : "hover:border-primary/50"
      } ${isActive ? "border-primary/60 shadow-[0_0_20px_rgba(139,92,246,0.35)]" : ""}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg ${logoColorClass} flex items-center justify-center border border-current/20`}
          >
            <span className="font-bold text-sm tracking-tighter">
              {logoInitials}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{name}</h3>
            <p className="text-xs text-slate-500">{model}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isActive && (
            <span className="inline-flex items-center px-2 py-1 rounded-md border border-primary/40 bg-primary/10 text-[10px] font-semibold text-primary uppercase tracking-wider shadow-[0_0_12px_rgba(139,92,246,0.35)]">
              <span className="material-symbols-outlined text-xs mr-1">
                check_circle
              </span>
              Active
            </span>
          )}
          <div
            className={`inline-flex items-center px-2 py-1 rounded-md border text-[10px] font-medium uppercase tracking-wider ${config.badgeClasses}`}
          >
            {config.showPulse && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            )}
            {config.label}
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Latency</span>
          <span
            className={status === "error" ? "text-red-400" : "text-slate-300"}
          >
            {status === "error"
              ? errorMessage || "Timeout"
              : hasLatency
                ? `${latency}ms`
                : "--"}
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1">
          {status !== "inactive" && hasLatency && (
            <div
              className={`${config.barColor} h-1 rounded-full transition-all duration-300 ${
                status === "connected"
                  ? "shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  : ""
              }`}
              style={{
                width: status === "error" ? "100%" : `${latencyPercentage}%`,
              }}
            ></div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity flex-wrap">
        {onSetActive && (
          <button
            onClick={() => onSetActive(id)}
            disabled={
              isActive ||
              isSettingActive ||
              setActiveInProgress ||
              status !== "connected"
            }
            className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              isActive
                ? "border-primary/50 bg-primary/10 text-primary cursor-default"
                : status !== "connected"
                  ? "border-slate-700 bg-slate-800/60 text-slate-500 cursor-not-allowed"
                  : "border-slate-700 bg-slate-800 text-slate-200 hover:border-primary/60 hover:text-white"
            } disabled:opacity-70 disabled:cursor-not-allowed`}
            aria-label={`Set ${name} as active`}
            title={
              status !== "connected"
                ? "Connect and test before setting active."
                : isActive
                  ? "Already active"
                  : "Set Active"
            }
          >
            {isSettingActive ? (
              <span className="w-4 h-4 border border-primary border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span className="material-symbols-outlined text-sm">
                radio_button_unchecked
              </span>
            )}
            <span>{isActive ? "Active" : "Set Active"}</span>
          </button>
        )}

        {onTest && (
          <button
            onClick={() => onTest(id)}
            disabled={isTesting}
            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            title="Test connection"
          >
            {isTesting ? (
              <span className="w-4 h-4 border border-emerald-400 border-t-transparent rounded-full animate-spin inline-block"></span>
            ) : (
              <span className="material-symbols-outlined text-lg">bolt</span>
            )}
          </button>
        )}
        {status === "error" && onRetry && (
          <button
            onClick={() => onRetry(id)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
            title="Retry test"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
          </button>
        )}
        <button
          onClick={() => onEdit(id)}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
          title="Edit connection"
        >
          <span className="material-symbols-outlined text-lg">edit</span>
        </button>
        <button
          onClick={() => onDelete(id)}
          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
          title="Delete connection"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>
    </div>
  );
}
