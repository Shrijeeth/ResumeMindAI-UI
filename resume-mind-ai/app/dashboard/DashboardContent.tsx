"use client";

import { useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import DashboardLayout from "@/app/components/dashboard/layout/DashboardLayout";
import UploadCard from "@/app/components/dashboard/cards/UploadCard";
import PipelineStatusCard from "@/app/components/dashboard/cards/PipelineStatusCard";
import RecentAnalysesList from "@/app/components/dashboard/lists/RecentAnalysesList";
import KnowledgeGraphCard from "@/app/components/dashboard/cards/KnowledgeGraphCard";
import InsightCard from "@/app/components/dashboard/cards/InsightCard";
import { useApi } from "@/app/lib/useApi";
import {
  PipelineStatusSkeleton,
  RecentAnalysesListSkeleton,
  KnowledgeGraphSkeleton,
  InsightCardSkeleton,
} from "@/app/components/dashboard/skeletons";
import { uploadDocument } from "@/app/lib/api/documents";
import { useDocuments } from "@/app/lib/hooks/useDocuments";

interface DashboardContentProps {
  user: User;
}

type ProviderStatus = "connected" | "inactive" | "error";

interface ProviderApi {
  id: string;
  provider_type: string;
  display_name?: string;
  name?: string;
  status: ProviderStatus;
}

// Empty state insights - shown when no data is available
const emptyInsights = [
  {
    icon: "warning",
    iconColor: "bg-red-500/10",
    iconTextColor: "text-red-400",
    title: "Skill Gap",
    description:
      "Upload a resume to identify skill gaps for your target roles.",
    isEmpty: true,
    emptyMessage:
      "Upload a resume to identify skill gaps for your target roles.",
    emptyActionLabel: "Upload Resume",
    emptyActionHref: "/dashboard",
  },
  {
    icon: "trending_up",
    iconColor: "bg-blue-500/10",
    iconTextColor: "text-blue-400",
    title: "Market Position",
    description: "See how your profile compares to others in your field.",
    isEmpty: true,
    emptyMessage: "Analyze your resume to see your market positioning.",
    emptyActionLabel: "Get Started",
    emptyActionHref: "/dashboard",
  },
  {
    icon: "school",
    iconColor: "bg-primary/10",
    iconTextColor: "text-primary",
    title: "Interview Prep",
    description: "Generate interview questions based on your skills.",
    isEmpty: true,
    emptyMessage:
      "Build your knowledge graph first to generate interview prep.",
    emptyActionLabel: "Learn More",
    emptyActionHref: "/dashboard/help",
  },
  {
    icon: "lightbulb",
    iconColor: "bg-emerald-500/10",
    iconTextColor: "text-emerald-400",
    title: "Optimization",
    description: "Get AI suggestions to improve your resume.",
    isEmpty: true,
    emptyMessage: "Upload a resume to receive optimization suggestions.",
    emptyActionLabel: "Upload Resume",
    emptyActionHref: "/dashboard",
  },
];

export default function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  // Fetch the active LLM provider specifically
  const { data: activeProvider, isLoading } = useApi<ProviderApi>(
    "/settings/llm-providers/active",
    { revalidateOnFocus: true, dedupingInterval: 5000 },
  );

  // Fetch recent documents (analyses) - limit to 5 most recent
  const { documents: recentAnalyses, isLoading: isLoadingAnalyses } =
    useDocuments({
      initialLimit: 5,
      autoRefresh: true,
      refreshInterval: 10000,
    });

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    try {
      await uploadDocument(file);
      router.push("/dashboard/history");
    } catch (err) {
      console.error("Upload failed:", err);
      setIsUploading(false);
    }
  };

  const handleViewAnalysis = (id: string) => {
    router.push(`/dashboard/history?document=${id}`);
  };

  const handleExploreGraph = () => {
    router.push("/dashboard/graph");
  };

  const pipelineStatus = useMemo(() => {
    if (!activeProvider) return "not_configured" as const;
    if (activeProvider.status === "connected") return "active" as const;
    if (activeProvider.status === "inactive") return "idle" as const;
    if (activeProvider.status === "error") return "idle" as const;
    return "idle" as const;
  }, [activeProvider]);

  const pipelineProviderName = useMemo(() => {
    if (!activeProvider) return null;
    return (
      activeProvider.display_name ||
      activeProvider.name ||
      activeProvider.provider_type
    );
  }, [activeProvider]);

  return (
    <DashboardLayout
      user={user}
      pageTitle="Dashboard Overview"
      onSignOut={handleSignOut}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Row 1: Upload + Pipeline Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UploadCard
            onFileSelect={handleFileSelect}
            isUploading={isUploading}
          />
          {isLoading ? (
            <PipelineStatusSkeleton />
          ) : (
            <PipelineStatusCard
              status={pipelineStatus}
              llmProvider={pipelineProviderName}
              stats={null}
            />
          )}
        </div>

        {/* Row 2: Recent Analyses + Knowledge Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isLoading || isLoadingAnalyses ? (
              <RecentAnalysesListSkeleton />
            ) : (
              <RecentAnalysesList
                analyses={recentAnalyses.map((doc) => ({
                  id: doc.id,
                  fileName: doc.original_filename,
                  status:
                    doc.status === "completed"
                      ? ("completed" as const)
                      : doc.status === "parsing" ||
                          doc.status === "validating" ||
                          doc.status === "uploading"
                        ? ("processing" as const)
                        : doc.status === "failed" || doc.status === "invalid"
                          ? ("failed" as const)
                          : ("processing" as const),
                  nodesExtracted: 0, // TODO: Get actual nodes count from API
                  timestamp: doc.created_at,
                }))}
                onViewAnalysis={handleViewAnalysis}
                onViewAll={() => router.push("/dashboard/history")}
              />
            )}
          </div>
          {isLoading ? (
            <KnowledgeGraphSkeleton />
          ) : (
            <KnowledgeGraphCard
              hasData={false}
              onExplore={handleExploreGraph}
            />
          )}
        </div>

        {/* Row 3: Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [1, 2, 3, 4].map((i) => <InsightCardSkeleton key={i} />)
            : emptyInsights.map((insight, index) => (
                <InsightCard
                  key={index}
                  icon={insight.icon}
                  iconColor={insight.iconColor}
                  iconTextColor={insight.iconTextColor}
                  title={insight.title}
                  description={insight.description}
                  isEmpty={insight.isEmpty}
                  emptyMessage={insight.emptyMessage}
                  emptyActionLabel={insight.emptyActionLabel}
                  emptyActionHref={insight.emptyActionHref}
                />
              ))}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-700/50 text-center text-xs text-slate-500">
          <p>&copy; 2026 ResumeMindAI. Built with GraphRAG & LLM technology.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
