"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";
import DashboardLayout from "@/app/components/dashboard/layout/DashboardLayout";
import { useDocuments } from "@/app/lib/hooks/useDocuments";

interface GraphDocumentSelectorProps {
  user: User;
}

function getFileIcon(fileType: string): string {
  switch (fileType) {
    case "pdf":
      return "picture_as_pdf";
    case "docx":
      return "description";
    case "txt":
    case "md":
      return "article";
    default:
      return "insert_drive_file";
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GraphDocumentSelector({
  user,
}: GraphDocumentSelectorProps) {
  const router = useRouter();
  const { documents, isLoading } = useDocuments({
    initialLimit: 50,
    revalidateOnFocus: true,
  });

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const completedDocs = documents.filter((d) => d.status === "completed");

  return (
    <DashboardLayout
      user={user}
      pageTitle="Knowledge Graph"
      onSignOut={handleSignOut}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Knowledge Graph</h1>
          <p className="text-sm text-slate-400 mt-1">
            Select a document to explore its career knowledge graph
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card p-5 rounded-xl animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-700/50 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-700/50 rounded w-3/4" />
                    <div className="h-3 bg-slate-700/50 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && completedDocs.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">
                hub
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Graphs Available
            </h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Upload and process a resume to generate its career knowledge
              graph. Completed documents will appear here.
            </p>
            <Link
              href="/dashboard"
              className="bg-primary hover:bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-primary/30 transition-colors inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                upload_file
              </span>
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* Document List */}
        {!isLoading && completedDocs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedDocs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => router.push(`/dashboard/graph/${doc.id}`)}
                className="glass-card p-5 rounded-xl text-left group hover:scale-[1.02] transition-all hover:border-primary/30 border border-transparent"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-xl text-primary">
                      {getFileIcon(doc.file_type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">
                      {doc.original_filename}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">
                        {formatDate(doc.created_at)}
                      </span>
                      {doc.document_type && (
                        <>
                          <span className="text-slate-700">|</span>
                          <span className="text-xs text-slate-500 capitalize">
                            {doc.document_type.replace("_", " ")}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-lg text-slate-600 group-hover:text-primary transition-colors">
                    arrow_forward
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
