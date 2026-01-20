export type AnalysisStatus = "completed" | "processing" | "failed";

interface AnalysisItemProps {
  id: string;
  fileName: string;
  status: AnalysisStatus;
  nodesExtracted: number;
  timestamp: string;
  onView?: () => void;
}

export default function AnalysisItem({
  fileName,
  status,
  nodesExtracted,
  timestamp,
  onView,
}: AnalysisItemProps) {
  const statusConfig: Record<
    AnalysisStatus,
    {
      label: string;
      bgColor: string;
      textColor: string;
      borderColor: string;
      iconBg: string;
      iconText: string;
      animate?: boolean;
    }
  > = {
    completed: {
      label: "Completed",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-emerald-900/30",
      iconText: "text-emerald-400",
    },
    processing: {
      label: "Processing",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-900/30",
      iconText: "text-blue-400",
      animate: true,
    },
    failed: {
      label: "Failed",
      bgColor: "bg-red-500/10",
      textColor: "text-red-400",
      borderColor: "border-red-500/20",
      iconBg: "bg-red-900/30",
      iconText: "text-red-400",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      onClick={onView}
      className="p-4 hover:bg-slate-800/50 transition-colors flex items-center justify-between group cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={`${config.iconBg} p-2 rounded-lg ${config.iconText}`}>
          <span className="material-symbols-outlined">description</span>
        </div>
        <div>
          <h4 className="font-medium text-white">{fileName}</h4>
          <p className="text-xs text-slate-400">
            {status === "processing"
              ? "Processing now..."
              : `${timestamp} • ${nodesExtracted} Skills Extracted`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${config.animate ? "animate-pulse" : ""}`}
        >
          {config.label}
        </span>
        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
          chevron_right
        </span>
      </div>
    </div>
  );
}
