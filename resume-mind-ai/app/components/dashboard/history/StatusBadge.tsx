import type { DocumentStatus } from "@/app/lib/types/document";

interface StatusBadgeProps {
  status: DocumentStatus;
  showDot?: boolean;
}

interface StatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  dotColor?: string;
  animate?: boolean;
}

const statusConfig: Record<DocumentStatus, StatusConfig> = {
  pending: {
    label: "Pending",
    bgColor: "bg-slate-500/10",
    textColor: "text-slate-400",
    borderColor: "border-slate-500/20",
    dotColor: "bg-slate-400",
  },
  uploading: {
    label: "Uploading",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    dotColor: "bg-blue-400",
    animate: true,
  },
  validating: {
    label: "Validating",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    dotColor: "bg-blue-400",
    animate: true,
  },
  parsing: {
    label: "Processing",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    dotColor: "bg-blue-400",
    animate: true,
  },
  completed: {
    label: "Completed",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    dotColor: "bg-emerald-400",
  },
  invalid: {
    label: "Invalid",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/20",
    dotColor: "bg-orange-400",
  },
  failed: {
    label: "Failed",
    bgColor: "bg-red-500/10",
    textColor: "text-red-400",
    borderColor: "border-red-500/20",
    dotColor: "bg-red-400",
  },
};

export default function StatusBadge({
  status,
  showDot = true,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
    >
      {showDot && config.dotColor && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${config.dotColor} ${
            config.animate ? "animate-pulse" : ""
          }`}
        />
      )}
      {config.label}
    </span>
  );
}
