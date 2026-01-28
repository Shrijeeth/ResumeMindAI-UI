"use client";

import {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import type {
  GraphData,
  GraphNode,
  GraphLink,
  CanvasConfig,
} from "@/app/lib/types/graph";
import GraphSkeleton from "./GraphSkeleton";

// Import the FalkorDB Canvas type
import type FalkorDBCanvasType from "@falkordb/canvas";

export interface GraphViewerHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomToFit: () => void;
  resetView: () => void;
  getZoom: () => number;
}

interface GraphViewerProps {
  data: GraphData;
  config?: CanvasConfig;
  className?: string;
  isLoading?: boolean;
}

const GraphViewer = forwardRef<GraphViewerHandle, GraphViewerProps>(
  function GraphViewer(
    { data, config, className = "", isLoading = false },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<FalkorDBCanvasType | null>(null);
    const configRef = useRef<CanvasConfig | undefined>(config);
    const [isReady, setIsReady] = useState(false);

    // Keep config ref in sync so callbacks always use latest
    configRef.current = config;

    // Initialize the canvas element when mounted
    useEffect(() => {
      const container = containerRef.current;
      if (!container || canvasRef.current) return;

      let cancelled = false;

      const initCanvas = async () => {
        // Import the module to register the web component
        await import("@falkordb/canvas");
        await customElements.whenDefined("falkordb-canvas");
        if (cancelled) return;

        // Create the canvas element
        const canvasEl = document.createElement(
          "falkordb-canvas",
        ) as unknown as FalkorDBCanvasType;
        const htmlEl = canvasEl as unknown as HTMLElement;
        htmlEl.style.width = "100%";
        htmlEl.style.height = "100%";
        htmlEl.style.display = "block";

        // Append to DOM — triggers connectedCallback + render()
        container.appendChild(canvasEl as unknown as Node);

        // Wait a frame for connectedCallback to finish setting up shadow DOM
        await new Promise((r) => requestAnimationFrame(r));
        if (cancelled) return;

        // Give the canvas explicit dimensions from the container
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          canvasEl.setWidth(rect.width);
          canvasEl.setHeight(rect.height);
        }

        // Set colors immediately
        canvasEl.setBackgroundColor("#0f172a");
        canvasEl.setForegroundColor("#e2e8f0");

        canvasRef.current = canvasEl;
        setIsReady(true);
      };

      initCanvas();

      return () => {
        cancelled = true;
        if (
          canvasRef.current &&
          container.contains(canvasRef.current as unknown as Node)
        ) {
          container.removeChild(canvasRef.current as unknown as Node);
        }
        canvasRef.current = null;
        setIsReady(false);
      };
    }, []);

    // Set config and data when canvas is ready or data changes
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !isReady || !data) return;

      const cfg = configRef.current;

      // Set config FIRST (before data) so callbacks are wired up
      canvas.setConfig({
        backgroundColor: "#0f172a",
        foregroundColor: "#e2e8f0",
        onNodeClick: (node) => {
          cfg?.onNodeClick?.(node as unknown as GraphNode);
        },
        onNodeHover: (node) => {
          cfg?.onNodeHover?.(node as unknown as GraphNode | null);
        },
        onLinkClick: (link) => {
          cfg?.onLinkClick?.(link as unknown as GraphLink);
        },
        onLinkHover: (link) => {
          cfg?.onLinkHover?.(link as unknown as GraphLink | null);
        },
        onBackgroundClick: () => {
          cfg?.onBackgroundClick?.();
        },
        onZoom: (transform) => {
          cfg?.onZoom?.(transform.k * 100);
        },
      });

      // Set graph data AFTER config — setData triggers initGraph + simulation
      canvas.setData({
        nodes: data.nodes.map((node) => ({
          id: node.id,
          labels: node.labels,
          color: node.color,
          visible: node.visible,
          data: node.data,
          caption: "name",
          size: node.data.type === "person" ? 12 : 8,
        })),
        links: data.links.map((link) => ({
          id: link.id,
          relationship: link.relationship,
          color: link.color,
          source: link.source,
          target: link.target,
          visible: link.visible,
          data: link.data,
        })),
      });
    }, [data, isReady]);

    // Stable imperative methods
    const zoomIn = useCallback(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const current = canvas.getZoom() || 1;
        canvas.zoom(current * 1.3);
      }
    }, []);

    const zoomOut = useCallback(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const current = canvas.getZoom() || 1;
        canvas.zoom(current / 1.3);
      }
    }, []);

    const zoomToFit = useCallback(() => {
      canvasRef.current?.zoomToFit(1.2);
    }, []);

    const resetView = useCallback(() => {
      canvasRef.current?.zoomToFit(1.0);
    }, []);

    const getZoom = useCallback(() => {
      return (canvasRef.current?.getZoom() ?? 1) * 100;
    }, []);

    // Expose methods to parent via ref
    useImperativeHandle(
      ref,
      () => ({
        zoomIn,
        zoomOut,
        zoomToFit,
        resetView,
        getZoom,
      }),
      [zoomIn, zoomOut, zoomToFit, resetView, getZoom],
    );

    return (
      <div className={`w-full h-full relative bg-background-dark ${className}`}>
        <div ref={containerRef} className="w-full h-full" />
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <GraphSkeleton />
          </div>
        )}
      </div>
    );
  },
);

export default GraphViewer;
