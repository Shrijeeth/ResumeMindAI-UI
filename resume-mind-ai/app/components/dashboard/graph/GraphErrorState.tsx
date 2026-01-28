"use client";

import Link from "next/link";
import type { GraphError } from "@/app/lib/types/graph";

interface GraphErrorStateProps {
  error: GraphError;
  onRetry?: () => void;
}

interface ErrorConfig {
  icon: string;
  title: string;
  description: string;
  showRetry: boolean;
  showBackLink: boolean;
}

function getErrorConfig(error: GraphError): ErrorConfig {
  switch (error.type) {
    case "forbidden":
      return {
        icon: "lock",
        title: "Access Denied",
        description:
          "You don't have permission to view this document's knowledge graph.",
        showRetry: false,
        showBackLink: true,
      };
    case "not_found":
      return {
        icon: "search_off",
        title: "Document Not Found",
        description:
          "The document you're looking for doesn't exist or has been removed.",
        showRetry: false,
        showBackLink: true,
      };
    case "validation":
      return {
        icon: "error_outline",
        title: "Invalid Request",
        description: error.message,
        showRetry: false,
        showBackLink: true,
      };
    case "network":
      return {
        icon: "wifi_off",
        title: "Connection Failed",
        description:
          "Unable to reach the server. Check your connection and try again.",
        showRetry: true,
        showBackLink: false,
      };
    default:
      return {
        icon: "bug_report",
        title: "Something Went Wrong",
        description:
          "An unexpected error occurred while loading the knowledge graph.",
        showRetry: true,
        showBackLink: true,
      };
  }
}

export default function GraphErrorState({
  error,
  onRetry,
}: GraphErrorStateProps) {
  const config = getErrorConfig(error);

  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl text-red-400">
            {config.icon}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">
          {config.title}
        </h3>
        <p className="text-slate-400 mb-6">{config.description}</p>

        <div className="flex items-center justify-center gap-3">
          {config.showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="bg-primary hover:bg-violet-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-primary/30 transition-colors inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>
              Try Again
            </button>
          )}

          {config.showBackLink && (
            <Link
              href="/dashboard/graph"
              className="glass-card text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-all border border-slate-700/50 inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              Back to Documents
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
