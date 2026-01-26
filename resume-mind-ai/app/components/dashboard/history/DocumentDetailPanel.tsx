"use client";

import { useEffect, useState } from "react";
import { getDocument } from "@/app/lib/api/documents";
import type { DocumentDetail } from "@/app/lib/types/document";
import StatusBadge from "./StatusBadge";

interface DocumentDetailPanelProps {
  documentId: string | null;
  onClose: () => void;
}

// Document type labels
const documentTypeLabels: Record<string, string> = {
  resume: "Resume",
  job_description: "Job Description",
  cover_letter: "Cover Letter",
  other: "Other",
  unknown: "Unknown",
};

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatConfidence(confidence: number | undefined): string {
  if (confidence === undefined) return "--";
  return `${Math.round(confidence * 100)}%`;
}

export default function DocumentDetailPanel({
  documentId,
  onClose,
}: DocumentDetailPanelProps) {
  const [docDetail, setDocDetail] = useState<DocumentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const confidenceText = formatConfidence(docDetail?.classification_confidence);

  useEffect(() => {
    if (!documentId) {
      return;
    }

    let isMounted = true;

    const fetchDocument = async () => {
      setIsLoading(true);
      setError(null);

      const response = await getDocument(documentId);

      if (!isMounted) return;

      if (response.error) {
        setError(response.error.message);
        setDocDetail(null);
      } else {
        setDocDetail(response.data);
      }

      setIsLoading(false);
    };

    fetchDocument();

    return () => {
      isMounted = false;
      setDocDetail(null);
      setError(null);
    };
  }, [documentId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (documentId) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [documentId, onClose]);

  if (!documentId) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed inset-y-0 right-0 w-full max-w-lg bg-slate-900 border-l border-slate-700/50 z-50 flex flex-col shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-panel-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
          <h2 id="detail-panel-title" className="text-lg font-bold text-white">
            Document Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close panel"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-6 w-3/4 bg-slate-700/50 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-slate-700/50 rounded animate-pulse" />
              <div className="h-32 w-full bg-slate-700/50 rounded animate-pulse mt-6" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="material-symbols-outlined text-4xl text-red-400 mb-3">
                error
              </span>
              <p className="text-slate-400">{error}</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 text-sm text-primary hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          ) : docDetail ? (
            <div className="space-y-6">
              {/* File Info */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  File Information
                </h3>
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-xs text-slate-500">Filename</p>
                    <p className="text-sm text-white break-all">
                      {docDetail.original_filename}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500">File Type</p>
                      <p className="text-sm text-white uppercase">
                        {docDetail.file_type}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Document Type</p>
                      <p className="text-sm text-white">
                        {docDetail.document_type
                          ? documentTypeLabels[docDetail.document_type] ||
                            docDetail.document_type
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Status
                </h3>
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <StatusBadge status={docDetail.status} />
                    <span className="text-xs text-slate-500">
                      Confidence: {confidenceText}
                    </span>
                  </div>
                  {docDetail.progress_message && (
                    <p className="text-sm text-slate-400">
                      {docDetail.progress_message}
                    </p>
                  )}
                  {docDetail.error_message && (
                    <p className="text-sm text-red-400">
                      {docDetail.error_message}
                    </p>
                  )}
                </div>
              </div>

              {/* Timestamps */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Timestamps
                </h3>
                <div className="glass-card rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Created</span>
                    <span className="text-sm text-white">
                      {formatDateTime(docDetail.created_at)}
                    </span>
                  </div>
                  {docDetail.updated_at && (
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Updated</span>
                      <span className="text-sm text-white">
                        {formatDateTime(docDetail.updated_at)}
                      </span>
                    </div>
                  )}
                  {docDetail.completed_at && (
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Completed</span>
                      <span className="text-sm text-white">
                        {formatDateTime(docDetail.completed_at)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Preview (if completed) */}
              {docDetail.markdown_content && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Content Preview
                  </h3>
                  <div className="glass-card rounded-xl p-4">
                    <div className="prose prose-sm prose-invert max-w-none">
                      <pre className="text-xs text-slate-300 whitespace-pre-wrap overflow-x-auto max-h-64">
                        {docDetail.markdown_content.slice(0, 2000)}
                        {docDetail.markdown_content.length > 2000 && "..."}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
