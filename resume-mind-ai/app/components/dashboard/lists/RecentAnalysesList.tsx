import AnalysisItem, { AnalysisStatus } from './AnalysisItem';

export interface Analysis {
  id: string;
  fileName: string;
  status: AnalysisStatus;
  nodesExtracted: number;
  timestamp: string;
}

interface RecentAnalysesListProps {
  analyses: Analysis[];
  onViewAnalysis?: (id: string) => void;
  onViewAll?: () => void;
}

export default function RecentAnalysesList({
  analyses,
  onViewAnalysis,
  onViewAll,
}: RecentAnalysesListProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
        <h3 className="font-bold text-lg text-white">Recent Analyses</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-primary hover:text-violet-400 text-sm font-medium transition-colors"
          >
            View All
          </button>
        )}
      </div>

      {/* List */}
      {analyses.length > 0 ? (
        <div className="divide-y divide-slate-700/50">
          {analyses.map((analysis) => (
            <AnalysisItem
              key={analysis.id}
              id={analysis.id}
              fileName={analysis.fileName}
              status={analysis.status}
              nodesExtracted={analysis.nodesExtracted}
              timestamp={analysis.timestamp}
              onView={() => onViewAnalysis?.(analysis.id)}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-slate-500">description</span>
          </div>
          <h4 className="text-white font-medium mb-2">No Analyses Yet</h4>
          <p className="text-slate-400 text-sm mb-4 max-w-xs mx-auto">
            Upload your first resume using the card above to start building your career knowledge graph.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="material-symbols-outlined text-sm">info</span>
            Supports PDF, DOCX, and TXT formats
          </div>
        </div>
      )}
    </div>
  );
}
