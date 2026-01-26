import type { DocumentListItem } from "@/app/lib/types/document";
import DocumentRow from "./DocumentRow";
import LoadMoreButton from "./LoadMoreButton";
import AnalysisHistoryTableSkeleton from "./AnalysisHistoryTableSkeleton";

interface AnalysisHistoryTableProps {
  documents: DocumentListItem[];
  isLoading: boolean;
  onViewDetails: (id: string) => void;
  onDelete: (document: DocumentListItem) => void;
  onDownload?: (document: DocumentListItem) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

export default function AnalysisHistoryTable({
  documents,
  isLoading,
  onViewDetails,
  onDelete,
  onDownload,
  onLoadMore,
  hasMore,
}: AnalysisHistoryTableProps) {
  // Show skeleton during initial load
  if (isLoading && documents.length === 0) {
    return <AnalysisHistoryTableSkeleton />;
  }

  // Empty state
  if (!isLoading && documents.length === 0) {
    return (
      <div className="glass-card rounded-xl border border-slate-700/50 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl text-slate-500">
              description
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No analyses yet
          </h3>
          <p className="text-sm text-slate-400 max-w-sm">
            Upload a document to get started. We support PDF, DOCX, TXT, and MD
            files up to 10MB.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 border-b border-slate-700/50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {documents.map((doc) => (
              <DocumentRow
                key={doc.id}
                document={doc}
                onViewDetails={onViewDetails}
                onDelete={onDelete}
                onDownload={onDownload}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with pagination info and load more */}
      <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-700/50 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Showing {documents.length} document{documents.length !== 1 ? "s" : ""}
        </span>
        <LoadMoreButton
          onClick={onLoadMore}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
}
