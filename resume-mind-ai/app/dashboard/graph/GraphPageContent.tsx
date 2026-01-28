"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import DashboardLayout from "@/app/components/dashboard/layout/DashboardLayout";
import GraphViewer, {
  GraphViewerHandle,
} from "@/app/components/dashboard/graph/GraphViewer";
import GraphControls from "@/app/components/dashboard/graph/GraphControls";
import GraphLegend from "@/app/components/dashboard/graph/GraphLegend";
import GraphSidebar from "@/app/components/dashboard/graph/GraphSidebar";
import GraphEmptyState from "@/app/components/dashboard/graph/GraphEmptyState";
import GraphErrorState from "@/app/components/dashboard/graph/GraphErrorState";
import { useUserGraphData } from "@/app/lib/hooks/useUserGraphData";
import { getNodeCountsByType } from "@/app/lib/types/graph";
import type { GraphNode, NodeType } from "@/app/lib/types/graph";

interface GraphPageContentProps {
  user: User;
}

export default function GraphPageContent({ user }: GraphPageContentProps) {
  const router = useRouter();
  const { data, isLoading, error, refresh } = useUserGraphData();

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hiddenTypes, setHiddenTypes] = useState<NodeType[]>([]);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Canvas ref for control methods
  const graphViewerRef = useRef<GraphViewerHandle>(null);

  // Redirect to login on 401
  useEffect(() => {
    if (error?.type === "unauthorized") {
      router.push("/auth/login");
    }
  }, [error, router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleToggleVisibility = useCallback((type: NodeType) => {
    setHiddenTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }, []);

  const handleZoomChange = useCallback((zoom: number) => {
    setZoomLevel(zoom);
  }, []);

  // Filter data based on hidden types
  const filteredData = useMemo(() => {
    if (!data) return { nodes: [], links: [] };

    const visibleNodes = data.nodes.map((node) => ({
      ...node,
      visible: !hiddenTypes.includes(node.data.type as NodeType),
    }));

    // Filter links to only include those where both source and target are visible
    const visibleNodeIds = new Set(
      visibleNodes.filter((n) => n.visible).map((n) => n.id),
    );

    const visibleLinks = data.links.map((link) => ({
      ...link,
      visible:
        visibleNodeIds.has(link.source) && visibleNodeIds.has(link.target),
    }));

    return {
      nodes: visibleNodes,
      links: visibleLinks,
    };
  }, [data, hiddenTypes]);

  // Calculate node counts for legend
  const nodeCounts = useMemo(() => {
    if (!data) return {};
    return getNodeCountsByType(data);
  }, [data]);

  const hasData = data && data.nodes.length > 0;
  const showError = error && error.type !== "unauthorized";

  return (
    <DashboardLayout
      user={user}
      pageTitle="Knowledge Graph"
      onSignOut={handleSignOut}
    >
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Knowledge Graph</h1>
            <p className="text-sm text-slate-400 mt-1">
              Explore your career connections and skill relationships
            </p>
          </div>
          {hasData && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-slate-400">{data.nodes.length} nodes</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                {data.links.length} connections
              </span>
            </div>
          )}
        </div>

        {/* Graph Container */}
        <div className="flex-1 glass-card rounded-2xl overflow-hidden relative">
          {showError ? (
            <GraphErrorState error={error} onRetry={refresh} />
          ) : !hasData && !isLoading ? (
            <GraphEmptyState />
          ) : (
            <>
              <GraphViewer
                ref={graphViewerRef}
                data={filteredData}
                isLoading={isLoading}
                config={{
                  onNodeClick: handleNodeClick,
                  onBackgroundClick: handleBackgroundClick,
                  onZoom: handleZoomChange,
                }}
              />

              {!isLoading && (
                <>
                  <GraphLegend
                    onToggleVisibility={handleToggleVisibility}
                    hiddenTypes={hiddenTypes}
                    nodeCounts={nodeCounts}
                  />

                  <GraphControls
                    onZoomIn={() => graphViewerRef.current?.zoomIn()}
                    onZoomOut={() => graphViewerRef.current?.zoomOut()}
                    onFitToView={() => graphViewerRef.current?.zoomToFit()}
                    onResetView={() => graphViewerRef.current?.resetView()}
                    zoomLevel={zoomLevel}
                  />

                  <GraphSidebar
                    node={selectedNode}
                    isOpen={!!selectedNode}
                    onClose={() => setSelectedNode(null)}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
