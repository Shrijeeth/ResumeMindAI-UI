import Link from "next/link";

interface InsightCardProps {
  icon: string;
  iconColor: string;
  iconTextColor: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  progressValue?: number;
  highlightValue?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
  emptyActionLabel?: string;
  emptyActionHref?: string;
}

export default function InsightCard({
  icon,
  iconColor,
  iconTextColor,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  progressValue,
  highlightValue,
  isEmpty = false,
  emptyMessage,
  emptyActionLabel,
  emptyActionHref,
}: InsightCardProps) {
  // Empty state
  if (isEmpty) {
    return (
      <div className="glass-card p-5 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 bg-slate-700/50 rounded-lg`}>
            <span className="material-symbols-outlined text-xl text-slate-500">
              {icon}
            </span>
          </div>
          <h4 className="font-semibold text-slate-400">{title}</h4>
        </div>

        <p className="text-sm text-slate-500 mb-3">
          {emptyMessage || "No data available yet."}
        </p>

        {emptyActionLabel && emptyActionHref && (
          <Link
            href={emptyActionHref}
            className="text-primary text-sm font-medium hover:underline transition-colors inline-flex items-center gap-1"
          >
            {emptyActionLabel}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        )}
      </div>
    );
  }

  // Active state with data
  return (
    <div className="glass-card p-5 rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 ${iconColor} rounded-lg`}>
          <span
            className={`material-symbols-outlined text-xl ${iconTextColor}`}
          >
            {icon}
          </span>
        </div>
        <h4 className="font-semibold text-white">{title}</h4>
      </div>

      <p className="text-sm text-slate-400 mb-3">{description}</p>

      {/* Progress bar */}
      {typeof progressValue === "number" && (
        <div className="h-1.5 w-full bg-slate-700/50 rounded-full mb-3">
          <div
            className={`h-1.5 rounded-full ${iconTextColor.replace("text-", "bg-").replace("-400", "-500")}`}
            style={{ width: `${progressValue}%` }}
          />
        </div>
      )}

      {/* Highlight value */}
      {highlightValue && (
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-bold text-white">
            {highlightValue}
          </span>
        </div>
      )}

      {/* Action link */}
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="text-primary text-sm font-medium hover:underline transition-colors"
        >
          {actionLabel}
        </Link>
      ) : actionLabel && onAction ? (
        <button
          onClick={onAction}
          className="text-primary text-sm font-medium hover:underline transition-colors"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
