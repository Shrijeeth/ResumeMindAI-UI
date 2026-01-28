"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { GraphData, GraphError, GraphErrorType } from "../types/graph";
import { getDocumentGraph } from "../api/graph";
import type { GraphQueryParams } from "../api/graph";
import { transformGraphResponse } from "../transformers/graphTransformer";

interface UseGraphDataOptions {
  documentId: string;
  queryParams?: GraphQueryParams;
  enabled?: boolean;
}

interface UseGraphDataReturn {
  data: GraphData | null;
  isLoading: boolean;
  error: GraphError | null;
  refresh: () => Promise<void>;
}

function classifyError(status: number, message: string): GraphError {
  const errorMap: Record<number, GraphErrorType> = {
    401: "unauthorized",
    403: "forbidden",
    404: "not_found",
    400: "validation",
  };

  return {
    type: errorMap[status] ?? (status === 0 ? "network" : "unknown"),
    message,
    status,
  };
}

/**
 * Hook for fetching graph data from the backend API.
 * Transforms API response to frontend GraphData format.
 */
export function useGraphData(options: UseGraphDataOptions): UseGraphDataReturn {
  const { documentId, queryParams, enabled = true } = options;

  const [data, setData] = useState<GraphData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<GraphError | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!documentId || !enabled) return;

    setIsLoading(true);
    setError(null);

    const response = await getDocumentGraph(documentId, queryParams);

    if (!mountedRef.current) return;

    if (response.error) {
      setError(classifyError(response.status, response.error.message));
      setData(null);
    } else if (response.data) {
      const transformed = transformGraphResponse(response.data);
      setData(transformed);
    } else {
      setData({ nodes: [], links: [] });
    }

    setIsLoading(false);
  }, [documentId, queryParams, enabled]);

  // Data fetching on mount and dependency changes — async fetch sets state
  // after awaiting the network response, which is the standard React pattern
  // for data loading hooks.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
  };
}
