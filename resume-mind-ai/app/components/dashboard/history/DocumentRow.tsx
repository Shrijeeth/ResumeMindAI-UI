import type { DocumentListItem } from "@/app/lib/types/document";
import { isTerminalStatus } from "@/app/lib/types/document";
import StatusBadge from "./StatusBadge";

interface DocumentRowProps {
  document: DocumentListItem;
  onViewDetails: (id: string) => void;
  onDelete: (document: DocumentListItem) => void;
  onDownload?: (document: DocumentListItem) => void;
}

// File type icon configuration
const fileTypeConfig: Record<
  string,
  { icon: string; bgColor: string; textColor: string }
> = {
  pdf: {
    icon: "picture_as_pdf",
    bgColor: "bg-red-500/10",
    textColor: "text-red-400",
  },
  docx: {
    icon: "description",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
  },
  doc: {
    icon: "description",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
  },
  txt: {
    icon: "article",
    bgColor: "bg-slate-500/10",
    textColor: "text-slate-400",
  },
  md: {
    icon: "code",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-400",
  },
};

const defaultFileType = {
  icon: "insert_drive_file",
  bgColor: "bg-slate-500/10",
  textColor: "text-slate-400",
};

// Document type labels
const documentTypeLabels: Record<string, string> = {
  resume: "Resume",
  job_description: "Job Description",
  cover_letter: "Cover Letter",
  other: "Other",
  unknown: "Unknown",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export default function DocumentRow({
  document,
  onViewDetails,
  onDelete,
  onDownload,
}: DocumentRowProps) {
  const fileConfig = fileTypeConfig[document.file_type] || defaultFileType;
  const isCompleted = document.status === "completed";
  const isTerminal = isTerminalStatus(document.status);
  const docTypeLabel = document.document_type
    ? documentTypeLabels[document.document_type] || document.document_type
    : "--";

  return (
    <tr className="hover:bg-slate-800/30 transition-colors group">
      {/* File Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${fileConfig.bgColor} shrink-0`}>
            <span
              className={`material-symbols-outlined text-xl ${fileConfig.textColor}`}
            >
              {fileConfig.icon}
            </span>
          </div>
          <div className="min-w-0">
            <p
              className="text-sm font-medium text-white truncate max-w-[200px] lg:max-w-[300px]"
              title={document.original_filename}
            >
              {document.original_filename}
            </p>
            <p className="text-xs text-slate-500">{docTypeLabel}</p>
          </div>
        </div>
      </td>

      {/* Date Analyzed */}
      <td className="px-6 py-4 text-sm text-slate-400">
        {formatDate(document.created_at)}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={document.status} />
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">
          {/* View Details */}
          <button
            onClick={() => onViewDetails(document.id)}
            disabled={!isTerminal}
            className={`p-2 rounded-lg transition-colors ${
              isTerminal
                ? "hover:bg-primary/20 text-primary"
                : "text-slate-600 cursor-not-allowed"
            }`}
            title={isTerminal ? "View Details" : "Processing..."}
          >
            <span className="material-symbols-outlined text-lg">
              visibility
            </span>
          </button>

          {/* Download (only for completed) */}
          {onDownload && (
            <button
              onClick={() => onDownload(document)}
              disabled={!isCompleted}
              className={`p-2 rounded-lg transition-colors ${
                isCompleted
                  ? "hover:bg-blue-500/20 text-blue-400"
                  : "text-slate-600 cursor-not-allowed"
              }`}
              title={isCompleted ? "Download" : "Not available"}
            >
              <span className="material-symbols-outlined text-lg">
                download
              </span>
            </button>
          )}

          {/* Delete */}
          <button
            onClick={() => onDelete(document)}
            className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Delete"
          >
            <span className="material-symbols-outlined text-lg">
              delete_outline
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}
