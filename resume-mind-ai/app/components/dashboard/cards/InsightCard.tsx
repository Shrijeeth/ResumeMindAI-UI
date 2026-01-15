interface InsightCardProps {
  icon: string;
  iconColor: string;
  iconTextColor: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  progressValue?: number;
  highlightValue?: string;
}

export default function InsightCard({
  icon,
  iconColor,
  iconTextColor,
  title,
  description,
  actionLabel,
  onAction,
  progressValue,
  highlightValue,
}: InsightCardProps) {
  return (
    <div className="glass-card p-5 rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 ${iconColor} rounded-lg`}>
          <span className={`material-symbols-outlined text-xl ${iconTextColor}`}>{icon}</span>
        </div>
        <h4 className="font-semibold text-white">{title}</h4>
      </div>

      <p className="text-sm text-slate-400 mb-3">{description}</p>

      {/* Progress bar */}
      {typeof progressValue === 'number' && (
        <div className="h-1.5 w-full bg-slate-700/50 rounded-full mb-3">
          <div
            className={`h-1.5 rounded-full ${iconTextColor.replace('text-', 'bg-').replace('-400', '-500')}`}
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
      )}

      {/* Highlight value */}
      {highlightValue && (
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-bold text-white">{highlightValue}</span>
        </div>
      )}

      {/* Action link */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-primary text-sm font-medium hover:underline transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
