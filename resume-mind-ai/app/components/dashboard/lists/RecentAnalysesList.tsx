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
          <span className="material-symbols-outlined text-4xl text-slate-600 mb-3">
            description
          </span>
          <p className="text-slate-400">No analyses yet. Upload a resume to get started.</p>
        </div>
      )}
    </div>
  );
}
