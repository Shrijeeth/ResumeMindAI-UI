"use client";

import { useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import DashboardLayout from "@/app/components/dashboard/layout/DashboardLayout";
import AnalysisHistoryTable from "@/app/components/dashboard/history/AnalysisHistoryTable";
import DocumentFilters from "@/app/components/dashboard/history/DocumentFilters";
import UploadButton from "@/app/components/dashboard/history/UploadButton";
import DeleteConfirmDialog from "@/app/components/dashboard/history/DeleteConfirmDialog";
import DocumentDetailPanel from "@/app/components/dashboard/history/DocumentDetailPanel";
import { useDocuments } from "@/app/lib/hooks/useDocuments";
import { usePollingDocuments } from "@/app/lib/hooks/usePollingDocuments";
import type { DocumentListItem } from "@/app/lib/types/document";

interface AnalysisHistoryContentProps {
  user: User;
}

export default function AnalysisHistoryContent({
  user,
}: AnalysisHistoryContentProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<DocumentListItem | null>(
    null,
  );
  const [detailTarget, setDetailTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    documents,
    isLoading,
    error,
    filters,
    setStatusFilter,
    loadMore,
    hasMore,
    refresh,
    uploadFile,
    isUploading,
    removeDocument,
    updateDocument,
  } = useDocuments({ initialLimit: 20 });

  // Polling for non-terminal documents
  usePollingDocuments({
    documents,
    onStatusUpdate: useCallback(
      (id, status) => {
        updateDocument(id, { status });
      },
      [updateDocument],
    ),
  });

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const handleUpload = async (file: File) => {
    setUploadError(null);
    try {
      await uploadFile(file);
    } catch (err) {
      const error = err as { message?: string };
      setUploadError(error.message || "Upload failed. Please try again.");
    }
  };

  const handleViewDetails = (id: string) => {
    setDetailTarget(id);
  };

  const handleDelete = (doc: DocumentListItem) => {
    setDeleteTarget(doc);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await removeDocument(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = (doc: DocumentListItem) => {
    // Download functionality - will be implemented when s3_key is available
    console.log("Download:", doc.id);
  };

  return (
    <DashboardLayout
      user={user}
      pageTitle="Analysis History"
      onSignOut={handleSignOut}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Upload Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Analysis History</h1>
            <p className="text-sm text-slate-400 mt-1">
              View and manage all your document analyses
            </p>
          </div>
          <UploadButton onUpload={handleUpload} isUploading={isUploading} />
        </div>

        {/* Upload Error */}
        {uploadError && (
          <div className="flex items-center gap-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
            <span className="material-symbols-outlined text-lg">error</span>
            {uploadError}
            <button
              onClick={() => setUploadError(null)}
              className="ml-auto text-red-300 hover:text-white"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <DocumentFilters
            currentStatus={filters.status_filter}
            onStatusChange={setStatusFilter}
          />
          {error && (
            <button
              onClick={refresh}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>
              Retry
            </button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
            <span className="material-symbols-outlined text-lg">error</span>
            {error.message}
            <button
              onClick={refresh}
              className="ml-auto text-red-300 hover:text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        <AnalysisHistoryTable
          documents={documents}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
          onDelete={handleDelete}
          onDownload={handleDownload}
          onLoadMore={loadMore}
          hasMore={hasMore}
        />

        {/* Footer */}
        <div className="pt-6 border-t border-slate-700/50 text-center text-xs text-slate-500">
          <p>&copy; 2026 ResumeMindAI. Built with GraphRAG & LLM technology.</p>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        documentName={deleteTarget?.original_filename || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />

      {/* Detail Side Panel */}
      <DocumentDetailPanel
        documentId={detailTarget}
        onClose={() => setDetailTarget(null)}
      />
    </DashboardLayout>
  );
}
